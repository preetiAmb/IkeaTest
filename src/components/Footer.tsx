import styled from "@emotion/styled";
import {
  Grid,
  List,
  ListItemText,
  Typography,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../styles/theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SubscribeTf, FooterTitle } from "../styles/footer";
import SendIcon from "@mui/icons-material/Send";

export default function Footer() {
  return (
    <Box
      sx={{
        background: Colors.dove_gray,
        color: Colors.black,
        p: { xs: 2, md: 3 },
        pt: 16,
        fontSize: { xs: "12px", md: "14px" },
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={2} lg={4}>
          <FooterTitle variant="body1">About us</FooterTitle>
          <Typography>
            IKEA was founded by Ingvar Kamprad in 1943 as a mail order business
            in Älmhult, Småland. Today, IKEA is a global brand in home
            furnishings, offering affordable products with good design and
            comfort to people around the world.
          </Typography>
          <Box
            sx={{
              mt: 2,
              color: Colors.dove_gray,
            }}
          >
            <FacebookIcon sx={{ mr: 1 }} />
            <TwitterIcon sx={{ mr: 1 }} />
            <InstagramIcon />
          </Box>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">information</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={1}>About Us</Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={1}>Order Tracking</Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={1}>Privacy &amp; Policy</Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={1}>Terms &amp; Conditions</Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">my account</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={1}>Login</Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={1}>My Cart</Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={1}>My Account</Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={1}>Wishlist</Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">newsletter</FooterTitle>
          <Stack>
            <SubscribeTf
              color="primary"
              label="Email address"
              variant="standard"
            />
            <Button
              startIcon={<SendIcon sx={{ color: Colors.white }} />}
              sx={{ mt: 2, mb: 2 }}
              variant="contained"
            >
              Subscribe
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
