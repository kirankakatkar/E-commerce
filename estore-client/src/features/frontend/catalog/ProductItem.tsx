import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { endpoints } from "../../../api";

import { useDispatch, useSelector } from "react-redux";
import { updateItem, selectCart } from "../../../app/slices/CartSlice";

interface Rating {
  rate: number;
}
interface IProductItemProps {
  _id: string;
  image?: string | Blob;
  title?: string;
  price: number;
  ratings: Rating[];
  brand?: string;
  discountedPrice: number;
  colors: string[];
  sizes: string[];
}

const ProductItem: React.FunctionComponent<IProductItemProps> = ({
  _id,
  brand,
  image,
  price,
  discountedPrice,
  ratings,
  title,
  colors,
  sizes,
}) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const ids = React.useMemo(() => {
    return cart.products.reduce((prev: string[], obj: any) => {
      return [...prev, obj._id];
    }, []);
  }, [cart.products]);

  const handleAddToCart = (id: string) => {
    if (id) {
      dispatch(updateItem({ _id: id, qty: 1 }));
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 250,
        minWidth: 225,
        border: "1px solid #aaa",
        boxShadow: "0 0 2px #9995",
        margin: 0.5,
        padding: 0.5,
      }}
    >
      <img
        src={`${endpoints.serverBaseURL}/${image as string}`}
        style={{ width: "100%", height: 250 }}
      />
      <h4>{title}</h4>
      <p>Brand: {brand}</p>
      <p>
        Price:
        {price > discountedPrice ? (
          <>
            {discountedPrice} <s style={{ color: "#666" }}>{price} </s>
          </>
        ) : (
          price
        )}
      </p>
      <Rating
        value={ratings?.reduce((p, r) => p + r.rate, 0) / ratings?.length}
        readOnly
      />
      <p>Colors:{colors.join(", ")} </p>
      <p>Sizes:{sizes.join(", ")} </p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAddToCart(_id)}
        disabled={ids.includes(_id)}
      >
        {ids.includes(_id) ? "Added" : "Add"} to cart
      </Button>
    </Box>
  );
};

export default ProductItem;
