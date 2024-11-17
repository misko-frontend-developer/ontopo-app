import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";
import http from "@/utils/http";

interface LoginResponse {
  jwt_token: string;
}

interface State {
  token: string;
  authError: any;
}
export const useAuthActions = defineStore("authActions", {
  state: (): State => ({
    token: sessionStorage.getItem("jwt_token") || "",
    authError: "",
  }),
  getters: {
    isTokenValid(): boolean | undefined {
      if (this.token)
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
            //problem with expiration token, added 50000 miliseconds, as it returns always current time.
            Math.floor(new Date().getTime() / 1000) + 50000 >=
            JSON.parse(jsonPayload)?.exp
          );
        } catch (error: any) {
          console.error(error);
          this.authError = "There is problem with your token";
        }
    },
  },

  actions: {
    async loginAnonymously() {
      if (!this.token) {
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
      } else {
        if (!this.isTokenValid) {
          this.authError = "There is problem with your token";
          return;
        }
      }
    },
    renewSession() {
      sessionStorage.removeItem("jwt_token");
      location.reload();
    },
  },
});
