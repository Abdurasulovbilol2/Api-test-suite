import { test, expect } from "@playwright/test";
import { createApiContext, createAxiosClient } from "../../utils/apiClient";

test.describe("Performance API", () => {
  test("@pw GET /users responds under 2s", async () => {
    const api = await createApiContext();

    const startedAt = Date.now();
    const response = await api.get("/users");
    const durationMs = Date.now() - startedAt;

    expect(response.ok()).toBeTruthy();
    expect(durationMs).toBeLessThan(2000);

    await api.dispose();
  });

  test("@axios GET /users responds under 2s", async () => {
    const api = createAxiosClient();

    const startedAt = Date.now();
    const response = await api.get("/users");
    const durationMs = Date.now() - startedAt;

    expect(response.status).toBe(200);
    expect(durationMs).toBeLessThan(2000);
  });
});
