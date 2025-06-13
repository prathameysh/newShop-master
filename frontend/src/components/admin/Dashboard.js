import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminProduct } from "../../actions/productActions";
import { getUsers } from "../../actions/userActions";
import { adminOrders as adminOrdersAction } from "../../actions/orderAction";
import { Box, Typography, useTheme } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { FlexCenter } from "../styledComponents/FlexBetween";

export default function Dashboard() {
  const theme = useTheme();
  const { products = [] } = useSelector((state) => state.productsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const outOfStockCount = () => {
    let outOfStock = 0;

    if (products.length > 0) {
      products.forEach((product) => {
        if (product.stock === 0) {
          outOfStock += 1;
        }
      });
    }
    return outOfStock;
  };
  const totalPriceC = () => {
    let totalPrice = 0;
    if (adminOrders.length > 0) {
      adminOrders.forEach((order) => {
        totalPrice += order.totalPrice;
      });
    }
    return totalPrice;
  };
  useEffect(() => {
    dispatch(getAdminProduct);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
  }, []);

  return (
    <div className="">
      <Box className="">
        <Sidebar />
      </Box>
      <Box>
        <div>
          <Typography
            pl="8px"
            m="1px 3px"
            bgcolor={theme.palette.background.alt}
            variant="h1"
          >
            Dashboard
          </Typography>
          <FlexCenter
            flexDirection="column"
            bgcolor={theme.palette.bg3}
            sx={{
              background: `linear-gradient(to right,transparent,${theme.palette.bg3},${theme.palette.bg2},${theme.palette.bg3},transparent)`,
            }}
            m="8px"
          >
            <Typography variant="h3">Total Amount</Typography>
            <div>
              <b>${totalPriceC()}</b>
            </div>
          </FlexCenter>

          <div className="dsbd__i p-8">
            <Box
              sx={{
                background: `linear-gradient(50deg,transparent,${theme.palette.bg2})`,
              }}
            >
              <div className="">
                <div className="">
                  <div className="">Products</div>
                </div>
                <div className="">
                  <b>{products.length}</b>
                </div>

                <Link className="" to="/admin/products">
                  <span className="">View Details</span>
                  <span className="">
                    <ChevronRight />
                  </span>
                </Link>
              </div>
            </Box>

            <Box
              sx={{
                background: `linear-gradient(50deg,transparent,${theme.palette.bg2})`,
              }}
            >
              <div className="">
                <div className="">
                  <div className="">Orders</div>
                </div>
                <div className="">
                  <b>{adminOrders.length}</b>
                </div>
                <Link className="" to="/admin/order">
                  <span className="">View Details</span>
                  <span className="">
                    <ChevronRight />
                  </span>
                </Link>
              </div>
            </Box>

            <Box
              sx={{
                background: `linear-gradient(50deg,transparent,${theme.palette.bg4})`,
              }}
            >
              <div className="">
                <div className="">
                  <div className="">Users</div>
                </div>
                <div className="">
                  <b>{users.length}</b>
                </div>
                <Link className="" to="/admin/users">
                  <span className="">View Details</span>
                  <span className="">
                    <ChevronRight />
                  </span>
                </Link>
              </div>
            </Box>

            <Box sx={{ background: `linear-gradient(45deg,transparent,red)` }}>
              <div className="">
                <div className="">
                  <div className="">Out of Stock </div>
                </div>
                <div>
                  <b>{outOfStockCount()}</b>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
}
