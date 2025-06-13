import { Fragment, useEffect, useState, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  createReview,
  getProduct,
  getProducts,
} from "../../actions/productActions";
import { clearReviewSubmitted, clearError } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import { Carousel, Modal } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { FlexCenter, FlexEvenly } from "../styledComponents/FlexBetween";
import { buyNowAction } from "../../actions/orderAction";
import Product from "./Product";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

export const CarouselReUse = memo(({ product, h, w }) => (
  <Carousel pause="hover">
    {product.images &&
      product.images.map((image) => (
        <Carousel.Item key={image._id}>
          <img
            className="carousel__imag"
            src={image.image}
            alt={product.name}
            height={h}
            width={w}
          />
        </Carousel.Item>
      ))}
  </Carousel>
));

const BasicDetails = memo(({ product }) => (
  <>
    <h3>{product.name}</h3>
    {product.ratings != 0 && (
      <>
        <Box sx={{ width: 100, display: "flex", alignItems: "center" }}>
          <Rating
            name="text-feedback"
            value={product.ratings}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <Box sx={{ ml: 2 }}>{labels[product.ratings]}</Box>
        </Box>
        <span id="noOfReviews">({product.numOfReviews} Reviews)</span>
        <Divider />
      </>
    )}

    <Box m="10px 0">
      <Typography variant="h5" sx={{ display: "inline" }}>
        ${product.price}
      </Typography>
      ({parseInt(((product.MRP - product.price) / product.MRP) * 100)}% off)
      <br />
      <span>
        M.R.P: $<s>{product.MRP}</s>
      </span>
      <br />
      <span>You save: ${parseInt(product.MRP - product.price)}</span>
    </Box>
    <p>
      Status:
      <span className={product.stock > 0 ? "greenColor" : "redColor"}>
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </span>
    </p>
    <h4 className="mt-2">Description:</h4>
    <p>{product.description}</p>
    <hr />
    <p id="product_seller mb-1">
      Sold by: <strong>{product.seller}</strong>
    </p>
  </>
));

const AddToCart = memo(
  ({ decreaseQty, quantity, increaseQty, product, clickCallBack, theme }) => (
    <>
      <FlexCenter minWidth="100px">
        <IconButton className="" onClick={decreaseQty}>
          <KeyboardDoubleArrowLeft />
        </IconButton>
        <b>{quantity}</b>
        <IconButton className="" onClick={increaseQty}>
          <KeyboardDoubleArrowRight />
        </IconButton>
      </FlexCenter>
      <Button
        type="button"
        variant="contained"
        sx={{ bgcolor: theme.palette.bg2 }}
        disabled={product.stock === 0 ? true : false}
        className="ml-4"
        onClick={clickCallBack}
      >
        Add to Cart
      </Button>
    </>
  )
);

