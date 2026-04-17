import React, { useState } from "react";
import { Layout, Menu, Button, Switch, Avatar, Dropdown, Space } from "antd";
import {
  DashboardOutlined,
  TransactionOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";

const { Header, Sider, Content } = Layout;

const Homelayout = ({ children, isDarkMode, setIsDarkMode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/"),
    },
    {
      key: "/transactions",
      icon: <TransactionOutlined />,
      label: "Transactions",
      onClick: () => navigate("/transactions"),
    },
  ];

  const userSettingsMenu = {
    items: [
      {
        key: "logout",
        label: "Logout",
        icon: <LogoutOutlined />,
        danger: true,
        onClick: handleLogout,
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={isDarkMode ? "dark" : "light"}
        style={{
          boxShadow: "2px 0 8px 0 rgba(29,35,41,.05)",
          position: "sticky",
          top: 0,
          left: 0,
          height: "100vh",
        }}
      >
        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#1890ff",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {collapsed ? "ET" : "EXPENSE TRACKER"}
        </div>
        <Menu
          theme={isDarkMode ? "dark" : "light"}
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>

      <Layout style={{ display: "flex", flexDirection: "column" }}>
        <Header
          style={{
            padding: "0 24px",
            background: isDarkMode ? "#001529" : "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 1px 4px rgba(0,21,41,.08)",
            zIndex: 1,
            position: "sticky",
            top: 0,
            width: "100%",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64, color: isDarkMode ? "#fff" : "#000" }}
          />

          <Space size={24}>
            <Switch
              checked={isDarkMode}
              onChange={(checked) => setIsDarkMode(checked)}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
            <Dropdown menu={userSettingsMenu} placement="bottomRight">
              <Space style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} src={user?.avatar} />
                <span style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
                  {user?.name || "Operative"}
                </span>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            flex: 1,
            background: isDarkMode ? "#141414" : "#ffffff",
            borderRadius: "8px",
            transition: "all 0.3s ease",
          }}
        >
          {children}
        </Content>
        <Footer isDarkMode={isDarkMode} />
      </Layout>
    </Layout>
  );
};

export default Homelayout;