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
import storage from "./common/firebaseConfig";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const { TextArea } = Input

const NewCat = () => {


  function genRandonString(length: any) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_&';
    var charLength = chars.length;
    var result = '';
    for (var i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }


  const [state, dispatch] = useReducer(formReducer, INIT_STATE);
  // State to store uploaded file
  const [file, setFile] = useState("");

  // progress
  const [percent, setPercent] = useState(0);

  const [fileUrl, setFileUrl] = useState('');
  // Handle file upload event and update state
  function handleFileChange(event: any) {
    setFile(event.target.files[0]);
  }


  const handleUpload = () => {
    if (!fileList) {
      alert("Please upload an image first!");
    }
    const storageRef = ref(storage, `/files/${fileList[0].fileName}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, fileList[0].originFileObj as RcFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFileUrl(url)
        });
      }
    );
  };

  const handleFormSubmit = async (values: any) => {
    dispatch({ type: ACTION_TYPE.FORM_PROCESSING })

    if (fileList.length >= 1) {
      fileList[0].fileName = genRandonString(12) + Number(new Date());
      handleUpload()
      values.imageuri = fileList[0].fileName
    }


    axios.post(`${api.uri}/cats`, values, {
      headers:
        authHeader()
    }).then((res) => {
      if (res.status == 201) {


        dispatch({ type: ACTION_TYPE.SUBMIT_SUCCESS, payload: { msg: res.data.msg } })
      }
    }).catch(function (error) {
      dispatch({ type: ACTION_TYPE.SUBMIT_FAILED, payload: { msg: error.message } })
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
    <div style={{ float: 'left' }} >
      {percent == 100 && state.showMessage && (
        <Alert style={{ marginBottom: 15 }} message={state.message} type={state.messageType} closable />
      )}
      <Form name="cat" onFinish={(values) => handleFormSubmit(values)} labelCol={{ span: 9 }} form={state.form}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, justifyContent: 'left' }}>
        <Form.Item name="name" label="Name" rules={contentRules}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Age" >
          <Input />
        </Form.Item>

        <Form.Item name="color" label="Color" >
          <Select >
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

        <Form.Item>
          {/* <button onClick={handleUpload}>Upload to Firebase</button> */}
          <p>{percent} "% done"</p>
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