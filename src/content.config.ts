import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categories = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/categories" }),
  schema: z.object({
    id: z.string(),
    lang: z.string(),
    title: z.string(),
    imgSrc: z.string(),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/products" }),
  schema: z.object({
    id: z.string(),
    lang: z.string(),
    url: z.string().optional(),
    category: z.string(),
    name: z.string(),
    subname: z.string().optional(),
    lead: z.string(),
    description: z.array(z.string()),
    specification: z.array(z.any()).optional(), // keeping it loose for now as spec is complex
    imageUrl: z.string(),
  }),
});

const specifications = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/specifications" }),
  schema: z.object({
    id: z.string(),
    lang: z.string(),
    title: z.string(),
  }),
});

export const collections = { categories, products, specifications };