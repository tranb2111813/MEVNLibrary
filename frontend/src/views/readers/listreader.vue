<template>
  <div>
    <div class="flex justify-between">
      <Search @search="searchReader" />

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
      <AddReader @close-dialog="closeDialog" @add-reader="addreader" />
    </div>
    <div
      v-if="isEditDialogOpen"
      class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
    >
      <EditReader
        @close-dialog="closeEditDialog"
        :reader="selectedReader"
        @edit-reader="editreader"
      />
    </div>
    <!-- <div
      v-if="isConfirmDialogOpen"
      class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
    >
      <ConfirmDialog
        :title="`Xác nhận xóa độc giả ${selectedReader?.holot} ${selectedReader?.ten}`"
        :message="`Bạn có chắc chắn muốn xóa độc giả ${selectedReader?.holot}${selectedReader?.ten} không?`"
        @reject="closeConfirmDialog"
        @confirm="isconfirm"
      />
    </div> -->

    <div
      class="relative flex flex-col w-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border"
    >
      <table class="w-full text-left min-w-max table-fixed">
        <thead>
          <tr>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Mã số độc giả
              </p>
            </th>
            <th
              @click="onSortByHoLot"
              class="cursor-pointer p-4 border-b border-slate-300 bg-slate-50"
            >
              <p class="block text-sm font-normal leading-none text-slate-500">
                Họ và tên
                <i :class="iconSortByHoLot"></i>
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Phái
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Ngày sinh
              </p>
            </th>
            <th
              class="p-4 border-b border-slate-300 bg-slate-50 w-full flex items-center max-w-sm min-w-[200px]"
            >
              <p class="block text-sm font-normal leading-none text-slate-500">
                Địa chỉ
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Số điện thoại
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
              v-for="(reader, index) in readers"
              :key="index"
              class="hover:bg-slate-50"
            >
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ reader.msdg }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ reader.holot }} {{ reader.ten }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ reader.phai }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ new Date(reader.ngaysinh).toLocaleDateString() }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ reader.diachi }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ reader.sodienthoai }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <div class="row flex">
                  <button
                    @click="openEditDialog(reader)"
                    class="rounded-md rounded-r-none bg-orange-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-orange-600 focus:shadow-none active:bg-orange-700 hover:bg-orange-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Sửa
                  </button>
                  <button
                    @click="deletereader(reader)"
                    class="rounded-md rounded-l-none bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-600 focus:shadow-none active:bg-red-700 hover:bg-red-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="readers.length === 0">
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
import ListReaderService from "@/services/listreader.services.js";
import Search from "@/components/search.vue";
import AddReader from "@/views/readers/addreader.vue";
import EditReader from "@/views/readers/editreader.vue";
export default {
  name: "ListReader",
  components: {
    Search,
    AddReader,
    EditReader,
  },
  data() {
    return {
      readers: [],
      selectedReader: null,
      isDialogOpen: false,
      isEditDialogOpen: false,
      isConfirmDialogOpen: false,
      sortByHoLot: "",
    };
  },
  mounted() {
    this.fetchReaders();
  },
  computed: {
    iconSortByHoLot() {
      if (this.sortByHoLot === "asc") {
        return "fa-solid fa-sort-up ml-2";
      }
      if (this.sortByHoLot === "desc") {
        return "fa-solid fa-sort-down ml-2";
      }
      return "fa-solid fa-sort ml-2";
    },
  },
  methods: {
    async fetchReaders() {
      this.readers = await ListReaderService.getAll();
      console.log(this.readers);
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    async onSortByHoLot() {
      if (this.sortByHoLot === "") {
        this.sortByHoLot = "asc";
      } else if (this.sortByHoLot === "asc") {
        this.sortByHoLot = "desc";
      } else {
        this.sortByHoLot = "";
      }
      this.readers = await ListReaderService.sortReaders({
        query: this.sortByHoLot,
      });
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
    openEditDialog(reader) {
      this.selectedReader = reader;
      this.isEditDialogOpen = true;
    },
    closeEditDialog() {
      console.log("closeEditDialog");
      this.isEditDialogOpen = false;
    },
    async addreader(data) {
      await ListReaderService.create(data);
      this.fetchReaders();
      this.closeDialog();
    },
    async editreader(data) {
      const { _id, ...editeddata } = data;
      this.closeEditDialog();
      await ListReaderService.update(_id, editeddata);
      this.fetchReaders();
    },
    async deletereader(selectedReader) {
      const result = await this.$swal({
        title: `Xác nhận xóa độc giả ${selectedReader?.holot} ${selectedReader?.ten}`,
        text: `Bạn có chắc chắn muốn xóa độc giả ${selectedReader?.holot} ${selectedReader?.ten} không?`,
        icon: "warning",
        showCancelButton: true,
      });
      if (!result.isConfirmed) return;
      await ListReaderService.delete(selectedReader._id);
      this.fetchReaders();
    },
    async searchReader(search) {
      this.readers = await ListReaderService.search({ ten: search });
    },
  },
};
</script>
