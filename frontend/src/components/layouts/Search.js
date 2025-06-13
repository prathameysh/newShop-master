import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IconButton, InputBase, useTheme, Box } from "@mui/material";
import { Search as Ser } from "@mui/icons-material";
import FlexBetween from "../styledComponents/FlexBetween";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const theme = useTheme();
  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };

  const clearKeyword = () => {
    setKeyword("");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      clearKeyword();
    }
  }, [location]);

  return (
    <FlexBetween
      component="form"
      onSubmit={searchHandler}
      backgroundColor={theme.palette.background.default}
      borderRadius="9px"
      gap="3rem"
      p="0.1rem 1.5rem"
    >
      <InputBase
        placeholder="Enter Product Name ..."
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        sx={{ flexGrow: "1" }}
      />
      <Box  onClick={searchHandler} color="secondary">
        <Ser  />
      </Box>
    </FlexBetween>
  );
}
