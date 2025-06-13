import { toast } from "react-toastify";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, updateProfile } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Input,
  TextField,
} from "@mui/material";
import { FlexCenter } from "../styledComponents/FlexBetween";
import { FormContainer } from "../styledComponents/Form";
import { BorderFlow } from "../styledComponents/AnimationComponent";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user, isUpdated } = useSelector(
    (state) => state.authState
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPReview] = useState(
    "/images/default_avatar.png"
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPReview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPReview(user.avatar);
      }
    }
    if (isUpdated) {
      toast("Profile Updated Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearUpdateProfile()),
      });
      navigate("/myprofile");
      return;
    }
    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearError()),
      });
      return;
    }
  }, [user, isUpdated, error, dispatch]);

  return (
    <Fragment>
      <FlexCenter width="100%">
        <BorderFlow
          sx={{
            width: "330px",
            height: "348px",
            "&::before": {
              width: "320px",
              height: "348px",
            },
            "&::after": {
              width: "320px",
              height: "348px",
            },
          }}
          mt="45px"
        >
          <FormContainer
            onSubmit={submitHandler}
            className="input__form"
            encType="multipart/form-data"
            component="form"
            p="15px"
            width="320px"
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="">
              <TextField
                sx={{ width: "100%" }}
                name="name"
                label="Name"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="">
              <TextField
                sx={{ width: "100%" }}
                name="email"
                label="Email"
                type="email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <FormControl sx={{ width: "100%" }}>
              <FlexCenter>
                <Avatar src={avatarPreview} />
                <Input
                  sx={{ ml: "20px" }}
                  type="file"
                  name="avatar"
                  id="customFile"
                  onChange={onChangeAvatar}
                />
              </FlexCenter>
            </FormControl>

            <Button
              variant="contained"
              disabled={loading}
              type="submit"
              className="mt-4 mb-3"
            >
              Update
            </Button>
            <Box textAlign="right" width="100%">
              <Link to="/myprofile">Back to Profile</Link>
            </Box>
          </FormContainer>
        </BorderFlow>
      </FlexCenter>
    </Fragment>
  );
}
