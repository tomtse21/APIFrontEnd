import React from 'react';
import Article from './Articles'
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import {Link} from "react-router-dom";
import axios from 'axios';
import { api } from './common/http-common';
import authHeader from "../services/authHeader";
import UserConfig from './common/user-config';
import * as userService  from '../services/userService';


const RegAcc = () => {

  const [showMessage, setShowMessage] = React.useState(false);
  const [successStr, setSuccessStr] = React.useState("");

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
            if(res.status == 201){
              setSuccessStr("Create successfully!")
            }else {
              setSuccessStr("Create failed, please insert corrent user information!")
            }
          });
        
    }

  return (<div>
    {showMessage && (
        <Alert message={successStr} type="success" closable  />
    )}
    
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
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>
    

    
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>

  </Form>
  </div>);


}

export default RegAcc;