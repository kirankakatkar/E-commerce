import React, { FunctionComponent, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import CategoryService from "../../../services/CategoryService";
import Category from "../../../shared/models/CategoryModel";
import CategoryTree from "../../../ui/category-tree/CategoryTree";
import { useSearchParams } from "react-router-dom";

interface IProductCategories {}

const ProductCategories: FunctionComponent<IProductCategories> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // load all the categories from the server
  useEffect(() => {
    const values = searchParams.get("cat");
    const arr = values?.split("_");
    if (arr && arr?.length > 0) setSelected(arr);

    CategoryService.fetchAllCategory().then((response) => {
      if (response.data) setCategories(response.data.data);
    });
  }, []);

  useEffect(() => {
    if (selected.length > 0) setSearchParams({ cat: selected.join("_") });
  }, [selected]);

  React.useEffect(() => {
    if (selected.length > 0) {
      const obj: any = {};
      for (const [prop, value] of searchParams) obj[prop] = value;

      setSearchParams({ ...obj, cat: selected.join("_") });
    }
  }, [selected]);

  return (
    <>
      <Paper sx={{ padding: 4, height: 250, maxHeight: 250, overflow: "auto" }}>
        <h3>Categories</h3>

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CategoryTree
                selected={selected}
                setSelected={setSelected}
                categories={categories}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default ProductCategories;
