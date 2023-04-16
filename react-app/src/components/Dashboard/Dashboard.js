import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChannelsIndex from "../Channels/ChannelsIndex";
import ActiveWorkspace from "../Workspaces/ActiveWorkspace";
import MessagesIndex from "../Messages/MessagesIndex";
import LoadingPage from "../LoadingPage";
import "./Dashboard.css";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const { workspaceId } = useParams();

  const [loadingVisibility, setLoadingVisibility] = useState("visible");

  useEffect(() => {
    const loadingPageTimer = setTimeout(() => {
      setLoadingVisibility("hidden");
    }, 2500);
    return () => clearTimeout(loadingPageTimer);
  }, [dispatch]);

  return (
    <div className="page">
      {sessionUser && (
        <>
          <LoadingPage visibility={loadingVisibility} />
          <div className="left-bar">
            <ActiveWorkspace workspaceId={workspaceId} />
            <ChannelsIndex workspaceId={workspaceId} />
          </div>
          <div className="right-bar">
            <MessagesIndex workspaceId={workspaceId} />
          </div>
        </>
      )}
      {/* {!sessionUser && !homepage && (
        <>
          <h1>{`To access your Banter please log in`}</h1>
          <button onClick={handleRedirectHome}>Take me Home 🫡</button>
        </>
      )} */}
    </div>
  );
};

export default Dashboard;
