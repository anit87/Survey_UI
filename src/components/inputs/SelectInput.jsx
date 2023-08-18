import React, { useState } from 'react';
import { TextField, MenuItem, IconButton, FormControl, FormLabel, InputLabel, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useField } from "formik"
import Popper from '../Popper';
const labelStyles = {
    // padding: '10px',
    // position: "absolute",
    // marginTop: '-29px',
    // marginLeft: '-9px'
    alignItems: "start",
    position: "absolute",
    fontWeight: "600",
    padding: "-7px 13px",
    marginTop: "-14px"
}

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
            {/* <div className="mb-3">
                <FormLabel style={labelStyles}>{label}</FormLabel>  */}
            <FormControl fullWidth>
                {/* <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel> */}
                <Typography variant="subtitle1" gutterBottom>{label}</Typography>
                <TextField
                    margin="normal"
                    id={id}
                    select
                    fullWidth
                    size="small"
                    InputLabelProps={{
                        style: { fontSize: '.8rem', mt: 5 }
                    }}
                    label=""
                    // label={label}
                    title={title}
                    defaultValue={null}
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
            </FormControl>

        </>

    );
}   