import CartDetail from '@/features/Cart/CartDetail';
import { NextPage } from 'next';
import Head from 'next/head';

const CartDetailPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cart Details | Dealls</title>
        <meta name="description" content={'Cart Details Page Dealls'} />
        <meta name="title" content={'Cart Details'} />
      </Head>
      <CartDetail />;
    </>
  );
};

export default CartDetailPage;
