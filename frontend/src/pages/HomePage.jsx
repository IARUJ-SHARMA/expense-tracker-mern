import React, { useState, useEffect } from "react";
import { Layout, Card, Statistic, Spin, message, Row, Col } from "antd";
import { API } from "../api/axiosInstance";
import Analytics from "../components/Analytics";
import Homelayout from "../layout/Homelayout";

const { Content } = Layout;

const HomePage = ({ isDarkMode, setIsDarkMode }) => {
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);

  const fetchSummaryData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || user?._id;
      if (!userId) return;

      setLoading(true);
      const res = await API.post("/transactions/get-transaction", {
        userid: userId,
        frequency: "365",
        type: "all",
      });
      setAllTransactions(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Dashboard: Error synchronizing financial data");
    }
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const totalIncome = allTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
    
  const totalExpense = allTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <Homelayout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
      <Content style={{ padding: "24px" }}>
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={8}>
            <Card bordered={false} style={{ borderLeft: "5px solid #52c41a", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <Statistic title="Total Income" value={totalIncome} precision={2} prefix="₹" valueStyle={{ color: "#52c41a" }} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} style={{ borderLeft: "5px solid #ff4d4f", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <Statistic title="Total Expenses" value={totalExpense} precision={2} prefix="₹" valueStyle={{ color: "#ff4d4f" }} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} style={{ borderLeft: "5px solid #1890ff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <Statistic title="Net Balance" value={totalIncome - totalExpense} precision={2} prefix="₹" />
            </Card>
          </Col>
        </Row>

        {loading ? (
          <div style={{ textAlign: "center", padding: "100px" }}><Spin size="large" /></div>
        ) : (
          <div style={{ background: isDarkMode ? "#1f1f1f" : "#fff", padding: "24px", borderRadius: "8px" }}>
            <Analytics allTransactions={allTransactions} />
          </div>
        )}
      </Content>
    </Homelayout>
  );
};

export default HomePage;