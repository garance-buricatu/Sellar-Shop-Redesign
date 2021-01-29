import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.scss';
import 'semantic-ui-css/semantic.min.css';


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
import EditArtwork from './components/dashboard/artworks/EditArtwork';
import Alert from './components/layout/Alert';
import ViewArtwork from './components/home/ViewArtwork';
import ViewSeminar from './components/home/seminars/ViewSeminar';

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
      <div className="App">
        <Navbar/>
        <section>
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/edit-artwork/:id" component={EditArtwork}/>
            <Route exact path="/view-artwork/:id" component={ViewArtwork}/>
            <Route exact path="/view-seminar/:id" component={ViewSeminar}/>
          </Switch>
        </section>
      </div>
    </Router>
  </Provider>
  )};
export default App;
