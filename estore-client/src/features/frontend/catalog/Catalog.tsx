import * as React from "react";
import Grid from "@mui/material/Grid";
import ProductListing from "./ProductListing";
import Product from "../../../shared/models/ProductModel";
import ProductService from "../../../services/ProductService";
import CatalogSidebar from "./CatalogSidebar";
import { useSearchParams } from "react-router-dom";
import SortProduct from "./SortProduct";

interface ICatalogProps {}

interface IFilterProduct {
  colors: string[];
  sizes: string[];
}

const Catalog: React.FunctionComponent<ICatalogProps> = (props) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterState, setFilterState] = React.useState<IFilterProduct>({
    colors: [],
    sizes: [],
  });

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
    ProductService.fetchAllProduct().then((response) => {
      const prods = response.data.data;
      const colors = prods.reduce((pre: string[], prod: Product) => {
        Array.isArray(prod.colors) && pre.push(...prod.colors);
        return pre;
      }, []);

      const sizes = prods.reduce((pre: string[], prod: Product) => {
        Array.isArray(prod.sizes) && pre.push(...prod.sizes);
        return pre;
      }, []);

      console.log("colors", colors);
      console.log("sizes", sizes);

      setFilterState({
        colors: Array.from(new Set(colors)),
        sizes: Array.from(new Set(sizes)),
      });
    });

    console.log("search tostring: ");

    loadProducts(searchParams.toString());
  }, [searchParams]);

  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <CatalogSidebar filterState={filterState} />
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={9}
        justifyContent="flex-end"
        sx={{ p: 2 }}
      >
        <Grid xs={12} md={4}>
          <SortProduct />
        </Grid>
        <Grid xs={12}>
          <ProductListing products={products} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Catalog;
