import React from "react";
import { Link } from "react-router-dom";
import {
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              <img alt="..." src={require("assets/img/brand/017-email.png")} /> &nbsp; MIDAS
            </NavbarBrand>
          </Container>
        </Navbar>
      </>
    );
  }
}
export default AdminNavbar;
