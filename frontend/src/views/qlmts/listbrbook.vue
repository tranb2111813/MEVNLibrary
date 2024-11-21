<template>
  <div>
    <div class="flex justify-between">
      <FilterBrbook @filter="onFilter" />
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
      <AddBrbook @close-dialog="closeDialog" @add-brbook="addbrbook" />
    </div>
    <div
      v-if="isEditDialogOpen"
      class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
    >
      <Editbrbook
        @close-dialog="closeEditDialog"
        :brbook="selectedBrbook"
        @edit-brbook="editbrbook"
      />
    </div>
    <div
      v-if="isConfirmDialogOpen"
      class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
    >
      <ConfirmDialog
        :title="`Xác nhận xóa lịch sử mượn trả sách của ${selectedBrbook?.msdg}`"
        :message="`Bạn có chắc chắn muốn xóa lịch sử mượn trả sách của ${selectedBrbook?.msdg} không?`"
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
                Độc giả
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50 w-1/6">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Sách
              </p>
            </th>
            <th
              class="cursor-pointer p-4 border-b border-slate-300 bg-slate-50"
            >
              <p class="block text-sm font-normal leading-none text-slate-500">
                Ngày mượn
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Ngày trả
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Trạng thái
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
              v-for="(brbook, index) in brbooks"
              :key="index"
              class="hover:bg-slate-50"
            >
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ brbook.msdg.holot + " " + brbook.msdg.ten }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200 w-1/6">
                <p class="block text-sm text-slate-800">
                  {{ brbook.masach.tensach }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ new Date(brbook.ngaymuon).toLocaleDateString() }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ new Date(brbook.ngaytra).toLocaleDateString() }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{
                    brbook.trangthai === "damuon"
                      ? "Đang mượn"
                      : brbook.trangthai === "quahan"
                      ? "Quá hạn"
                      : "Đã trả"
                  }}
                </p>
              </td>

              <td class="p-4 border-b border-slate-200">
                <div class="row flex">
                  <!-- Nút "Trả sách" khi sách đang mượn -->
                  <button
                    v-if="brbook.trangthai === 'damuon'"
                    @click="handleReturnbook(brbook)"
                    class="rounded-md rounded-r-none text-white bg-blue-500 py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-blue-600 focus:shadow-none active:bg-blue-700 hover:bg-blue-600 active:shadow-none"
                    type="button"
                  >
                    Trả sách
                  </button>

                  <!-- Nút "Trả sách" khi sách quá hạn -->
                  <button
                    v-if="brbook.trangthai === 'quahan'"
                    @click="handleReturnbook(brbook)"
                    class="rounded-md rounded-r-none text-white bg-orange-500 py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-orange-600 focus:shadow-none active:bg-orange-700 hover:bg-orange-600 active:shadow-none"
                    type="button"
                  >
                    Trả sách
                  </button>

                  <!-- Nút "Trả sách" khi sách đã trả (disabled) -->
                  <button
                    v-if="brbook.trangthai === 'datra'"
                    class="rounded-md rounded-r-none text-neutral-950 bg-gray-300 py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md cursor-not-allowed opacity-50"
                    type="button"
                    disabled
                  >
                    Trả sách
                  </button>

                  <button
                    @click="deletebrbook(brbook)"
                    class="rounded-md rounded-l-none bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-600 focus:shadow-none active:bg-red-700 hover:bg-red-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="brbooks.length === 0">
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
import ListbrbookService from "@/services/listbrbook.services.js";
import Search from "@/components/search.vue";
import AddBrbook from "@/views/qlmts/addbrbook.vue";
import FilterBrbook from "@/views/qlmts/filterbrbook.vue";
export default {
  name: "ListBrbook",
  components: {
    Search,
    AddBrbook,
    FilterBrbook,
  },
  data() {
    return {
      brbooks: [],
      selectedBrbook: null,
      isDialogOpen: false,
      isEditDialogOpen: false,
      sortByDonGia: "",
    };
  },
  mounted() {
    this.fetchBrbooks();
  },
  computed: {
    iconSortByDonGia() {
      if (this.sortByDonGia === "asc") {
        return "fa-solid fa-sort-up ml-2";
      }
      if (this.sortByDonGia === "desc") {
        return "fa-solid fa-sort-down ml-2";
      }
      return "fa-solid fa-sort ml-2";
    },
  },
  methods: {
    async fetchBrbooks() {
      this.brbooks = await ListbrbookService.getAll();
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    async onSortByDonGia() {
      if (this.sortByDonGia === "") {
        this.sortByDonGia = "asc";
      } else if (this.sortByDonGia === "asc") {
        this.sortByDonGia = "desc";
      } else {
        this.sortByDonGia = "";
      }
      this.brbooks = await ListbrbookService.sortBrbooks({
        query: this.sortByDonGia,
      });
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
    openEditDialog(brbook) {
      this.selectedBrbook = brbook;
      this.isEditDialogOpen = true;
    },
    closeEditDialog() {
      this.isEditDialogOpen = false;
    },
    async addbrbook(data) {
      await ListbrbookService.create(data);
      this.fetchBrbooks();
      this.closeDialog();
    },

    async handleReturnbook(selectedBrbook) {
      const result = await this.$swal({
        title: `Xác nhận trả sách`,
        text: `Xác nhận ${selectedBrbook?.msdg.holot} ${selectedBrbook?.msdg.ten} sẽ trả sách ${selectedBrbook?.masach.tensach} cho thư viện?`,
        icon: "warning",
        showCancelButton: true,
        dangerMode: true,
      });
      if (!result.isConfirmed) return;
      await ListbrbookService.returnBook(selectedBrbook._id);
      this.fetchBrbooks();
    },
    async deletebrbook(selectedBrbook) {
      const result = await this.$swal({
        title: `Xác nhận xóa sách `,
        text: `Bạn có chắc chắn muốn thông tin mượn sách ${selectedBrbook.masach.tensach} của ${selectedBrbook.msdg.holot} ${selectedBrbook.msdg.ten}không?`,
        icon: "warning",
        showCancelButton: true,
        dangerMode: true,
      });
      if (!result.isConfirmed) return;
      await ListbrbookService.deleteBrook(selectedBrbook._id);
      this.fetchBrbooks();
    },
    async onFilter(msdg, masach, trangthai) {
      this.brbooks = await ListbrbookService.getAll({
        msdg,
        masach,
        trangthai,
      });
    },
  },
};
</script>
