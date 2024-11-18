import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";
import http from "@/utils/http";
import { useAuthActions } from "./AuthStore";
import formatErrorMessage from "@/utils";

interface SearchResponse {
  search_id: string;
}

interface DataResponse {
  total: number;
  posts: [];
}

interface State {
  searchId: string;
  loading: boolean;
  loadingLoadMore: boolean;
  page: number;
  total: number;
  data: any;
}
interface SearchInput {
  size: string;
  date: string;
  time: string;
}
export const useOntopoActions = defineStore("ontpoActions", {
  state: (): State => ({
    searchId: "",
    loadingLoadMore: false,
    loading: false,
    page: 0,
    total: 0,
    data: [],
  }),

  actions: {
    async requestData() {
      try {
        this.loadingLoadMore = Math.ceil(this.total) / 10 >= this.page;

        if (!this.loadingLoadMore) {
          return;
        }
        this.page = this.page + 1;
        const { data }: AxiosResponse<DataResponse> = await http.post(
          `/search_request?page=${this.page}`,
          {
            search_id: this.searchId,
          }
        );

        if (data) {
          this.loading = false;
          this.total = data?.total;
          this.data.push(data?.posts);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const authStore = useAuthActions();
          const message = formatErrorMessage(error?.response?.data?.message);
          authStore.authError = message ?? error.message;
          console.error("Error during async call:", message ?? error.message);
        }
      }
    },

    async runFilter(inputData: SearchInput) {
      try {
        if (this.data.length) {
          this.resetState();
        }
        this.loading = true;
        const { data }: AxiosResponse<SearchResponse> = await http.post(
          `/search_token`,
          { criteria: inputData }
        );

        if (data?.search_id) {
          this.searchId = data?.search_id;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const authStore = useAuthActions();
          const message = formatErrorMessage(error?.response?.data?.message);
          authStore.authError = message ?? error.message;
          console.error("Error during async call:", message);
        }
      }
    },

    resetState() {
      this.data = [];
      this.page = 0;
      this.total = 0;
      this.loadingLoadMore = false;
    },
  },
});
