import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.scss';

//Redux
import { Provider } from 'react-redux'; // connects react with redux
import store from './store';

import Login from './components/dashboard/Login';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment className="App">
        <Navbar/>
        <Route exact path="/" component={Home} />
        <section classname="container">
          <Switch>
          <Route exact path="/login" component={Login}/>
            <Route exact path="/dashboard" component={Dashboard}/>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);
export default App;
