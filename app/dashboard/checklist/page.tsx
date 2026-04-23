'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '../lang-context'
import { useSaved } from '../saved-context'
import { tr, COMMON, CHECKLIST } from '../translations'

const ITEM = { href: '/dashboard/checklist', title: 'Preparation Checklist', titleJP: '準備チェックリスト', icon: 'fact_check', color: '#7a5700' }
function tl(m: Record<string, string>, l: string) { return m[l] ?? m['EN'] }

const SECTIONS = [
  { key: 'docs', icon: 'badge', color: '#b22620', items: [
    {
      label: { EN: 'Health insurance card (保険証 / hoken-shō)', JP: '健康保険証', ZH: '健康保险证（保険証）', 'ZH-T': '健康保險證（保険証）', KO: '건강보험증（保険証）', ES: 'Tarjeta de seguro médico (保険証)', FR: "Carte d'assurance maladie (保険証)", IT: 'Tessera sanitaria (保険証)', TL: 'Health insurance card (保険証)', ID: 'Kartu asuransi kesehatan (保険証)', DE: 'Krankenversicherungskarte (保険証)', PT: 'Cartão de seguro de saúde (保険証)', RU: 'Карта медицинского страхования (保険証)' },
      note: { EN: 'Required for the 30% co-pay rate', JP: '3割負担に必要', ZH: '享受30%自付比例所需', 'ZH-T': '享受30%自付比例所需', KO: '30% 본인부담을 위해 필요', ES: 'Necesaria para la tasa de copago del 30%', FR: 'Nécessaire pour le taux de co-paiement de 30%', IT: 'Necessaria per il tasso di co-pagamento del 30%', TL: 'Kinakailangan para sa 30% co-pay rate', ID: 'Diperlukan untuk tarif co-pay 30%', DE: 'Erforderlich für den 30%-Eigenanteil', PT: 'Necessário para a taxa de co-pagamento de 30%', RU: 'Необходима для 30% доплаты' },
    },
    {
      label: { EN: 'Residence card (在留カード / zairyū kādo)', JP: '在留カード', ZH: '在留卡', 'ZH-T': '在留卡', KO: '재류카드', ES: 'Tarjeta de residencia (在留カード)', FR: 'Carte de résidence (在留カード)', IT: 'Permesso di soggiorno (在留カード)', TL: 'Residence card (在留カード)', ID: 'Kartu residensi (在留カード)', DE: 'Aufenthaltskarte (在留カード)', PT: 'Cartão de residência (在留カード)', RU: 'Карта резидента (在留カード)' },
      note: { EN: 'Or passport for tourists', JP: '観光客の場合はパスポートでも可', ZH: '游客可用护照代替', 'ZH-T': '遊客可用護照代替', KO: '관광객의 경우 여권도 가능', ES: 'O pasaporte para turistas', FR: 'Ou passeport pour les touristes', IT: 'O passaporto per i turisti', TL: 'O pasaporte para sa mga turista', ID: 'Atau paspor untuk wisatawan', DE: 'Oder Reisepass für Touristen', PT: 'Ou passaporte para turistas', RU: 'Или паспорт для туристов' },
    },
    {
      label: { EN: 'My Number card (マイナンバーカード)', JP: 'マイナンバーカード', ZH: 'My Number卡（マイナンバーカード）', 'ZH-T': 'My Number卡（マイナンバーカード）', KO: '마이넘버카드（マイナンバーカード）', ES: 'Tarjeta My Number (マイナンバーカード)', FR: 'Carte My Number (マイナンバーカード)', IT: 'Carta My Number (マイナンバーカード)', TL: 'My Number card (マイナンバーカード)', ID: 'Kartu My Number (マイナンバーカード)', DE: 'My Number-Karte (マイナンバーカード)', PT: 'Cartão My Number (マイナンバーカード)', RU: 'Карта My Number (マイナンバーカード)' },
      note: { EN: 'Can substitute for insurance card at many hospitals', JP: '多くの病院で保険証の代わりになる', ZH: '可在许多医院代替保险证', 'ZH-T': '可在許多醫院代替保險證', KO: '많은 병원에서 보험증 대신 사용 가능', ES: 'Puede sustituir la tarjeta de seguro en muchos hospitales', FR: "Peut remplacer la carte d'assurance dans de nombreux hôpitaux", IT: "Può sostituire la tessera sanitaria in molti ospedali", TL: 'Maaaring pumalit sa insurance card sa maraming ospital', ID: 'Dapat menggantikan kartu asuransi di banyak rumah sakit', DE: 'Kann in vielen Krankenhäusern die Versicherungskarte ersetzen', PT: 'Pode substituir o cartão de seguro em muitos hospitais', RU: 'Может заменить страховую карту во многих больницах' },
    },
  ]},
  { key: 'payment', icon: 'payments', color: '#7a5700', items: [
    {
      label: { EN: 'Cash ¥5,000–¥20,000', JP: '現金 5,000〜20,000円', ZH: '现金5,000〜20,000日元', 'ZH-T': '現金5,000〜20,000日元', KO: '현금 5,000〜20,000엔', ES: 'Efectivo ¥5,000–¥20,000', FR: 'Espèces ¥5 000–¥20 000', IT: 'Contanti ¥5.000–¥20.000', TL: 'Cash ¥5,000–¥20,000', ID: 'Uang tunai ¥5.000–¥20.000', DE: 'Bargeld ¥5.000–¥20.000', PT: 'Dinheiro ¥5.000–¥20.000', RU: 'Наличные ¥5 000–¥20 000' },
      note: { EN: "Many clinics don't accept foreign credit cards", JP: '外国のクレジットカードが使えないクリニックが多い', ZH: '许多诊所不接受外国信用卡', 'ZH-T': '許多診所不接受外國信用卡', KO: '많은 클리닉이 외국 신용카드를 받지 않습니다', ES: 'Muchas clínicas no aceptan tarjetas de crédito extranjeras', FR: 'Beaucoup de cliniques n\'acceptent pas les cartes de crédit étrangères', IT: 'Molte cliniche non accettano carte di credito straniere', TL: 'Maraming klinika ay hindi tumatanggap ng foreign credit cards', ID: 'Banyak klinik tidak menerima kartu kredit asing', DE: 'Viele Kliniken akzeptieren keine ausländischen Kreditkarten', PT: 'Muitas clínicas não aceitam cartões de crédito estrangeiros', RU: 'Многие клиники не принимают иностранные кредитные карты' },
    },
    {
      label: { EN: 'Credit card (Visa/Mastercard)', JP: 'クレジットカード（Visa/Mastercard）', ZH: '信用卡（Visa/Mastercard）', 'ZH-T': '信用卡（Visa/Mastercard）', KO: '신용카드（Visa/Mastercard）', ES: 'Tarjeta de crédito (Visa/Mastercard)', FR: 'Carte de crédit (Visa/Mastercard)', IT: 'Carta di credito (Visa/Mastercard)', TL: 'Credit card (Visa/Mastercard)', ID: 'Kartu kredit (Visa/Mastercard)', DE: 'Kreditkarte (Visa/Mastercard)', PT: 'Cartão de crédito (Visa/Mastercard)', RU: 'Кредитная карта (Visa/Mastercard)' },
      note: { EN: 'Larger hospitals usually accept these', JP: '大きな病院ではたいてい使える', ZH: '大型医院通常接受', 'ZH-T': '大型醫院通常接受', KO: '큰 병원에서는 보통 사용 가능', ES: 'Los hospitales grandes generalmente las aceptan', FR: 'Les grands hôpitaux les acceptent généralement', IT: 'Gli ospedali più grandi di solito le accettano', TL: 'Ang malalaking ospital ay karaniwang tumatanggap nito', ID: 'Rumah sakit besar biasanya menerima ini', DE: 'Größere Krankenhäuser akzeptieren diese in der Regel', PT: 'Hospitais maiores geralmente aceitam', RU: 'В крупных больницах обычно принимают' },
    },
  ]},
  { key: 'medical', icon: 'medical_information', color: '#206777', items: [
    {
      label: { EN: 'List of current medications (with dosage)', JP: '現在の服用薬リスト（用量記載）', ZH: '当前用药清单（含剂量）', 'ZH-T': '當前用藥清單（含劑量）', KO: '현재 복용 중인 약 목록（용량 포함）', ES: 'Lista de medicamentos actuales (con dosis)', FR: 'Liste des médicaments actuels (avec dosage)', IT: 'Lista dei farmaci correnti (con dosaggio)', TL: 'Listahan ng kasalukuyang gamot (may dosage)', ID: 'Daftar obat-obatan saat ini (dengan dosis)', DE: 'Liste der aktuellen Medikamente (mit Dosierung)', PT: 'Lista de medicamentos atuais (com dosagem)', RU: 'Список текущих лекарств (с дозировкой)' },
      note: { EN: 'Japanese or generic names preferred', JP: '日本語名または一般名が望ましい', ZH: '最好使用日语名或通用名', 'ZH-T': '最好使用日語名或通用名', KO: '일본어명 또는 일반명이 선호됩니다', ES: 'Se prefieren nombres japoneses o genéricos', FR: 'Les noms japonais ou génériques sont préférés', IT: 'Preferiti i nomi giapponesi o generici', TL: 'Mas gusto ang mga Japanese o generic na pangalan', ID: 'Nama Jepang atau generik lebih disukai', DE: 'Japanische oder generische Namen bevorzugt', PT: 'Nomes japoneses ou genéricos são preferidos', RU: 'Предпочтительны японские или общие названия' },
    },
    {
      label: { EN: 'Known allergies (drug, food)', JP: 'アレルギー情報（薬・食べ物）', ZH: '已知过敏信息（药物、食物）', 'ZH-T': '已知過敏信息（藥物、食物）', KO: '알려진 알레르기（약물, 음식）', ES: 'Alergias conocidas (medicamentos, alimentos)', FR: 'Allergies connues (médicaments, aliments)', IT: 'Allergie note (farmaci, alimenti)', TL: 'Mga kilalang allergy (gamot, pagkain)', ID: 'Alergi yang diketahui (obat, makanan)', DE: 'Bekannte Allergien (Medikamente, Lebensmittel)', PT: 'Alergias conhecidas (medicamentos, alimentos)', RU: 'Известные аллергии (лекарства, продукты)' },
      note: { EN: 'Write in Japanese if possible', JP: 'できれば日本語で書いておく', ZH: '如可能请用日语书写', 'ZH-T': '如可能請用日語書寫', KO: '가능하면 일본어로 작성', ES: 'Escribir en japonés si es posible', FR: 'Écrire en japonais si possible', IT: 'Scrivere in giapponese se possibile', TL: 'Isulat sa Japanese kung posible', ID: 'Tulis dalam bahasa Jepang jika memungkinkan', DE: 'Wenn möglich auf Japanisch schreiben', PT: 'Escrever em japonês se possível', RU: 'Записать по-японски, если возможно' },
    },
    {
      label: { EN: 'Previous medical history summary', JP: '既往歴の要約', ZH: '既往病史摘要', 'ZH-T': '既往病史摘要', KO: '이전 병력 요약', ES: 'Resumen de historial médico previo', FR: 'Résumé des antécédents médicaux', IT: 'Riepilogo della storia medica precedente', TL: 'Buod ng nakaraang medikal na kasaysayan', ID: 'Ringkasan riwayat medis sebelumnya', DE: 'Zusammenfassung der Krankengeschichte', PT: 'Resumo do histórico médico anterior', RU: 'Краткая история болезни' },
      note: { EN: 'Especially for chronic conditions', JP: '慢性疾患がある場合は特に重要', ZH: '尤其是慢性疾病', 'ZH-T': '尤其是慢性疾病', KO: '만성 질환이 있는 경우 특히 중요', ES: 'Especialmente para condiciones crónicas', FR: 'Surtout pour les maladies chroniques', IT: 'Soprattutto per le condizioni croniche', TL: 'Lalo na para sa mga chronic na kondisyon', ID: 'Terutama untuk kondisi kronis', DE: 'Besonders bei chronischen Erkrankungen', PT: 'Especialmente para condições crônicas', RU: 'Особенно при хронических заболеваниях' },
    },
    {
      label: { EN: 'Blood type (if known)', JP: '血液型（わかれば）', ZH: '血型（如已知）', 'ZH-T': '血型（如已知）', KO: '혈액형（알고 있다면）', ES: 'Tipo de sangre (si se conoce)', FR: 'Groupe sanguin (si connu)', IT: 'Gruppo sanguigno (se noto)', TL: 'Blood type (kung alam)', ID: 'Golongan darah (jika diketahui)', DE: 'Blutgruppe (falls bekannt)', PT: 'Tipo sanguíneo (se conhecido)', RU: 'Группа крови (если известна)' },
      note: { EN: 'A, B, O, or AB', JP: 'A・B・O・AB型', ZH: 'A、B、O或AB型', 'ZH-T': 'A、B、O或AB型', KO: 'A, B, O, 또는 AB형', ES: 'A, B, O o AB', FR: 'A, B, O ou AB', IT: 'A, B, O o AB', TL: 'A, B, O, o AB', ID: 'A, B, O, atau AB', DE: 'A, B, O oder AB', PT: 'A, B, O ou AB', RU: 'A, B, O или AB' },
    },
  ]},
  { key: 'comms', icon: 'translate', color: '#374151', items: [
    {
      label: { EN: 'Smartphone with translation app', JP: '翻訳アプリ入りスマートフォン', ZH: '带翻译应用的智能手机', 'ZH-T': '帶翻譯應用的智能手機', KO: '번역 앱이 설치된 스마트폰', ES: 'Teléfono inteligente con app de traducción', FR: 'Smartphone avec application de traduction', IT: 'Smartphone con app di traduzione', TL: 'Smartphone na may translation app', ID: 'Smartphone dengan aplikasi terjemahan', DE: 'Smartphone mit Übersetzungs-App', PT: 'Smartphone com aplicativo de tradução', RU: 'Смартфон с приложением-переводчиком' },
      note: { EN: 'Google Translate, DeepL, or VoiceTra', JP: 'Google翻訳・DeepL・VoiceTra など', ZH: 'Google翻译、DeepL或VoiceTra', 'ZH-T': 'Google翻譯、DeepL或VoiceTra', KO: 'Google 번역, DeepL 또는 VoiceTra', ES: 'Google Translate, DeepL o VoiceTra', FR: 'Google Translate, DeepL ou VoiceTra', IT: 'Google Translate, DeepL o VoiceTra', TL: 'Google Translate, DeepL, o VoiceTra', ID: 'Google Translate, DeepL, atau VoiceTra', DE: 'Google Translate, DeepL oder VoiceTra', PT: 'Google Translate, DeepL ou VoiceTra', RU: 'Google Translate, DeepL или VoiceTra' },
    },
    {
      label: { EN: 'Written description of symptoms', JP: '症状の文章（日本語）', ZH: '症状的书面描述', 'ZH-T': '症狀的書面描述', KO: '증상의 서면 설명', ES: 'Descripción escrita de los síntomas', FR: 'Description écrite des symptômes', IT: 'Descrizione scritta dei sintomi', TL: 'Nakasulat na paglalarawan ng mga sintomas', ID: 'Deskripsi tertulis tentang gejala', DE: 'Schriftliche Beschreibung der Symptome', PT: 'Descrição escrita dos sintomas', RU: 'Письменное описание симптомов' },
      note: { EN: 'Prepared in Japanese via translation app', JP: '翻訳アプリで事前に作成しておく', ZH: '通过翻译应用提前准备日语版本', 'ZH-T': '通過翻譯應用提前準備日語版本', KO: '번역 앱으로 일본어로 미리 준비', ES: 'Preparada en japonés vía app de traducción', FR: 'Préparée en japonais via une app de traduction', IT: 'Preparata in giapponese tramite app di traduzione', TL: 'Inihanda sa Japanese gamit ang translation app', ID: 'Disiapkan dalam bahasa Jepang melalui aplikasi terjemahan', DE: 'Auf Japanisch über eine Übersetzungs-App vorbereitet', PT: 'Preparado em japonês via aplicativo de tradução', RU: 'Подготовлено на японском языке через приложение-переводчик' },
    },
    {
      label: { EN: 'Emergency contact number', JP: '緊急連絡先', ZH: '紧急联系电话', 'ZH-T': '緊急聯絡電話', KO: '비상 연락처', ES: 'Número de contacto de emergencia', FR: "Numéro de contact d'urgence", IT: 'Numero di contatto di emergenza', TL: 'Emergency contact number', ID: 'Nomor kontak darurat', DE: 'Notfallkontaktnummer', PT: 'Número de contato de emergência', RU: 'Контактный телефон на экстренный случай' },
      note: { EN: 'Hotel, friend, or embassy', JP: 'ホテル・友人・大使館', ZH: '酒店、朋友或大使馆', 'ZH-T': '酒店、朋友或大使館', KO: '호텔, 친구 또는 대사관', ES: 'Hotel, amigo o embajada', FR: 'Hôtel, ami ou ambassade', IT: 'Hotel, amico o ambasciata', TL: 'Hotel, kaibigan, o embahada', ID: 'Hotel, teman, atau kedutaan', DE: 'Hotel, Freund oder Botschaft', PT: 'Hotel, amigo ou embaixada', RU: 'Отель, друг или посольство' },
    },
  ]},
]

