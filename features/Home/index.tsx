import HomeMenuCard from '@/components/Cards/HomeMenuCard';
import Layout from '@/components/Layout';
import router from 'next/router';
import React, { FC } from 'react';
import { BiPurchaseTag } from 'react-icons/bi';
import { GiShoppingCart } from 'react-icons/gi';
import 'twin.macro';

const Home: FC = () => {
  return (
    <Layout>
      <div tw="h-full w-full flex items-center justify-center py-6 z-10">
        <div tw="flex flex-col items-center justify-center gap-8 max-w-[48rem]">
          <h3 tw="text-2xl text-[#555555] font-semibold">What activity do you want to do?</h3>
          <div tw="flex items-center justify-center gap-5 flex-wrap ">
            <HomeMenuCard
              icon={BiPurchaseTag}
              title="Product"
              onClick={() => {
                router.push('/product');
              }}
            />
            <HomeMenuCard
              icon={GiShoppingCart}
              title="Cart"
              onClick={() => {
                router.push('/cart');
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
