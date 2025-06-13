import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearError, clearUserDeleted } from "../../slices/userSlice";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import { getUsers } from "../../actions/userActions";
import { Box, useMediaQuery } from "@mui/material";
import { FlexCenter } from "../styledComponents/FlexBetween";
import DDGrid from "../utility/DDGrid";

export default function UserList() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {
    users = [],
    loading = true,
    error,
    isUserDeleted,
  } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearError()),
      });
    }

    if (isUserDeleted) {
      toast("User Deleted Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearUserDeleted()),
      });

      return;
    }
    dispatch(getUsers);
  }, [error, dispatch, isUserDeleted]);

  return (
    <div className="">
      <Box className="">
        <Sidebar />
      </Box>
      <div className="s1024">
        <h1 className="mt-4 mb-4">User List</h1>
        <>
          {loading ? (
            <Loader />
          ) : (
            <FlexCenter>
              <Box
                height="600px"
                sx={{ width: isNonMobile ? "520px" : "320px" }}
              >
                <DDGrid adminUsersList={users} horizontal />
              </Box>
            </FlexCenter>
          )}
        </>
      </div>
    </div>
  );
}
