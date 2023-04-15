import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useLocation, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import DemoLogin from "./DemoLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserTie } from "@fortawesome/free-solid-svg-icons";
import "./Navigation.css";
import UserIconModal from "../User/UserIcon";
import { useModal } from "../../context/Modal";
import banter from '../../media/banter-logo.png'
import banterDark from '../../media/banter-logo-dark.png'

function Navigation() {
  const [homePage, setHomePage] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (pathname.includes("/dashboard")) {
      setHomePage(false);
    } else {
      setHomePage(true);
    }
  }, [pathname]);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push(``);
  };

  // const handleUserIconClick = (e) => {
  //   e.preventDefault();
  //   dispatch();
  // };

  const handleCreateWorkspace = (e) => {
    e.preventDefault();
    history.push(`/create-workspace`);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    history.push(``);
  };

  const profile = window.location.pathname.includes("/profile");

  const { setModalContent } = useModal();

  const onClick = () => {
    setModalContent(<UserIconModal />);
  };

  return (
    <div>
      {homePage && sessionUser && !profile && (
        <div className="signed-out-nav-bar workspaces">
          <img className="banter-nav-logo" src={banterDark}/>
          <div className="signed-out-nav-bar-buttons">
          <button onClick={handleLogoutClick}>SIGN OUT</button>
          <button onClick={handleCreateWorkspace}>
            CREATE A NEW WORKSPACE{" "}
          </button>
          </div>
          </div>
      )}
      {homePage && !sessionUser && (
        <div className="signed-out-nav-bar">
          <img className="banter-nav-logo" src={banter}/>
          <div className="signed-out-nav-bar-buttons">
          <DemoLogin />
          <OpenModalButton
            className="log-in-button"
            buttonText="SIGN IN"
            modalComponent={<LoginFormModal />}
          />
          <OpenModalButton
            className="sign-up-button"
            buttonText="TRY FOR FREE"
            modalComponent={<SignupFormModal />}
          />
          </div>
        </div>
      )}
      {!homePage && sessionUser && (
        <div className="dashboard-navbar-container">
          <div>
            <NavLink
              exact
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <FontAwesomeIcon icon={faHome} className="home-icon"/>
            </NavLink>
          </div>
          <div
            onClick={onClick}
            className="nav-profile-section"
          >
            <FontAwesomeIcon
              icon={faUserTie}
              className="user-icon-button"
            />
            <div className="nav-image-container">
              <img
                src={
                  sessionUser.profile_picture === null
                    ? sessionUser.name[0]
                    : sessionUser.profile_picture
                }
                alt="profile"
                className="nav-profile-pic"
              />
            </div>
          </div>
        </div>
      )}
      {homePage && profile && sessionUser && (
        <>
          <button onClick={handleLogoutClick}>Sign me out</button>
          <button onClick={handleHomeClick}>Country roads, take me home</button>
        </>
      )}
    </div>
  );
}

export default Navigation;
