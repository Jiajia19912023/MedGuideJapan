'use client'
import Link from 'next/link'
import { useLang } from '../../lang-context'
import { useSaved } from '../../saved-context'
import { tr, COMMON } from '../../translations'

const ITEM = { href: '/dashboard/system/prescriptions', title: 'Prescription Rules', titleJP: '処方薬のルール', icon: 'medication', color: '#206777' }
function tl(m: Record<string,string>, l: string) { return m[l] ?? m['EN'] }

const TITLE = { EN: 'Prescription Rules', JP: '処方薬のルール', ZH: '处方药规定', 'ZH-T': '處方藥規定', KO: '처방전 규정', ES: 'Reglas de Recetas Médicas', FR: 'Règles de Prescription', IT: 'Regole sulle Prescrizioni', TL: 'Mga Patakaran sa Reseta', ID: 'Aturan Resep', DE: 'Rezeptregeln', PT: 'Regras de Prescrição', RU: 'Правила рецептов' }
const SUB   = { EN: 'How prescriptions work in Japan and what to expect.', JP: '日本での処方薬の仕組みと注意点。', ZH: '日本处方药的运作方式及注意事项。', 'ZH-T': '日本處方藥的運作方式及注意事項。', KO: '일본에서 처방전이 어떻게 작동하는지.', ES: 'Cómo funcionan las recetas en Japón.', FR: 'Comment fonctionnent les ordonnances au Japon.', IT: 'Come funzionano le prescrizioni in Giappone.', TL: 'Paano gumagana ang mga reseta sa Japan.', ID: 'Bagaimana resep bekerja di Jepang.', DE: 'Wie Rezepte in Japan funktionieren.', PT: 'Como funcionam as prescrições no Japão.', RU: 'Как работают рецепты в Японии.' }

const H_FLOW  = { EN: 'From Doctor to Pharmacy', JP: '処方から受け取りまでの流れ', ZH: '从就诊到取药流程', 'ZH-T': '從就診到取藥流程', KO: '처방에서 수령까지 흐름', ES: 'Del Médico a la Farmacia', FR: 'Du Médecin à la Pharmacie', IT: 'Dal Medico alla Farmacia', TL: 'Mula sa Doktor hanggang Parmasya', ID: 'Dari Dokter ke Apotek', DE: 'Vom Arzt zur Apotheke', PT: 'Do Médico à Farmácia', RU: 'От врача до аптеки' }
const H_TIPS  = { EN: 'Useful to Know', JP: '役立つ知識', ZH: '实用知识', 'ZH-T': '實用知識', KO: '알아두면 유용한 정보', ES: 'Información Útil', FR: 'Informations Utiles', IT: 'Informazioni Utili', TL: 'Kapaki-pakinabang na Malaman', ID: 'Informasi Berguna', DE: 'Nützliche Informationen', PT: 'Informações Úteis', RU: 'Полезно знать' }
const H_MEDS  = { EN: 'Commonly Prescribed Medicines', JP: 'よく処方される薬', ZH: '常见处方药', 'ZH-T': '常見處方藥', KO: '자주 처방되는 약', ES: 'Medicamentos Comúnmente Recetados', FR: 'Médicaments Couramment Prescrits', IT: 'Farmaci Comunemente Prescritti', TL: 'Mga Karaniwang Iniresetang Gamot', ID: 'Obat yang Sering Diresepkan', DE: 'Häufig Verschriebene Medikamente', PT: 'Medicamentos Comumente Prescritos', RU: 'Часто назначаемые лекарства' }
const IMPORTANT = { EN: 'Important: ', JP: '重要：', ZH: '重要：', 'ZH-T': '重要：', KO: '중요: ', ES: 'Importante: ', FR: 'Important : ', IT: 'Importante: ', TL: 'Mahalaga: ', ID: 'Penting: ', DE: 'Wichtig: ', PT: 'Importante: ', RU: 'Важно: ' }
const IMPORTANT_TEXT = {
  EN: 'Prescriptions in Japan expire 4 days after issue. Be aware of weekends. An expired prescription requires a new doctor visit.',
  JP: '処方箋の有効期限は発行から4日以内です。土日を挟む場合はご注意ください。期限切れの場合は再受診が必要です。',
  ZH: '日本的处方单自开具之日起4天内有效。请注意周末情况。过期处方需重新就诊。',
  'ZH-T': '日本的處方單自開具之日起4天內有效。請注意週末情況。過期處方需重新就診。',
  KO: '일본 처방전은 발행일로부터 4일 이내에 유효합니다. 주말에 주의하세요. 기간이 지난 처방전은 재진이 필요합니다.',
  ES: 'Las recetas en Japón vencen 4 días después de su emisión. Tenga en cuenta los fines de semana. Una receta vencida requiere una nueva visita al médico.',
  FR: 'Les ordonnances au Japon expirent 4 jours après leur émission. Attention aux week-ends. Une ordonnance expirée nécessite une nouvelle consultation.',
  DE: 'Rezepte in Japan verfallen 4 Tage nach Ausstellung. Wochenenden beachten. Ein abgelaufenes Rezept erfordert einen neuen Arztbesuch.',
  PT: 'As prescrições no Japão vencem 4 dias após a emissão. Atenção aos fins de semana. Uma prescrição vencida requer nova consulta.',
  RU: 'Рецепты в Японии действительны 4 дня с момента выдачи. Учтите выходные. Просроченный рецепт требует нового визита к врачу.',
  IT: 'Le prescrizioni in Giappone scadono 4 giorni dopo l\'emissione. Attenzione ai weekend. Una prescrizione scaduta richiede una nuova visita.',
  TL: 'Ang mga reseta sa Japan ay nag-eexpire pagkatapos ng 4 na araw. Mag-ingat sa mga weekend. Ang na-expire na reseta ay nangangailangan ng bagong pagbisita sa doktor.',
  ID: 'Resep di Jepang kedaluwarsa 4 hari setelah diterbitkan. Perhatikan hari libur. Resep kedaluwarsa memerlukan kunjungan dokter baru.',
}
const BACK_RX = { EN: '← Back to Referrals', JP: '紹介状について戻る', ZH: '← 返回转诊信', 'ZH-T': '← 返回轉診信', KO: '← 의뢰서로 돌아가기', ES: '← Volver a Derivaciones', FR: '← Retour aux Références', IT: '← Torna ai Referral', TL: '← Bumalik sa Referral', ID: '← Kembali ke Rujukan', DE: '← Zurück zu Überweisungen', PT: '← Voltar aos Encaminhamentos', RU: '← Назад к направлениям' }

