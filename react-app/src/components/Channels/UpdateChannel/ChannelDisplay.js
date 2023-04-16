import React from "react";
import OpenModalButton from "../../OpenModalButton";
import DeleteChannelModal from "../DeleteChannel";
import EditChannelModal from "./EditChannelModal";
import './ChannelDisplay.css'

const ChannelDisplay = ({ channel, workspaceId }) => {
  return (
    <div className="channel-display-container">
      <h2 className="title-text">{`# ${channel.name}`}</h2>

      <OpenModalButton
        className="delete-channel-button"
        buttonText="delete"
        modalComponent={
          <DeleteChannelModal workspaceId={workspaceId} channel={channel} />
        }
      />
      <OpenModalButton
        className="edit-channel-button"
        buttonText="edit"
        modalComponent={
          <EditChannelModal workspaceId={workspaceId} channel={channel} />
        }
      />
    </div>
  );
};
export default ChannelDisplay;
