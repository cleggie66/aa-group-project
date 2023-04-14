import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditMessageModal from "../EditMessageModal";
import DeleteMessageModal from "../DeleteMessageModal";
import OpenModalButton from "../../OpenModalButton";


const MessageCard = ({ message, sessionUser, activeChannel }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div>
      <div key={message.id} className="message">
        <div className="message-content">
          <div className="image-container">
            <img
              src={message.message_owner.profile_picture}
              alt="profile"
              className="message-profile-pic"
            />
          </div>
          <div className="message-details">
            <h4>{message.message_owner.first_name}</h4>
            <p>{message.content}</p>
          </div>
        </div>
        {sessionUser.id === message.message_owner.id && (
          <div className="message-buttons">
            <OpenModalButton
              buttonText="edit"
              modalComponent={
                <EditMessageModal
                  message={message}
                  activeChannelId={activeChannel.channel_in_workspace.id}
                />
              }
            />
            {/* <button>Delete</button> */}
            <OpenModalButton
              buttonText="delete"
              modalComponent={
                <DeleteMessageModal
                  message={message}
                  activeChannelId={activeChannel.channel_in_workspace.id}
                />
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default MessageCard;
