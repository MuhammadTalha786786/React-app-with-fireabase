import './App.css';
import Header from './Components/Header';
import { HashRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import AddUser from './Pages/AdminPanel/UserHandling/AddUser';
import ViewUser from './Pages/AdminPanel/UserHandling/ViewUser';
import '../src/Styles/StyleGuide.css';
import Login from './Pages/AdminPanel/AdminLogin/Login';
import './Styles/StyleGuide.css';
import { useSelector } from 'react-redux';
import Home from './Pages/Home';
import UserLogin from './Pages/UserPanel/UserAuthentication/UserLogin';
import RegisterUser from './Pages/UserPanel/UserAuthentication/Register/RegisterUser';
import UserHome from './Pages/UserPanel/Home/UserHome';

function App() {
  const appState = useSelector((state) => state);
  const isLogin = appState.auth.isLogin;
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/userlogin' element={<UserLogin />} />
        {!isLogin && <Route exact path={'/'} element={<Home />} />}
        <Route path='registerUser' element={<RegisterUser />} />
        {isLogin && <Route path='/userHome' element={<UserHome />} />}
      </Routes>
    </Router>
  );
}

export default App;
