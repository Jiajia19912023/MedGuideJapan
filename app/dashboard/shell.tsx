'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LangProvider, useLang, type LangCode } from './lang-context'
import { SavedProvider } from './saved-context'
import { ResidencyProvider } from './residency-context'

const LANGUAGES: { label: string; code: LangCode }[] = [
  { label: '日本語', code: 'JP' },
  { label: 'English', code: 'EN' },
  { label: '中文（简体）', code: 'ZH' },
  { label: '中文（繁體）', code: 'ZH-T' },
  { label: '한국어', code: 'KO' },
  { label: 'Español', code: 'ES' },
  { label: 'Français', code: 'FR' },
  { label: 'Italiano', code: 'IT' },
  { label: 'Tagalog', code: 'TL' },
  { label: 'Bahasa Indonesia', code: 'ID' },
  { label: 'Deutsch', code: 'DE' },
  { label: 'Português (BR)', code: 'PT' },
  { label: 'Русский', code: 'RU' },
  { label: '廣東話', code: 'YUE' },
]

const NAV_LABELS: Record<string, string[]> = {
  EN:    ['Home', 'Emergency', 'Search', 'Saved'],
  JP:    ['ホーム', '緊急', '検索', '保存'],
  ZH:    ['首页', '紧急', '搜索', '收藏'],
  'ZH-T':['首頁', '緊急', '搜索', '收藏'],
  KO:    ['홈', '긴급', '검색', '저장'],
  ES:    ['Inicio', 'Emergencia', 'Buscar', 'Guardado'],
  FR:    ['Accueil', 'Urgence', 'Recherche', 'Enregistré'],
  IT:    ['Home', 'Emergenza', 'Ricerca', 'Salvati'],
  TL:    ['Home', 'Emergency', 'Paghahanap', 'Na-save'],
  ID:    ['Beranda', 'Darurat', 'Cari', 'Tersimpan'],
  DE:    ['Start', 'Notfall', 'Suche', 'Gespeichert'],
  PT:    ['Início', 'Emergência', 'Buscar', 'Salvos'],
  RU:    ['Главная', 'Срочно', 'Поиск', 'Сохранено'],
  YUE:   ['主頁', '緊急', '搜尋', '已儲存'],
}
const NAV_HREFS = ['/dashboard', '/dashboard/emergency', '/dashboard/search', '/dashboard/saved']
const NAV_ICONS = ['home', 'emergency_heat', 'search', 'bookmark']

const HTML_LANG: Record<string, string> = {
  EN: 'en', JP: 'ja', ZH: 'zh-Hans', 'ZH-T': 'zh-Hant',
  KO: 'ko', ES: 'es', FR: 'fr', IT: 'it',
  TL: 'tl', ID: 'id', DE: 'de', PT: 'pt-BR', RU: 'ru',
  YUE: 'yue-Hant-HK',
}

const SHELL_CSS = `
  .mj-root { background: #fff8f8; color: #1e1b1c; min-height: 100dvh; }
  .mj-container { max-width: 760px; margin: 0 auto; padding: 0 20px; }
  .symptom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  @media (min-width: 600px) { .symptom-grid { grid-template-columns: repeat(4, 1fr); } }
  .act-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media (min-width: 680px) { .act-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; } }
  .system-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
  @media (min-width: 680px) {
    .system-grid { grid-template-columns: 1fr 2fr; }
    .system-tall { grid-row: 1 / 3; }
  }
  .act-card { transition: transform 0.15s, box-shadow 0.15s; cursor: pointer; text-decoration: none; display: flex; flex-direction: column; }
  .act-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.09) !important; }
  .insight-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #fff; text-decoration: none; transition: background 0.15s; color: inherit; }
  .insight-row:hover { background: #fff5f5; }
  .insight-row:hover .insight-title { transform: translateX(4px); }
  .insight-title { transition: transform 0.15s; display: block; }
  .lang-btn { display: flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 999px; border: none; background: transparent; cursor: pointer; }
  .lang-btn:hover { background: #f5f5f4; }
  .page-back { display: inline-flex; align-items: center; gap: 4px; color: #5a413d; text-decoration: none; font-size: 13px; margin-bottom: 20px; }
  .page-back:hover { color: #b22620; }
`

function Shell({ children }: { children: ReactNode }) {
  const { lang, setLang } = useLang()
  const [langOpen, setLangOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/dashboard'

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang] ?? 'en'
  }, [lang])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const labels = NAV_LABELS[lang] ?? NAV_LABELS.EN
  const activeIdx = NAV_HREFS.findIndex((href, i) =>
    i === 0 ? pathname === href : pathname.startsWith(href)
  )
  const currentLang = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[1]

  return (
    <div className="mj-root" style={{ paddingBottom: 96 }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,248,248,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #f4eced',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {!isHome && (
              <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 8px 6px 0', display: 'flex', alignItems: 'center', color: '#78716c', borderRadius: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
              </button>
            )}
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <span className="material-symbols-outlined" style={{ color: '#b22620', fontSize: 19 }}>language</span>
              <span className="font-headline" style={{ fontWeight: 700, fontStyle: 'italic', color: '#7f1d1d', fontSize: 16 }}>MedGuide Japan</span>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button className="lang-btn" onClick={() => setLangOpen(v => !v)}>
                <span className="material-symbols-outlined" style={{ color: '#78716c', fontSize: 17 }}>public</span>
                <span className="font-label" style={{ fontSize: 10, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{currentLang.code}</span>
                <span className="material-symbols-outlined" style={{ color: '#c7bfbe', fontSize: 15 }}>{langOpen ? 'expand_less' : 'expand_more'}</span>
              </button>

              {langOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 4px)',
                  width: 188, maxHeight: '60vh', overflowY: 'auto',
                  background: '#fff', borderRadius: 14,
                  boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(226,190,186,0.3)',
                  padding: '4px 0', zIndex: 60,
                }}>
                  {LANGUAGES.map(l => {
                    const active = l.code === lang
                    return (
                      <button key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false) }}
                        style={{
                          width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '8px 14px', fontSize: 13, border: 'none', cursor: 'pointer',
                          background: active ? 'rgba(178,38,32,0.05)' : 'transparent',
                          borderLeft: active ? '3px solid #b22620' : '3px solid transparent',
                          color: active ? '#b22620' : '#5a413d', fontWeight: active ? 600 : 400,
                        }}
                      >
                        {l.label}
                        {active && <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#b22620' }}>check</span>}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {children}

      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: '0 16px 14px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          width: '100%', maxWidth: 340,
          background: 'rgba(255,248,248,0.93)', backdropFilter: 'blur(16px)',
          borderRadius: 18, border: '1px solid rgba(178,38,32,0.09)',
          boxShadow: '0 -2px 24px rgba(32,103,119,0.07)', padding: '5px 4px',
        }}>
          {NAV_HREFS.map((href, i) => {
            const active = i === activeIdx
            return (
              <Link key={href} href={href} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '7px 14px', borderRadius: 12, textDecoration: 'none', transition: 'background 0.15s',
                background: active ? '#fef2f2' : 'transparent',
                color: active ? '#7f1d1d' : 'rgba(32,103,119,0.5)',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 21, fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
                  {NAV_ICONS[i]}
                </span>
                <span className="font-label" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>
                  {labels[i]}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: SHELL_CSS }} />
      <LangProvider>
        <ResidencyProvider>
          <SavedProvider>
            <Shell>{children}</Shell>
          </SavedProvider>
        </ResidencyProvider>
      </LangProvider>
    </>
  )
}
