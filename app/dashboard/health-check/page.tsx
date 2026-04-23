'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '../lang-context'
import { useSaved } from '../saved-context'
import { tr, COMMON, HEALTHCHECK } from '../translations'

interface SavedResult {
  id: string
  resultId: ResultId
  timestamp: number
  answers: AnswerMap
}

function loadHistory(): SavedResult[] {
  try { return JSON.parse(localStorage.getItem('mj_health_history') ?? '[]') } catch { return [] }
}
function saveToHistory(entry: SavedResult) {
  const prev = loadHistory().filter(e => e.id !== entry.id)
  try { localStorage.setItem('mj_health_history', JSON.stringify([entry, ...prev].slice(0, 5))) } catch {}
}

const ITEM = { href: '/dashboard/health-check', title: 'Check Current Health Status', titleJP: '今の健康状態を確認する', icon: 'monitor_heart', color: '#206777' }

type StepId = 'start' | 'symptom' | 'fever' | 'child' | 'injury' | 'result'
type ResultId = '119' | '7119' | '8000' | 'night-clinic' | 'clinic'

interface Result {
  color: string
  icon: string
  title: string
  titleJP: string
  desc: string
  descJP: string
  number: string | null
  numberLabel?: string
  links: { label: string; labelJP: string; href: string }[]
  tip?: string
  tipJP?: string
}

const RESULTS: Record<ResultId, Result> = {
  '119': {
    color: '#b22620',
    icon: 'ambulance',
    title: 'Call 119 Now',
    titleJP: '今すぐ119番通報',
    desc: 'This sounds like a life-threatening emergency. Call 119 immediately for an ambulance. Stay on the line and follow the operator\'s instructions.',
    descJP: '命に関わる緊急事態の可能性があります。すぐに119番に電話し、救急車を要請してください。電話を切らず、指示に従ってください。',
    number: '119',
    numberLabel: 'Ambulance & Fire',
    links: [
      { label: 'Ambulance Guide', labelJP: '救急車ガイド', href: '/dashboard/ambulance' },
      { label: 'What to say to 119', labelJP: '119番でのセリフ', href: '/dashboard/ambulance' },
    ],
    tip: 'Say: "Kyūkyū desu" (救急です) — "It\'s an emergency"',
    tipJP: '「救急です」と伝え、住所を教えてください。',
  },
  '7119': {
    color: '#206777',
    icon: 'call',
    title: 'Call #7119',
    titleJP: '#7119に電話',
    desc: 'A nurse or doctor will evaluate your symptoms and tell you whether to go to the ER, visit a night clinic, or wait until morning. Available 24h in most prefectures.',
    descJP: '看護師または医師が症状を確認し、救急病院・夜間クリニック・朝まで待機のどれが適切か教えてくれます。多くの都道府県で24時間対応。',
    number: '#7119',
    numberLabel: 'Medical Consultation Hotline',
    links: [
      { label: '#7119 & #8000 Guide', labelJP: '#7119・#8000ガイド', href: '/dashboard/hotline' },
      { label: 'Night & Holiday Care', labelJP: '夜間・休日診療', href: '/dashboard/night-care' },
    ],
    tip: 'English available in Tokyo, Osaka, and major cities.',
    tipJP: '東京・大阪などの主要都市では英語対応あり。',
  },
  '8000': {
    color: '#7a5700',
    icon: 'child_care',
    title: 'Call #8000',
    titleJP: '#8000に電話',
    desc: 'A pediatric nurse will assess your child\'s symptoms and tell you how urgent it is. Essential for parents unsure whether a fever or vomiting needs an ER visit.',
    descJP: '小児科看護師がお子さんの症状を確認し、緊急度を教えてくれます。子供の発熱や嘔吐でどうすべきかわからない時に最適。',
    number: '#8000',
    numberLabel: 'Pediatric Advice Hotline',
    links: [
      { label: '#7119 & #8000 Guide', labelJP: '#7119・#8000ガイド', href: '/dashboard/hotline' },
    ],
    tip: 'Available nights & holidays. Hours vary by prefecture.',
    tipJP: '夜間・休日に対応。都道府県により時間が異なります。',
  },
  'night-clinic': {
    color: '#374151',
    icon: 'local_hospital',
    title: 'Find a Night Clinic',
    titleJP: '夜間クリニックを探す',
    desc: 'Your symptoms suggest you should be seen tonight, but it\'s not an emergency requiring an ambulance. Call #7119 first — they\'ll find the nearest open clinic for you.',
    descJP: '今夜中に受診することをおすすめしますが、救急車が必要な状態ではありません。まず#7119に電話して、近くの夜間クリニックを紹介してもらいましょう。',
    number: '#7119',
    numberLabel: 'To find nearest open clinic',
    links: [
      { label: 'Night & Holiday Care', labelJP: '夜間・休日診療', href: '/dashboard/night-care' },
      { label: '#7119 & #8000 Guide', labelJP: '#7119・#8000ガイド', href: '/dashboard/hotline' },
    ],
    tip: 'Or search Google Maps: 夜間救急クリニック [your city]',
    tipJP: 'またはGoogleマップで「夜間救急クリニック ＋ 都市名」で検索。',
  },
  'clinic': {
    color: '#16a34a',
    icon: 'medical_services',
    title: 'Visit a Regular Clinic',
    titleJP: '通常のクリニックへ',
    desc: 'Your symptoms can likely wait until a regular clinic opens. Bring your insurance card, cash (¥5,000–¥10,000), and a list of any current medications.',
    descJP: '朝まで待って、通常のクリニックを受診できる状態です。保険証、現金（5,000〜10,000円）、服用中の薬のリストを持参してください。',
    number: null,
    links: [
      { label: 'Preparation Checklist', labelJP: '持ち物チェックリスト', href: '/dashboard/checklist' },
      { label: 'Surprises at Japanese Hospitals', labelJP: '日本の病院で驚くこと', href: '/dashboard/articles/surprises' },
    ],
    tip: 'Clinics usually open at 9:00 AM. Arrive early to avoid long waits.',
    tipJP: 'クリニックは通常9時開院。待ち時間を減らすには開院前に到着を。',
  },
}

