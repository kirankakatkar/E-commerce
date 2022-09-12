import { Button } from "@mui/material";
import * as React from "react";

interface IProductRatingProps {
  next: (e: React.SyntheticEvent) => void;
  previous: (e: React.SyntheticEvent) => void;
}

const ProductRating: React.FunctionComponent<IProductRatingProps> = ({
  next,
  previous,
}) => {
  return (
    <>
      <h3>Product Rating</h3>
      <Button onClick={previous}>Previous</Button>
      <Button color="primary" onClick={next}>
        Next
      </Button>
    </>
  );
};

export default ProductRating;
