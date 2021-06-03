import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './login.sass';

import { userActions } from '../../actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    //this.props.logout();

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
      this.props.login(email, password);
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { email, password, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && (!this.email || !/.+@.+\..+/.test(this.email)) ? ' has-error' : '')}>
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" name="email" value={this.email} onChange={this.handleChange} />
            {submitted && !email &&
              <div className="help-block">Email is required</div>
            }
            {submitted && !!/.+@.+\..+/.test(this.email) &&
              <div className="help-block">Invalid email</div>
            }
          </div>
          <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={this.password} onChange={this.handleChange} />
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            {loggingIn &&
              <img src="" />
            }
            <Link to="/register" className="btn btn-link">Register</Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };