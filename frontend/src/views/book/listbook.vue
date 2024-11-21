<template>
  <div>
    <div class="flex justify-between">
      <Search @search="searchBook" />

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
      <AddBook @close-dialog="closeDialog" @add-book="addbook" />
    </div>
    <div
      v-if="isEditDialogOpen"
      class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
    >
      <Editbook
        @close-dialog="closeEditDialog"
        :book="selectedBook"
        @edit-book="editbook"
      />
    </div>
    <div
      v-if="isConfirmDialogOpen"
      class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
    >
      <ConfirmDialog
        :title="`Xác nhận xóa sách ${selectedBook?.tensach}`"
        :message="`Bạn có chắc chắn muốn xóa sách ${selectedBook?.tensach} không?`"
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
                Mã sách
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50 w-1/6">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Tên sách
              </p>
            </th>
            <th
              @click="onSortByDonGia"
              class="cursor-pointer p-4 border-b border-slate-300 bg-slate-50"
            >
              <p class="block text-sm font-normal leading-none text-slate-500">
                Đơn giá
                <i :class="iconSortByDonGia"></i>
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Số quyển
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Năm xuất bản
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50 w-1/5">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Tác giả
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
              v-for="(book, index) in books"
              :key="index"
              class="hover:bg-slate-50"
            >
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ book.masach }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200 w-1/6">
                <p class="block text-sm text-slate-800">
                  {{ book.tensach }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ book.dongia }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ book.soquyen }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ book.namxuatban }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200 w-1/5">
                <p class="block text -sm text-slate-800">
                  {{ book.tacgia }}
                </p>
              </td>

              <td class="p-4 border-b border-slate-200">
                <div class="row flex">
                  <button
                    @click="openEditDialog(book)"
                    class="rounded-md rounded-r-none bg-orange-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-orange-600 focus:shadow-none active:bg-orange-700 hover:bg-orange-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Sửa
                  </button>
                  <button
                    @click="deletebook(book)"
                    class="rounded-md rounded-l-none bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-600 focus:shadow-none active:bg-red-700 hover:bg-red-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="books.length === 0">
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
import ListbookService from "@/services/listbook.services.js";
import Search from "@/components/search.vue";
import AddBook from "@/views/book/addbook.vue";
import Editbook from "@/views/book/editbook.vue";
export default {
  name: "ListBook",
  components: {
    Search,
    AddBook,
    Editbook,
  },
  data() {
    return {
      books: [],
      selectedBook: null,
      isDialogOpen: false,
      isEditDialogOpen: false,
      sortByDonGia: "",
    };
  },
  mounted() {
    this.fetchBooks();
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
    async fetchBooks() {
      this.books = await ListbookService.getAll();
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
      this.books = await ListbookService.sortBooks({
        query: this.sortByDonGia,
      });
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
    openEditDialog(book) {
      this.selectedBook = book;
      this.isEditDialogOpen = true;
    },
    closeEditDialog() {
      this.isEditDialogOpen = false;
    },
    async addbook(data) {
      await ListbookService.create(data);
      this.fetchBooks();
      this.closeDialog();
    },
    async editbook(data) {
      const { _id, ...editeddata } = data;
      await ListbookService.update(_id, editeddata);
      this.fetchBooks();
      this.closeEditDialog();
    },
    async deletebook(selectedBook) {
      const result = await this.$swal({
        title: `Xác nhận xóa sách ${selectedBook?.tensach}`,
        text: `Bạn có chắc chắn muốn xóa sách ${selectedBook?.tensach} không?`,
        icon: "warning",
        showCancelButton: true,
        dangerMode: true,
      });
      if (!result.isConfirmed) return;
      await ListbookService.delete(selectedBook._id);
      this.fetchBooks();
    },
    async searchBook(search) {
      this.books = await ListbookService.search({ tensach: search });
    },
  },
};
</script>
