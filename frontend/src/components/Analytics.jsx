import React from "react";
import { Progress, Card, Row, Col } from "antd";

const Analytics = ({ allTransactions }) => {
  // 📈 Basic Calculations
  const totalTransactions = allTransactions.length;
  const totalIncomeTransactions = allTransactions.filter(t => t.type === "income");
  const totalExpenseTransactions = allTransactions.filter(t => t.type === "expense");
  
  const totalIncomePercent = (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpensePercent = (totalExpenseTransactions.length / totalTransactions) * 100;

  // 💰 Turnover Calculations
  const totalTurnover = allTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalIncomeTurnover = allTransactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpenseTurnover = allTransactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

  const categories = ["salary", "food", "rent", "medical", "bills"];

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[20, 20]}>
        {/* 📊 Transaction Count Card */}
        <Col span={12}>
          <Card title="Total Transactions" bordered={false} className="shadow-sm">
            <h5>Total: {totalTransactions}</h5>
            <h6 className="text-success">Income: {totalIncomeTransactions.length}</h6>
            <h6 className="text-danger">Expense: {totalExpenseTransactions.length}</h6>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
              <Progress type="circle" strokeColor={"#52c41a"} percent={totalIncomePercent.toFixed(0)} />
              <Progress type="circle" strokeColor={"#ff4d4f"} percent={totalExpensePercent.toFixed(0)} />
            </div>
          </Card>
        </Col>

        {/* 💸 Total Turnover Card */}
        <Col span={12}>
          <Card title="Total Turnover" bordered={false} className="shadow-sm">
            <h5>Total: ₹{totalTurnover}</h5>
            <h6 className="text-success">Income: ₹{totalIncomeTurnover}</h6>
            <h6 className="text-danger">Expense: ₹{totalExpenseTurnover}</h6>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
              <Progress type="circle" strokeColor={"#52c41a"} percent={totalIncomeTurnoverPercent.toFixed(0)} />
              <Progress type="circle" strokeColor={"#ff4d4f"} percent={totalExpenseTurnoverPercent.toFixed(0)} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 📁 Category-wise Progress */}
      <Row gutter={[20, 20]} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="Category-wise Expenses">
            {categories.map((category) => {
              const amount = allTransactions
                .filter((t) => t.type === "expense" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div key={category} style={{ marginBottom: '15px' }}>
                    <h6 style={{ textTransform: 'capitalize' }}>{category}</h6>
                    <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} status="active" strokeColor="#1890ff" />
                  </div>
                )
              );
            })}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;