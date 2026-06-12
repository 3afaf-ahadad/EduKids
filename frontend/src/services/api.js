import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// CSRF cookie for state-changing requests
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

api.interceptors.request.use(async (config) => {
  if (["post", "put", "patch", "delete"].includes(config.method)) {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });
    const xsrfToken = getCookie("XSRF-TOKEN");
    if (xsrfToken) {
      config.headers["X-XSRF-TOKEN"] = xsrfToken;
    }
  }
  return config;
});

// ── Auth ──
export const register = (data) => api.post("/register", data);
export const login = (data) => api.post("/login", data);
export const logout = () => api.post("/logout");
export const getMe = () => api.get("/me");

// ── Children (Parent) ──
export const getChildren = () => api.get("/children");
export const createChild = (data) => api.post("/children", data);
export const updateChild = (id, data) => api.put(`/children/${id}`, data);
export const deleteChild = (id) => api.delete(`/children/${id}`);

// ── Dashboard (Parent) ──
export const getDashboardStats = () => api.get("/dashboard/stats");

// ── Learning Modules (Child) ──
export const getAlphabet = () => api.get("/alphabet");
export const getNumbers = () => api.get("/numbers");
export const getColors = () => api.get("/colors");

// ── Progress (Child) ──
export const saveProgress = (contentType, contentId) =>
  api.post("/progress", { content_type: contentType, content_id: contentId });

export default api;
