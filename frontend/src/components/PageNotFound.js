import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { FlexCenter } from "./styledComponents/FlexBetween";

const PageNotFound = () => {
  const { pathname } = useLocation();
  return (
    <FlexCenter width="100vw" textAlign="center" fontSize="140%" height="40vh">
      <Box maxWidth="60vw">
        <Box fontSize="300%">404</Box>
        <div>Sorry, we couldn't find the page!</div>
        <div>
          If you haven't entered this page "{`${pathname}`}" manually, we
          probably haven't fully developed it yet. Sorry for the inconvenience,
          try again later.
        </div>
      </Box>
    </FlexCenter>
  );
};

export default PageNotFound;
