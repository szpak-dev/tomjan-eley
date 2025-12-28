import { getCollection } from 'astro:content';
import { languages } from "../i18n/ui";

import type { 
    Category, 
    Specification, 
    Product, 
    PageMetadata, 
    ProductImages, 
    Language, 
    Lang, 
    Metadata 
} from './types';

export async function getLanguages(): Promise<Language[]> {
    return Object.entries(languages).map(([code, name]) => ({ code: code as Lang, name }));
}

export async function getMetadata(type: Metadata, lang: Lang): Promise<PageMetadata> {
    const allMetadatas = await getCollection('metadatas');
    const metadatas = allMetadatas.find(meta => meta.data.type === type && meta.data.lang === lang);
    
    if (!metadatas) {
        throw new Error(`Metadata ${type}/${lang} not found`);
    }

    return metadatas.data;
}

export async function findCategories(lang: Lang): Promise<Category[]> {
    const categories = await getCollection('categories');
    const translations = await getCollection('categoryTranslations');

    const translationData = translations[0].data;
    const langTranslations = translationData[lang];

    return categories.map(category => ({
        id: category.data.id,
        imgSrc: category.data.imgSrc,
        name: langTranslations[category.data.id] || category.data.id,
    }));
}

export async function getCategory(categoryId: string, lang: Lang): Promise<Category> {
    const categories = await findCategories(lang);
    const category = categories.find(cat => cat.id === categoryId);

    if (!category) {
        throw new Error(`Category ${categoryId}/${lang} not found`);
    }

    return category;
}

export async function findSpecifications(lang: Lang): Promise<Specification[]> {
    const specifications = await getCollection('specifications');
    const translations = await getCollection('specificationTranslations');

    const translationData = translations[0].data;
    const langTranslations = translationData[lang];

    return specifications.map(spec => ({
        id: spec.data.id,
        type: spec.data.type,
        name: langTranslations[spec.data.id] || spec.data.id,
    }));
}

export async function findProducts(lang: Lang): Promise<Product[]> {
    const products = await getCollection('products');

    const specifications = await findSpecifications(lang);
    const specificationsMap: Record<string, Specification> = specifications.reduce((map, spec) => {
        map[spec.id] = spec;
        return map;
    }, {} as Record<string, Specification>);

    return products.map(product => {
        const specs = product.data.specification.map(prodSpec => {
            const baseSpec = specificationsMap[prodSpec.id];
            return { ...prodSpec, ...baseSpec };
        });

        return {
            id: product.data.id,
            url: product.data.url,
            category: product.data.category,
            name: product.data.name,
            subname: product.data.subname,
            specification: specs,
            imageUrl: product.data.imageUrl
        }
    });
}

export async function findProductsByCategory(categoryId: string, lang: Lang): Promise<Product[]> {
    const products = await findProducts(lang);
    return products.filter(product => product.category === categoryId);
}

export async function getProduct(productId: string, lang: Lang): Promise<Product> {
    const products = await findProducts(lang);
    const product = products.find(prod => prod.id === productId);

    if (!product) {
        throw new Error(`Product ${productId}/${lang} not found`);
    }

    return product;
}

export async function getProductImages(productId: string): Promise<ProductImages> {
    const productImages = await getCollection('productImages');
    const pi =  productImages.find(img => img.data.productId === productId);

    if (!pi) {
        throw new Error(`Product Images for ${productId} not found`);
    }

    return pi.data;
}

export async function getProductImageId(productId: string): Promise<string> {
    const productImages = await getProductImages(productId);
    return productImages.imageIds[0];
}