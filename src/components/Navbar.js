import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar">
        <a
          className="brand"
          href="#"
        >
          Crowdseed
        </a>    
        <ul className="navbar-content">
          <li className="nav">
            <small className="account"><span id="account"><p style={{color:'blue',display:'inline-flex'}}>Account: &nbsp;</p>{this.props.account}</span></small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;