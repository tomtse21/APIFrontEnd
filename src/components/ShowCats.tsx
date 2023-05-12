import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Affix, Button, Card, Col, Input, Modal, Row, Space, Spin } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import Icon, { DeleteOutlined, EditOutlined, GithubOutlined, HeartFilled, HeartOutlined, LoadingOutlined, MessageOutlined } from '@ant-design/icons';
import { useIsAuthenticated } from 'react-auth-kit';
import authHeader from "../services/authHeader";
import {Buffer} from 'buffer';

const Cat = () => {
  const [cats, setCats] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true);
  const [isliked, setIsLiked] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [targetUpdateCat , setTargetUpdateCat] = React.useState({})
  const [filteredData, setFilteredData] = React.useState<any[]>([]);
  const [error, setError] = React.useState("");
  const [input, setInput] = React.useState("");
  const [b64, setb64] = React.useState("");

  var unkown = "Unkown";
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        console.log(res.data[0].imageuri['data'], 'base64')
        setb64(Buffer.from(res.data[0].imageuri['data']).toString('base64'))
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

  const onClickUpdate=(obj:any)=>{
    setTargetUpdateCat(obj)
    showModal()
  }

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
                <Card style={{paddingLeft: 15, paddingRight: 15}} title={`Name :`+currElement.name} cover={<img  src='' />}>
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
                      {isAuthenticated()?<EditOutlined onClick={()=> onClickUpdate(currElement)}/>:null}
                      <GithubOutlined onClick={()=> onClickDelete(currElement.id)}/>
                  </Space>
                   
                </Card>
              </Col>
            ))
          }
        </Row>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            
        </Modal>
        </>
        
      )
    }
  }

 
}

export default Cat;