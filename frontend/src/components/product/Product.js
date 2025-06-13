import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Typography, useTheme } from "@mui/material";
import { FlexCenterStart } from "../styledComponents/FlexBetween";

export default function Product({ product }) {
  let { palette } = useTheme();
  return (
    <Box border="1px solid gray" height="100%" className={`product p-2`}>
      <div>
        <Link to={`/product/${product._id}`} className="product__link">
          <img
            className="product__image"
            src={product.images[0].image}
            alt={product.name}
            width="100"
            height="100"
          />
        </Link>
        <FlexCenterStart flexDirection="column">
          <Link to={`/product/${product._id}`}>
            <Typography
              variant="h5"
              sx={{ "&:hover": { color: palette.bg3 } }}
              className="truncated-text"
            >
              {product.name}
            </Typography>
          </Link>
          {product.ratings != 0 && (
            <div>
              <Box
                sx={{
                  width: 100,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="text-feedback"
                  value={product.ratings}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </Box>
              <span id="noOfReviews">({product.numOfReviews} Reviews)</span>
            </div>
          )}
          <p>
            <Typography variant="h5" component="b">
              ${product.price}
            </Typography>
            ({parseInt(((product.MRP - product.price) / product.MRP) * 100)}%
            off)
            <br />
            <span>
              M.R.P: $<s>{product.MRP}</s>
            </span>
          </p>
        </FlexCenterStart>
      </div>
    </Box>
  );
}
