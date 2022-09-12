import * as React from "react";
import { Routes, Route } from "react-router-dom";
import AddEditCustomer from "./AddEditCustomer";
import CustomerList from "./CustomerList";

interface IProductProps {}

const Product: React.FunctionComponent<IProductProps> = (props) => {
  return (
    <>
    {/* <h2>Customers</h2> */}
      <Routes>
        <Route path="" element={<CustomerList />} />
        <Route path=":op/:id" element={<AddEditCustomer />} />
      </Routes>
    </>
  );
};

export default Product;
