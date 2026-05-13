const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

let csrfReady = false;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(";").shift());
  }
  return "";
}

async function ensureCsrfCookie() {
  if (csrfReady && getCookie("csrftoken")) return;

  const response = await fetch(`${API_BASE}/auth/csrf/`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to initialize CSRF protection");
  }

  csrfReady = true;
}

function isUnsafeMethod(method) {
  return !["GET", "HEAD", "OPTIONS", "TRACE"].includes(method.toUpperCase());
}

export async function apiRequest(path, options = {}) {
  const method = options.method || "GET";
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (isUnsafeMethod(method)) {
    await ensureCsrfCookie();
    headers.set("X-CSRFToken", getCookie("csrftoken"));
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    method,
    headers,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload?.detail
        ? payload.detail
        : `Request failed: ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export { API_BASE, ensureCsrfCookie, getCookie };
