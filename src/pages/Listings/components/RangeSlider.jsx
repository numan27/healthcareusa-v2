import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import { Box } from '../../../components/GenericComponents';
import styled from 'styled-components';

const SliderContainer = styled(Box)`
    width: 100%;
    // height: 50px !important;

    .MuiSlider-rail{
        color: #E4E4E4 !important;
    }
    .MuiSlider-track{
        color: #00C1B6 !important;
    }
    .MuiSlider-thumb{
        color: #00C1B6 !important;
    }
`;

function valuetext(value) {
    return `${value}`;
}

export default function RangeSlider({ defaultValue = [20, 37], min = 0, max = 100, step = 1, onChange }) {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <SliderContainer className="pt-1">
            <Slider
                getAriaLabel={() => 'Range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={min}
                max={max}
                step={step}
                getAriaValueText={valuetext}
                className='mt-2'
            />
        </SliderContainer>
    );
}
