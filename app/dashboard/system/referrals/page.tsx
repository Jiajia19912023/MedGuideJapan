'use client'
import Link from 'next/link'
import { useLang } from '../../lang-context'
import { useSaved } from '../../saved-context'
import { tr, COMMON } from '../../translations'

const ITEM = { href: '/dashboard/system/referrals', title: 'Referrals & Large Hospitals', titleJP: '紹介状と大病院', icon: 'description', color: '#b22620' }
function tl(m: Record<string,string>, l: string) { return m[l] ?? m['EN'] }

const TITLE = { EN: 'Referrals & Large Hospitals', JP: '紹介状と大病院', ZH: '转诊信与大型医院', 'ZH-T': '轉診信與大型醫院', KO: '진료 의뢰서와 대형 병원', ES: 'Derivaciones y Hospitales Grandes', FR: 'Références et Grands Hôpitaux', IT: 'Referral e Grandi Ospedali', TL: 'Mga Referral at Malalaking Ospital', ID: 'Rujukan dan Rumah Sakit Besar', DE: 'Überweisungen & Krankenhäuser', PT: 'Encaminhamentos e Hospitais', RU: 'Направления и крупные больницы' }
const SUB   = { EN: 'When you need a specialist and how to get there.', JP: '専門医が必要なときの手順と紹介状の使い方。', ZH: '需要专科医生时如何获得转诊。', 'ZH-T': '需要專科醫生時如何獲得轉診。', KO: '전문의가 필요할 때 어떻게 해야 하는지.', ES: 'Cuándo necesitas un especialista y cómo llegar.', FR: 'Quand vous avez besoin d\'un spécialiste.', IT: 'Quando hai bisogno di uno specialista.', TL: 'Kailan kailangan ng espesyalista at paano makuha.', ID: 'Kapan butuh spesialis dan cara mendapatkannya.', DE: 'Wann Sie einen Spezialisten brauchen.', PT: 'Quando precisar de um especialista.', RU: 'Когда нужен специалист и как туда попасть.' }

const H_STEPS = { EN: 'How Referrals Work', JP: '紹介までの流れ', ZH: '转诊流程', 'ZH-T': '轉診流程', KO: '진료 의뢰 절차', ES: 'Cómo funciona la derivación', FR: 'Comment fonctionne la référence', IT: 'Come funzionano i referral', TL: 'Paano Gumagana ang Referral', ID: 'Cara Kerja Rujukan', DE: 'Wie Überweisungen funktionieren', PT: 'Como funcionam os encaminhamentos', RU: 'Как работают направления' }
const H_WHY  = { EN: 'Why Get a Referral?', JP: '紹介状を取得する理由', ZH: '为什么需要转诊？', 'ZH-T': '為什麼需要轉診？', KO: '왜 의뢰서가 필요한가?', ES: '¿Por qué pedir una derivación?', FR: 'Pourquoi obtenir une référence?', IT: 'Perché richiedere un referral?', TL: 'Bakit Kumuha ng Referral?', ID: 'Mengapa Perlu Rujukan?', DE: 'Warum eine Überweisung?', PT: 'Por que obter encaminhamento?', RU: 'Зачем нужно направление?' }
const H_TYPES = { EN: 'Common Specialties', JP: '主な診療科一覧', ZH: '常见专科', 'ZH-T': '常見專科', KO: '주요 전문과목', ES: 'Especialidades Comunes', FR: 'Spécialités Courantes', IT: 'Specialità Comuni', TL: 'Karaniwang Espesyalidad', ID: 'Spesialisasi Umum', DE: 'Häufige Fachrichtungen', PT: 'Especialidades Comuns', RU: 'Распространённые специализации' }

const STEPS: Record<string, { step: string; title: string; desc: string }[]> = {
  EN: [
    { step: '1', title: 'Visit a local clinic first', desc: 'Start at a クリニック near you. Explain your symptoms. The doctor will evaluate whether you need specialist care or can be treated there.' },
    { step: '2', title: 'Request a referral letter (紹介状)', desc: 'If specialist care is needed, ask for a 紹介状 (shōkaijō). This is a formal letter to a specific hospital or department. It tells the next doctor your full history.' },
    { step: '3', title: 'Contact the hospital', desc: 'Call the hospital\'s reception (受付) to make an appointment with the relevant department. Bring your 紹介状, insurance card (保険証), and ID.' },
    { step: '4', title: 'At the hospital', desc: 'Present your referral letter at reception. You\'ll be directed to the correct department. Expect longer waits than a clinic — bring water, snacks, and something to read.' },
  ],
  JP: [
    { step: '1', title: 'まず近くのクリニックへ', desc: '近くのクリニックを受診し、症状を説明してください。医師が専門的な治療が必要かどうかを判断します。' },
    { step: '2', title: '紹介状を依頼する', desc: '専門医が必要な場合は、紹介状（しょうかいじょう）を発行してもらいましょう。これは特定の病院・診療科への正式な文書で、これまでの経緯が記載されます。' },
    { step: '3', title: '病院に連絡する', desc: '受診する病院の受付に電話し、該当診療科の予約を取ります。紹介状・保険証・身分証明書を持参しましょう。' },
    { step: '4', title: '病院での受診', desc: '受付で紹介状を提示すると、該当科へ案内されます。クリニックより待ち時間が長くなるため、飲み物や軽食、暇つぶしの準備をしておきましょう。' },
  ],
  ZH: [
    { step: '1', title: '先去附近的诊所', desc: '前往附近的クリニック（小诊所）就诊，向医生说明症状。医生会判断是否需要专科治疗。' },
    { step: '2', title: '申请转诊信（紹介状）', desc: '如果需要专科治疗，请向医生申请紹介状（shōkaijō）。这是写给特定医院或科室的正式信件，包含您的完整病史。' },
    { step: '3', title: '联系医院', desc: '致电医院前台（受付）预约相关科室。请携带紹介状、医疗保险卡（保険証）和身份证件。' },
    { step: '4', title: '在医院就诊', desc: '在前台出示转诊信，工作人员会引导您前往相应科室。等待时间通常比诊所长，建议带水、零食和消遣物品。' },
  ],
  KO: [
    { step: '1', title: '먼저 근처 클리닉 방문', desc: '근처 クリニック(클리닉)을 방문해 증상을 설명하세요. 의사가 전문의 치료가 필요한지 판단합니다.' },
    { step: '2', title: '의뢰서(紹介状) 요청', desc: '전문 치료가 필요하면 紹介状(쇼카이조)를 요청하세요. 특정 병원이나 진료과에 보내는 공식 서한으로, 전체 병력이 기재됩니다.' },
    { step: '3', title: '병원에 연락', desc: '병원 접수처(受付)에 전화해 해당 진료과 예약을 잡으세요. 의뢰서, 보험증(保険証), 신분증을 지참하세요.' },
    { step: '4', title: '병원에서 진료', desc: '접수처에 의뢰서를 제출하면 해당 과로 안내됩니다. 클리닉보다 대기 시간이 길 수 있으니 물, 간식, 읽을 거리를 준비하세요.' },
  ],
}

const WHY: Record<string, { icon: string; title: string; desc: string }[]> = {
  EN: [
    { icon: 'savings', title: 'Saves money', desc: 'Without a referral at a hospital with 200+ beds, you\'ll pay a ¥5,000–¥10,000 uncovered surcharge on top of normal fees.' },
    { icon: 'schedule', title: 'Saves time', desc: 'Referred patients are often given priority scheduling. Walk-ins at large hospitals can wait 3–5 hours.' },
    { icon: 'history_edu', title: 'Better care', desc: 'Your referral letter carries your full history, symptoms, test results, and the referring doctor\'s assessment — giving the specialist a head start.' },
  ],
  JP: [
    { icon: 'savings', title: '費用の節約', desc: '200床以上の病院に紹介状なしで受診すると、通常の医療費に加えて5,000〜10,000円の「選定療養費」がかかります。' },
    { icon: 'schedule', title: '時間の節約', desc: '紹介状がある場合、優先的に予約が取れることが多いです。大病院の飛び込み受診は3〜5時間待ちも珍しくありません。' },
    { icon: 'history_edu', title: 'より良いケア', desc: '紹介状には症状・検査結果・かかりつけ医の見解など詳細な情報が記載されており、専門医がすぐに状況を把握できます。' },
  ],
  ZH: [
    { icon: 'savings', title: '节省费用', desc: '在有200张以上床位的医院，无转诊信就诊需额外支付5,000至10,000日元的"选定疗养费"。' },
    { icon: 'schedule', title: '节省时间', desc: '持有转诊信的患者通常可以优先预约。直接去大医院挂号可能要等待3至5小时。' },
    { icon: 'history_edu', title: '更好的医疗', desc: '转诊信包含您的完整病史、症状、检查结果及原医生的评估，让专科医生能快速了解您的情况。' },
  ],
  KO: [
    { icon: 'savings', title: '비용 절약', desc: '200병상 이상 병원을 의뢰서 없이 방문하면 일반 진료비 외에 5,000~10,000엔의 추가 요금이 발생합니다.' },
    { icon: 'schedule', title: '시간 절약', desc: '의뢰서가 있으면 우선 예약이 가능한 경우가 많습니다. 대형 병원 방문 시 3~5시간 대기는 드문 일이 아닙니다.' },
    { icon: 'history_edu', title: '더 나은 진료', desc: '의뢰서에는 전체 병력, 증상, 검사 결과, 담당의 소견이 포함되어 전문의가 즉시 상황을 파악할 수 있습니다.' },
  ],
}

const INFO_NOTE = {
  EN: 'A referral letter (紹介状) may take 1–2 days to prepare. Tell the doctor if it\'s urgent. There may be a separate preparation fee of ¥1,000–¥3,000.',
  JP: '紹介状（しょうかいじょう）の発行には通常1〜2日かかることがあります。急ぎの場合はその旨を医師に伝えましょう。発行費用（約1,000〜3,000円）は別途かかる場合があります。',
  ZH: '准备紹介状（转诊信）通常需要1至2天。如情况紧急，请告知医生。另外可能需要额外支付1,000至3,000日元的制作费用。',
  'ZH-T': '準備紹介状（轉診信）通常需要1至2天。如情況緊急，請告知醫生。另外可能需要額外支付1,000至3,000日元的製作費用。',
  KO: '紹介状(의뢰서) 준비에는 보통 1~2일이 소요됩니다. 급한 경우 의사에게 알리세요. 별도 작성 수수료 1,000~3,000엔이 발생할 수 있습니다.',
  ES: 'La carta de derivación (紹介状) puede tardar 1–2 días en prepararse. Si es urgente, dígale al médico. Puede haber una tarifa adicional de ¥1,000–¥3,000.',
  FR: 'La lettre de référence (紹介状) peut prendre 1 à 2 jours. Dites au médecin si c\'est urgent. Des frais de préparation de ¥1,000–¥3,000 peuvent s\'appliquer.',
  DE: 'Ein Überweisungsbrief (紹介状) kann 1–2 Tage dauern. Teilen Sie dem Arzt mit, wenn es dringend ist. Es können ¥1.000–¥3.000 Bearbeitungsgebühren anfallen.',
  PT: 'A carta de encaminhamento (紹介状) pode levar 1–2 dias. Diga ao médico se for urgente. Pode haver uma taxa de ¥1.000–¥3.000.',
  RU: 'Подготовка направления (紹介状) занимает 1–2 дня. Сообщите врачу, если срочно. Может взиматься дополнительная плата ¥1,000–¥3,000.',
  IT: 'La lettera di referral (紹介状) può richiedere 1–2 giorni. Informare il medico se urgente. Potrebbe esserci una tariffa di ¥1.000–¥3.000.',
  TL: 'Ang referral letter (紹介状) ay maaaring tumagal ng 1–2 araw. Sabihin sa doktor kung mahalaga. Maaaring may bayad na ¥1,000–¥3,000.',
  ID: 'Surat rujukan (紹介状) mungkin membutuhkan 1–2 hari. Beri tahu dokter jika mendesak. Mungkin ada biaya tambahan ¥1.000–¥3.000.',
}

const BACK_LINK = {
  EN: '← Back to Types of Facilities', JP: '施設の種類について戻る', ZH: '← 返回医疗设施类型', 'ZH-T': '← 返回醫療設施類型',
  KO: '← 의료 시설 유형으로 돌아가기', ES: '← Volver a Tipos de Instalaciones', FR: '← Retour aux Types d\'Établissements',
  IT: '← Torna ai Tipi di Strutture', TL: '← Bumalik sa Mga Uri ng Pasilidad', ID: '← Kembali ke Jenis Fasilitas',
  DE: '← Zurück zu Einrichtungstypen', PT: '← Voltar aos Tipos de Instalações', RU: '← Назад к типам учреждений',
}

const TYPES = [
  { labelEN: 'Internal Medicine', labelJP: '内科', labelZH: '内科', labelKO: '내과', icon: 'stethoscope', noteEN: 'General health, chest, stomach, infection', noteZH: '全身、胸部、胃肠、感染', noteKO: '전신, 흉부, 위, 감염' },
  { labelEN: 'Orthopedics', labelJP: '整形外科', labelZH: '骨科', labelKO: '정형외과', icon: 'personal_injury', noteEN: 'Bone, joint, muscle, back pain', noteZH: '骨骼、关节、肌肉、腰痛', noteKO: '뼈, 관절, 근육, 허리 통증' },
  { labelEN: 'Cardiology', labelJP: '循環器科', labelZH: '心内科', labelKO: '순환기내과', icon: 'cardiology', noteEN: 'Heart, blood pressure', noteZH: '心脏、血压', noteKO: '심장, 혈압' },
  { labelEN: 'Neurology', labelJP: '神経内科', labelZH: '神经内科', labelKO: '신경내과', icon: 'neurology', noteEN: 'Headache, dizziness, nerve conditions', noteZH: '头痛、眩晕、神经疾病', noteKO: '두통, 어지럼증, 신경 질환' },
  { labelEN: 'Dermatology', labelJP: '皮膚科', labelZH: '皮肤科', labelKO: '피부과', icon: 'dermatology', noteEN: 'Skin, rash, allergies', noteZH: '皮肤、皮疹、过敏', noteKO: '피부, 발진, 알레르기' },
  { labelEN: 'OB/GYN', labelJP: '産婦人科', labelZH: '妇产科', labelKO: '산부인과', icon: 'pregnant_woman', noteEN: "Women's health, pregnancy", noteZH: '女性健康、孕期', noteKO: '여성 건강, 임신' },
  { labelEN: 'Ophthalmology', labelJP: '眼科', labelZH: '眼科', labelKO: '안과', icon: 'visibility', noteEN: 'Eyes, vision', noteZH: '眼睛、视力', noteKO: '눈, 시력' },
  { labelEN: 'Psychiatry', labelJP: '精神科 / 心療内科', labelZH: '精神科 / 心療内科', labelKO: '정신건강의학과 / 심료내과', icon: 'psychology', noteEN: 'Mental health, stress, depression', noteZH: '心理健康、压力、抑郁', noteKO: '정신 건강, 스트레스, 우울증' },
]

export default function ReferralsPage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const steps = STEPS[lang] ?? STEPS['EN']
  const why = WHY[lang] ?? WHY['EN']
  const isZH = lang === 'ZH' || lang === 'ZH-T'
  const isKO = lang === 'KO'

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
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#b22620', fontVariationSettings: "'FILL' 1" as string }}>description</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800 }}>{tl(TITLE, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28 }}>{tl(SUB, lang)}</p>

      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{tl(H_STEPS, lang)}</h2>
        <div style={{ position: 'relative', paddingLeft: 28 }}>
          <div style={{ position: 'absolute', left: 11, top: 12, bottom: 12, width: 2, background: 'rgba(178,38,32,0.12)', borderRadius: 2 }} />
          {steps.map((s, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: i < steps.length - 1 ? 20 : 0 }}>
              <div style={{ position: 'absolute', left: -28, top: 0, width: 22, height: 22, borderRadius: '50%', background: '#b22620', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{s.step}</span>
              </div>
              <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)' }}>
                <p className="font-headline" style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: '#1e1b1c' }}>{s.title}</p>
                <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{tl(H_WHY, lang)}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {why.map((w, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)', alignItems: 'flex-start' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#b22620', fontVariationSettings: "'FILL' 1" as string }}>{w.icon}</span>
              </div>
              <div>
                <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c', marginBottom: 4 }}>{w.title}</p>
                <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{tl(H_TYPES, lang)}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {TYPES.map((t, i) => {
            const label = lang === 'JP' ? t.labelJP : isZH ? t.labelZH : isKO ? t.labelKO : t.labelEN
            const note = isZH ? t.noteZH : isKO ? t.noteKO : t.noteEN
            return (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', border: '1px solid rgba(226,190,186,0.2)' }}>
                <p className="font-headline" style={{ fontSize: 12, fontWeight: 700, color: '#1e1b1c', marginBottom: 2 }}>{label}</p>
                {lang !== 'JP' && <p style={{ fontSize: 10, color: '#78716c', marginBottom: 4 }}>{t.labelJP}</p>}
                <p style={{ fontSize: 11, color: '#5a413d', lineHeight: 1.5 }}>{note}</p>
              </div>
            )
          })}
        </div>
      </section>

      <div style={{ background: '#fef2f2', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(178,38,32,0.12)', marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#b22620', flexShrink: 0, marginTop: 1, fontVariationSettings: "'FILL' 1" as string }}>info</span>
          <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{tl(INFO_NOTE, lang)}</p>
        </div>
      </div>

      <Link href="/dashboard/system/primary-care" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#206777', textDecoration: 'none' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_back</span>
        {tl(BACK_LINK, lang)}
      </Link>
    </main>
  )
}
