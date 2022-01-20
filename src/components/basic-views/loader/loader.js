import React from 'react';
import './loader.css';

// Horizontally centered loading animation
const Loader = () => (
  <div style={{width: "80px", marginLeft: "auto", marginRight: "auto"}}>
    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
);

export default Loader;
