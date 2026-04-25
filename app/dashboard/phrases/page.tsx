'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '../lang-context'
import { useSaved } from '../saved-context'
import { tr, COMMON } from '../translations'

const ITEM = { href: '/dashboard/phrases', title: 'Medical Japanese Phrases', titleJP: '医療日本語フレーズ集', icon: 'translate', color: '#206777' }
function tl(m: Record<string,string>, l: string) { return m[l] ?? m['EN'] }

const PAGE_TITLE = { EN: 'Medical Japanese Phrases', JP: '医療日本語フレーズ集', ZH: '医疗日语短语集', 'ZH-T': '醫療日語短語集', KO: '의료 일본어 표현집', ES: 'Frases Médicas en Japonés', FR: 'Phrases Médicales en Japonais', IT: 'Frasi Mediche in Giapponese', TL: 'Mga Medikal na Parirala sa Japanese', ID: 'Frasa Medis Bahasa Jepang', DE: 'Medizinische Japanische Sätze', PT: 'Frases Médicas em Japonês', RU: 'Медицинские фразы на японском', YUE: '醫療日語短語集' }
const PAGE_SUB  = { EN: 'Essential phrases for clinics, hospitals, and pharmacies.', JP: 'クリニック・病院・薬局で使える基本フレーズ。', ZH: '在诊所、医院和药店使用的基本日语。', 'ZH-T': '在診所、醫院和藥局使用的基本日語。', KO: '클리닉, 병원, 약국에서 쓸 수 있는 기본 표현.', ES: 'Frases esenciales para clínicas y farmacias.', FR: 'Phrases essentielles pour cliniques et pharmacies.', IT: 'Frasi essenziali per cliniche, ospedali e farmacie.', TL: 'Mahahalagang parirala para sa mga klinika, ospital, at parmasya.', ID: 'Frasa-frasa penting untuk klinika, rumah sakit, dan apotek.', DE: 'Wichtige Sätze für Kliniken und Apotheken.', PT: 'Frases essenciais para clínicas e farmácias.', RU: 'Основные фразы для клиник и аптек.', YUE: '診所、醫院同藥局常用基本日語。' }

interface Phrase {
  jp: string
  romaji: string
  meaning: string
}

