import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Affix, Alert, Button, Card, Col, Form, Input, Modal, Row, Select, Space, Spin, Upload } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import Icon, { DeleteOutlined, EditOutlined, GithubOutlined, HeartFilled, HeartOutlined, LoadingOutlined, MessageOutlined } from '@ant-design/icons';
import { useIsAuthenticated } from 'react-auth-kit';
import authHeader from "../services/authHeader";
import TextArea from 'antd/es/input/TextArea';

const Cat = () => {
  const [cats, setCats] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true);
  const [isliked, setIsLiked] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState<any[]>([]);
  const [input, setInput] = React.useState("");

  var unkown = "Unkown";


  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  const handleFilter = (e:any) => {
    const searchInput = e.target.value;
    setInput(searchInput);
    const newFilterName  = cats.filter((value) => {
      return       value.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    if (searchInput === "") {
      setFilteredData(cats);
    } else {
      setFilteredData(newFilterName);
    }
  };
  
  

  const isAuthenticated = useIsAuthenticated()
  
  React.useEffect(() => {
    initPageGetData();
  }, []);

  function initPageGetData(){
    axios.get(`${api.uri}/cats`)
    .then((res) => {
      if(res.data.length>=1){
        setCats(res.data);
        setFilteredData(res.data)
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
        console.log(id)
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


  const contentRules = [
    { required: true, message: 'Please input somethings' }
  ]

  
  const handleFormSubmit =  async (values: any, id:any) => {
    console.log(values)
    axios.put(`${api.uri}/cats/${id}`, values, {
      headers: 
        authHeader()
      }).then((res) => {
        if (res.status == 201) {
          alert(res.data['msg'])
          initPageGetData();
        }
      }).catch(function(error) {
      });

  }
  const [form] = Form.useForm();
  function DataModal(dataToPassIn: any, id:any) {
    form.setFieldsValue({
      name: dataToPassIn.name,
      age: dataToPassIn.age,
      color: dataToPassIn.color,
      foundlocation: dataToPassIn.foundlocation,
      description: dataToPassIn.description
   });

    Modal.info({
      title: 'Edit cat information',
      content: (
        <div className="modal_data_wrapper">

          <Form form = {form} name="article" onFinish={(values) => handleFormSubmit(values, id)} labelCol={{ span: 9 }}
        wrapperCol={{ span: 16 }}>
            <Form.Item name="name" label="Name" rules={contentRules}>
              <Input />
            </Form.Item>
            <Form.Item name="age" label="Age" >
              <Input />
            </Form.Item>
          
            <Form.Item label="Select" name="color">
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
              <Input  />
            </Form.Item>
            <Form.Item name="description" label="Description" >
              <TextArea rows={4} />
            </Form.Item>      
                       
            <p></p>
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>


        </Form>
        </div>
      ),
    })
  };

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
    return (
    <Spin indicator={antIcon} />);
  } else {
    if (cats.length==0) {
      return (<div>There is no Cat now.</div>)
    } else {
      return (
        <>
            <Affix offsetTop={15} >
                <Row style={{justifyContent:'right'}} ><Search placeholder="input search text" onChange={(e) => handleFilter(e)} onSearch={onSearch} style={{ width: '200px' }} /></Row>
            </Affix>
            
            <p></p>
            <Row gutter={[8, 8]}>

          {
            filteredData && filteredData!.map((currElement,index) => (
              <Col xs={24} sm={18} md={12} xl={6} key={currElement.id}>
                <Card style={{paddingLeft: 15, paddingRight: 15}} title={`Name :`+currElement.name} cover={<img  src={''} />}>
                  <p>{currElement.id}</p>
                  <p>Age: {currElement.age?currElement.age:unkown}</p>
                  <p>Color: {currElement.color?currElement.color:unkown}</p>
                  <p>Description: {currElement.description?currElement.description:unkown}</p>
                  <p>Found location: {currElement.foundlocation?currElement.foundlocation:unkown}</p>
                  {/* <Link to={`/a/${id}`}>Details</Link> */}
                  <p></p>
                  
                  <Space size='small'>
                      {
                        isliked? <HeartFilled onClick={()=> onClick(currElement.id,false)} /> 
                        :<HeartOutlined onClick={()=> onClick(currElement.id, true)}/>
                      }
                      <MessageOutlined />
                      {isAuthenticated()?<EditOutlined onClick={()=> DataModal(currElement,currElement.id)}/>:null}
                      <GithubOutlined onClick={()=> onClickDelete(currElement.id)}/>
                  </Space>
                   
                </Card>
              </Col>
            ))
          }
        </Row>
        </>
      )
    }
  }

 
}

export default Cat;