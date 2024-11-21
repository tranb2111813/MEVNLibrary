import createApiClient from "./api.services";
import VueSweetalert2 from "vue-sweetalert2";

class AuthServices {
  constructor(baseUrl = "/api/taikhoan") {
    this.api = createApiClient(baseUrl);
  }
  async login(data) {
    return (await this.api.post("/login", data)).data;
  }
}

export default new AuthServices();