const CAT_LABELS: Record<string, Record<string, string>> = {
  arrival:     { EN: 'At Reception', JP: '受付で', ZH: '前台', 'ZH-T': '前台', KO: '접수처', ES: 'En Recepción', FR: 'À la Réception', IT: 'All\'Accettazione', TL: 'Sa Reception', ID: 'Di Resepsionis', DE: 'Am Empfang', PT: 'Na Recepção', RU: 'На стойке регистрации', YUE: '前台' },
  symptoms:    { EN: 'Describing Symptoms', JP: '症状の説明', ZH: '描述症状', 'ZH-T': '描述症狀', KO: '증상 설명', ES: 'Describir Síntomas', FR: 'Décrire les Symptômes', IT: 'Descrivere Sintomi', TL: 'Paglalarawan ng Sintomas', ID: 'Menjelaskan Gejala', DE: 'Symptome Beschreiben', PT: 'Descrever Sintomas', RU: 'Описание симптомов', YUE: '描述症狀' },
  body:        { EN: 'Body Parts', JP: '身体の部位', ZH: '身体部位', 'ZH-T': '身體部位', KO: '신체 부위', ES: 'Partes del Cuerpo', FR: 'Parties du Corps', IT: 'Parti del Corpo', TL: 'Mga Bahagi ng Katawan', ID: 'Bagian Tubuh', DE: 'Körperteile', PT: 'Partes do Corpo', RU: 'Части тела', YUE: '身體部位' },
  appointment: { EN: 'Appointments', JP: '予約', ZH: '预约', 'ZH-T': '預約', KO: '예약', ES: 'Citas', FR: 'Rendez-vous', IT: 'Appuntamenti', TL: 'Mga Appointment', ID: 'Janji', DE: 'Termine', PT: 'Consultas', RU: 'Запись на приём', YUE: '預約' },
  pharmacy:    { EN: 'At the Pharmacy', JP: '薬局で', ZH: '药局', 'ZH-T': '藥局', KO: '약국', ES: 'En la Farmacia', FR: 'À la Pharmacie', IT: 'In Farmacia', TL: 'Sa Parmasya', ID: 'Di Apotek', DE: 'In der Apotheke', PT: 'Na Farmácia', RU: 'В аптеке', YUE: '藥局' },
  emergency:   { EN: 'Emergency', JP: '緊急フレーズ', ZH: '紧急情况', 'ZH-T': '緊急情況', KO: '응급 상황', ES: 'Emergencia', FR: 'Urgence', IT: 'Emergenza', TL: 'Emerhensya', ID: 'Darurat', DE: 'Notfall', PT: 'Emergência', RU: 'Экстренно', YUE: '緊急情況' },
}
const H_PAIN  = { EN: 'Pain Scale (show to doctor)', JP: '痛みの段階（医師に見せる）', ZH: '疼痛评分（给医生看）', 'ZH-T': '疼痛評分（給醫生看）', KO: '통증 단계 (의사에게 보여주기)', ES: 'Escala de Dolor (mostrar al médico)', FR: 'Échelle de Douleur (montrer au médecin)', IT: 'Scala del Dolore (mostra al medico)', TL: 'Antas ng Sakit (ipakita sa doktor)', ID: 'Skala Nyeri (tunjukkan ke dokter)', DE: 'Schmerzskala (dem Arzt zeigen)', PT: 'Escala de Dor (mostrar ao médico)', RU: 'Шкала боли (покажите врачу)', YUE: '疼痛評分（展示俾醫生睇）' }
const H_PAIN_SUB = { EN: 'Point to the level to communicate your pain to the doctor.', JP: '指でレベルを指して医師に伝えましょう。', ZH: '用手指指向级别，告诉医生您的疼痛程度。', 'ZH-T': '用手指指向級別，告訴醫生您的疼痛程度。', KO: '해당 레벨을 손가락으로 가리켜 의사에게 통증을 전달하세요.', ES: 'Señala el nivel para comunicar tu dolor al médico.', FR: 'Pointez le niveau pour communiquer votre douleur au médecin.', IT: 'Indica il livello per comunicare il tuo dolore al medico.', TL: 'Ituro ang antas para maiparating ang sakit mo sa doktor.', ID: 'Tunjuk levelnya untuk mengomunikasikan rasa sakit ke dokter.', DE: 'Zeigen Sie auf den Pegel, um dem Arzt Ihren Schmerz zu kommunizieren.', PT: 'Aponte o nível para comunicar sua dor ao médico.', RU: 'Укажите уровень, чтобы сообщить врачу о боли.', YUE: '用手指指向級別，告知醫生你嘅疼痛程度。' }
const HINT_COPY = { EN: 'Tap any phrase to copy it to your clipboard.', JP: 'フレーズをタップするとコピーできます。', ZH: '点击任意短语即可复制。', 'ZH-T': '點擊任意短語即可複製。', KO: '표현을 탭하면 클립보드에 복사됩니다.', ES: 'Toca cualquier frase para copiarla.', FR: 'Appuyez sur une phrase pour la copier.', IT: 'Tocca una frase per copiarla.', TL: 'I-tap ang anumang parirala para kopyahin.', ID: 'Ketuk frasa mana saja untuk menyalinnya.', DE: 'Tippe auf einen Satz, um ihn zu kopieren.', PT: 'Toque em qualquer frase para copiá-la.', RU: 'Нажмите на фразу, чтобы скопировать её.', YUE: '點擊任意短語即可複製。' }
const TIP_TEXT = {
  EN: 'Google Translate\'s camera mode can help with paperwork in real time. Larger clinics and hospitals in major cities often have multilingual staff or tablet-based interpretation services.',
  JP: 'スマートフォンのGoogle翻訳アプリを使うとリアルタイムカメラ翻訳も可能です。また、多くの大きなクリニックや病院では翻訳スタッフやタブレット通訳サービスがあります。',
  ZH: 'Google翻译的相机模式可以实时翻译文件。大城市的大型诊所和医院通常有多语言工作人员或平板电脑翻译服务。',
  'ZH-T': 'Google翻譯的相機模式可以即時翻譯文件。大城市的大型診所和醫院通常有多語言工作人員或平板電腦翻譯服務。',
  KO: 'Google 번역의 카메라 모드로 서류를 실시간 번역할 수 있습니다. 대도시의 대형 클리닉과 병원은 다국어 직원이나 태블릿 통역 서비스를 갖추고 있는 경우가 많습니다.',
  ES: 'El modo cámara de Google Translate puede ayudar con el papeleo en tiempo real. Las clínicas grandes suelen tener personal multilingüe.',
  FR: 'Le mode caméra de Google Traduction peut aider avec les documents. Les grandes cliniques ont souvent du personnel multilingue.',
  DE: 'Der Kameramodus von Google Übersetzer hilft bei Formularen. Große Kliniken haben oft mehrsprachiges Personal.',
  PT: 'O modo câmera do Google Tradutor pode ajudar com documentos em tempo real. Clínicas maiores geralmente têm equipe multilíngue.',
  RU: 'Режим камеры Google Переводчика поможет с документами. В крупных клиниках часто есть многоязычный персонал.',
  IT: 'La modalità fotocamera di Google Translate può aiutare con i documenti. Le cliniche grandi spesso hanno personale multilingue.',
  TL: 'Ang camera mode ng Google Translate ay makakatulong sa mga dokumento. Ang malalaking klinika ay madalas na may multilingual na staff.',
  ID: 'Mode kamera Google Translate dapat membantu dengan dokumen. Klinik besar sering memiliki staf multibahasa.',
  YUE: 'Google翻譯嘅相機模式可以即時翻譯文件。大城市嘅大型診所同醫院通常有多語言員工或平板電腦翻譯服務。',
}
const TIP_LABEL = { EN: 'Tip: ', JP: 'ヒント：', ZH: '提示：', 'ZH-T': '提示：', KO: '팁: ', ES: 'Consejo: ', FR: 'Conseil : ', IT: 'Suggerimento: ', TL: 'Tip: ', ID: 'Tips: ', DE: 'Tipp: ', PT: 'Dica: ', RU: 'Совет: ', YUE: '提示：' }

