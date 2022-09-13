import * as React from "react";

import Box from "@mui/material/Box";
import { Theme } from "@mui/material";
import ProductCategories from "./ProductCategories";
import FilterProduct from "./FilterProduct";

interface ICatalogSidebarProps {}

const CatalogSidebar: React.FunctionComponent<ICatalogSidebarProps> = (
  props
) => {
  return (
    <Box
      component="aside"
      sx={{
        backgroundColor: "primary.dark",
        padding: 2,
      }}
    >
      {/* catalogcategory  */}
      <ProductCategories />

      {/* filterproduct  */}

      <FilterProduct name="sizes" title="Sizes" data={["s", "m", "l", "xl"]} />

      <FilterProduct
        name="colors"
        title="Colors"
        data={["red", "green", "blue", "cyan"]}
      />
    </Box>
  );
};

export default CatalogSidebar;
