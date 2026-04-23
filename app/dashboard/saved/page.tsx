'use client'
import Link from 'next/link'
import { useLang } from '../lang-context'
import { useSaved } from '../saved-context'
import { tr, COMMON, SAVED_PAGE } from '../translations'

const SUGGESTED = [
  { titleEN: 'Preparation Checklist', titleJP: '準備チェックリスト', icon: 'fact_check', href: '/dashboard/checklist', color: '#7a5700' },
  { titleEN: 'Emergency Numbers', titleJP: '緊急番号', icon: 'emergency_heat', href: '/dashboard/emergency', color: '#b22620' },
  { titleEN: 'Night & Holiday Care', titleJP: '夜間・休日診療', icon: 'bedtime', href: '/dashboard/night-care', color: '#206777' },
]

export default function SavedPage() {
  const { lang } = useLang()
  const { items, toggle } = useSaved()
  const isJP = lang === 'JP'

  return (
    <main className="mj-container" style={{ paddingTop: 28 }}>
      <Link href="/dashboard" className="page-back">
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
        {tr(COMMON.back, lang)}
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#7a5700', fontVariationSettings: "'FILL' 1" as string }}>bookmark</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800, color: '#1e1b1c' }}>{tr(SAVED_PAGE.title, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28 }}>{tr(SAVED_PAGE.subtitle, lang)}</p>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 24px', background: '#faf2f2', borderRadius: 16, border: '1px solid rgba(226,190,186,0.2)', marginBottom: 36 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'rgba(178,38,32,0.2)', display: 'block', marginBottom: 12, fontVariationSettings: "'FILL' 0" as string }}>bookmarks</span>
          <p className="font-headline" style={{ fontSize: 15, fontWeight: 700, color: '#1e1b1c', marginBottom: 6 }}>{tr(SAVED_PAGE.empty, lang)}</p>
          <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 16 }}>{tr(SAVED_PAGE.emptyDesc, lang)}</p>
          <Link href="/dashboard/search" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', background: '#b22620', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>search</span>
            {tr(SAVED_PAGE.browse, lang)}
          </Link>
        </div>
      ) : (
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {items.map(item => (
              <div key={item.href} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)' }}>
                <Link href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, textDecoration: 'none' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{item.icon}</span>
                  </div>
                  <span className="font-headline" style={{ fontSize: 14, fontWeight: 600, color: '#1e1b1c' }}>{isJP ? item.titleJP : item.title}</span>
                </Link>
                <button onClick={() => toggle(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: '#b22620', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" as string }}>bookmark</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-headline" style={{ fontSize: 14, fontWeight: 700, color: '#78716c', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {tr(SAVED_PAGE.recommended, lang)}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SUGGESTED.filter(s => !items.some(i => i.href === s.href)).map(s => (
            <Link key={s.href} href={s.href} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)', textDecoration: 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#fff5f5')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{s.icon}</span>
              </div>
              <span className="font-headline" style={{ fontSize: 14, fontWeight: 600, color: '#1e1b1c', flex: 1 }}>{isJP ? s.titleJP : s.titleEN}</span>
              <span className="material-symbols-outlined" style={{ fontSize: 17, color: '#c7bfbe' }}>chevron_right</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
