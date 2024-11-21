import createApiClient from "./api.services";

class ListbookServices {
  constructor(baseUrl = "/api/sach") {
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
    params.append("tensach", query.tensach);
    return (await this.api.get(`/search?${params}`)).data;
  }
  async sortBooks(query) {
    const params = new URLSearchParams();
    params.append("query", query.query);
    console.log(params);
    return (await this.api.get(`/sort?${params}`)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new ListbookServices();
