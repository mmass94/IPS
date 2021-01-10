/** @format */
import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarF from "./components/layout/NavbarF";
import Footer from "./components/layout/Footer";
import register from "./DashboardComponents/auth/register";
import Dashboard from "./DashboardComponents/Dashboard";
import login from "./DashboardComponents/auth/login";
import setAuthToken from "./utills/setAuthToken";
import "../src/components/rtl.css";
import "../src/components/main.css";
import { Provider } from "react-redux";
import store from "./store";
import { laodUser } from "./actions/auth";
import Articles from "./Pages/Articles";
import PrivateRoute from "./components/routing/PrivateRoute";
import Researches from "./Pages/Researches";
import Videos from "./Pages/Videos";
import Books from "./Pages/Books";
import Links from "./Pages/Links";
import Questions from "./Pages/Questions";
import Test from "./Pages/Test";
import Home from "./Pages/Home";
import AddQuestion from "./DashboardComponents/AddQuestion";
import AddLink from "./DashboardComponents/AddLink";
import AddVideo from "./DashboardComponents/AddVideo";
import AddArticle from "./DashboardComponents/AddArticle";
import AddResearch from "./DashboardComponents/AddResearch";
import AddBook from "./DashboardComponents/AddBook";
import UpdateVideo from "./DashboardComponents/UpdateVideo";
import UpdateLink from "./DashboardComponents/UpdateLink";
import UpdateBook from "./DashboardComponents/UpdateBook";
import UpdateResearch from "./DashboardComponents/UpdateResearch";
import UpdateArticle from "./DashboardComponents/UpdateArticle";
import UpdateQuestion from "./DashboardComponents/UpdateQuestion";
import QuestionsList from "./DashboardComponents/QuestionsList";
import LinksList from "./DashboardComponents/LinksList";
import VideosList from "./DashboardComponents/VideosList";
import AdminsList from "./DashboardComponents/AdminsList";
import ArticlesList from "./DashboardComponents/ArticlesList";
import BooksList from "./DashboardComponents/BooksList";
import ResearchesList from "./DashboardComponents/ResearchesList";
import Article from "./Pages/Article";
import Research from "./Pages/Research";

import Container from "react-bootstrap/esm/Container";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(laodUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavbarF />
          <Container
            fluid={true}
            style={{
              padding: "0px",
              marginBottom: "50px",
              minHeight: "72vh",
            }}>
            <Switch>
              <PrivateRoute exact path="/register" component={register} />
              <PrivateRoute exact path="/Dashboard" component={Dashboard} />
              <PrivateRoute exact path="/AddVideo" component={AddVideo} />
              <PrivateRoute exact path="/AddQuestion" component={AddQuestion} />
              <PrivateRoute exact path="/AddArticle" component={AddArticle} />
              <PrivateRoute exact path="/AddLink" component={AddLink} />
              <PrivateRoute exact path="/AddResearch" component={AddResearch} />
              <PrivateRoute exact path="/AddBook" component={AddBook} />
              <PrivateRoute exact path="/register" component={register} />
              <PrivateRoute exact path="/VideosList" component={VideosList} />
              <PrivateRoute exact path="/BooksList" component={BooksList} />
              <PrivateRoute
                exact
                path="/QuestionsList"
                component={QuestionsList}
              />
              <PrivateRoute
                exact
                path="/ResearchesList"
                component={ResearchesList}
              />
              <PrivateRoute exact path="/AdminsList" component={AdminsList} />
              <PrivateRoute exact path="/LinksList" component={LinksList} />
              <PrivateRoute
                exact
                path="/UpdateQuestion/:id"
                component={UpdateQuestion}
              />
              <PrivateRoute
                exact
                path="/ArticlesList"
                component={ArticlesList}
              />
              <PrivateRoute
                exact
                path="/UpdateVideo/:id"
                component={UpdateVideo}
              />
              <PrivateRoute
                exact
                path="/UpdateLink/:id"
                component={UpdateLink}
              />
              <PrivateRoute
                exact
                path="/UpdateResearch/:id"
                component={UpdateResearch}
              />
              <PrivateRoute
                exact
                path="/UpdateBook/:id"
                component={UpdateBook}
              />
              <PrivateRoute
                exact
                path="/UpdateArticle/:id"
                component={UpdateArticle}
              />
              <Route exact path="/login" component={login} />
              <Route exact path="/Test" component={Test} />
              <Route exact path="/Articles" component={Articles} />
              <Route exact path="/Article/:id" component={Article} />
              <Route exact path="/Research/:id" component={Research} />
              <Route exact path="/" component={Home} />
              <Route exact path="/Researches" component={Researches} />
              <Route exact path="/Videos" component={Videos} />
              <Route exact path="/Home" component={Home} />{" "}
              <Route exact path="/Books" component={Books} />{" "}
              <Route exact path="/Videos" component={Videos} />{" "}
              <Route exact path="/Links" component={Links} />{" "}
              <Route exact path="/Questions" component={Questions} />
            </Switch>
          </Container>
        </Fragment>
      </Router>
      <Footer />
    </Provider>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default App;
