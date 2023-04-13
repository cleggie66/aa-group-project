import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllWorkspacesThunk } from "../../../store/workspace";
import WorkspaceCard from "./WorkspaceCard";
import { clearActiveChannelThunk } from "../../../store/activeChannel";

const WorkspacesIndex = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const allWorkspaces = useSelector((state) => Object.values(state.workspaces));

  useEffect(() => {
    dispatch(getAllWorkspacesThunk());
    dispatch(clearActiveChannelThunk());
  }, [dispatch]);

  return (
    <>
      <h1>Workspaces</h1>
      <div>
        {allWorkspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}
      </div>
    </>
  );
};

export default WorkspacesIndex;
