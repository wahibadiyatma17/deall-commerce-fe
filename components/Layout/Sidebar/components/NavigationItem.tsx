import React, { FC, useEffect, useState } from 'react';
import { Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';
import tw, { css, styled } from 'twin.macro';

interface BaseNavigationItemProps {
  icon: IconType;
  children: string | number;
  url: string;
}

type NavigationItemProps = BaseNavigationItemProps;

const NavigationItem: FC<NavigationItemProps> = (props) => {
  const { icon, children, url } = props;
  const router = useRouter();
  const [pageActive, setPageActive] = useState(router.pathname);
  const isPageActive = pageActive.includes(children.toString().toLowerCase());

  return (
    <StyledNavigationItem onClick={() => {}} css={cssNavigationItem(isPageActive)}>
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: '#601BD0',
          }}
          as={icon}
        />
      )}
      {children}
    </StyledNavigationItem>
  );
};

export default NavigationItem;

export const StyledNavigationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  color: #d0d2da;
  background-color: #ffffff;
  font-weight: 500;

  &:hover {
    background-color: #d6c1f9;
    color: #601bd0;
    font-weight: 700;
  }

  ${tw`transition-all`}
`;

export const cssNavigationItem = (isPageActive: boolean) => css`
  color: ${isPageActive ? '#601BD0' : '#d0d2da'};
  background-color: ${isPageActive ? '#D6C1F9' : '#ffffff'};
  font-weight: ${isPageActive ? '700' : '500'};
`;
