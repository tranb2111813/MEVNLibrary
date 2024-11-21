import createApiClient from "./api.services";

class ListStaffServices {
  constructor(baseUrl = "/api/nhanvien") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async search(query) {
    const params = new URLSearchParams();
    params.append("hoten", query.hoten);
    return (await this.api.get(`/search?${params}`)).data;
  }
  async sortStaffs(query) {
    const params = new URLSearchParams();
    params.append("query", query.query);
    console.log(params);
    return (await this.api.get(`/sort?${params}`)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async update(id, data) {
    console.log(id, data);
    return (await this.api.put(`/${id}`, data)).data;
  }
}

export default new ListStaffServices();
