import Slider from "@mui/material/Slider";

const RangeSlider = ({ price, setPrice }) => (
  <>
    <h4>Price Range</h4>
    <Slider
      size="small"
      spacing={8}
      min={0}
      step={300}
      max={5000}
      getAriaLabel={() => "Temperature range"}
      value={price}
      onChange={(e, v) => setPrice(v)}
      valueLabelDisplay="auto"
      // getAriaValueText={(priceText) => console.log(priceText)} //check this
      marks={[
        {
          value: 0,
          label: "0$",
        },
        {
          value: 5000,
          label: "5000$",
        },
      ]}
    />
  </>
);
export default RangeSlider;
