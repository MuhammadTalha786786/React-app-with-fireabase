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

function App() {
  const appState = useSelector((state) => state);
  const isLogin = appState.auth.isLogin;
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route exact path={'/'} element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/userlogin' element={<UserLogin />} />

        {isLogin ? (
          <Route exact path='/ViewUser' element={<ViewUser />} />
        ) : (
          <Route path='/Login' element={<Login />} />
        )}
        <Route path='addUser' element={<AddUser />} />
        <Route path='registerUser' element={<RegisterUser />} />

      </Routes>
    </Router>
  );
}

export default App;
