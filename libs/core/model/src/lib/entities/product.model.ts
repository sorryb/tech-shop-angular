export interface ProductOrder {
  id?: string;
  product: Product;
  quantity: number;
}

export interface Product {
  id: string | number;
  img: string;
  name: string;
  price: number;
  size: string;
  productType: ProductType;
  ingredients?: string[];
  reviews?: {
    count: number;
    stars: number;
  };
}

export type ProductType = 'PIZZA' | 'STEAK' | 'PASTA' | 'DRINKS';
