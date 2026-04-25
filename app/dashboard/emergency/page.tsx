'use client'
import Link from 'next/link'
import { useLang } from '../lang-context'
import { useSaved } from '../saved-context'
import { tr, COMMON, EMERGENCY } from '../translations'

const ITEM = { href: '/dashboard/emergency', title: 'Emergency Numbers', titleJP: '緊急番号', icon: 'emergency_heat', color: '#b22620' }
function tl(m: Record<string, string>, l: string) { return m[l] ?? m['EN'] }

const HOTLINES = [
  {
    number: '119',
    label: { EN: 'Ambulance / Fire', JP: '救急・消防', ZH: '救护车/消防', 'ZH-T': '救護車/消防', KO: '구급·소방', ES: 'Ambulancia / Bomberos', FR: 'Ambulance / Pompiers', IT: 'Ambulanza / Vigili del fuoco', TL: 'Ambulansya / Sunog', ID: 'Ambulans / Pemadam', DE: 'Krankenwagen / Feuerwehr', PT: 'Ambulância / Bombeiros', RU: 'Скорая / Пожарные', YUE: '救護車／消防' },
    desc: { EN: 'Life-threatening emergencies. Operator will ask location and situation.', JP: '命に関わる緊急事態。オペレーターが場所と状況を確認します。', ZH: '危及生命的紧急情况。调度员会询问位置和情况。', 'ZH-T': '危及生命的緊急情況。調度員會詢問位置和情況。', KO: '생명을 위협하는 응급 상황. 상담원이 위치와 상황을 확인합니다.', ES: 'Emergencias que amenazan la vida. El operador preguntará ubicación y situación.', FR: "Urgences mortelles. L'opérateur demandera la position et la situation.", IT: "Emergenze pericolose per la vita. L'operatore chiederà posizione e situazione.", TL: 'Mga emergency na nagbabanta sa buhay. Itetanong ng operator ang lokasyon at sitwasyon.', ID: 'Keadaan darurat yang mengancam jiwa. Operator akan menanyakan lokasi dan situasi.', DE: 'Lebensbedrohliche Notfälle. Der Operator fragt nach Standort und Situation.', PT: 'Emergências com risco de vida. O operador perguntará localização e situação.', RU: 'Угрожающие жизни чрезвычайные ситуации. Оператор уточнит местонахождение и ситуацию.', YUE: '危及生命嘅緊急情況。調度員會詢問你嘅位置同情況。' },
    color: '#b22620', icon: 'ambulance',
  },
  {
    number: '#7119',
    label: { EN: 'Medical Consultation', JP: '医療相談', ZH: '医疗咨询', 'ZH-T': '醫療諮詢', KO: '의료 상담', ES: 'Consulta Médica', FR: 'Consultation Médicale', IT: 'Consulto Medico', TL: 'Medikal na Konsultasyon', ID: 'Konsultasi Medis', DE: 'Medizinische Beratung', PT: 'Consulta Médica', RU: 'Медицинская консультация', YUE: '醫療諮詢' },
    desc: { EN: 'Not sure if you need an ambulance? Call to consult with a nurse 24/7.', JP: '救急車が必要か迷ったら？24時間看護師に相談できます。', ZH: '不确定是否需要救护车？可致电24小时护士咨询服务。', 'ZH-T': '不確定是否需要救護車？可致電24小時護士諮詢服務。', KO: '구급차가 필요한지 모르겠다면? 24시간 간호사 상담 전화.', ES: '¿No sabes si necesitas una ambulancia? Llama para consultar con una enfermera 24/7.', FR: "Besoin d'une ambulance ? Appelez pour consulter une infirmière 24h/24.", IT: "Non sai se hai bisogno di un'ambulanza? Chiama per consultare un'infermiera 24/7.", TL: 'Hindi sigurado kung kailangan ng ambulansya? Tumawag para kumonsulta sa nars 24/7.', ID: 'Tidak yakin perlu ambulans? Telepon untuk konsultasi dengan perawat 24 jam.', DE: 'Unsicher, ob Sie einen Krankenwagen brauchen? Rufen Sie an, um sich 24/7 von einer Pflegekraft beraten zu lassen.', PT: 'Não sabe se precisa de ambulância? Ligue para consultar uma enfermeira 24h.', RU: 'Не уверены, нужна ли скорая? Позвоните для консультации с медсестрой 24/7.', YUE: '唔確定係咪需要救護車？可以24小時致電護士諮詢。' },
    color: '#206777', icon: 'call',
  },
  {
    number: '#8000',
    label: { EN: 'Pediatric Advice', JP: '小児科相談', ZH: '儿科建议', 'ZH-T': '兒科建議', KO: '소아과 상담', ES: 'Consejo Pediátrico', FR: 'Conseil Pédiatrique', IT: 'Consulto Pediatrico', TL: 'Payo sa Pediatriko', ID: 'Saran Pediatri', DE: 'Kinderärztlicher Rat', PT: 'Orientação Pediátrica', RU: 'Консультация педиатра', YUE: '兒科建議' },
    desc: { EN: 'Night/holiday consultations for children. Available in most prefectures.', JP: '夜間・休日の子供の急病相談。多くの都道府県で対応。', ZH: '夜间/节假日儿童急病咨询。大多数都道府县均可使用。', 'ZH-T': '夜間/節假日兒童急病諮詢。大多數都道府縣均可使用。', KO: '야간·휴일 어린이 응급 상담. 대부분의 도도부현에서 이용 가능.', ES: 'Consultas nocturnas/festivas para niños. Disponible en la mayoría de las prefecturas.', FR: 'Consultations nocturnes/fériées pour enfants. Disponible dans la plupart des préfectures.', IT: 'Consulenze notturne/festive per bambini. Disponibile nella maggior parte delle prefetture.', TL: 'Mga konsultasyon sa gabi/holiday para sa mga bata. Available sa karamihan ng prefectura.', ID: 'Konsultasi malam/hari libur untuk anak-anak. Tersedia di sebagian besar prefektur.', DE: 'Nacht-/Feiertagsberatungen für Kinder. Verfügbar in den meisten Präfekturen.', PT: 'Consultas noturnas/feriados para crianças. Disponível na maioria das prefeituras.', RU: 'Ночные и праздничные консультации для детей. Доступно в большинстве префектур.', YUE: '夜間／節假日兒童急病諮詢。大多數都道府縣均可使用。' },
    color: '#7a5700', icon: 'child_care',
  },
  {
    number: '110',
    label: { EN: 'Police', JP: '警察', ZH: '警察', 'ZH-T': '警察', KO: '경찰', ES: 'Policía', FR: 'Police', IT: 'Polizia', TL: 'Pulisya', ID: 'Polisi', DE: 'Polizei', PT: 'Polícia', RU: 'Полиция', YUE: '警察' },
    desc: { EN: 'Crimes, traffic accidents, or situations requiring police assistance.', JP: '犯罪・交通事故・警察が必要な状況。', ZH: '犯罪、交通事故或需要警察协助的情况。', 'ZH-T': '犯罪、交通事故或需要警察協助的情況。', KO: '범죄, 교통사고 또는 경찰 지원이 필요한 상황.', ES: 'Crímenes, accidentes de tráfico o situaciones que requieran asistencia policial.', FR: "Crimes, accidents de la route ou situations nécessitant l'assistance de la police.", IT: 'Crimini, incidenti stradali o situazioni che richiedono assistenza della polizia.', TL: 'Mga krimen, aksidente sa trapiko, o mga sitwasyong nangangailangan ng tulong ng pulisya.', ID: 'Kejahatan, kecelakaan lalu lintas, atau situasi yang memerlukan bantuan polisi.', DE: 'Verbrechen, Verkehrsunfälle oder Situationen, die Polizeihilfe erfordern.', PT: 'Crimes, acidentes de trânsito ou situações que requerem assistência policial.', RU: 'Преступления, дорожно-транспортные происшествия или ситуации, требующие помощи полиции.', YUE: '犯罪、交通事故或需要警察協助嘅情況。' },
    color: '#374151', icon: 'local_police',
  },
]

