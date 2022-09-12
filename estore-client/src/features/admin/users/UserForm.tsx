import * as React from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import User from "../../../shared/models/UserModel";
import UserContext from "./UserContext";
import UserService from "../../../services/UserService";
import { endpoints } from "../../../api";
interface IUserFormProps {}

const UserForm: React.FunctionComponent<IUserFormProps> = (props) => {
  const [profilePic, setProfilePic] = React.useState<string | ArrayBuffer>("");
  const { operation, initialUser, loadUsers, handleClose } =
    React.useContext(UserContext);

  const [user, setUser] = React.useState<User>({
    role: "admin",
    status: 1,
    gender: "female",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, name: { ...user.name, [name]: value } });
  };

  React.useEffect(() => {
    if (initialUser) setUser({ ...user, ...initialUser });
  }, [initialUser]);

  const handleSubmit = () => {
    const fd = new FormData();

    if (operation == "edit") {
      const compareProps = (oldUser: User, newUser: User, outer?: string) => {
        const currObjKeys = Object.keys(newUser);

        for (const prop of currObjKeys) {
          const newVal = newUser[prop];
          if (newVal && oldUser[prop] != newVal) {
            if (!Array.isArray(newVal) && typeof newVal == "object") {
              compareProps(oldUser[prop], newVal, prop);
            } else if (prop == "avatar") {
              if (typeof newVal != "string") fd.append(prop, newVal);
            } else {
              fd.append(`${outer ? outer + "." : ""}${prop}`, newVal);
            }
          }
        }
      };

      compareProps(initialUser, user);

      UserService.updateUser(user._id as string, fd)
        .then((response) => {
          console.log("response", response);
          loadUsers();
          handleClose();
        })
        .catch(console.log);
    } else {
      for (const prop in user as Iterable<string>) {
        const value = user[prop];
        if (prop == "name") {
          fd.append("name.first", value?.first);
          fd.append("name.last", value?.last);
        } else if (prop == "avatar") {
          if (value && typeof value != "string") fd.append(prop, value);
        } else if (value) {
          fd.append(prop, value);
        }
      } //for
      UserService.createUser(fd)
        .then((response) => {
          console.log("response", response);
          loadUsers();
          handleClose();
        })
        .catch(console.log);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files && e?.target?.files[0];

    setUser({ ...user, avatar: file as File });

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
    setUser({ ...user, avatar: "" });
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
                operation == "edit" && typeof user.avatar == "string"
                  ? `${endpoints.serverBaseURL}/${user.avatar}`
                  : profilePic
                  ? (profilePic as string)
                  : "/images/logo.png"
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
        <Grid item container spacing={2} xs={12} md={7}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="First Name"
              name="first"
              value={user.name?.first}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Last Name"
              name="last"
              value={user.name?.last}
              onChange={handleNameChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          variant="outlined"
          fullWidth
          label="Mobile"
          name="mobile"
          value={user.mobile}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          variant="outlined"
          fullWidth
          label="Email"
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          variant="outlined"
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          variant="outlined"
          fullWidth
          label="Salary"
          type="number"
          name="salary"
          value={user.salary}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          variant="outlined"
          fullWidth
          label="DOB"
          type="date"
          name="dob"
          value={
            typeof user.dob == "string" ? user.dob.split("T")[0] : user.dob
          }
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <FormLabel id="gender">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender"
            name="gender"
            value={user.gender}
            onChange={handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="role">Role</InputLabel>
          <Select
            fullWidth
            labelId="role"
            value={user.role}
            label="Role"
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select
            fullWidth
            labelId="status"
            value={user.status}
            label="Status"
            name="status"
            onChange={(e) => setUser({ ...user, status: e.target.value })}
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

export default UserForm;
