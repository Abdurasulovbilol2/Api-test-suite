import { test, expect } from "@playwright/test";
import { createApiContext, createAxiosClient } from "../../utils/apiClient";
import { getToken, getTokenAxios } from "../../utils/auth";

test.describe("Auth API", () => {
  test("@pw POST /auth/login returns a token", async () => {
    const api = await createApiContext();
    const token = await getToken(api);

    expect(token).toBeTruthy();
    expect(typeof token).toBe("string");

    await api.dispose();
  });

  test("@axios POST /auth/login returns a token", async () => {
    const api = createAxiosClient();
    const token = await getTokenAxios(api);

    expect(token).toBeTruthy();
    expect(typeof token).toBe("string");
  });
});
