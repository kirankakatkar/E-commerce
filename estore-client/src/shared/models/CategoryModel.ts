interface IObjectKeys {
  [key: string]: string | any;
}

interface Category extends IObjectKeys {
  _id?: string;
  catId?: number;
  title?: string;
  avatar?: string | File;
  subCategories?: Category[];
  parentCategories?: Category[] | string[];
  status?: number | string;
}

export default Category;
