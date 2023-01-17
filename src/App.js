import './App.css';
import Header from './Components/Header';
import { HashRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import AddUser from './Pages/AdminPanel/UserHandling/AddUser';
import ViewUser from './Pages/AdminPanel/UserHandling/ViewUser';
import { Link } from 'react-router-dom';
import '../src/Styles/StyleGuide.css';
import Login from './Pages/AdminPanel/AdminLogin/Login';
import './Styles/StyleGuide.css';
import { useSelector } from 'react-redux';
import Home from './Pages/Home';

function App() {
  const appState = useSelector((state) => state);
  const isLogin = appState.auth.isLogin;
  console.log(isLogin);
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route
          exact
          path={'/'}
          element={<Home />}
          
        />
        <Route path='/Login' element={<Login />} />

        {isLogin ? (
          <Route exact path='/ViewUser' element={<ViewUser />} />
        ) : (
          <Route path='/Login' element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
