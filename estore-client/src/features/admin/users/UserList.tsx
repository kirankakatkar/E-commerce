import React, { useState, useEffect } from "react";
import UserService from "../../../services/UserService";
import User from "../../../shared/models/UserModel";
import MuiDataTable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserContext from "./UserContext";
import AddEditUser from "./AddEditUser";
import Swal from "sweetalert2";

interface IUserListProps {}

const UserList: React.FunctionComponent<IUserListProps> = (props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [operation, setOperation] = useState<string>("add");
  const [initialUser, setInitialUser] = useState<User>({});
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const loadUsers = async () => {
    const response = await UserService.getAllUser();
    if (response.data) setUsers(response.data?.data);
  };

  const addUser = () => {
    setInitialUser({});
    setOperation("add");
    setOpenDialog(true);
  }; //addUser

  const editUser = (user: User) => {
    setInitialUser(user);
    setOperation("edit");
    setOpenDialog(true);
  }; //editUser

  const deleteUser = (id: any) => {
    if (!id)
      return Swal.fire("Try again!", "The user does not have id.", "error");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        UserService.deleteUser(id)
          .then((response) => {
            loadUsers();
            Swal.fire("Deleted!", "The user has been deleted.", "success");
          })
          .catch((error) => {
            Swal.fire(
              "Not Deleted!",
              "The user has not been deleted.",
              "error"
            );
          });
      }
    });
  }; //deleteUser

  useEffect(() => {
    loadUsers();
  }, []);

  const columns = [
    {
      name: "userId",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
      options: {
        customBodyRenderLite: (index: number) => {
          const user = users[index];
          return `${user?.name?.first} ${user?.name?.last}`;
        },
      },
    },
    {
      name: "mobile",
      label: "Mobile",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "gender",
      label: "Gender",
    },
    {
      name: "salary",
      label: "Salary",
    },
    {
      name: "role",
      label: "Role",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRenderLite: (index: number) => {
          const user = users[index];
          return user?.status == 1 ? "Active" : "Inactive";
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRenderLite: (index: number) => {
          const user = users[index];
          return (
            <>
              <IconButton
                color="primary"
                sx={{ mr: 2 }}
                onClick={() => editUser(user)}
              >
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => deleteUser(user._id)}>
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <UserContext.Provider
        value={{
          open: openDialog,
          handleClose: handleDialogClose,
          initialUser,
          operation,
          loadUsers,
        }}
      >
        <AddEditUser />
      </UserContext.Provider>

      <Button variant="contained" color="primary" onClick={addUser}>
        New +
      </Button>
      <MuiDataTable title="User List" data={users} columns={columns} />
    </>
  );
};

export default UserList;
