import React, { Component } from 'react';
import { Image, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

class Navigation extends Component {
  static contextTypes = {
    loggedInUser: React.PropTypes.object,
  }

  state = {
    count: 0
  }

  componentDidMount() {
    const {loggedInUser} = this.context;

    if (loggedInUser) {
      fetch(`/definitions?userId=${loggedInUser.id}`)
        .then(response => response.json())
        .then(data => data.length)
        .then(count => this.setState({count}));
    }
  }

  render() {
    const { loggedInUser } = this.context;

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Dev Dictionary</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            {loggedInUser && <Nav pullRight><LinkContainer to="/logout"><NavItem eventKey={2}>Logout</NavItem></LinkContainer></Nav>}
            {!loggedInUser && <Nav pullRight><LinkContainer to="/login"><NavItem eventKey={2}>Login</NavItem></LinkContainer></Nav>}
            {loggedInUser && <Navbar.Text pullRight>
              {`{${this.state.count}}`} definitions
            </Navbar.Text>}
            {loggedInUser && <Navbar.Text pullRight>
              You are currently logged in as <Image className="nav-avatar" src={'/avatars/' + loggedInUser.avatarUrl} />
              {' '}
              <strong>{loggedInUser.name}</strong>
            </Navbar.Text>}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation
