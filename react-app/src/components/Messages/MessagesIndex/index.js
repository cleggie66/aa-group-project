import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingIcon from "../../LoadingPage/LoadingIcon";

import MessageCard from "./MessageCard";
import "./MessagesIndex.css";
import MessageForm from "../MessageForm";
import { useParams } from "react-router-dom";
// import { getAllChannelMessagesThunk } from "../../../store/message";

function MessagesIndex() {
  const sessionUser = useSelector((state) => state.session.user);
  const activeChannel = useSelector((state) => state.activeChannel);

  const messages = useSelector((state) => Object.values(state.messages));

  const allCurrentChannelMessages = messages.filter(
    (e) => activeChannel.id === e.channel_id
  );

  if (!allCurrentChannelMessages) {
    return <LoadingIcon />;
  }
  return (
    <div className="message-dashboard-section">
      <div className="only-messages-div">
      {allCurrentChannelMessages.map((message) => (
        <MessageCard
          key={message.id}
          sessionUser={sessionUser}
          activeChannel={activeChannel}
          message={message}
        />
      ))}
      </div>
      {activeChannel.id && <MessageForm activeChannel={activeChannel} />}
    </div>
  );
}

export default MessagesIndex;
