'use client'
import Link from 'next/link'
import { useLang } from '../../lang-context'
import { useSaved } from '../../saved-context'
import { tr, COMMON } from '../../translations'

const ITEM = { href: '/dashboard/system/primary-care', title: 'Where to Visit First?', titleJP: 'まずどこへ行くべき？', icon: 'local_hospital', color: '#206777' }
function tl(m: Record<string,string>, l: string) { return m[l] ?? m['EN'] }

const TITLE = { EN: 'Where to Visit First?', JP: 'まずどこへ行くべき？', ZH: '首先去哪里就医？', 'ZH-T': '首先去哪裡就醫？', KO: '먼저 어디로 가야 하나요?', ES: '¿A dónde ir primero?', FR: 'Où aller en premier?', IT: 'Dove andare prima?', TL: 'Saan Una Pumunta?', ID: 'Ke Mana Harus Pergi Pertama?', DE: 'Wohin zuerst?', PT: 'Onde ir primeiro?', RU: 'Куда идти сначала?' }
const SUB   = { EN: 'How Japan\'s clinic system works and how to choose.', JP: '日本のクリニック制度と選び方。', ZH: '日本诊所制度及如何选择。', 'ZH-T': '日本診所制度及如何選擇。', KO: '일본 클리닉 제도와 선택 방법.', ES: 'Cómo funciona el sistema de clínicas.', FR: 'Comment fonctionne le système.', IT: 'Come funziona il sistema delle cliniche.', TL: 'Paano gumagana ang sistema ng klinika.', ID: 'Bagaimana sistem klinika di Jepang.', DE: 'Wie das Klinikystem funktioniert.', PT: 'Como funciona o sistema de clínicas.', RU: 'Как работает система клиник.' }

