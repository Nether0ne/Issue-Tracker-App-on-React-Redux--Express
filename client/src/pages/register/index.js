import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.email && /.+@.+\..+/.test(user.email) && user.password) {
      this.props.register(user);
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    const { email, password } = user;
    return (
      <div className="self-center w-80">
        <h2 className="text-center font-bold uppercase mb-8 text-2xl">Register</h2>
        
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
              {registering
                ? <img src="" />
                : 
                <div className="flex gap-24">
                  <div className="flex-1">
                    <button className="btn btn-success w-100">Register</button>
                  </div>
                  <div className="flex-1">
                    <Link to="/login" className="btn btn-secondary w-100">Cancel</Link>
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
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
