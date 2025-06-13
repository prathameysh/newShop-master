import { Button } from "@mui/material";
import React from "react";

const OrderSummary = ({
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  processPayment,
}) => {
  return (
    <div className="confirmOrder__summary p-10 mt-4">
      <div>
        <h4>Order Summary</h4>
        <hr />
        <div className="pl-10">
          <p>
            Subtotal: <span className="">${itemsPrice}</span>
          </p>
          <p>
            Shipping: <span className="">${shippingPrice}</span>
          </p>
          <p>
            Tax: <span className="">${taxPrice}</span>
          </p>

          <hr />

          <p>
            Total: <span className="">${totalPrice}</span>
          </p>
        </div>

        <hr />
        <Button variant="contained" onClick={processPayment} className="">
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
