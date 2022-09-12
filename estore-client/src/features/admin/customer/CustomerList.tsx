import React, { useState, useEffect } from "react";
import MuiDatatable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CustomerService from "../../../services/CustomerService";
import Customer from "../../../shared/models/CustomerModel";

interface CustomerListProps {}

const CustomerList: React.FunctionComponent<CustomerListProps> = (props) => {

    const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  
  const loadCustomers = async () => {
    const response = await CustomerService.fetchAllCustomer();
    if (response.data) setCustomers(response.data?.data);
  };

  const addCustomer = () => {
    navigate('/secured/customers/add/0')
}; //addCategory

const editCustomer = (id:string) => {
      navigate(`/secured/customers/edit/${id}`)
  }; //editCategory

  const deleteCustomer = (id: any) => {
    if (!id)
      return Swal.fire("Try again!", "The customer does not have id.", "error");
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
        CustomerService.deleteCustomer(id)
          .then((response) => {
            loadCustomers();
            Swal.fire("Deleted!", "The customer has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire(
              "Not Deleted!",
              "The customer has not been deleted.",
              "error"
            );
          });
      }
    });
  }; //deleteCustomer

  useEffect(() => {
    loadCustomers();
  }, []);

  const columns = [
    {
      name: "custId",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
      options: {
        customBodyRenderLite: (index: number) => {
          const customer = customers[index];
          return `${customer?.name?.first} ${customer?.name?.last}`;
        },
      },
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "mobile",
      label: "Mobile",
    },
    {
      name: "gender",
      label: "Gender",
    },
    {
      name: "address",
      label: "Address",
      options: {
        customBodyRenderLite: (index: number) => {
          const customer = customers[index];
          return `${customer?.address?.city} ${customer?.address?.country}`;
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRenderLite: (index: number) => {
          const customer = customers[index];
          return customer?.status == 1 ? "Active" : "Inactive";
        },
      },
    },

    {
      name: "action",
      label: "Action",
      options: {
        customBodyRenderLite: (index: number) => {
          const customer = customers[index];
          return (
            <>
              <IconButton
                color="primary"
                sx={{ mr: 2 }}
              onClick={() => editCustomer(customer._id)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => deleteCustomer(customer._id)}
              >
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
      <Button variant="contained" color="primary" onClick={addCustomer}>
        New +
      </Button>
      <MuiDatatable title="Customer List" data={customers} columns={columns} />
    </>
  );
};

export default CustomerList;
