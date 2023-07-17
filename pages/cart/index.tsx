import Cart from '@/features/Cart';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const CartPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cart | Dealls</title>
        <meta name="description" content={'Cart Page Dealls'} />
        <meta name="title" content={'Cart'} />
      </Head>
      <Cart />;
    </>
  );
};

export default CartPage;
