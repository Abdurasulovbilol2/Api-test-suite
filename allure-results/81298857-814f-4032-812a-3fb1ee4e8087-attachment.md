# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth\auth.spec.ts >> Auth API >> @axios POST /auth/login returns a token
- Location: tests\auth\auth.spec.ts:16:7

# Error details

```
Error: getaddrinfo ENOTFOUND api.example.com
```

# Test source

```ts
  1  | import { config } from "./config";
  2  | import { APIRequestContext } from "@playwright/test";
  3  | import { AxiosInstance } from "axios";
  4  | 
  5  | export async function getToken(api: APIRequestContext): Promise<string> {
  6  |   const response = await api.post("/auth/login", {
  7  |     data: {
  8  |       username: config.username,
  9  |       password: config.password,
  10 |     },
  11 |   });
  12 | 
  13 |   if (!response.ok()) {
  14 |     throw new Error("Auth failed");
  15 |   }
  16 | 
  17 |   const body = (await response.json()) as { token?: string };
  18 |   if (!body.token) {
  19 |     throw new Error("Auth response did not include token");
  20 |   }
  21 | 
  22 |   return body.token;
  23 | }
  24 | 
  25 | export async function getTokenAxios(api: AxiosInstance): Promise<string> {
> 26 |   const response = await api.post("/auth/login", {
     |                    ^ Error: getaddrinfo ENOTFOUND api.example.com
  27 |     username: config.username,
  28 |     password: config.password,
  29 |   });
  30 | 
  31 |   const body = response.data as { token?: string };
  32 |   if (!body.token) {
  33 |     throw new Error("Auth response did not include token");
  34 |   }
  35 | 
  36 |   return body.token;
  37 | }
  38 | 
```