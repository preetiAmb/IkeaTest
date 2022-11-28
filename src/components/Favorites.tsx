import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { useShoppingCart } from "../store/ShoppingCartContext";
import { Typography } from "@mui/material";
import { FavoriteItem } from "./FavoriteItem";

type ShoppingCartProps = {
  isOpen: boolean;
};

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export function Favorites({ isOpen }: ShoppingCartProps) {
  const { closeFavorites, cartItems, favoriteItems } = useShoppingCart();
 
  return (
    <>
      <Drawer anchor={"right"} onClose={closeFavorites} open={isOpen}>
      <Typography variant="h6" sx={{ fontSize: "1.5rem", pt: 2, pb: 2, pl: 2 }}>
            Favorites
          </Typography>
        <Stack gap={3}>
          {favoriteItems.map((item) => (
            <FavoriteItem  
              key={item.favoriteItemId} {...item} />
          ))}
        </Stack>
      </Drawer>
    </>
  );
}
