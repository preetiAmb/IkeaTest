import React, { ReactElement, FC, useState } from "react";
import { Product, ProductFavButton, ProductImage } from "../styles/Product";
import { Box, ButtonGroup, Button, Typography } from "@mui/material";
import { Colors } from "../styles/theme";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import { useShoppingCart } from "../store/ShoppingCartContext";

//import productData from "../../mock-data/products";
import { useAPI } from "../store/ProductContext";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  children?: React.ReactNode | React.ReactNode[];
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingTop: "3rem",
  paddingLeft: "15rem",
  paddingBottom: "10rem",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "100%",
  lineHeight: 1.5,
}));

type CartItemProps = {
  cartId: number,
  quantity: number
}


const ProductItem = ({ cartId }: CartItemProps, { id, title, price, description, image, category}: Product) => {
  const { loadedProductData } = useAPI();
  const { productId } = useParams();
  const product = loadedProductData.find(
    (prod: { id: string | undefined }) => prod.id === productId
  );
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    addToFavorites,
    removeFromFavorites
  } = useShoppingCart();
  const quantity = getItemQuantity(product?.id);

  return (
    <ProductDetailWrapper display={"flex"}>
      <Product sx={{ mr: 4 }}>
        <ProductImage
          src={product?.image}
          width={450}
          height={350}
          alt={product?.title}
        />
      </Product>
      <ProductDetailInfoWrapper>
        <Typography sx={{ lineHeight: 2 }} variant="h4">
          {product?.title}
        </Typography>
        <Typography>SEK {product?.price}</Typography>
        <Typography>{product?.description}</Typography>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                mt: 2,
                color: Colors.light,
                flexGrow: 1,
                position: "relative",
              }}
            >
              {quantity === 0 ? (
                <Button
                  onClick={() => increaseCartQuantity(product?.id)}
                  variant="contained"
                  ria-label="add to cart"
                >
                  Add to Cart
                </Button>
              ) : (
                <>
                <Typography
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(product?.id)}>-</Button>
                <Typography>
                  <span className="fs-3">{quantity}</span> in cart
                </Typography>
                <Button onClick={() => increaseCartQuantity(product?.id)}>+</Button>
              </Typography>
              <Button onClick={() => removeFromCart(product?.id)}>Remove</Button>
            </>
              )}
            </Box>
        <Box
          sx={{
            mt: 4,
            color: Colors.dove_gray,
          }}
        ></Box>
        <Box
          display="flex"
          alignItems="center"
          sx={{ mt: 2, color: Colors.light }}
          aria-label="Add to wishlist"
        >
          <FavoriteIcon sx={{ mr: 2 }} onClick={() => addToFavorites(product?.id)}/>
          Add to wishlist
        </Box>
        <Box
          sx={{
            mt: 4,
            color: Colors.dove_gray,
          }}
        ></Box>
      </ProductDetailInfoWrapper>
    </ProductDetailWrapper>
  );
};

export default ProductItem;
