import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getWorkspaceByIdThunk } from "../../../store/workspace";
import { getAllChannelsThunk } from "../../../store/channel";
import ChannelCard from "./ChannelCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./ChannelIndex.css";

const ChannelsIndex = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const { workspaceId } = useParams();

  useEffect(() => {
    dispatch(getWorkspaceByIdThunk(workspaceId));
  }, [dispatch, workspaceId]);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch]);

  const allChannels = useSelector((state) => Object.values(state.channels));
  const correctChannels = allChannels.filter(
    (e) => Number(workspaceId) === e.workspace_id
  );
  // console.log(correctChannels)

  // Arrow drop down
  const handleMenuClick = (e) => {
    e.preventDefault();
    setOpenMenu((open) => !open);
  };
  return (
    <>
      <div>{`Workspace Name`}</div>

      <div className="channel-dropdown">
        <FontAwesomeIcon
          icon={faCaretDown}
          style={{ opacity: 0.8 }}
          onClick={handleMenuClick}
        />{" "}
        {"Channels"}
        <div className={`channel-dropdown ${openMenu ? "active" : "inactive"}`}>
          {correctChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
      <div>
        <FontAwesomeIcon icon={faCaretDown} style={{ opacity: 0.8 }} />
        {"Direct messages"}
      </div>
    </>
  );
};

export default ChannelsIndex;
