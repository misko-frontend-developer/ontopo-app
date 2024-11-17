import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";
import http from "@/utils/http";
import { useAuthActions } from "./AuthStore";
import formatErrorMessage from "@/utils";

interface SearchResponse {
  search_id: string;
}

interface State {
  searchId: string;
  loading: boolean;
  page: number;
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
    loading: true,
    page: 0,
    data: [],
  }),

  actions: {
    async requestData() {
      try {
        this.page = this.page + 1;
        const { data }: AxiosResponse<any> = await http.post(
          `/search_request?page=${this.page}`,
          {
            search_id: this.searchId,
          }
        );
        if (data) {
          this.loading = false;
          this.data.push(data?.posts);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const authStore = useAuthActions();
          const message = formatErrorMessage(error?.response?.data?.message);
          authStore.authError = message;
          console.error("Error during async call:", message);
        }
      }
    },

    async runFilter(inputData: SearchInput) {
      try {
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
          authStore.authError = message;
          console.error("Error during async call:", message);
        }
      }
    },

    resetState() {
      this.data = [];
      this.page = 0;
    },
  },
});
