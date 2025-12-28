import { uploadImage } from "../libs/cld";

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

type DownloadableImage = {
    productId: string;
    url: string;
}

interface Product {
    id: string;
    imageUrl: string;
    [key: string]: any;
}

async function findProductsWithoutUploadedImages(): Promise<DownloadableImage[]> {
    const productsDir = path.join(process.cwd(), 'src/content/products/items');
    const imagesDir = path.join(process.cwd(), 'src/content/products/images');
    
    // Read all product files
    const productFiles = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));
    
    // Get existing image entries
    const existingImages = new Set<string>();
    if (fs.existsSync(imagesDir)) {
        const imageFiles = fs.readdirSync(imagesDir).filter(f => f.endsWith('.json'));
        imageFiles.forEach(file => {
            const productId = file.replace('.json', '');
            existingImages.add(productId);
        });
    }
    
    const downloadables: DownloadableImage[] = [];
    
    for (const file of productFiles) {
        const filePath = path.join(productsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const product: Product = JSON.parse(content);
        
        if (!existingImages.has(product.id)) {
            downloadables.push({
                productId: product.id,
                url: product.imageUrl
            });
        }
    }

    return downloadables;
}

async function downloadImage(downloadable: DownloadableImage): Promise<string> {
    const tempDir = path.join(process.cwd(), 'temp-images');
    
    // Create temp directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const fileExtension = path.extname(new URL(downloadable.url).pathname) || '.jpg';
    const filename = `${downloadable.productId}${fileExtension}`;
    const filepath = path.join(tempDir, filename);

    return new Promise((resolve, reject) => {
        const protocol = downloadable.url.startsWith('https') ? https : http;
        
        const file = fs.createWriteStream(filepath);
        
        protocol.get(downloadable.url, (response) => {
            // Handle redirects
            if (response.statusCode === 301 || response.statusCode === 302) {
                file.destroy();
                const redirectUrl = response.headers.location;
                if (redirectUrl) {
                    downloadImage({ ...downloadable, url: redirectUrl })
                        .then(resolve)
                        .catch(reject);
                } else {
                    reject(new Error('Redirect without location header'));
                }
                return;
            }

            if (response.statusCode !== 200) {
                file.destroy();
                reject(new Error(`Failed to download image: ${response.statusCode}`));
                return;
            }

            response.pipe(file);
            
            file.on('finish', () => {
                file.close();
                resolve(filepath);
            });
        }).on('error', (err) => {
            file.destroy();
            fs.unlink(filepath, () => {}); // Delete the file on error
            reject(err);
        });
    });
}

async function addImageToCollection(productId: string): Promise<void> {
    const imagesDir = path.join(process.cwd(), 'src/content/products/images');
    
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    const productImages = {
        productId,
        cdn: 'cloudinary',
        imageIds: [productId],
    };

    const filename = `${productId}.json`;
    const filepath = path.join(imagesDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(productImages, null, 2));
}

async function processImage(downloadable: DownloadableImage): Promise<void> {
    try {
        const imagePath = await downloadImage(downloadable);
        await uploadImage(imagePath, downloadable.productId);
        await addImageToCollection(downloadable.productId);
        
        fs.unlinkSync(imagePath);
    } catch (error) {
        console.error(`Error processing image for ${downloadable.productId}:`, error);
        throw error;
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    try {
        const downloadables = await findProductsWithoutUploadedImages();
        console.log(`Found ${downloadables.length} images to upload.`);
    
        for (const downloadable of downloadables) {
            await processImage(downloadable);
        }
        
    } catch (error) {
        console.error('Fatal error during image upload:', error);
        process.exit(1);
    }
}