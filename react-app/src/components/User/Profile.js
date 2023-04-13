import React, { useState, useEffect } from "react";
import DeleteUserModal from "./DeleteUser";
import OpenModalButton from "../OpenModalButton";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
// import { getWorkspaceByIdThunk } from "../../../store/workspace";
// import ChannelDisplay from "./ChannelDisplay";
const ProfilePage = () => {
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const sessionUser = useSelector((state) => state.session.user);

//   const correctChannels = sessionUser.joined_channels.filter(
//     (e) => e.is_channel === true
//   );

//   if (!sessionUser) {
//     history.push(`/home`);
//   }

//   const { workspaceId } = useParams();

//   useEffect(() => {
//     dispatch(getWorkspaceByIdThunk(workspaceId));
//   }, [dispatch, workspaceId]);

  return (
    <div>
      <h1>Your Profile 💁‍♀️ </h1>
     
      {/* add form for updating profile */}
      <OpenModalButton
            buttonText="Delete My Account"
            modalComponent={<DeleteUserModal />}
          />
    </div>
  );
};

export default ProfilePage;
