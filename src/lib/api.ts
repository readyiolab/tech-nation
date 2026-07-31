function resolveApiBase() {
  const fromEnv = import.meta.env.VITE_API_BASE_URL;
  if (fromEnv !== undefined && fromEnv !== null && String(fromEnv).length > 0) {
    return String(fromEnv).replace(/\/$/, "");
  }
  // Browser behind Nginx: same-origin /api
  if (typeof window !== "undefined") return "";
  // SSR / Node (PM2): talk to API on localhost
  return "http://127.0.0.1:5000";
}

const API_BASE = resolveApiBase();

export async function apiPost<T = unknown>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(`${API_BASE}/api/v1${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || "Request failed");
  }
  return json as T;
}

export async function apiGet<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}/api/v1${path}`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || "Request failed");
  }
  return json as T;
}

export { API_BASE };
