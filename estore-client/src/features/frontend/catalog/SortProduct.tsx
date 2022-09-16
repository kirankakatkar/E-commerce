import * as React from "react";
import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";

interface ISortProductProps {}

const SortProduct: React.FunctionComponent<ISortProductProps> = (props) => {
  const [value, setValue] = React.useState<string>("all");
  const [searchParams, setSearchParams] = useSearchParams("");

  const handleChange = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setValue(value);
  };

  React.useEffect(() => {
    if (value && value != "all") {
      const obj: any = {};
      for (const [prop, value] of searchParams) obj[prop] = value;

      setSearchParams({ ...obj, sortBy: value });
    } else {
      searchParams.delete("sortBy");
      setSearchParams(searchParams);
    }
  }, [value]);

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="sortBy">Sort By</InputLabel>
        <Select
          labelId="sortBy"
          id="demo-simple-select"
          value={value}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem selected value="all">
            Random
          </MenuItem>
          <MenuItem value="priceAsc">Price low to high</MenuItem>
          <MenuItem value="priceDesc">Price high to low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortProduct;
