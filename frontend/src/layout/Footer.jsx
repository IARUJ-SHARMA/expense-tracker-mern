import React from "react";
import { Layout } from "antd";
import { GithubOutlined, LinkedinOutlined, GlobalOutlined } from "@ant-design/icons";

const { Footer: AntFooter } = Layout;

const Footer = ({ isDarkMode }) => {
  return (
    <AntFooter style={{ 
      textAlign: "center", 
      padding: "24px 50px",
      background: isDarkMode ? "#001529" : "#ffffff", 
      color: isDarkMode ? "#ffffff" : "#555555",
      transition: "all 0.3s ease",
      borderTop: isDarkMode ? "1px solid #303030" : "1px solid #f0f0f0",
      marginTop: "auto"
    }}>
      
      <div style={{ marginBottom: "12px" }}>
        <b style={{ color: isDarkMode ? "#ffffff" : "#1890ff", fontSize: "16px" }}>
          Expense Tracker
        </b> 
        <span style={{ margin: "0 8px", opacity: 0.5 }}>|</span> 
        Full-Stack Financial Management System
      </div>

      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "24px", 
        fontSize: "22px", 
        marginBottom: "16px" 
      }}>
        <a 
          href="https://github.com/your-username" 
          target="_blank" 
          rel="noreferrer" 
          style={{ color: isDarkMode ? "#ffffff" : "#000000" }}
        >
          <GithubOutlined />
        </a>
        <a 
          href="https://linkedin.com/in/your-profile" 
          target="_blank" 
          rel="noreferrer" 
          style={{ color: "#0a66c2" }}
        >
          <LinkedinOutlined />
        </a>
        <a 
          href="#" 
          style={{ color: isDarkMode ? "#ffffff" : "#555555" }}
        >
          <GlobalOutlined />
        </a>
      </div>

      <div style={{ fontSize: "13px", fontWeight: 500 }}>
        Developed by <span style={{ color: isDarkMode ? "#1890ff" : "#003a8c" }}>ARUJ</span> | © 2026
      </div>
      
      <div style={{ 
        marginTop: "12px", 
        fontSize: "11px", 
        letterSpacing: "1.5px", 
        fontWeight: 600,
        opacity: 0.6 
      }}>
        MERN STACK • ANTD • REDUX • JWT • BCRYPT
      </div>
    </AntFooter>
  );
};

export default Footer;