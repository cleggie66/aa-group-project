import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteChannelThunk } from "../../../store/channel";
import { useHistory } from "react-router-dom";
import { refreshUser } from "../../../store/session";

function DeleteChannelModal({ workspaceId, channel }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteChannel = async (e) => {
    e.preventDefault();
    await dispatch(deleteChannelThunk(channel.id));
    dispatch(refreshUser(sessionUser.id));
    closeModal();
    history.push(`/dashboard/${workspaceId}/${channel.id}`);
  };

  const handleKeepChannel = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete 😟</h1>
      <h2>Are you sure you want to delete this channel? </h2>
      <button
        className="yes-delete-yeet"
        onClick={handleDeleteChannel}
      >{`Yes 👌`}</button>

      <button
        className="no-delete"
        onClick={handleKeepChannel}
      >{`No ❌`}</button>
    </div>
  );
}

export default DeleteChannelModal;
