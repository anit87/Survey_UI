import React, { useState } from 'react';
import Input from '@mui/material/Input';

function FileUpload(props) {

    const handleChildInputChange = (event) => {
        // console.log("inside child ", props);
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





// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import Input from '@mui/material/Input';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// function FileUpload(props) {
//     const handleChildInputChange = (event) => {
//         console.log("inside child ", props);
//         props.onInputChange(event,props.index);
//     };

//     return (
//         <div className='mt-2' >
//             <Input
//                 type="file"
//                 onChange={handleChildInputChange}
//                 style={{ display: 'none' }}
//                 inputProps={{ accept: '.pdf, .doc, .docx, .png, .jpg' }}
//                 id="file-upload"
//                 name= {props.name}
//             />
//             <label htmlFor="file-upload">
//                 <Button
//                     variant="contained"
//                     component="span"
//                     startIcon={<CloudUploadIcon />}
//                     onClick={() => document.getElementById("file-upload").click()}
//                 >
//                     Upload
//                 </Button>
//             </label>
//             <div>
//                 {props.selectedFile && <p>{props.selectedFile.name}</p>}
//             </div>
//         </div>
//     );
// }

// export default FileUpload;
