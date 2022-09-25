import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Item {
  _id: string;
  qty: number;
}

type MyState = { products: Item[] };

const initialState: MyState = { products: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const products = [...state.products];
      const index = products.findIndex((prod) => prod._id == payload._id);
      if (index != -1) {
        //   product is already added in the cart
        // increment the quantity

        const product = { ...products[index] };
        product.qty = product.qty + 1;
        products.splice(index, 1, product);

        return { products: products };
      } else {
        return { products: [...products, { ...payload, qty: 1 }] };
      }
    },
    removeItem: (state, { payload }) => {
      const products = [...state.products];
      const index = products.findIndex((prod) => prod._id == payload._id);
      if (index >= 0) {
        const prod = products[index];
        if (prod.qty > 1) prod.qty = prod.qty - 1;
        else products.splice(index, 1);
      }
      return { products: products };
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
