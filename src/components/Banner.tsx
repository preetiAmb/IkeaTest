import { Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle,
} from "../styles/banner";

export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <BannerContainer>
      <BannerImage src="https://images.unsplash.com/photo-1545622783-b3e021430fee" />
      <BannerContent>
        <Typography variant="h4">Christmas Collection</Typography>
        <BannerTitle variant="h2">
        Prepare for Christmas - your way
        </BannerTitle>

        <BannerDescription>
          Advent stars must be hung, Christmas decorations must be decorated and gingerbread houses must be built. Christmas is the holiday of preparation and it's time to get started. And remember that you prepare for Christmas in your own way.
        </BannerDescription>

        <BannerShopButton color="primary">To the Christmas shop</BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
}