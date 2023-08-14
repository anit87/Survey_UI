// import React, { useState } from 'react'
// import { TextField, FormControl, FormLabel, IconButton } from "@mui/material"
// import InfoIcon from '@mui/icons-material/Info';
// import { useField } from "formik"
// import Popper from './Popper';

// const TextInput = ({ label, title, ...props }) => {
//     const [field, meta] = useField(props);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [helperTextInfo, setHelperText] = useState('');

//     const handleHelperIconClick = (event, text) => {
//         setAnchorEl(event.currentTarget);
//         setHelperText(text);
//     };

//     const handlePopperClose = () => {
//         setAnchorEl(null);
//     };

//     const open = Boolean(anchorEl);

//     return (
//         <>
//             <TextField
//                 margin="normal"
//                 fullWidth
//                 size="small"
//                 InputLabelProps={{
//                     sx: { fontSize: '.8rem' }
//                 }}
//                 label={label}
//                 variant="outlined"
//                 title={title}
//                 InputProps={{
//                     endAdornment: (
//                         !title
//                             ? null
//                             : <IconButton
//                                 size="small"
//                                 aria-label="helper"
//                                 onClick={(event) =>
//                                     handleHelperIconClick(event, title)
//                                 }
//                             >
//                                 <InfoIcon fontSize="small" />
//                             </IconButton>
//                     ),
//                 }}
//                 error={Boolean(meta.touched && meta.error)}
//                 helperText={Boolean(meta.touched && meta.error) ? meta.error : `   `}
//                 {...field} {...props}

//             />
//             <Popper
//                 open={open} anchorEl={anchorEl} helperText={helperTextInfo} handlePopperClose={handlePopperClose}
//             />
//         </>
//     );
// }

// export default TextInput
