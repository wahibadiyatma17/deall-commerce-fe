import { ProductType } from '../schema/product.schema';

export function filterByBrand(products: ProductType[], brands: string[]): ProductType[] {
  return products.filter((product) => brands.includes(product.brand));
}

export function filterByTitle(products: ProductType[], titles: string[]): ProductType[] {
  return products.filter((product) => titles.includes(product.title));
}

export function filterByPrice(
  products: ProductType[],
  minPrice?: number,
  maxPrice?: number,
): ProductType[] {
  return products.filter((product) => {
    if (minPrice && maxPrice) {
      return product.price >= minPrice && product.price <= maxPrice;
    } else if (minPrice) {
      return product.price >= minPrice;
    } else if (maxPrice) {
      return product.price <= maxPrice;
    }
    return true;
  });
}
