import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login, ProductDetail, SignUp } from '../../pages';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/detail/:id" exact={true}>
          <ProductDetail />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
