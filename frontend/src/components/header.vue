<template>
  <nav
    class="block w-full px-4 py-2 mx-auto bg-white bg-opacity-90 sticky shadow lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150 z-[10]"
  >
    <div
      class="container flex flex-wrap items-center justify-between mx-auto text-slate-800"
    >
      <a
        href="#"
        class="mr-4 block cursor-pointer py-1.5 text-2xl text-slate-800 font-semibold"
      >
        Quản lí thư viện
      </a>
      <button
        v-if="isShow"
        @click="logout"
        class="block w-30 px-4 py-2 rounded-md bg-white text-red-600 hover:text-red-900 text-sm font-medium"
      >
        Đăng xuất
      </button>
      <div v-if="isShow" class="w-full flex justify-center">
        <div class="bg-white border-slate-300 shadow-sm">
          <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
              <div class="hidden lg:flex space-x-4">
                <router-link
                  :to="{ name: 'brbook' }"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium',
                    isactive('brbook')
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-800 hover:text-white',
                  ]"
                >
                  Mượn trả sách
                </router-link>
                <router-link
                  :to="{ name: 'listbook' }"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium',
                    isactive('listbook')
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-800 hover:text-white',
                  ]"
                >
                  Quản lí sách
                </router-link>
                <router-link
                  :to="{ name: 'listreader' }"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium',
                    isactive('listreader')
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-800 hover:text-white',
                  ]"
                >
                  Quản lí độc giả
                </router-link>
                <router-link
                  :to="{ name: 'listnxb' }"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium',
                    isactive('listnxb')
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-800 hover:text-white',
                  ]"
                >
                  Quản lí nhà xuất bản
                </router-link>
                <router-link
                  v-if="isadmin"
                  :to="{ name: 'liststaff' }"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium',
                    isactive('liststaff')
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-800 hover:text-white',
                  ]"
                >
                  Quản lí nhân viên
                </router-link>
              </div>

              <div class="lg:hidden">
                <button
                  @click="toggleMenu"
                  class="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
                >
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile Menu
          <div class="lg:hidden" v-show="isMenuOpen" @click.outside="closeMenu">
            <div class="px-2 pt-2 pb-3 space-y-1">
              <router-link
                :to="{ name: 'brbook' }"
                :class="[
                  'block px-4 py-2 rounded-md text-sm font-medium',
                  isactive('brbook')
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-600 hover:bg-slate-800 hover:text-white',
                ]"
              >
                Mượn trả sách
              </router-link>
              <router-link
                :to="{ name: 'listbook' }"
                :class="[
                  'block px-4 py-2 rounded-md text-sm font-medium',
                  isactive('listbook')
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-600 hover:bg-slate-800 hover:text-white',
                ]"
              >
                Quản lí sách
              </router-link>
              <router-link
                :to="{ name: 'listreader' }"
                :class="[
                  'block px-4 py-2 rounded-md text-sm font-medium',
                  isactive('listreader')
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-600 hover:bg-slate-800 hover:text-white',
                ]"
              >
                Quản lí độc giả
              </router-link>
              <router-link
                :to="{ name: 'listnxb' }"
                :class="[
                  'block px-4 py-2 rounded-md text-sm font-medium',
                  isactive('listnxb')
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-600 hover:bg-slate-800 hover:text-white',
                ]"
              >
                Quản lí nhà xuất bản
              </router-link>
              <router-link
                :to="{ name: 'liststaff' }"
                :class="[
                  'block px-4 py-2 rounded-md text-sm font-medium',
                  isactive('liststaff')
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-600 hover:bg-slate-800 hover:text-white',
                ]"
              >
                Quản lí nhân viên
              </router-link>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "AppHeader",
  computed: {
    isShow() {
      return this.$route.name !== "login";
    },
    isadmin() {
      return localStorage.getItem("role") === "admin";
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },
    isactive(name) {
      return this.$route.name === name;
    },
  },
};
</script>
