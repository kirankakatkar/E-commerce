import * as React from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Product from "../../../shared/models/ProductModel";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
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
  previous: (e: React.SyntheticEvent) => void;
  customer: Customer;
  onChange: (e: any) => void;
  onSubmit: (e: any) => void;
  setCustomer: (state: Customer) => void;
}

const CustomerDetails: React.FunctionComponent<ICustomerDetailsProps> = ({
  customer,
  onChange,
  onSubmit,
  setCustomer,
}) => {
  const [sizes, setSizes] = React.useState<readonly Size[]>([]);
  const [colors, setColors] = React.useState<readonly Color[]>([]);

  React.useEffect(() => {
    const existingSizes =
      Array.isArray(customer?.sizes) &&
      customer?.sizes.map((size: string, i: number) => {
        return { key: i, label: size };
      });

    if (existingSizes) setSizes(existingSizes);

    const existingColors =
      Array.isArray(customer?.colors) &&
      customer?.colors.map((color: string, i: number) => {
        return { key: i, label: color };
      });

    if (existingColors) setColors(existingColors);
  }, [customer]);

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // check whether the enter key pressed
    if (e.code == "Enter") {
      if ((e.target as HTMLInputElement).value == "") return false;
      // access the value from the target
      const { value } = e.target as HTMLInputElement;
      // reset the textfield value
      (e.target as HTMLInputElement).value = "";
      // check whether the size is already added
      const existingSize = sizes.find(
        (size) => size.label.toLowerCase() == value.toLowerCase()
      );
      if (existingSize) return;

      // find the maxid of existing sizes
      const maxKey =
        sizes &&
        (sizes as any[]).reduce(
          (prev: number, size: Size) => (prev > size.key ? prev : size.key),
          0
        );
      // set the new size in the sizes state
      setSizes((sizes) => [...sizes, { key: maxKey + 1, label: value }]);
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
      const existingColor = colors.find(
        (color) => color.label.toLowerCase() == value.toLowerCase()
      );
      if (existingColor) return;

      // find the maxid of existing colors
      const maxKey =
        colors &&
        (colors as any[]).reduce(
          (prev: number, color: Color) => (prev > color.key ? prev : color.key),
          0
        );
      // set the new color in the colors state
      setColors((colors) => [...colors, { key: maxKey + 1, label: value }]);
    }
  };

  const handleDelete = (chipToDelete: Size) => () => {
    // remove the current select size

    setSizes((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  const handleColorDelete = (chipToDelete: Color) => () => {
    // remove the current select Color

    setColors((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, name: { ...customer.name, [name]: value } });
  };

//   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setCustomer({ ...customer, address: { ...customer.address, [name]: value } });
//   };

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

          {/* <Grid container marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ marginLeft: "auto" }}
            >
              Next
            </Button>
          </Grid> */}
        </Grid>
      </Container>
    </Paper>
  );
};

export default CustomerDetails;
