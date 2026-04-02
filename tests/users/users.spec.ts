import { test, expect } from "@playwright/test";
import { createApiContext, createAxiosClient } from "../../utils/apiClient";
import { getToken, getTokenAxios } from "../../utils/auth";
import { UserSchema } from "../../schemas/user.schema";
import { validateSchema } from "../../utils/schema";

function getUsersArray(body: unknown): unknown[] {
  if (Array.isArray(body)) {
    return body;
  }

  if (
    typeof body === "object" &&
    body !== null &&
    Array.isArray((body as { users?: unknown[] }).users)
  ) {
    return (body as { users: unknown[] }).users;
  }

  throw new Error("Users response was not an array or { users: [] }");
}

test.describe("Users API", () => {
  test("@pw GET /users returns valid users", async () => {
    const publicApi = await createApiContext();
    const token = await getToken(publicApi);

    const authApi = await createApiContext(token);
    const response = await authApi.get("/users");

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = (await response.json()) as unknown;
    const users = getUsersArray(body);

    for (const user of users) {
      validateSchema(UserSchema, user);
    }

    await publicApi.dispose();
    await authApi.dispose();
  });

  test("@axios GET /users returns valid users", async () => {
    const publicApi = createAxiosClient();
    const token = await getTokenAxios(publicApi);

    const authApi = createAxiosClient(token);
    const response = await authApi.get("/users");

    expect(response.status).toBe(200);

    const body = response.data as unknown;
    const users = getUsersArray(body);

    for (const user of users) {
      validateSchema(UserSchema, user);
    }
  });
});