const H_TYPES   = { EN: 'Types of Facilities', JP: '施設の種類', ZH: '医疗设施类型', 'ZH-T': '醫療設施類型', KO: '의료 시설 유형', ES: 'Tipos de Instalaciones', FR: 'Types d\'Établissements', IT: 'Tipi di Strutture', TL: 'Mga Uri ng Pasilidad', ID: 'Jenis Fasilitas', DE: 'Einrichtungstypen', PT: 'Tipos de Instalações', RU: 'Типы учреждений' }
const H_TIPS    = { EN: 'Practical Tips', JP: '実践的なアドバイス', ZH: '实用建议', 'ZH-T': '實用建議', KO: '실용적인 팁', ES: 'Consejos Prácticos', FR: 'Conseils Pratiques', IT: 'Consigli Pratici', TL: 'Mga Praktikal na Tip', ID: 'Tips Praktis', DE: 'Praktische Tipps', PT: 'Dicas Práticas', RU: 'Практические советы' }
const NO_GP_TITLE = { EN: 'No GP or referral needed to walk in', JP: '紹介状・かかりつけ医は不要です', ZH: '无需家庭医生或转诊，可直接就诊', 'ZH-T': '無需家庭醫生或轉診，可直接就診', KO: '가정의나 의뢰서 없이 바로 방문 가능', ES: 'No se necesita médico de cabecera ni derivación', FR: 'Pas besoin de médecin traitant ni de référence', IT: 'Nessun medico di base o referral necessario', TL: 'Hindi kailangan ng GP o referral para makapasok', ID: 'Tidak perlu dokter umum atau rujukan untuk langsung datang', DE: 'Kein Hausarzt oder Überweisung nötig', PT: 'Sem necessidade de médico de família ou encaminhamento', RU: 'Без врача общей практики и направления' }
const NO_GP_TEXT = {
  EN: 'In Japan, you do not need a registered family doctor or GP to access medical care. You can walk directly into any clinic without a prior appointment or referral. Simply bring your insurance card (保険証) — or cash if uninsured — and visit any clinic that treats your condition.',
  JP: '日本では「かかりつけ医（家庭医）」を通さなくても、直接クリニックや専門医を受診できます。特定のクリニックに登録する義務もありません。どのクリニックでも、保険証を持参すれば当日受診が可能です。',
  ZH: '在日本，您不需要注册家庭医生就可以获得医疗服务。您可以直接走进任何诊所，无需预约或转诊。只需携带保险卡（保険証）——如无保险则带现金——即可在任何能治疗您病症的诊所就诊。',
  'ZH-T': '在日本，您不需要註冊家庭醫生就可以獲得醫療服務。您可以直接走進任何診所，無需預約或轉診。只需攜帶保險卡（保険証）——如無保險則帶現金——即可在任何能治療您病症的診所就診。',
  KO: '일본에서는 가정의나 주치의를 통하지 않고 직접 클리닉이나 전문의를 방문할 수 있습니다. 특정 클리닉에 등록할 의무도 없습니다. 보험증(保険証)을 지참하면 어느 클리닉이든 당일 진료가 가능합니다.',
  ES: 'En Japón, no necesitas un médico de cabecera registrado para acceder a la atención médica. Puedes ir directamente a cualquier clínica sin cita previa ni derivación. Solo trae tu tarjeta de seguro (保険証) — o efectivo si no tienes seguro.',
  FR: 'Au Japon, vous n\'avez pas besoin d\'un médecin traitant enregistré pour accéder aux soins. Vous pouvez entrer directement dans n\'importe quelle clinique sans rendez-vous ni référence. Apportez simplement votre carte d\'assurance (保険証).',
  DE: 'In Japan brauchen Sie keinen eingetragenen Hausarzt, um medizinische Versorgung zu erhalten. Sie können direkt in jede Klinik gehen, ohne Termin oder Überweisung. Bringen Sie einfach Ihre Versicherungskarte (保険証) mit.',
  PT: 'No Japão, você não precisa de um médico de família registrado para acessar cuidados médicos. Pode ir diretamente a qualquer clínica sem consulta ou encaminhamento prévio. Basta trazer seu cartão de seguro (保険証).',
  RU: 'В Японии вам не нужен зарегистрированный семейный врач для получения медицинской помощи. Вы можете напрямую прийти в любую клинику без предварительной записи или направления. Просто возьмите страховую карточку (保険証).',
  IT: 'In Giappone, non hai bisogno di un medico di base registrato per accedere all\'assistenza sanitaria. Puoi andare direttamente in qualsiasi clinica senza appuntamento o referral. Porta semplicemente la tua tessera assicurativa (保険証).',
  TL: 'Sa Japan, hindi mo kailangan ng rehistradong GP para ma-access ang pangangalagang medikal. Maaari kang direktang pumunta sa anumang klinika nang walang appointment o referral. Dalhin lang ang iyong insurance card (保険証).',
  ID: 'Di Jepang, Anda tidak memerlukan dokter umum terdaftar untuk mengakses layanan kesehatan. Anda bisa langsung ke klinika mana pun tanpa janji atau rujukan. Cukup bawa kartu asuransi (保険証).',
}
const LEARN_REFERRALS = { EN: 'Learn about referrals →', JP: '紹介状について詳しく', ZH: '了解转诊信 →', 'ZH-T': '了解轉診信 →', KO: '의뢰서에 대해 알아보기 →', ES: 'Más sobre derivaciones →', FR: 'En savoir plus sur les références →', IT: 'Scopri i referral →', TL: 'Alamin ang tungkol sa mga referral →', ID: 'Pelajari tentang rujukan →', DE: 'Mehr über Überweisungen →', PT: 'Saiba mais sobre encaminhamentos →', RU: 'Узнать о направлениях →' }

