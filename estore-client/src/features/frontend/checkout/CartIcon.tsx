import * as React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useSelector } from "react-redux";
import { selectCart } from "../../../app/slices/CartSlice";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    background: "gray",
  },
}));

interface ICartIconProps {}

const CartIcon: React.FunctionComponent<ICartIconProps> = (props) => {
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  return (
    <>
      <IconButton
        aria-label="cart"
        sx={{ color: "#fff" }}
        onClick={() => navigate("/checkout")}
      >
        <StyledBadge
          badgeContent={Array.isArray(cart.products) ? cart.products.length : 0}
          color="secondary"
        >
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
    </>
  );
};

export default CartIcon;
