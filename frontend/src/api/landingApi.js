import { apiRequest } from "./client";

function buildQuery(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, item));
    } else if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  return searchParams.toString();
}

export function fetchLandingFilters() {
  return apiRequest("/landing/filters/");
}

export function fetchCompetitions(filters = {}) {
  const query = buildQuery(filters);
  return apiRequest(`/landing/competitions/${query ? `?${query}` : ""}`);
}

export function fetchSidebar() {
  return apiRequest("/landing/sidebar/");
}
