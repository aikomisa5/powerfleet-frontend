// src/components/HeaderBanner.jsx
import React from 'react';
import banner from '../assets/header.png'; // adjust path if needed
import "../header.css"; // We'll define styles here

const HeaderBanner = () => {
  return (
    <header className="header-banner">
      <img
        src={banner}
        alt="PowerFleet Banner"
        style={{
          width: '100%',
          maxHeight: '150px',
          objectFit: 'cover',
        }}
      />
    </header>
  );
};

export default HeaderBanner;
