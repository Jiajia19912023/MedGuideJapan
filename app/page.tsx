'use client';

import { useState, useEffect } from 'react';
import { LogOut, Settings, Calendar, LayoutGrid } from 'lucide-react';
import { User } from '@/app/types';
import { getCurrentUser, logout } from '@/app/utils/storage';
import LoginPage from '@/app/components/LoginPage';
import RegisterPage from '@/app/components/RegisterPage';
import StaffCalendar from '@/app/components/StaffCalendar';
import AdminCalendar from '@/app/components/AdminCalendar';
import LeaveMasterSettings from '@/app/components/LeaveMasterSettings';

type View = 'login' | 'register' | 'staff-calendar' | 'admin-calendar' | 'admin-settings';

export default function Home() {
  const [view, setView] = useState<View>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  // クライアントマウント後にセッション復元
  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setView(user.isAdmin ? 'admin-calendar' : 'staff-calendar');
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setView(user.isAdmin ? 'admin-calendar' : 'staff-calendar');
  };

  const handleLogout = () => {
    if (!confirm('ログアウトしますか？')) return;
    logout();
    setCurrentUser(null);
    setView('login');
  };

  // SSRではローディング表示
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  // 未ログイン
  if (!currentUser) {
    if (view === 'register') {
      return (
        <RegisterPage
          onRegisterSuccess={handleLoginSuccess}
          onSwitchToLogin={() => setView('login')}
        />
      );
    }
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={() => setView('register')}
      />
    );
  }

  // ログイン済み
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ナビゲーションバー */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* タイトル＋ユーザー情報 */}
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-tight">
              休暇希望申請システム
            </h1>
            <p className="text-xs text-slate-500">
              {currentUser.isAdmin ? '管理者' : currentUser.name}
              {!currentUser.isAdmin && (
                <span className="ml-2 text-slate-400">ID: {currentUser.id}</span>
              )}
            </p>
          </div>

          {/* ナビボタン */}
          <nav className="flex items-center gap-1">
            {currentUser.isAdmin ? (
              <>
                <button
                  onClick={() => setView('admin-calendar')}
                  className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    view === 'admin-calendar'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">カレンダー</span>
                </button>
                <button
                  onClick={() => setView('admin-settings')}
                  className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    view === 'admin-settings'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">有給マスタ</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setView('staff-calendar')}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  view === 'staff-calendar'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">カレンダー</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">ログアウト</span>
            </button>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {view === 'staff-calendar' && <StaffCalendar currentUser={currentUser} />}
        {view === 'admin-calendar' && <AdminCalendar currentUser={currentUser} />}
        {view === 'admin-settings' && <LeaveMasterSettings />}
      </main>

      {/* フッター */}
      <footer className="border-t border-slate-200 bg-white mt-8 py-4 text-center text-xs text-slate-400">
        看護師休暇希望申請システム MVP &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
