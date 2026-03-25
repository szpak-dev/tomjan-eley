import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const attributeSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

const attributeGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  properties: z.array(attributeSchema),
});

const variantSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

const extraValueSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

const products = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/products", generateId: ({ entry, data }) => {
    // Use the full path including language directory as ID
    return entry;
  }}),
  schema: z.object({
    id: z.string(),
    lang: z.string(),
    active: z.boolean(),
    url: z.string(),
    manufacturer: z.string(),
    category_slug: z.string(),
    category_name: z.string(),
    name: z.string(),
    name_short: z.string().default(""),
    slug: z.string(),
    model_name: z.string().default(""),
    lead: z.string().default(""),
    description: z.array(z.string()).default([]),
    attribute_groups: z.array(attributeGroupSchema).default([]),
    variants: z.array(variantSchema).default([]),
    extra_data: z.array(extraValueSchema).default([]),
    images: z.array(z.string()).default([]),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/categories" }),
  schema: z.object({
    id: z.string(),
    lang: z.string(),
    manufacturer: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
});

const partners = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/partners" }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    color: z.string(),
    nip: z.string(),
    address: z.object({
      street: z.string(),
      postalCode: z.string(),
      city: z.string(),
    }),
    contact: z.object({
      phone: z.string(),
      email: z.string().email(),
    }),
    voivodeships: z.array(z.string()).default([]),
  }),
});

export const collections = { products, categories, partners };
