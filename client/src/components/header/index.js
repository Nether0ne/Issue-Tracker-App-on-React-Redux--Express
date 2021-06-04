import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';

import "./header.sass";
import { userActions } from '../../actions';
import Avatar from 'react-avatar';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  componentDidMount() {}

  handleLogout() {
    return (e) => this.props.logout();
  }

  render() {
    const { authentication } = this.props;
    const { loggedIn, user } = authentication;
    
    return(
      <div>
        {loggedIn &&
          <nav className="navbar navbar-expand-lg navbar-light bg-indigo-500">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/">
                      <button className="btn text-white font-bold bg-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        Boards
                      </button>
                    </Link>           
                  </li>
                </ul>
                <div className="dropdown dropstart">
                  <a className="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <Avatar classNameName="d-flex" name={user.email} size="45px" round="25px" color="darkgray" maxInitials={1} fgColor="black"/>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">My profile</a></li> {/*TODO link to logged in user */}
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><Link to="/login" className="dropdown-item" onClick={this.handleLogout()}>Logout</Link></li>
                  </ul>
                </div>              
              </div>
            </div>
          </nav>
        }
      </div>
    )
  }
};

function mapState(state) {
  const { authentication } = state;
  return { authentication };
}

const actionCreators = {
  logout: userActions.logout,
}

const connectedHeader = withRouter(connect(mapState, actionCreators)(Header));
export { connectedHeader as Header };
