'use client'
import Link from 'next/link'
import { useLang } from '../../lang-context'
import { useResidency } from '../../residency-context'
import { useSaved } from '../../saved-context'
import { tr, COMMON } from '../../translations'

const ITEM = { href: '/dashboard/system/insurance', title: 'Insurance & Fees', titleJP: '保険と費用', icon: 'payments', color: '#7a5700' }

const TITLE = { EN: 'Insurance & Fees', JP: '保険と費用', ZH: '保险与费用', 'ZH-T': '保險與費用', KO: '보험과 비용', ES: 'Seguro y Costos', FR: 'Assurance et Frais', IT: 'Assicurazione e Costi', TL: 'Seguro at Bayarin', ID: 'Asuransi & Biaya', DE: 'Versicherung & Kosten', PT: 'Seguro e Custos', RU: 'Страховка и расходы' }
const SUB   = { EN: 'Understanding costs and insurance in Japan.', JP: '日本の医療費と保険の仕組み。', ZH: '了解日本的医疗费用和保险。', 'ZH-T': '了解日本的醫療費用和保險。', KO: '일본 의료비와 보험 이해.', ES: 'Entendiendo costos y seguros en Japón.', FR: 'Comprendre les coûts et assurances au Japon.', IT: 'Capire i costi e le assicurazioni in Giappone.', TL: 'Pag-unawa sa mga gastos at seguro sa Japan.', ID: 'Memahami biaya dan asuransi di Jepang.', DE: 'Kosten und Versicherung in Japan verstehen.', PT: 'Entendendo custos e seguros no Japão.', RU: 'Понимание расходов и страховки в Японии.' }

function tl(m: Record<string,string>, l: string) { return m[l] ?? m['EN'] }