type AnswerMap = Partial<Record<StepId, string>>

function getResult(answers: AnswerMap): ResultId {
  if (answers.start === 'emergency') return '119'
  const s = answers.symptom
  if (s === 'fever') return answers.fever === 'night' ? '7119' : 'clinic'
  if (s === 'child') return answers.child === 'night' ? '8000' : 'clinic'
  if (s === 'injury') return answers.injury === 'serious' ? '119' : 'night-clinic'
  if (s === 'unsure') return '7119'
  return '7119'
}

interface Step {
  id: StepId
  questionEN: string
  questionJP: string
  options: { value: string; labelEN: string; labelJP: string; icon: string; next: StepId | 'result' }[]
}

const STEPS: Step[] = [
  {
    id: 'start',
    questionEN: 'Is anyone in immediate danger right now?',
    questionJP: '今すぐ命に関わる状況ですか？',
    options: [
      { value: 'emergency', labelEN: 'Yes — unconscious, not breathing, severe bleeding, or stroke', labelJP: 'はい — 意識なし・呼吸停止・大量出血・脳卒中', icon: 'priority_high', next: 'result' },
      { value: 'no', labelEN: 'No — I need help but it\'s not life-threatening', labelJP: 'いいえ — 助けは必要だが命に関わらない', icon: 'check', next: 'symptom' },
    ],
  },
  {
    id: 'symptom',
    questionEN: 'What is the main concern?',
    questionJP: '主な症状・状況は何ですか？',
    options: [
      { value: 'fever', labelEN: 'Fever / cold / flu symptoms', labelJP: '発熱・風邪・インフルエンザ', icon: 'thermometer', next: 'fever' },
      { value: 'child', labelEN: 'Child (infant or young child) is sick', labelJP: '赤ちゃん・子供の体調不良', icon: 'child_care', next: 'child' },
      { value: 'injury', labelEN: 'Injury, pain, or burn', labelJP: 'ケガ・痛み・やけど', icon: 'personal_injury', next: 'injury' },
      { value: 'unsure', labelEN: 'I feel unwell but I\'m not sure what\'s wrong', labelJP: 'なんとなく具合が悪い・よくわからない', icon: 'help', next: 'result' },
    ],
  },
  {
    id: 'fever',
    questionEN: 'What time is it now?',
    questionJP: '今の時間帯は？',
    options: [
      { value: 'night', labelEN: 'Night or holiday — clinics are closed', labelJP: '夜間・休日（クリニックが閉まっている）', icon: 'bedtime', next: 'result' },
      { value: 'day', labelEN: 'Daytime — clinics are open', labelJP: '昼間（クリニックが開いている）', icon: 'wb_sunny', next: 'result' },
    ],
  },
  {
    id: 'child',
    questionEN: 'What time is it now?',
    questionJP: '今の時間帯は？',
    options: [
      { value: 'night', labelEN: 'Night or holiday — clinics are closed', labelJP: '夜間・休日（クリニックが閉まっている）', icon: 'bedtime', next: 'result' },
      { value: 'day', labelEN: 'Daytime — clinics are open', labelJP: '昼間（クリニックが開いている）', icon: 'wb_sunny', next: 'result' },
    ],
  },
  {
    id: 'injury',
    questionEN: 'How serious is it?',
    questionJP: '重症度はどのくらいですか？',
    options: [
      { value: 'serious', labelEN: 'Serious — deep wound, possible fracture, severe burn, or heavy bleeding', labelJP: '重症 — 深い傷・骨折の疑い・重度のやけど・大量出血', icon: 'emergency', next: 'result' },
      { value: 'minor', labelEN: 'Minor — cut, bruise, sprain, or mild burn', labelJP: '軽傷 — 軽い切り傷・打撲・捻挫・軽いやけど', icon: 'band_aid', next: 'result' },
    ],
  },
]

