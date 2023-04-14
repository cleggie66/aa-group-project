import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMessageThunk } from "../../../store/message";
import { useModal } from "../../../context/Modal";
import { loadActiveChannel } from "../../../store/activeChannel";

function EditMessageModal({ message, activeChannelId }) {

  const dispatch = useDispatch();
  const [content, setContent] = useState(message.content);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  const handleInputErrors = () => {
    const errorsObj = {};
    if (content.length === 0) {
      errorsObj.content = "Text is required";
    }
    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [content]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const messageInformation = {
        content,
      };

      await dispatch(updateMessageThunk(messageInformation, message.id));
      await dispatch(loadActiveChannel(activeChannelId))
      closeModal();
    }
    setHasSubmitted(true);
  };

  return (
    <>
      <h1>Edit Your Message</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Text
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <p></p>
        {hasSubmitted && errors.content && (
          <p className="errors">{errors.text}</p>
        )}
        <input
          type="submit"
          value={"Update Message"}
          disabled={hasSubmitted && Object.values(errors).length > 0}
        />
      </form>
    </>
  );
}

export default EditMessageModal;
