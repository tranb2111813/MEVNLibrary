<template>
  <div class="items-center hidden gap-x-2 lg:flex">
    <div class="w-80">
      <div class="relative">
        <select
          v-model="msdg"
          class="w-full pl-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Type here..."
        >
          <option value="" selected>Chọn độc giả</option>
          <option
            v-for="reader in listreader"
            :key="reader.msdg"
            :value="reader._id"
          >
            {{ reader.msdg + " - " + reader.holot + " " + reader.ten }}
          </option>
        </select>
      </div>
    </div>
    <div class="w-80">
      <div class="relative">
        <select
          v-model="masach"
          class="w-full pl-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Type here..."
        >
          <option value="" selected>Chọn sách</option>
          <option v-for="book in listbook" :key="book.masach" :value="book._id">
            {{ book.masach + " - " + book.tensach }}
          </option>
        </select>
      </div>
    </div>
    <div class="w-48">
      <div class="relative">
        <select
          v-model="trangthai"
          class="w-full pl-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Type here..."
        >
          <option value="" selected>Chọn trạng thái</option>
          <option value="damuon">Đang mượn</option>
          <option value="datra">Đã trả</option>
        </select>
      </div>
    </div>

    <button
      @click="submitFilter"
      class="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
    >
      Lọc
    </button>
  </div>
  <button
    class="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
    type="button"
  >
    <span
      class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </span>
  </button>
</template>
<script>
import ListReaderService from "@/services/listreader.services.js";
import ListBookService from "@/services/listbook.services.js";
export default {
  name: "FilterBrBook",
  data() {
    return {
      msdg: "",
      masach: "",
      trangthai: "",

      listreader: [],
      listbook: [],
    };
  },
  methods: {
    submitFilter() {
      this.$emit("filter", this.msdg, this.masach, this.trangthai);
    },
  },
  async beforeMount() {
    this.listreader = await ListReaderService.getAll();
    this.listbook = await ListBookService.getAll();
  },
};
</script>