const CATEGORIES: { id: string; icon: string; labelEN: string; labelJP: string; phrases: Phrase[] }[] = [
  {
    id: 'arrival',
    icon: 'door_front',
    labelEN: 'At Reception',
    labelJP: '受付で',
    phrases: [
      { jp: '受付はどこですか？', romaji: 'Uketsuke wa doko desu ka?', meaning: 'Where is the reception?' },
      { jp: '初めて来ました。', romaji: 'Hajimete kimashita.', meaning: 'This is my first visit.' },
      { jp: '保険証を持っています。', romaji: 'Hōkenshō wo motte imasu.', meaning: 'I have my insurance card.' },
      { jp: '保険証がありません。', romaji: 'Hōkenshō ga arimasen.', meaning: 'I don\'t have an insurance card.' },
      { jp: '予約をしていません。', romaji: 'Yoyaku wo shite imasen.', meaning: 'I don\'t have an appointment.' },
      { jp: '今日、診てもらえますか？', romaji: 'Kyō, mite moraemasu ka?', meaning: 'Can I be seen today?' },
      { jp: '英語が話せる先生はいますか？', romaji: 'Eigo ga hanaseru sensei wa imasu ka?', meaning: 'Is there a doctor who speaks English?' },
      { jp: '通訳をお願いできますか？', romaji: 'Tsūyaku wo onegai dekimasu ka?', meaning: 'Can I request an interpreter?' },
    ],
  },
  {
    id: 'symptoms',
    icon: 'thermometer',
    labelEN: 'Describing Symptoms',
    labelJP: '症状の説明',
    phrases: [
      { jp: '〇〇が痛いです。', romaji: '〇〇 ga itai desu.', meaning: 'My 〇〇 hurts. (replace 〇〇 with body part)' },
      { jp: '熱があります。', romaji: 'Netsu ga arimasu.', meaning: 'I have a fever.' },
      { jp: '咳が出ます。', romaji: 'Seki ga demasu.', meaning: 'I have a cough.' },
      { jp: '吐き気があります。', romaji: 'Hakike ga arimasu.', meaning: 'I feel nauseous.' },
      { jp: 'めまいがします。', romaji: 'Memai ga shimasu.', meaning: 'I feel dizzy.' },
      { jp: '下痢をしています。', romaji: 'Geri wo shite imasu.', meaning: 'I have diarrhea.' },
      { jp: '〇〇日前から症状があります。', romaji: '〇〇 nichi mae kara shōjō ga arimasu.', meaning: 'I\'ve had symptoms for 〇〇 days.' },
      { jp: 'アレルギーがあります。', romaji: 'Arerugī ga arimasu.', meaning: 'I have an allergy.' },
      { jp: '妊娠中です。', romaji: 'Ninshin-chū desu.', meaning: 'I am pregnant.' },
      { jp: '薬を飲んでいます。', romaji: 'Kusuri wo nonde imasu.', meaning: 'I am taking medication.' },
    ],
  },
  {
    id: 'body',
    icon: 'accessibility',
    labelEN: 'Body Parts',
    labelJP: '身体の部位',
    phrases: [
      { jp: '頭', romaji: 'atama', meaning: 'Head' },
      { jp: 'のど', romaji: 'nodo', meaning: 'Throat' },
      { jp: '胸', romaji: 'mune', meaning: 'Chest' },
      { jp: 'お腹', romaji: 'onaka', meaning: 'Stomach / Abdomen' },
      { jp: '背中', romaji: 'senaka', meaning: 'Back' },
      { jp: '腰', romaji: 'koshi', meaning: 'Lower back / Hip' },
      { jp: '腕', romaji: 'ude', meaning: 'Arm' },
      { jp: '脚', romaji: 'ashi', meaning: 'Leg' },
      { jp: '足', romaji: 'ashi', meaning: 'Foot / Feet' },
      { jp: '目', romaji: 'me', meaning: 'Eye' },
      { jp: '耳', romaji: 'mimi', meaning: 'Ear' },
      { jp: '歯', romaji: 'ha', meaning: 'Tooth / Teeth' },
    ],
  },
  {
    id: 'appointment',
    icon: 'calendar_month',
    labelEN: 'Making Appointments',
    labelJP: '予約',
    phrases: [
      { jp: '予約をしたいのですが。', romaji: 'Yoyaku wo shitai no desu ga.', meaning: 'I\'d like to make an appointment.' },
      { jp: '内科を受診したいです。', romaji: 'Naika wo jūshin shitai desu.', meaning: 'I\'d like to see an internal medicine doctor.' },
      { jp: '一番早い予約はいつですか？', romaji: 'Ichiban hayai yoyaku wa itsu desu ka?', meaning: 'What is the earliest available appointment?' },
      { jp: '予約を変更したいです。', romaji: 'Yoyaku wo henkō shitai desu.', meaning: 'I\'d like to change my appointment.' },
      { jp: '予約をキャンセルしたいです。', romaji: 'Yoyaku wo kyanseru shitai desu.', meaning: 'I\'d like to cancel my appointment.' },
      { jp: '紹介状を持っています。', romaji: 'Shōkaijō wo motte imasu.', meaning: 'I have a referral letter.' },
    ],
  },
  {
    id: 'pharmacy',
    icon: 'local_pharmacy',
    labelEN: 'At the Pharmacy',
    labelJP: '薬局で',
    phrases: [
      { jp: 'この処方箋をお願いします。', romaji: 'Kono shohōsen wo onegai shimasu.', meaning: 'Please fill this prescription.' },
      { jp: 'ジェネリックでもいいですか？', romaji: 'Jeneriku demo ii desu ka?', meaning: 'Is a generic version OK?' },
      { jp: 'この薬の飲み方を教えてください。', romaji: 'Kono kusuri no nomikata wo oshiete kudasai.', meaning: 'Please tell me how to take this medicine.' },
      { jp: '副作用はありますか？', romaji: 'Fukusayō wa arimasu ka?', meaning: 'Are there any side effects?' },
      { jp: 'お薬手帳をお願いします。', romaji: 'Okusuri techō wo onegai shimasu.', meaning: 'Please give me a medication notebook.' },
      { jp: '市販の風邪薬をください。', romaji: 'Shihan no kazegusuri wo kudasai.', meaning: 'I\'d like some over-the-counter cold medicine.' },
    ],
  },
  {
    id: 'emergency',
    icon: 'emergency',
    labelEN: 'Emergency Phrases',
    labelJP: '緊急フレーズ',
    phrases: [
      { jp: '救急です！', romaji: 'Kyūkyū desu!', meaning: 'It\'s an emergency!' },
      { jp: '助けてください！', romaji: 'Tasukete kudasai!', meaning: 'Please help me!' },
      { jp: '救急車を呼んでください。', romaji: 'Kyūkyūsha wo yonde kudasai.', meaning: 'Please call an ambulance.' },
      { jp: '意識がありません。', romaji: 'Ishiki ga arimasen.', meaning: 'They are unconscious.' },
      { jp: '呼吸をしていません。', romaji: 'Kokyū wo shite imasen.', meaning: 'They are not breathing.' },
      { jp: '大量出血しています。', romaji: 'Tairyō shukketsu shite imasu.', meaning: 'There is heavy bleeding.' },
      { jp: '住所は〇〇です。', romaji: 'Jūsho wa 〇〇 desu.', meaning: 'The address is 〇〇.' },
    ],
  },
]

