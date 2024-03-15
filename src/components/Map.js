import React from "react";

const Map = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    return (
        <div className="google-map-code">
            <iframe
                title="google-map"
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Space+Needle,Seattle+WA`}
                maxWidth="100%"
                maxHeight="auto"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
            />
        </div>
    );
};

export default Map;