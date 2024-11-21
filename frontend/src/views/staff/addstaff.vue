<template>
  <div
    class="pointer-events-auto fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
  >
    <div
      class="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm max-h-[90%] overflow-y-auto"
    >
      <div class="border-t border-slate-200 py-4 text-slate-600">
        <Form @submit="addstaff" :validation-schema="addstaffSchema">
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Tên nhân viên</label>
            <Field
              v-model="staff.hoten"
              name="hoten"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập tên nhân viên"
            />
            <ErrorMessage name="hoten" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Địa chỉ</label>
            <Field
              v-model="staff.diachi"
              name="diachi"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập địa chỉ"
            />
            <ErrorMessage name="diachi" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Chức vụ</label>
            <Field
              v-model="staff.chucvu"
              name="chucvu"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập chức vụ"
            />
            <ErrorMessage name="chucvu" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Số điện thoại</label>
            <Field
              v-model="staff.sodienthoai"
              name="sodienthoai"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập số điện thoại"
            />
            <ErrorMessage name="sodienthoai" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Mật khẩu</label>
            <Field
              v-model="staff.password"
              name="password"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập mật khẩu"
            />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="flex justify-end pt-4">
            <button
              @click="$emit('close-dialog')"
              class="rounded-md border py-2 px-4 text-sm text-slate-600 hover:bg-slate-100"
              type="button"
            >
              Hủy
            </button>
            <button
              class="rounded-md bg-orange-600 py-2 px-4 text-sm text-white ml-2 hover:bg-orange-700"
              type="submit"
            >
              Lưu
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  name: "AddStaff",
  props: {
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    const addstaffSchema = yup.object().shape({
      hoten: yup
        .string()
        .required("Tên nhân viên không được bỏ trống.")
        .min(2, "Tên nhân viên phải ít nhất 2 ký tự.")
        .max(50, "Tên nhân viên có nhiều nhất 50 ký tự."),
      diachi: yup
        .string()
        .required("Địa chỉ không được bỏ trống.")
        .min(2, "Địa chỉ phải ít nhất 2 ký tự.")
        .max(100, "Địa chỉ có nhiều nhất 100 ký tự."),
      chucvu: yup
        .string()
        .required("Chức vụ không được bỏ trống.")
        .min(2, "Chức vụ phải ít nhất 2 ký tự.")
        .max(50, "Chức vụ có nhiều nhất 50 ký tự."),
      sodienthoai: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      password: yup
        .string()
        .required("Mật khẩu không được bỏ trống.")
        .min(8, "Mật khẩu phải ít nhất 8 ký tự.")
        .max(50, "Mật khẩu có nhiều nhất 50 ký tự."),
    });
    return {
      addstaffSchema,
      staff: {
        hoten: "",
        diachi: "",
        chucvu: "",
        sodienthoai: "",
        password: "",
      },
    };
  },

  methods: {
    addstaff() {
      console.log(this.staff);
      this.$emit("add-staff", this.staff);
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.75rem;
}
</style>
