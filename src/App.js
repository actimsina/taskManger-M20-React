import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from './components/Register';
import Home from './components/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const NoMatch = () => <h2>Page not found!</h2>;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
