import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { useShoppingCart } from "../store/ShoppingCartContext";
import { Box, Button, Link, Typography } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Fragment, useState } from "react";
import ikea from "../assets/svg/ikea.svg";

type ShoppingCartProps = {
  isOpen: boolean;
};

const MenuItems = [
  {
    id: 1,
    name: "Jul",
  },
  {
    id: 2,
    name: "Products",
  },
  {
    id: 3,
    name: "All rooms",
  },
  {
    id: 4,
    name: "Inspiration",
  },
];

type Anchor = "top" | "left" | "bottom" | "right";
export default function Menu({ isOpen }: ShoppingCartProps) {
  const { closeMenu } = useShoppingCart();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <>
      <Drawer anchor={"left"} onClose={closeMenu} open={isOpen}>
        <Box sx={{ p: 6 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: {
                xs: "none",
                sm: "block",
                fontSize: "1.5rem",
              },
            }}
          >
            <img src={ikea} alt="Ikea Logo" />
          </Typography>
          <Divider />
          <Stack gap={3}>
            <List>
              {MenuItems.map((item) => (
                <ListItem disablePadding>{item.name}</ListItem>
              ))}
            </List>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
