//import './App.css'
import { Layout, Space} from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import Landing from "./components/Landing"
import Home from './components/Home';
import Favourites from './components/Favourites';
import About from './components/About';
import DetailArticle from './components/DetailArticle';
import NewArticles from './components/NewArticles';
import LoginPage from './components/LoginPage';
import UserInfterface from './types/user.type';

const { Header, Content, Footer } = Layout;

type Props = {};

type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: UserInfterface | undefined
}

export default function App() {
  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/favourites">Favourites</Link>
            <Link to="/about">About</Link>
            <Link to="/newarticle">New</Link>
          </Space>
        </nav>
      </Header>
      <Content>
        <Routes>
          <Route index element={ <Home /> } />
          <Route path="/login" element={<LoginPage />}  /> 
          <Route path="/favourites" element={<Favourites />}  />  
          <Route path="/about" element={<About />}  />
          <Route path="/a/:aid" element = {<DetailArticle /> } />
          <Route path="/newarticle" element= {<NewArticles />} />
        </Routes>
      </Content>
      <Footer>
      </Footer>
    </Router>
  )
}