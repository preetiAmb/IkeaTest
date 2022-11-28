import { FC, ReactElement, useEffect, useState } from "react";
import {
  Product,
  ProductFavButton,
  ProductImage,
  ProductAddToCart
} from "../../styles/Product";
import { Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../store/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export function SingleProduct({
  id,
  title,
  price,
  description,
  image,
  category,
}: Product){
  const [showOptions, setShowOptions] = useState(true);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    addToFavorites,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Link to={`/products/${id}`}>
          <ProductImage src={image} width={350} height={300} alt={title} />
        </Link>
        <ProductFavButton>
              <FavoriteIcon onClick={() => addToFavorites(id)}/>
            </ProductFavButton>
        <Typography lineHeight={2}>{title}</Typography>
        <Typography>{price}</Typography>
        
        <Typography className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <Typography
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <Typography
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <Typography>
                  <span className="fs-3">{quantity}</span> in cart
                </Typography>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </Typography>
              <Button onClick={() => removeFromCart(id)}>Remove</Button>
            </Typography>
          )}
        </Typography>
      </Product>
    </>
  );
};

export default SingleProduct;
