import * as React from "react";
import Tabs from "@mui/material/Tabs";
import { Box, Tab, Snackbar, Alert, AlertColor } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomerDetails from "./CustomerDetails";
import CustomerService from "../../../services/CustomerService";
import Customer from "../../../shared/models/CustomerModel";
import CustomerOrders from "./CustomerOrders";
import CustomerCardDetails from "./CustomerCardDetails";
import CustomerShippingDetails from "./CustomerShippingDetails";

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

interface IAddEditCustomerProps {}
const AddEditCustomer: React.FunctionComponent<IAddEditCustomerProps> = (
  props
) => {
  const { op, id } = useParams();
  const [value, setValue] = React.useState(0);
  const [customer, setCustomer] = React.useState<Customer>({
    isSubmit: false,
  });
  const [openSnack, setOpenSnack] = React.useState<ISnackbar>({
    open: false,
    message: "",
    type: "success",
  });

  React.useEffect(() => {
    CustomerService.fetchOneCustomer(id)
      .then((response) => {
        setCustomer(response?.data?.data);
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
    setCustomer({ ...customer, [name]: value });
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

  const resetCustomer = () => {
    setCustomer({
      status: 1,
    });
  };

  const handleSubmit = () => {
    const { title, brand, price } = customer;

    if (!title || !brand || !price)
      return setCustomer({ ...customer, isSubmit: true });

    const fd = new FormData();

    for (const prop in customer as Iterable<string>) {
      const value = customer[prop];
      if (prop != "images") fd.append(prop, value);
    } //for

    for (const f of customer.images as Blob[]) {
      console.log("File", f);

      fd.append("images", f);
    }

    if (op == "edit") {
      CustomerService.updateCustomer(customer._id, fd)
        .then((response) => {
          const message = response.data?.message || "Customer Updated";
          setOpenSnack({
            open: true,
            message: message,
            type: "success",
          });
          resetCustomer();
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
      CustomerService.createCustomer(fd as any)
        .then((response) => {
          const message = response.data?.message || "Product created";
          setOpenSnack({
            open: true,
            message: message,
            type: "success",
          });
          resetCustomer();
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
          <Tab value={1} label="Orders" />
          <Tab value={2} label="Payment Details" />
          <Tab value={3} label="Customer Shipping Details" />
        </Tabs>
      </Box>

      <Box component="section">
        <TabPanel value={value} index={0}>
          <CustomerDetails
            next={next}
            customer={customer}
            onChange={handleChange}
            setCustomer={setCustomer}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomerOrders
            next={next}
            previous={previous}
            // product={product}
            // setCustomer={setCustomer}
            // onChange={handleChange}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CustomerCardDetails
            next={next}
            previous={previous}
            // product={product}
            // setCustomer={setCustomer}
            // onChange={handleChange}
            />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <CustomerShippingDetails
            previous={previous}
            onChange={handleChange}
            onSubmit={handleSubmit}
            setCustomer={setCustomer}
            customer={customer}
          />
        </TabPanel>
      </Box>
    </>
  );
};

export default AddEditCustomer;
