import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../../actions/userActions";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { FormContainer } from "../styledComponents/Form";
import { FlexCenter } from "../styledComponents/FlexBetween";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BorderFlow } from "../styledComponents/AnimationComponent";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { loading, error, user } = useSelector((state) => state.authState);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    dispatch(resetPassword(formData, token));
  };

  useEffect(() => {
    if (user) {
      toast("Password Reset Success!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setPassword("");
      setConfirmPassword("");
      navigate("/");
      return;
    }
    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearError),
      });
      return;
    }
  }, [user, error, dispatch, navigate]);

  return (
    <Fragment>
      <FlexCenter width="100%">
        <BorderFlow
          sx={{
            width: "330px",
            height: "297px",
            "&::before": {
              width: "320px",
              height: "297px",
            },
            "&::after": {
              width: "320px",
              height: "297px",
            },
          }}
          mt="45px"
        >
          <FormContainer
            onSubmit={submitHandler}
            component="form"
            p="15px"
            width="320px"
          >
            <h1 className="mb-3">New Password</h1>

            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="standard-adornment-password"
                name="password"
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
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password-Confirm">
                Confirm Password
              </InputLabel>
              <Input
                id="standard-adornment-password-Confirm"
                name="passwordConform"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            <Button
              disabled={loading}
              variant="contained"
              type="submit"
              className="mt-5"
            >
              Set Password
            </Button>
            <Box textAlign="center" width="100%">
              <Link to="/password/forgot">Back to Forgot Password</Link>
            </Box>
          </FormContainer>
        </BorderFlow>
      </FlexCenter>
    </Fragment>
  );
}
