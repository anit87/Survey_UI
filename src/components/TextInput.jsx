import React from 'react'
import { TextField, FormControl, FormLabel } from "@mui/material"
import { useField } from "formik"

const TextInput = ({ label, title, ...props }) => {
    const [field, meta] = useField(props);

    return (

        <TextField
            margin="normal"
            fullWidth
            size="small"
            InputLabelProps={{
                style: { fontSize: '.8rem' } // Change the font size here
            }}
            label={label}
            variant="outlined"
            title={title}
            InputProps={{
                autoComplete: 'off',
            }}
            error={Boolean(meta.touched && meta.error)}
            helperText={Boolean(meta.touched && meta.error) ? meta.error : `   `}
            {...field} {...props}
        />
    );
}

export default TextInput
