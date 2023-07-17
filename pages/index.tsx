import Home from '@/features/Home';
import Head from 'next/head';
import React, { FC } from 'react';
import 'twin.macro';

const HomePage: FC = () => {
  return (
    <>
      <Head>
        <title>Home | Dealls</title>
        <meta name="description" content={'Home Page Dealls'} />
        <meta name="title" content={'Home'} />
      </Head>
      <Home />;
    </>
  );
};

export default HomePage;
