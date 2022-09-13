import * as React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSearchParams } from "react-router-dom";

interface IFilterProductProps {
  title: string;
  name: string;
  data: any[];
}

// const sizes = ["s","m","l","xl"]

const FilterProduct: React.FunctionComponent<IFilterProductProps> = ({
  title,
  name,
  data,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selected, setSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    const values = searchParams.get(name);
    const arr = values?.split("_");
    if (arr && arr?.length > 0) setSelected(arr);
  }, []);

  React.useEffect(() => {
    if (selected.length > 0) {
      const obj: any = {};
      for (const [prop, value] of searchParams) obj[prop] = value;

      setSearchParams({ ...obj, [name]: selected.join("_") });
    }
  }, [selected]);

  const handleChange = (index: number, value: string, checked: boolean) => {
    const arr = [...selected];
    if (checked) {
      // add the value in selected
      arr.push(value);
      setSelected(Array.from(new Set(arr)));
    } else {
      // remove value from the selected
      setSelected(arr.filter((v) => v != value));
    }
  };

  return (
    <Box>
      <Paper sx={{ padding: 3 }}>
        <h4>{title}</h4>
        {Array.isArray(data) &&
          data.map((value, i) => {
            return (
              <Box key={value + i}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={value}
                      checked={selected.includes(value)}
                      onChange={(e) => handleChange(i, value, e.target.checked)}
                    />
                  }
                  label={value}
                />
              </Box>
            );
          })}
      </Paper>
    </Box>
  );
};

export default FilterProduct;