const WHEN: Array<{ label: Record<string, string>; urgent: boolean }> = [
  { urgent: true, label: { EN: 'Loss of consciousness', JP: '意識を失っている', ZH: '意识丧失', 'ZH-T': '意識喪失', KO: '의식 상실', ES: 'Pérdida de consciencia', FR: 'Perte de connaissance', IT: 'Perdita di coscienza', TL: 'Pagkawala ng malay', ID: 'Kehilangan kesadaran', DE: 'Bewusstlosigkeit', PT: 'Perda de consciência', RU: 'Потеря сознания', YUE: '失去意識' } },
  { urgent: true, label: { EN: 'Difficulty breathing', JP: '呼吸困難', ZH: '呼吸困难', 'ZH-T': '呼吸困難', KO: '호흡 곤란', ES: 'Dificultad para respirar', FR: 'Difficulté à respirer', IT: 'Difficoltà respiratoria', TL: 'Hirap sa paghinga', ID: 'Kesulitan bernapas', DE: 'Atemnot', PT: 'Dificuldade respiratória', RU: 'Затруднённое дыхание', YUE: '呼吸困難' } },
  { urgent: true, label: { EN: 'Severe chest pain', JP: '激しい胸の痛み', ZH: '严重胸痛', 'ZH-T': '嚴重胸痛', KO: '심한 흉통', ES: 'Dolor severo en el pecho', FR: 'Douleur thoracique sévère', IT: 'Dolore toracico severo', TL: 'Matinding sakit ng dibdib', ID: 'Nyeri dada parah', DE: 'Schwerer Brustschmerz', PT: 'Dor no peito severa', RU: 'Сильная боль в груди', YUE: '嚴重胸痛' } },
  { urgent: true, label: { EN: 'Stroke symptoms (face drooping, arm weakness, speech difficulty)', JP: '脳卒中の症状（顔の歪み・腕の脱力・言語障害）', ZH: '脑卒中症状（面部下垂、手臂无力、言语困难）', 'ZH-T': '腦卒中症狀（面部下垂、手臂無力、言語困難）', KO: '뇌졸중 증상(얼굴 처짐, 팔 힘 빠짐, 말 어눌함)', ES: 'Síntomas de derrame (cara caída, brazo débil, dificultad al hablar)', FR: "Symptômes d'AVC (visage affaissé, bras faible, parole difficile)", IT: 'Sintomi ictus (viso cadente, debolezza del braccio, difficoltà nel parlare)', TL: 'Sintomas ng stroke (pagbaluktot ng mukha, panghihina ng braso, hirap sa pagsasalita)', ID: 'Gejala stroke (wajah melorot, lengan lemah, kesulitan bicara)', DE: 'Schlaganfall-Symptome (hängender Mund, Armschwäche, Sprachstörung)', PT: 'Sintomas de AVC (queda facial, fraqueza no braço, dificuldade de falar)', RU: 'Симптомы инсульта (опущение лица, слабость руки, нарушение речи)', YUE: '中風症狀（面部下垂、手臂無力、言語困難）' } },
  { urgent: true, label: { EN: "Severe bleeding that won't stop", JP: '止まらない大量出血', ZH: '止不住的大量出血', 'ZH-T': '止不住的大量出血', KO: '멈추지 않는 심한 출혈', ES: 'Sangrado grave que no para', FR: "Saignement grave qui n'arrête pas", IT: 'Sanguinamento grave che non si ferma', TL: 'Matinding pagdurugo na hindi mapigilan', ID: 'Pendarahan parah yang tidak berhenti', DE: 'Starke Blutung, die nicht aufhört', PT: 'Sangramento grave que não para', RU: 'Сильное кровотечение, которое не останавливается', YUE: '止唔住嘅嚴重出血' } },
  { urgent: true, label: { EN: 'High fever with severe headache/stiff neck', JP: '高熱＋激しい頭痛・首のこわばり', ZH: '高烧伴严重头痛/颈部僵硬', 'ZH-T': '高燒伴嚴重頭痛/頸部僵硬', KO: '고열과 심한 두통/목 뻣뻣함', ES: 'Fiebre alta con dolor de cabeza severo/cuello rígido', FR: 'Fièvre élevée avec maux de tête sévères/nuque raide', IT: 'Febbre alta con mal di testa grave/rigidità del collo', TL: 'Mataas na lagnat na may matinding sakit ng ulo/stiff neck', ID: 'Demam tinggi dengan sakit kepala parah/leher kaku', DE: 'Hohes Fieber mit starken Kopfschmerzen/Nackensteifheit', PT: 'Febre alta com dor de cabeça intensa/rigidez do pescoço', RU: 'Высокая температура с сильной головной болью/ригидностью затылка', YUE: '高燒伴嚴重頭痛／頸部僵硬' } },
  { urgent: false, label: { EN: 'Mild fever (under 38.5°C)', JP: '軽度の発熱（38.5℃未満）', ZH: '轻微发烧（38.5°C以下）', 'ZH-T': '輕微發燒（38.5°C以下）', KO: '가벼운 열 (38.5°C 미만)', ES: 'Fiebre leve (menos de 38.5°C)', FR: 'Fièvre légère (moins de 38,5°C)', IT: 'Febbre lieve (sotto 38,5°C)', TL: 'Banayad na lagnat (wala pang 38.5°C)', ID: 'Demam ringan (di bawah 38,5°C)', DE: 'Leichtes Fieber (unter 38,5°C)', PT: 'Febre leve (abaixo de 38,5°C)', RU: 'Умеренная температура (ниже 38,5°C)', YUE: '輕微發燒（38.5°C以下）' } },
  { urgent: false, label: { EN: 'Minor cuts or bruises', JP: '軽い切り傷・打撲', ZH: '轻微割伤或擦伤', 'ZH-T': '輕微割傷或擦傷', KO: '가벼운 베인 상처나 타박상', ES: 'Cortes o moretones menores', FR: 'Petites coupures ou ecchymoses', IT: 'Piccoli tagli o lividi', TL: 'Maliliit na sugat o pasa', ID: 'Luka kecil atau memar', DE: 'Kleine Schnitte oder Prellungen', PT: 'Cortes ou hematomas menores', RU: 'Небольшие порезы или ушибы', YUE: '輕微割傷或瘀傷' } },
  { urgent: false, label: { EN: 'Common cold symptoms', JP: '一般的な風邪症状', ZH: '普通感冒症状', 'ZH-T': '普通感冒症狀', KO: '일반 감기 증상', ES: 'Síntomas de resfriado común', FR: 'Symptômes de rhume commun', IT: 'Sintomi del raffreddore comune', TL: 'Mga sintomas ng sipon', ID: 'Gejala flu biasa', DE: 'Erkältungssymptome', PT: 'Sintomas de resfriado comum', RU: 'Симптомы обычной простуды', YUE: '普通感冒症狀' } },
  { urgent: false, label: { EN: 'Stomach ache without other symptoms', JP: '他に症状のない腹痛', ZH: '无其他症状的腹痛', 'ZH-T': '無其他症狀的腹痛', KO: '다른 증상 없는 복통', ES: 'Dolor de estómago sin otros síntomas', FR: "Mal d'estomac sans autres symptômes", IT: 'Mal di stomaco senza altri sintomi', TL: 'Sakit ng tiyan na walang ibang sintomas', ID: 'Sakit perut tanpa gejala lain', DE: 'Magenschmerzen ohne andere Symptome', PT: 'Dor de estômago sem outros sintomas', RU: 'Боль в животе без других симптомов', YUE: '無其他症狀嘅腹痛' } },
]

