import { useToast } from "@/components/ui/toast/use-toast";
import Cookies from "js-cookie";
import { urls } from "./settings";

type APIResponse<T = any> = {
  success: boolean;
  data: T;
  msg: string;
};

export const api = async <T = any>(
  method: string,
  resource: string,
  data?: any,
  useToken: boolean = false
): Promise<APIResponse<T>> => {
  let resp: APIResponse<T>;
  try {
    const queryString: string =
      data && method === "GET"
        ? "?" +
          Object.keys(data as Record<string, any>)
            .map(
              (key) =>
                encodeURIComponent(key) +
                "=" +
                encodeURIComponent((data as Record<string, any>)[key])
            )
            .join("&")
        : "";

    const headers: HeadersInit = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (useToken) {
      const tokenApi: string | undefined = Cookies.get("accessToken");
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

    resp = await response.json();

    return resp;
  } catch (err) {
    console.error("API call error:", err);
    throw err;
  }
};
