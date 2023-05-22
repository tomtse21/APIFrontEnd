import axios from "axios";
import React, { useCallback, useReducer, useState } from "react";
import { api } from "./common/http-common";
import { EditOutlined, GithubOutlined, LoadingOutlined, MessageOutlined } from "@ant-design/icons";
import { Spin, Affix, Row, Col, Select, Card, Modal, Alert, Form, Input, Button, Table, Popconfirm, Divider } from "antd";
import form from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import search from "antd/es/transfer/search";
import { Search } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import authHeader from "../services/authHeader";

interface IData {
  id: string;
  cats_id: string;
  name: string;
  email: string;
  message: String;
  reply_content: String;
}

const AdminMessageBoard = () => {
  const [messages, setMessages] = React.useState<IData[]>([])
  const [loading, setLoading] = React.useState(true);
  const [selectedMessage, setSelectedMessage] = React.useState<IData>();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form] = Form.useForm()
  const [showMessage, setShowMessage] = React.useState(false);
  const [successStr, setSuccessStr] = React.useState("");
  const [statusSuccess, setStatusSuccess] = React.useState(false);
  const [columns, setColumns] = useState([
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cat Id',
      dataIndex: 'cats_id',
      key: 'cats_id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Reply Content',
      dataIndex: 'reply_content',
      key: 'replyContent',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: IData) => (
        <>
          <Button onClick={() => handleReplyMsg(record)}>Reply</Button>
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record)}
          >
            <Button>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ]);


  function initPageGetData() {
    axios.get(`${api.uri}/messages`)
      .then((res) => {
        if (res.data.length >= 1) {
          setMessages(res.data);
        }
      })
      .then(() => {
        setLoading(false);
      })
  }

  React.useEffect(() => {
    initPageGetData();
  }, []);

  const handleDelete = useCallback((record: IData) => {
    axios.delete(`${api.uri}/messages/${record.id}`, {
      headers:
        authHeader()
    })
      .then((res) => {
        if (res.status == 201) {
          initPageGetData();
        }
      })
  }, []);


  const handleReplyMsg = (record: any) => {
    form.setFieldsValue(record)
    showModal();
  }

  const showModal = () => {
    setShowMessage(false);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (values: any) => {

    axios.post(`${api.uri}/messages/send-mail`, values, {
      headers:
        authHeader()
    }).then((res) => {
      setShowMessage(true);
      if (res.status == 201) {
        setStatusSuccess(true);
        setSuccessStr(`Send to ${values.name} successfully!`)
        initPageGetData();
      }
    }).catch(function (error) {
      setShowMessage(true);
      setSuccessStr("Please insert corrent user information!")
    });

  }


  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
    return (
      <Spin indicator={antIcon} />);
  } else {

    return (
      <>
        <p></p>
        <Table columns={columns} dataSource={messages} rowKey={(record) => record.id} />
        <Modal title="Send message to charities" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
          <Row>
            {showMessage && (
              <Alert message={successStr} type={statusSuccess ? "success" : "error"} closable />

            )}
            <Divider></Divider>
            <Form
              name="messageBoard"
              style={{ width: '100%' }}
              initialValues={{ remember: true }}
              onFinish={(values) => handleFormSubmit(values)}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input disabled />
              </Form.Item>


              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: 'Please input your message!' }]}
              >
                <TextArea disabled rows={10} />
              </Form.Item>

              <Form.Item
                label="Reply Content"
                name="reply_content"
                rules={[{ required: true, message: 'Please input your message!' }]}
              >
                <TextArea rows={10} />
              </Form.Item>

              <Row>
                <Col>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>




            </Form>
          </Row>
        </Modal>
      </>

    )

  }
}


export default AdminMessageBoard;