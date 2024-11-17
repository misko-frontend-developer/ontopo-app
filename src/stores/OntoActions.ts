import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";
import http from "@/utils/http";
import isTokenValid from "@/utils";

interface LoginResponse {
  jwt_token: string;
}

interface SearchResponse {
  search_id: string;
}

interface State {
  token: string;
  searchId: string;
  authError: string;
  loading: boolean;
  page: number;
  data: any;
}
export const useOntoActions = defineStore("ontoActions", {
  state: (): State => ({
    token: sessionStorage.getItem("jwt_token") || "",
    searchId: "",
    authError: "",
    loading: true,
    page: 0,
    data: [],
  }),

  actions: {
    async loginAnonymously() {
      if (!this.token)
        try {
          const { data }: AxiosResponse<LoginResponse> = await http.post(
            `/loginAnonymously`
          );
          if (data?.jwt_token)
            sessionStorage.setItem("jwt_token", data?.jwt_token);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            this.authError = error.message;
            console.error("Error during async call:", error);
          }
        }
    },

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
          this.authError = error.message;
          console.error("Error during async call:", error);
        }
      }
    },

    async runFilter() {
      if (isTokenValid()) {
        try {
          this.resetState();
          const mockData = {
            criteria: {
              date: "20241212",
              time: "1900",
              size: "2",
            },
          };
          const { data }: AxiosResponse<SearchResponse> = await http.post(
            `/search_token`,
            mockData
          );

          if (data?.search_id) {
            this.searchId = data?.search_id;
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            this.authError = error.message;
            console.error("Error during async call:", error);
          }
        }
      } else {
        this.authError =
          "Something went wrong with your session, please refresh";
      }
    },

    resetState() {
      this.data = [];
      this.page = 0;
    },
  },
});
