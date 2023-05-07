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
    const t = values.title;
    const c = values.context;
    console.log(values, t, c);
    const postArticle = {
      title: t,
      allText: c,
      authorID: 1
    }

    // Post request
    axios.post(`${api.uri}/articles`, postArticle, {
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
      <Form.Item name="title" label="Title" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="context" label="Context" rules={contentRules}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>

    </Form>
  )
}

export default NewCat;