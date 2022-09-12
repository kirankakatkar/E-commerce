import * as React from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Product from "../../../shared/models/ProductModel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Customer from "../../../shared/models/CustomerModel";

interface Size {
  key: number;
  label: string;
}
interface Color {
  key: number;
  label: string;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface ICustomerDetailsProps {
  next: () => void;
  customer: Customer;
  onChange: (e: any) => void;
  setCustomer: (state: Customer) => void;
}

const CustomerDetails: React.FunctionComponent<ICustomerDetailsProps> = ({
  next,
  customer,
  onChange,
  setCustomer,
}) => {
  React.useEffect(() => {}, []);

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // check whether the enter key pressed
    if (e.code == "Enter") {
      if ((e.target as HTMLInputElement).value == "") return false;
      // access the value from the target
      const { value } = e.target as HTMLInputElement;
      // reset the textfield value
      (e.target as HTMLInputElement).value = "";
      // check whether the size is already added
    }
  };

  const handleColorChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // check whether the enter key pressed
    if (e.code == "Enter") {
      // access the value from the target
      const { value } = e.target as HTMLInputElement;
      // reset the textfield value
      (e.target as HTMLInputElement).value = "";
      // check whether the color is already added
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, name: { ...customer.name, [name]: value } });
  };

  // const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setCustomer({
  //     ...customer,
  //     address: { ...customer.address, [name]: value },
  //   });
  // };

  return (
    <Paper sx={{ padding: 4 }}>
      <h3>Basic Customer Details</h3>

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="First Name"
              name="first"
              value={customer?.name?.first}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Last Name"
              name="last"
              value={customer?.name?.last}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              value={customer?.email}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              value={customer?.password}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Mobile"
              name="mobile"
              value={customer?.mobile}
              onChange={onChange}
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="City"
              name="city"
              value={customer?.address?.city}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Country"
              name="country"
              value={customer?.address?.country}
              onChange={handleAddressChange}
            />
          </Grid> */}

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="status">Status</InputLabel>
              <Select
                fullWidth
                labelId="status"
                value={customer.status}
                label="Status"
                name="status"
                onChange={onChange}
              >
                <MenuItem value="1">Active</MenuItem>
                <MenuItem value="0">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid container marginTop={2}>
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

export default CustomerDetails;
