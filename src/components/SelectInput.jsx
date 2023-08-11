import * as React from 'react';
import { TextField, MenuItem, FormControl, FormLabel } from '@mui/material';
import { useField } from "formik"


export default function SelectTextFields({ id, label, title, options, ...props }) {
    const [field, meta] = useField(props);
    // console.log("select ", field ," ** ",meta);

    return (
        // <FormControl fullWidth>
        //     {/* <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel> */}
        <TextField
            id={id}
            select
            fullWidth
            size="small"
            InputLabelProps={{
                style: { fontSize: '.8rem' } // Change the font size here
            }}
            label={label}
            title={title}
            defaultValue={null}
            variant="standard"
            error={Boolean(meta.touched && meta.error)}
            helperText={Boolean(meta.touched && meta.error) ? meta.error : `   `}
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
    );
}   