const STEPS: Record<string, { icon: string; title: string; desc: string }[]> = {
  EN: [
    { icon: 'medical_services', title: 'Doctor issues a prescription (処方箋)', desc: 'After your clinic or hospital visit, the doctor writes a 処方箋 (shohōsen). This slip lists your medicines, dosage, and instructions.' },
    { icon: 'local_pharmacy', title: 'Take it to a pharmacy (薬局)', desc: 'You can use any licensed pharmacy (薬局, yakkyoku) — not just the one attached to the clinic. Many patients use their local 薬局 so the pharmacist knows their full medication history.' },
    { icon: 'payments', title: 'Pay for your medicine', desc: 'With NHI: you pay 30% of the medicine cost. Without insurance: you pay 100%. Most prescriptions cost ¥200–¥1,500 with insurance.' },
    { icon: 'info', title: 'Prescription is valid for 4 days', desc: 'Japanese prescriptions expire after 4 days from the date of issue. Fill it promptly — you cannot use it after the expiration, and you\'ll need to revisit the doctor.' },
  ],
  JP: [
    { icon: 'medical_services', title: '医師が処方箋を発行', desc: 'クリニックや病院の受診後、医師が処方箋（しょほうせん）を発行します。薬の種類・用量・使用方法が記載されています。' },
    { icon: 'local_pharmacy', title: '薬局に持参する', desc: 'クリニック併設の薬局でなくても構いません。かかりつけ薬局を持つと、薬剤師が服用中の薬を把握してくれるため安心です。' },
    { icon: 'payments', title: '薬代を支払う', desc: 'NHI加入時：薬代の30%を自己負担。未加入時：全額（10割）自己負担。保険があれば多くの場合200〜1,500円程度です。' },
    { icon: 'info', title: '処方箋の有効期限は4日間', desc: '日本の処方箋は発行日から4日間のみ有効です。期限内に薬局で受け取るようにしてください。期限を過ぎると再受診が必要になります。' },
  ],
  ZH: [
    { icon: 'medical_services', title: '医生开具处方单（処方箋）', desc: '就诊结束后，医生会开一张処方箋（shohōsen）。上面列有药品名称、剂量和用法说明。' },
    { icon: 'local_pharmacy', title: '前往药局（薬局）取药', desc: '可以去任何持牌薬局，不必是诊所附设的药局。很多患者会固定使用同一家薬局，方便药剂师了解用药史。' },
    { icon: 'payments', title: '支付药费', desc: '持NHI：自付30%。无保险：全额自付（100%）。有保险的情况下，大多数处方约需200至1,500日元。' },
    { icon: 'info', title: '处方单有效期为4天', desc: '日本处方单自开具之日起4天内有效。请尽快去薬局取药，过期后不得使用，需要重新就诊。' },
  ],
  KO: [
    { icon: 'medical_services', title: '의사가 처방전(処方箋) 발행', desc: '진료 후 의사가 処方箋(shohōsen)를 발행합니다. 약 이름, 용량, 복용 방법이 기재되어 있습니다.' },
    { icon: 'local_pharmacy', title: '약국(薬局)에 제출', desc: '클리닉 부설 약국이 아닌 아무 약국(薬局)이나 이용할 수 있습니다. 단골 약국을 정해두면 약사가 복용 이력을 파악할 수 있어 안전합니다.' },
    { icon: 'payments', title: '약값 지불', desc: 'NHI 가입 시: 약값의 30% 자부담. 미가입 시: 전액(100%) 자부담. 보험 있으면 대부분 200~1,500엔 정도입니다.' },
    { icon: 'info', title: '처방전 유효기간은 4일', desc: '일본 처방전은 발행일로부터 4일 이내에만 유효합니다. 기간 내에 약국에서 수령하세요. 기간이 지나면 재진이 필요합니다.' },
  ],
}

