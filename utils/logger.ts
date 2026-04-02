function format(level: "INFO" | "ERROR", message: string): string {
  return `[${new Date().toISOString()}] [${level}] ${message}`;
}

export function logInfo(message: string): void {
  console.log(format("INFO", message));
}

export function logError(message: string): void {
  console.error(format("ERROR", message));
}
