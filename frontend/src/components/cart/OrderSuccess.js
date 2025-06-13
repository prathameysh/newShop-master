import { Link } from "react-router-dom";
import { FlexCenter } from "../styledComponents/FlexBetween";

export default function OrderSuccess() {
  return (
    <div className="m-7">
      <FlexCenter flexWrap="wrap">
        <img
          className=""
          src="/images/success.png"
          alt="Order Success"
          width="200"
          height="200"
        />

        <h2>Your Order has been placed successfully.</h2>

        <Link to="/orders">Go to Orders</Link>
      </FlexCenter>
    </div>
  );
}
