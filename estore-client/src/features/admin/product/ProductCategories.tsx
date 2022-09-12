import React, { FunctionComponent, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Checkbox, FormControlLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CategoryService from "../../../services/CategoryService";
import Category from "../../../shared/models/CategoryModel";
import Product from "../../../shared/models/ProductModel";

const useStyles = makeStyles(() => ({
  checkbox: {
    "&.MuiCheckbox-root": {
      color: "rgba(81, 185, 201, 0.8)",
    },
    "&.MuiCheckbox-colorSecondary": {
      "&.Mui-checked": {
        color: "rgba(160, 81, 201, 1)",
      },
    },
  },
}));

interface IProductCategories {
  next: () => void;
  previous: (e: React.SyntheticEvent) => void;
  product: Product;
  onChange: (e: any) => void;
  setProduct: (state: Product) => void;
}

const ProductCategories: FunctionComponent<IProductCategories> = ({
  next,
  previous,
  product,
  setProduct,
}) => {
  const classes = useStyles();

  const [selected, setSelected] = React.useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // set the initial categories to selected
  useEffect(() => {
    if (Array.isArray(product.categories))
      setSelected(product.categories?.map((cat) => cat._id));
  }, [product]);

  // load all the categories from the server
  useEffect(() => {
    CategoryService.fetchAllCategory().then((response) => {
      if (response.data) setCategories(response.data.data);
    });
  }, []);

  //node is always the root "Parent"
  //id is id of node clicked
  function getChildById(node: Category, id: string) {
    let array: string[] = [];

    //returns an array of nodes ids: clicked node id and all children node ids
    function getAllChild(nodes: Category | null) {
      if (nodes === null) return [];
      array.push(nodes._id as string);
      if (Array.isArray(nodes.subCategories)) {
        nodes.subCategories.forEach((node) => {
          array = [...array, ...getAllChild(node)];
          array = array.filter((v, i) => array.indexOf(v) === i);
        });
      }
      return array;
    }

    //returns the node object that was selected
    function getNodeById(nodes: Category, id: string) {
      if (nodes._id === id) {
        return nodes;
      } else if (Array.isArray(nodes.subCategories)) {
        let result = null;
        nodes.subCategories.forEach((node) => {
          if (!!getNodeById(node, id)) {
            result = getNodeById(node, id);
          }
        });
        return result;
      }

      return null;
    }

    return getAllChild(getNodeById(node, id));
  }

  function getOnChange(checked: boolean, nodes: Category) {
    //gets all freshly selected or unselected nodes
    const allNode: string[] = getChildById(nodes, nodes._id as string);
    //combines newly selected nodes with existing selection
    //or filters out newly deselected nodes from existing selection
    console.log("All Nodes: ", allNode);

    let array = checked
      ? [...selected, ...allNode]
      : selected.filter((value) => !allNode.includes(value));

    console.log("Array: ", allNode);

    setSelected(array);
  }

  const RenderTreeWithCheckboxes = (nodes: Category) => {
    return (
      <TreeItem
        key={nodes._id}
        nodeId={nodes._id as string}
        label={
          <FormControlLabel
            control={
              <Checkbox
                checked={selected.some((item) => item == nodes._id)}
                onChange={(event) =>
                  getOnChange(event.currentTarget.checked, nodes)
                }
                className={classes.checkbox}
              />
            }
            label={<>{nodes.title}</>}
            key={nodes._id}
          />
        }
      >
        {Array.isArray(nodes.subCategories)
          ? nodes.subCategories.map((node) => RenderTreeWithCheckboxes(node))
          : null}
      </TreeItem>
    );
  };

  const handleNext = () => {
    setProduct({ ...product, categories: selected });
    next();
  };

  return (
    <>
      <Paper sx={{ padding: 4 }}>
        <h3>Categories</h3>

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                // defaultExpanded={["0", "3", "4"]}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                {Array.isArray(categories) &&
                  categories.length > 0 &&
                  RenderTreeWithCheckboxes({
                    _id: "sdfsdfsdf",
                    title: "All Categories",
                    subCategories: categories,
                  })}
              </TreeView>
            </Grid>

            <Grid item container marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={previous}
                sx={{ marginRight: "auto" }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ marginLeft: "auto" }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default ProductCategories;
