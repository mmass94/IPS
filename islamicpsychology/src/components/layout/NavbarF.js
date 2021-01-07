/** @format */

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../../components/rtl.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const NavbarF = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <a onClick={logout}>
        <Link className="nav-link NavIteamsStyle" to="/">
          logout
        </Link>{" "}
      </a>
      <Link className="nav-link NavIteamsStyle" to="/VideosList">
        Videos List{" "}
      </Link>{" "}
      <Link className="nav-link NavIteamsStyle" to="/AdminsList">
        Admins List
      </Link>{" "}
      <Link className="nav-link NavIteamsStyle" to="/ArticlesList">
        Articles List{" "}
      </Link>{" "}
      <Link className="nav-link NavIteamsStyle" to="/ResearchesList">
        Researches List{" "}
      </Link>{" "}
      <Link className="nav-link NavIteamsStyle" to="/BooksList">
        Books List{" "}
      </Link>{" "}
      <Link className="nav-link NavIteamsStyle" to="/LinksList">
        Links List{" "}
      </Link>{" "}
          <Link className="nav-link NavIteamsStyle" to="/QuestionsList">
        Questions List{" "}
      </Link>{" "}
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Navbar.Brand href="/home" className="NavIteamsStyle">
        علم النفس الإسلامي
      </Navbar.Brand>

      <Link className="nav-link  NavIteamsStyle" to="/home">
        الصفحة الرئيسية
      </Link>
      <Link className="nav-link NavIteamsStyle" to="/Articles">
        مقالات
      </Link>
      <Link
        className="nav-link NavIteamsStyle"
        //   onClick={this.toggleMenu}
        to="/Researches">
        أبحاث
      </Link>

      <Link className="nav-link NavIteamsStyle" to="/Videos">
        فيديوهات
      </Link>
      <Link className="nav-link NavIteamsStyle" to="/Books">
        كتب
      </Link>

      <Link className="nav-link NavIteamsStyle" to="/links">
        روابط
      </Link>
      <Link className="nav-link NavIteamsStyle" to="/Questions">
        أسئلة
      </Link>
    </Fragment>
  );

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav mr-auto" />
      <Navbar.Collapse id="basic-navbar-nav ">
        <Nav>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarF.protoTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(NavbarF);
