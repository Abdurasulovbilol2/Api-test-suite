import { config } from "./config";
import { APIRequestContext } from "@playwright/test";
import { AxiosInstance } from "axios";

function pickToken(body: { token?: string; accessToken?: string }): string {
  const token = body.token ?? body.accessToken;
  if (!token) {
    throw new Error("Auth response did not include token or accessToken");
  }
  return token;
}

export async function getToken(api: APIRequestContext): Promise<string> {
  const response = await api.post("/auth/login", {
    data: {
      username: config.username,
      password: config.password,
    },
  });

  if (!response.ok()) {
    throw new Error("Auth failed");
  }

  const body = (await response.json()) as {
    token?: string;
    accessToken?: string;
  };
  return pickToken(body);
}

export async function getTokenAxios(api: AxiosInstance): Promise<string> {
  const response = await api.post("/auth/login", {
    username: config.username,
    password: config.password,
  });

  const body = response.data as { token?: string; accessToken?: string };
  return pickToken(body);
}
