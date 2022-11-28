import { FC, Key, ReactElement } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { useAPI } from "../../store/ProductContext";
import SingleProduct from "./SingleProduct";
import { useTheme } from "@mui/material/styles";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductProps {
  products: Product[];
}

const ProductList: FC<ProductProps> = ({
  products,
}: ProductProps): ReactElement => {
  const theme = useTheme();
  //const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { loadedProductData } = useAPI();

  const renderProducts = loadedProductData.map((item: Product) => (
    <Grid item key={item.id} xs={2} sm={4} md={4} display="flex" flexDirection={'column'} alignItems="center">
     <div key={item.id}>
            <SingleProduct {...item} />
          </div>
    </Grid>
  ));


  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderProducts}
      </Grid>
    </Container>
  );
};

export default ProductList;
