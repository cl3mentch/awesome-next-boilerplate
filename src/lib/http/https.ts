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

export const api = async <T = any>(
  method: APIMethod,
  resource: string,
  { data, useToken = false }: APIOptions = {}
): Promise<APIResponse<T>> => {
  try {
    // Construct query string for GET requests
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
};