const TIPS: Record<string, string[]> = {
  EN: ['State your address clearly first — operators may have limited English.','Use Google Translate in voice mode if communication is difficult.','Ambulance transport in Japan is free, but hospital treatment is not.','Calling 119 repeatedly without emergency may result in a fee.'],
  JP: ['まず住所をはっきり伝える — オペレーターの英語対応は限られています。','コミュニケーションが難しい場合はGoogle翻訳の音声モードを使う。','救急車の搬送は無料ですが、病院での治療費は別途かかります。','緊急でないのに119番に繰り返し電話すると費用が発生する場合があります。'],
  ZH: ['首先清楚地说明地址 — 调度员的英语可能有限。','如果沟通困难，请使用Google翻译的语音模式。','日本救护车运送免费，但医院治疗费用需自付。','非紧急情况下多次拨打119可能会产生费用。'],
  'ZH-T': ['首先清楚地說明地址 — 調度員的英語可能有限。','如果溝通困難，請使用Google翻譯的語音模式。','日本救護車運送免費，但醫院治療費用需自付。','非緊急情況下多次撥打119可能會產生費用。'],
  KO: ['먼저 주소를 명확히 말하세요 — 상담원의 영어 실력이 제한적일 수 있습니다.','의사소통이 어렵다면 Google 번역 음성 모드를 사용하세요.','일본에서 구급차 이송은 무료이지만 병원 치료비는 유료입니다.','응급 상황이 아닌데 119에 반복적으로 전화하면 요금이 발생할 수 있습니다.'],
  ES: ['Primero indica tu dirección claramente — los operadores pueden tener inglés limitado.','Usa Google Translate en modo voz si la comunicación es difícil.','El transporte en ambulancia en Japón es gratuito, pero el tratamiento hospitalario no.','Llamar al 119 repetidamente sin emergencia puede resultar en un cargo.'],
  FR: ["Donnez d'abord votre adresse clairement — les opérateurs peuvent avoir un anglais limité.",'Utilisez Google Translate en mode vocal si la communication est difficile.',"Le transport en ambulance au Japon est gratuit, mais pas le traitement hospitalier.",'Appeler le 119 à plusieurs reprises sans urgence peut entraîner des frais.'],
  IT: ["Indica prima il tuo indirizzo chiaramente — gli operatori potrebbero avere un inglese limitato.",'Usa Google Translate in modalità vocale se la comunicazione è difficile.',"Il trasporto in ambulanza in Giappone è gratuito, ma non il trattamento ospedaliero.",'Chiamare il 119 ripetutamente senza emergenza potrebbe comportare una tariffa.'],
  TL: ['Sabihin muna ang iyong address nang malinaw — maaaring limitado ang Ingles ng operator.','Gamitin ang Google Translate sa voice mode kung mahirap ang komunikasyon.','Ang ambulansya sa Japan ay libre, ngunit hindi ang paggamot sa ospital.','Ang paulit-ulit na pagtawag sa 119 nang walang emergency ay maaaring magresulta sa bayad.'],
  ID: ['Sebutkan alamat Anda dengan jelas terlebih dahulu — operator mungkin memiliki kemampuan bahasa Inggris terbatas.','Gunakan Google Translate mode suara jika komunikasi sulit.','Transportasi ambulans di Jepang gratis, tetapi perawatan rumah sakit tidak.','Menelepon 119 berulang kali tanpa keadaan darurat dapat mengakibatkan biaya.'],
  DE: ['Nennen Sie zuerst deutlich Ihre Adresse — Operatoren haben möglicherweise begrenzte Englischkenntnisse.','Nutzen Sie Google Translate im Sprachmodus, wenn die Kommunikation schwierig ist.','Krankentransport in Japan ist kostenlos, Krankenhausbehandlung jedoch nicht.','Wiederholte 119-Anrufe ohne Notfall können gebührenpflichtig sein.'],
  PT: ['Informe seu endereço claramente primeiro — os operadores podem ter inglês limitado.','Use o Google Translate no modo de voz se a comunicação for difícil.','O transporte de ambulância no Japão é gratuito, mas o tratamento hospitalar não.','Ligar para o 119 repetidamente sem emergência pode resultar em cobrança.'],
  RU: ['Сначала чётко назовите свой адрес — операторы могут знать английский ограниченно.','Используйте Google Translate в режиме голоса при затруднённом общении.','Перевозка на скорой помощи в Японии бесплатна, лечение в больнице — нет.','Многократные звонки на 119 без экстренной необходимости могут облагаться сбором.'],
  YUE: ['首先清楚講明地址 — 調度員嘅英語可能有限。','如果溝通困難，可以使用Google翻譯嘅語音模式。','日本救護車運送免費，但醫院治療費用需自付。','非緊急情況下重複致電119可能會產生費用。'],
}