export default function ChecklistPage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const allItems = SECTIONS.flatMap(s => s.items)
  const checkedCount = Object.values(checked).filter(Boolean).length

  return (
    <main className="mj-container" style={{ paddingTop: 28 }}>
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
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#7a5700', fontVariationSettings: "'FILL' 1" as string }}>fact_check</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800 }}>{tr(CHECKLIST.title, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 20 }}>{tr(CHECKLIST.subtitle, lang)}</p>

      <div style={{ background: '#fff', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(226,190,186,0.2)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: '#5a413d' }}>{tr(CHECKLIST.packed, lang)}</span>
            <span className="font-headline" style={{ fontSize: 12, fontWeight: 700, color: '#1e1b1c' }}>{checkedCount} / {allItems.length}</span>
          </div>
          <div style={{ height: 6, background: '#f4eced', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#b22620', borderRadius: 999, width: `${allItems.length ? (checkedCount / allItems.length) * 100 : 0}%`, transition: 'width 0.3s' }} />
          </div>
        </div>
        {checkedCount > 0 && (
          <button onClick={() => setChecked({})} style={{ fontSize: 11, color: '#78716c', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            {tr(CHECKLIST.reset, lang)}
          </button>
        )}
      </div>

      {SECTIONS.map((section, si) => (
        <section key={section.key} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 17, color: section.color, fontVariationSettings: "'FILL' 1" as string }}>{section.icon}</span>
            <h2 className="font-headline" style={{ fontSize: 14, fontWeight: 700, color: '#1e1b1c' }}>{tr(CHECKLIST.sections[section.key as keyof typeof CHECKLIST.sections], lang)}</h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(226,190,186,0.2)', overflow: 'hidden' }}>
            {section.items.map((item, i, arr) => {
              const key = `${si}-${i}`
              const done = checked[key]
              return (
                <button key={key}
                  onClick={() => setChecked(prev => ({ ...prev, [key]: !prev[key] }))}
                  style={{ width: '100%', textAlign: 'left', display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 16px', background: done ? 'rgba(220,252,231,0.5)' : '#fff', border: 'none', borderBottom: i < arr.length - 1 ? '1px solid rgba(226,190,186,0.12)' : 'none', cursor: 'pointer', transition: 'background 0.15s' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: done ? '#16a34a' : '#c7bfbe', flexShrink: 0, marginTop: 1, fontVariationSettings: done ? ("'FILL' 1" as string) : ("'FILL' 0" as string) }}>
                    {done ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <div>
                    <p style={{ fontSize: 13, color: done ? '#5a413d' : '#1e1b1c', textDecoration: done ? 'line-through' : 'none', lineHeight: 1.4, marginBottom: 2 }}>{tl(item.label, lang)}</p>
                    <p style={{ fontSize: 11, color: '#78716c' }}>{tl(item.note, lang)}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      ))}

      <div style={{ background: '#faf2f2', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)', marginTop: 8 }}>
        <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.6 }}>
          <strong>{tr(COMMON.tip, lang)}:</strong> {tr(CHECKLIST.tipBody, lang)}
        </p>
      </div>
    </main>
  )
}
