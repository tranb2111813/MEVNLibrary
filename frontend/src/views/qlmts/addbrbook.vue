<template>
  <div
    class="pointer-events-auto fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm"
  >
    <div
      class="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm max-h-[90%] overflow-y-auto"
    >
      <div class="border-t border-slate-200 py-4 text-slate-600">
        <Form @submit="addbrbook" :validation-schema="addbrbookSchema">
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Độc giả</label>
            <div class="w-full max-w-sm min-w-[200px]">
              <div class="relative">
                <Field
                  v-model="brbook.msdg"
                  name="msdg"
                  as="select"
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                >
                  <option value="" disabled selected>Chọn độc giả</option>
                  <option
                    v-for="reader in listreader"
                    :key="reader.msdg"
                    :value="reader._id"
                  >
                    {{ reader.msdg + " - " + reader.holot + " " + reader.ten }}
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
                <ErrorMessage name="msdg" class="error-feedback" />
              </div>
            </div>
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium">Sách</label>
            <div class="w-full max-w-sm min-w-[200px]">
              <div class="relative">
                <Field
                  v-model="brbook.masach"
                  name="masach"
                  as="select"
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                >
                  <option value="" disabled selected>Chọn sách</option>
                  <option
                    v-for="book in listbook"
                    :key="book.masach"
                    :value="book._id"
                  >
                    {{ book.masach + " - " + book.tensach }}
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
                <ErrorMessage name="masach" class="error-feedback" />
              </div>
            </div>
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
import ListReaderService from "@/services/listreader.services.js";
import ListBookService from "@/services/listbook.services.js";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  name: "AddBrbook",
  props: {
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    const addbrbookSchema = yup.object().shape({
      msdg: yup
        .string()
        .required("Độc giả không được bỏ trống.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      masach: yup
        .string()
        .required("Sách không được bỏ trống.")
        .min(2, "Tên tác giả phải ít nhất 2 ký tự.")
        .max(50, "Tên tác giả có nhiều nhất 50 ký tự."),
    });
    return {
      addbrbookSchema,
      listreader: [],
      listbook: [],
      brbook: {
        msdg: "",
        masach: "",
      },
    };
  },

  methods: {
    addbrbook() {
      console.log(this.brbook);
      this.$emit("add-brbook", this.brbook);
    },
  },
  async beforeMount() {
    this.listreader = await ListReaderService.getAll();
    this.listbook = await ListBookService.getAll();
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.75rem;
}
</style>
