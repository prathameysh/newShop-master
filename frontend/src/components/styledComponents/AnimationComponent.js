import { Box } from "@mui/material";
import { full2Animation } from "./animation";

const { default: styled } = require("@emotion/styled");

//give 3 width&height
export const BorderFlow = styled(Box)(({ theme: { palette }, color }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  borderRadius: "8px",
  "&::before": {
    content: "''",
    position: "absolute",
    top: "-50%",
    left: "-50%",
    zIndex: "-1",
    transformOrigin: "bottom right",
    background: `linear-gradient(0deg,transparent,transparent,${palette.bg2},${palette.bg2},${palette.bg2})`,
    animation: `${full2Animation(
      "transform:rotate(0deg);",
      "transform:rotate(360deg);"
    )} 6s linear infinite`,
  },
  "&::after": {
    content: "''",
    position: "absolute",
    top: "-50%",
    left: "-50%",
    zIndex: "-1",
    background: `linear-gradient(0deg,transparent,transparent,${palette.bg4},${palette.bg4},${palette.bg4})`,
    animation: `${full2Animation(
      "transform:rotate(0deg);",
      "transform:rotate(360deg);"
    )} 6s linear infinite`,
    animationDelay: "-3s",
    transformOrigin: "bottom right",
  },
}));

// give height&width & .spanA
export const BorderFlowBySpan = styled(Box)(({ theme: { palette } }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  borderRadius: "8px",
  "& .spanA:nth-of-type(1)": {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "3px",
    background: `linear-gradient(to right,transparent,${palette.bg4})`,
    animation: `${full2Animation(
      "transform:translateX(-100%);",
      "transform:translateX(100%);"
    )} 2s linear infinite`,
  },
  "& .spanA:nth-of-type(2)": {
    position: "absolute",
    top: "0",
    right: "0",
    width: "3px",
    height: "100%",
    background: `linear-gradient(to bottom,transparent,${palette.bg4})`,
    animation: `${full2Animation(
      "transform:translateY(-100%);",
      "transform:translateY(100%);"
    )} 2s linear infinite`,
    animationDelay: "1s",
  },
  "& .spanA:nth-of-type(3)": {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "3px",
    background: `linear-gradient(to left,transparent,${palette.bg2})`,
    animation: `${full2Animation(
      "transform:translateX(100%);",
      "transform:translateX(-100%);"
    )} 2s linear infinite`,
    animationDelay: "2s",
  },
  "& .spanA:nth-of-type(4)": {
    position: "absolute",
    left: "0",
    top: "0",
    width: "3px",
    height: "100%",
    background: `linear-gradient(to top,transparent,${palette.bg2})`,
    animation: `${full2Animation(
      "transform:translateY(100%);",
      "transform:translateY(-100%);"
    )} 2s linear infinite`,
    animationDelay: "3s",
  },
}));
export const Spans = () => (
  <>
    <span className="spanA"></span>
    <span className="spanA"></span>
    <span className="spanA"></span>
    <span className="spanA"></span>
  </>
);

export const BoxS = styled(Box)(({ theme: { palette } }) => ({
  position: "relative",
  background: "black",
  "&::before": {
    content: "''",
    position: "absolute",
    inset: "-3px",
    background: `linear-gradient(45deg,${palette.bg2},black,black,${palette.bg4})`,
    boxShadow: "0 0 0 20px black",
    zIndex: "-1",
  },
  "&::after": {
    content: "''",
    position: "absolute",
    inset: "-3px",
    background: `linear-gradient(45deg,${palette.bg2},black,black,${palette.bg4})`,
    filter: "blur(20px)",
    zIndex: "-1",
  },
}));
