import createApiClient from "./api.services";

class ListBorrowReturnBookServices {
  constructor(baseUrl = "/api/mts") {
    this.api = createApiClient(baseUrl);
  }
  async getAll(query) {
    const params = new URLSearchParams();
    if (query?.msdg) {
      params.append("msdg", query?.msdg);
    }
    if (query?.masach) {
      params.append("masach", query?.masach);
    }
    if (query?.trangthai) {
      params.append("trangthai", query?.trangthai);
    }
    console.log(params);
    const response = await this.api.get(`/?${params}`);
    const now = new Date(); // Thời điểm hiện tại
    console.log(now);

    response.data.forEach((element) => {
      const ngaytra = new Date(element.ngaytra);

      if (ngaytra.getTime() < now.getTime() && element.trangthai === "damuon") {
        element.trangthai = "quahan";
      }
    });
    return response.data;
  }
  async create(data) {
    const response = await this.api.post("/", data);
    return response.data;
  }

  async returnBook(id) {
    const response = await this.api.put(id, {
      trangthai: "datra",
      ngaytra: new Date(),
    });
    return response.data;
  }
  async deleteBrook(id) {
    const response = await this.api.delete(id);
    return response.data;
  }
}

export default new ListBorrowReturnBookServices();
