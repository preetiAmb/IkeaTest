import { useShoppingCart } from "../store/ShoppingCartContext";
import { useAPI } from "../store/ProductContext";
import Stack from "@mui/material/Stack";
import { Colors } from "../styles/theme";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
  ButtonBase,
} from "@mui/material";

type FavoriteItemProps = {
  favoriteItemId: number;
  quantity: number;
};

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export function FavoriteItem({ favoriteItemId, quantity }: FavoriteItemProps) {
  const { removeFromFavorites } = useShoppingCart();
  const { loadedProductData } = useAPI();

  const item = loadedProductData.find((i: Product) => i.id === favoriteItemId);
  if (item == null) return null;

  const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "SEK",
    style: "currency",
  });

  function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number);
  }

  return (
    <>
      <Stack gap={2} key={item.id} className="d-flex align-items-center">
        <Grid container spacing={2}>
          <Grid item >           
           <Typography sx={{ pl: 2}}>
              <img
                src={item.image}
                style={{
                  width: 96,
                  height: 96,
                  marginRight: 2,
                  objectFit: "cover",
                }}
              />
            </Typography>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {item.description}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{ cursor: "pointer", color: Colors.danger}}
                  onClick={() => removeFromFavorites(item.id)}
                  variant="body2"
                >
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div" sx={{ pr: 2}}>
                {formatCurrency(item.price)}
              </Typography>
            </Grid>          
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
