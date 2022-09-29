import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useSelector, useDispatch } from "react-redux";
import { selectCart, updateItem } from "../../../app/slices/CartSlice";
import ProductService from "../../../services/ProductService";
import { endpoints } from "../../../api";
import Product from "../../../shared/models/ProductModel";
import DropDown from "../../../ui/dropdown/DropDown";

interface ICheckoutProps {}

interface ITotal {
  price: number;
  items: number;
  saved?: number;
}

const Checkout: React.FunctionComponent<ICheckoutProps> = (props) => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [total, setTotal] = React.useState<ITotal>({
    price: 0,
    items: 0,
  });

  const handleChange = (id: string, value: any) => {
    // const arr = [...products];
    // const index = arr.findIndex((prod) => prod._id == id);
    // if (index >= 0) {
    //   const obj = arr[index];
    //   obj.qty = value;
    //   setProducts(arr);
    // }

    dispatch(updateItem({ _id: id, qty: value }));
  };

  React.useEffect(() => {
    // fetch all the products of the cart

    const ids = cart.products.reduce((prev, prod) => {
      return prev + (prev ? "_" : "") + prod._id;
    }, "");

    if (ids)
      ProductService.fetchAllProduct(`?id=${ids}`)
        .then((response) => {
          if (response.data.data) {
            const arr = response.data.data.map((prod: Product) => {
              const obj = cart.products.find((p) => p._id == prod._id);
              return { ...prod, ...obj };
            });
            setProducts(arr);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, [cart.products]);

  React.useEffect(() => {
    if (Array.isArray(products)) {
      const totalPrice = products.reduce((prev, prod) => {
        if (prod && prod?.price) {
          return prev + prod?.price * prod?.qty;
        } else return prev;
      }, 0);

      const totalDPrice = products.reduce((prev, prod) => {
        if (prod && prod?.price) {
          return (
            prev +
            (prod?.discountedPrice ? prod.discountedPrice : prod.price) *
              prod?.qty
          );
        } else return prev;
      }, 0);

      const totalItems = products.reduce((prev, prod) => {
        return prev + prod.qty;
      }, 0);

      setTotal({
        price: totalDPrice,
        items: totalItems,
        saved: totalPrice - totalDPrice,
      });
    }
  }, [products]);

  return (
    <Container>
      <h3>Checkout</h3>

      <Grid container>
        <Grid container item spacing={2} xs={12} md={8}>
          {Array.isArray(products) &&
            products.map((prod) => {
              return (
                <Grid item xs={12}>
                  <Paper sx={{ padding: 2 }}>
                    <Grid container>
                      <Grid item xs={12} md={5} lg={4} xl={3}>
                        <img
                          src={`${endpoints.serverBaseURL}/${
                            prod.images && prod.images[0]
                          }`}
                          style={{ width: 150, height: 100 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={7} lg={8} xl={9}>
                        <h4>{prod.title}</h4>
                        <p>
                          Price:
                          {prod.discountedPrice ? (
                            <>
                              {prod.discountedPrice} <s>{prod.price} </s>
                            </>
                          ) : (
                            prod.price
                          )}
                        </p>
                        <p>Qty: {prod.qty}</p>

                        <DropDown
                          label="Qty"
                          value={prod.qty}
                          handleChange={(e) =>
                            handleChange(prod._id, e.target.value)
                          }
                          items={[
                            { value: 0, label: "0 (delete)" },
                            { value: 1, label: "1" },
                            { value: 2, label: "2" },
                            { value: 3, label: "3" },
                            { value: 4, label: "4" },
                            { value: 5, label: "5" },
                            { value: 6, label: "6" },
                            { value: 7, label: "7" },
                            { value: 8, label: "8" },
                            { value: 9, label: "9" },
                            { value: 10, label: "10" },
                          ]}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <h4>Total Items: {total.items}</h4>
            <p>Subtotal: {total.price}</p>
            <p>You Saved: {total.saved}</p>
            <Button variant="contained" color="primary" fullWidth>
              Proceed to pay
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
