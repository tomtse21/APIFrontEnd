import React from "react";
import { Form, Input, Button, Upload, UploadProps, message, MenuProps, Space, Dropdown, Select } from 'antd';
import { Buffer } from 'buffer';
import axios from "axios";
import { api } from './common/http-common';
import authHeader from "../services/authHeader";
import UserConfig from "./common/user-config";
import { DownOutlined, UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input

const NewCat = () => {


  const handleFormSubmit = (values: any) => {
    console.log(values)
    const _name = values.name;
    const _description = values.description;
    const postCat = {
      name: _name,
      description: _description
    }

    // Post request
    axios.post(`${api.uri}/cats`, values, {
      headers: 
        authHeader()
    }).then((res) => {

    });

  }

  const contentRules = [
    { required: true, message: 'Please input somethings' }
  ]

  const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  
  return (
    <Form name="article" onFinish={(values) => handleFormSubmit(values)} labelCol={{ span: 9 }}
    wrapperCol={{ span: 16 }}>
      <Form.Item name="name" label="Name" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="age" label="Age" >
        <Input />
      </Form.Item>
     
      <Form.Item label="Select" name="color">
          <Select>
            <Select.Option value="Red">Red</Select.Option>
            <Select.Option value="Orange">Orange</Select.Option>
            <Select.Option value="Yellow">Yellow</Select.Option>
            <Select.Option value="White">White</Select.Option>
            <Select.Option value="Black">Black</Select.Option>
            <Select.Option value="Grey">Grey</Select.Option>
            <Select.Option value="Brown">Brown</Select.Option>
          </Select>
        </Form.Item>
        
      <Form.Item name="foundlocation" label="Found Location">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" >
        <TextArea rows={4} />
      </Form.Item>      
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <p></p>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>


    </Form>
  )
}

export default NewCat;