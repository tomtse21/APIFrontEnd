import axios from "axios";
import React, { useReducer, useState } from "react";
import { api } from "./common/http-common";
import { EditOutlined, GithubOutlined, LoadingOutlined, MessageOutlined } from "@ant-design/icons";
import { Spin, Affix, Row, Col, Select, Card, Modal, Alert, Form, Input, Button } from "antd";
import form from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import search from "antd/es/transfer/search";
import { Search } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";


const Favourites = () => {
  const [cats, setCats] = React.useState<any[]>([])
  const [isliked, setIsLiked] = React.useState(false);
  const [loading, setLoading] = React.useState(true);


  React.useEffect(() => {
    initPageGetData();
  }, []);

  function initPageGetData(){

        axios.get(`${api.uri}/cats`)
        .then((res) => {
          if(res.data.length>=1 ){
            for (let i = 0; i < res.data.length; i++) {
              const item = res.data[i];
              if( localStorage.getItem(`favorite_${item.id}`) === 'true'){
                setCats((cat) => [...cat, item]);
              }
            }
          }
        })
        .then(() => {
          setLoading(false);
        })
  }
  

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
    return (
    <Spin indicator={antIcon} />);
  } else {
    if (cats.length==0) {
      return (<div>Your favourites List is empty</div>)
    } else {
      return (
        <>
          <Row gutter={[24, 24]}>
          {
            cats && (cats)!.map((currElement:any) => (

              <Col xs={24} sm={18} md={12} lg={6} xl={6} key={currElement.id}>
                <Card  hoverable
                 style={{ height:'100%' }}
                      actions={[
                        // <Favourites id={currElement.id}></Favourites>,
                          <FavoriteButton id={currElement.id} ></FavoriteButton>,
                        ]} 
                        
                        title={`Name :`+currElement.name} 
                        cover={ <img  src={`https://firebasestorage.googleapis.com/v0/b/apiproject-1786e.appspot.com/o/files%2F${currElement.imageuri}?alt=media`} />}>
                          {currElement.id}
                 <Card.Meta style={{display:"flex", flexDirection:"column"}} avatar={`Color : ${currElement.color?currElement.color:'unkown'}`} title={`Age : ${currElement.age?currElement.age:'-'}`} description={`Description : ${currElement.description?currElement.description:'unkown'}`}></Card.Meta>
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


export default Favourites;