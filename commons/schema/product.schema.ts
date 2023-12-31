import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string(),
  category: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()),
});

export type ProductType = z.infer<typeof productSchema>;

export const productsSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type ProductsType = z.infer<typeof productsSchema>;

export const categoriesSchema = z.array(z.string());
export type CategoriesType = z.infer<typeof categoriesSchema>;
