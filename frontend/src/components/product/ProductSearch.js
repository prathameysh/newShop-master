import { toast } from "react-toastify";
import MetaData from ".././layouts/MetaData";
import Loader from ".././layouts/Loader";
import { Fragment, useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RangeSlider from "./Slider";
import { getProducts } from "../../actions/productActions";
import Product from ".././product/Product";
import { Pagination } from "@mui/material";
import {
  Box,
  Button,
  Divider,
  Rating,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import { FilterAltTwoTone } from "@mui/icons-material";
import FlexBetween, { FlexCenter } from "../styledComponents/FlexBetween";

const categories = [
  "Electronics",
  "Mobile Phones",
  "Laptops",
  "Accessories",
  "Headphones",
  "Food",
  "Books",
  "Clothes",
  "Shoes",
  "Misc",
  "Beauty/Health",
  "Sports",
  "Outdoor",
  "Home",
];

const CategoriesFilter = memo(({ setCategory }) => (
  <>
    <h4 className="ml-5">Categories</h4>
    <Box
      sx={{
        maxWidth: "200px",
        "&>li": { cursor: "pointer" },
      }}
      component="ul"
    >
      {categories.map((category, i) => (
        <li key={i} onClick={() => setCategory(category)}>
          {category}
        </li>
      ))}
    </Box>
  </>
));

const RatingFilter = memo(({ setRating }) => (
  <>
    <Box ml="5px" component="h4">
      Ratings
    </Box>
    <Box
      sx={{
        maxWidth: "200px",
        "&>li": { cursor: "pointer" },
      }}
      component="ul"
    >
      {[5, 4, 3, 2, 1].map((star, i) => (
        <li key={i} onClick={() => setRating(star)}>
          <Rating
            name="half-rating-read"
            defaultValue={star}
            precision={1}
            readOnly
          />
        </li>
      ))}
    </Box>
  </>
));

export const Sidebar = ({
  setRating,
  setCategory,
  price,
  setPrice,
  bgColor,
  setPriceChanged,
}) => {
  return (
    <>
      <Box width="100%" bgcolor={bgColor}>
        <Box onMouseUp={() => setPriceChanged(price)} maxWidth="190px" m="10px">
          <RangeSlider price={price} setPrice={setPrice} />
        </Box>
      </Box>
      <Divider />
      <div>
        <CategoriesFilter setCategory={setCategory} />
      </div>
      <Divider />
      <div>
        <RatingFilter setRating={setRating} />
      </div>
    </>
  );
};

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { keyword } = useParams();
  const large = useMediaQuery("(min-width:900px)");

  const { products, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 5000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);
  const [filter, setFilter] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setFilter(open);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProducts(keyword, priceChanged, category, rating, currentPage));
  }, [error, currentPage, keyword, priceChanged, category, rating]);

  const sidebarProps = {
    setRating: setRating,
    setCategory: setCategory,
    price: price,
    setPrice: setPrice,
    bgColor: palette.background.alt,
    setPriceChanged: setPriceChanged,
  };

  return (
    <>
      <MetaData title={"Buy Best Products"} />
      <FlexBetween width="100%">
        <Box textAlign="center" component="h4">
          Search Products
        </Box>
        {!large && (
          <Button
            onClick={(e) => setFilter((v) => (v ? false : true))}
            endIcon={<FilterAltTwoTone />}
            variant="outlined"
            color="secondary"
          >
            Filter
          </Button>
        )}
      </FlexBetween>
      <section id="products">
        <Stack direction="row">
          <SwipeableDrawer
            anchor="right"
            open={filter}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            sx={{
              width: { xs: "280px", sm: "350px" },
              "& .MuiDrawer-paper": {
                color: palette.secondary[200],
                backgroundColor: palette.background.alt,
                boxSizing: "border-box",
                borderWidth: "2px",
                width: { xs: "280px", sm: "350px" },
              },
            }}
          >
            <Sidebar {...sidebarProps} />
          </SwipeableDrawer>

          {large && (
            <Box flex="0.25" height="100%">
              <Box>
                <Sidebar {...sidebarProps} />
              </Box>
            </Box>
          )}
          {!products ? (
            <Loader />
          ) : (
            <Box flex={large ? "0.75" : "1"}>
              <Box className="products">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </Box>
              {productsCount > resPerPage ? (
                <FlexCenter className=" mt-5">
                  <Pagination
                    onChange={(e, p) => setCurrentPage(p)}
                    page={currentPage}
                    count={Math.ceil(productsCount / resPerPage)}
                    showFirstButton={true}
                    showLastButton={true}
                    shape="rounded"
                  />
                </FlexCenter>
              ) : null}
            </Box>
          )}
        </Stack>
      </section>
    </>
  );
}
