import './App.css';
import Header from './Components/Header';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import AddUser from './Components/AddUser';
import ViewUser from './Components/ViewUser';
import { Link } from 'react-router-dom';

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
                <h1 className='heading shadow mt-5 p-3 mb-5 bg-info rounded'>
                  React JS App using Firebase
                </h1>
                <div class='my-3 bg-light'>
                  <div class='col-md-12 text-center'>
                    <Link
                      className='nav-link active text-white'
                      aria-current='page'
                      to='/AddUser'
                    >
                      <button
                        type='button'
                        class=' button1 btn btn-primary btn-lg'
                      >
                        Add User
                      </button>
                    </Link>

                    <Link
                      className='nav-link active text-white'
                      aria-current='page'
                      to='/ViewUser'
                    >
                      <button
                        type='button'
                        class=' button1 btn btn-secondary btn-lg'
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
          <AddUser />
        </Route>
        <Route exact path='/ViewUser'>
          <ViewUser />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
