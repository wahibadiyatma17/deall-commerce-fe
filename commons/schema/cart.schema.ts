import { z } from 'zod';

export const cartProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  total: z.number(),
  discountPercentage: z.number(),
  discountedPrice: z.number(),
});

export type CartProductType = z.infer<typeof cartProductSchema>;

export const cartSchema = z.object({
  id: z.number(),
  products: z.array(cartProductSchema),
  total: z.number(),
  discountedTotal: z.number(),
  userId: z.number(),
  totalProducts: z.number(),
  totalQuantity: z.number(),
});
export type CartType = z.infer<typeof cartSchema>;

export const cartsSchema = z.object({
  limit: z.number(),
  skip: z.number(),
  total: z.number(),
  carts: z.array(cartSchema),
});

export type CartsType = z.infer<typeof cartsSchema>;
