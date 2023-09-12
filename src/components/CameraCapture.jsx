import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

function CameraCapture() {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [error, setError] = useState(null);
    console.log("navigator------", navigator.mediaDevices);
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
        setImageSrc(imageSrc);
    }, [webcamRef, setImageSrc]);

    return (
        <div>
            {error && <div className="error">{error}</div>}
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Capture</button>
            {imageSrc && <img src={imageSrc} alt="Captured" />}
        </div>
    );
}

export default CameraCapture;
