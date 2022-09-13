import * as React from "react";
import Grid from "@mui/material/Grid";
import ProductListing from "./ProductListing";
import Product from "../../../shared/models/ProductModel";
import ProductService from "../../../services/ProductService";
import CatalogSidebar from "./CatalogSidebar";
import { useSearchParams } from "react-router-dom";
interface ICatalogProps {}

const Catalog: React.FunctionComponent<ICatalogProps> = (props) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const loadProducts = (query: string) => {
    ProductService.fetchAllProduct(`?${query}`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    console.log("search tostring: ");

    loadProducts(searchParams.toString());
  }, [searchParams]);

  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <CatalogSidebar />
      </Grid>
      <Grid item container xs={12} md={9}>
        <Grid xs={12}>Sorting</Grid>
        <Grid xs={12}>
          <ProductListing products={products} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Catalog;
