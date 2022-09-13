import * as React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface ISearchFieldProps {}

const SearchField: React.FunctionComponent<ISearchFieldProps> = (props) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <TextField fullWidth type="search" placeholder="search here..." />
    </Box>
  );
};

export default SearchField;
