import { ApiOf, makeApi, Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';
import { cartSchema, cartsSchema } from '../schema/cart.schema';
import { BASE_URL } from './product.api';
import { z } from 'zod';

export const cartApi = makeApi([
  {
    method: 'get',
    path: '/carts',
    alias: 'allCart',
    description: 'get all cart',
    response: cartsSchema,
    parameters: [
      { name: 'limit', type: 'Query', schema: z.number().optional() },
      { name: 'skip', type: 'Query', schema: z.number().optional() },
    ],
  },
  {
    method: 'get',
    path: '/carts/:id',
    alias: 'cartDetails',
    description: 'get cart details',
    response: cartSchema,
    parameters: [
      { name: 'id', type: 'Path', schema: z.number() },
      { name: 'limit', type: 'Query', schema: z.number().optional() },
      { name: 'skip', type: 'Query', schema: z.number().optional() },
    ],
  },
]);

export const cartApiClient = new Zodios(BASE_URL, cartApi);
export type CartApiClient = ApiOf<typeof cartApiClient>;

export const cartApiHooks = new ZodiosHooks('cartApi', cartApiClient);
