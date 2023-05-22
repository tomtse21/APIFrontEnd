import React, { useContext } from 'react';
import { Alert, Button, Col, Form, Input, Row } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import UserConfig from './common/user-config';
import axios from 'axios';
import { api } from './common/http-common';
import authHeader from "../services/authHeader";
import { useSignIn } from 'react-auth-kit';

const LoginPage = () => {
  const [showMessage, setShowMessage] = React.useState(false);
  const [successStr, setSuccessStr] = React.useState("");
  const [loginSuccess, setLoginSuccess] = React.useState(false);

  const signIn = useSignIn();

  const navigate = useNavigate();
  const handleFormSubmit = (values: any) => {
    const _username = values.username;
    const _password = values.password;
    const postUser = {
      username: _username,
      password: _password
    }

    return axios.post(`${api.uri}/users/login`, postUser).then((res) => {
      if (res.status == 200) {
        localStorage.setItem("userType", res.data[0].usertype)
        setSuccessStr("login successfully!")
        setLoginSuccess(true);
        UserConfig(_username, _password);

        signIn({
          token: localStorage.getItem('atoken') as string,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: _username }
        });

        navigate("/");
      }
    }).catch(function (error) {
      setShowMessage(true);
      setSuccessStr("login failed, please insert corrent user information!")
    });

  }


  return (<div>

    {showMessage && (
      <Alert style={{ marginBottom: 15 }} message={successStr} type={loginSuccess ? "success" : "error"} closable />

    )}

    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      style={{ maxWidth: 600, justifyContent: 'left' }}
      initialValues={{ remember: true }}
      onFinish={(values) => handleFormSubmit(values)}
      autoComplete="on"
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
                Create Account
              </Button>
            </Link>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Link to="/forgetPwd">
              <Button type="dashed" htmlType="button" >
                Forget password
              </Button>
            </Link>
          </Form.Item>
        </Col>
      </Row>



    </Form>
  </div>);


}

export default LoginPage;

