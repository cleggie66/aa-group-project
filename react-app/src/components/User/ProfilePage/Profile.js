import React, { useState, useEffect } from "react";
import DeleteUserModal from "../DeleteUser";
import OpenModalButton from "../../OpenModalButton";
import UpdateUserForm from "../UpdateUser";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../context/Modal";
import EditProfilePictureModal from "./ProfilePictureModal";

import "./Profile.css";
import EditUsernameModal from "./UsernameModal";
import EditNameModal from "./NameModal";
import EditPasswordModal from "./PasswordModal";
import EditEmailModal from "./EmailModal";

const ProfilePage = () => {
  const history = useHistory();
  const { setModalContent, setOnModalClose } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  //   const dispatch = useDispatch();

  if (!sessionUser) {
    history.push(`/home`);
  }

  const handleProfilePictureEdit = () => {
    setModalContent(<EditProfilePictureModal sessionUser={sessionUser} />);
  };
  const handleUserNameEdit = () => {
    setModalContent(<EditUsernameModal sessionUser={sessionUser} />);
  };
  const handleFirstNameEdit = () => {
    setModalContent(<EditNameModal sessionUser={sessionUser} />);
  };
  const handlePasswordEdit = () => {
    setModalContent(<EditPasswordModal sessionUser={sessionUser} />);
  };
  const handleEmailEdit = () => {
    setModalContent(<EditEmailModal sessionUser={sessionUser} />);
  };
  const handleTitleEdit = () => {
    // setModalContent(< sessionUser={sessionUser} />);
  };
  const handleAboutMeEdit = () => {
    // setModalContent(< sessionUser={sessionUser} />);
  };


  return (
    <div className="profile-page-container">
      <h1>Your Profile 💁‍♀️ </h1>
      <div className="profile-picture-container">
        <img
          src={sessionUser.profile_picture}
          alt="Profile Picture"
          className="profile-page-picture"
        />
        <FontAwesomeIcon
          icon={faUserPen}
          onClick={handleProfilePictureEdit}
          className="edit-profile-picture"
        />
      </div>
      <div className="username-container">
        <div>{`Username:  ${sessionUser.username}`}</div>
        <FontAwesomeIcon
          icon={faUserPen}
          onClick={handleUserNameEdit}
          // className=""
        />
      </div>

      <div className="email-container">
        <div>{`Email:  ${sessionUser.email}`}</div>
        <FontAwesomeIcon
          icon={faUserPen}
          onClick={handleEmailEdit}
          // className=""
        />
      </div>

      <div className="name-container">
        <div>{`First name:  ${sessionUser.first_name}`}</div>
        <div>{`Last name:  ${sessionUser.last_name}`}</div>

        <FontAwesomeIcon
          icon={faUserPen}
          onClick={handleFirstNameEdit}
          // className=""
        />
      </div>
      <div className="password-container">
        <div>{"Change your password"}</div>
        <FontAwesomeIcon
          icon={faUserPen}
          onClick={handlePasswordEdit}
          // className=""
        />
      </div>

      <button>Change Password</button>
      <FontAwesomeIcon
        icon={faUserPen}
        // onClick={onClick}
        // className=""
      />

      <button></button>
      <button>Change password</button>

      <UpdateUserForm sessionUser={sessionUser} />
      <OpenModalButton
        buttonText="Delete My Account"
        modalComponent={<DeleteUserModal />}
      />
    </div>
  );
};

export default ProfilePage;
