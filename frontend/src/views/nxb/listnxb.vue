<template>
  <div>
    <div class="flex justify-between">
      <Search @search="searchNXB" />

      <button
        @click="openDialog"
        class="rounded-md bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-600 focus:shadow-none active:bg-green-700 hover:bg-green-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        type="button"
      >
        Thêm
      </button>
    </div>
    <div
      v-if="isDialogOpen"
      class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
    >
      <AddNXB @close-dialog="closeDialog" @add-nxb="addnxb" />
    </div>
    <div
      v-if="isEditDialogOpen"
      class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
    >
      <EditNXB
        @close-dialog="closeEditDialog"
        :nxb="selectedNXB"
        @edit-nxb="editnxb"
      />
    </div>
    <div
      v-if="isConfirmDialogOpen"
      class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
    >
      <ConfirmDialog
        :title="`Xác nhận xóa nhà xuất bản ${selectedNXB?.tennxb}`"
        :message="`Bạn có chắc chắn muốn xóa nhà xuất bản ${selectedNXB?.tennxb} không?`"
        @reject="closeConfirmDialog"
        @confirm="isconfirm"
      />
    </div>

    <div
      class="relative flex flex-col w-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border"
    >
      <table class="w-full text-left min-w-max table-fixed">
        <thead>
          <tr>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Mã nhà xuất bản
              </p>
            </th>
            <th
              @click="onSortByName"
              class="cursor-pointer p-4 border-b border-slate-300 bg-slate-50"
            >
              <p class="block text-sm font-normal leading-none text-slate-500">
                Tên nhà xuất bản <i :class="iconSortByName"></i>
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Địa chỉ
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p
                class="block text-sm font-normal leading-none text-slate-500"
              ></p>
            </th>
          </tr>
        </thead>
      </table>
      <div class="relative max-h-[400px] overflow-y-auto">
        <table class="w-full text-left table-fixed min-w-max">
          <tbody>
            <tr
              v-for="(nxb, index) in nxbs"
              :key="index"
              class="hover:bg-slate-50"
            >
              <td class="p-4 border-b border-slate-200 w-50">
                <p class="block text-sm text-slate-800">
                  {{ nxb.manxb }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200 w-96">
                <p class="block text-sm text-slate-800">
                  {{ nxb.tennxb }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200 w-96">
                <p class="block text-sm text-slate-800">
                  {{ nxb.diachi }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <div class="row flex">
                  <button
                    @click="openEditDialog(nxb)"
                    class="rounded-md rounded-r-none bg-orange-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-orange-600 focus:shadow-none active:bg-orange-700 hover:bg-orange-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Sửa
                  </button>
                  <button
                    @click="deletenxb(nxb)"
                    class="rounded-md rounded-l-none bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-600 focus:shadow-none active:bg-red-700 hover:bg-red-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="nxbs.length === 0">
              <td class="p-4 border-b border-slate-200 text-center" colspan="7">
                <p class="block text">Không có dữ liệu</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import ListNXBService from "@/services/listnxb.services.js";
import Search from "@/components/search.vue";
import AddNXB from "@/views/nxb/addnxb.vue";
import EditNXB from "@/views/nxb/editnxb.vue";
export default {
  name: "ListNXB",
  components: {
    Search,
    AddNXB,
    EditNXB,
  },
  data() {
    return {
      nxbs: [],
      selectedNXB: null,
      isDialogOpen: false,
      isEditDialogOpen: false,
      sortByName: "",
    };
  },
  mounted() {
    this.fetchNXBs();
  },
  computed: {
    iconSortByName() {
      if (this.sortByName === "asc") {
        return "fa-solid fa-sort-up ml-2";
      }
      if (this.sortByName === "desc") {
        return "fa-solid fa-sort-down ml-2";
      }
      return "fa-solid fa-sort ml-2";
    },
  },
  methods: {
    async fetchNXBs() {
      this.nxbs = await ListNXBService.getAll();
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    async onSortByName() {
      if (this.sortByName === "") {
        this.sortByName = "asc";
      } else if (this.sortByName === "asc") {
        this.sortByName = "desc";
      } else {
        this.sortByName = "";
      }
      this.nxbs = await ListNXBService.sortNXBs({
        query: this.sortByName,
      });
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
    openEditDialog(nxb) {
      this.selectedNXB = nxb;
      this.isEditDialogOpen = true;
    },
    closeEditDialog() {
      this.isEditDialogOpen = false;
    },
    async addnxb(data) {
      await ListNXBService.create(data);
      this.fetchNXBs();
      this.closeDialog();
    },
    async editnxb(data) {
      const { _id, ...editeddata } = data;
      await ListNXBService.update(_id, editeddata);
      this.fetchNXBs();
      this.closeEditDialog();
    },
    async deletenxb(selectedNXB) {
      const result = await this.$swal({
        title: `Xác nhận xóa nhà xuất bản ${selectedNXB?.tennxb}`,
        text: `Bạn có chắc chắn muốn xóa nhà xuất bản ${selectedNXB?.tennxb} không?`,
        icon: "warning",
        showCancelButton: true,
        dangerMode: true,
      });
      if (!result.isConfirmed) return;
      await ListNXBService.delete(selectedNXB._id);
      this.fetchNXBs();
    },
    async searchNXB(search) {
      this.nxbs = await ListNXBService.search({ tennxb: search });
    },
  },
};
</script>
