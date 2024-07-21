import Cookies from "js-cookie";
import { urls } from "./settings";

type APIResponse<T = any> = {
  success: boolean;
  data: T;
  msg: string;
};

type APIMethod = "GET" | "POST" | "PUT" | "DELETE";

interface APIOptions {
  data?: Record<string, any>;
  useToken?: boolean;
}

class API {
  private async request<T = any>(
    method: APIMethod,
    resource: string, //url endpoint
    { data, useToken = false }: APIOptions = {}
  ): Promise<APIResponse<T>> {
    try {
      const queryString =
        method === "GET" && data
          ? "?" + new URLSearchParams(data).toString()
          : "";

      const headers: HeadersInit = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (useToken) {
        const tokenApi = Cookies.get("accessToken");
        if (tokenApi) {
          headers.Authorization = `Bearer ${tokenApi}`;
        } else {
          throw new Error("No access token available");
        }
      }

      const response = await fetch(`${urls.apiBase}${resource}${queryString}`, {
        method,
        mode: "cors",
        headers,
        body: method !== "GET" ? JSON.stringify(data) : null,
      });

      const resp: APIResponse<T> = await response.json();
      return resp;
    } catch (err) {
      console.error("API call error:", err);
      throw err;
    }
  }

  public get<T = any>(
    resource: string,
    options?: APIOptions
  ): Promise<APIResponse<T>> {
    return this.request("GET", resource, options);
  }

  public post<T = any>(
    resource: string,
    options?: APIOptions
  ): Promise<APIResponse<T>> {
    return this.request("POST", resource, options);
  }

  public put<T = any>(
    resource: string,
    options?: APIOptions
  ): Promise<APIResponse<T>> {
    return this.request("PUT", resource, options);
  }

  public delete<T = any>(
    resource: string,
    options?: APIOptions
  ): Promise<APIResponse<T>> {
    return this.request("DELETE", resource, options);
  }
}

export const api = new API();
