import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orderDetail as orderDetailAction } from "../../actions/orderAction";
import Loader from "../layouts/Loader";
import OrderDetails from "../adminPublic/OrderDetails";
import { FlexCenter } from "../styledComponents/FlexBetween";

export default function OrderDetail() {
  const { orderDetail, loading } = useSelector((state) => state.orderState);
  const { orderStatus = "Processing" } = orderDetail;

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FlexCenter>
          <OrderDetails orderDetail={orderDetail} orderStatus={orderStatus} />
        </FlexCenter>
      )}
    </>
  );
}
