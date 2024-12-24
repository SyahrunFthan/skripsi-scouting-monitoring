import axios from "axios";
import { getItem } from "../storages";

const API = axios.create({ baseURL: "http://localhost:5001" });

API.interceptors.request.use((req) => {
  req.withCredentials = true;
  const profile = getItem("profile");
  if (profile?.token) {
    req.headers.Authorization = `Bearer ${profile?.token}`;
  }

  return req;
});

// Activities Path
export const postActivitiesData = (data) =>
  API.post("/activities/create", data);
export const updateActivitiesData = (id, data) =>
  API.patch(`/activities/update/${id}`, data);
export const patchActivitiesData = (page, limit, search) =>
  API.get(`/activities?page=${page}&limit=${limit}&search=${search}`);
export const patchActivitiesById = (id) => API.get(`/activities/${id}`);
export const deleteActivitiesById = (id) => API.delete(`/activities/${id}`);
// End Activities Path

// Schools Path
export const patchSchoolsApi = (page, limit, search) =>
  API.get(`/schools?page=${page}&limit=${limit}&search=${search}`);
export const postSchoolsApi = (data) =>
  API.post("/schools", data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
export const updateSchoolsApi = (id, data) =>
  API.patch(`/schools/${id}`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
export const patchSchoolsById = (id) => API.get(`/schools/${id}`);
export const deleteSchoolsById = (id) => API.delete(`/schools/${id}`);
export const createImportDataApi = (data) =>
  API.post("/schools/import-data", data);
export const patchSearchSchoolApi = (search) =>
  API.get(`/schools/search-key?search=${search}`);
export const patchSearchSchoolByIdApi = (id) =>
  API.get(`/schools/search-key/get-id/${id}`);
// End Schools Path

// Contribution Path
export const postContributionApi = (data) =>
  API.post("/contributions/create", data);
export const patchContributionApi = (page, limit, search) =>
  API.get(`/contributions?page=${page}&limit=${limit}&search=${search}`);
export const patchSchoolAndActivitiesApi = () =>
  API.get("/contributions/school-activities");
export const patchContributionById = (id) => API.get(`/contributions/${id}`);
export const deleteContributionApi = (id) => API.delete(`/contributions/${id}`);
export const updateContributionApi = (id, data) =>
  API.patch(`/contributions/${id}`, data);
// End Contribution Path

// Dashboard Path
export const patchDataFromDashboardApi = () =>
  API.get("/contributions/dashboard");
// End Dashboard Path

// Auth Path
export const postAuthLoginApi = (data) => API.post("/auth", data);
export const removeTokenApi = (id) => API.delete(`/auth/remove-token/${id}`);
export const patchUserLoginApi = (id) => API.get(`/auth/${id}`);
// End Auth Path
