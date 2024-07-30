/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Box } from "../../../components/GenericComponents";
import { FaLocationDot } from "react-icons/fa6";
import styled from "styled-components";
import IMAGES from "../../../assets/images";

const Tooltip = styled.div`
  background-color: transparent;
  border: 1px solid #e4e4e4;
  color: #000;
  padding: 4px 8px;
  min-width: 60px;
  height: 35px;
  border-radius: 32px;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  position: absolute;
  transform: translateX(-50%);
  top: -30px;
  left: ${(props) => props.left}%;
  z-index: 1;
  white-space: nowrap;

  &::before {
    content: "";
    position: absolute;
    bottom: -13.1px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-color: #e4e4e4 transparent transparent;
    border-style: solid;
  }
`;

const StyledSlider = styled(Slider)`
  .MuiSlider-rail {
    color: #e4e4e4 !important;
  }
  .MuiSlider-track {
    color: #00c1b6 !important;
    height: 4px;
  }
  .MuiSlider-thumb {
    color: #fff;
    width: 16px;
    height: 16px;
    border: 3.5px solid #00c1b6;
    box-shadow: none;
    outline: none;

    &:hover,
    &.Mui-focusVisible {
      box-shadow: 0px 0px 0px 8px rgba(0, 193, 182, 0.16);
      color: #00c1b6 !important;
    }
  }
  .MuiSlider-valueLabel {
    background-color: transparent;
    border: 1px solid #e4e4e4;
    border-radius: 32px;
    color: #000000;
    font-size: 12px;
    font-weight: 400;
    width: 40px;
    padding: 4px 8px;
    position: absolute;
    top: -30px !important;
    display: flex;
    align-items: center;
    gap: 4px;
    display: none;
  }
`;

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <span className="MuiSlider-valueLabel">
      <FaLocationDot size={10} />
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
  disabled = false,
}) {
  const [value, setValue] = useState(defaultValue);

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
      <StyledSlider
        getAriaLabel={() => "Radius"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        ValueLabelComponent={ValueLabelComponent}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      />
      <Tooltip left={(value / max) * 100}>
        <img src={IMAGES.MAP_PIN} alt="icon" />
        <span>{value} mi</span>
      </Tooltip>
    </Box>
  );
}
