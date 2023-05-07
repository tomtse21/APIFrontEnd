//import './App.css'
import { Button, Layout, Space} from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
import React from 'react';
import AuthService from './services/authService';
import { RequireAuth } from 'react-auth-kit';

const { Header, Content, Footer } = Layout;



export default function App() {

  const [islogin, setIslogin] = React.useState(false);

  const getUserConfig = () => {
    React.useEffect(() => {
      if( AuthService.getCurrentUser() && AuthService.getCurrentUser()?.length !==0 ){
        setIslogin(true);
      }
    }, []);
  }
  
  getUserConfig();

  const logout = (event: any) => {
    AuthService.LogoutOut();
    setIslogin(false);
  }

  return (
    <Router>
      <Header>
        <nav>
           
            <Space>
                <Link to="/">Home</Link>
                <Link to="/memberInfo">Member Information</Link>™
                <Link to="/favourites">Favourites</Link>
                <Link to="/newarticle">New</Link>
                <Link to="/newcat">New Cat</Link>
                <Link to="/articles">Articles</Link>
                <Link to="/newArticles">New Articles</Link>
                
            </Space>
           
          <Button type="primary" onClick={logout}>Button</Button>
        </nav>
      </Header>
      <Content>
        <Routes>
          {/* <Route index element={ <Home /> } /> */}
          <Route index element={<LoginPage />}  /> 
          <Route path="/login" element={<LoginPage />}  /> 
          <Route path="/favourites" element={<RequireAuth loginPath="/login"> <Favourites /></RequireAuth>} ></Route>
          <Route path="/memberInfo" element={<MemberInformation />} > </Route>
          {/* <Route path="/a/:aid" element = {<DetailArticle /> } /> */}
          <Route path="/newcat" element= {<NewCat />} > </Route>
          <Route path="/regAcc" element= {<RegAcc />} > </Route>
          <Route path="/articles" element= {<Articles />} > </Route>
          <Route path="/newArticles" element= {<NewArticles />} > </Route>
        </Routes>
      </Content>
      <Footer>
      </Footer>
    </Router>
  )
}