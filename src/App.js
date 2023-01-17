import './App.css';
import Header from './Components/Header';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import AddUser from './Pages/AdminPanel/UserHandling/AddUser';
import ViewUser from './Pages/AdminPanel/UserHandling/ViewUser';
import { Link } from 'react-router-dom';
import '../src/Styles/StyleGuide.css'
import Login from './Pages/AdminPanel/AdminLogin/Login';
import Button from "@material-ui/core/Button";
import './Styles/StyleGuide.css';


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route  
          exact
          path='/'
          render={() => {
            return (
              <>
                <h1 className='fontFamily heading shadow text-white    mt-5 p-3 mb-5 bg-info rounded'>
                  Welcome To SociBea App
                </h1>
                <div class='my-3 bg-light'>
                  <div class='col-md-12 text-center'>
                    <Link
                      className='nav-link active text-white'
                      aria-current='page'
                      to='/Login'
                    >
                      <button 
                        type='button'
                        class=' button1 btn btn-primary btn-lg fontFamily'
                      >
                          Admin Login        
                          
                                        </button>
                    </Link>

                    <Link
                      className='nav-link active text-white'
                      aria-current='page'
                      to='/ViewUser'
                    >
                      <button
                        type='button'
                        class=' button1 btn btn-secondary btn-lg fontFamily'
                      >
                        View User
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            );
          }}
        ></Route>
        <Route exact path='/AddUser'>
          <Login />
        </Route>
        <Route exact path='/ViewUser'>
          <ViewUser />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
