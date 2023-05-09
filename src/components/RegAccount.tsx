import React from 'react';
import Article from './Articles'
import { Alert, Button, Col, Form, Input, Row } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { api } from './common/http-common';
import authHeader from "../services/authHeader";
import UserConfig from './common/user-config';
import * as userService from '../services/userService';


const RegAcc = () => {

  const [showMessage, setShowMessage] = React.useState(false);
  const [successStr, setSuccessStr] = React.useState("");
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (values: any) => {
    const _username = values.username;
    const _password = values.password;
    const _email = values.email;
    const postUser = {
      username: _username,
      password: _password,
      email: _email
    }

    return axios.post(`${api.uri}/users`, postUser, {
      // headers:  
      //     authHeader() // for auth 
    }).then((res) => {
      setShowMessage(true);
      if (res.status == 201) {
        setLoginSuccess(true);
        setSuccessStr("Create successfully!")

      }
    }).catch(function(error) {
      setShowMessage(true);
      setSuccessStr("login failed, please insert corrent user information!")
    });

  }

  return (<div>

    {showMessage && (
      <Alert message={successStr} type={loginSuccess ? "success" : "error"} closable />

    )}
    <p></p>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={(values) => handleFormSubmit(values)}
      autoComplete="off"
    >

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>



      <Row>
        <Col>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Link to="/regAcc">
              <Button type="dashed" htmlType="button" >
                Create 
              </Button>
            </Link>
          </Form.Item>
        </Col>
      </Row>




    </Form>
  </div>);


}

export default RegAcc;