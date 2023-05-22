import axios from "axios";
import React, { useReducer, useState } from "react";
import { api } from "./common/http-common";
import { EditOutlined, GithubOutlined, LoadingOutlined, MessageOutlined } from "@ant-design/icons";
import { Spin, Affix, Row, Col, Select, Card, Modal, Alert, Form, Input, Button, Avatar, Divider } from "antd";
import form from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import search from "antd/es/transfer/search";
import { Search } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import authHeader from "../services/authHeader";


interface CatInfo {
  catId: number;
  catImage: string;
}


const MessageBoard: React.FC<CatInfo> = ({ catId, catImage }) => {

  const [showMessage, setShowMessage] = React.useState(false);
  const [successStr, setSuccessStr] = React.useState("");
  const [loginSuccess, setLoginSuccess] = React.useState(false);

  const handleFormSubmit = (values: any) => {

    values.cats_id = catId;

    return axios.post(`${api.uri}/messages`, values, {
      //   headers:  
      //       authHeader() // for auth 
    }).then((res) => {
      setShowMessage(true);
      if (res.status == 201) {
        setLoginSuccess(true);
        setSuccessStr("Send message successfully!")

      }
    }).catch(function (error) {
      setShowMessage(true);
      setSuccessStr("Failed")
    });

  }


  return (
    <>
      {showMessage && (
        <Alert message={successStr} type={loginSuccess ? "success" : "error"} closable />

      )}
      <div style={{ width: "100%" }}>
        <Row>
          {catImage ? <Avatar style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }} size={200} shape="circle" src={`https://firebasestorage.googleapis.com/v0/b/apiproject-1786e.appspot.com/o/files%2F${catImage}?alt=media`} /> : ''}
        </Row>
        <Row>
          <Divider></Divider>
          <Form
            name="messageBoard"
            style={{ width: '100%' }}
            initialValues={{ remember: true }}
            onFinish={(values) => handleFormSubmit(values)}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>


            <Form.Item
              label="Message"
              name="message"
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
      </div>


    </>
  )
}


export default MessageBoard;