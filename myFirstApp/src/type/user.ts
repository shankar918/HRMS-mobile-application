// src/types/user.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
  token: string;
}
