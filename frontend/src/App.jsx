import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ConfigProvider, theme } from "antd"; 
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TransactionsPage from "./pages/TransactionsPage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("expense-tracker-theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("expense-tracker-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1890ff",
        },
      }}
    >
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/transactions" 
          element={
            <ProtectedRoute>
              <TransactionsPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
      </Routes>
    </ConfigProvider>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export function PublicRoute(props) {
  if (localStorage.getItem("user")) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
}

export default App;