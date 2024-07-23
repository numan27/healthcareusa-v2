/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Box } from "../../../components/GenericComponents";
import { makeStyles } from "@mui/styles";
import { FaLocationArrow } from "react-icons/fa";

const useStyles = makeStyles({
  rail: {
    color: "#E4E4E4",
  },
  track: {
    color: "#00C1B6",
    height: "4px",
  },
  thumb: {
    color: "#fff",
    width: "16px",
    height: "16px",
    border: "3.5px solid #00C1B6",
    boxShadow: "none",
    outline: "none",
    "&:hover, &.Mui-focusVisible": {
      boxShadow: "0px 0px 0px 8px rgba(0, 193, 182, 0.16)",
      color: "#fff",
    },
  },
  tooltip: {
    backgroundColor: "#00C1B6",
    color: "#fff",
  },
  valueLabel: {
    backgroundColor: "transparent",
    border: "1px solid #E4E4E4",
    borderRadius: "32px",
    color: "#000000",
    fontSize: "12px",
    fontWeight: "400",
    width: "40px",
    padding: "4px 8px",
    position: "absolute",
    top: "-30px !important",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  valueLabelCircle: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
});

function ValueLabelComponent(props) {
  const { children, value } = props;
  const classes = useStyles();

  return (
    <span className={`${props.className} ${classes.valueLabelCircle}`}>
      <FaLocationArrow size={10} />
      <span>{value} mi</span>
      {children}
    </span>
  );
}

export default function RangeSlider({
  defaultValue = 20,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}) {
  const [value, setValue] = useState(defaultValue);
  const classes = useStyles();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box width="100%" className="d-flex align-items-end pt-3 position-relative">
      <Slider
        getAriaLabel={() => "Radius"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        ValueLabelComponent={ValueLabelComponent}
        min={min}
        max={max}
        step={step}
        classes={{
          rail: classes.rail,
          track: classes.track,
          thumb: classes.thumb,
          tooltip: classes.tooltip,
          valueLabel: classes.valueLabel,
        }}
      />
    </Box>
  );
}
