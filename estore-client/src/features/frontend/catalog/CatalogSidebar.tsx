import * as React from "react";

import Box from "@mui/material/Box";
import { Theme } from "@mui/material";
import ProductCategories from "./ProductCategories";
import FilterProduct from "./FilterProduct";

interface ICatalogSidebarProps {
  filterState: { colors: string[]; sizes: string[] };
}

const CatalogSidebar: React.FunctionComponent<ICatalogSidebarProps> = ({
  filterState,
}) => {
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

      {/* <FilterProduct name="sizes" title="Sizes" data={["s", "m", "l", "xl"]} /> */}
      <FilterProduct name="sizes" title="Sizes" data={filterState.sizes} />

      {/* <FilterProduct
        name="colors"
        title="Colors"
        data={["red", "green", "blue", "cyan"]}
      /> */}
      <FilterProduct name="colors" title="Colors" data={filterState.colors} />
    </Box>
  );
};

export default CatalogSidebar;
