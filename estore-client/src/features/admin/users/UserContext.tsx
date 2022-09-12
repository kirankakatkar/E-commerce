import * as React from "react";
import User from "../../../shared/models/UserModel";

interface ContextProps {
  open: boolean;
  operation: string;
  initialUser: User;
  handleClose: () => void;
  loadUsers: Function;
}

const UserContext = React.createContext<ContextProps>({
  open: false,
  operation: "add",
  loadUsers: () => {},
  handleClose: () => {},
  initialUser: {},
});

export default UserContext;
