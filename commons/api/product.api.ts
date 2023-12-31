import { ApiOf, makeApi, Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';
import z from 'zod';
import { categoriesSchema, productsSchema } from '../schema/product.schema';

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
      { name: 'select', type: 'Query', schema: z.string().optional() },
    ],
  },
  {
    method: 'get',
    path: '/products/search',
    alias: 'searchAllProducts',
    description: 'get all products',
    response: productsSchema,
    parameters: [
      { name: 'q', type: 'Query', schema: z.string().optional() },
      { name: 'limit', type: 'Query', schema: z.number().optional() },
      { name: 'skip', type: 'Query', schema: z.number().optional() },
      { name: 'select', type: 'Query', schema: z.string().optional() },
    ],
  },
  {
    method: 'get',
    path: '/products/category/:category',
    alias: 'productsByCategory',
    description: 'get all products by category',
    response: productsSchema,
    parameters: [
      { name: 'category', type: 'Path', schema: z.string().optional() },
      { name: 'q', type: 'Query', schema: z.string().optional() },
      { name: 'limit', type: 'Query', schema: z.number().optional() },
      { name: 'skip', type: 'Query', schema: z.number().optional() },
      { name: 'select', type: 'Query', schema: z.string().optional() },
    ],
  },
  {
    method: 'get',
    path: '/products/categories',
    alias: 'getAllCategories',
    description: 'get all categories',
    response: categoriesSchema,
  },
]);

export const productApiClient = new Zodios(BASE_URL, productApi);
export type ProductApiClient = ApiOf<typeof productApiClient>;

export const productApiHooks = new ZodiosHooks('productApi', productApiClient);
