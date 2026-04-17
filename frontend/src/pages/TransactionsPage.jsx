import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Space, Tag } from "antd";
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined, 
  DownloadOutlined 
} from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { API } from "../api/axiosInstance";
import moment from "moment";
import Homelayout from "../layout/Homelayout";

const TransactionsPage = ({ isDarkMode, setIsDarkMode }) => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [editable, setEditable] = useState(null);

  
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");

  const fetchTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || user?._id;
      if (!userId) return;

      setLoading(true);
      const res = await API.post("/transactions/get-transaction", {
        userid: userId,
        frequency,
        type,
      });
      setAllTransactions(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Transaction synchronization failed");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [frequency, type]);

  const filteredData = allTransactions.filter((item) =>
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    (item.reference && item.reference.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || user?._id;
      setLoading(true);

      const payload = {
        ...values,
        userid: userId,
        tag: values.type === "income" ? "CR" : "DR",
      };

      if (editable) {
        await API.post("/transactions/edit-transaction", {
          payload,
          transactionId: editable._id,
        });
        message.success("Record updated successfully");
      } else {
        await API.post("/transactions/add-transaction", payload);
        message.success("New record established successfully");
      }

      setShowModal(false);
      setEditable(null);
      form.resetFields();
      fetchTransactions();
    } catch (error) {
      setLoading(false);
      message.error("Process execution failed");
    }
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await API.post("/transactions/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Record purged from database");
      fetchTransactions();
    } catch (error) {
      setLoading(false);
      message.error("Deletion failed");
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "15%",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "20%",
      render: (text, record) => (
        <span style={{ fontWeight: 600 }}>
          ₹{text.toLocaleString()} 
          <Tag color={record.tag === "CR" ? "green" : "volcano"} style={{ marginLeft: 8 }}>
            {record.tag}
          </Tag>
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "20%",
      render: (text) => <span style={{ textTransform: "capitalize" }}>{text}</span>,
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
      width: "25%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (_, record) => (
        <Space size="large">
          <EditOutlined
            style={{ color: "#1890ff", cursor: "pointer", fontSize: "16px" }}
            onClick={() => {
              setEditable(record);
              form.setFieldsValue({
                ...record,
                date: moment(record.date).format("YYYY-MM-DD"),
              });
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            style={{ color: "#ff4d4f", cursor: "pointer", fontSize: "16px" }}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Homelayout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
      {/* Professional Filter Bar */}
      <div style={{ 
        background: isDarkMode ? "#1f1f1f" : "#fff", 
        padding: "24px", 
        borderRadius: "8px", 
        marginBottom: "24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
          <Space size="large" wrap>
            <div>
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "5px" }}>Search</div>
              <Input 
                placeholder="Category or Reference" 
                prefix={<SearchOutlined />} 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                allowClear 
                style={{ width: 220 }}
              />
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "5px" }}>Frequency</div>
              <Select value={frequency} onChange={setFrequency} style={{ width: 140 }}>
                <Select.Option value="7">Last 1 Week</Select.Option>
                <Select.Option value="30">Last 1 Month</Select.Option>
                <Select.Option value="365">Last 1 Year</Select.Option>
              </Select>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#888", marginBottom: "5px" }}>Type</div>
              <Select value={type} onChange={setType} style={{ width: 100 }}>
                <Select.Option value="all">ALL</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </div>
          </Space>
          
          <Space>
            <CSVLink data={allTransactions} filename="expense-report.csv">
              <Button icon={<DownloadOutlined />} style={{ background: "#52c41a", color: "#fff", border: "none" }}>
                Export CSV
              </Button>
            </CSVLink>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => {
                setEditable(null);
                form.resetFields();
                setShowModal(true);
              }}
            >
              Add New
            </Button>
          </Space>
        </div>
      </div>

      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
        bordered
      />

      <Modal
        title={editable ? "Modify Transaction Record" : "Establish New Record"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditable(null);
        }}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="amount" label="Amount (INR)" rules={[{ required: true }]}>
            <Input type="number" placeholder="0.00" />
          </Form.Item>
          
          <Form.Item name="type" label="Entry Type" rules={[{ required: true }]}>
            <Select placeholder="Select type">
              <Select.Option value="income">Income (Credit)</Select.Option>
              <Select.Option value="expense">Expense (Debit)</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select placeholder="Select category">
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="food">Food & Dining</Select.Option>
              <Select.Option value="rent">Rent & Housing</Select.Option>
              <Select.Option value="utilities">Utilities</Select.Option>
              <Select.Option value="medical">Healthcare</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="date" label="Transaction Date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>

          <Form.Item name="reference" label="Reference Detail">
            <Input placeholder="Note or identifier" />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={{ width: "100%", height: "40px", marginTop: 16 }}>
            {editable ? "Apply Changes" : "Commit Transaction"}
          </Button>
        </Form>
      </Modal>
    </Homelayout>
  );
};

export default TransactionsPage;