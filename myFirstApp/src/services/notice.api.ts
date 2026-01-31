import api from "./api";

/* ===================== NOTICES ===================== */
export const getNotices = async () =>
  (await api.get("/api/notices")).data;

export const getAllNoticesForAdmin = async () =>
  (await api.get("/api/notices/all")).data;

export const addNotice = async (data: any) =>
  (await api.post("/api/notices", data)).data;

export const updateNotice = async (id: string, data: any) =>
  (await api.put(`/api/notices/${id}`, data)).data;

export const deleteNoticeById = async (id: string) =>
  (await api.delete(`/api/notices/${id}`)).data;

export const sendReplyWithImage = async (noticeId: string, formData: FormData) =>
  (await api.post(`/api/notices/${noticeId}/reply`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })).data;

/* ===================== NOTIFICATIONS ===================== */
export const getNotifications = async () =>
  (await api.get("/api/notifications")).data;

export const markNotificationAsRead = async (id: string) =>
  (await api.patch(`/api/notifications/${id}`, { isRead: true })).data;

export const markAllNotificationsAsRead = async () =>
  (await api.post("/api/notifications/mark-all")).data;
