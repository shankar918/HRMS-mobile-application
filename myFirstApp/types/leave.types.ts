export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type LeaveRequest = {
  _id: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
  status: LeaveStatus;
};
