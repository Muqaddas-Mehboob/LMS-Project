import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Children, use } from "react";

const TeacherLayout = async ({
    children
} : {
    children: React.ReactNode;
}) => {
    const { userId } = await auth();

    if(!isTeacher(userId)){
        return redirect("/");
    }
    return(
        <>{children}</>
    )
}

export default TeacherLayout;