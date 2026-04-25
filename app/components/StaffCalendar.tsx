'use client';

import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { User, LeaveRequest, LeaveType } from '@/app/types';
import {
  getAppState,
  addLeaveRequest,
  removeLeaveRequest,
  updateLeaveRequest,
  calcRemainingPaidLeave,
} from '@/app/utils/storage';
import { getDatesInMonth, getDayOfWeekLabel } from '@/app/utils/vacation';

interface Props {
  currentUser: User;
}

type Modal =
  | { kind: 'add'; date: string }
  | { kind: 'edit'; request: LeaveRequest }
  | null;

const TYPE_COLOR: Record<LeaveType, string> = {
  希望休: 'bg-blue-100 text-blue-700 border-blue-200',
  有給: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export default function StaffCalendar({ currentUser }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [modal, setModal] = useState<Modal>(null);
  const [selectedType, setSelectedType] = useState<LeaveType>('希望休');
  const [errorMsg, setErrorMsg] = useState('');
  const [refresh, setRefresh] = useState(0);

  const forceRefresh = () => setRefresh(r => r + 1);

  const state = getAppState();
  const remaining = calcRemainingPaidLeave(currentUser.id);
  const dates = getDatesInMonth(year, month);

  // 月内の全申請
  const monthRequests = state.leaveRequests.filter(r => r.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`));

  // 月ナビゲーション
  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  // 日付ごとのデータ
  const getDateData = useCallback((date: string) => {
    const all = monthRequests.filter(r => r.date === date);
    const mine = all.find(r => r.userId === currentUser.id);
    const othersCount = all.filter(r => r.userId !== currentUser.id).length;
    const totalCount = all.length;
    return { mine, othersCount, totalCount };
  }, [monthRequests, currentUser.id]);

  // 申請追加
  const handleAdd = () => {
    setErrorMsg('');
    if (!modal || modal.kind !== 'add') return;
    const result = addLeaveRequest(currentUser.id, modal.date, selectedType);
    if (result.success) {
      setModal(null);
      forceRefresh();
    } else {
      setErrorMsg(result.error || 'エラーが発生しました');
    }
  };

  // 申請更新
  const handleUpdate = () => {
    setErrorMsg('');
    if (!modal || modal.kind !== 'edit') return;
    const result = updateLeaveRequest(modal.request.id, selectedType, currentUser.id);
    if (result.success) {
      setModal(null);
      forceRefresh();
    } else {
      setErrorMsg(result.error || 'エラーが発生しました');
    }
  };

  // 申請削除
  const handleDelete = (requestId: string) => {
    removeLeaveRequest(requestId, currentUser.id);
    setModal(null);
    forceRefresh();
  };

  // モーダルを開く（追加）
  const openAddModal = (date: string) => {
    setSelectedType('希望休');
    setErrorMsg('');
    setModal({ kind: 'add', date });
  };

  // モーダルを開く（編集）
  const openEditModal = (request: LeaveRequest) => {
    setSelectedType(request.type);
    setErrorMsg('');
    setModal({ kind: 'edit', request });
  };

  // 曜日ヘッダー（日〜土）
  const DOW = ['日', '月', '火', '水', '木', '金', '土'];

  // 月の初日の曜日インデックス
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  return (
    <div className="max-w-4xl mx-auto pb-8">
      {/* 有給残数バナー */}
      <div className="mb-4 flex items-center justify-between bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-3">
        <div>
          <p className="text-xs text-slate-500">有給残数</p>
          <p className="text-2xl font-bold text-emerald-600">
            {remaining}
            <span className="text-sm font-normal text-slate-500 ml-1">日 / {currentUser.grantedPaidLeaveDays}日</span>
          </p>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded bg-blue-200 border border-blue-300"></span>
            希望休
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded bg-emerald-200 border border-emerald-300"></span>
            有給
          </span>
        </div>
      </div>

      {/* 月ナビ */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-slate-200 transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="text-xl font-bold text-slate-800">
          {year}年 {month + 1}月
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-slate-200 transition-colors">
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* カレンダーグリッド */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[420px]">
        {/* 曜日ヘッダー */}
        <div className="grid grid-cols-7 border-b border-slate-200">
          {DOW.map((d, i) => (
            <div
              key={d}
              className={`text-center text-xs font-bold py-3 ${
                i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-slate-600'
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* 日付グリッド */}
        <div className="grid grid-cols-7">
          {/* 空白セル（月初前） */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="border-r border-b border-slate-100 min-h-[110px] bg-slate-50" />
          ))}

          {dates.map(date => {
            const dayNum = parseInt(date.split('-')[2]);
            const dow = new Date(date).getDay();
            const isToday = date === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            const isPast = new Date(date) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const { mine, othersCount, totalCount } = getDateData(date);
            const isRed = totalCount >= 3;

            return (
              <div
                key={date}
                className={`border-r border-b border-slate-100 min-h-[110px] p-2 ${
                  isPast ? 'bg-slate-50/60' : 'bg-white'
                } ${dow === 6 ? 'last:border-r-0' : ''}`}
              >
                {/* 日付番号 */}
                <div className={`flex items-center justify-between mb-1`}>
                  <span
                    className={`text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full ${
                      isToday
                        ? 'bg-blue-600 text-white'
                        : dow === 0
                        ? 'text-red-500'
                        : dow === 6
                        ? 'text-blue-500'
                        : 'text-slate-700'
                    } ${isPast ? 'opacity-50' : ''}`}
                  >
                    {dayNum}
                  </span>
                  {/* 他ユーザーの希望数 */}
                  {othersCount > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isRed
                          ? 'bg-red-100 text-red-600'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                      title={`他${othersCount}名が希望`}
                    >
                      他{othersCount}
                    </span>
                  )}
                </div>

                {/* 自分の申請 */}
                {mine ? (
                  <button
                    onClick={() => openEditModal(mine)}
                    className={`w-full text-left text-xs px-1.5 py-0.5 rounded border ${TYPE_COLOR[mine.type]} flex items-center justify-between gap-1 hover:opacity-80 transition-opacity`}
                  >
                    <span className="font-medium truncate">{mine.type}</span>
                    <Edit2 className="w-2.5 h-2.5 flex-shrink-0" />
                  </button>
                ) : (
                  !isPast && (
                    <button
                      onClick={() => openAddModal(date)}
                      className="w-full text-xs text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg py-2 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      申請
                    </button>
                  )
                )}

                {/* 3名以上の警告ドット */}
                {isRed && !mine && (
                  <div className="mt-0.5 flex justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
          </div>
        </div>
      </div>

      {/* 注意書き */}
      <p className="text-xs text-slate-400 mt-3 text-center">
        ※ 1日の希望者が3名以上の場合、「他〇名」が赤色で表示されます
      </p>

      {/* モーダル */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={e => { if (e.target === e.currentTarget) setModal(null); }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6">
            {/* ヘッダー */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">
                {modal.kind === 'add' ? '休暇希望を申請' : '申請を編集'}
              </h3>
              <button onClick={() => setModal(null)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* 日付 */}
            <p className="text-sm text-slate-500 mb-4">
              {modal.kind === 'add'
                ? (() => {
                    const d = new Date(modal.date);
                    return `${d.getMonth() + 1}月${d.getDate()}日（${getDayOfWeekLabel(modal.date)}）`;
                  })()
                : (() => {
                    const d = new Date(modal.request.date);
                    return `${d.getMonth() + 1}月${d.getDate()}日（${getDayOfWeekLabel(modal.request.date)}）`;
                  })()
              }
            </p>

            {/* エラー */}
            {errorMsg && (
              <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-3">{errorMsg}</p>
            )}

            {/* 種別選択 */}
            <div className="flex gap-2 mb-5">
              {(['希望休', '有給'] as LeaveType[]).map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg border transition-colors ${
                    selectedType === t
                      ? t === '希望休'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {t}
                  {t === '有給' && <span className="text-xs ml-1 opacity-75">(残{remaining}日)</span>}
                </button>
              ))}
            </div>

            {/* アクションボタン */}
            <div className="flex gap-2">
              {modal.kind === 'edit' && (
                <button
                  onClick={() => handleDelete(modal.request.id)}
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  削除
                </button>
              )}
              <button
                onClick={modal.kind === 'add' ? handleAdd : handleUpdate}
                className="flex-1 flex items-center justify-center gap-1 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Check className="w-4 h-4" />
                {modal.kind === 'add' ? '申請する' : '保存する'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
