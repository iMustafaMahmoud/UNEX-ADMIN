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
  XXXL = 'xxxl',
  XXXXL = 'xxxxl',
  XXXXXL = 'xxxxxl',
}

export interface AddProductPayload {
  enName: string;
  arName: string;
  arDescription: string;
  enDescription: string;
  Price: number;
  Discount: number;
  PhotoUrls: string[];
}

export interface EditProductPayload {
  enName: string;
  arName: string;
  arDescription: string;
  enDescription: string;
  price: number;
  discount: number;
  images: string[];
  subCategoryId?: string;
}
export interface productById {
  arDescription: string;
  arName: string;
  discount: number;
  discountedPrice: number;
  enDescription: string;
  enName: string;
  images: string[];
  info: Info[];
  price: number;
  subCategoryArName: string;
  subCategoryEnName: string;
  subCategoryId: string;
}
