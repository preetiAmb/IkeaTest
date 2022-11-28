import React, { ReactElement, FC } from "react";
  import {
    Product,
    ProductImage,
  } from "../styles/Product";
  import { Box, Typography } from "@mui/material";
  import { Colors } from "../styles/theme";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";

//import productData from "../../mock-data/products";
import { useAPI } from '../store/ProductContext';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  children?: React.ReactNode | React.ReactNode[];
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    paddingTop: '3rem',
    paddingLeft: '15rem',
    paddingBottom: '10rem',
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
  }));
  
  const ProductDetailInfoWrapper = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    maxWidth: '100%',
    lineHeight: 1.5,
  }));

const Favorites: FC<Product> = (): ReactElement => {
  const { loadedProductData } = useAPI();
  const { productId } = useParams();
  const product = loadedProductData.find((prod: { id: string | undefined; }) => prod.id === productId);

  return (  
        <ProductDetailWrapper display={"flex"}>
          <Product sx={{ mr: 4 }}>
            <ProductImage src={product?.image} width={450} height={350} alt={product?.title}/>
          </Product>
          <ProductDetailInfoWrapper>
            <Typography>{product?.price}</Typography>
            <Typography sx={{ lineHeight: 2 }} variant="h4">
              {product?.title}
            </Typography>
            <Typography>
              {product?.description}          
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              sx={{ mt: 4, color: Colors.danger }}
            >
              <FavoriteIcon sx={{ mr: 2 }} />
              Work in progress 
            </Box>
            <Box
              sx={{
                mt: 4,
                color: Colors.dove_gray,
              }}
            >
            </Box>
          </ProductDetailInfoWrapper>
        </ProductDetailWrapper>
  );
};

export default Favorites;
