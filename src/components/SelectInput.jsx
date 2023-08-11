import React, { useState } from 'react';
import { TextField, MenuItem, IconButton, FormControl, FormLabel } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useField } from "formik"
import Popper from './Popper';

export default function SelectTextFields({ id, label, title, options, ...props }) {
    const [field, meta] = useField(props);

    const [anchorEl, setAnchorEl] = useState(null);
    const [helperTextInfo, setHelperText] = useState('');

    const handleHelperIconClick = (event, text) => {
        setAnchorEl(event.currentTarget);
        setHelperText(text);
    };

    const handlePopperClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            {/* <FormControl fullWidth>
             <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>  */}
            <TextField
                margin="normal"
                id={id}
                select
                fullWidth
                size="small"
                InputLabelProps={{
                    style: { fontSize: '.8rem', mt: 5 } // Change the font size here
                }}
                label={label}
                title={title}
                defaultValue={null}
                // variant="standard"
                variant="outlined"
                error={Boolean(meta.touched && meta.error)}
                helperText={Boolean(meta.touched && meta.error) ? meta.error : `   `}
                InputProps={{
                    endAdornment: (
                        !title
                            ? null
                            : <IconButton
                                size="small"
                                aria-label="helper"
                                onClick={(event) =>
                                    handleHelperIconClick(event, title)
                                }
                                sx={{ pr: 1 }}
                            >
                                <InfoIcon fontSize="small" />
                            </IconButton>
                    ),
                }}
                {...field} {...props}
            >
                {
                    options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </TextField>
            <Popper
                open={open} anchorEl={anchorEl} helperText={helperTextInfo} handlePopperClose={handlePopperClose}
            />

        </>

    );
}   