'use server'

import { db } from "@/db/db";
import { utUploads } from "@/db/schema";
import { getUserID } from "./auth";
import { eq } from "drizzle-orm";
export async function addImageUploadDB(res: any){
    console.log("Adding image upload to DB with the following data:", res);
    const userId = res.serverData.uploadedBy;
    const name = res.name;
    const type = res.type;
    const imageUrl = res.url;
    const uploadDate = new Date();
    const imageId = res.key;

    console.log("userId:", userId);
    console.log("name:", name);
    console.log("type:", type);
    console.log("imageUrl:", imageUrl);
    console.log("uploadDate:", uploadDate);
    console.log("imageId:", imageId);

    db.insert(utUploads).values({
        userId: userId,
        name: name,
        type: type,
        fileUrl: imageUrl,
        uploadDate: uploadDate,
        fileId: imageId,
      }).execute()
}

export async function getUserImages() {
    const userId = await getUserID();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const images = await db.select().from(utUploads).where(eq(utUploads.userId, userId)).execute();
    return images;
}

export async function deleteImageFromDB(imageId: string) {
    const userId = await getUserID();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    await db.delete(utUploads).where(eq(utUploads.fileId, imageId)).execute({});
    console.log(`Image with ID ${imageId} deleted from DB`);
}