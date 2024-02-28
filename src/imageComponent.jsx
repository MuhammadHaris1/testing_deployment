import React, { useState } from 'react';

const ImageWithHighlights = () => {
    const [highlights, setHighlights] = useState([]);

    const handleImageClick = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;
        const data = prompt('Enter the name of the highlight');
        // Add the new highlight coordinates to the state
        setHighlights([...highlights, { x: offsetX, y: offsetY, name: data }]);
    };
    console.log(highlights);
    return (
        <div>
            <img
                src={require("./download.jpeg")}
                alt="Your Image"
                onClick={handleImageClick}
                style={{ cursor: 'crosshair', height: 1000, width: 1000 }}
            />
            {highlights.map((highlight, index) => (
                <img title={highlight.name} src={require("./images.png")} style={{ left: highlight.x, top: highlight.y, height: '50px', width: '50px', position: 'absolute' }} />
            ))}

            
        </div>
    );
};

export default ImageWithHighlights;