import React from "react";
import { Form, Input, Button } from 'antd';
import { Buffer } from 'buffer';
import axios from "axios";
import { api } from './common/http-common';
import authHeader from "../services/authHeader";
import UserConfig from "./common/user-config";

const { TextArea } = Input

const NewCat = () => {


  const handleFormSubmit = (values: any) => {
    const _name = values.name;
    const _description = values.description;
    const postCat = {
      name: _name,
      description: _description
    }

    // Post request
    axios.post(`${api.uri}/cats`, postCat, {
      headers: 
        authHeader()
    }).then((res) => {
      console.log(res.data);
    });

  }

  const contentRules = [
    { required: true, message: 'Please input somethings' }
  ]

  return (
    <Form name="article" onFinish={(values) => handleFormSubmit(values)}>
      <Form.Item name="name" label="Name" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>

    </Form>
  )
}

export default NewCat;