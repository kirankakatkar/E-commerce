import * as React from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Product from "../../../shared/models/ProductModel";

interface IProductPricingProps {
  next: (e: React.SyntheticEvent) => void;
  previous: (e: React.SyntheticEvent) => void;
  product: Product;
  onChange: (e: any) => void;
}

const ProductPricing: React.FunctionComponent<IProductPricingProps> = ({
  next,
  product,
  onChange,
  previous,
}) => {
  return (
    <Paper sx={{ padding: 4 }}>
      <h3>Pricing</h3>

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Price"
              name="price"
              value={product?.price}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Discounted Price"
              name="discountedPrice"
              value={product?.discountedPrice}
              onChange={onChange}
            />
          </Grid>

          <Grid container marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={previous}
              sx={{ marginRight: "auto" }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={next}
              sx={{ marginLeft: "auto" }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default ProductPricing;
