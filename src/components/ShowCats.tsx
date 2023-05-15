import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Affix, Alert, Button, Card, Col, Form, Input, Modal, Row, Select, Space, Spin, Upload } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import Icon, { DeleteOutlined, EditOutlined, GithubOutlined, HeartFilled, HeartOutlined, LoadingOutlined, MessageOutlined } from '@ant-design/icons';
import { useIsAuthenticated } from 'react-auth-kit';
import authHeader from "../services/authHeader";
import {Buffer} from 'buffer';
import TextArea from 'antd/es/input/TextArea';
import { RcFile } from 'antd/es/upload';
import ColorOption from './common/colorOption';

const Cat = () => {
  const [cats, setCats] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true);
  const [isliked, setIsLiked] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  // const [targetUpdateCat , setTargetUpdateCat] = React.useState({})
  const [filteredData, setFilteredData] = React.useState<any[]>([]);
  const [lastTimeData, setLastTimeData] = React.useState<any[]>([]);
  const [error, setError] = React.useState("");
  const [b64, setb64] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  const [successStr, setSuccessStr] = React.useState("");
  const [statusSuccess, setStatusSuccess] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(false)
  const [ form ] = Form.useForm()
  const isAuthenticated = useIsAuthenticated()
  const  unkown = "Unkown";

  const contentRules = [
    { required: true, message: 'Please input somethings' }
  ]

  const [q, setQ] = React.useState("");
  const [searchParam] = React.useState(["name", "color"]);
  const [filterParam, setFilterParam] = React.useState("All");


  function search(items:any) {
    return items.filter((item:any) => {
        if (item.color == filterParam) {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        } else if (filterParam === "All") {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        }
    });
}



  React.useEffect(() => {
    initPageGetData();
  }, []);


  const showModal = () => {
    setShowMessage(false);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { Search } = Input;
  
  // Call api

  function initPageGetData(){
    axios.get(`${api.uri}/cats`)
    .then((res) => {
      if(res.data.length>=1){
        setCats(res.data);
        setFilteredData(res.data)
        // console.log(res.data[0].imageuri['data'], 'base64')
        // setb64(Buffer.from(res.data[0].imageuri['data']).toString('base64'))
      }
      
    })
    .then(() => {
      setLoading(false);
    })
  }

  function onClick(id: any, isliked: boolean) {
    alert(isliked)
   React.useEffect(()=>{
    setIsLiked(!isliked);
   });
  }

  const onClickDelete = useCallback((id: any) =>{
    
    axios.delete(`${api.uri}/cats/${id}`,{ headers: 
      authHeader()})
    .then((res) => {

      if(res.status==201){
        cats.filter(item=>item.id !=id );
        setCats(cats)
        setLoading(true)
        initPageGetData();
      }
    })
    .then(() => {
      setLoading(false);
    })
  },[]);
  
  const onClickUpdate=(obj:any,id: any)=>{
    form.setFieldsValue(obj)
    showModal()
  }

  const handleFormSubmit =  async (values: any) => {
    axios.put(`${api.uri}/cats/${values.id}`, values, {
      headers: 
        authHeader()
      }).then((res) => {
        setShowMessage(true);
        if (res.status == 201) {
          setStatusSuccess(true);
          setSuccessStr("Create successfully!")
          initPageGetData();
        }
      }).catch(function(error) {
        setShowMessage(true);
        setSuccessStr("login failed, please insert corrent user information!")
      });

  }


  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
    return (
    <Spin indicator={antIcon} />);
  } else {
    if (filteredData.length==0) {
      return (<div>There is no Cat now.</div>)
    } else {
      return (
        <>
            <Affix offsetTop={15} >
                <Row style={{justifyContent:'right',width:'100%'}} >
                  <Col>
                  <Select style={{width:100}} onChange={(e) => {
                                setFilterParam(e);
                            }}>
                    <Select.Option value="All">All</Select.Option>
                    <Select.Option value="Red">Red</Select.Option>
                    <Select.Option value="Orange">Orange</Select.Option>
                    <Select.Option value="Yellow">Yellow</Select.Option>
                    <Select.Option value="White">White</Select.Option>
                    <Select.Option value="Black">Black</Select.Option>
                    <Select.Option value="Grey">Grey</Select.Option>
                    <Select.Option value="Brown">Brown</Select.Option>
                </Select>
           
                  </Col>
                  <Col>
                    <Search placeholder="input search text" onChange={(e) => setQ(e.target.value)} style={{ width: '200px' }} />
                  </Col>
               
                </Row>
            </Affix>
            <p></p>

          <Row gutter={[24, 24]}>

          {
            filteredData && search(filteredData)!.map((currElement:any) => (

              <Col xs={24} sm={18} md={12} lg={6} xl={6} key={currElement.id}>
                <Card  style={{height:350}}  title={`Name :`+currElement.name} cover={<img  src='' />}>
                  <p>Age: {currElement.age?currElement.age:unkown}</p>
                  <p>Color: {currElement.color?currElement.color:unkown}</p>
                  <p>Description: {currElement.description?currElement.description:unkown}</p>
                  <p>Found location: {currElement.foundlocation?currElement.foundlocation:unkown}</p>
                  <p></p>
                  {/* <Link to={`/a/${id}`}>Details</Link> */}
                  <p></p>
                  <img src={`data:image/png;base64,`+b64} alt="" />
                  <Space size='small'>
                      {
                        isliked? <HeartFilled onClick={()=> onClick(currElement.id,false)} /> 
                        :<HeartOutlined onClick={()=> onClick(currElement.id, true)}/>
                      }
                      <MessageOutlined />
                      {isAuthenticated()?<EditOutlined onClick={()=> onClickUpdate(currElement,currElement.id)}/>:null}
                      <GithubOutlined onClick={()=> onClickDelete(currElement.id)}/>
                  </Space>
                   
                </Card>
              </Col>
            ))
          }
        </Row>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  footer={[]} >
          {showMessage && (
              <Alert message={successStr} type={statusSuccess ? "success" : "error"} closable />
          )}
            <p></p>
          <Form name="article" onFinish={(values) => handleFormSubmit(values)} labelCol={{ span: 9 }} form={form}
            wrapperCol={{ span: 16 }} >
              <Form.Item name="id" hidden >
                <Input />
              </Form.Item>
              <Form.Item name="name" label="Name" rules={contentRules}>
                <Input />
              </Form.Item>
              <Form.Item name="age" label="Age" >
                <Input />
              </Form.Item>
            
              <Form.Item label={"Filter"} name="color">
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
              
              <p></p>
              <Form.Item  className="align-right">
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>


            </Form>
        </Modal>
        </>
        
      )
    }
  }

 
}

export default Cat;