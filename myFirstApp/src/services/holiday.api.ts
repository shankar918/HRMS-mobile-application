import api from "./api";

/* ================= HOLIDAYS ================= */

export const getHolidays = async () =>
  (await api.get("/api/holidays")).data;

export const addHoliday = async (data: any) =>
  (await api.post("/api/holidays", data)).data;

export const deleteHolidayById = async (id: string) =>
  (await api.delete(`/api/holidays/${id}`)).data;
