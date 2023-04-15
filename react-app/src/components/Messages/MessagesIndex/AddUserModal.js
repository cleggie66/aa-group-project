import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import UsersInWorkspaceSearchResults from "./UserSearchResults";
import { useSelector } from "react-redux";
// import SearchResults from "./SearchResults";

function AddUserToChannelModal() {
  const [username, setUsername] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const activeWorkspace = useSelector((state) => state.activeWorkspace);
  const workspaceId = activeWorkspace.id;

  const currentworkspace = useSelector((state) => state.workspaces);
  const usersInWorkspace = currentworkspace[workspaceId].users_in_workspaces;
  const allIdsOfUsersInWorkspace = [];
  usersInWorkspace.map((e) => allIdsOfUsersInWorkspace.push(e.id));

  // I have a list of all the users in a workspace
  // I could get all the ids for users in a workspace and do a nested for each .

  useEffect(async () => {
    if (username.length) {
      const results = await fetch(`/api/users/${username}`);
      const data = await results.json();
      setSearchResult(data);
    }
  }, [username]);

  const searchResultsCurrentWorkspace = searchResult.filter((e) =>
    allIdsOfUsersInWorkspace.includes(e.id)
  );

  return (
    <>
      <h2 className="title-text">Add people to your channel!</h2>
      <input
        className="search-input-login"
        type="search"
        placeholder="Add a user by username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FontAwesomeIcon
        id="search-icon"
        className="title-text"
        icon={faMagnifyingGlass}
      />
      <h3 className="title-text">All Users</h3>
      <div className="title-text">
        {searchResultsCurrentWorkspace.map((user) => (
          <UsersInWorkspaceSearchResults key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}

export default AddUserToChannelModal;
