// services/attendance.api.ts
import api from "./api";

export const getAttendanceForEmployee = async (id: string) =>
  (await api.get(`/api/attendance/${id}`)).data;

export const punchIn = async (data: { employeeId: string }) =>
  (await api.post("/api/attendance/punch-in", data)).data;

export const punchOut = async (data: { employeeId: string }) =>
  (await api.post("/api/attendance/punch-out", data)).data;
