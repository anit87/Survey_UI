import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@mui/material';

function CameraCapture(props) {
    const webcamRef = useRef(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const checkCameraAvailability = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (webcamRef.current) {
                    webcamRef.current.srcObject = stream;
                }
            } catch (err) {
                setError('Camera not found or permission denied.');
            }
        };

        checkCameraAvailability();
    }, []);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        props.setcapturedFile(imageSrc);
    }, [webcamRef]);

    return (
        <div>
            {error && <div className="error">{error}</div>}
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <Button type="button" onClick={capture}>Capture</Button>
            
        </div>
    );
}

export default CameraCapture;
