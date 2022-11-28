import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { useShoppingCart } from "../store/ShoppingCartContext";
import { useAPI } from "../store/ProductContext";
import { CartItem } from "./CartItem";
import { Typography } from "@mui/material";

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

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "SEK",
  style: "currency",
});

function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const { loadedProductData } = useAPI();

  return (
    <>
      <Drawer anchor={"right"} onClose={closeCart} open={isOpen}>
      <Typography variant="h6" sx={{ fontSize: "1.5rem", pt: 2, pb: 2, pl: 2 }}>
            Cart
          </Typography>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem  
              key={item.cartId} {...item} />
          ))}
          <Typography sx={{ fontSize: "1.5rem", pt: 2, pb: 2, pl: 2 }}>
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = loadedProductData.find(
                  (i: Product) => i.id === cartItem.cartId
                );
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </Typography>
        </Stack>
      </Drawer>
    </>
  );
}
