import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin } from 'antd';
//import articles from './articles.json';
import { api } from './common/http-common';
import axios from 'axios';
import Icon, { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';

const Article = () => {
  const [articles, setArticles] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get(`${api.uri}/articles`)
      .then((res) => {
        setArticles(res.data);
      })
      .then(() => {
        setLoading(false);
      })
  }, []);

  function onClick(id: any) {
    alert(`hello, ${id}`);
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
                <Card  title={title} cover={<img alt="example" style={{width:400, height:500}} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                  <p>{alltext}</p>
                  <p></p>
                  <Link to={`/a/${id}`}>Details</Link>
                  <p></p>
                    <DeleteOutlined onClick={()=> onClick(id)}/>
                </Card>
              </Col>
            ))
          }
        </Row>
      )
    }
  }
}

export default Article;