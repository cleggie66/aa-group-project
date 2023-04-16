import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkspaceByIdThunk } from "../../../store/workspace";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import ManageWorkspaceModal from "./ManageWorkspaceModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "../../Dashboard/Dashboard.css";
import { loadActiveWorkspace } from "../../../store/activeWorkspace";


const ActiveWorkspace = () => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const { setModalContent, setOnModalClose } = useModal();

  useEffect(() => {
    dispatch(getWorkspaceByIdThunk(workspaceId));
  }, [dispatch, workspaceId]);

  const activeWorkspace = useSelector((state) => state.workspaces);
  const newActiveWorkspace = activeWorkspace[workspaceId];

  if (!newActiveWorkspace) {
    return null;
  }

  const handleWorkspaceNameClick = () => {
    setModalContent(<ManageWorkspaceModal workspace={newActiveWorkspace} workspaceId={workspaceId}/>);
    dispatch(loadActiveWorkspace(workspaceId))
  };

  return (
    <>
      <button
      className="dashboard-workspace-name"
      onClick={handleWorkspaceNameClick}
    >
      {`${newActiveWorkspace.name}`}
      <FontAwesomeIcon id="workspace-arrow-down" icon={faAngleDown} />
    </button>
  </>
);
};

export default ActiveWorkspace;