const SECTIONS_EN = [
  {
    residency: null,
    title: 'National Health Insurance (NHI / 国民健康保険)',
    desc: 'Japan\'s public insurance covers 70% of medical costs for eligible residents. You pay 30% (the "co-pay"). To be eligible, you must hold a valid residence status and have stayed (or plan to stay) in Japan for more than 3 months.',
    items: ['Enrollment: within 14 days of arrival or change of address','Monthly premium: ¥1,500–¥8,000+ depending on income','Co-pay: 30% of treatment cost','Children under 3 and seniors 75+ pay less'],
  },
  {
    residency: 'tourist',
    title: 'For Short-term Visitors (Tourist / Visa-free)',
    desc: 'You are NOT eligible for NHI. You will pay 100% of all medical costs out of pocket. Costs can be very high — a single hospital visit can run ¥10,000–¥50,000+.',
    items: ['Travel insurance: strongly recommended before departure','Credit/debit card: major hospitals accept Visa/Mastercard','Cash: always bring ¥20,000–¥50,000 for unexpected needs','Receipts: keep all receipts for home-country insurance reimbursement'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: 'For New Arrivals (< 6 months)',
    desc: 'If you have a residence card (在留カード), you must enroll in NHI within 14 days of registration. Until enrolled, you pay 100%. After enrollment, you pay 30%.',
    items: ['Enroll at your local city/ward office (市区町村役所)','Bring: residence card, passport, and your address registration','Monthly premium is income-based (lower first year)','Work visa holders may be covered by employer\'s health insurance instead'],
    warning: true,
  },
  {
    residency: 'resident',
    title: 'For Long-term / Permanent Residents',
    desc: 'You should already be enrolled in either NHI or employer-based insurance (社会保険). Your co-pay is 30% for most treatments.',
    items: ['Lost insurance card: report to your city office immediately','Changing jobs: re-enroll in NHI within 14 days if leaving company insurance','High-cost benefit (高額療養費): caps monthly out-of-pocket at ~¥80,000','Annual checkups (健康診断): often subsidized or free for NHI members'],
  },
]

const SECTIONS_JP = [
  {
    residency: null,
    title: '国民健康保険（NHI）',
    desc: '日本の公的保険は、加入資格のある居住者の医療費の70%をカバーします。自己負担は30%。加入資格は有効な在留資格を持ち、3ヶ月以上の滞在（予定含む）が条件です。',
    items: ['加入手続き：来日または転居から14日以内','月額保険料：収入に応じて約1,500〜8,000円以上','自己負担：医療費の30%','3歳未満の子供と75歳以上の高齢者はさらに低い負担率'],
  },
  {
    residency: 'tourist',
    title: '短期旅行者・観光客の方へ',
    desc: 'NHIの加入資格はありません。すべての医療費を全額自己負担（10割）します。1回の受診で10,000〜50,000円以上かかることもあります。',
    items: ['海外旅行保険：出発前に加入を強く推奨','クレジットカード：大きな病院ではVisa/Mastercard利用可','現金：緊急時に備え20,000〜50,000円を用意','領収書：帰国後の保険請求に必要なので保管を'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: '来日6ヶ月未満の方へ',
    desc: '在留カードを持っている場合、住民登録から14日以内にNHIに加入する義務があります。加入前は全額自己負担、加入後は3割負担になります。',
    items: ['加入場所：お住まいの市区町村役所','持参物：在留カード・パスポート・住民票','月額保険料は所得に基づき、初年度は低め','就労ビザの場合は会社の社会保険に加入するケースも'],
    warning: true,
  },
  {
    residency: 'resident',
    title: '長期在留者・永住者の方へ',
    desc: 'NHIまたは勤務先の社会保険（社保）にすでに加入しているはずです。通常の治療では3割負担です。',
    items: ['保険証紛失：すぐに市区町村役所に届け出を','転職時：会社保険を脱退後14日以内にNHI加入が必要','高額療養費制度：月の自己負担上限は約80,000円','健康診断：NHI加入者は補助あり・無料の場合も'],
  },
]

const COST_TABLE_EN = [
  { label: 'With NHI (30% co-pay)', rows: [
    { item: 'Standard clinic visit', cost: '¥1,000–¥3,000' },
    { item: 'ER (non-emergency surcharge)', cost: '+¥5,000–¥10,000' },
    { item: 'Hospital admission (per day)', cost: '¥5,000–¥20,000' },
    { item: 'Prescription medicine', cost: '¥200–¥1,500' },
  ]},
  { label: 'Without insurance (100%)', rows: [
    { item: 'Standard clinic visit', cost: '¥3,000–¥10,000' },
    { item: 'ER visit', cost: '¥15,000–¥50,000+' },
    { item: 'Hospital admission (per day)', cost: '¥30,000–¥100,000+' },
    { item: 'Surgery (major)', cost: '¥500,000+' },
  ]},
]

const COST_TABLE_JP = [
  { label: 'NHI加入時（3割負担）', rows: [
    { item: '一般クリニック受診', cost: '1,000〜3,000円' },
    { item: '救急外来加算', cost: '+5,000〜10,000円' },
    { item: '入院（1日あたり）', cost: '5,000〜20,000円' },
    { item: '処方薬', cost: '200〜1,500円' },
  ]},
  { label: '保険なし（10割負担）', rows: [
    { item: '一般クリニック受診', cost: '3,000〜10,000円' },
    { item: '救急外来受診', cost: '15,000〜50,000円以上' },
    { item: '入院（1日あたり）', cost: '30,000〜100,000円以上' },
    { item: '手術（大手術）', cost: '500,000円以上' },
  ]},
]

export default function InsurancePage() {
  const { lang } = useLang()
  const { residency } = useResidency()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const isJP = lang === 'JP'
  const sections = isJP ? SECTIONS_JP : SECTIONS_EN
  const costTable = isJP ? COST_TABLE_JP : COST_TABLE_EN

  const relevantSections = sections.filter(s => s.residency === null || s.residency === residency)

  return (
    <main className="mj-container" style={{ paddingTop: 28, paddingBottom: 40 }}>
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
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#7a5700', fontVariationSettings: "'FILL' 1" as string }}>payments</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800 }}>{tl(TITLE, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28 }}>{tl(SUB, lang)}</p>

      {relevantSections.map((s, i) => (
        <section key={i} style={{ marginBottom: 24 }}>
          <div style={{ background: s.alert ? '#fef2f2' : s.warning ? '#fefce8' : '#fff', borderRadius: 14, padding: '18px 20px', border: `1px solid ${s.alert ? 'rgba(178,38,32,0.15)' : s.warning ? 'rgba(180,130,0,0.15)' : 'rgba(226,190,186,0.2)'}` }}>
            {(s.alert || s.warning) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: s.alert ? '#b22620' : '#7a5700', fontVariationSettings: "'FILL' 1" as string }}>warning</span>
                <span className="font-label" style={{ fontSize: 10, fontWeight: 700, color: s.alert ? '#b22620' : '#7a5700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {s.alert ? (isJP ? '重要' : 'Important') : (isJP ? '要確認' : 'Action Required')}
                </span>
              </div>
            )}
            <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, color: '#1e1b1c', marginBottom: 8 }}>{s.title}</h2>
            <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</p>
            {s.items.map((item, j) => (
              <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: s.alert ? '#b22620' : '#206777', flexShrink: 0, marginTop: 2 }}>check_small</span>
                <span style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section style={{ marginBottom: 24 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#1e1b1c' }}>
          {isJP ? '医療費の目安' : 'Estimated Medical Costs'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {costTable.map((group, gi) => (
            <div key={gi} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(226,190,186,0.2)' }}>
              <div style={{ padding: '8px 16px', background: gi === 0 ? '#f0fdf4' : '#fef2f2', borderBottom: '1px solid rgba(226,190,186,0.15)' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: gi === 0 ? '#16a34a' : '#b22620' }}>{group.label}</span>
              </div>
              {group.rows.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: ri < group.rows.length - 1 ? '1px solid rgba(226,190,186,0.1)' : 'none' }}>
                  <span style={{ fontSize: 13, color: '#5a413d' }}>{row.item}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c' }}>{row.cost}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div style={{ background: '#faf2f2', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)' }}>
        <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.6 }}>
          <strong>{isJP ? 'ヒント：' : 'Tip: '}</strong>
          {isJP ? '高額療養費制度（こうがくりょうようひせいど）により、NHI加入者の月の自己負担には上限（所得に応じ約44,400〜80,100円）があります。' : 'The High-Cost Medical Expense Benefit (高額療養費) caps your monthly out-of-pocket costs for NHI members — roughly ¥44,400–¥80,100 depending on income.'}
        </p>
      </div>
    </main>
  )
}
