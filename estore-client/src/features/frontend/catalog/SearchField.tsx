import * as React from "react";

import { Box, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";

interface ISearchFieldProps {}

const SearchField: React.FunctionComponent<ISearchFieldProps> = (props) => {
  const [value, setValue] = React.useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  React.useEffect(() => {
    if (value && value.length > 2) {
      const obj: any = {};
      for (const [prop, value] of searchParams) obj[prop] = value;

      setSearchParams({ ...obj, search: value });
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, [value]);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <TextField
        fullWidth
        type="search"
        placeholder="search here..."
        onChange={handleChange}
      />
    </Box>
  );
};

export default SearchField;
