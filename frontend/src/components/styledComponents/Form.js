import { Box } from "@mui/material";

const { default: styled } = require("@emotion/styled");

export const FormContainer = styled(Box)(({ theme: { palette } }) => ({
  backgroundColor: palette.background.alt1,
  boxShadow: `inset -2px -2px 3px  ${palette.bg3},inset 2px 2px 3px  ${palette.bg1}`,
  borderRadius: "5px",
  "& h1,& :last-child": {
    textAlign: "center",
    "& a": {
      fontWeight: "600",
      padding: "3px",
      backgroundColor: palette.background.alt,
      borderRadius: "7px",
      textDecoration: "none",
    },
  },
  "&>div": {
    margin: "5px auto",
  },

  "& button[type=submit]": {
    width: "100%",
    margin: "10px 0",
    backgroundColor: palette.bg2,
  },
}));
