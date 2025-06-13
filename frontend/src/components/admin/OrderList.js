import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import { adminOrders as adminOrdersAction } from "../../actions/orderAction";
import { Box, useMediaQuery } from "@mui/material";
import { FlexCenter } from "../styledComponents/FlexBetween";
import DDGrid from "../utility/DDGrid";

export default function OrderList() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearError()),
      });
    }

    if (isOrderDeleted) {
      toast("Order Deleted Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearOrderDeleted()),
      });

      return;
    }
    dispatch(adminOrdersAction);
  }, [error, dispatch, isOrderDeleted]);

  return (
    <div className="">
      <Box className="">
        <Sidebar />
      </Box>
      <div className="s1024">
        <h1 className="mt-4 mb-4">Order List</h1>
        <div>
          {loading ? (
            <Loader />
          ) : (
            <FlexCenter>
              <Box
                height="600px"
                sx={{ width: isNonMobile ? "520px" : "320px" }}
              >
                <DDGrid adminOrdersList={adminOrders} horizontal />
              </Box>
            </FlexCenter>
          )}
        </div>
      </div>
    </div>
  );
}
