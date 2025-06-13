import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, updateuser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import Sidebar from "./Sidebar";
import { FlexCenter } from "../styledComponents/FlexBetween";
import {
  BorderFlowBySpan,
  Spans,
} from "../styledComponents/AnimationComponent";
import { FormContainer } from "../styledComponents/Form";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: userId } = useParams();

  const {
    loading,
    isUserUpdated,
    user = {},
    error,
  } = useSelector((state) => state.userState);
  const { user: authUser } = useSelector((state) => state.authState);

  const sumbitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);

    dispatch(updateuser(userId, formData));
  };

  useEffect(() => {
    if (isUserUpdated) {
      toast("User Updated Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearUserUpdated()),
      });
      navigate("/admin/users");

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
    dispatch(getUser(userId));
  }, [isUserUpdated, error, dispatch]);

  useEffect(() => {
    if (user._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const options = [
    {
      value: "user",
      label: "User",
    },
    {
      value: "admin",
      label: "Admin",
    },
  ];

  return (
    <div className="">
      <Box className="">
        <Sidebar />
      </Box>
      <FlexCenter width="100%">
        <BorderFlowBySpan mt="20px">
          <Spans />
          <FormContainer
            onSubmit={sumbitHandler}
            encType="multipart/form-data"
            component="form"
            p="15px"
            m="4px"
          >
            <h1 className="mb-4">Update User</h1>

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

            <div>
              <TextField
                sx={{ width: "100%" }}
                select
                label="Role"
                variant="standard"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <Button
              id="login_button"
              disabled={loading || authUser.email === user.email}
              variant="contained"
              type="submit"
              className="mt-5"
            >
              UPDATE
            </Button>
          </FormContainer>
        </BorderFlowBySpan>
      </FlexCenter>
    </div>
  );
}
