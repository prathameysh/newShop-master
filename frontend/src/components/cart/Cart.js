import {
  DeleteForever,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart,
} from "../../slices/cartSlice";
import { buyNowClose } from "../../slices/orderSlice";
import { FlexCenter } from "../styledComponents/FlexBetween";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { items } = useSelector((state) => state.cartState);

  const increaseQty = (item) => {
    const count = item.quantity;

    if (item.stock === 0 || count >= item.stock) return;
    dispatch(increaseCartItemQty(item.product));
  };

  const decreaseQty = (item) => {
    if (item.quantity === 1) return;
    dispatch(decreaseCartItemQty(item.product));
  };
  const checkoutHandler = () => {
    dispatch(buyNowClose());
    navigate("/shipping");

    //  navigate('/login?redirect=shipping') want to check why isn't work.
  };

  return (
    <div>
      {items.length === 0 ? (
        <h2 className="mt-5">
          Your Cart: <b>0 items</b>
        </h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{items.length}items</b>
          </h2>

          <div className="cart">
            <div className="cart__one">
              {items.map((item, int) => (
                <Fragment key={int}>
                  <hr />
                  <div className="cart__item">
                    <div className="">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart__item--action pl-5">
                      <div className="pt-10">
                        <Link to={`/product/${item.product}`}>
                          {item.name.slice(0, 14)}...
                        </Link>
                      </div>

                      <div className="">
                        <div className="pt-10 pl-9">${item.price}</div>

                        <FlexCenter minWidth="100px">
                          <IconButton
                            className=""
                            onClick={() => decreaseQty(item)}
                          >
                            <KeyboardDoubleArrowLeft />
                          </IconButton>

                          <Box he>{item.quantity}</Box>

                          <IconButton
                            className=""
                            onClick={() => increaseQty(item)}
                          >
                            <KeyboardDoubleArrowRight />
                          </IconButton>
                        </FlexCenter>

                        <IconButton
                          className="ml-3"
                          onClick={() =>
                            dispatch(removeItemFromCart(item.product))
                          }
                        >
                          <DeleteForever />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
              <hr />
            </div>

            <div className="cart__two">
              <div>
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="">
                    {items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="">
                    $
                    {parseInt(
                      items.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                    )}
                  </span>
                </p>

                <hr />
                <Button
                  variant="contained"
                  className=""
                  sx={{ bgcolor: palette.bg4 }}
                  onClick={() => checkoutHandler()}
                >
                  Check out
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
