import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import {
  red,
  orange,
  pink,
  black,
  yellow,
  lime,
  green,
  blue,
  lightBlue,
  purple,
} from "./theme";

let redC = Object.entries(red);
let orangeC = Object.entries(orange);
let pinkC = Object.entries(pink);
let blackC = Object.entries(black);
let yellowC = Object.entries(yellow);
let limeC = Object.entries(lime);
let greenC = Object.entries(green);
let blueC = Object.entries(blue);
let lightBlueC = Object.entries(lightBlue);
let purpleC = Object.entries(purple);

let colorArray = [
  yellowC,
  limeC,
  greenC,
  orangeC,
  redC,
  pinkC,
  purpleC,
  blueC,
  lightBlueC,
  blackC,
];
const No = () => {
  let theme = useTheme();
  console.log(theme.btn1v1);
  return (
    <div>
      <Box display="flex">
        {colorArray.map((v, i) => (
          <Box key={i}>
            {v.map((v, i) => (
              <Box key={i} width="80px" height="60px" bgcolor={v[1]}>
                {v[0]}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Box mt="100px" display="flex" justifyContent="space-between">
        <Button sx={{ bgcolor: theme.palette.bg1 }}></Button>
        <Button sx={{ bgcolor: theme.palette.bg2 }}></Button>
        <Button sx={{ bgcolor: theme.palette.bg3 }}></Button>
        <Button sx={{ bgcolor: theme.palette.bg4 }}></Button>
        <Button sx={{ bgcolor: theme.palette.bg5 }}></Button>
      </Box>
    </div>
  );
};

export default No;
