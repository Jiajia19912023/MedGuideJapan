'use client';

import { useState } from 'react';
import { Save, RotateCcw, CheckCircle } from 'lucide-react';
import { LeaveMasterEntry } from '@/app/types';
import { getAppState, updateLeaveMaster } from '@/app/utils/storage';

const YEAR_LABELS: Record<number, string> = {
  0: '0年（入職初年度）',
  1: '1年',
  2: '2年',
  3: '3年',
  4: '4年',
  5: '5年',
  6: '6年以上',
};

export default function LeaveMasterSettings() {
  const initial = getAppState().leaveMaster;
  const [master, setMaster] = useState<LeaveMasterEntry[]>(
    Array.from({ length: 7 }, (_, i) => {
      const found = initial.find(m => m.yearsOfService === i);
      return found ?? { yearsOfService: i, daysGranted: 10 };
    })
  );
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (years: number, value: string) => {
    const days = parseInt(value);
    setMaster(prev =>
      prev.map(m => m.yearsOfService === years ? { ...m, daysGranted: isNaN(days) ? 0 : days } : m)
    );
    setSaved(false);
  };

  const handleSave = () => {
    setError('');
    // バリデーション：正の整数かつ0以上
    const invalid = master.some(m => m.daysGranted < 0 || !Number.isInteger(m.daysGranted));
    if (invalid) {
      setError('付与日数は0以上の整数で入力してください');
      return;
    }
    updateLeaveMaster(master);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults: LeaveMasterEntry[] = [
      { yearsOfService: 0, daysGranted: 10 },
      { yearsOfService: 1, daysGranted: 11 },
      { yearsOfService: 2, daysGranted: 12 },
      { yearsOfService: 3, daysGranted: 14 },
      { yearsOfService: 4, daysGranted: 16 },
      { yearsOfService: 5, daysGranted: 18 },
      { yearsOfService: 6, daysGranted: 20 },
    ];
    setMaster(defaults);
    setSaved(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-1">有給付与マスタ設定</h2>
        <p className="text-sm text-slate-500 mb-5">
          経験年数ごとの初期有給付与日数を設定します。<br />
          ※ 変更後に登録したスタッフに適用されます。
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>
        )}

        <div className="space-y-3">
          {master.map(entry => (
            <div key={entry.yearsOfService} className="flex items-center gap-3">
              <label className="flex-1 text-sm text-slate-700 font-medium min-w-[160px]">
                {YEAR_LABELS[entry.yearsOfService]}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={40}
                  value={entry.daysGranted}
                  onChange={e => handleChange(entry.yearsOfService, e.target.value)}
                  className="w-20 text-center border border-slate-300 rounded-lg py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="text-sm text-slate-500">日</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            デフォルトに戻す
          </button>
          <button
            onClick={handleSave}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-colors ${
              saved
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                保存しました
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                保存する
              </>
            )}
          </button>
        </div>

        {/* 注記 */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
          <p className="font-semibold mb-1">注意</p>
          <p>既存スタッフの付与日数はこの設定変更では自動更新されません。<br />
          必要に応じて各スタッフの情報を個別に確認してください。</p>
        </div>
      </div>
    </div>
  );
}
