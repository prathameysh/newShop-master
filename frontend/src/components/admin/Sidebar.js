import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { pathname } = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box
      className="p-0 pt-5 pb-5"
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        bgcolor: theme.palette.background.alt1,
        overflowX: "auto",
        "& ::-webkit-scrollbar": {
          display: "none",
        },
        "& div": {
          p: "0 14px",
        },
        "& div:hover": {
          color: theme.palette.secondary.main,
          boxShadow: `0 0 5px ${theme.palette.secondary.main} `,
        },
      }}
      component="nav"
    >
      <Box
        sx={{
          color:
            active === "admin/dashboard" ? theme.palette.secondary.main : "",
        }}
        onClick={() => navigate("/admin/dashboard")}
      >
        Dashboard
      </Box>
      <Box
        sx={{
          color:
            active === "admin/products" ? theme.palette.secondary.main : "",
        }}
        onClick={() => navigate("/admin/products")}
      >
        Products
      </Box>
      <Box
        sx={{
          color: active === "admin/order" ? theme.palette.secondary.main : "",
        }}
        onClick={() => navigate("/admin/order")}
      >
        Orders
      </Box>
      <Box
        sx={{
          color: active === "admin/users" ? theme.palette.secondary.main : "",
        }}
        onClick={() => navigate("/admin/users")}
      >
        Users
      </Box>
      <Box
        sx={{
          color: active === "admin/reviews" ? theme.palette.secondary.main : "",
        }}
        onClick={() => navigate("/admin/reviews")}
      >
        Reviews
      </Box>
      <Box
        sx={{
          color:
            active === "admin/products/create"
              ? theme.palette.secondary.main
              : "",
        }}
        onClick={() => navigate("/admin/products/create")}
      >
        CreateProduct
      </Box>
    </Box>
  );
}