const ModalReUse = ({
  show,
  handleClose,
  setRatingUCF,
  rating,
  reviewHandlar,
  loading,
  setCommentUCF,
  theme,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Box bgcolor={theme.palette.background.alt1}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Box component="h2">Submit Review</Box>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box>
          <Rating
            defaultValue={rating}
            precision={1}
            onClick={(e) => setRatingUCF(e.target.value)}
          />
        </Box>
        <Box
          bgcolor={
            theme.palette.theme === "light"
              ? theme.palette.primary[900]
              : theme.palette.primary[300]
          }
        >
          <TextField
            id="review"
            name="review"
            sx={{ width: "100%" }}
            label="Review"
            multiline
            rows={4}
            onChange={(e) => setCommentUCF(e.target.value)}
          />
        </Box>
        <Button
          disabled={loading}
          onClick={reviewHandlar}
          className="mt-3"
          variant="outlined"
          color="secondary"
          aria-label="Close"
        >
          Submit
        </Button>
      </Modal.Body>
    </Box>
  </Modal>
);

export default function ProductDetail() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    loading,
    product = {},
    isReviewSubmitted = false,
    error,
  } = useSelector((state) => state.productState);
  const { products = [] } = useSelector((state) => state.productsState);
  const { user } = useSelector((state) => state.authState);

  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState("");

  const handleClose = useCallback(() => setShow(false), [show]);
  const handleShow = useCallback(() => setShow(true), [show]);
  const setRatingUCF = useCallback((n) => setRating(n), [rating]);
  const setCommentUCF = useCallback((v) => setComment(v), [comment]);

  const increaseQty = () => {
    if (product.stock === 0 || quantity >= product.stock) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    if (quantity === 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const reviewHandlar = useCallback(() => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("productId", id);
    formData.append("user", user.name);
    formData.append("email", user.email);
    dispatch(createReview(formData));
  }, [rating, comment]); //can use like click variable, if the form big

  useEffect(() => {
    if (!product._id || product._id || isReviewSubmitted) {
      dispatch(getProduct(id));
    }

    if (isReviewSubmitted) {
      handleClose();
      toast("Review Submitted Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearReviewSubmitted()),
      });
    }
    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearError()),
      });
      return;
    }
  }, [id, isReviewSubmitted, error]);

  useEffect(() => {
    if (product._id) {
      dispatch(getProducts(null, null, product.category, null, null, 12));
    }
  }, [product]);

  const buyNowHandler = () => {
    dispatch(buyNowAction({ product: product, quantity: quantity }));
    navigate("/shipping");
  };

  const modelObj = {
    show,
    handleClose,
    setRatingUCF,
    rating,
    reviewHandlar,
    loading,
    setCommentUCF,
    theme,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              margin: "0 auto",
            }}
          >
            <FlexCenter>
              <Box maxWidth="350px">
                <CarouselReUse product={product} h={`350`} w={`350`} />
              </Box>
            </FlexCenter>
            <Box className=" mt-5">
              <BasicDetails product={product} />
              <hr />
              <FlexEvenly>
                <Button
                  variant="contained"
                  sx={{ bgcolor: theme.palette.bg4 }}
                  disabled={product.stock === 0 ? true : false}
                  onClick={buyNowHandler}
                >
                  Buy Now
                </Button>
                <AddToCart
                  decreaseQty={decreaseQty}
                  increaseQty={increaseQty}
                  quantity={quantity}
                  product={product}
                  theme={theme}
                  clickCallBack={() => {
                    dispatch(addCartItem(product._id, quantity));
                    toast("Cart Item Added!", {
                      type: "success",
                      position: toast.POSITION.BOTTOM_CENTER,
                    });
                  }}
                />
              </FlexEvenly>
            </Box>
          </Box>
          <Divider />
          {product.aboutThisItem && (
            <Box>
              <Typography variant="h5">About this product</Typography>
              <ul>
                {product.aboutThisItem
                  .split(".")
                  .map((v, i) =>
                    product.aboutThisItem.split(".").length != i + 1 ? (
                      <li key={i}>{v}.</li>
                    ) : (
                      ""
                    )
                  )}
              </ul>
              <Divider />
            </Box>
          )}
          <Box>
            <b>Products related to this item</b>
            <Box className="mt-2">
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="nowrap"
                height="260px"
                width="100%"
                gap="3px"
                sx={{
                  "& div": {
                    width: "105px",
                  },
                  overflowX: "scroll",
                }}
              >
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </Box>
            </Box>
          </Box>

          {user ? (
            <Button
              variant="outlined"
              color="secondary"
              className="mt-4 mb-4"
              data-toggle="modal"
              data-target="#ratingModal"
              onClick={handleShow}
            >
              Submit Your Review
            </Button>
          ) : (
            <Button variant="outlined" className="mt-5">
              <Link to="/login">Login to post Review</Link>
            </Button>
          )}
          {product.reviews && product.reviews.length > 0 ? (
            <ProductReview reviews={product.reviews} />
          ) : null}
          <div className=" mt-2 mb-5">
            <div className=" ">
              <ModalReUse {...modelObj} /> {/* Prob Plowing */}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
