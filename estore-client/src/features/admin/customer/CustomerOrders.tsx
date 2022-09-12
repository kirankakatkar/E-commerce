import { Button } from "@mui/material";
import * as React from "react";

interface ICustomerOrdersProps {
  next: (e: React.SyntheticEvent) => void;
  previous: (e: React.SyntheticEvent) => void;
}

const CustomerOrders: React.FunctionComponent<ICustomerOrdersProps> = ({
  next,
  previous,
}) => {
  return (
    <>
      <h3>Orders</h3>
      <Button onClick={previous}>Previous</Button>
      <Button color="primary" onClick={next}>
        Next
      </Button>
    </>
  );
};

export default CustomerOrders;
