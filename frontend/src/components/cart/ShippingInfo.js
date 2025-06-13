import React from "react";
import { useSelector } from "react-redux";

const ShippingInfo = ({ shippingInfo }) => {
  const { user } = useSelector((state) => state.authState);

  return (
    <div>
      <h4 className="">Shipping Info</h4>
      <div className="pl-15">
        <p>
          <b>Name:</b> {user.name}
        </p>
        <p>
          <b>Phone:</b>
          {shippingInfo.phoneNo}
        </p>
        <p className="">
          <b>Address:</b> {shippingInfo.address},{shippingInfo.city},
          <br />
          {shippingInfo.state}-{shippingInfo.postalCode},{shippingInfo.country}
        </p>
      </div>
    </div>
  );
};

export default ShippingInfo;
