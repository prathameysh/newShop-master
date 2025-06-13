import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validateShipping } from "./Shipping";
import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import ShippingInfo from "./ShippingInfo";
import OrderSummary from "./OrderSummary";

const ConfirmOrderBuyNow = () => {
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cartState);
  const { buyNow } = useSelector((state) => state.orderState);
  
  const itemsPrice = buyNow.product.price * buyNow.quantity;
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
            <h4 className="mt-4">Your Item:</h4>
            <div className="mt-2 mb-2">
              <div className="confirmOrder__product">
                <div className="mr-4">
                  <img
                    src={buyNow.product.images[0].image}
                    alt={buyNow.product.name}
                    height="45"
                    width="65"
                  />
                </div>

                <div className="mr-4">
                  <Link to={`/product/${buyNow.product["_id"]}`}>
                    {buyNow.product.name}
                  </Link>
                </div>

                <div className=" mt-4 mr-4">
                  <p>
                    {buyNow.quantity} x ${buyNow.product.price} ={" "}
                    <b>${buyNow.quantity * buyNow.product.price}</b>
                  </p>
                </div>
              </div>
            </div>
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
};

export default ConfirmOrderBuyNow;
