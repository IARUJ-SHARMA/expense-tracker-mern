import React from "react";
import { Spin } from "antd";

const Spinner = () => {
  return (
    <div 
      className="spinner-wrapper" 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.5)", // Dim the background
        zIndex: 9999, // Ensure it's on top of everything
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default Spinner;