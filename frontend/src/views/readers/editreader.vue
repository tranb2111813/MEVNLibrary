<template>
  <div
    class="pointer-events-auto fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
  >
    <div
      class="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm max-h-[90%] overflow-y-auto"
    >
      <div class="border-t border-slate-200 py-4 text-slate-600">
        <Form @submit="editreader" :validation-schema="editreaderSchema">
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Họ đệm</label>
            <Field
              v-model="reader.holot"
              name="holot"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập họ đệm"
            />
            <ErrorMessage name="holot" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Tên</label>
            <Field
              v-model="reader.ten"
              name="ten"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập tên"
            />
            <ErrorMessage name="ten" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Ngày sinh</label>
            <Field
              v-model="reader.ngaysinh"
              name="ngaysinh"
              type="date"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập ngày sinh"
            />
            <ErrorMessage name="ngaysinh" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Phái</label>
            <Field
              v-model="reader.phai"
              name="phai"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập phái"
            />
            <ErrorMessage name="phai" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Địa chỉ</label>
            <Field
              v-model="reader.diachi"
              name="diachi"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập địa chỉ"
            />
            <ErrorMessage name="diachi" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Số điện thoại</label>
            <Field
              v-model="reader.sodienthoai"
              name="sodienthoai"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập số điện thoại"
            />
            <ErrorMessage name="sodienthoai" class="error-feedback" />
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
  name: "EditReader",
  props: {
    reader: {
      type: Object,
      required: true,
    },
  },
  data() {
    const editreaderSchema = yup.object().shape({
      holot: yup
        .string()
        .required("Họ đệm độc giả không được bỏ trống.")
        .min(2, "Họ đệm độc giả phải ít nhất 2 ký tự.")
        .max(50, "Họ đệm độc giả có nhiều nhất 50 ký tự."),
      ten: yup
        .string()
        .required("Tên độc giả không được bỏ trống.")
        .min(2, "Tên độc giả phải ít nhất 2 ký tự.")
        .max(50, "Tên độc giả có nhiều nhất 50 ký tự."),
      ngaysinh: yup
        .date()
        .required("Ngày sinh không được bỏ trống.")
        .max(new Date(), "Ngày sinh không được lớn hơn ngày hiện tại.")
        .typeError("Ngày sinh không hợp lệ."),

      phai: yup
        .string()
        .required("Giới tính không được bỏ trống.")
        .oneOf(["Nam", "Nữ", "Khác"], "Giới tính không hợp lệ."),

      diachi: yup
        .string()
        .required("Địa chỉ không được bỏ trống.")
        .min(2, "Địa chỉ phải ít nhất 2 ký tự.")
        .max(100, "Địa chỉ có nhiều nhất 100 ký tự."),
      sodienthoai: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });
    return {
      editreaderSchema,
    };
  },

  methods: {
    editreader() {
      console.log(this.reader);
      this.$emit("edit-reader", this.reader);
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
