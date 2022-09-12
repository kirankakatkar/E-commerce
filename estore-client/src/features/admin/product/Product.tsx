import * as React from "react";
import { Routes, Route } from "react-router-dom";
import AddEditProduct from "./AddEditProduct";
import ProductList from "./ProductList";

interface IProductProps {}

const Product: React.FunctionComponent<IProductProps> = (props) => {
  return (
    <>
      <Routes>
        <Route path="" element={<ProductList />} />
        <Route path=":op/:id" element={<AddEditProduct />} />
      </Routes>
    </>
  );
};

export default Product;
