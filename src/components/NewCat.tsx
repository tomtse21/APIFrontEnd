import React, { useReducer, useState } from "react";
import { Form, Input, Button, Upload, UploadProps, message, MenuProps, Space, Dropdown, Select, Modal, UploadFile, Alert } from 'antd';
import { Buffer } from 'buffer';
import axios from "axios";
import { api } from './common/http-common';
import authHeader from "../services/authHeader";
import UserConfig from "./common/user-config";
import { DownOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { INIT_STATE, formReducer } from "../reducer/formReducer";
import { ACTION_TYPE } from "../reducer/actionType";
import ColorOption from "./common/colorOption";

const { TextArea } = Input

const NewCat = () => {

  const [state, dispatch] = useReducer(formReducer, INIT_STATE);


  const handleFormSubmit =  async (values: any) => {

    dispatch({type:ACTION_TYPE.FORM_PROCESSING})

    let base64str = "";
    if(fileList.length>=1){
      await getBase64(fileList[0].originFileObj as RcFile).then(base64Image=> base64str =  base64Image);
      values.imageuri  =base64str
    }

    axios.post(`${api.uri}/cats`, values, {
      headers: 
        authHeader()
      }).then((res) => {
        if (res.status == 201) {
          console.log(res.data.msg)
          dispatch({type:ACTION_TYPE.SUBMIT_SUCCESS,payload:{msg:res.data.msg}})
        }
      }).catch(function(error) {
        console.log(error)
        dispatch({type:ACTION_TYPE.SUBMIT_FAILED, payload:{msg:error.message}})
      });

  }


  const contentRules = [
    { required: true, message: 'Please input somethings' }
  ]

  const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });



  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

  
  return (
    <div>
      {state.showMessage && (
          <Alert message={state.message} type={state.messageType}  closable />
        )}
        <p></p>
      <Form name="cat" onFinish={(values) => handleFormSubmit(values)} labelCol={{ span: 9 }} form={state.form}
        wrapperCol={{ span: 16 }}>
          <Form.Item name="name" label="Name" rules={contentRules}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" >
            <Input />
          </Form.Item>
        
          <Form.Item name="color" label="Color" >
            <ColorOption text="Select"></ColorOption>
          </Form.Item>
          <Form.Item name="foundlocation" label="Found Location">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" >
            <TextArea rows={4} />
          </Form.Item>      
          
          <Form.Item name="imageuri" label="Photo">
              <Upload
                action=""
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
          </Form.Item>
          
          
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
          
          <p></p>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>


        </Form>
    </div>
    
  )
}

export default NewCat;