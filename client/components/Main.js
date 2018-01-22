import React, { Component } from 'react';
import Practice from './Practice';
import Study from './Study';
import { NavLink, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class Main extends Component {

  render() {
    return (
      <div className="main">
        <h1>Welcome to the ASL Study & Practice App!</h1>
        <Router>
          <div>
              <NavLink to='/'>
                <button className="nav-button">
                  <h4>Home</h4>
                </button>
              </NavLink>
            <NavLink to='/study'>
              <button className="nav-button">
                <h4>Study</h4>
              </button>
            </NavLink>
            <NavLink to='/practice'>
              <button className="nav-button">
              <h4>Practice</h4>
            </button>
            </NavLink>

            <Switch>
              <Route path="/study" component={Study} />
              <Route path="/practice" component={Practice} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
