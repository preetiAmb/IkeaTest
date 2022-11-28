import styled from "@emotion/styled";
import {
  TextField,
  Typography,
} from "@mui/material";
import { Colors } from "../styles/theme";

export const FooterTitle = styled(Typography)(() => ({
  textTransform: "uppercase",
  marginBottom: "1em",
}));

export const SubscribeTf = styled(TextField)(() => ({
  ".MuiInputLabel-root": {
    color: Colors.primary,
  },

  ".MuiInput-root::before": {
    borderBottom: `1px solid ${Colors.primary}`,
  },
}));