import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearError, clearReviewDeleted } from "../../slices/productSlice";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import { getReviews } from "../../actions/productActions";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import {} from "@mui/icons-material";
import { FlexCenter } from "../styledComponents/FlexBetween";
import DDGrid from "../utility/DDGrid";
import { FormContainer } from "../styledComponents/Form";

export default function ReviewList() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {
    reviews = [],
    loading = true,
    error,
    isReviewDeleted,
  } = useSelector((state) => state.productState);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
  };
  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearError()),
      });
    }

    if (isReviewDeleted) {
      toast("Review Deleted Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearReviewDeleted()),
      });
      dispatch(getReviews(productId));

      return;
    }
  }, [error, dispatch, isReviewDeleted]);

  return (
    <div className="">
      <Box className="">
        <Sidebar />
      </Box>
      <div>
        <h1 className="mt-4 mb-4">Review List</h1>
        
        <>
          {loading ? (
            <Loader />
          ) : (
            <FlexCenter>
              <div>
                <FormContainer
                  onSubmit={submitHandler}
                  component="form"
                  p="15px"
                  m="4px"
                >
                  <div className="">
                    <TextField
                      sx={{ width: "100%" }}
                      name="productId"
                      label="Product ID"
                      variant="standard"
                      onChange={(e) => setProductId(e.target.value)}
                      value={productId}
                    />
                  </div>
                  <Button variant="contained" type="submit" disabled={loading}>
                    Search
                  </Button>
                </FormContainer>
                <Box
                  height="600px"
                  sx={{ width: isNonMobile ? "520px" : "320px" }}
                >
                  <DDGrid
                    adminReviewsList={reviews}
                    horizontal
                    productId={productId}
                  />
                </Box>
              </div>
            </FlexCenter>
          )}
        </>
      </div>
    </div>
  );
}
