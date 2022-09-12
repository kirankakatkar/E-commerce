import * as React from "react";
import Category from "../../../shared/models/CategoryModel";

interface ContextProps {
  open: boolean;
  operation: string;
  initialCategory: Category;
  handleClose: () => void;
  loadCategories: Function;
  categories: Category[];
}

const CategoryContext = React.createContext<ContextProps>({
  open: false,
  operation: "add",
  loadCategories: () => {},
  handleClose: () => {},
  initialCategory: {},
  categories: [],
});

export default CategoryContext;
