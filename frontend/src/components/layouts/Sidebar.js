import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import {
  Logout,
  Login,
  ChevronLeftOutlined,
  AccountCircle,
  ShoppingCart,
  ShoppingBasket,
  Close,
  SupportAgent,
  ChevronRight,
  ArrowBack,
  AdminPanelSettings,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween, { FlexCenter } from "../styledComponents/FlexBetween";
import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { SListI } from "../styledComponents/List";
import { fromToAnimation } from "../styledComponents/animation";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  user,
  changeTheme,
  mode,
  changeFont,
  font,
}) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isAuthenticated } = useSelector((s) => s.authState);

  const [fontOpen, setFontOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [mainMenu, setMainMenu] = useState(true);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsSidebarOpen(open);
  };
  const hideBar = () => setIsSidebarOpen(false);

  return (
    <Box component="nav">
      <SwipeableDrawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          width: { xs: "280px", sm: "350px" },
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSizing: "border-box",
            borderWidth: "2px",
            width: { xs: "280px", sm: "350px" },
          },
        }}
      >
        <FlexBetween color={theme.palette.secondary.main} m="8px 0">
          {user.name ? (
            <FlexCenter
              gap="5px"
              textTransform="none"
              width="68%"
              onClick={() => {
                navigate("/myprofile");
                hideBar();
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={user.avatar ?? "./images/default_avatar.png"}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  Hello, {user.name}
                </Typography>
              </Box>
            </FlexCenter>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              className="ml-3"
              endIcon={<Login />}
              onClick={() => {
                navigate("/login");
                hideBar();
              }}
            >
              Hello, Join With ous
            </Button>
          )}
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Close />
          </IconButton>
        </FlexBetween>
        <Divider />
        {mainMenu && (
          <Box width="100%">
            <List>
              {user.role === "admin" && (
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      setMainMenu(false);
                      setAdminOpen(true);
                    }}
                  >
                    <ListItemIcon>
                      <AdminPanelSettings />
                    </ListItemIcon>
                    <ListItemText>Admin Panel</ListItemText>
                    <ChevronRight />
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navigate("/orders");
                    hideBar();
                  }}
                >
                  <ListItemIcon>
                    <ShoppingBasket />
                  </ListItemIcon>
                  <ListItemText>Orders</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navigate("/cart");
                    hideBar();
                  }}
                >
                  <ListItemIcon>
                    <ShoppingCart />
                  </ListItemIcon>
                  <ListItemText>Cart</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    setMainMenu(false);
                    setThemeOpen(true);
                  }}
                >
                  <ListItemText>Theme</ListItemText>
                  <ChevronRight />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    setFontOpen(!fontOpen);
                  }}
                >
                  <ListItemText>Font</ListItemText>
                  <ChevronLeftOutlined
                    sx={{
                      transform: fontOpen ? "rotate(90deg)" : "rotate(-90deg)",
                    }}
                  />
                </ListItemButton>
              </ListItem>
              {fontOpen && (
                <Box
                  pl="40px"
                  sx={{
                    width: "100%",
                    listStyle: "none",
                    animation: `${fromToAnimation(
                      "margin-left:100%",
                      "margin-left:0%"
                    )} 0.5s ease`,
                    "& li": {
                      maxWidth: "250px",
                      padding: "10px",
                    },
                  }}
                  component="ul"
                >
                  <Box
                    onClick={changeFont}
                    sx={{
                      border:
                        font === "'Inter', sans-serif"
                          ? `1px solid ${theme.palette.secondary.main}`
                          : "",
                    }}
                    component="li"
                  >
                    Inter
                  </Box>

                  <Box
                    onClick={changeFont}
                    sx={{
                      border:
                        font === "'Montserrat', sans-serif"
                          ? `1px solid ${theme.palette.secondary.main}`
                          : "",
                    }}
                    component="li"
                  >
                    Montserrat
                  </Box>

                  <Box
                    onClick={changeFont}
                    sx={{
                      border:
                        font === "'Roboto', sans-serif"
                          ? `1px solid ${theme.palette.secondary.main}`
                          : "",
                    }}
                    component="li"
                  >
                    Roboto
                  </Box>

                  <Box
                    onClick={changeFont}
                    sx={{
                      border:
                        font === "'Source Serif Pro', serif"
                          ? `1px solid ${theme.palette.secondary.main}`
                          : "",
                    }}
                    component="li"
                  >
                    Source Serif Pro
                  </Box>

                  <Box
                    onClick={changeFont}
                    sx={{
                      border:
                        font === "'Dancing Script', cursive"
                          ? `1px solid ${theme.palette.secondary.main}`
                          : "",
                    }}
                    component="li"
                  >
                    Dancing Script
                  </Box>

                  <Box
                    onClick={changeFont}
                    sx={{
                      border:
                        font === "'Expletus Sans', cursive"
                          ? `1px solid ${theme.palette.secondary.main}`
                          : "",
                    }}
                    component="li"
                  >
                    Expletus Sans
                  </Box>
                </Box>
              )}
              <Typography ml="10px" fontWeight="600">
                Help & Settings
              </Typography>
              {isAuthenticated && (
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      navigate("/myprofile");
                      hideBar();
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText>Your Account</ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem>
                <ListItemButton
                  onClick={(e) => {
                    navigate("/myprofile");
                    hideBar();
                  }}
                >
                  <ListItemIcon>
                    <SupportAgent />
                  </ListItemIcon>
                  <ListItemText>Customer Service</ListItemText>
                </ListItemButton>
              </ListItem>
              {isAuthenticated ? (
                <ListItem>
                  <ListItemButton
                    onClick={(e) => {
                      dispatch(logout);
                      navigate("/login");
                      hideBar();
                    }}
                  >
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </ListItemButton>
                </ListItem>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  className="ml-3"
                  endIcon={<Login />}
                  onClick={() => {
                    navigate("/login");
                    hideBar();
                  }}
                >
                  Login
                </Button>
              )}
            </List>
          </Box>
        )}
        {themeOpen && (
          <Box
            width="100%"
            sx={{
              animation: `${fromToAnimation(
                "margin-left:100%",
                "margin-left:0%"
              )} 0.5s ease`,
            }}
          >
            <List>
              <ListItemButton
                onClick={() => {
                  setMainMenu(true);
                  setThemeOpen(false);
                }}
              >
                <ListItemIcon>
                  <ArrowBack />
                </ListItemIcon>
                <ListItemText>Main Menu</ListItemText>
              </ListItemButton>
              <Divider />
              <SListI>
                <ListItemButton
                  onClick={changeTheme}
                  sx={{
                    border:
                      mode === "pink"
                        ? `1px solid ${theme.palette.secondary.main}`
                        : "",
                  }}
                >
                  <ListItemText>Pink</ListItemText>
                </ListItemButton>
              </SListI>
              <SListI>
                <ListItemButton
                  onClick={changeTheme}
                  sx={{
                    border:
                      mode === "orange"
                        ? `1px solid ${theme.palette.secondary.main}`
                        : "",
                  }}
                >
                  <ListItemText>Orange</ListItemText>
                </ListItemButton>
              </SListI>
              <SListI>
                <ListItemButton
                  onClick={changeTheme}
                  sx={{
                    border:
                      mode === "purple"
                        ? `1px solid ${theme.palette.secondary.main}`
                        : "",
                  }}
                >
                  <ListItemText>Purple</ListItemText>
                </ListItemButton>
              </SListI>
              <SListI>
                <ListItemButton
                  onClick={changeTheme}
                  sx={{
                    border:
                      mode === "dark"
                        ? `1px solid ${theme.palette.secondary.main}`
                        : "",
                  }}
                >
                  <ListItemText>Dark</ListItemText>
                </ListItemButton>
              </SListI>
              <SListI>
                <ListItemButton
                  onClick={changeTheme}
                  sx={{
                    border:
                      mode === "light"
                        ? `1px solid ${theme.palette.secondary.main}`
                        : "",
                  }}
                >
                  <ListItemText>Light</ListItemText>
                </ListItemButton>
              </SListI>
            </List>
          </Box>
        )}
        {adminOpen && (
          <Box
            sx={{
              width: "100%",
              animation: `${fromToAnimation(
                "margin-left:100%",
                "margin-left:0%"
              )} 0.5s ease`,
            }}
          >
            <List>
              <ListItemButton
                onClick={() => {
                  setMainMenu(true);
                  setAdminOpen(false);
                }}
              >
                <ListItemIcon>
                  <ArrowBack />
                </ListItemIcon>
                <ListItemText>Main Menu</ListItemText>
              </ListItemButton>
              <Divider />
              <SListI>
                <ListItemButton
                  onClick={() => {
                    navigate("/admin/dashboard");
                    hideBar();
                  }}
                >
                  <ListItemText>Dashboard</ListItemText>
                </ListItemButton>
              </SListI>
              <SListI>
                <ListItemButton
                  onClick={() => {
                    navigate("/admin/products");
                    hideBar();
                  }}
                >
                  <ListItemText>Products</ListItemText>
                </ListItemButton>
              </SListI>
              <SListI>
                <ListItemButton
                  onClick={() => {
                    navigate("/admin/order");
                    hideBar();
                  }}
                >
                  <ListItemText>Orders</ListItemText>
                </ListItemButton>
              </SListI>
              <SListI>
                <ListItemButton
                  onClick={() => {
                    navigate("/admin/users");
                    hideBar();
                  }}
                >
                  <ListItemText>Users</ListItemText>
                </ListItemButton>
              </SListI>
              <SListI>
                <ListItemButton
                  onClick={() => {
                    navigate("/admin/reviews");
                    hideBar();
                  }}
                >
                  <ListItemText>Reviews</ListItemText>
                </ListItemButton>
              </SListI>
              <SListI>
                <ListItemButton
                  onClick={() => {
                    navigate("/admin/products/create");
                    hideBar();
                  }}
                >
                  <ListItemText>Create Product</ListItemText>
                </ListItemButton>
              </SListI>
            </List>
          </Box>
        )}
      </SwipeableDrawer>
    </Box>
  );
};

export default Sidebar;
