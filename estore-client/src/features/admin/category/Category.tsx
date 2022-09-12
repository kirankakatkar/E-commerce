import * as React from "react";
import CategoryList from "./CategoryList";

interface ICategoryProps {}

const Category: React.FunctionComponent<ICategoryProps> = (props) => {
  return (
    <>
      <CategoryList />
    </>
  );
};

export default Category;
