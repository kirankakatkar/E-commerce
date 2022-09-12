import * as React from "react";
import Tabs from "@mui/material/Tabs";
import { Box, Tab, Snackbar, Alert, AlertColor } from "@mui/material";
import BasicProductDetails from "./BasicProductDetails";
import ProductCategories from "./ProductCategories";
import ProductPricing from "./ProductPricing";
import ProductImages from "./ProductImages";
import Product from "../../../shared/models/ProductModel";
import { useParams } from "react-router-dom";
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
  const [product, setProduct] = React.useState<Product>({
    isSubmit: false,
  });
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
  const [openSnack, setOpenSnack] = React.useState<ISnackbar>({
    open: false,
    message: "",
    type: "success",
  });

  React.useEffect(() => {
    ProductService.fetchOneProduct(id)
      .then((response) => {
        setProduct(response?.data?.data);
      })
      .catch((err) => {
        const message =
          (err.response.data && err.response.data.message) ||
          "Could not load the details, reload the page!";
        // alert(message);
      });
  }, [id]);

  const handleSnackbarClose = () => {
    setOpenSnack({ ...openSnack, open: false });
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

    if (!title || !brand || !price)
      return setProduct({ ...product, isSubmit: true });

    const fd = new FormData();

    for (const prop in product as Iterable<string>) {
      const value = product[prop];
      if (prop != "images") fd.append(prop, value);
    } //for

    for (const f of product.images as Blob[]) {
      console.log("File", f);

      fd.append("images", f);
    }

    if (op == "edit") {
      ProductService.updateProduct(product._id, fd)
        .then((response) => {
          const message = response.data?.message || "Product Updated";
          setOpenSnack({
            open: true,
            message: message,
            type: "success",
          });
          resetProduct();
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "Could not updated";
          setOpenSnack({
            open: true,
            message: message,
            type: "error",
          });
        });
    } else {
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
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={openSnack.message}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={openSnack.type}
          sx={{ width: "100%" }}
        >
          {openSnack.message}
        </Alert>
      </Snackbar>

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
            // setProduct={setProduct}
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
