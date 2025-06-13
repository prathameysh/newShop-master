import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const ProductReview = ({ reviews }) => {
  return (
    <div className="">
      <h3>All Reviews:</h3>
      <hr />
      {reviews &&
        reviews.map((review, i) => (
          <div key={i}>
            <Stack spacing={1}>
              <Rating
                defaultValue={review.rating}
                readOnly
              />
            </Stack>
            <span>by {review.user || "Not Available"}</span>
            <p>{review.comment}</p>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default ProductReview;
