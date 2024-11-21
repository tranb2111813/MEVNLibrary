<template>
  <div>
    <div class="flex justify-between">
      <Search @search="searchStaff" />

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
      <AddStaff @close-dialog="closeDialog" @add-staff="addstaff" />
    </div>
    <div
      v-if="isEditDialogOpen"
      class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
    >
      <EditStaff
        @close-dialog="closeEditDialog"
        :staff="selectedStaff"
        @edit-staff="editstaff"
      />
    </div>
    <div
      v-if="isConfirmDialogOpen"
      class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
    >
      <ConfirmDialog
        :title="`Xác nhận xóa nhân viên ${selectedStaff?.hoten}`"
        :message="`Bạn có chắc chắn muốn xóa nhân viên ${selectedStaff?.hoten} không?`"
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
                Mã nhân viên
              </p>
            </th>
            <th
              @click="onSortByName"
              class="cursor-pointer p-4 border-b border-slate-300 bg-slate-50"
            >
              <p class="block text-sm font-normal leading-none text-slate-500">
                Tên nhân viên
                <i :class="iconSortByName"></i>
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Chức vụ
              </p>
            </th>
            <th class="p-4 border-b border-slate-300 bg-slate-50">
              <p class="block text-sm font-normal leading-none text-slate-500">
                Địa chỉ
              </p>
            </th>
            <th
              class="p-4 border-b border-slate-300 bg-slate-50 w-full flex items-center max-w-sm min-w-[200px]"
            >
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
              v-for="(staff, index) in staffs"
              :key="index"
              class="hover:bg-slate-50"
            >
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ staff.msnv }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ staff.hoten }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ staff.chucvu }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ staff.diachi }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <p class="block text-sm text-slate-800">
                  {{ staff.sodienthoai }}
                </p>
              </td>
              <td class="p-4 border-b border-slate-200">
                <div class="row flex">
                  <button
                    @click="openEditDialog(staff)"
                    class="rounded-md rounded-r-none bg-orange-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-orange-600 focus:shadow-none active:bg-orange-700 hover:bg-orange-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Sửa
                  </button>
                  <button
                    @click="deletestaff(staff)"
                    class="rounded-md rounded-l-none bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-600 focus:shadow-none active:bg-red-700 hover:bg-red-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="staffs.length === 0">
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
import ListStaffService from "@/services/liststaff.services.js";
import Search from "@/components/search.vue";
import AddStaff from "@/views/staff/addstaff.vue";
import EditStaff from "@/views/staff/editstaff.vue";
export default {
  name: "ListStaff",
  components: {
    Search,
    AddStaff,
    EditStaff,
  },
  data() {
    return {
      staffs: [],
      selectedStaff: null,
      isDialogOpen: false,
      isEditDialogOpen: false,
      sortByName: "",
    };
  },
  mounted() {
    this.fetchStaffs();
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
    async fetchStaffs() {
      this.staffs = await ListStaffService.getAll();
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
      this.staffs = await ListStaffService.sortStaffs({
        query: this.sortByName,
      });
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
    openEditDialog(staff) {
      this.selectedStaff = staff;
      this.isEditDialogOpen = true;
    },
    closeEditDialog() {
      this.isEditDialogOpen = false;
    },
    async addstaff(data) {
      this.closeDialog();
      await ListStaffService.create(data);
      this.fetchStaffs();
    },
    async editstaff(data) {
      const { _id, password, ...editeddata } = data;
      if (password !== null && password !== "") {
        editeddata.password = password;
      }

      await ListStaffService.update(_id, editeddata);
      this.fetchStaffs();
      this.closeEditDialog();
    },
    async deletestaff(selectedStaff) {
      const result = await this.$swal({
        title: `Xác nhận xóa nhân viên ${selectedStaff?.hoten}`,
        text: `Bạn có chắc chắn muốn xóa nhân viên ${selectedStaff?.hoten} không?`,
        icon: "warning",
        showCancelButton: true,
        dangerMode: true,
      });
      if (!result.isConfirmed) return;
      await ListStaffService.delete(selectedStaff._id);
      this.fetchStaffs();
    },
    async searchStaff(search) {
      this.staffs = await ListStaffService.search({ hoten: search });
    },
  },
};
</script>
