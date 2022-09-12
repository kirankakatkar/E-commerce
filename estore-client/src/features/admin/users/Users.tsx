import * as React from "react";
import UserList from "./UserList";

interface IUsersProps {}

const Users: React.FunctionComponent<IUsersProps> = (props) => {
  return (
    <>
      <UserList />
    </>
  );
};

export default Users;
