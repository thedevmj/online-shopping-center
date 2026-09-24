export const API_BASE_URL = (import.meta.env.API_URL || "http://localhost:3000").replace(/\/+$/, "");

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
