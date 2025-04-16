import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";
const f = createUploadthing();

// const handleAuth=()=>{
//     const {userId}=auth();
//     if (!userId) throw new Error("Unauthorized");
//     return {userId};
// }
const handleAuth = async () => {
    const { userId } = await auth(); // ✅ Await auth() before destructuring
    if (!userId) throw new Error("Unauthorized");
    return { userId };
};


// const auth = (req: Request) => ({ id: "fakeId" }); 


// export const ourFileRouter = {
//     courseImage: f({image:{maxFileSize: "4MB",maxFileCount: 1}})
//         .middleware(()=>handleAuth())
//         .onUploadComplete(()=>{}),
//     courseAttachment: f(["text","image","video","audio","pdf"])
//         .middleware(()=>handleAuth())
//         .onUploadComplete(()=>{}),
//     chapterVideo: f({video: {maxFileCount:1,maxFileSize:"512GB"}})
//         .middleware(()=>handleAuth())
//         .onUploadComplete(()=>{})
// } satisfies FileRouter;
export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => await handleAuth()) // ✅ Await middleware
        .onUploadComplete(() => {}),

    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware(async () => await handleAuth()) // ✅ Await middleware
        .onUploadComplete(() => {}),

    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
        .middleware(async () => await handleAuth()) // ✅ Await middleware
        .onUploadComplete(() => {}),
} satisfies FileRouter;


export type OurFileRouter = typeof ourFileRouter;


// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { auth } from "@clerk/nextjs/server";

// const f = createUploadthing();

// const handleAuth = async () => {
//     const { userId } = await auth();
//     if (!userId) throw new Error("Unauthorized");
//     return { userId };
// };

// export const ourFileRouter = {
//     courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//         .middleware(async () => await handleAuth())
//         .onUploadComplete(({ file }) => {
//             return { imageUrl: file.ufsUrl }; // ✅ Must return a JSON-serializable object
//         }),

//     courseAttachment: f(["text", "image", "video", "audio", "pdf"])
//         .middleware(async () => await handleAuth())
//         .onUploadComplete(({ file }) => {
//             return { fileUrl: file.ufsUrl }; // or any useful metadata
//         }),

//     chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
//         .middleware(async () => await handleAuth())
//         .onUploadComplete(({ file }) => {
//             return { videoUrl: file.ufsUrl };
//         }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
