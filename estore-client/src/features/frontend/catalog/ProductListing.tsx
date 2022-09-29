import * as React from "react";

import Box from "@mui/material/Box";
import Product from "../../../shared/models/ProductModel";
import ProductItem from "./ProductItem";

interface IProductListingProps {
  products: Product[];
}

const ProductListing: React.FunctionComponent<IProductListingProps> = ({
  products,
}) => {
  return (
    <Box component="section" sx={{ display: "flex" }} flexWrap="wrap">
      {Array.isArray(products) &&
        products.map(
          ({
            _id,
            images,
            title,
            brand,
            price,
            discountedPrice,
            ratings,
            sizes,
            colors,
          }) => (
            <ProductItem
              key={_id}
              _id={_id}
              image={images && images[0]}
              title={title}
              brand={brand}
              price={price as number}
              discountedPrice={discountedPrice as number}
              ratings={ratings as any[]}
              sizes={sizes as any[]}
              colors={colors as any[]}
            />
          )
        )}
    </Box>
  );
};

export default ProductListing;

// const ratings = [
//     {rate:2},
//     {rate:3},
//     {rate:1},
//     {rate:5},
//     {rate:4},
//     {rate:2},
// ]

// const sum = ratings.reduce((p,r)=>p+r.rate,0)

// const rate = sum/ratings.length
