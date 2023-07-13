import React, { FC } from 'react';
import 'twin.macro';
import Sidebar from './Sidebar';

interface BaseLayoutProps {
  children?: React.ReactNode;
}

export type LayoutProps = BaseLayoutProps;

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;
  return (
    <div tw="w-screen h-screen relative overflow-x-hidden">
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default Layout;