const TYPES: Record<string, { icon: string; color: string; title: string; subtitle: string; desc: string }[]> = {
  EN: [
    { icon: 'store_mall_directory', color: '#206777', title: 'クリニック / Clinic (Small)', subtitle: 'Best for most non-emergency situations', desc: 'Private clinics run by 1–2 doctors. Specialties include internal medicine (内科), pediatrics (小児科), orthopedics (整形外科), ENT, dermatology, and more. Shorter waits, lower fees, and more personal care. Always start here for non-emergencies.' },
    { icon: 'local_hospital', color: '#7a5700', title: '病院 / Hospital (Mid-size)', subtitle: 'Multiple departments, requires referral for best service', desc: 'Hospitals with 20+ beds. Can handle more complex conditions but tend to have longer waits. Without a referral, you may face a ¥5,000–¥10,000 surcharge.' },
    { icon: 'domain', color: '#b22620', title: '大学病院 / University Hospital', subtitle: 'Specialist care — referral strongly recommended', desc: 'The largest facilities with cutting-edge equipment. For routine visits, expect extremely long waits (3–5 hours). Requires referral letter (紹介状) to avoid surcharges and priority queuing.' },
  ],
  JP: [
    { icon: 'store_mall_directory', color: '#206777', title: 'クリニック（小規模）', subtitle: '緊急でない症状には最適', desc: '1〜2名の医師が運営する個人クリニック。内科・小児科・整形外科・耳鼻科・皮膚科など様々な科があります。待ち時間が短く、費用も安め。緊急でない場合はまずここへ。' },
    { icon: 'local_hospital', color: '#7a5700', title: '病院（中規模）', subtitle: '複数診療科あり・紹介状があるとスムーズ', desc: '20床以上を持つ病院。より複雑な症状に対応できますが、待ち時間が長い傾向があります。紹介状なしの受診は5,000〜10,000円の加算料が発生することも。' },
    { icon: 'domain', color: '#b22620', title: '大学病院', subtitle: '専門的治療 — 紹介状を強く推奨', desc: '最先端設備を持つ大規模施設。日常的な受診では3〜5時間待ちも珍しくありません。加算料回避と優先診察のために紹介状（しょうかいじょう）が必要です。' },
  ],
  ZH: [
    { icon: 'store_mall_directory', color: '#206777', title: 'クリニック / 诊所（小型）', subtitle: '适合大多数非紧急情况', desc: '由1至2名医生经营的私人诊所。科室包括内科、小児科（儿科）、整形外科（骨科）、耳鼻喉科、皮肤科等。等候时间短、费用低、服务更贴心。非紧急情况请优先到这里就诊。' },
    { icon: 'local_hospital', color: '#7a5700', title: '病院 / 医院（中型）', subtitle: '多科室，建议持转诊信就诊', desc: '拥有20张以上床位的医院。能处理更复杂的病症，但等候时间较长。无转诊信就诊可能需支付5,000至10,000日元的附加费。' },
    { icon: 'domain', color: '#b22620', title: '大学病院 / 大学医院', subtitle: '专科治疗 — 强烈建议持转诊信', desc: '拥有最先进设备的大型医疗机构。普通就诊预计等待3至5小时。需持转诊信（紹介状）以避免附加费并享有优先排队。' },
  ],
  KO: [
    { icon: 'store_mall_directory', color: '#206777', title: 'クリニック / 클리닉 (소규모)', subtitle: '대부분의 비응급 상황에 적합', desc: '1~2명의 의사가 운영하는 개인 클리닉. 내과, 소아과, 정형외과, 이비인후과, 피부과 등 다양한 과목이 있습니다. 대기 시간이 짧고 비용이 낮으며 개인적인 진료를 받을 수 있습니다. 비응급 상황에서는 항상 여기서 시작하세요.' },
    { icon: 'local_hospital', color: '#7a5700', title: '病院 / 병원 (중간 규모)', subtitle: '여러 진료과, 최적 서비스를 위해 의뢰서 필요', desc: '20병상 이상의 병원. 더 복잡한 증상을 처치할 수 있지만 대기 시간이 긴 경향이 있습니다. 의뢰서 없이 방문하면 5,000~10,000엔의 추가 요금이 발생할 수 있습니다.' },
    { icon: 'domain', color: '#b22620', title: '大学病院 / 대학병원', subtitle: '전문 진료 — 의뢰서 강력 권장', desc: '최첨단 장비를 갖춘 대형 시설. 일반 방문 시 3~5시간 대기를 예상하세요. 추가 요금 방지 및 우선 진료를 위해 의뢰서(紹介状)가 필요합니다.' },
  ],
}

