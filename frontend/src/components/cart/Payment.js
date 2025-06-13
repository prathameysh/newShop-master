import { Button } from "@mui/material";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../../actions/orderAction";
import { orderCompleted } from "../../slices/cartSlice";
import {
  buyNowClose,
  clearError as clearOrderError,
} from "../../slices/orderSlice";
import CheckoutSteps from "./CheckoutSteps";
import { validateShipping } from "./Shipping";
import { FlexCenter } from "../styledComponents/FlexBetween";
import { BoxS } from "../styledComponents/AnimationComponent";
import { FormContainer } from "../styledComponents/Form";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { buyNow } = useSelector((state) => state.orderState);

  const { error: orderError } = useSelector((state) => state.orderState);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const order = {
    orderItems: buyNow.quantity
      ? [
          {
            name: buyNow.product.name,
            quantity: buyNow.quantity,
            image: buyNow.product.images[0].image,
            price: buyNow.product.price,
            product: buyNow.product["_id"],
          },
        ]
      : cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if (orderError) {
      toast(orderError, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearOrderError()),
      });
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;
      const result = stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if ((await result).error) {
        toast((await result).error.message, {
          type: "error",
          position: toast.POSITION.BOTTOM_CENTER,
        });
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if ((await result).paymentIntent.status === "succeeded") {
          toast("Payment Success", {
            type: "success",
            position: toast.POSITION.BOTTOM_CENTER,
          });
          order.paymentInfo = {
            id: (await result).paymentIntent.id,
            status: (await result).paymentIntent.status,
          };
          if (buyNow.quantity) {
            dispatch(buyNowClose());
          } else {
            dispatch(orderCompleted());
          }
          dispatch(createOrder(order));
          navigate("/order/success");
        } else {
          toast("Please try again!", {
            type: "warning",
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      }
    } catch (error) {}
  };

  return (
    <div className="mt-16">
      <CheckoutSteps confirmOrder shipping payment={true} />

      <FlexCenter width="100%">
        <BoxS width="300px" mt="45px">
          <FormContainer
            onSubmit={submitHandler}
            component="form"
            p="15px"
            m="4px"
          >
            <h1>Card Info</h1>
            <div>
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                value=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                value=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                value=""
              />
            </div>

            <Button variant="contained" id="pay_btn" type="submit">
              Pay={`$${orderInfo && orderInfo.totalPrice}`}
            </Button>
          </FormContainer>
        </BoxS>
      </FlexCenter>
    </div>
  );
}
