import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./Homepage/HomePage.js";
import Login from "./User/Login/Login";
import SignUp from "./User/SignUp/SignUp";
import Profile from "./User/Profile";
import Adminpage from "./Admin/AdminPage/Adminpage";
import UserManage from "./Admin/AdminPage/UserManage";
import CategoriesBooks from "./Admin/AdminPage/CategoriesBooks";
import BooksManage from "./Admin/AdminPage/BooksManage";
import ChangePassword from "./User/ChangePassword/ChangePassword";
import ForgotPassword from "./User/ForgotPassword/ForgotPassword";
import Cart from "./Cart/Cart";
import Contact from "./Contact/Contact";
import Term from "./Term/Term";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    let { isLogin, userInfor } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/lienhe" exact>
              <Contact />
            </Route>
            <Route path="/quydinh" exact>
              <Term />
            </Route>

            <Route path="/login" exact>
              {isLogin === true ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/sign-up" exact>
              {isLogin === true ? <Redirect to="/" /> : <SignUp />}
            </Route>

            <Route path="/profile" exact>
              {isLogin === false ? <Redirect to="/login" /> : <Profile />}
            </Route>

            <Route path="/cart" exact>
              {isLogin === false ? <Redirect to="/login" /> : <Cart />}
            </Route>

            <Route path="/admin" exact>
              {isLogin === true &&
              userInfor.role &&
              userInfor.role.nameRole &&
              (userInfor.role.nameRole === "ADMIN" ||
                userInfor.role.nameRole === "LIBRARIAN") ? (
                <Adminpage />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/admin/user" exact>
              {isLogin === true &&
              userInfor.role &&
              userInfor.role.nameRole &&
              (userInfor.role.nameRole === "ADMIN" ||
                userInfor.role.nameRole === "LIBRARIAN") ? (
                <UserManage />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>

            <Route path="/admin/categories" exact>
              {isLogin === true &&
              userInfor.role &&
              userInfor.role.nameRole &&
              (userInfor.role.nameRole === "ADMIN" ||
                userInfor.role.nameRole === "LIBRARIAN") ? (
                <CategoriesBooks />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>

            <Route path="/admin/books" exact>
              {isLogin === true &&
              userInfor.role &&
              userInfor.role.nameRole &&
              (userInfor.role.nameRole === "ADMIN" ||
                userInfor.role.nameRole === "LIBRARIAN") ? (
                <BooksManage />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>

            <Route path="/changepassword" exact>
              {isLogin === false ? (
                <Redirect to="/login" />
              ) : (
                <ChangePassword />
              )}
            </Route>
            <Route path="/forgotpassword" exact>
              <ForgotPassword />
            </Route>
          </Switch>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
