import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { Footer, Header } from '../_components';

import { PrivateRoute } from '../_components';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  dismissHandler() {
    return (e) => this.props.clearAlerts();
  }

  render() {
    const { alert } = this.props;
    return (
      <div id='page'>
        <div className="flex flex-col h-screen justify-between gap-4">                         
          <header>
            <Header/>
          </header>
          <div className="h-screen items-center justify-center">
            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Redirect from="*" to="/" />
            </Switch>
          </div>
          <footer>
            <Footer/>
          </footer>
        </div>        
      </div>      
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
