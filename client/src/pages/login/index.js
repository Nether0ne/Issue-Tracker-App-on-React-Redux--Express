import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './login.sass';

import { userActions } from '../../actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
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
    console.log(this.state)
    return (
      <div className="self-center w-80">
        <h2 className="text-center font-bold uppercase mb-8 text-2xl">Login</h2>
        
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-group has-validation">
                <input type="text" className={'form-control ' + (submitted && !/.+@.+\..+/.test(email) ? 'is-invalid' : '')} 
                  name="email" value={email} onChange={this.handleChange} />
                <div className="invalid-feedback">
                  Invalid email
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group has-validation">
                <input type="password" className={'form-control ' + (submitted && !password ? 'is-invalid' : '')} 
                  name="password" value={password} onChange={this.handleChange} />
                <div className="invalid-feedback">
                  Password is required
                </div>
              </div>
            </div>

            <div>
              {loggingIn
                ? <img src="" />
                : 
                <div className="flex gap-24">
                  <div className="flex-1">
                    <button className="btn btn-success w-100">Login</button>
                  </div>
                  <div className="flex-1">
                    <Link to="/register" className="btn btn-secondary w-100">Register</Link>
                  </div>
                </div>
              }
            </div>
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
