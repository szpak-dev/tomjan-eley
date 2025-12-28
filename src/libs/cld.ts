import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadImage(imagePath: string, publicId: string): Promise<string> {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            public_id: publicId,
            overwrite: true,
            folder: process.env.CLOUDINARY_FOLDER,
        });

        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
}