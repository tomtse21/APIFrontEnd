import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin } from 'antd';
//import articles from './articles.json';
import { api } from './common/http-common';
import axios from 'axios';
import Icon, { DeleteOutlined, HeartFilled, HeartOutlined, LoadingOutlined } from '@ant-design/icons';

import styles from './ShowCats.css';

const Article = () => {
  const [articles, setArticles] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [isliked, setIsLiked] = React.useState(false);


  React.useEffect(() => {
    axios.get(`${api.uri}/articles`)
      .then((res) => {
        setArticles(res.data);
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
    return (<Spin indicator={antIcon} />);
  } else {
    if (!articles) {
      return (<div>There is no Cat now.</div>)
    } else {
      return (
        
        <Row gutter={[8, 8]}>
          {
            articles && articles.map(({ id, title, alltext }) => (
              <Col span={12} key={id}>
                <Card className="cardLayout" title={`Name :`+title} cover={<img alt="example" style={{width:400, height:500}} src="https://cdn2.thecatapi.com/images/8ru.jpg" />}>
                  <p>Description: {alltext}</p>
                  <p></p>
                  {/* <Link to={`/a/${id}`}>Details</Link> */}
                  <p></p>
                  {
                          isliked? <HeartFilled onClick={()=> onClick(id,false)} /> 
                          :<HeartOutlined onClick={()=> onClick(id, true)}/>
                  }
                   <DeleteOutlined onClick={()=> onClickDelete(id)}/>
                </Card>
              </Col>
            ))
          }
        </Row>
      )
    }
  }

  const cardLayout={
    backgroudColor: '#FFF'
  }
}

export default Article;