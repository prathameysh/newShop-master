import MetaData from "../layouts/MetaData";
import React, { useEffect } from "react";
import { validateShipping } from "./Shipping";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { Button } from "@mui/material";
import ShippingInfo from "./ShippingInfo";
import OrderSummary from "./OrderSummary";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const { shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState
  );

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 499 ? 0 : 50;
  let taxPrice = Number(0.05 * itemsPrice);
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  taxPrice = Number(0.05 * itemsPrice).toFixed(2);
  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, []);

  const processPayment = () => {
    const data = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <>
      <MetaData title={"Confirm Order"} />
      <CheckoutSteps confirmOrder shipping />
      <div className="confirmOrder">
        <div className="">
          <ShippingInfo shippingInfo={shippingInfo} />
          <hr />
          <div>
            <h4 className="mt-4">Your Items:</h4>
            {cartItems.map((item, i) => (
              <div key={i}>
                <div className="mt-2 mb-2">
                  <div className="confirmOrder__product">
                    <div className="mr-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="mr-4">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className=" mt-4 mr-4">
                      <p>
                        {item.quantity} x ${item.price} ={" "}
                        <b>${item.quantity * item.price}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>

          <hr />
        </div>

        <OrderSummary
          itemsPrice={itemsPrice}
          shippingPrice={shippingPrice}
          taxPrice={taxPrice}
          totalPrice={totalPrice}
          processPayment={processPayment}
        />
      </div>
    </>
  );
}
