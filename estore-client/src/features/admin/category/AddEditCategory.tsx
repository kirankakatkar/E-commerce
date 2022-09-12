import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CategoryContext from "./CategoryContext";
import CategoryForm from "./CategoryForm";

interface IAddEditCategoryProps {}

const AddEditCategory: React.FunctionComponent<IAddEditCategoryProps> = (
  props
) => {
  const { open, handleClose, operation } = React.useContext(CategoryContext);
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {operation == "edit" ? "Edit" : "Add"} Category
        </DialogTitle>
        <DialogContent>
          <CategoryForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditCategory;