const TIPS: Record<string, { label: string; desc: string }[]> = {
  EN: [
    { label: 'Generic drugs (後発品)', desc: 'Ask the pharmacy for generic versions (後発品, kōhatsuhin). They are cheaper and equally effective. The pharmacist can explain options.' },
    { label: 'Dispensing fee (調剤料)', desc: 'Pharmacies charge a separate dispensing fee (¥300–¥800). This is normal and is also covered 30% by NHI.' },
    { label: 'Medication notebook (お薬手帳)', desc: 'Your pharmacist will offer an お薬手帳 (drug history booklet). Keep all your prescriptions here — it prevents dangerous drug interactions and helps any doctor you visit.' },
    { label: 'Bringing medicine from abroad', desc: 'Some foreign medications are controlled or banned in Japan. Check before traveling. You can bring a 1–2 month supply for personal use with a doctor\'s note.' },
    { label: 'OTC medicines (市販薬)', desc: 'Common medicines (cold, pain, stomach) are available over-the-counter at pharmacies (薬局) and drug stores (ドラッグストア) without a prescription.' },
  ],
  JP: [
    { label: 'ジェネリック薬品（後発品）', desc: '薬局でジェネリック（後発品）を希望することができます。先発品と同等の効果で費用を抑えられます。薬剤師に相談しましょう。' },
    { label: '調剤料について', desc: '薬局では調剤料（約300〜800円）が別途かかります。これは正常な費用で、NHI加入者は30%負担となります。' },
    { label: 'お薬手帳の活用', desc: '薬局でお薬手帳の作成を勧められます。処方薬の記録を一冊にまとめておくことで、薬の飲み合わせ事故を防ぎ、どの医療機関でも情報共有ができます。' },
    { label: '海外からの薬の持ち込み', desc: '日本で規制・禁止されている薬もあります。渡航前に確認を。個人使用目的であれば医師の証明書とともに1〜2ヶ月分の持ち込みが認められる場合があります。' },
    { label: '市販薬について', desc: '風邪薬・鎮痛剤・胃腸薬などは処方箋なしで薬局やドラッグストアで購入できます。' },
  ],
  ZH: [
    { label: '仿制药（後発品）', desc: '可以向药局申请仿制药（後発品，kōhatsuhin）。效果与原研药相同，但价格更低。可向药剂师咨询。' },
    { label: '调剂费（調剤料）', desc: '药局会另外收取调剂费（约300至800日元）。这是正常费用，NHI持有者只需自付30%。' },
    { label: '用药手册（お薬手帳）', desc: '药剂师会建议您建立お薬手帳（用药记录本）。将所有处方记录在此，可预防药物相互作用，并方便任何医生了解您的用药情况。' },
    { label: '携带海外药品', desc: '某些外国药品在日本受到管制或禁止。出发前请确认。持医生证明，个人使用目的可携带1至2个月的用量。' },
    { label: '非处方药（市販薬）', desc: '感冒药、止痛药、肠胃药等常见药物无需处方，可在薬局或ドラッグストア（药妆店）直接购买。' },
  ],
  KO: [
    { label: '제네릭 약품(後発品)', desc: '약국에서 제네릭(後発品, kōhatsuhin)을 요청할 수 있습니다. 오리지널과 동일한 효과이며 더 저렴합니다.' },
    { label: '조제료(調剤料)', desc: '약국에서는 별도의 조제료(300~800엔)가 청구됩니다. 정상적인 비용이며 NHI 가입자는 30%만 부담합니다.' },
    { label: '투약 수첩(お薬手帳)', desc: '약사가 お薬手帳(투약 기록 수첩)을 권할 것입니다. 모든 처방 기록을 여기에 보관하면 약물 상호작용을 방지하고 어느 의사에게도 정보를 공유할 수 있습니다.' },
    { label: '해외 약품 반입', desc: '일부 외국 약품은 일본에서 규제 또는 금지됩니다. 여행 전에 확인하세요. 의사 소견서와 함께 1~2개월 분의 개인 사용 의약품은 반입이 허용될 수 있습니다.' },
    { label: '일반의약품(市販薬)', desc: '감기약, 진통제, 소화제 등은 처방전 없이 薬局(약국)이나 ドラッグストア(드럭스토어)에서 구입할 수 있습니다.' },
  ],
}

