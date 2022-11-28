import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import ApiContextProvider from "../src/store/ProductContext";
import { ShoppingCartProvider } from "../src/store/ShoppingCartContext";

import "./App.css";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });
  return (
    <>
     
        <ApiContextProvider>
        <ShoppingCartProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box height="60vh" display="flex" flexDirection="column">
              <Navbar />
              <Routes>
                {appRoutes.map((route) => (
                  <Route
                    key={route.key}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
              </Routes>
              <Footer />
            </Box>
          </ThemeProvider>
          </ShoppingCartProvider>
        </ApiContextProvider>
      
    </>
  );
}

export default App;
