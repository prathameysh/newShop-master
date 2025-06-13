import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../../actions/userActions";
import { toast } from "react-toastify";
import { Box, Button, TextField } from "@mui/material";
import { FormContainer } from "../styledComponents/Form";
import { FlexCenter } from "../styledComponents/FlexBetween";
import { Link, useNavigate } from "react-router-dom";
import { BorderFlow } from "../styledComponents/AnimationComponent";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.authState);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (message) {
      toast(message, {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setEmail("");
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
  }, [message, error, dispatch]);

  return (
    <Fragment>
      <FlexCenter width="100%">
        <BorderFlow
          sx={{
            width: "330px",
            height: "238px",
            "&::before": {
              width: "320px",
              height: "238px",
            },
            "&::after": {
              width: "320px",
              height: "238px",
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
            <h1 className="mb-3">Forgot Password</h1>
            <div>
              <TextField
                sx={{ width: "100%" }}
                name="email"
                label="Enter Email"
                type="email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button
              variant="contained"
              disabled={loading}
              id="forgot_password_button"
              type="submit"
              className=" mt-5"
            >
              Send Email
            </Button>
            <Box textAlign="right" width="100%">
              <Link to="/login">Back to Login</Link>
            </Box>
          </FormContainer>
        </BorderFlow>
      </FlexCenter>
    </Fragment>
  );
}
