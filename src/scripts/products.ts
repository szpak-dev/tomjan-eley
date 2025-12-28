import fs from 'fs';
import path from 'path';

interface SpecificationItem {
    id: string;
    type?: string;
    values: string[];
    units?: string[];
}

interface Product {
    id: string;
    url: string;
    category: string;
    name: string;
    subname?: string;
    lead?: string;
    description?: string[];
    specification: SpecificationItem[];
    imageUrl: string;
    lang?: string;
}

const PRODUCTS_DIR = path.join(process.cwd(), 'src/content/products');

/**
 * Process a single specification item
 */
function processSpecification(spec: SpecificationItem): SpecificationItem {
    const processed: SpecificationItem = {
        id: spec.id,
        values: spec.values,
    };

    // Only include units if it's not an empty array
    if (spec.units && spec.units.length > 0) {
        processed.units = spec.units;
    }

    return processed;
}

/**
 * Process a single product JSON file
 */
function processProduct(product: Product): Partial<Product> {
    const processed: Partial<Product> = {
        id: product.id,
        url: product.url,
        category: product.category,
        name: product.name,
    };

    // Include subname if it exists
    if (product.subname) {
        processed.subname = product.subname;
    }

    // Process specifications
    processed.specification = product.specification.map(processSpecification);

    // Include imageUrl
    processed.imageUrl = product.imageUrl;

    return processed;
}

/**
 * Process all product JSON files
 */
export async function processAllProducts(): Promise<void> {
    try {
        // Read all files from the products directory
        const files = fs.readdirSync(PRODUCTS_DIR);
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        console.log(`Found ${jsonFiles.length} product files to process`);

        for (const file of jsonFiles) {
            const filePath = path.join(PRODUCTS_DIR, file);

            // Read the JSON file
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const product: Product = JSON.parse(fileContent);

            // Process the product
            const processed = processProduct(product);

            // Write back to the same file
            fs.writeFileSync(filePath, JSON.stringify(processed, null, 2) + '\n', 'utf-8');

            console.log(`Processed: ${file}`);
        }

        console.log('All products processed successfully!');
    } catch (error) {
        console.error('Error processing products:', error);
        throw error;
    }
}

// Run the script if executed directly
if (require.main === module) {
    processAllProducts();
}
