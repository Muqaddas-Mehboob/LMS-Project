import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import { authMiddleware } from "@clerk/nextjs"

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook(.*)', // added webhook here
]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.pathname;

  const isPublic = isPublicRoute(req);
  const isUploadThing = url.startsWith('/api/uploadthing');

  if (!isPublic && !isUploadThing) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
