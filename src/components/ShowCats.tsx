import React from 'react';
import { Link } from 'react-router-dom';
import { Affix, Button, Card, Col, Input, Row, Space, Spin } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import Icon, { DeleteOutlined, GithubOutlined, HeartFilled, HeartOutlined, LoadingOutlined, MessageOutlined } from '@ant-design/icons';


const Cat = () => {
  const [cats, setCats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [isliked, setIsLiked] = React.useState(false);
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);

  
  React.useEffect(() => {
    axios.get(`${api.uri}/cats`)
      .then((res) => {
        setCats(res.data);
      })
      .then(() => {
        setLoading(false);
      })
  }, []);

  function onClick(id: any, isliked: boolean) {
    alert(isliked)
   React.useEffect(()=>{
    setIsLiked(!isliked);
   });
  }

  function onClickDelete(id: any) {
      alert(id);
  }

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
    return (
    <Spin indicator={antIcon} />);
  } else {
    if (!cats) {
      return (<div>There is no Cat now.</div>)
    } else {
      return (
        <>
            <Affix offsetTop={15} onChange={(affixed) => console.log(affixed)}>
                <Row style={{justifyContent:'right'}} ><Search placeholder="input search text" onSearch={onSearch} style={{ width: '200px' }} /></Row>
            </Affix>
            
            <p></p>
            <Row gutter={[8, 8]}>
          
          {
            cats && cats.map(({ id, name, desc }) => (
              <Col xs={24} sm={18} md={18} xl={24} key={id}>
                <Card style={{paddingLeft: 15, paddingRight: 15}} title={`Name :`+name} cover={<img alt="example" src="https://cdn2.thecatapi.com/images/8ru.jpg" />}>
                  <p>Description: {desc}</p>
                  <p></p>
                  {/* <Link to={`/a/${id}`}>Details</Link> */}
                  <p></p>
                  
                  <Space size='small'>
                      {
                        isliked? <HeartFilled onClick={()=> onClick(id,false)} /> 
                        :<HeartOutlined onClick={()=> onClick(id, true)}/>
                      }
                      <MessageOutlined onClick={()=> onClickDelete(id)}/>
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