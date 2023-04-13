import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllWorkspacesThunk } from "../../../store/workspace";
import WorkspaceCard from "./WorkspaceCard";
import { clearActiveChannelThunk } from "../../../store/activeChannel";
import './WorkSpacesIndex.css'

const WorkspacesIndex = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const allWorkspaces = useSelector((state) => Object.values(state.workspaces));

  useEffect(() => {
    dispatch(getAllWorkspacesThunk());
    dispatch(clearActiveChannelThunk())
  }, [dispatch]);



  console.log(allWorkspaces);
  // const allOwnedWorkspaces = allWorkspaces.filter(
  //     (e) => sessionUser.id === e.owner_id
  //   );
  //   console.log(allOwnedWorkspaces)

  // if (!allWorkspaces) return null;

  return (
    <>
      <h1>Your Workspaces</h1>
      <div className="workspace-list-area">
        {allWorkspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}
      </div>
    </>
  );
};

export default WorkspacesIndex;
