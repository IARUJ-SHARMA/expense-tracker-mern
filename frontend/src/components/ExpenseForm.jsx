import React from "react";
import { Form, Input, Select, Button, message } from "antd";
import { API } from "../api/axiosInstance";

const ExpenseForm = ({ setShowModal, getAllTransactions }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      if (!user) {
        return message.error("Please login again!");
      }

      const payload = { 
        ...values, 
        userid: user._id 
      };

      
      await API.post("/transactions/add-transaction", payload);
      
      message.success("Transaction Added! 💸");
      form.resetFields();
      
      if (setShowModal) setShowModal(false);
      if (getAllTransactions) getAllTransactions();
      
    } catch (error) {
      console.error(error);
      message.error("Failed to save. Check if Backend is running.");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
        <Input type="number" placeholder="Enter amount" />
      </Form.Item>

      <Form.Item label="Type" name="type" rules={[{ required: true }]}>
        <Select placeholder="Income or Expense">
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Category" name="category" rules={[{ required: true }]}>
        <Select placeholder="Select category">
          <Select.Option value="salary">Salary</Select.Option>
          <Select.Option value="food">Food</Select.Option>
          <Select.Option value="bills">Bills</Select.Option>
          <Select.Option value="entertainment">Entertainment</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Date" name="date" rules={[{ required: true }]}>
        <Input type="date" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={2} placeholder="Optional note..." />
      </Form.Item>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button onClick={() => setShowModal(false)}>Cancel</Button>
        <Button type="primary" htmlType="submit" style={{ background: "#1a1a2e" }}>
          Save Transaction
        </Button>
      </div>
    </Form>
  );
};

export default ExpenseForm;