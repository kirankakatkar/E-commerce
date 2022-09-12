import { API, endpoints } from "../api/";
import User from "../shared/models/UserModel";

class AuthService {
  static adminLogin(user: User) {
    return API.post(endpoints.api.auth.adminLogin, user);
  }

  static validateToken(token: string) {
    return API.post(endpoints.api.auth.validateToken, { token });
  }
}

export default AuthService;
