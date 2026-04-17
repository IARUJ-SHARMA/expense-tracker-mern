import React from "react";
import { Card, Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../api/axiosInstance";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      
      const res = await API.post("/users/login", values);

      if (res.data.success || res.data.message === "Login Success") {
        message.success("Login Successful! 🚀");
        
        
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Login Failed. Check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Image (Hidden on mobile) */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-50">
        <img
          src="/exp-img.jpg"
          alt="Bank"
          className="w-4/5 object-contain"
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-6 bg-white">
        <Card className="w-full max-w-sm shadow-xl border-none">
          <h2 className="font-bold text-[#FF735C] text-2xl text-center mb-6">
            Track Your Expense
          </h2>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input placeholder="email@example.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password placeholder="********" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#FF735C] hover:bg-[#ff8a7a] border-none h-10 font-bold"
              >
                Login
              </Button>
            </Form.Item>

            <div className="text-center">
              <span>Don't have an account? </span>
              <Link to="/signup" className="text-[#FF735C] font-semibold">
                Sign Up
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;