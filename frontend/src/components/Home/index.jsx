import React, { useState, useEffect } from "react";
import { Modal, Button, message, Table } from "antd";
import ExpenseForm from "../ExpenseForm"; 
import API from "../../api/axiosInstance";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      setLoading(true);
      
      const res = await API.post("/transactions/get-transaction", {
        userid: user._id,
        frequency: "365", 
        type: "all"
      });
      
      setAllTransactions(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Fetch Issue: Check if Backend/DB is running");
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  
  const columns = [
    { title: "Date", dataIndex: "date", key: "date", render: (text) => <span>{text.split('T')[0]}</span> },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Reference", dataIndex: "reference", key: "reference" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-[#FF735C]">Expense Tracker</h1>
        <Button 
          type="primary" 
          className="bg-[#FF735C] border-none font-bold"
          onClick={() => setShowModal(true)}
        >
          + Add New Transaction
        </Button>
      </div>

      {/* DASHBOARD CARDS (The ones from your photo!) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">Total Transactions</p>
          <h2 className="text-2xl font-bold">{allTransactions.length}</h2>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow text-center border-l-4 border-green-500">
          <p className="text-green-600">Active Status</p>
          <h2 className="text-2xl font-bold">Cloud Connected</h2>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg shadow text-center border-l-4 border-orange-500">
          <p className="text-orange-600">Database</p>
          <h2 className="text-2xl font-bold text-sm">MongoDB Atlas Live</h2>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white p-4 rounded-lg shadow">
        <Table 
          columns={columns} 
          dataSource={allTransactions} 
          loading={loading}
          rowKey="_id"
        />
      </div>

      {/* THE MODAL (Uses your ExpenseForm.jsx) */}
      <Modal
        title="Add New Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
        centered
      >
        <ExpenseForm 
          setShowModal={setShowModal} 
          getAllTransactions={getAllTransactions} 
        />
      </Modal>
    </div>
  );
};

export default Home;