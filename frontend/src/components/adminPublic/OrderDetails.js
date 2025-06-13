import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import FlexBetween, { FlexCenter } from "../styledComponents/FlexBetween";

const OrderDetails = ({ orderDetail, orderStatus }) => {
  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid = paymentInfo.status === "succeeded" ? true : false;
  return (
    <Box>
      <Box>
        <div className="mt-5 mb-8">
          <h2 className="">Order # </h2>
          <b>{orderDetail._id}</b>
        </div>
        <Typography variant="h4">Shipping Info</Typography>
        <Box>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p>
            <b>Address:</b>
            {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state},
            {shippingInfo.country}, {shippingInfo.postalCode}
          </p>
          <p>
            <b>Amount:</b> ${totalPrice}
          </p>
        </Box>
        <hr />
      </Box>

      <div className="">
        <h4 className="my-4">Payment</h4>
        <p className={`${isPaid ? "greenColor" : "redColor"} pl-15`}>
          <b>{isPaid ? "PAID" : "NOT PAID"}</b>
        </p>

        <h4 className="my-4">Order Status</h4>
        <p
          className={`${
            orderStatus && orderStatus.includes("Delivered")
              ? "greenColor"
              : "redColor"
          } pl-15`}
        >
          <b>{orderStatus}</b>
        </p>
        <hr />
      </div>
      <div>
        <h4 className="my-4">Order Items</h4>
        <FlexCenter flexDirection="column" gap="3px" width="100%">
          {orderItems &&
            orderItems.map((item, i) => (
              <FlexBetween width="100%" border="1px solid gray" key={i}>
                <Box sx={{ flexGrow: 0.15 }}>
                  <img src={item.image} alt="Laptop" height="45" width="65" />
                </Box>
                <FlexCenter sx={{ flexGrow: 0.85 }} flexDirection="column">
                  <div>
                    <Typography noWrap="...">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Typography>
                  </div>
                  <div>
                    <div className="">
                      <b>${item.price}</b>
                    </div>
                    <div className="">
                      <b>{item.quantity} Piece(s)</b>
                    </div>
                  </div>
                </FlexCenter>
              </FlexBetween>
            ))}
        </FlexCenter>
      </div>

      <hr />
    </Box>
  );
};

export default OrderDetails;