const TIPS: Record<string, string[]> = {
  EN: ['For a cold, fever, or minor pain → go to a クリニック near you.', 'Unsure which specialty? Start with 内科 (internal medicine) — they will refer you if needed.', 'Found a good local doctor? Register as a regular patient (かかりつけ患者) for continuity of care.', 'If you need a specialist, ask your clinic for a referral letter (紹介状). It saves you money and time at larger hospitals.'],
  JP: ['風邪・発熱・軽い痛み → 近くのクリニックへ。', 'どの科に行けばいいかわからない？まず内科へ。必要であれば紹介してもらえます。', '良いかかりつけ医が見つかったら、かかりつけ患者として登録しておきましょう。継続的なケアが受けられます。', '専門医が必要な場合は、クリニックで紹介状（しょうかいじょう）を発行してもらいましょう。大病院での費用と時間を節約できます。'],
  ZH: ['感冒、发烧或轻微疼痛 → 前往附近的クリニック（诊所）。', '不确定看哪个科？先去内科（普通内科），必要时医生会帮您转诊。', '找到满意的医生？可登记为固定患者（かかりつけ患者），享受持续性医疗服务。', '需要专科医生时，请向诊所申请转诊信（紹介状），可节省在大医院的费用和时间。'],
  KO: ['감기, 발열, 가벼운 통증 → 근처 クリニック(클리닉)으로 가세요.', '어떤 과를 가야 할지 모르겠다면? 내과(内科)에서 시작하세요 — 필요하면 전문의로 연결해 드립니다.', '좋은 단골 의사를 찾으셨나요? 단골 환자(かかりつけ患者)로 등록하면 지속적인 진료를 받을 수 있습니다.', '전문의가 필요하면 클리닉에서 의뢰서(紹介状)를 받으세요. 대형 병원에서의 비용과 시간을 절약할 수 있습니다.'],
}

export default function PrimaryCarePage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const types = TYPES[lang] ?? TYPES['EN']
  const tips = TIPS[lang] ?? TIPS['EN']

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
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#206777', fontVariationSettings: "'FILL' 1" as string }}>local_hospital</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800 }}>{tl(TITLE, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28 }}>{tl(SUB, lang)}</p>

      <div style={{ background: '#eef7f9', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(32,103,119,0.15)', marginBottom: 28, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#206777', flexShrink: 0, marginTop: 1, fontVariationSettings: "'FILL' 1" as string }}>check_circle</span>
        <div>
          <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#206777', marginBottom: 4 }}>{tl(NO_GP_TITLE, lang)}</p>
          <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{tl(NO_GP_TEXT, lang)}</p>
        </div>
      </div>

      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{tl(H_TYPES, lang)}</h2>
        {types.map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, background: '#fff', borderRadius: 14, padding: '16px', border: '1px solid rgba(226,190,186,0.2)', marginBottom: 10 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{t.icon}</span>
            </div>
            <div>
              <p className="font-headline" style={{ fontSize: 14, fontWeight: 700, color: '#1e1b1c', marginBottom: 3 }}>{t.title}</p>
              <p style={{ fontSize: 11, color: t.color, fontWeight: 600, marginBottom: 6 }}>{t.subtitle}</p>
              <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.65 }}>{t.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{tl(H_TIPS, lang)}</h2>
        <div style={{ background: '#faf2f2', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(226,190,186,0.2)' }}>
          {tips.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < tips.length - 1 ? 10 : 0, alignItems: 'flex-start' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#206777', flexShrink: 0, marginTop: 2 }}>arrow_right</span>
              <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{tip}</p>
            </div>
          ))}
        </div>
      </section>

      <Link href="/dashboard/system/referrals" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#206777', textDecoration: 'none' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_forward</span>
        {tl(LEARN_REFERRALS, lang)}
      </Link>
    </main>
  )
}
