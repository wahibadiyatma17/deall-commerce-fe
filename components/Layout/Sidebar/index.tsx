import React, { FC } from 'react';
import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { useWindowSize } from 'usehooks-ts';
import 'twin.macro';

import { LayoutProps } from '..';
import MobileNavigation from './components/MobileNavigation';
import SidebarContent from './components/SidebarContent';

const Sidebar: FC<LayoutProps> = (props) => {
  const { children } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useWindowSize().width < 768;

  return (
    <div tw="w-full h-full">
      {!isMobile && <SidebarContent onClose={() => onClose} />}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNavigation onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={4} pt={{ md: '7rem' }}>
        {children}
      </Box>
    </div>
  );
};

export default Sidebar;
