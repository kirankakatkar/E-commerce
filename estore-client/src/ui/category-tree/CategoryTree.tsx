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
import Product from "../../shared/models/ProductModel";
import Category from "../../shared/models/CategoryModel";

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

interface ICategoryTree {
  setSelected: (state: any) => void;
  selected: any[];
  categories: Category[];
}

const CategoryTree: FunctionComponent<ICategoryTree> = ({
  setSelected,
  categories,
  selected,
}) => {
  const classes = useStyles();

  //id is id of node clicked
  function getChildById(node: Category, id: string) {
    let array: string[] = [];

    //returns an array of nodes ids: clicked node id and all children node ids
    function getAllChild(nodes: Category | null) {
      if (nodes === null) return [];
      array.push(nodes._id as string);
      if (Array.isArray(nodes.subCategories)) {
        nodes.subCategories.forEach((node: any) => {
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
        nodes.subCategories.forEach((node: any) => {
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
          ? nodes.subCategories.map((node: any) =>
              RenderTreeWithCheckboxes(node)
            )
          : null}
      </TreeItem>
    );
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
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
  );
};

export default CategoryTree;
