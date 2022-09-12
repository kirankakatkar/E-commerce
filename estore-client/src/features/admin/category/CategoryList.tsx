import React, { useState, useEffect } from "react";
import CategoryService from "../../../services/CategoryService";
import MuiDatatable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryContext from "./CategoryContext";
import AddEditCategory from "./AddEditCategory";
import Swal from "sweetalert2";
import Category from "../../../shared/models/CategoryModel";
interface ICategoryListProps {}

const CategoryList: React.FunctionComponent<ICategoryListProps> = (props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [operation, setOperation] = useState<string>("add");
  const [initialCategory, setInitialCategory] = useState<Category>({});
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const loadCategories = async () => {
    const response = await CategoryService.fetchAllCategory();
    if (response.data) setCategories(response.data?.data);
  };

  const addCategory = () => {
    setInitialCategory({});
    setOperation("add");
    setOpenDialog(true);
  }; //addCategory

  const editCategory = (category: Category) => {
    setInitialCategory(category);
    setOperation("edit");
    setOpenDialog(true);
  }; //editCategory

  const deleteCategory = (id: any) => {
    if (!id)
      return Swal.fire("Try again!", "The category does not have id.", "error");
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
        CategoryService.deleteCategory(id)
          .then((response) => {
            loadCategories();
            Swal.fire("Deleted!", "The category has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire(
              "Not Deleted!",
              "The category has not been deleted.",
              "error"
            );
          });
      }
    });
  }; //deleteCategory

  useEffect(() => {
    loadCategories();
  }, []);

  const columns = [
    {
      name: "catId",
      label: "ID",
    },

    {
      name: "title",
      label: "Title",
    },
    {
      name: "parentCategories",
      label: "Parent Categories",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (index: number) => {
          const category = categories[index];
          return (
            Array.isArray(category.parentCategories) &&
            (category.parentCategories as any[]).reduce((pre: string, cat: Category) => { // tell sir this
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
          const category = categories[index];
          return category?.status == 1 ? "Active" : "Inactive";
        },
      },
    },

    {
      name: "action",
      label: "Action",
      options: {
        customBodyRenderLite: (index: number) => {
          const category = categories[index];
          return (
            <>
              <IconButton
                color="primary"
                sx={{ mr: 2 }}
                onClick={() => editCategory(category)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => deleteCategory(category._id)}
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
      <CategoryContext.Provider
        value={{
          open: openDialog,
          handleClose: handleDialogClose,
          categories,
          initialCategory,
          operation,
          loadCategories,
        }}
      >
        <AddEditCategory />
      </CategoryContext.Provider>

      <Button variant="contained" color="primary" onClick={addCategory}>
        New +
      </Button>
      <MuiDatatable title="Category List" data={categories} columns={columns} />
    </>
  );
};

export default CategoryList;
