import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Affix, Button, Card, Col, Input, Row, Space, Spin } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import Icon, { DeleteOutlined, EditOutlined, GithubOutlined, HeartFilled, HeartOutlined, LoadingOutlined, MessageOutlined } from '@ant-design/icons';
import { useIsAuthenticated } from 'react-auth-kit';
import authHeader from "../services/authHeader";

const Cat = () => {
  const [cats, setCats] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true);
  const [isliked, setIsLiked] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);

  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  const isAuthenticated = useIsAuthenticated()
  
  React.useEffect(() => {
    initPageGetData();
  }, []);

  function initPageGetData(){
    axios.get(`${api.uri}/cats`)
    .then((res) => {
      if(res.data.length>=1){
        setCats(res.data);
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

  const onClickUpdate=(id:any)=>{
    alert(id);
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
                <Row style={{justifyContent:'right'}} ><Search placeholder="input search text" onSearch={onSearch} style={{ width: '200px' }} /></Row>
            </Affix>
            
            <p></p>
            <Row gutter={[8, 8]}>
          
          {
            cats && cats!.map(({ id, name, description }) => (
              <Col xs={24} sm={18} md={12} xl={6} key={id}>
                <Card style={{paddingLeft: 15, paddingRight: 15}} title={`Name :`+name} cover={<img alt="example" src="https://cdn2.thecatapi.com/images/8ru.jpg" />}>
                  <p>Description: {description}</p>
                  <p></p>
                  {/* <Link to={`/a/${id}`}>Details</Link> */}
                  <p></p>
                  
                  <Space size='small'>
                      {
                        isliked? <HeartFilled onClick={()=> onClick(id,false)} /> 
                        :<HeartOutlined onClick={()=> onClick(id, true)}/>
                      }
                      <MessageOutlined />
                      {isAuthenticated()?<EditOutlined onClick={()=> onClickUpdate(id)}/>:null}
                      <GithubOutlined onClick={()=> onClickDelete(id)}/>
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