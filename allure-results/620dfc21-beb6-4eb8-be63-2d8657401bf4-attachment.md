# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth\auth.spec.ts >> Auth API >> @axios POST /auth/login returns a token
- Location: tests\auth\auth.spec.ts:16:7

# Error details

```
AxiosError: Request failed with status code 400
```

# Test source

```ts
  1  | import { config } from "./config";
  2  | import { APIRequestContext } from "@playwright/test";
  3  | import { AxiosInstance } from "axios";
  4  | 
  5  | function pickToken(body: { token?: string; accessToken?: string }): string {
  6  |   const token = body.token ?? body.accessToken;
  7  |   if (!token) {
  8  |     throw new Error("Auth response did not include token or accessToken");
  9  |   }
  10 |   return token;
  11 | }
  12 | 
  13 | export async function getToken(api: APIRequestContext): Promise<string> {
  14 |   const response = await api.post("/auth/login", {
  15 |     data: {
  16 |       username: config.username,
  17 |       password: config.password,
  18 |     },
  19 |   });
  20 | 
  21 |   if (!response.ok()) {
  22 |     throw new Error("Auth failed");
  23 |   }
  24 | 
  25 |   const body = (await response.json()) as {
  26 |     token?: string;
  27 |     accessToken?: string;
  28 |   };
  29 |   return pickToken(body);
  30 | }
  31 | 
  32 | export async function getTokenAxios(api: AxiosInstance): Promise<string> {
> 33 |   const response = await api.post("/auth/login", {
     |                    ^ AxiosError: Request failed with status code 400
  34 |     username: config.username,
  35 |     password: config.password,
  36 |   });
  37 | 
  38 |   const body = response.data as { token?: string; accessToken?: string };
  39 |   return pickToken(body);
  40 | }
  41 | 
```