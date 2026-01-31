// src/services/leave.api.ts
import api from "./api";

/* ===================== LEAVES ===================== */

export const getLeaveRequests = async () =>
  (await api.get("/api/leaves")).data;

export const getFilteredLeaveRequests = async (params: any) =>
  (await api.get("/api/leaves", { params })).data;

export const getLeaveRequestsForEmployee = async (id: string) =>
  (await api.get(`/api/leaves/${id}`)).data;

export const applyForLeave = async (data: any) =>
  (await api.post("/api/leaves/apply", data)).data;

export const getLeaveDetailsById = async (id: string) =>
  (await api.get(`/api/leaves/${id}/details`)).data;

export const approveLeaveRequestById = async (id: string) =>
  (await api.patch(`/api/leaves/${id}/approve`)).data;

export const rejectLeaveRequestById = async (id: string) =>
  (await api.patch(`/api/leaves/${id}/reject`)).data;

export const cancelLeaveRequestById = async (id: string) =>
  (await api.delete(`/api/leaves/cancel/${id}`)).data;
