import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../../actions/userActions";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import MetaData from "../layouts/MetaData";
import { FlexCenter } from "../styledComponents/FlexBetween";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormContainer } from "../styledComponents/Form";
import { fromToAnimation, full2Animation } from "../styledComponents/animation";
import { BorderFlow } from "../styledComponents/AnimationComponent";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPReview] = useState(
    "/images/default_avatar.png"
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPReview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearError),
      });
      return;
    }
  }, [error, isAuthenticated, navigate, dispatch]);

  return (
    <Fragment>
      <MetaData title={"Rigister"} />
      <FlexCenter width="100%">
        <BorderFlow
          sx={{
            width: "330px",
            height: "385px",
            "&::before": {
              width: "330px",
              height: "385px",
            },
            "&::after": {
              width: "330px",
              height: "385px",
            },
          }}
          mt="45px"
        >
          <FormContainer
            onSubmit={submitHandler}
            encType="multipart/form-data"
            component="form"
            p="15px"
            m="4px"
            width="320px"
          >
            <h1>Register</h1>
            <div>
              <TextField
                sx={{ width: "100%" }}
                name="name"
                label="Name"
                variant="standard"
                onChange={onChange}
                required
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                name="email"
                label="Email"
                type="email"
                variant="standard"
                onChange={onChange}
                required
              />
            </div>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                name="password"
                onChange={onChange}
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
            <FormControl sx={{ width: "100%" }}>
              <FlexCenter>
                <Avatar src={avatarPreview} />
                <Input
                  sx={{ ml: "20px" }}
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="images/*"
                  onChange={onChange}
                />
              </FlexCenter>
            </FormControl>
            <Button variant="contained" type="submit" disabled={loading}>
              REGISTER
            </Button>
            <Box textAlign="right" width="100%">
              Already a user?
              <Link to="/login" className="mt-3">
                Login
              </Link>
            </Box>
          </FormContainer>
        </BorderFlow>
      </FlexCenter>
    </Fragment>
  );
}
