import { AppState, User, LeaveRequest, LeaveMasterEntry, LeaveType } from '@/app/types';
import { calcYearsOfService, getPaidLeaveDaysFromMaster } from '@/app/utils/vacation';
import { getInitialData } from '@/app/utils/initialData';

const STORAGE_KEY = 'nurse_vacation_v2';

// LocalStorage からアプリ状態を取得（なければ初期データで初期化）
export function getAppState(): AppState {
  if (typeof window === 'undefined') {
    return getInitialData();
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const init = getInitialData();
    saveAppState(init);
    return init;
  }
  try {
    return JSON.parse(raw) as AppState;
  } catch {
    return getInitialData();
  }
}

export function saveAppState(state: AppState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// -----------------------------------------------------------------------
// 認証
// -----------------------------------------------------------------------

export function login(id: string, pin: string): User | null {
  const state = getAppState();

  // 管理者ログイン
  if (id === '管理者' && pin === '0000') {
    let admin = state.users.find(u => u.isAdmin);
    if (!admin) {
      admin = {
        id: '管理者',
        name: '管理者',
        pin: '0000',
        hireDate: '2020-01-01',
        isAdmin: true,
        grantedPaidLeaveDays: 0,
      };
      state.users.push(admin);
    }
    state.currentUserId = admin.id;
    saveAppState(state);
    return admin;
  }

  const user = state.users.find(u => u.id === id && u.pin === pin);
  if (user) {
    state.currentUserId = user.id;
    saveAppState(state);
    return user;
  }
  return null;
}

export function logout(): void {
  const state = getAppState();
  state.currentUserId = null;
  saveAppState(state);
}

export function getCurrentUser(): User | null {
  const state = getAppState();
  if (!state.currentUserId) return null;
  return state.users.find(u => u.id === state.currentUserId) || null;
}

// -----------------------------------------------------------------------
// ユーザー登録
// -----------------------------------------------------------------------

export function registerUser(
  id: string,
  name: string,
  pin: string,
  hireDate: string
): { success: boolean; error?: string; user?: User } {
  const state = getAppState();

  if (state.users.some(u => u.id === id)) {
    return { success: false, error: 'そのIDは既に使用されています' };
  }
  if (id === '管理者') {
    return { success: false, error: 'そのIDは使用できません' };
  }

  const years = calcYearsOfService(hireDate);
  const granted = getPaidLeaveDaysFromMaster(years, state.leaveMaster);

  const newUser: User = {
    id,
    name,
    pin,
    hireDate,
    isAdmin: false,
    grantedPaidLeaveDays: granted,
  };

  state.users.push(newUser);
  state.currentUserId = newUser.id;
  saveAppState(state);
  return { success: true, user: newUser };
}

// -----------------------------------------------------------------------
// 休暇申請
// -----------------------------------------------------------------------

export function addLeaveRequest(
  userId: string,
  date: string,
  type: LeaveType
): { success: boolean; error?: string } {
  const state = getAppState();

  // 同一ユーザーの同日重複チェック
  if (state.leaveRequests.some(r => r.userId === userId && r.date === date)) {
    return { success: false, error: 'この日には既に申請があります' };
  }

  // 有給残数チェック
  if (type === '有給') {
    const user = state.users.find(u => u.id === userId);
    if (!user) return { success: false, error: 'ユーザーが見つかりません' };
    const used = state.leaveRequests.filter(r => r.userId === userId && r.type === '有給').length;
    if (used >= user.grantedPaidLeaveDays) {
      return { success: false, error: '有給残数が不足しています' };
    }
  }

  const user = state.users.find(u => u.id === userId)!;
  const request: LeaveRequest = {
    id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    userId,
    userName: user.name,
    date,
    type,
    createdAt: new Date().toISOString(),
  };

  state.leaveRequests.push(request);
  saveAppState(state);
  return { success: true };
}

export function removeLeaveRequest(requestId: string, currentUserId: string): boolean {
  const state = getAppState();
  const req = state.leaveRequests.find(r => r.id === requestId);
  if (!req) return false;

  // 管理者でなければ自分の申請のみ削除可
  const user = state.users.find(u => u.id === currentUserId);
  if (!user?.isAdmin && req.userId !== currentUserId) return false;

  state.leaveRequests = state.leaveRequests.filter(r => r.id !== requestId);
  saveAppState(state);
  return true;
}

// 申請の種別変更（削除して追加し直す）
export function updateLeaveRequest(
  requestId: string,
  newType: LeaveType,
  currentUserId: string
): { success: boolean; error?: string } {
  const state = getAppState();
  const req = state.leaveRequests.find(r => r.id === requestId);
  if (!req) return { success: false, error: '申請が見つかりません' };
  if (req.userId !== currentUserId) return { success: false, error: '権限がありません' };

  // 有給に変更する場合の残数チェック
  if (newType === '有給') {
    const user = state.users.find(u => u.id === currentUserId);
    if (!user) return { success: false, error: 'ユーザーが見つかりません' };
    const used = state.leaveRequests.filter(
      r => r.userId === currentUserId && r.type === '有給' && r.id !== requestId
    ).length;
    if (used >= user.grantedPaidLeaveDays) {
      return { success: false, error: '有給残数が不足しています' };
    }
  }

  req.type = newType;
  saveAppState(state);
  return { success: true };
}

// -----------------------------------------------------------------------
// 有給マスタ更新
// -----------------------------------------------------------------------

export function updateLeaveMaster(master: LeaveMasterEntry[]): void {
  const state = getAppState();
  state.leaveMaster = master;
  saveAppState(state);
}

// -----------------------------------------------------------------------
// 計算ヘルパー（有給残数）
// -----------------------------------------------------------------------

export function calcRemainingPaidLeave(userId: string): number {
  const state = getAppState();
  const user = state.users.find(u => u.id === userId);
  if (!user) return 0;
  const used = state.leaveRequests.filter(r => r.userId === userId && r.type === '有給').length;
  return Math.max(0, user.grantedPaidLeaveDays - used);
}
