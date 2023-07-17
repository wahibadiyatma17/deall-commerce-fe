import Product from '@/features/Product';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const ProductPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Product | Dealls</title>
        <meta name="description" content={'Product Page'} />
        <meta name="title" content={'Product'} />
      </Head>
      <Product />;
    </>
  );
};

export default ProductPage;
