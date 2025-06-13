import { Box, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

export default function CheckoutSteps({ shipping, confirmOrder, payment }) {
  let { palette } = useTheme();
  return (
    <div className="checkout mt-5">
      <Link to="/shipping">
        <Box
          bgcolor={shipping ? palette.bg4 : palette.bg2}
          className="checkout__cur"
        >
          Shipping Info
        </Box>
      </Link>
      <Link to="/order/confirm">
        <Box
          bgcolor={confirmOrder ? palette.bg4 : palette.bg2}
          className="checkout__cur"
        >
          Confirm Order
        </Box>
      </Link>

      <Link to="/payment">
        <Box
          bgcolor={payment ? palette.bg4 : palette.bg2}
          className="checkout__cur"
        >
          Payment
        </Box>
      </Link>
    </div>
  );
}
