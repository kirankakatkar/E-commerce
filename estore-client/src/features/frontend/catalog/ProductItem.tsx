import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { endpoints } from "../../../api";

import { useDispatch } from "react-redux";
import { addItem } from "../../../app/slices/CartSlice";

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
}

const ProductItem: React.FunctionComponent<IProductItemProps> = ({
  _id,
  brand,
  image,
  price,
  discountedPrice,
  ratings,
  title,
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (id: string) => {
    if (id) {
      dispatch(addItem({ _id: id }));
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
      {/* <p>Colors:{colors.join(", ")}</p>
      <p>Sizes:{colors.join(", ")}</p> */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAddToCart(_id)}
      >
        Add to cart
      </Button>
    </Box>
  );
};

export default ProductItem;
