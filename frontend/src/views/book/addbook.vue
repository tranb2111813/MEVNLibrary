<template>
  <div
    class="pointer-events-auto fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
  >
    <div
      class="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm max-h-[90%] overflow-y-auto"
    >
      <div class="border-t border-slate-200 py-4 text-slate-600">
        <Form @submit="addbook" :validation-schema="addbookSchema">
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Tên sách</label>
            <Field
              v-model="book.tensach"
              name="tensach"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập tên sách"
            />
            <ErrorMessage name="tensach" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Đơn giá</label>
            <Field
              v-model="book.dongia"
              name="dongia"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập đơn giá"
            />
            <ErrorMessage name="dongia" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Số quyển</label>
            <Field
              v-model="book.soquyen"
              name="soquyen"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập số quyển"
            />
            <ErrorMessage name="soquyen" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Năm xuất bản</label>
            <Field
              v-model="book.namxuatban"
              name="namxuatban"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập năm xuất bản"
            />
            <ErrorMessage name="namxuatban" class="error-feedback" />
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium"
              >Mã nhà xuất bản</label
            >
            <div class="w-full">
              <div class="relative">
                <Field
                  v-model="book.manxb"
                  name="manxb"
                  as="select"
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                >
                  <option value="" disabled selected>Chọn nhà xuất bản</option>
                  <option
                    v-for="nxb in listnxb"
                    :key="nxb.manxb"
                    :value="nxb.manxb"
                  >
                    {{ nxb.tennxb }}
                  </option>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.2"
                    stroke="currentColor"
                    class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </Field>
                <ErrorMessage name="manxb" class="error-feedback" />
              </div>
            </div>
          </div>
          <div class="mb-2">
            <label class="block mb-2 p-2 text-sm font-medium">Tác giả</label>
            <Field
              v-model="book.tacgia"
              name="tacgia"
              type="text"
              class="w-full mb-4 p-2 border rounded-md"
              placeholder="Nhập tên tác giả"
            />
            <ErrorMessage name="tacgia" class="error-feedback" />
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
              class="rounded-md bg-green-600 py-2 px-4 text-sm text-white ml-2 hover:bg-green-700"
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
import ListNXBService from "@/services/listnxb.services.js";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  name: "AddBook",
  props: {
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    const addbookSchema = yup.object().shape({
      tensach: yup
        .string()
        .required("Tên sách không được bỏ trống.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      dongia: yup
        .number()
        .required("Đơn giá không được bỏ trống.")
        .min(1000, "Đơn giá phải lớn hơn 1000.")
        .max(5000000, "Đơn giá phải nhỏ hơn 5.000.000."),
      soquyen: yup
        .number()
        .required("Số quyển không được bỏ trống.")
        .min(2, "Số quyển phải lớn hơn 2.")
        .max(20, "Số quyển phải nhỏ hơn 20."),
      namxuatban: yup
        .number()
        .required("Năm xuất bản không được bỏ trống.")
        .min(1, "Năm xuất bản phải lớn hơn 2000.")
        .max(2024, "Năm xuất bản phải nhỏ hơn 2024."),
      manxb: yup.string().required("Mã nhà xuất bản không được bỏ trống."),
      tacgia: yup
        .string()
        .required("Tên tác giả không được bỏ trống.")
        .min(2, "Tên tác giả phải ít nhất 2 ký tự.")
        .max(50, "Tên tác giả có nhiều nhất 50 ký tự."),
    });
    return {
      addbookSchema,
      listnxb: [],
      book: {
        tensach: "",
        dongia: 0,
        soquyen: 0,
        namxuatban: 0,
        manxb: "",
        tacgia: "",
      },
    };
  },

  methods: {
    addbook() {
      console.log(this.book);
      this.$emit("add-book", this.book);
    },
  },
  async beforeMount() {
    console.log("beforeCreate");
    this.listnxb = await ListNXBService.getAll();
    console.log(this.listnxb);
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.75rem;
}
</style>
