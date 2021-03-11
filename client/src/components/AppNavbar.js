import {useState} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";

const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { isAuthenticated, user } = props.auth;

  const authLinks = (
      <>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{ user ? `Welcome ${user.name}`: ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </>
    )

  const guestLinks = (
      <>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </>
    )

  return (
    <div>
      <Navbar color="dark" dark expand="sm">
        <Container>
          <NavbarBrand href="/">ShoppingList</NavbarBrand>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

AppNavbar.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);