export default function HealthCheckPage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const isJP = lang === 'JP'
  const [stepId, setStepId] = useState<StepId>('start')
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [resultId, setResultId] = useState<ResultId | null>(null)
  const [history, setHistory] = useState<SavedResult[]>([])
  const [resultSaved, setResultSaved] = useState(false)
  const [currentResultId, setCurrentResultId] = useState<string | null>(null)

  useEffect(() => { setHistory(loadHistory()) }, [])

  function saveResult(rId: ResultId, ans: AnswerMap) {
    const entry: SavedResult = { id: Date.now().toString(), resultId: rId, timestamp: Date.now(), answers: ans }
    setCurrentResultId(entry.id)
    saveToHistory(entry)
    setHistory(loadHistory())
    setResultSaved(true)
  }

  function deleteHistoryItem(id: string) {
    const updated = history.filter(e => e.id !== id)
    try { localStorage.setItem('mj_health_history', JSON.stringify(updated)) } catch {}
    setHistory(updated)
  }

  const currentStep = STEPS.find(s => s.id === stepId)!

  function choose(value: string, next: StepId | 'result') {
    const newAnswers = { ...answers, [stepId]: value }
    setAnswers(newAnswers)
    if (next === 'result') {
      setResultId(getResult(newAnswers))
      setStepId('result')
      setResultSaved(false)
      setCurrentResultId(null)
    } else {
      setStepId(next)
    }
  }

  function reset() {
    setStepId('start')
    setAnswers({})
    setResultId(null)
    setResultSaved(false)
    setCurrentResultId(null)
  }

  const stepOrder: StepId[] = ['start', 'symptom', 'fever', 'child', 'injury']
  const visitedSteps = stepOrder.filter(s => answers[s] !== undefined)
  const currentStepIdx = stepOrder.indexOf(stepId)
  const totalVisible = stepId === 'result' ? visitedSteps.length : currentStepIdx + 1

  return (
    <main className="mj-container" style={{ paddingTop: 28, paddingBottom: 48 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Link href="/dashboard" className="page-back" style={{ marginBottom: 0 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
          {tr(COMMON.back, lang)}
        </Link>
        <button onClick={() => toggle(ITEM)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', alignItems: 'center', gap: 4, color: saved ? '#b22620' : '#78716c', fontSize: 12 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
          {saved ? tr(COMMON.saved, lang) : tr(COMMON.save, lang)}
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, marginTop: 16 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#206777', fontVariationSettings: "'FILL' 1" as string }}>monitor_heart</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800 }}>{tr(HEALTHCHECK.title, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28 }}>{tr(HEALTHCHECK.subtitle, lang)}</p>

      {/* Progress dots */}
      {stepId !== 'result' && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              height: 4, borderRadius: 999, flex: 1,
              background: i < totalVisible ? '#206777' : '#f4eced',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      )}

      {stepId !== 'result' && currentStep && (
        <div>
          <p className="font-headline" style={{ fontSize: 18, fontWeight: 700, color: '#1e1b1c', marginBottom: 20, lineHeight: 1.4 }}>
            {isJP ? currentStep.questionJP : currentStep.questionEN}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {currentStep.options.map(opt => (
              <button key={opt.value}
                onClick={() => choose(opt.value, opt.next)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 18px', background: '#fff', borderRadius: 14,
                  border: '1.5px solid rgba(226,190,186,0.3)',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#206777'
                  e.currentTarget.style.background = '#f0fafa'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(226,190,186,0.3)'
                  e.currentTarget.style.background = '#fff'
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f4eced', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#b22620' }}>{opt.icon}</span>
                </div>
                <span style={{ fontSize: 14, color: '#1e1b1c', lineHeight: 1.5, flex: 1 }}>
                  {isJP ? opt.labelJP : opt.labelEN}
                </span>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#c7bfbe', flexShrink: 0 }}>chevron_right</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {stepId === 'result' && resultId && (() => {
        const r = RESULTS[resultId]
        const isUrgent = resultId === '119'
        return (
          <div>
            <div style={{
              background: isUrgent ? r.color : '#fff',
              borderRadius: 18, padding: '24px',
              border: isUrgent ? 'none' : `2px solid ${r.color}30`,
              boxShadow: isUrgent ? '0 8px 32px rgba(178,38,32,0.25)' : '0 2px 16px rgba(0,0,0,0.06)',
              marginBottom: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: isUrgent ? 'rgba(255,255,255,0.2)' : r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 26, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{r.icon}</span>
                </div>
                <h2 className="font-headline" style={{ fontSize: 22, fontWeight: 800, color: isUrgent ? '#fff' : r.color, lineHeight: 1.2 }}>
                  {isJP ? r.titleJP : r.title}
                </h2>
              </div>
              <p style={{ fontSize: 14, color: isUrgent ? 'rgba(255,255,255,0.9)' : '#5a413d', lineHeight: 1.7, marginBottom: r.number ? 20 : 0 }}>
                {isJP ? r.descJP : r.desc}
              </p>

              {r.number && (
                <a href={`tel:${r.number.replace('#', '')}`} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '16px', borderRadius: 14,
                  background: isUrgent ? '#fff' : r.color,
                  textDecoration: 'none',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: isUrgent ? r.color : '#fff', fontVariationSettings: "'FILL' 1" as string }}>call</span>
                  <div style={{ textAlign: 'center' }}>
                    <div className="font-headline" style={{ fontSize: 28, fontWeight: 900, color: isUrgent ? r.color : '#fff', lineHeight: 1 }}>{r.number}</div>
                    {r.numberLabel && <div style={{ fontSize: 11, color: isUrgent ? `${r.color}99` : 'rgba(255,255,255,0.8)', marginTop: 2 }}>{r.numberLabel}</div>}
                  </div>
                </a>
              )}
            </div>

            {(r.tip || r.tipJP) && (
              <div style={{ background: '#faf2f2', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(226,190,186,0.2)', marginBottom: 20 }}>
                <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.6 }}>
                  <strong>{isJP ? 'ヒント：' : 'Tip: '}</strong>{isJP ? r.tipJP : r.tip}
                </p>
              </div>
            )}

            <div style={{ marginBottom: 28 }}>
              <p className="font-label" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716c', marginBottom: 10 }}>
                {tr(HEALTHCHECK.related, lang)}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {r.links.map(link => (
                  <Link key={link.href} href={link.href} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '13px 16px', background: '#fff', borderRadius: 12,
                    border: '1px solid rgba(226,190,186,0.2)', textDecoration: 'none',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fff5f5')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#b22620' }}>article</span>
                    <span style={{ fontSize: 13, color: '#1e1b1c', flex: 1 }}>{isJP ? link.labelJP : link.label}</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#c7bfbe' }}>chevron_right</span>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={reset} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 16px', background: 'transparent',
                border: '1px solid rgba(226,190,186,0.4)', borderRadius: 10,
                cursor: 'pointer', fontSize: 13, color: '#5a413d',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>refresh</span>
                {tr(HEALTHCHECK.startOver, lang)}
              </button>
              {!resultSaved ? (
                <button onClick={() => saveResult(resultId!, answers)} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '10px 16px', background: '#206777',
                  border: 'none', borderRadius: 10,
                  cursor: 'pointer', fontSize: 13, color: '#fff',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>save</span>
                  {isJP ? 'この結果を保存' : 'Save this result'}
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', background: '#f0fdf4', border: '1px solid rgba(22,163,74,0.2)', borderRadius: 10, fontSize: 13, color: '#16a34a' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check_circle</span>
                  {isJP ? '保存済み' : 'Saved'}
                </div>
              )}
            </div>
          </div>
        )
      })()}

      {/* History */}
      {history.length > 0 && stepId !== 'result' && (
        <section style={{ marginTop: 36 }}>
          <p className="font-label" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716c', marginBottom: 12 }}>
            {isJP ? '過去の記録' : 'Previous Results'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {history.map(entry => {
              const r = RESULTS[entry.resultId]
              const date = new Date(entry.timestamp)
              const dateStr = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2,'0')}`
              return (
                <div key={entry.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#fff', borderRadius: 12, border: '1px solid rgba(226,190,186,0.2)' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{r.icon}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: r.color, marginBottom: 1 }}>{isJP ? r.titleJP : r.title}</p>
                    <p style={{ fontSize: 11, color: '#78716c' }}>{dateStr}</p>
                  </div>
                  <button onClick={() => deleteHistoryItem(entry.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#c7bfbe' }}>delete</span>
                  </button>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}
