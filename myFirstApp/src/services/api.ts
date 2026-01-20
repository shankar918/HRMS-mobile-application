/* ================= BASE CONFIG ================= */

const BASE_URL = "https://hrms-ask.onrender.com/api";

/* ================= AUTH ================= */

export const loginApi = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

/* ================= LEAVE ================= */

export type ApplyLeavePayload = {
  employeeId: string;
  employeeName: string;
  from: string;
  to: string;
  reason: string;
  leaveType: string;
};

export const applyForLeave = async (payload: ApplyLeavePayload) => {
  const res = await fetch(`${BASE_URL}/leave/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Leave apply failed");
  }

  return data;
};

export const getLeaveRequestsForEmployee = async (employeeId: string) => {
  const res = await fetch(`${BASE_URL}/leave/employee/${employeeId}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch leaves");
  }

  return data;
};

// const BASE_URL = "https://hrms-ask.onrender.com/api";

/* ================= NOTICE BOARD ================= */

export const getNotices = async () => {
  const res = await fetch(`${BASE_URL}/notice`);

  const data = await res.json();

  if (!res.ok) {
    console.log("Notice fetch failed:", data);
    throw new Error("Failed to fetch notices");
  }

  return data;
};

export const sendReply = async (noticeId: string, message: string) => {
  const res = await fetch(`${BASE_URL}/notice/${noticeId}/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Reply failed");

  return data;
};

export const sendReplyWithImage = async (
  noticeId: string,
  formData: FormData
) => {
  const res = await fetch(`${BASE_URL}/notice/${noticeId}/reply-image`, {
    method: "POST",
    body: formData, // ❗ DO NOT SET CONTENT-TYPE
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Image reply failed");

  return data;
};


/* ========== ATTENDANCE ========== */

export const getTodayAttendance = async (employeeId: string) => {
  const res = await fetch(`${BASE_URL}/attendance/today/${employeeId}`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data;
};

export const punchIn = async (employeeId: string) => {
  const res = await fetch(`${BASE_URL}/attendance/punch-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employeeId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const punchOut = async (employeeId: string) => {
  const res = await fetch(`${BASE_URL}/attendance/punch-out`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employeeId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};