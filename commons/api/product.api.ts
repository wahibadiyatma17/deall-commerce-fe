import { ApiOf, makeApi, Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';
import z from 'zod';
import { productsSchema } from '../schema/product.schema';

export const BASE_URL = 'https://dummyjson.com/';

export const productApi = makeApi([
  {
    method: 'get',
    path: '/products',
    alias: 'allProducts',
    description: 'get all products',
    response: productsSchema,
    parameters: [
      { name: 'limit', type: 'Query', schema: z.number().optional() },
      { name: 'skip', type: 'Query', schema: z.number().optional() },
    ],
  },
]);

export const productApiClient = new Zodios(BASE_URL, productApi);
export type ProductApiClient = ApiOf<typeof productApiClient>;

export const productApiHooks = new ZodiosHooks('productApi', productApiClient);
