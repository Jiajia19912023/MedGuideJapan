'use client';

import { useState } from 'react';
import { UserPlus, User, Lock, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { registerUser } from '@/app/utils/storage';
import { User as UserType } from '@/app/types';
import { calcYearsOfService } from '@/app/utils/vacation';
import { getAppState } from '@/app/utils/storage';

interface Props {
  onRegisterSuccess: (user: UserType) => void;
  onSwitchToLogin: () => void;
}

export default function RegisterPage({ onRegisterSuccess, onSwitchToLogin }: Props) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 入職日から予想付与日数を表示
  const previewDays = (() => {
    if (!hireDate) return null;
    try {
      const state = getAppState();
      const years = calcYearsOfService(hireDate);
      const master = state.leaveMaster;
      const key = Math.min(years, 6);
      const entry = master.find(m => m.yearsOfService === key);
      return { years, days: entry?.daysGranted ?? 10 };
    } catch {
      return null;
    }
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) { setError('氏名を入力してください'); return; }
    if (!id.trim()) { setError('IDを入力してください'); return; }
    if (!/^\d{4}$/.test(pin)) { setError('PINは4桁の数字で入力してください'); return; }
    if (pin !== pinConfirm) { setError('PINが一致しません'); return; }
    if (!hireDate) { setError('入職日を入力してください'); return; }
    if (new Date(hireDate) > new Date()) { setError('入職日は今日以前の日付を入力してください'); return; }

    setIsLoading(true);
    await new Promise(r => setTimeout(r, 150));

    const result = registerUser(id.trim(), name.trim(), pin, hireDate);
    setIsLoading(false);

    if (result.success && result.user) {
      onRegisterSuccess(result.user);
    } else {
      setError(result.error || '登録に失敗しました');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">新規登録</h1>
          <p className="text-sm text-slate-500 mt-1">初回のみ必要です</p>
        </div>

        {/* 登録カード */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 氏名 */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                氏名 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="山田 花子"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* ID */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={id}
                onChange={e => setId(e.target.value)}
                placeholder="ログインに使うIDを決めてください"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* PIN */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                PIN（4桁の数字） <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="••••"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 tracking-widest text-lg"
                />
              </div>
            </div>

            {/* PIN確認 */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                PIN（確認） <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pinConfirm}
                  onChange={e => setPinConfirm(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="••••"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 tracking-widest text-lg"
                />
                {pinConfirm.length === 4 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {pin === pinConfirm
                      ? <CheckCircle className="w-4 h-4 text-green-500" />
                      : <AlertCircle className="w-4 h-4 text-red-400" />
                    }
                  </span>
                )}
              </div>
            </div>

            {/* 入職日 */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                入職日 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={hireDate}
                  onChange={e => setHireDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              {previewDays && (
                <p className="mt-1.5 text-xs text-slate-500 bg-slate-50 rounded px-2 py-1">
                  経験 <span className="font-semibold text-slate-700">{previewDays.years}年</span> →
                  初期有給付与 <span className="font-semibold text-green-700">{previewDays.days}日</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-semibold rounded-lg transition-colors mt-2"
            >
              {isLoading ? '登録中...' : '登録してログイン'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={onSwitchToLogin}
              className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
            >
              ← ログイン画面に戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
