export type ProductsState = {
  products: Prodcuct[];
  currentProduct: EditProductPayload[];
};

export interface Prodcuct {
  productId: string;
  name: string;
  description: string;
  discount: number;
  discountedPrice: number;
  images: string[];
  info: Info[];
  price: number;
  subCategoryName: string;
  enName?: string;
  arName?: string;
}

export interface Info {
  id: string;
  color: string;
  countBySize: SizesCount[];
}

export interface SizesCount {
  size: Size;
  count: number;
}

export enum Size {
  XS = 'xs',
  S = 's',
  M = 'm',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',
}

export interface AddProductPayload {
  enName: string;
  ArName: string;
  ArDescription: string;
  EnDescription: string;
  Price: number;
  Discount: number;
  PhotoUrls: string[];
}

export interface EditProductPayload {
  arCateogryName: string;
  enCategoryName: string;
}
