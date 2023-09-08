import React, { useState } from 'react';
import Input from '@mui/material/Input';

function FileUpload(props) {
    const handleChildInputChange = (event) => {
        props.onInputChange(event, props.index);
    };

    return (
        <div className='mt-2' >
            <Input
                type="file"
                onChange={handleChildInputChange}
                inputProps={{ accept: '.pdf, .doc, .docx, .png, .jpg' }}
                id="file-upload"
                name={props.name}
            />
        </div>
    );
}

export default FileUpload;