import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useField } from "formik"

export default function RadioButtons({ label, options, ...props }) {
    const [field, meta] = useField(props);
    // console.log("ch ",meta);

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
            <RadioGroup row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={options[0].value}
                {...field} {...props}
            >
                {
                    options.map(option => <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />)
                }
            </RadioGroup>
        </FormControl>
    );
} 