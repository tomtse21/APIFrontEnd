import React from 'react';
import { Alert, Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { api } from './common/http-common';
import authHeader from "../services/authHeader";
import UserConfig from './common/user-config';


const RegAcc = () => {

  const [showMessage, setShowMessage] = React.useState(false);
  const [successStr, setSuccessStr] = React.useState("");
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const navigate = useNavigate();
  const [componentDisabled, setComponentDisabled] = React.useState<boolean>(false);

  const handleFormSubmit = (values: any) => {
    const _username = values.username;
    const _password = values.password;
    const _email = values.email;
    const postUser = {
      username: _username,
      password: _password,
      email: _email
    }
    

    return axios.post(`${api.uri}/users`, values, {
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

      <Divider />
      
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
      <div style={{ fontSize: 12 }}>* For Staff Only</div>
      </Checkbox>
      
      <Form.Item
        label="Staff Code"
        name="usertype"
        rules={[{ required: false, message: '' }]}
      >
        <Input disabled={!componentDisabled}/>
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
            <Link to="/login">
              <Button type="default" htmlType="button" >
                Back to Login
              </Button>
            </Link>
          </Form.Item>
        </Col>
      </Row>




    </Form>
  </div>);


}

export default RegAcc;