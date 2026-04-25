// ユーザー情報
export interface User {
  id: string;          // ログインID
  name: string;        // 氏名
  pin: string;         // 4桁PIN
  hireDate: string;    // 入職日 YYYY-MM-DD
  isAdmin: boolean;
  grantedPaidLeaveDays: number; // 初期付与有給日数
}

// 休暇希望タイプ
export type LeaveType = '希望休' | '有給';

// 休暇希望申請
export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  date: string;        // YYYY-MM-DD
  type: LeaveType;
  createdAt: string;
}

// 有給マスタ（経験年数ごとの付与日数）
export interface LeaveMasterEntry {
  yearsOfService: number; // 0〜6（6は6年以上）
  daysGranted: number;
}

// アプリ全体の状態
export interface AppState {
  users: User[];
  leaveRequests: LeaveRequest[];
  leaveMaster: LeaveMasterEntry[];
  currentUserId: string | null;
}
