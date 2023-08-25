import React from 'react';
import './ImageWithText.css'; // Import your CSS file

const ImageWithText = ({ image }) => {
    return (
        <div className="image-container ">
            <img src={image} alt="Image" />
            <div className="overlay">Survey Form</div>
        </div>
    );
};

export default ImageWithText;