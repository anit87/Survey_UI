import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function FileUpload(props) {
    // const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileChange = (event) => {
    //     console.log("1111111111111");
    //     const file = event.target.files[0];
    //     props.setSelectedFile(file);
    // };

    return (
        <div className='mt-2' >
            <Input
                type="file"
                onChange={(e)=>props.handleFileChange(e)}
                style={{ display: 'none' }}
                inputProps={{ accept: '.pdf, .doc, .docx, .png, .jpg' }}
                id="file-upload"
            />
            <label htmlFor="file-upload">
                <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                >
                    Upload
                </Button>
            </label>
            <div>
                {props.selectedFile && <p>{props.selectedFile.name}</p>}
            </div>
        </div>
    );
}

export default FileUpload;
