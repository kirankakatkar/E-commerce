import UserService from "../../../services/UserService";
import { addLoggedUser } from "../../../app/slices/AuthSlice";

// thunk action creator
export const loadSingleUser = (id: string) => {
  // thunk function
  return (dispatch: any) => {
    UserService.getOneUser(id)
      .then((response) => {
        dispatch(addLoggedUser(response.data.data));
      })
      .catch((err) => {
        console.log("Could not loaded the user", err);
      });
  };
};
