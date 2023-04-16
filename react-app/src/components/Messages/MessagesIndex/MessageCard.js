import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditMessageModal from "../EditMessageModal";
import OpenModalButton from "../../OpenModalButton";
import { deleteMessageThunk } from "../../../store/message";

const MessageCard = ({ message, sessionUser, activeChannel }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const handleDeleteMessage = async (e) => {
    e.preventDefault();

    await dispatch(deleteMessageThunk(message.id));
  };

  return (
    <div>
      <div key={message.id} className="message">
        <div className="message-content">
          <div className="image-container">
            <img
              src={
                message.message_owner.profile_picture === null
                  ? message.message_owner.name[0]
                  : message.message_owner.profile_picture
              }
              alt="profile"
              className="message-profile-pic"
            />
          </div>
          <div className="message-details">
            <h4 className="message-sender-first-name">
              {message.message_owner.first_name}
            </h4>
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
                  activeChannelId={activeChannel.id}
                />
              }
            />
            <button onClick={handleDeleteMessage}>delete test</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default MessageCard;
