import { request, APIRequestContext } from "@playwright/test";
import axios, { AxiosInstance } from "axios";
import { config } from "./config";

export async function createApiContext(
  token?: string,
): Promise<APIRequestContext> {
  const extraHTTPHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    extraHTTPHeaders.Authorization = `Bearer ${token}`;
  }

  return request.newContext({
    baseURL: config.baseURL,
    extraHTTPHeaders,
  });
}

export function createAxiosClient(token?: string): AxiosInstance {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: config.baseURL,
    headers,
    timeout: 30_000,
  });
}