const PAIN_LEVELS = [
  { level: '0', jp: '痛みなし', romaji: 'itami nashi', meaning: 'No pain' },
  { level: '2', jp: '軽い痛み', romaji: 'karui itami', meaning: 'Mild pain' },
  { level: '4', jp: 'やや強い痛み', romaji: 'yaya tsuyoi itami', meaning: 'Moderate pain' },
  { level: '6', jp: '強い痛み', romaji: 'tsuyoi itami', meaning: 'Strong pain' },
  { level: '8', jp: 'かなり強い痛み', romaji: 'kanari tsuyoi itami', meaning: 'Severe pain' },
  { level: '10', jp: '最大の痛み', romaji: 'saidai no itami', meaning: 'Worst possible pain' },
]

export default function PhrasesPage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id)
  const [copied, setCopied] = useState<string | null>(null)
  const [speaking, setSpeaking] = useState<string | null>(null)

  const activeCategory = CATEGORIES.find(c => c.id === activeTab)!

  function copyPhrase(jp: string) {
    navigator.clipboard?.writeText(jp).catch(() => {})
    setCopied(jp)
    setTimeout(() => setCopied(null), 1500)
  }

  function speak(jp: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(jp)
    u.lang = 'ja-JP'
    u.rate = 0.82
    u.onstart = () => setSpeaking(jp)
    u.onend = () => setSpeaking(null)
    u.onerror = () => setSpeaking(null)
    speechSynthesis.speak(u)
  }

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
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#206777', fontVariationSettings: "'FILL' 1" as string }}>translate</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800 }}>{tl(PAGE_TITLE, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 6 }}>{tl(PAGE_SUB, lang)}</p>
      <p style={{ fontSize: 12, color: '#78716c', marginBottom: 24 }}>{tl(HINT_COPY, lang)}</p>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2, marginBottom: 20 }}>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 13px', borderRadius: 999,
            border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: 12, fontWeight: 600,
            background: activeTab === cat.id ? '#206777' : '#f4eced',
            color: activeTab === cat.id ? '#fff' : '#5a413d',
            flexShrink: 0,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>{cat.icon}</span>
            {tl(CAT_LABELS[cat.id] ?? { EN: cat.labelEN }, lang)}
          </button>
        ))}
      </div>

      {/* Phrases list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
        {activeCategory.phrases.map((phrase, i) => (
          <div key={i} style={{
            background: copied === phrase.jp ? '#f0fdf4' : '#fff',
            border: copied === phrase.jp ? '1.5px solid rgba(22,163,74,0.3)' : '1px solid rgba(226,190,186,0.2)',
            borderRadius: 12, padding: '14px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10,
          }}>
            <button onClick={() => copyPhrase(phrase.jp)} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
              <p className="font-headline" style={{ fontSize: 16, fontWeight: 700, color: '#1e1b1c', marginBottom: 4, lineHeight: 1.4 }}>{phrase.jp}</p>
              <p style={{ fontSize: 12, color: '#206777', marginBottom: 3, fontStyle: 'italic' }}>{phrase.romaji}</p>
              <p style={{ fontSize: 12, color: '#5a413d' }}>{phrase.meaning}</p>
            </button>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0, marginTop: 2 }}>
              <button onClick={() => speak(phrase.jp)} style={{ background: speaking === phrase.jp ? '#eef7f9' : 'none', border: '1px solid rgba(32,103,119,0.2)', borderRadius: 8, cursor: 'pointer', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 15, color: speaking === phrase.jp ? '#206777' : '#c7bfbe', fontVariationSettings: speaking === phrase.jp ? "'FILL' 1" : "'FILL' 0" as string }}>volume_up</span>
              </button>
              <button onClick={() => copyPhrase(phrase.jp)} style={{ background: 'none', border: '1px solid rgba(226,190,186,0.3)', borderRadius: 8, cursor: 'pointer', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 15, color: copied === phrase.jp ? '#16a34a' : '#c7bfbe' }}>
                  {copied === phrase.jp ? 'check_circle' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pain scale */}
      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{tl(H_PAIN, lang)}</h2>
        <p style={{ fontSize: 12, color: '#78716c', marginBottom: 14 }}>{tl(H_PAIN_SUB, lang)}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {PAIN_LEVELS.map(p => (
            <div key={p.level} style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(226,190,186,0.2)', textAlign: 'center' }}>
              <div className="font-headline" style={{ fontSize: 22, fontWeight: 900, color: p.level === '0' ? '#16a34a' : p.level <= '4' ? '#7a5700' : '#b22620', marginBottom: 4 }}>{p.level}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c', marginBottom: 2 }}>{p.jp}</p>
              <p style={{ fontSize: 10, color: '#78716c' }}>{p.romaji}</p>
              <p style={{ fontSize: 11, color: '#5a413d' }}>{p.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ background: '#faf2f2', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)' }}>
        <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.6 }}>
          <strong>{tl(TIP_LABEL, lang)}</strong>
          {tl(TIP_TEXT, lang)}
        </p>
      </div>
    </main>
  )
}
