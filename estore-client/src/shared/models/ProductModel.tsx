import Category from "./CategoryModel";

interface IObjectKeys {
  [key: string]: string | any;
}

interface Product extends IObjectKeys {
  productId?: number;
  title?: string;
  brand?: string;
  images?: string[] | File[] | Blob[];
  categories?: Category[];
  description?: string;
  status?: number | string;
  price?: number;
  discountedPrice?: number;
  warranty?: string;
  ratings?: [];
  sizes?: string[];
  colors?: string[];
  country?: string;
  quantity?: number;
}

export default Product;
