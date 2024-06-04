import React from 'react';

const LoginIcon = ({ color = "#06312E", flipHorizontal = false }) => {
    const flipTransform = flipHorizontal ? "scale(-1, 1)" : "";
    return (
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: flipTransform }}>
            <path d="M8.33301 3L7.78087 3.19487C5.6319 3.95333 4.55741 4.33256 3.94521 5.19785C3.33301 6.06313 3.33301 7.20258 3.33301 9.48147V11.5185C3.33301 13.7974 3.33301 14.9369 3.94521 15.8022C4.55741 16.6674 5.6319 17.0467 7.78087 17.8051L8.33301 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8.33301 10.4993L16.6663 10.4993M8.33301 10.4993C8.33301 9.91583 9.99493 8.82562 10.4163 8.41602M8.33301 10.4993C8.33301 11.0829 9.99493 12.1731 10.4163 12.5827" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default LoginIcon;
