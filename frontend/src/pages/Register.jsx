import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Layout, Typography } from "antd";
import { UserOutlined, LockOutlined, IdcardOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../api/axiosInstance";
import Spinner from "../components/spinner";
import embeddedGraphic from "../assets/login-infographic.png";

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await API.post("/users/register", values);
      setLoading(false);
      
      message.success("Registration successful. Proceed to login.");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Registration failed. Verify inputs.");
    }
  };

  const styles = {
    mainLayout: {
      minHeight: "100vh",
      background: "#000a12", 
    },
    integratedVisual: {
      background: `#001529`, 
      backgroundImage: `url(${embeddedGraphic})`,
      backgroundSize: "cover",
      backgroundPosition: "center", 
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    formOverlay: {
      width: "100%",
      maxWidth: "420px",
      background: "rgba(255, 255, 255, 0.04)", 
      padding: "40px",
      borderRadius: "16px",
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
      border: "1px solid rgba(24, 144, 255, 0.2)", 
    },
    inputField: {
      background: "rgba(0, 0, 0, 0.2)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.1)",
    },
  };

  return (
    <Layout style={styles.mainLayout}>
      {loading && <Spinner />}
      
      <div style={styles.integratedVisual}>
        <div style={styles.formOverlay}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <Title level={2} style={{ color: "#ffffff", margin: 0 }}>
              Enlistment Terminal
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.65)" }}>
              Expense Tracker | Create Operative Profile
            </Text>
          </div>

          <Form
            layout="vertical"
            onFinish={submitHandler}
            requiredMark={false}
          >
            <Form.Item 
              label={<span style={{ color: "#e6f7ff" }}>Operative Name</span>} 
              name="name" 
              rules={[{ required: true, message: 'Name designation required' }]}
            >
              <Input 
                prefix={<IdcardOutlined style={{ color: "#1890ff" }} />} 
                placeholder="Enter full name" 
                size="large"
                style={styles.inputField} 
              />
            </Form.Item>

            <Form.Item 
              label={<span style={{ color: "#e6f7ff" }}>Service Email</span>} 
              name="email" 
              rules={[{ required: true, type: 'email', message: 'Valid email required' }]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: "#1890ff" }} />} 
                placeholder="Enter email address" 
                size="large"
                style={styles.inputField} 
              />
            </Form.Item>

            <Form.Item 
              label={<span style={{ color: "#e6f7ff" }}>Access Cipher</span>} 
              name="password" 
              rules={[{ required: true, message: 'Secure cipher required' }]}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: "#1890ff" }} />} 
                placeholder="Create password" 
                size="large"
                style={styles.inputField} 
              />
            </Form.Item>

            <Form.Item style={{ marginTop: "30px", marginBottom: "15px" }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<UserAddOutlined />}
                size="large"
                style={{ width: "100%", borderRadius: "8px" }}
              >
                Register Profile
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Text style={{ color: "rgba(255,255,255,0.65)" }}>
                Already registered? <Link to="/login" style={{ color: "#1890ff", fontWeight: 500 }}>Access Terminal Here</Link>
              </Text>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;