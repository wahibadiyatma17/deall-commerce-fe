import { Avatar, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Image from 'next/image';
import router from 'next/router';
import { FC, useEffect, useState } from 'react';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { IoLogInOutline } from 'react-icons/io5';
import 'twin.macro';
import { useWindowSize } from 'usehooks-ts';

interface BaseMobileNavigationProps {
  onOpen: () => void;
}
type MobileNavigationProps = BaseMobileNavigationProps;

const MobileNavigation: FC<MobileNavigationProps> = (props) => {
  const { onOpen } = props;
  const isMobile = useWindowSize().width < 768;
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    if (router.pathname === '/') {
      setPageTitle('Home');
    } else if (router.pathname === '/product') {
      setPageTitle('Product');
    } else if (router.pathname === '/cart') {
      setPageTitle('Cart');
    } else {
      setPageTitle('Cart Detail');
    }
  }, []);

  if (isMobile)
    return (
      <div tw="flex items-center w-full min-w-[100vw] bg-white shadow-md px-4 py-2 gap-4 justify-between">
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
          tw="ml-4"
        />
        <div tw="flex gap-2 items-center">
          <div tw="relative w-[5rem] h-[5rem]">
            <Image src={'/dealls-mobile.svg'} alt="logo" fill style={{ objectFit: 'contain' }} />
          </div>
        </div>
        <div />
      </div>
    );
  else
    return (
      <div tw="flex items-center z-50 bg-white fixed top-0 w-[calc(100%-15rem)] min-h-[5rem] h-[max-content] justify-between md:(ml-[15rem] justify-end)">
        <div tw="flex flex-col w-full h-full p-[1rem] shadow-md md:(gap-4)">
          <div tw="flex items-center justify-between">
            <h1 tw="text-4xl font-bold text-[#601BD0] capitalize">{pageTitle}</h1>

            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <div tw="flex gap-4 items-center">
                  <Avatar size={'md'} src={'/icons/icon-empty-profile.webp'} />
                  <div tw="flex flex-col items-start">
                    <span tw="font-bold text-[#601BD0]">Wahib Adiyatma</span>
                    <span tw="font-normal text-[#601BD0]">Admin</span>
                  </div>
                  <div tw="hidden md:flex">
                    <FiChevronDown tw="text-[#601BD0] w-5 h-5" />
                  </div>
                </div>
              </MenuButton>
              <MenuList tw="bg-white border-[1px] border-solid">
                <MenuItem tw="flex items-center gap-2 text-[#EE7B86]" onClick={() => {}}>
                  <IoLogInOutline tw="w-5 h-5" />
                  <span>Log out</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    );
};

export default MobileNavigation;
