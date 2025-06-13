import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../slices/cartSlice";
import CheckoutSteps from "./CheckoutSteps";
import { toast } from "react-toastify";
import { Button, MenuItem, TextField } from "@mui/material";
import { BoxS } from "../styledComponents/AnimationComponent";
import { FlexCenter } from "../styledComponents/FlexBetween";
import { FormContainer } from "../styledComponents/Form";
import { buyNowClose } from "../../slices/orderSlice";

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    toast.error("please fill the shipping information", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    navigate("/shipping");
  }
};

export default function Shipping() {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);
  const { buyNow } = useSelector((state) => state.orderState);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.country);

  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ address, city, phoneNo, postalCode, country, state })
    );
    if (buyNow.quantity) {
      navigate("/order/confirm/buyNow");
    } else {
      navigate("/order/confirm");
    }
  };

  // useEffect(() => {
  //   return () => dispatch(buyNowClose());
  // });

  return (
    <Fragment>
      <CheckoutSteps shipping />
      <FlexCenter width="100%">
        <BoxS mt="45px">
          <FormContainer
            onSubmit={submitHandler}
            component="form"
            p="15px"
            m="4px"
          >
            <h1 className="mb-6">Shipping Info</h1>
            <div className="mb-3">
              <TextField
                sx={{ width: "100%" }}
                name="address"
                label="Address"
                variant="standard"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div>
              <TextField
                sx={{ width: "100%" }}
                name="city"
                label="City"
                variant="standard"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <TextField
                sx={{ width: "100%" }}
                name="phoneNo"
                label="Phone No"
                type="number"
                variant="standard"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <TextField
                sx={{ width: "100%" }}
                type="number"
                name="postalCode"
                label="Postal Code"
                variant="standard"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <TextField
                sx={{ width: "100%" }}
                select
                label="Country"
                helperText="Please select your Country"
                variant="standard"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countryList.map((option, i) => (
                  <MenuItem key={i} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="mb-3">
              <label htmlFor="State_field"></label>
              <TextField
                sx={{ width: "100%" }}
                name="state"
                label="State"
                variant="standard"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            <Button variant="contained" type="submit" className="mt-4">
              CONTINUE
            </Button>
          </FormContainer>
        </BoxS>
      </FlexCenter>
    </Fragment>
  );
}
