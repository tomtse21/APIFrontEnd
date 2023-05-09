//import './App.css'
import { Button, Layout, Menu, Space} from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
//import Landing from "./components/Landing"
import Home from './components/Home';
import Favourites from './components/Favourites';
import MemberInformation from './components/MemberInformation';
import DetailArticle from './components/DetailArticle';
import NewArticles from './components/NewArticles';
import LoginPage from './components/LoginPage';
import UserInfterface from './types/user.type';
import NewCat from './components/NewCat';
import RegAcc from './components/RegAccount';
import Articles from './components/Articles';
import React, { useEffect } from 'react';
import AuthService from './services/authService';
import { RequireAuth, useIsAuthenticated, useSignOut } from 'react-auth-kit';
import Icon, { HeartOutlined, HomeOutlined, InfoOutlined, LoginOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;



export default function App() {

  const [islogin, setIslogin] = React.useState(false);
  const navigate = useNavigate();
  const singOut = useSignOut();
  const isAuthenticated = useIsAuthenticated()

  // const getUserConfig = () => {
  //   React.useEffect(() => {
  //     if( AuthService.getCurrentUser() && AuthService.getCurrentUser()?.length !==0 ){
  //       setIslogin(true);
  //     }
  //   }, []);
  // }
  
  // getUserConfig();

  const logout = (event: any) => {
    // AuthService.LogoutOut();
 
    // setIslogin(false);
  }

  const AppStlye = {
  
    height:60, display:'flex',justifyContent:'center', fontWeight:'bold', 

  }
  function Header(){
    return (
      <>
        <div style={AppStlye}><h3>The Pet Shelter</h3> </div>
      </>
    )
  }
  function Footer(){
    return (
      <>
        <div style={AppStlye}><h3>2023</h3></div>
      </>
    )
  }
  const items = [
    {label: 'Home', key:'/', icon:<HomeOutlined/>},
    {label: 'favourites', key:'favourites', icon:<HeartOutlined/>},
    isAuthenticated()?{label: 'newcat', key:'newcat', icon:<PlusOutlined/>}:null,
    isAuthenticated()?{label: 'memberInfo', key:'memberInfo', icon:<InfoOutlined/>}:null,
    !isAuthenticated()?{label: 'login', key:'login', icon:<LoginOutlined />}:null,
    isAuthenticated()?{label: 'logout', key:'logout', icon:<LogoutOutlined />}:null
  ]
  function SideMenu(){
    return (
      <div>
      <Menu onClick={({key})=>{
        if( key === "logout"){
          console.log("logout");
          singOut();
          navigate("/")
        }else if(key === "memberInfo" || key === "favourites"){
          navigate('/login');
        }else {
          navigate(key);
        }
      }} defaultSelectedKeys={(window.location.pathname)}

      items={items}>
  
      </Menu>
      
    </div>
    )
  }

  function Content(){
    return (
      <div style={{padding: 15, justifyContent:'center'}}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/regAcc" element= {<RegAcc />} > </Route>

          <Route path={'/memberInfo'} element={
            <RequireAuth loginPath={'/login'}>
              <MemberInformation />
            </RequireAuth>
          }/>

          <Route path={'/newcat'} element={
            <RequireAuth loginPath={'/login'}>
              <NewCat />
            </RequireAuth>
          }/>

          
          {/* <Route index element={ <Home /> } /> */}
          {/* <Route index element={<LoginPage />}  /> 
          <Route path="/" element={<RequireAuth loginPath="/memberInfo"> <LoginPage /></RequireAuth>}  />
          <Route path="/login" element={<RequireAuth loginPath="/login"> <LoginPage /></RequireAuth>}  /> 
          <Route path="/favourites" element={<RequireAuth loginPath="/login"> <Favourites /></RequireAuth>} ></Route>
          
          
          <Route path="/articles" element= {<Articles />} > </Route>
          <Route path="/newArticles" element= {<NewArticles />} > </Route> */}
        </Routes>
      </div>
    )
  }
 
  return (
    <div  style={{display: "flex" , flexDirection:"column", flex:1,height:'100vh'}}>
      <Header/>
      <div  style={{display: "inline-flex" , flexFlow: 'row',width: '100%',flexDirection:"row", flex:2}}>
        <SideMenu />
        <Content />
      </div>
      <Footer />
    </div>
  )

  

 
  
}