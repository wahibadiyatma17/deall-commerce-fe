import { FC, useMemo } from 'react';
import { CloseButton, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import 'twin.macro';

import NavigationItem, { cssNavigationItem, StyledNavigationItem } from './NavigationItem';

import { IoLogInOutline } from 'react-icons/io5';

import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useWindowSize } from 'usehooks-ts';
import { LinkItems } from '@/commons/constant/layout.constant';

interface BaseSidebarContentProps {
  onClose: () => void;
}

type SidebarContentProps = BaseSidebarContentProps;

const SidebarContent: FC<SidebarContentProps> = (props) => {
  const { onClose } = props;

  const queryClient = useQueryClient();
  const isMobile = useWindowSize().width < 768;
  const router = useRouter();
  return (
    <div tw="fixed flex flex-col gap-4 h-full w-full border-r-[1px] border-solid bg-white md:(w-[15rem] py-4 )">
      <div tw="flex justify-between items-center mx-6 my-4">
        <div tw="relative w-full h-[4rem] flex items-center justify-center ">
          <h6 tw="font-[900] text-xl text-[#601BD0]">Deall Commerce</h6>
        </div>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </div>
      {LinkItems.map((link) => (
        <NavigationItem icon={link.icon} url={link.url}>
          {link.name}
        </NavigationItem>
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
