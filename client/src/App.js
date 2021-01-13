import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.scss';

//Redux
import { Provider } from 'react-redux'; // connects react with redux
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import PrivateRoute from './components/routing/PrivateRoute';

import Login from './components/dashboard/Login';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';
import EditArtwork from './components/dashboard/EditArtwork';
import Alert from './components/layout/Alert';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //only runs once, when mounted

  return (
  <Provider store={store}>
    <Router>
      <Fragment className="App">
        <Navbar/>
        <section classname="container">
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/edit-artwork/:id" component={EditArtwork}/>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
  )};
export default App;