const COMMON_MEDS: Record<string, { jp: string; en: string }[]> = {
  EN: [
    { jp: 'ロキソニン / Loxonin', en: 'NSAID painkiller (Loxoprofen) — common for pain/fever' },
    { jp: 'カロナール / Calonarl', en: 'Acetaminophen (Tylenol equivalent) — fever & mild pain' },
    { jp: '抗生物質', en: 'Antibiotics — prescription only, must complete full course' },
    { jp: '花粉症薬', en: 'Antihistamine for hay fever/allergies — available OTC or Rx' },
  ],
  JP: [
    { jp: 'ロキソニン', en: 'NSAIDs系鎮痛剤（ロキソプロフェン）— 痛み・発熱に広く使用' },
    { jp: 'カロナール', en: 'アセトアミノフェン（解熱・鎮痛）— 比較的副作用が少ない' },
    { jp: '抗生物質', en: '要処方箋。処方された分を必ず飲み切ることが重要です' },
    { jp: '花粉症薬（抗ヒスタミン薬）', en: '市販薬でも入手可。ひどい場合は処方薬の方が効果的' },
  ],
  ZH: [
    { jp: 'ロキソニン / 洛索洛芬', en: 'NSAIDs类止痛药 — 常用于疼痛和发烧' },
    { jp: 'カロナール / 对乙酰氨基酚', en: '解热止痛药（相当于泰诺）— 用于发烧和轻度疼痛' },
    { jp: '抗生物質 / 抗生素', en: '需处方。必须按疗程服完，不可中途停药' },
    { jp: '花粉症薬 / 抗过敏药', en: '用于花粉过敏等。部分可在薬局直接购买，严重时需处方' },
  ],
  KO: [
    { jp: 'ロキソニン / 록소닌', en: 'NSAIDs계 진통제 — 통증과 발열에 흔히 사용' },
    { jp: 'カロナール / 아세트아미노펜', en: '해열·진통제(타이레놀 동등품) — 발열과 가벼운 통증' },
    { jp: '抗生物質 / 항생제', en: '처방 필요. 처방된 기간 동안 반드시 복용 완료해야 함' },
    { jp: '花粉症薬 / 항히스타민제', en: '꽃가루 알레르기 등에 사용. 일부는 약국에서 직접 구매 가능' },
  ],
}

export default function PrescriptionsPage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const steps = STEPS[lang] ?? STEPS['EN']
  const tips = TIPS[lang] ?? TIPS['EN']
  const meds = COMMON_MEDS[lang] ?? COMMON_MEDS['EN']

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
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#206777', fontVariationSettings: "'FILL' 1" as string }}>medication</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800 }}>{tl(TITLE, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28 }}>{tl(SUB, lang)}</p>

      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{tl(H_FLOW, lang)}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)', alignItems: 'flex-start' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#eef7f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#206777', fontVariationSettings: "'FILL' 1" as string }}>{s.icon}</span>
              </div>
              <div>
                <p className="font-headline" style={{ fontSize: 14, fontWeight: 700, color: '#1e1b1c', marginBottom: 4 }}>{s.title}</p>
                <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ background: '#fef9ec', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(122,87,0,0.15)', marginBottom: 28 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#7a5700', flexShrink: 0, marginTop: 1, fontVariationSettings: "'FILL' 1" as string }}>warning</span>
          <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>
            <strong>{tl(IMPORTANT, lang)}</strong>
            {tl(IMPORTANT_TEXT, lang)}
          </p>
        </div>
      </div>

      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{tl(H_TIPS, lang)}</h2>
        <div style={{ background: '#faf2f2', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(226,190,186,0.2)' }}>
          {tips.map((t, i) => (
            <div key={i} style={{ marginBottom: i < tips.length - 1 ? 14 : 0 }}>
              <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#206777', marginBottom: 3 }}>{t.label}</p>
              <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{tl(H_MEDS, lang)}</h2>
        <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(226,190,186,0.2)' }}>
          {meds.map((m, i) => (
            <div key={i} style={{ padding: '12px 16px', borderBottom: i < meds.length - 1 ? '1px solid rgba(226,190,186,0.12)' : 'none' }}>
              <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c', marginBottom: 3 }}>{m.jp}</p>
              <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.5 }}>{m.en}</p>
            </div>
          ))}
        </div>
      </section>

      <Link href="/dashboard/system/referrals" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#206777', textDecoration: 'none' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_back</span>
        {tl(BACK_RX, lang)}
      </Link>
    </main>
  )
}
