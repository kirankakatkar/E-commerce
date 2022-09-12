import React, { useState, useEffect } from "react";
import MuiDatatable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddEditProduct from "./AddEditProduct";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Product from "../../../shared/models/ProductModel";
import ProductService from "../../../services/ProductService";
import Category from "../../../shared/models/CategoryModel";

interface ProductListProps {}

const ProductList: React.FunctionComponent<ProductListProps> = (props) => {

    const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [operation, setOperation] = useState<string>("add");
  const [initialProduct, setInitialProduct] = useState<Product>({});
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const loadProducts = async () => {
    const response = await ProductService.fetchAllProduct();
    if (response.data) setProducts(response.data?.data);
  };

  const addProduct = () => {
    navigate('/secured/products/add/0')
}; //addCategory

const editProduct = (id:string) => {
      navigate(`/secured/products/edit/${id}`)
  }; //editCategory

  const deleteProduct = (id: any) => {
    if (!id)
      return Swal.fire("Try again!", "The product does not have id.", "error");
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
        ProductService.deleteProduct(id)
          .then((response) => {
            loadProducts();
            Swal.fire("Deleted!", "The product has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire(
              "Not Deleted!",
              "The product has not been deleted.",
              "error"
            );
          });
      }
    });
  }; //deleteProduct

  useEffect(() => {
    loadProducts();
  }, []);

  const columns = [
    {
      name: "productId",
      label: "ID",
    },
    {
      name: "title",
      label: "Title",
    },
    {
      name: "brand",
      label: "Brand",
    },
    {
      name: "price",
      label: "Price",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "categories",
      label: "Categories",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (index: number) => {
          const product = products[index];
          return (
            Array.isArray(product.categories) &&
            product.categories.reduce((pre: string, cat: Category) => {
              return `${pre ? pre + ", " : ""}${cat.title}`;
            }, "")
          );
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRenderLite: (index: number) => {
          const product = products[index];
          return product?.status == 1 ? "Active" : "Inactive";
        },
      },
    },

    {
      name: "action",
      label: "Action",
      options: {
        customBodyRenderLite: (index: number) => {
          const product = products[index];
          return (
            <>
              <IconButton
                color="primary"
                sx={{ mr: 2 }}
              onClick={() => editProduct(product._id)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => deleteProduct(product._id)}
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
      <Button variant="contained" color="primary" onClick={addProduct}>
        New +
      </Button>
      <MuiDatatable title="Product List" data={products} columns={columns} />
    </>
  );
};

export default ProductList;
