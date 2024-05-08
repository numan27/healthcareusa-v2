import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import { Box } from '../../../components/GenericComponents';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    rail: {
        color: '#E4E4E4',
    },
    track: {
        color: '#00C1B6',
        height: '4px'
    },
    thumb: {
        color: '#fff',
        width: '16px',
        height: '16px',
        border: '3.5px solid #00C1B6',
        boxShadow: 'none',
        outline: 'none',
        '&:hover, &.Mui-focusVisible': {
            boxShadow: '0px 0px 0px 8px rgba(0, 193, 182, 0.16)',
        },
    },
    tooltip: {
        backgroundColor: '#00C1B6',
        color: '#fff',
    },
    valueLabel: {
        backgroundColor: 'transparent',
        border: '1px solid #E4E4E4',
        borderRadius: '32px',
        color: '#000000',
        fontSize: '12px',
        fontWeight: '400',
        position: 'absolute',
        top: '-30px !important'
    },

});

export default function RangeSlider({ defaultValue = [20, 37], min = 0, max = 100, step = 1, onChange }) {
    const [value, setValue] = useState(defaultValue);
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <Box width="100%" className="d-flex align-items-end pt-3 position-relative">
            <Slider
                getAriaLabel={() => 'Range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
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
            {/* <span className='MuiSlider-valueLabelLabel'><TbLocationDiscount /></span> */}

        </Box>
    );
}
