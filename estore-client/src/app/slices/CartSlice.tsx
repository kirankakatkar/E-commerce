
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
    updateItem: (state, { payload }) => {
      const products = [...state.products];
      const index = products.findIndex((prod) => prod._id == payload._id);
      if (index >= 0) {
        const prod = { ...products[index] };
        if (payload.qty == 0) {
          products.splice(index, 1);
        } else {
          prod.qty = payload.qty;
          products.splice(index, 1, prod);
        }
      } else {
        return { products: [...products, { ...payload }] };
      }
      return { products: products };
    },
  },
});

export const { updateItem } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
