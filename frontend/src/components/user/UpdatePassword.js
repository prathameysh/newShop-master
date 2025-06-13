import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  UpdatePassword as UpdatePasswordAction,
} from "../../actions/userActions";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FlexCenter } from "../styledComponents/FlexBetween";
import { FormContainer } from "../styledComponents/Form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BorderFlow } from "../styledComponents/AnimationComponent";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, user, isUpdated } = useSelector(
    (state) => state.authState
  );
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("password", password);
    if (password !== conformPassword) {
      alert("Please provide same password and conform password");
      return;
    }
    dispatch(UpdatePasswordAction(formData));
  };

  useEffect(() => {
    if (isUpdated) {
      toast("Password Updated Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setOldPassword("");
      setPassword("");
      setConformPassword("");
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
  }, [user, isUpdated, error, dispatch]);

  return (
    <Fragment>
      <FlexCenter>
        <BorderFlow
          sx={{
            width: "330px",
            height: "352px",
            "&::before": {
              width: "320px",
              height: "352px",
            },
            "&::after": {
              width: "320px",
              height: "352px",
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
              <InputLabel htmlFor="standard-adornment-password-Old">
                Old Password
              </InputLabel>
              <Input
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                id="standard-adornment-password-Old"
                name="password"
                type={showPassword ? "text" : "password"}
                required
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
              <InputLabel htmlFor="standard-adornment-password-New">
                New Password
              </InputLabel>
              <Input
                id="standard-adornment-password-New"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      onMouseDown={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
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
                name="confirmPassword"
                type={showNewPassword ? "text" : "password"}
                onChange={(e) => setConformPassword(e.target.value)}
                value={conformPassword}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      onMouseDown={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
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
              <Link to="/myprofile">Back to Profile</Link>
            </Box>
          </FormContainer>
        </BorderFlow>
      </FlexCenter>
    </Fragment>
  );
}
