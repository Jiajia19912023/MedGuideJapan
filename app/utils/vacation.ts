import { LeaveMasterEntry } from '@/app/types';

// 入職日から経験年数を計算（誕生日方式：その年の入職日月日を過ぎていれば+1）
export function calcYearsOfService(hireDate: string): number {
  const hire = new Date(hireDate);
  const today = new Date();
  let years = today.getFullYear() - hire.getFullYear();
  const monthDiff = today.getMonth() - hire.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < hire.getDate())) {
    years--;
  }
  return Math.max(0, years);
}

// 有給マスタから付与日数を取得（6年以上は index 6 を使用）
export function getPaidLeaveDaysFromMaster(
  yearsOfService: number,
  master: LeaveMasterEntry[]
): number {
  const key = Math.min(yearsOfService, 6);
  const entry = master.find(m => m.yearsOfService === key);
  return entry?.daysGranted ?? 10;
}

// 日付文字列 YYYY-MM-DD を生成
export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// 指定月の全日付を生成
export function getDatesInMonth(year: number, month: number): string[] {
  const dates: string[] = [];
  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= lastDay; d++) {
    dates.push(toDateString(new Date(year, month, d)));
  }
  return dates;
}

// 曜日ラベル（日本語）
export function getDayOfWeekLabel(dateString: string): string {
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return days[new Date(dateString).getDay()];
}
