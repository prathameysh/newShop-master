import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React from "react";
import { FlexCenter } from "../styledComponents/FlexBetween";

const DataGridCustomToolbar = ({ color }) => {
  return (
    <GridToolbarContainer>
      <FlexCenter
        width="100%"
        sx={{
          "& button": {
            color: color,
          },
        }}
      >
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarFilterButton />
      </FlexCenter>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
