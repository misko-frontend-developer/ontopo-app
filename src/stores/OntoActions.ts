import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";

interface LoginResponse {
  jwt_token: string;
}

export const useOntoActions = defineStore("ontoActions", {
  state: () => ({
    token: sessionStorage.getItem("jwt_token") || "",
    authError: "",
  }),
  getters: {
    isTokenExpired(): boolean | undefined {
      if (this.token) {
        try {
          const base64Url = this.token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            window
              .atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );
          return (
            Math.floor(new Date().getTime() / 1000) >=
            JSON.parse(jsonPayload)?.exp
          );
        } catch (error) {
          this.authError =
            "Something went wrong with your session, please refresh";
          sessionStorage.removeItem("jwt_token");
          console.error(error);
        }
      }
    },
  },
  actions: {
    async loginAnonymously() {
      if (!this.token || this.isTokenExpired) {
        try {
          const { data }: AxiosResponse<LoginResponse> = await axios.post(
            `${import.meta.env.VITE_APPLICATION_URL}loginAnonymously`
          );

          sessionStorage.setItem("jwt_token", data?.jwt_token);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            this.authError = error.message;
            console.error("Error during async call:", error);
          }
        }
      }
    },
  },
});
