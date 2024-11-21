import createApiClient from "./api.services";

class ListNXBServices {
  constructor(baseUrl = "/api/nxbs") {
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
    params.append("tennxb", query.tennxb);
    return (await this.api.get(`/search?${params}`)).data;
  }
  async sortNXBs(query) {
    const params = new URLSearchParams();
    params.append("query", query.query);
    console.log(params);
    return (await this.api.get(`/sort?${params}`)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
}

export default new ListNXBServices();
