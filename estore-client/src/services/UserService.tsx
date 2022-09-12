import { API, endpoints } from "../api";
import User from "../shared/models/UserModel";

class UserService {
  static createUser(user: User) {
    return API.post(endpoints.api.user.create, user);
  }

  static updateUser(id: string, user: User) {
    return API.put(endpoints.api.user.update + id, user);
  }

  static deleteUser(id: string) {
    return API.delete(endpoints.api.user.delete + id);
  }

  static getOneUser(id: string) {
    return API.get(endpoints.api.user.fetchOne + id);
  }

  static getAllUser(query?: string) {
    let url = endpoints.api.user.fetchAll;
    if (query) url += query;
    return API.get(url);
  }
}

export default UserService;
