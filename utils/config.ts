import dotenv from "dotenv";
import path from "path";

// Load env from package root first, then fallback to parent workspace root.
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function requireEnv(name: "BASE_URL" | "USERNAME" | "PASSWORD"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function resolveCredential(
  primaryName: "API_USERNAME" | "API_PASSWORD",
  fallbackName: "USERNAME" | "PASSWORD",
): string {
  const value = process.env[primaryName] ?? process.env[fallbackName];
  if (!value) {
    throw new Error(`Missing required environment variable: ${primaryName}`);
  }
  return value;
}

export const config = {
  baseURL: requireEnv("BASE_URL"),
  username: resolveCredential("API_USERNAME", "USERNAME"),
  password: resolveCredential("API_PASSWORD", "PASSWORD"),
};
