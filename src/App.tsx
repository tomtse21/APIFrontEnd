//import './App.css'
import { Affix, Button, Layout, Menu, Space } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
//import Landing from "./components/Landing"
import Favourites from './components/Favourites';
import MemberInformation from './components/MemberInformation';
import LoginPage from './components/LoginPage';
import UserInfterface from './types/user.type';
import NewCat from './components/NewCat';
import RegAcc from './components/RegAccount';
import React, { useEffect } from 'react';
import AuthService from './services/authService';
import { RequireAuth, useIsAuthenticated, useSignOut } from 'react-auth-kit';
import Icon, { HeartOutlined, HomeOutlined, InboxOutlined, InfoOutlined, LoginOutlined, LogoutOutlined, MessageFilled, MessageOutlined, PlusOutlined } from '@ant-design/icons';
import ShowCats from './components/ShowCats';
import AdminMessageBoard from './components/AdminMessageBoard';
import MessageBoard from './components/MessageBoard';
import ForgetPassword from './components/ForgetPassword';

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


  const AppStlye = {

    height: 60, display: 'flex', justifyContent: 'center', fontWeight: 'bold',

  }
  function Header() {
    return (
      <>
        <div style={AppStlye}><h3>The Pet Shelter</h3> </div>
      </>
    )
  }
  function Footer() {
    return (
      <>
        <div style={AppStlye}><h3>Copyright © 2023 All Rights Reserved</h3></div>
      </>
    )
  }
  const items = [
    { label: 'Home', key: '/', icon: <HomeOutlined /> },
    isAuthenticated() ? { label: 'favourites', key: 'favourites', icon: <HeartOutlined /> } : null,
    isAuthenticated() && (localStorage.getItem('userType') == 'admin') ? { label: 'newcat', key: 'newcat', icon: <PlusOutlined /> } : null,
    isAuthenticated() && (localStorage.getItem('userType') == 'admin') ? { label: 'messageIn', key: 'messageIn', icon: <InboxOutlined /> } : null,
    //isAuthenticated()?{label: 'memberInfo', key:'memberInfo', icon:<InfoOutlined/>}:null,
    !isAuthenticated() ? { label: 'login', key: 'login', icon: <LoginOutlined /> } : null,
    isAuthenticated() ? { label: 'logout', key: 'logout', icon: <LogoutOutlined /> } : null
  ]
  function SideMenu() {
    return (
      <div>
        <Affix offsetTop={15} >
          <Menu defaultOpenKeys={['/']} mode="inline" onClick={({ key }) => {
            if (key === "logout") {
              singOut();
              navigate("/")
              localStorage.clear();
            } else {
              navigate(key);
            }
          }} defaultSelectedKeys={(window.location.pathname)}

            items={items}>

          </Menu>
        </Affix>

      </div>
    )
  }

  function Content() {
    return (
      <div style={{ padding: 15, justifyContent: 'center', width: '100%' }}>
        <Routes>
          <Route path="/" element={<ShowCats />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/regAcc" element={<RegAcc />} > </Route>
          <Route path="/forgetPwd" element={<ForgetPassword />}></Route>

          <Route path={'/memberInfo'} element={
            <RequireAuth loginPath={'/login'}>
              <MemberInformation />
            </RequireAuth>
          } />

          {(localStorage.getItem('userType') == 'admin') ? <Route path={'/newcat'} element={
            <RequireAuth loginPath={'/login'}>
              <NewCat />
            </RequireAuth>
          } /> : null}

          {(localStorage.getItem('userType') == 'admin') ? <Route path={'/messageIn'} element={
            <RequireAuth loginPath={'/login'}>
              <AdminMessageBoard />
            </RequireAuth>
          } /> : null}

          <Route path={'/messageOut'} element={
            <RequireAuth loginPath={'/login'}>
              <MessageBoard catId={9999999} catImage='' />
            </RequireAuth>
          } />

          <Route path={'/favourites'} element={
            <RequireAuth loginPath={'/login'}>
              <Favourites />
            </RequireAuth>
          } />

        </Routes>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, height: '100vh' }}>
      <Header />
      <div style={{ display: "inline-flex", flexFlow: 'row', width: '100%', flexDirection: "row", flex: '0 0 100%' }}>
        <SideMenu />
        <Content />
      </div>
      <Footer />
    </div>
  )
}