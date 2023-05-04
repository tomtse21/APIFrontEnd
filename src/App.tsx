//import './App.css'
import { Layout, Space} from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import Landing from "./components/Landing"
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import DetailArticle from './components/DetailArticle';
import NewArticles from './components/NewArticles';

const { Header, Content, Footer } = Layout;

export default function App() {
  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/about">About</Link>
            <Link to="/newarticle">New</Link>
          </Space>
        </nav>
      </Header>
      <Content>
        <Routes>
          <Route index element={ <Home /> } />
          <Route path="/dashboard" element={<Dashboard />}  />  
          <Route path="/about" element={<About />}  />
          <Route path="/a/:aid" element = {<DetailArticle /> } />
          <Route path="/newarticle" element= {<NewArticles />} />
        </Routes>
      </Content>
      <Footer>
        <p>VT6003CEM Demo</p>
      </Footer>
    </Router>
  )
}