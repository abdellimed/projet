
import React from 'react';

import {
  BrowserRouter as Router,
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navigations from './pages/navigations';
import Signup from './pages/Signup';
import Home from './pages/home';
import Startups from './pages/startups';
import Auth from './pages/Auth';
import SignupStartup from './pages/SignupStartup';
import InvestorProfile from './pages/investorProfile';
import AuthS from './pages/AuthSartups';

class  App extends React.Component {


  render(){


    return (
      <div className="App">
       <Navigations />
       <BrowserRouter>

       <Switch>
          
          <Route path="/startup/auth" component={ AuthS} exact />
          <Route path="/investor/auth" component={ Auth} exact />
          <Route path="/startup" component={ Startups} exact />
          <Route path="/startup/auth/create-account" component={ SignupStartup} exact />
          <Route path="/investor/auth/create-account" component={ Signup} exact />
          <Route path="/investor/:id" component={ InvestorProfile} exact />

          
          <Route path="/" component={Home} exact />
        </Switch>

       </BrowserRouter>

      


      </div>
  
      
    );


  }


  
}

export default App;
