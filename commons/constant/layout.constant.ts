import { IconType } from 'react-icons';
import { FiHome } from 'react-icons/fi';
import { BiPurchaseTag } from 'react-icons/bi';
import { GiShoppingCart } from 'react-icons/gi';

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

export const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, url: '/' },
  { name: 'Product', icon: BiPurchaseTag, url: '/product' },
  { name: 'Cart', icon: GiShoppingCart, url: '/cart' },
];
