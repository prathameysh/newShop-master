const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");

export const FlexBetweenStart = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
export const FlexBetweenEnd = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

export const FlexAround = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});
export const FlexAroundStart = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start",
});
export const FlexStart = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
});

export const FlexEvenly = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});
export const FlexEvenlyStart = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "flex-start",
});

export const FlexCenter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const FlexCenterStart = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
});
export const FlexCenterEnd = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
});

export default FlexBetween;
