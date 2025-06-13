import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userOrders as userOrdersAction } from "../../actions/orderAction";
import Metadata from "../layouts/MetaData";
import { Box, useMediaQuery } from "@mui/material";
import DDGrid from "../utility/DDGrid";
import { FlexCenter } from "../styledComponents/FlexBetween";

export default function UserOrder() {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { userOrders = [] } = useSelector((state) => state.orderState);

  useEffect(() => {
    dispatch(userOrdersAction);
  }, []);

  return (
    <div className="s1024">
      <Metadata title="My Orders" />
      <h1 className="mt-5 ">My Orders</h1>
      <FlexCenter>
        <Box height="600px" sx={{ width: isNonMobile ? "530px" : "320px" }}>
          <DDGrid userOrders={userOrders} horizontal />
        </Box>
      </FlexCenter>
    </div>
  );
}
