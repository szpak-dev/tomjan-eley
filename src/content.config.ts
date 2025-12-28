import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const metadatas = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/metadata" }),
  schema: z.object({
    type: z.string(),
    lang: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/categories/items" }),
  schema: z.object({
    id: z.string(),
    imgSrc: z.string(),
  }),
});

const categoryTranslations = defineCollection({
  loader: glob({ pattern: "translations.json", base: "./src/content/categories" }),
  schema: z.object({
    en: z.record(z.string()),
    pl: z.record(z.string()),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/products/items" }),
  schema: z.object({
    id: z.string(),
    url: z.string(),
    category: z.string(),
    name: z.string(),
    subname: z.string(),
    specification: z.array(z.object({
        id: z.string(),
        values: z.array(z.string()),
        units: z.array(z.string()).optional(),
    })),
    imageUrl: z.string(),
  }),
});

const productImages = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/products/images" }),
  schema: z.object({
    productId: z.string(),
    cdn: z.string(),
    imageIds: z.array(z.string()),
  }),
});

const specifications = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/specifications/items" }),
  schema: z.object({
    id: z.string(),
    type: z.string()
  }),
});

const specificationTranslations = defineCollection({
  loader: glob({ pattern: "translations.json", base: "./src/content/specifications" }),
  schema: z.object({
    en: z.record(z.string()),
    pl: z.record(z.string()),
  }),
});

export const collections = {
  metadatas,
  categories,
  categoryTranslations,
  products,
  productImages,
  specifications,
  specificationTranslations
};