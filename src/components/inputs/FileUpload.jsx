import React, { useState } from 'react';
import Input from '@mui/material/Input';

function FileUpload(props) {
    const handleChildInputChange = (event) => {
        props.onInputChange(event, props.index);
    };

    return (
        <div className='mt-2' >
            {/* <Input
                type="file"
                onChange={handleChildInputChange}
                inputProps={{ accept: '.pdf, .doc, .docx, .png, .jpg' }}
                id="file-upload"
                name={props.name}
            /> */}
            
            <input
                style={{ color: "transparent" }}
                type="file"
                onChange={handleChildInputChange}
                id='file-upload'
                name={props.name}
                accept='.pdf, .doc, .docx, .png, .jpeg, .jpg'
            />
        </div>
    );
}

export default FileUpload;