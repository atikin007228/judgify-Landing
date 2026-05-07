const API_BASE = 'https://judgify-backend-qxoy.onrender.com/api';

function buildQuery(params) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, item));
    } else if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value);
    }
  });
  return searchParams.toString();
}

export async function fetchLandingFilters() {
  const res = await fetch(`${API_BASE}/landing/filters/`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load filters');
  return res.json();
}

export async function fetchCompetitions(filters) {
  const query = buildQuery(filters);
  const res = await fetch(`${API_BASE}/landing/competitions/?${query}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load competitions');
  return res.json();
}

export async function fetchSidebar() {
  const res = await fetch(`${API_BASE}/landing/sidebar/`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load sidebar');
  return res.json();
}
