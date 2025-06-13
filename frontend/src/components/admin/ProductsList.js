import { useDispatch, useSelector } from "react-redux";
import {  useEffect } from "react";
import { clearError } from "../../slices/productsSlice";
import { getAdminProduct } from "../../actions/productActions";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import { clearProductDeleted } from "../../slices/productSlice";
import { Box, useMediaQuery } from "@mui/material";
import { FlexCenter } from "../styledComponents/FlexBetween";
import DDGrid from "../utility/DDGrid";

export default function ProductsList() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted = false, error: prodectError } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error || prodectError) {
      toast(error || prodectError, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearError()),
      });
    }

    if (isProductDeleted) {
      toast("Prodect Deleted Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearProductDeleted()),
      });

      return;
    }
    dispatch(getAdminProduct);
  }, [error, dispatch, prodectError, isProductDeleted]);

  return (
    <div className="">
      <Box className="">
        <Sidebar />
      </Box>
      <div >
        <h1 className="mt-4 mb-3">Product List</h1>
        {loading ? (
          <Loader />
        ) : (
          <FlexCenter>
            <Box height="600px" sx={{ width: isNonMobile ? "600px" : "320px" }}>
              <DDGrid adminProductsList={products} horizontal />
            </Box>
          </FlexCenter>
        )}
      </div>
    </div>
  );
}
