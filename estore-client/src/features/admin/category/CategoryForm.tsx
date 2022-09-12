import * as React from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Theme, useTheme } from "@mui/material/styles";

import Category from "../../../shared/models/CategoryModel";
import CategoryContext from "./CategoryContext";
import CategoryService from "../../../services/CategoryService";
import { endpoints } from "../../../api";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface ICategoryFormProps {}

const CategoryForm: React.FunctionComponent<ICategoryFormProps> = (props) => {
  const [profilePic, setProfilePic] = React.useState<string | ArrayBuffer>("");
  const {
    operation,
    initialCategory,
    loadCategories,
    handleClose,
    categories,
  } = React.useContext(CategoryContext);
  const [personName, setPersonName] = React.useState<string[]>([]);
  const theme = useTheme();

  const [category, setCategory] = React.useState<Category>({
    status: 1,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  React.useEffect(() => {
    if (initialCategory) setCategory({ ...category, ...initialCategory });
  }, [initialCategory]);

  const handleSubmit = () => {
    const fd = new FormData();

    if (operation == "edit") {
      const compareProps = (
        oldCategory: Category,
        newCategory: Category,
        outer?: string
      ) => {
        const currObjKeys = Object.keys(newCategory);

        for (const prop of currObjKeys) {
          const newVal = newCategory[prop];
          if (newVal && oldCategory[prop] != newVal) {
            if (prop == "avatar") {
              if (typeof newVal != "string") fd.append(prop, newVal);
            } else {
              fd.append(`${outer ? outer + "." : ""}${prop}`, newVal);
            }
          }
        }
      };

      compareProps(initialCategory, category);

      CategoryService.updateCategory(category._id as string, fd)
        .then((response) => {
          loadCategories();
          handleClose();
        })
        .catch(console.log);
    } else {
      for (const prop in category as Iterable<string>) {
        const value = category[prop];
        if (prop == "avatar") {
          if (value && typeof value != "string") fd.append(prop, value);
        } else if (value) {
          fd.append(prop, value);
        }
      } //for
      CategoryService.createCategory(fd)
        .then((response) => {
          console.log("response", response);
          loadCategories();
          handleClose();
        })
        .catch(console.log);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files && e?.target?.files[0];

    setCategory({ ...category, avatar: file as File });

    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setProfilePic(reader.result as string);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }; //handleAvatarChange

  const handleDeleteAvatar = () => {
    setProfilePic("");
    setCategory({ ...category, avatar: "" });
  };

  const handleChangeEvent = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;

    console.log("Value: ", value);

    let val = typeof value === "string" ? value.split(",") : value;
    val = val.filter((v: any) => typeof v == "string");
    setCategory({
      ...category,
      parentCategories: val,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item container xs={12}>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              border: "1px solid #999",
              margin: "auto",
              position: "relative",
              width: 120,
              height: 150,
            }}
          >
            {profilePic && (
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  cursor: "pointer",
                  textAlign: "center",
                  backgroundColor: "#eee8",
                  padding: 2,
                  borderRadius: 5,
                }}
                onClick={handleDeleteAvatar}
              >
                <DeleteIcon />
              </span>
            )}
            <label
              htmlFor="avatar"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                cursor: "pointer",
                textAlign: "center",
                backgroundColor: "#eee8",
                padding: 2,
                borderRadius: 5,
              }}
            >
              <EditIcon />
            </label>
            <img
              style={{
                width: "100%",
                height: "100%",

                objectFit: "contain",
              }}
              src={
                operation == "edit" && typeof category.avatar == "string"
                  ? `${endpoints.serverBaseURL}/${category.avatar}`
                  : profilePic
                  ? (profilePic as string)
                  : "/images/profilePic.png"
              }
            />
            <input
              type="file"
              id="avatar"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="category">Categories</InputLabel>
          <Select
            id="category"
            multiple
            value={
              (Array.isArray(category?.parentCategories) &&
                (category?.parentCategories as string[])) ||
              []
            }
            onChange={handleChangeEvent}
            input={<OutlinedInput id="category" />}
            renderValue={(selected) => {
              if (category?.parentCategories?.length === 0) {
                return <em>Categories</em>;
              }

              return (
                Array.isArray(category?.parentCategories) &&
                category?.parentCategories
                  ?.map((cat: any) => {
                    if (typeof cat == "object")
                      return (
                        categories &&
                        categories?.find((obj) => obj?._id == cat._id)?.title
                      );
                    else
                      return (
                        categories &&
                        categories?.find((obj) => obj?._id == cat)?.title
                      );
                  })
                  ?.join(", ")
              );
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            {Array.isArray(categories) &&
              categories
                .filter((cat) => cat._id != category._id)
                .map(({ _id, title }) => (
                  <MenuItem
                    key={_id}
                    value={_id}
                    style={getStyles(title || "", personName, theme)}
                    selected={
                      Array.isArray(category.parentCategories) &&
                      category.parentCategories?.findIndex((cat: any) => {
                        return typeof cat == "object"
                          ? cat._id == _id
                          : cat == _id;
                      }) >= 0
                        ? true
                        : false
                    }
                  >
                    {title}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          label="Title"
          name="title"
          value={category.title}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select
            fullWidth
            labelId="status"
            value={category.status}
            label="Status"
            name="status"
            onChange={(e) =>
              setCategory({ ...category, status: e.target.value })
            }
          >
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="0">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default CategoryForm;

// [{
//   _id:"fs7d98fs7df987sdf",
//   title:"first cat"
// },
// {
//   _id:"fs7d98fs7df987sdf",
//   title:"first cat"
// }]

// ["sfsdfsdfs98d7f","sdfs98d7f9s7f"]
