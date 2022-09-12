import { Button } from "@mui/material";
import * as React from "react";

interface ICustomerCardDetailsProps {
  next: (e: React.SyntheticEvent) => void;
  previous: (e: React.SyntheticEvent) => void;
}

const CustomerCardDetails: React.FunctionComponent<ICustomerCardDetailsProps> = ({
  next,
  previous,
}) => {
  return (
    <>
      <h3>Payment Details</h3>
      <Button onClick={previous}>Previous</Button>
      <Button color="primary" onClick={next}>
        Next
      </Button>
    </>
  );
};

export default CustomerCardDetails;
