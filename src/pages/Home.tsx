import React from "react";
import { useEffect, useState, useContext } from "react";
import { useAPI } from "../store/ProductContext";
import Banner from "../components/Banner";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ProductList from "../components/Product/ProductList";
import { Container, Typography, Box, Stack, Button } from "@mui/material";

export default function Home() {
  const { loadedProductData } = useAPI();


  return (
    <>
     <Container
        disableGutters
        maxWidth="xl"
        sx={{
          background: "#fff",
          paddingTop: 5,
        }}
      >
    <Stack>
    <Banner />
      <Box display="flex" justifyContent="center" sx={{ padding: 5 }}>
        <Typography variant="h4">Our Products</Typography>
      </Box>
      <ProductList products={loadedProductData} />
    </Stack>
    </Container>
    </>
  );
}