export default function EmergencyPage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const tips = TIPS[lang] ?? TIPS.EN

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
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#b22620', fontVariationSettings: "'FILL' 1" as string }}>emergency_heat</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800, color: '#1e1b1c' }}>{tr(EMERGENCY.title, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28 }}>{tr(EMERGENCY.subtitle, lang)}</p>

      <section style={{ marginBottom: 36 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: '#1e1b1c' }}>{tr(EMERGENCY.title, lang)}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {HOTLINES.map(h => (
            <div key={h.number} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 14, padding: '16px 18px', border: '1px solid rgba(226,190,186,0.2)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: h.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{h.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                  <span className="font-headline" style={{ fontSize: 20, fontWeight: 900, color: h.color }}>{h.number}</span>
                  <span className="font-label" style={{ fontSize: 11, fontWeight: 600, color: '#5a413d', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{tl(h.label, lang)}</span>
                </div>
                <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.5 }}>{tl(h.desc, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: '#1e1b1c' }}>{tr(EMERGENCY.whenTitle, lang)}</h2>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(226,190,186,0.2)', overflow: 'hidden' }}>
          {WHEN.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < WHEN.length - 1 ? '1px solid rgba(226,190,186,0.12)' : 'none', background: item.urgent ? 'rgba(254,242,242,0.6)' : '#fff' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: item.urgent ? '#b22620' : '#16a34a', fontVariationSettings: "'FILL' 1" as string, flexShrink: 0 }}>
                {item.urgent ? 'priority_high' : 'check_circle'}
              </span>
              <span style={{ fontSize: 13, color: '#1e1b1c', lineHeight: 1.4 }}>{tl(item.label, lang)}</span>
              {item.urgent && <span className="font-label" style={{ fontSize: 9, background: '#b22620', color: '#fff', padding: '2px 6px', borderRadius: 4, marginLeft: 'auto', flexShrink: 0 }}>119</span>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#faf2f2', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(226,190,186,0.2)' }}>
        <h2 className="font-headline" style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: '#1e1b1c' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'text-bottom', marginRight: 4, fontVariationSettings: "'FILL' 1" as string, color: '#b22620' }}>lightbulb</span>
          {tr(EMERGENCY.tipsTitle, lang)}
        </h2>
        {tips.map((tip, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < tips.length - 1 ? 8 : 0 }}>
            <span style={{ fontSize: 13, color: '#b22620', fontWeight: 700, flexShrink: 0 }}>·</span>
            <span style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.55 }}>{tip}</span>
          </div>
        ))}
      </section>
    </main>
  )
}
