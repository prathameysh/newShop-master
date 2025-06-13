import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import {
  ArrowDropUp,
  LinkedIn,
  Facebook,
  Email,
  Twitter,
  GitHub,
} from "@mui/icons-material";
import { FlexCenter } from "../styledComponents/FlexBetween";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";

export default function Footer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const above400 = useMediaQuery("(min-width:400px)");
  const above600 = useMediaQuery("(min-width:600px)");
  return (
    <footer className="pt-3 pb-3">
      <Link to={pathname} target="_blank">
        <FlexCenter
          bgcolor={theme.palette.background.alt1}
          flexDirection="column"
        >
          <ArrowDropUp />
          <p>Back to top</p>
        </FlexCenter>
      </Link>
      <Box
        display="flex"
        justifyContent={above400 ? "space-between" : "start"}
        alignItems={above400 ? "flex-start" : "center"}
        flexDirection={above400 ? "row" : "column"}
        bgcolor={theme.palette.background.alt}
        p="5px"
        sx={{
          "h4 , p": {
            textAlign: "center",
          },
          a: {
            transition: "0.4s",
            ":hover": {
              color: theme.palette.bg3,
              fontSize: "120%",
              transition: "0.2s",
            },
          },
        }}
      >
        <div className="m-1">
          <h4>Get to Know Us</h4>
          <p>
            <a href="mailto:cisr6146@gmail.com">Contact Us</a>
          </p>
          <p>
            <Link to="/">Shop.in</Link>
          </p>
          <p>
            <Link to="careers">Careers</Link>
          </p>
          <p>
            <Link to="about">About Us</Link>
          </p>
        </div>
        {above600 && (
          <Box
            sx={{
              "p a:hover": {
                fontSize: "100%",
              },
            }}
            className="m-3"
          >
            <p>
              <a href="mailto:cisr6146@gmail.com">
                <Email />
              </a>
            </p>
            <p>
              <a href="https://www.linkedin.com/in/rajesh-p-09b86724a">
                <LinkedIn />
              </a>
            </p>
            <p>
              <a href="https://github.com/Rajeshesh">
                <GitHub />
              </a>
            </p>
            <p>
              <a href="https://github.com/Rajeshesh">
                <Twitter />
              </a>
            </p>
            <p>
              <a href="https://www.linkedin.com/in/rajesh-p-09b86724a">
                <Facebook />
              </a>
            </p>
          </Box>
        )}

        <Box
          sx={{
            "& p a:hover": {
              fontSize: "100%",
              fontStyle: "italic",
              transition: "0.07s",
            },
          }}
          className="m-1"
        >
          <h4>Stay with Us</h4>
          <p>
            <Link to="myprofile">Your Account</Link>
          </p>
          <p>
            <Link to="orders">Your Orders</Link>
          </p>
          <p>
            <Link to="/">Recently Viewed Items</Link>
          </p>
        </Box>
        <Box className="m-1">
          <h4>Let Us Help you</h4>
          <p>
            <Link to="/customer/service">Customer Service</Link>
          </p>
          <p>
            <Link to="/return/centre">Return Centre</Link>
          </p>
          <p>
            <Link to="/help">Help</Link>
          </p>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        bgcolor={theme.palette.background.alt1}
      >
        {!above600 && (
          <Box
            sx={{ "a:hover": { color: theme.palette.bg3 } }}
            className="mt-1"
          >
            <a className="ml-1" href="mailto:cisr6146@gmail.com">
              <Email />
            </a>
            <a
              className="ml-1"
              href="https://www.linkedin.com/in/rajesh-p-09b86724a"
            >
              <LinkedIn />
            </a>
            <a className="ml-1" href="https://github.com/Rajeshesh">
              <GitHub />
            </a>
            <a
              className="ml-1"
              href="https://www.linkedin.com/in/rajesh-p-09b86724a"
            >
              <Twitter />
            </a>
            <a className="ml-1" href="https://github.com/Rajeshesh">
              <Facebook />
            </a>
          </Box>
        )}
        <FlexCenter m="7px" gap="15px">
          <Button
            sx={{ bgcolor: theme.palette.bg4 }}
            onClick={async (e) => {
              await dispatch(logout);
              navigate("/login");
            }}
            variant="contained"
          >
            Switch Account
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              dispatch(logout);
            }}
            sx={{ bgcolor: theme.palette.bg2 }}
          >
            Sign Out
          </Button>
        </FlexCenter>
        <FlexCenter gap="20px">
          <div>Conditions of Use</div>
          <div>Privacy Notes</div>
          <div>Interest-Based Ads</div>
        </FlexCenter>
        <p className="mt-1">
          Copyright &copy; Developed Shop - 2023-2024, All Rights Reserved
        </p>
      </Box>
    </footer>
  );
}
