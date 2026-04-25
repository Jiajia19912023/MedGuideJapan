'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { User, LeaveRequest } from '@/app/types';
import { getAppState, removeLeaveRequest } from '@/app/utils/storage';
import { getDatesInMonth, getDayOfWeekLabel } from '@/app/utils/vacation';
import { calcRemainingPaidLeave } from '@/app/utils/storage';

interface Props {
  currentUser: User;
}

export default function AdminCalendar({ currentUser }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [refresh, setRefresh] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const state = getAppState();
  const staffUsers = state.users.filter(u => !u.isAdmin);
  const dates = getDatesInMonth(year, month);

  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  const monthRequests = state.leaveRequests.filter(r => r.date.startsWith(monthPrefix));

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  const getRequest = (userId: string, date: string): LeaveRequest | undefined =>
    monthRequests.find(r => r.userId === userId && r.date === date);

  const getDayTotal = (date: string): number =>
    monthRequests.filter(r => r.date === date).length;

  const handleDelete = (reqId: string) => {
    removeLeaveRequest(reqId, currentUser.id);
    setConfirmDelete(null);
    setRefresh(r => r + 1);
  };

  // サマリー：スタッフごとの月内申請数
  const summary = staffUsers.map(u => {
    const reqs = monthRequests.filter(r => r.userId === u.id);
    const kiboCount = reqs.filter(r => r.type === '希望休').length;
    const yukyuCount = reqs.filter(r => r.type === '有給').length;
    const remaining = calcRemainingPaidLeave(u.id);
    return { user: u, kiboCount, yukyuCount, remaining };
  });

  return (
    <div className="pb-8" key={refresh}>
      {/* 月ナビ */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-slate-200 transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="text-xl font-bold text-slate-800">
          {year}年 {month + 1}月 — 管理者ビュー
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-slate-200 transition-colors">
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* スタッフサマリーカード */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-5">
        {summary.map(({ user, kiboCount, yukyuCount, remaining }) => (
          <div key={user.id} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <p className="text-sm font-semibold text-slate-700 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              希望休 <span className="font-bold text-blue-600">{kiboCount}</span> 件
            </p>
            <p className="text-xs text-slate-500">
              有給 <span className="font-bold text-emerald-600">{yukyuCount}</span> 件
            </p>
            <p className="text-xs text-slate-400 mt-1">
              有給残 <span className="font-semibold text-emerald-700">{remaining}</span>日
            </p>
          </div>
        ))}
      </div>

      {/* マトリックステーブル */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="sticky left-0 z-10 bg-slate-50 border-b border-r border-slate-200 px-3 py-2 text-left font-semibold text-slate-600 min-w-[100px]">
                  スタッフ名
                </th>
                {dates.map(date => {
                  const dayNum = parseInt(date.split('-')[2]);
                  const dow = new Date(date).getDay();
                  const total = getDayTotal(date);
                  return (
                    <th
                      key={date}
                      className={`border-b border-r border-slate-200 px-1 py-1 text-center min-w-[36px] font-normal ${
                        dow === 0 ? 'text-red-500' : dow === 6 ? 'text-blue-500' : 'text-slate-600'
                      }`}
                    >
                      <div className="font-semibold">{dayNum}</div>
                      <div className={`text-[10px] ${dow === 0 ? 'text-red-400' : dow === 6 ? 'text-blue-400' : 'text-slate-400'}`}>
                        {getDayOfWeekLabel(date)}
                      </div>
                      {total > 0 && (
                        <div className={`text-[10px] font-bold ${total >= 3 ? 'text-red-600' : 'text-slate-400'}`}>
                          {total}名
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {staffUsers.map((user, rowIdx) => (
                <tr key={user.id} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  {/* スタッフ名（固定列） */}
                  <td className={`sticky left-0 z-10 border-b border-r border-slate-200 px-3 py-2 font-medium text-slate-700 ${
                    rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}>
                    {user.name}
                  </td>
                  {/* 各日付のセル */}
                  {dates.map(date => {
                    const req = getRequest(user.id, date);
                    const dow = new Date(date).getDay();
                    return (
                      <td
                        key={date}
                        className={`border-b border-r border-slate-100 px-0.5 py-1 text-center ${
                          dow === 0 ? 'bg-red-50/30' : dow === 6 ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        {req ? (
                          <div className="flex flex-col items-center gap-0.5">
                            <span
                              className={`inline-block px-1 py-0.5 rounded text-[10px] font-semibold ${
                                req.type === '希望休'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}
                            >
                              {req.type === '希望休' ? '希' : '有'}
                            </span>
                            <button
                              onClick={() => setConfirmDelete(req.id)}
                              className="text-slate-300 hover:text-red-500 transition-colors"
                              title="削除"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-200">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 凡例 */}
        <div className="px-4 py-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500 bg-slate-50">
          <span className="flex items-center gap-1">
            <span className="inline-block px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold">希</span>
            希望休
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold">有</span>
            有給
          </span>
          <span className="flex items-center gap-1">
            <span className="font-bold text-red-600">3</span>名以上の日は赤表示
          </span>
        </div>
      </div>

      {/* 削除確認モーダル */}
      {confirmDelete && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={e => { if (e.target === e.currentTarget) setConfirmDelete(null); }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6">
            <h3 className="font-bold text-slate-800 mb-2">申請を削除しますか？</h3>
            <p className="text-sm text-slate-500 mb-5">この操作は元に戻せません。</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2 text-sm border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
              >
                キャンセル
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
