import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, clearError } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FlexCenter } from "../styledComponents/FlexBetween";
import { FormContainer } from "../styledComponents/Form";

import {
  fromOnlyAnimation,
  full2Animation,
} from "../styledComponents/animation";
import { BorderFlow } from "../styledComponents/AnimationComponent";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearError),
      });
      return;
    }
  }, [dispatch, isAuthenticated, error, navigate, redirect]);

  return (
    <Fragment>
      <MetaData title={"Login"} />
      <FlexCenter>
        <BorderFlow
          sx={{
            width: "330px",
            height: "330px",
            "&::before": {
              width: "320px",
              height: "320px",
            },
            "&::after": {
              width: "320px",
              height: "320px",
            },
          }}
          mt="45px"
        >
          <FormContainer
            onSubmit={submitHandler}
            component="form"
            p="15px"
            width="320px"
            height="320px"
            sx={{ inset: "41px" }}
          >
            <h1 className="">Login</h1>
            <div>
              <TextField
                sx={{ width: "100%" }}
                id="standard-basic"
                label="Email"
                type="email"
                variant="standard"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              textAlign="right"
              width="100%"
              onClick={() => navigate("/password/forgot")}
            >
              Forgot Password?
            </Box>
            <Button
              variant="contained"
              id="login_button"
              type="submit"
              disabled={loading}
            >
              LOGIN
            </Button>
            <div>
              I don't have an Account.
              <Link to="/register" className="">
                New User?
              </Link>
            </div>
          </FormContainer>
        </BorderFlow>
      </FlexCenter>
    </Fragment>
  );
}
