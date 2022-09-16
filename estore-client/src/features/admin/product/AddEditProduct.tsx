import * as React from "react";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import BasicProductDetails from "./BasicProductDetails";
import ProductCategories from "./ProductCategories";
import ProductPricing from "./ProductPricing";
import ProductRating from "./ProductRating";
import ProductImages from "./ProductImages";
import Product from "../../../shared/models/ProductModel";
import ProductService from "../../../services/ProductService";
interface ITabPanelProps {
  value: number;
  index: number;
  children: any;
}

const TabPanel: React.FunctionComponent<ITabPanelProps> = ({
  value,
  index,
  children,
}) => {
  return value == index ? children : null;
};
interface ISnackbar {
  open: boolean;
  message: string;
  type: AlertColor;
}

interface IAddEditProductProps {}
const AddEditProduct: React.FunctionComponent<IAddEditProductProps> = (
  props
) => {
  const { op, id } = useParams();
  const [value, setValue] = React.useState(0);
  const [product, setProduct] = React.useState<Product>({});
  const [initialProduct, setInitialProduct] = React.useState<Product>({});
  const [openSnack, setOpenSnack] = React.useState<ISnackbar>({
    open: false,
    message: "",
    type: "success",
  });

  React.useEffect(() => {
    if (op == "edit")
      ProductService.fetchOneProduct(id)
        .then((response) => {
          console.log("PPPP: ", response.data);

          setProduct(response?.data?.data);
          setInitialProduct(response?.data?.data);
        })
        .catch((err) => {
          console.log(err);

          const message =
            (err?.response?.data && err?.response?.data?.message) ||
            "Could not load the details, realod the page!";
          setOpenSnack({
            type: "error",
            message: message,
            open: true,
          });
        });
  }, [id]);

  const handleSnackbarClose = () => {
    setOpenSnack({
      ...openSnack,
      open: false,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const next = () => {
    if (value < 3) setValue(value + 1);
  };

  const previous = () => {
    if (value > 0) setValue(value - 1);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const resetProduct = () => {
    setProduct({
      status: 1,
    });
  };

  const handleSubmit = () => {
    const { title, brand, price } = product;

    if (!title || !brand || !price) return alert("Fill the product details");

    const fd = new FormData();

    if (op == "edit") {
      const compareProps = (old: Product, newObj: Product, outer?: string) => {
        const currObjKeys = Object.keys(newObj);

        for (const prop of currObjKeys) {
          const newVal = newObj[prop];
          if (newVal && old[prop] != newVal) {
            if (!Array.isArray(newVal) && typeof newVal == "object") {
              compareProps(old[prop], newVal, prop);
            } else if (prop != "images") {
              fd.append(`${outer ? outer + "." : ""}${prop}`, newVal);
            }
          }
        }
      };

      compareProps(initialProduct, product);

      // if (Array.isArray(product.images))
      if (
        Array.isArray(product.images) &&
        typeof product?.images[0] != "string"
      )
        for (const f of product.images as Blob[]) {
          fd.append("images", f);
        }
      ProductService.updateProduct(product._id, fd)
        .then((response) => {
          const message = response.data?.message || "Product updated";
          setOpenSnack({
            open: true,
            message: message,
            type: "success",
          });
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "Could not updated";
          setOpenSnack({
            open: true,
            message: message,
            type: "error",
          });
          resetProduct();
        });
    } else {
      for (const prop in product as Iterable<string>) {
        const value = product[prop];
        if (prop != "images") fd.append(prop, value);
      } //for

      // if (Array.isArray(product.images))
      for (const f of product.images as Blob[]) {
        fd.append("images", f);
      }
      ProductService.createProduct(fd)
        .then((response) => {
          const message = response.data?.message || "Product created";
          setOpenSnack({
            open: true,
            message: message,
            type: "success",
          });
          resetProduct();
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "Could not created";
          setOpenSnack({
            open: true,
            message: message,
            type: "error",
          });
        });
    }//else
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnack.open}
        onClose={handleSnackbarClose}
        message={openSnack.message}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={openSnack.type}
          sx={{ width: "100%" }}
        >
          {openSnack.message}
        </Alert>
      </Snackbar>
      ;
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value={0} label="Basic Details" />
          <Tab value={1} label="Category" />
          <Tab value={2} label="Pricing" />
          <Tab value={3} label="Images" />
        </Tabs>
      </Box>
      <Box component="section">
        <TabPanel value={value} index={0}>
          <BasicProductDetails
            next={next}
            product={product}
            onChange={handleChange}
            setProduct={setProduct}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProductCategories
            next={next}
            previous={previous}
            product={product}
            onChange={handleChange}
            setProduct={setProduct}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProductPricing
            next={next}
            previous={previous}
            product={product}
            onChange={handleChange}
          />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <ProductImages
            previous={previous}
            onSubmit={handleSubmit}
            setProduct={setProduct}
            product={product}
          />
        </TabPanel>
      </Box>
    </>
  );
};

export default AddEditProduct;
