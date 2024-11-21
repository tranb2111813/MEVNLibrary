<template>
  <div
    class="relative flex-col rounded-xl bg-transparent flex justify-center items-center h-full"
  >
    <h4 class="block text-xl font-medium text-slate-800">Đăng nhập</h4>
    <p class="text-slate-500 font-light">
      Đăng nhập để sử dụng các tính năng của hệ thống
    </p>
    <Form
      @submit="login"
      :validation-schema="loginSchema"
      class="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
    >
      <div class="mb-1 flex flex-col gap-6">
        <div class="w-full max-w-sm min-w-[200px]">
          <label class="block mb-2 text-sm text-slate-600">
            Tên đăng nhập
          </label>
          <Field
            name="username"
            v-model="loginData.username"
            type="text"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Nhập tên đăng nhập"
          />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="w-full max-w-sm min-w-[200px]">
          <label class="block mb-2 text-sm text-slate-600"> Mật khẩu </label>
          <Field
            name="password"
            v-model="loginData.password"
            type="password"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Nhập mật khẩu"
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
      </div>

      <button
        class="mt-4 w-full rounded-md bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-green-600 focus:bg-green-600 focus:shadow-none active:bg-green-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="submit"
      >
        Đăng nhập
      </button>
      <p class="flex justify-center mt-6 text-sm text-slate-600">
        Bạn chưa có tài khoản ?
        <a
          href="mailto:vib2111830@student.ctu.edu.vn"
          class="ml-1 text-sm font-semibold text-slate-700 underline"
        >
          Liên hệ quản trị viên
        </a>
      </p>
    </Form>
  </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage, FieldArray } from "vee-validate";
import AuthService from "@/services/auth.services.js";
export default {
  name: "LoginPage",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const loginSchema = yup.object().shape({
      username: yup
        .string()
        .required("Tên đăng nhập không được bỏ trống.")
        .min(2, "Tên đăng nhập phải có ít nhất 2 ký tự.")
        .max(50, "Tên đăng nhập có nhiều nhất 50 ký tự."),
      password: yup
        .string()
        .required("Mật khẩu không được bỏ trống.")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự ."),
    });
    return {
      loginSchema,
      loginData: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    async login() {
      try {
        const response = await AuthService.login(this.loginData);
        const { token, role } = response;
        console.log(response);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        this.$router.push({ name: "brbook" });
      } catch (err) {
        this.$swal({
          width: 500,
          position: "top-end",
          toast: true,
          title: `Đăng nhập không thành công `,
          text: `Tên đăng nhập hoặc mật khẩu không chính xác`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
        this.loginData.password = "";
      }
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
