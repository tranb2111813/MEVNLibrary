<template>
  <div
    class="pointer-events-auto fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
  >
    <div
      class="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm max-h-[90%] overflow-y-auto"
    >
      <div class="border-t border-slate-200 py-4 text-slate-600">
        <Form @submit="editnxb" :validation-schema="editnxbSchema">
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium"
              >Tên nhà xuất bản</label
            >
            <Field
              v-model="nxb.tennxb"
              name="tennxb"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập tên nhà xuất bản"
            />
            <ErrorMessage name="tennxb" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Địa chỉ</label>
            <Field
              v-model="nxb.diachi"
              name="diachi"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập địa chỉ"
            />
            <ErrorMessage name="diachi" class="error-feedback" />
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
  name: "EditNXB",
  props: {
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
    nxb: {
      type: Object,
      required: true,
    },
  },
  data() {
    const editnxbSchema = yup.object().shape({
      tennxb: yup
        .string()
        .required("Tên nhà xuất bản không được bỏ trống.")
        .min(2, "Tên nhà xuất bản phải ít nhất 2 ký tự.")
        .max(50, "Tên nhà xuất bản có nhiều nhất 50 ký tự."),
      diachi: yup
        .string()
        .required("Địa chỉ không được bỏ trống.")
        .min(2, "Địa chỉ phải ít nhất 2 ký tự.")
        .max(100, "Địa chỉ có nhiều nhất 100 ký tự."),
    });
    return {
      editnxbSchema,
    };
  },

  methods: {
    editnxb() {
      this.$emit("edit-nxb", this.nxb);
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
