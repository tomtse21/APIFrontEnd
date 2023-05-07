import React, { useContext } from 'react';
import Article from './Articles'
import { Button, Checkbox, Form, Input } from 'antd';
import {Link, useNavigate} from "react-router-dom";
import UserConfig from './common/user-config';
import axios from 'axios';
import { api } from './common/http-common';
import authHeader from "../services/authHeader";

const LoginPage = () => {
  const [showMessage, setShowMessage] = React.useState(false);
  const [successStr, setSuccessStr] = React.useState("");
  
  const navigate = useNavigate();


  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  const handleFormSubmit = (values: any) => {
      const _username = values.username;
      const _password = values.password;
      const postUser = {
          username: _username,
          password: _password
      }
  
     return axios.post(`${api.uri}/users/login`, postUser, {
        headers:  
            authHeader() // for auth 
        }).then((res) => {
          setShowMessage(true);
          console.log(res.data);
          if(res.status == 201){
            setSuccessStr("login successfully!")
              
            UserConfig(_username, _password);
            console.log(localStorage.getItem('atoken'))
            navigate('/memberInfo');
          }else {
            setSuccessStr("login failed, please insert corrent user information!")
          }
        });
      
  }


  return (<div>
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600,marginTop:50 }}
    initialValues={{ remember: true }}
    onFinish={(values) => handleFormSubmit(values)}
    onFinishFailed={onFinishFailed}
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

    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8}}>
    <Link to="/regAcc"> 
      <Button type="dashed" htmlType="button" >
        Create Account
      </Button>
      </Link>
    </Form.Item>
  </Form>
  </div>);


}

export default LoginPage;