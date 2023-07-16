import { CloseButton } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import 'twin.macro';

import NavigationItem, { StyledNavigationItem } from './NavigationItem';

import { IoLogInOutline } from 'react-icons/io5';

import { LinkItems } from '@/commons/constant/layout.constant';
import { useRouter } from 'next/router';
import { useWindowSize } from 'usehooks-ts';

interface BaseSidebarContentProps {
  onClose: () => void;
}

type SidebarContentProps = BaseSidebarContentProps;

const SidebarContent: FC<SidebarContentProps> = (props) => {
  const { onClose } = props;

  const isMobile = useWindowSize().width < 768;

  return (
    <div tw="fixed flex flex-col gap-4 h-full w-full border-r-[1px] border-solid bg-white md:(w-[15rem] py-4 )">
      <div tw="flex justify-between items-center mx-6 my-4">
        <div tw="relative w-full h-[4rem] flex items-center justify-center ">
          <div tw="relative w-[5rem] h-[5rem] ml-10 md:ml-0">
            <Image src={'/dealls-mobile.svg'} alt="logo" fill style={{ objectFit: 'contain' }} />
          </div>
        </div>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </div>
      {LinkItems.map((link) => (
        <div tw="w-full" key={link.name}>
          <NavigationItem icon={link.icon} url={link.url}>
            {link.name}
          </NavigationItem>
        </div>
      ))}
      {isMobile && (
        <StyledNavigationItem onClick={() => {}}>
          <IoLogInOutline tw="w-5 h-5 text-[#EE7B86]" />
          <span tw="text-[#EE7B86] font-semibold ml-4">Logout</span>
        </StyledNavigationItem>
      )}
    </div>
  );
};

export default SidebarContent;
