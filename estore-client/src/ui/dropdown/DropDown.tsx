import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface IDropDownProps {
  handleChange: (e: SelectChangeEvent) => void;
  value: any;
  items: any[];
  label: string;
}

const DropDown: React.FunctionComponent<IDropDownProps> = ({
  handleChange,
  value,
  items,
  label,
}) => {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          id={label}
          value={value}
          label={label}
          onChange={handleChange}
        >
          {Array.isArray(items) &&
            items.map((item: any) => (
              <MenuItem value={item.value}>{item.label}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default DropDown;
