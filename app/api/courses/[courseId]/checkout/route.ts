import Stripe from "stripe";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {

        // We are creating a customer but we don't know when their payment 
        // method will be charged. We need to create a customer in Stripe
        // and then create a session for them to pay for the course.

        // The metadata is used to identify the user and the course they are
        // purchasing. We will use this information in the webhook to update
        // the database.

        const user = await currentUser();   

        if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                isPublished: true,
            },
        });

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: params.courseId,
                },
            },
        });

        if (purchase) {
            return new NextResponse("Already Purchased", { status: 400 });
        }

        if (!course) {
            return new NextResponse("Not Found", { status: 404 });
        }   

        // Retrieve the first chapter (or you can change this logic based on which chapter you need)
        const chapter = await db.chapter.findFirst({
            where: { courseId: params.courseId, isPublished: true },
            orderBy: { position: 'asc' }, // Assuming position determines the chapter order
        });

        if (!chapter) {
            return new NextResponse("Chapter Not Found", { status: 404 });
        }
        // define line items for stripe check out page.
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: course.title,
                        description: course.description!,
                    },
                    unit_amount: Math.round(course.price! * 100),
                },
            },
        ];

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
                userId: user.id,
            },
            select: {
                stripeCustomerId: true,
            },
        });

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: user.emailAddresses[0].emailAddress,
            });

            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id,
                }
            });
        }

        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
            metadata: {
                courseId: course.id,
                userId: user.id,
                chapterId: chapter.id, // ✅ Add this if it's missing
            },
        });

        return NextResponse.json({ url: session.url });
        
    } catch (error) {
        console.log("COURSE_ID_CHECKOUT", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}