import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from './components/Register';
import Home from './components/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import NoMatch from './components/NoMatch';
import AdminDash from './components/dashboard/AdminDash';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={Register} />
          <PrivateRoute path='/dash' component={Dashboard} />
          <Route path="/" exact component={Home} />
          <AdminRoute path='/admin' component={AdminDash} />
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
