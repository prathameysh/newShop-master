import { Box, Button, MenuItem, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updateOrder,
  orderDetail as orderDetailAction,
} from "../../actions/orderAction";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
import Sidebar from "./Sidebar";
import OrderDetails from "../adminPublic/OrderDetails";
import { FlexCenter } from "../styledComponents/FlexBetween";
import { FormContainer } from "../styledComponents/Form";
import {
  BorderFlowBySpan,
  Spans,
} from "../styledComponents/AnimationComponent";

export default function UpdateOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { id: orderId } = useParams();
  const {
    loading = true,
    isOrderUpdated = false,
    orderDetail = {},
    error,
  } = useSelector((state) => state.orderState);

  const [orderStatus, setOrderStatus] = useState("Processing");

  const sumbitHandler = (e) => {
    e.preventDefault();
    const orderData = {};
    orderData.orderStatus = orderStatus;
    dispatch(updateOrder(orderId, orderData));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      toast("Order Updated Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearOrderUpdated()),
      });
      navigate("/admin/order");

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
    dispatch(orderDetailAction(orderId));
  }, [isOrderUpdated, error, navigate, dispatch, orderId]);

  useEffect(() => {
    if (orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  return (
    <div className="">
      <Box className="">
        <Sidebar />
      </Box>
      <div>
        <FlexCenter>
          <OrderDetails orderStatus={orderStatus} orderDetail={orderDetail} />
        </FlexCenter>
        <FlexCenter width="100%">
          <BorderFlowBySpan mt="20px">
            <Spans />
            <FormContainer
              onSubmit={sumbitHandler}
              component="form"
              p="15px"
              m="4px"
              width="300px"
            >
              <div>
                <TextField
                  sx={{ width: "100%" }}
                  select
                  name="status"
                  label="Order Status"
                  defaultValue="Accessories"
                  variant="standard"
                  onChange={(e) => setOrderStatus(e.target.value)}
                  value={orderStatus}
                >
                  <MenuItem value={"Processing"}>Processing</MenuItem>
                  <MenuItem value={"Delivered"}>Delivered</MenuItem>
                  <MenuItem value={"Shipped"}>Shipped</MenuItem>
                </TextField>
              </div>
              <div>
                <Button
                  variant="contained"
                  disabled={loading}
                  className="mt-4"
                  type="submit"
                >
                  Update Status
                </Button>
              </div>
            </FormContainer>
          </BorderFlowBySpan>
        </FlexCenter>
      </div>
    </div>
  );
}
