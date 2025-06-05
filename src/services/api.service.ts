import { getServerSession } from "@services/auth.service";

type TFetch = {
  url: string;
  data?: any;
  method?: string;
  timeout?: number;
  params?: Record<string, string>;
  headers?: Record<string, string>;
};

export const api = async ({ url = "", method = "POST", headers = {}, data, params, timeout = 600000 }: TFetch) => {
  const session = await getServerSession();

  const baseUrl = process.env.API_URL;
  const urlRequest = new URL(baseUrl + url);
  const token = `Bearer ${session?.accessToken ?? ""}`;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      urlRequest.searchParams.append(key, value);
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(urlRequest.toString(), {
      method,
      headers: {
        ...headers,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": "pt-br, pt_br, pt_BR",
        Authorization: token,
      },
      body: data ? JSON.stringify(data) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const resp = await response.json();

    return { status: response.status, ...resp};
  } catch (error: any) {
    clearTimeout(timeoutId);

    throw error;
  }
};
