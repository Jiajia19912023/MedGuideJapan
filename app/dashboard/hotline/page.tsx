'use client'
import Link from 'next/link'
import { useLang } from '../lang-context'
import { useSaved } from '../saved-context'
import { tr, COMMON, HOTLINE } from '../translations'

const ITEM = { href: '/dashboard/hotline', title: '#7119 & #8000', titleJP: '#7119・#8000', icon: 'call', color: '#206777' }
function tl(m: Record<string,string>, l: string) { return m[l] ?? m['EN'] }

const CARDS: {
  number: string
  title: Record<string,string>
  color: string
  icon: string
  availability: Record<string,string>
  who: Record<string,string>
  desc: Record<string,string>
  langs: Record<string,string>
}[] = [
  {
    number: '#7119',
    title: { EN: '救急安心センター — Medical Consultation', JP: '救急安心センター — 医療相談', ZH: '救急安心センター — 医疗咨询', 'ZH-T': '救急安心センター — 醫療諮詢', KO: '구큐안신센터 — 의료 상담', ES: '救急安心センター — Consulta Médica', FR: '救急安心センター — Consultation Médicale', IT: '救急安心センター — Consulenza Medica', TL: '救急安心センター — Medikal na Konsultasyon', ID: '救急安心センター — Konsultasi Medis', DE: '救急安心センター — Medizinische Beratung', PT: '救急安心センター — Consulta Médica', RU: '救急安心センター — Медицинская консультация', YUE: '救急安心センター — 醫療諮詢' },
    color: '#206777', icon: 'call',
    availability: { EN: '24 hours / 365 days (most prefectures)', JP: '24時間・365日（多くの都道府県）', ZH: '24小时 / 365天（大多数都道府县）', 'ZH-T': '24小時 / 365天（大多數都道府縣）', KO: '24시간 / 365일 (대부분 도도부현)', ES: '24 horas / 365 días (mayoría de prefecturas)', FR: '24h/24, 7j/7 (la plupart des préfectures)', IT: '24 ore / 365 giorni (la maggior parte delle prefetture)', TL: '24 oras / 365 araw (karamihang prefecture)', ID: '24 jam / 365 hari (sebagian besar prefektur)', DE: '24h / 365 Tage (meiste Präfekturen)', PT: '24h / 365 dias (maioria das prefeituras)', RU: '24 часа / 365 дней (большинство префектур)', YUE: '24小時 / 365日（大多數都道府縣）' },
    who: { EN: 'Adults and children with uncertain medical situations', JP: '症状の対応に迷っている大人・子供', ZH: '不确定病情应对方式的成人及儿童', 'ZH-T': '不確定病情應對方式的成人及兒童', KO: '증상 대응에 고민 중인 성인 및 아동', ES: 'Adultos y niños con situaciones médicas inciertas', FR: 'Adultes et enfants avec des situations médicales incertaines', IT: 'Adulti e bambini con situazioni mediche incerte', TL: 'Mga matatanda at bata na may hindi tiyak na medikal na sitwasyon', ID: 'Orang dewasa dan anak-anak dengan situasi medis yang tidak pasti', DE: 'Erwachsene und Kinder mit unklaren medizinischen Situationen', PT: 'Adultos e crianças com situações médicas incertas', RU: 'Взрослые и дети с неясными медицинскими ситуациями', YUE: '對症狀應對有疑問嘅成人及兒童' },
    desc: { EN: 'A nurse or doctor will evaluate your symptoms and advise whether you need an ambulance, should visit an ER tonight, or can wait until morning. Also helps find the nearest open clinic.', JP: '看護師または医師が症状を確認し、救急車が必要か、今夜ERに行くべきか、朝まで待てるかをアドバイスします。近くの開院中のクリニックも紹介してくれます。', ZH: '护士或医生会评估您的症状，并建议您是否需要救护车、今晚是否应该去急诊，或者是否可以等到明天早上。还可以帮您找到最近的开诊诊所。', 'ZH-T': '護士或醫生會評估您的症狀，並建議您是否需要救護車、今晚是否應該去急診，或者是否可以等到明天早上。還可以幫您找到最近的開診診所。', KO: '간호사나 의사가 증상을 평가하고 구급차가 필요한지, 오늘 밤 응급실을 방문해야 하는지, 아침까지 기다려도 되는지 조언해 줍니다. 가장 가까운 개원 클리닉 안내도 해줍니다.', ES: 'Un enfermero o médico evaluará sus síntomas y le aconsejará si necesita una ambulancia, debe visitar urgencias esta noche o puede esperar hasta mañana.', FR: 'Un infirmier ou médecin évaluera vos symptômes et vous conseillera sur la nécessité d\'une ambulance, d\'une visite aux urgences ce soir ou d\'attendre le matin.', IT: 'Un infermiere o medico valuterà i tuoi sintomi e ti consiglierà se hai bisogno di un\'ambulanza, devi visitare il pronto soccorso stasera o puoi aspettare fino al mattino. Aiuta anche a trovare la clinica aperta più vicina.', TL: 'Ang isang nars o doktor ay susuriin ang iyong mga sintomas at magbibigay ng payo kung kailangan mo ng ambulansya, dapat pumunta sa ER ngayong gabi, o maaaring maghintay hanggang umaga.', ID: 'Seorang perawat atau dokter akan mengevaluasi gejala Anda dan menyarankan apakah Anda membutuhkan ambulans, harus mengunjungi IGD malam ini, atau bisa menunggu sampai pagi.', DE: 'Eine Krankenschwester oder ein Arzt bewertet Ihre Symptome und rät, ob Sie einen Krankenwagen benötigen, heute Nacht die Notaufnahme aufsuchen sollten oder bis morgen warten können.', PT: 'Um enfermeiro ou médico avaliará seus sintomas e aconselhará se você precisa de ambulância, deve visitar uma emergência esta noite ou pode esperar até amanhã.', RU: 'Медсестра или врач оценит ваши симптомы и посоветует, нужна ли скорая, стоит ли посетить скорую помощь сегодня ночью или можно подождать до утра.', YUE: '護士或醫生會評估你嘅症狀，並建議你係咪需要救護車、今晚係咪應該去急診，或者係咪可以等到明天早上。亦可以幫你搵最近嘅開診診所。' },
    langs: { EN: 'Japanese primary. English available in Tokyo (#7119), Osaka, and some other major cities.', JP: '主に日本語対応。東京（#7119）・大阪などでは英語にも対応。', ZH: '主要使用日语。东京（#7119）、大阪及部分主要城市提供英语服务。', 'ZH-T': '主要使用日語。東京（#7119）、大阪及部分主要城市提供英語服務。', KO: '주로 일본어. 도쿄(#7119), 오사카 및 일부 주요 도시에서 영어 이용 가능.', ES: 'Principalmente japonés. Inglés disponible en Tokio, Osaka y algunas ciudades importantes.', FR: 'Principalement japonais. Anglais disponible à Tokyo, Osaka et quelques grandes villes.', IT: 'Principalmente giapponese. Inglese disponibile a Tokyo (#7119), Osaka e alcune altre città principali.', TL: 'Pangunahing Japanese. Ang English ay available sa Tokyo (#7119), Osaka, at ilang iba pang malalaking lungsod.', ID: 'Utamanya Jepang. Bahasa Inggris tersedia di Tokyo (#7119), Osaka, dan beberapa kota besar lainnya.', DE: 'Hauptsächlich Japanisch. Englisch in Tokio, Osaka und einigen anderen Großstädten verfügbar.', PT: 'Principalmente japonês. Inglês disponível em Tóquio, Osaka e algumas grandes cidades.', RU: 'Преимущественно японский. Английский доступен в Токио, Осаке и некоторых крупных городах.', YUE: '主要係日語。英語喺東京（#7119）、大阪同部分主要城市有提供。' },
  },
  {
    number: '#8000',
    title: { EN: '小児救急電話相談 — Pediatric Advice', JP: '小児救急電話相談 — 子供の急病相談', ZH: '小児救急電話相談 — 小儿急症咨询', 'ZH-T': '小児救急電話相談 — 小兒急症諮詢', KO: '소아응급전화상담 — 어린이 응급 상담', ES: '小児救急電話相談 — Consejos Pediátricos', FR: '小児救急電話相談 — Conseils Pédiatriques', IT: '小児救急電話相談 — Consulenza Pediatrica', TL: '小児救急電話相談 — Payo para sa mga Bata', ID: '小児救急電話相談 — Konsultasi Pediatri', DE: '小児救急電話相談 — Pädiatrische Beratung', PT: '小児救急電話相談 — Orientação Pediátrica', RU: '小児救急電話相談 — Педиатрическая консультация', YUE: '小児救急電話相談 — 小兒急症諮詢' },
    color: '#7a5700', icon: 'child_care',
    availability: { EN: 'Nights & holidays (hours vary by prefecture)', JP: '夜間・休日（都道府県により時間が異なる）', ZH: '夜间及节假日（各都道府县时间不同）', 'ZH-T': '夜間及節假日（各都道府縣時間不同）', KO: '야간 및 공휴일 (도도부현마다 시간 다름)', ES: 'Noches y feriados (horarios según prefectura)', FR: 'Nuits et jours fériés (horaires selon préfecture)', IT: 'Notti e festivi (orari per prefettura)', TL: 'Gabi at holiday (nag-iiba ang oras bawat prefecture)', ID: 'Malam & hari libur (jam bervariasi per prefektur)', DE: 'Nächte & Feiertage (Zeiten nach Präfektur)', PT: 'Noites e feriados (horários por prefeitura)', RU: 'Ночи и праздники (часы зависят от префектуры)', YUE: '夜間及節假日（各都道府縣時間不同）' },
    who: { EN: 'Parents of infants and children', JP: '乳幼児・子供を持つ保護者', ZH: '婴幼儿及儿童的家长', 'ZH-T': '嬰幼兒及兒童的家長', KO: '영유아 및 어린이 부모', ES: 'Padres de bebés y niños', FR: 'Parents de nourrissons et d\'enfants', IT: 'Genitori di neonati e bambini', TL: 'Mga magulang ng mga sanggol at bata', ID: 'Orang tua dari bayi dan anak-anak', DE: 'Eltern von Säuglingen und Kindern', PT: 'Pais de bebês e crianças', RU: 'Родители младенцев и детей', YUE: '嬰幼兒及兒童嘅家長' },
    desc: { EN: "A pediatric nurse will assess your child's symptoms and tell you how urgent the situation is. Essential for parents unsure whether a child's fever or vomiting requires an ER visit.", JP: '小児科看護師がお子さんの症状を確認し、緊急度を教えてくれます。子供の発熱や嘔吐でERに行くべきかどうかわからない保護者に最適。', ZH: '小儿科护士会评估您孩子的症状并告知紧急程度。对于不确定孩子的发烧或呕吐是否需要去急诊的家长来说非常重要。', 'ZH-T': '小兒科護士會評估您孩子的症狀並告知緊急程度。對於不確定孩子的發燒或嘔吐是否需要去急診的家長來說非常重要。', KO: '소아과 간호사가 아이의 증상을 평가하고 긴급도를 알려줍니다. 아이의 발열이나 구토가 응급실 방문이 필요한지 모르는 부모에게 필수적입니다.', ES: 'Un enfermero pediátrico evaluará los síntomas de su hijo y le dirá qué tan urgente es la situación.', FR: 'Un infirmier pédiatrique évaluera les symptômes de votre enfant et vous dira à quel point la situation est urgente.', IT: 'Un infermiere pediatrico valuterà i sintomi del tuo bambino e ti dirà quanto è urgente la situazione. Essenziale per i genitori incerti se andare al pronto soccorso.', TL: 'Ang isang pediatric na nars ay susuriin ang mga sintomas ng iyong anak at sasabihin kung gaano kahalaga ang sitwasyon.', ID: 'Perawat pediatri akan menilai gejala anak Anda dan memberitahu betapa mendesaknya situasinya.', DE: 'Eine pädiatrische Krankenschwester bewertet die Symptome Ihres Kindes und sagt Ihnen, wie dringend die Situation ist.', PT: 'Um enfermeiro pediátrico avaliará os sintomas do seu filho e dirá o quão urgente é a situação.', RU: 'Педиатрическая медсестра оценит симптомы вашего ребёнка и скажет, насколько срочна ситуация.', YUE: '小兒科護士會評估你孩子嘅症狀並告知緊急程度。對於唔確定孩子發燒或嘔吐係咪需要去急診嘅家長嚟講非常重要。' },
    langs: { EN: 'Japanese primary. Some areas have interpreter services.', JP: '主に日本語対応。通訳サービスのある地域もあります。', ZH: '主要使用日语。部分地区提供翻译服务。', 'ZH-T': '主要使用日語。部分地區提供翻譯服務。', KO: '주로 일본어. 일부 지역에서 통역 서비스 제공.', ES: 'Principalmente japonés. Algunas áreas tienen servicios de intérprete.', FR: 'Principalement japonais. Certaines zones ont des services d\'interprétation.', IT: 'Principalmente giapponese. Alcune zone hanno servizi di interpretariato.', TL: 'Pangunahing Japanese. May ilang lugar na may serbisyo ng interpreter.', ID: 'Utamanya Jepang. Beberapa area memiliki layanan juru bahasa.', DE: 'Hauptsächlich Japanisch. Einige Gebiete haben Dolmetscherdienste.', PT: 'Principalmente japonês. Algumas áreas têm serviços de intérprete.', RU: 'Преимущественно японский. В некоторых районах есть переводчики.', YUE: '主要係日語。部分地區提供翻譯服務。' },
  },
]

const OTHER = [
  { name: 'AMDA International Medical Info Center', number: '03-5285-8088', note: { EN: 'Multilingual medical consultation (weekdays)', JP: '多言語医療相談（平日）', ZH: '多语言医疗咨询（工作日）', 'ZH-T': '多語言醫療諮詢（平日）', KO: '다국어 의료 상담 (평일)', ES: 'Consulta médica multilingüe (días laborables)', FR: 'Consultation médicale multilingue (jours ouvrables)', IT: 'Consulenza medica multilingue (giorni feriali)', TL: 'Multilingual na medikal na konsultasyon (weekdays)', ID: 'Konsultasi medis multibahasa (hari kerja)', DE: 'Mehrsprachige medizinische Beratung (Werktage)', PT: 'Consulta médica multilíngue (dias úteis)', RU: 'Многоязычная медицинская консультация (будни)', YUE: '多語言醫療諮詢（平日）' } },
  { name: 'Japan Visitor Hotline (JNTO)', number: '050-3816-2787', note: { EN: '24/7, multiple languages', JP: '24時間・多言語対応', ZH: '24小时，多种语言', 'ZH-T': '24小時，多種語言', KO: '24시간, 다국어 지원', ES: '24/7, varios idiomas', FR: '24h/24, plusieurs langues', IT: '24/7, più lingue', TL: '24/7, maraming wika', ID: '24/7, berbagai bahasa', DE: '24/7, mehrere Sprachen', PT: '24/7, várias línguas', RU: '24/7, несколько языков', YUE: '24小時，多種語言' } },
  { name: 'Yorisoi Hotline', number: '0120-279-338', note: { EN: '24/7 multilingual counseling — free', JP: '24時間多言語カウンセリング（無料）', ZH: '24小时多语言咨询服务（免费）', 'ZH-T': '24小時多語言諮詢服務（免費）', KO: '24시간 다국어 상담 — 무료', ES: 'Asesoramiento multilingüe 24/7 — gratis', FR: 'Conseil multilingue 24h/24 — gratuit', IT: 'Consulenza multilingue 24/7 — gratuita', TL: '24/7 multilingual na konsultasyon — libre', ID: 'Konseling multibahasa 24/7 — gratis', DE: 'Mehrsprachige Beratung 24/7 — kostenlos', PT: 'Aconselhamento multilíngue 24/7 — gratuito', RU: 'Многоязычное консультирование 24/7 — бесплатно', YUE: '24小時多語言諮詢——免費' } },
]

const MH_ITEMS = {
  EN: [
    { label: 'Start here: 心療内科 Clinic', badge: 'No referral needed', badgeColor: '#206777', desc: 'Best first step for stress, anxiety, and depression. More accessible than 精神科 (psychiatry) and covered by NHI. Search Google Maps for 心療内科.' },
    { label: 'Specialist: 精神科 Psychiatrist', badge: 'NHI covered', badgeColor: '#7a5700', desc: 'For more serious conditions. No referral needed but appointment required; wait times can be long.' },
    { label: 'Crisis: Yorisoi Hotline', badge: '0120-279-338', badgeColor: '#b22620', desc: '24/7, free, multilingual. Call if you are in crisis or having thoughts of self-harm. Say: "精神的につらいです" (I\'m struggling mentally).' },
  ],
  JP: [
    { label: 'まず：心療内科へ', badge: '予約不要', badgeColor: '#206777', desc: 'ストレス・不安・うつの初診に最適。精神科よりも受診しやすく、NHIが適用されます。「心療内科」でGoogleマップ検索。' },
    { label: '専門医：精神科', badge: 'NHI適用', badgeColor: '#7a5700', desc: 'より重篤な精神疾患（統合失調症など）に対応。紹介状は不要ですが、予約が必要で待ち時間が長いことがあります。' },
    { label: '危機的状況：よりそいホットライン', badge: '0120-279-338', badgeColor: '#b22620', desc: '24時間・多言語対応・無料。精神的につらい時、自傷・自殺念慮がある時はすぐに電話してください。「精神的につらいです」と伝えるだけで大丈夫です。' },
  ],
  ZH: [
    { label: '首先：心療内科诊所', badge: '无需转诊', badgeColor: '#206777', desc: '处理压力、焦虑和抑郁的最佳第一步。比精神科更易就诊，且NHI保险适用。在Google地图搜索"心療内科"。' },
    { label: '专科：精神科医生', badge: 'NHI适用', badgeColor: '#7a5700', desc: '适用于较严重的心理健康状况。无需转诊但需预约，等待时间可能较长。' },
    { label: '危机状况：よりそいホットライン', badge: '0120-279-338', badgeColor: '#b22620', desc: '24小时、免费、多语言。如果您处于危机中或有自伤念头，请立即致电。说"精神的につらいです"（我精神上很痛苦）即可。' },
  ],
  KO: [
    { label: '먼저: 심료내과 클리닉', badge: '의뢰서 불필요', badgeColor: '#206777', desc: '스트레스, 불안, 우울증의 첫 번째 단계로 가장 적합합니다. 정신과보다 접근하기 쉽고 NHI 적용. Google 지도에서 "心療内科" 검색.' },
    { label: '전문의: 정신과 의사', badge: 'NHI 적용', badgeColor: '#7a5700', desc: '더 심각한 질환에 적합합니다. 의뢰서는 필요 없지만 예약이 필요하며 대기 시간이 길 수 있습니다.' },
    { label: '위기 상황: よりそいホットライン', badge: '0120-279-338', badgeColor: '#b22620', desc: '24시간, 무료, 다국어. 위기에 처하거나 자해 생각이 있으면 즉시 전화하세요. "精神的につらいです"라고 말하세요.' },
  ],
  'ZH-T': [
    { label: '首先：心療内科診所', badge: '無需轉診', badgeColor: '#206777', desc: '處理壓力、焦慮和抑鬱的最佳第一步。比精神科更易就診，且NHI保險適用。在Google地圖搜索「心療内科」。' },
    { label: '專科：精神科醫生', badge: 'NHI適用', badgeColor: '#7a5700', desc: '適用於較嚴重的心理健康狀況。無需轉診但需預約，等待時間可能較長。' },
    { label: '危機狀況：よりそいホットライン', badge: '0120-279-338', badgeColor: '#b22620', desc: '24小時、免費、多語言。如果您處於危機中或有自傷念頭，請立即致電。說「精神的につらいです」（我精神上很痛苦）即可。' },
  ],
  ES: [
    { label: 'Primero: Clínica 心療内科', badge: 'Sin derivación', badgeColor: '#206777', desc: 'El mejor primer paso para el estrés, ansiedad y depresión. Más accesible que 精神科 (psiquiatría) y cubierto por NHI. Busca 心療内科 en Google Maps.' },
    { label: 'Especialista: Psiquiatra 精神科', badge: 'Cubierto por NHI', badgeColor: '#7a5700', desc: 'Para condiciones más graves. No se necesita derivación pero sí cita; los tiempos de espera pueden ser largos.' },
    { label: 'Crisis: Yorisoi Hotline', badge: '0120-279-338', badgeColor: '#b22620', desc: '24/7, gratis, multilingüe. Llama si estás en crisis o tienes pensamientos de autolesión. Di: "精神的につらいです" (Estoy sufriendo mentalmente).' },
  ],
  FR: [
    { label: 'Premier pas : Clinique 心療内科', badge: 'Sans ordonnance', badgeColor: '#206777', desc: 'Meilleur premier pas pour le stress, l\'anxiété et la dépression. Plus accessible que 精神科 (psychiatrie) et couvert par le NHI. Cherchez 心療内科 sur Google Maps.' },
    { label: 'Spécialiste : Psychiatre 精神科', badge: 'NHI couvert', badgeColor: '#7a5700', desc: 'Pour les conditions plus graves. Pas de dérivation requise mais rendez-vous nécessaire ; les temps d\'attente peuvent être longs.' },
    { label: 'Crise : Yorisoi Hotline', badge: '0120-279-338', badgeColor: '#b22620', desc: '24h/24, gratuit, multilingue. Appelez si vous êtes en crise ou avez des pensées d\'automutilation. Dites : "精神的につらいです" (Je souffre mentalement).' },
  ],
  IT: [
    { label: 'Prima: Clinica 心療内科', badge: 'Senza referral', badgeColor: '#206777', desc: 'Il miglior primo passo per stress, ansia e depressione. Più accessibile di 精神科 (psichiatria) e coperto dal NHI. Cerca 心療内科 su Google Maps.' },
    { label: 'Specialista: Psichiatra 精神科', badge: 'Coperto dal NHI', badgeColor: '#7a5700', desc: 'Per condizioni più gravi. Nessun referral necessario ma appuntamento richiesto; i tempi di attesa possono essere lunghi.' },
    { label: 'Crisi: Yorisoi Hotline', badge: '0120-279-338', badgeColor: '#b22620', desc: '24/7, gratuito, multilingue. Chiama se sei in crisi o hai pensieri di autolesionismo. Di\': "精神的につらいです" (Sto soffrendo mentalmente).' },
  ],
  TL: [
    { label: 'Magsimula dito: 心療内科 Clinic', badge: 'Hindi kailangan ng referral', badgeColor: '#206777', desc: 'Pinakamainam na unang hakbang para sa stress, pagkabalisa, at depresyon. Mas madaling ma-access kaysa 精神科 (psychiatry) at sakop ng NHI. Hanapin ang 心療内科 sa Google Maps.' },
    { label: 'Espesyalista: 精神科 Psychiatrist', badge: 'Sakop ng NHI', badgeColor: '#7a5700', desc: 'Para sa mas seryosong kondisyon. Hindi kailangan ng referral ngunit kailangan ng appointment; ang oras ng paghihintay ay maaaring mahaba.' },
    { label: 'Krisis: Yorisoi Hotline', badge: '0120-279-338', badgeColor: '#b22620', desc: '24/7, libre, multilingual. Tumawag kung ikaw ay nasa krisis o may mga kaisipang sariling pinsala. Sabihin: "精神的につらいです" (Nahihirapan ako mentally).' },
  ],
  ID: [
    { label: 'Mulai di sini: Klinik 心療内科', badge: 'Tanpa referral', badgeColor: '#206777', desc: 'Langkah pertama terbaik untuk stres, kecemasan, dan depresi. Lebih mudah diakses daripada 精神科 (psikiatri) dan ditanggung NHI. Cari 心療内科 di Google Maps.' },
    { label: 'Spesialis: Psikiater 精神科', badge: 'Ditanggung NHI', badgeColor: '#7a5700', desc: 'Untuk kondisi yang lebih serius. Tidak perlu referral tetapi perlu janji temu; waktu tunggu bisa lama.' },
    { label: 'Krisis: Yorisoi Hotline', badge: '0120-279-338', badgeColor: '#b22620', desc: '24/7, gratis, multibahasa. Hubungi jika Anda dalam krisis atau memiliki pikiran menyakiti diri sendiri. Katakan: "精神的につらいです" (Saya berjuang secara mental).' },
  ],
  DE: [
    { label: 'Zuerst: 心療内科-Klinik', badge: 'Ohne Überweisung', badgeColor: '#206777', desc: 'Der beste erste Schritt bei Stress, Angst und Depression. Zugänglicher als 精神科 (Psychiatrie) und vom NHI abgedeckt. Suche 心療内科 auf Google Maps.' },
    { label: 'Spezialist: Psychiater 精神科', badge: 'NHI abgedeckt', badgeColor: '#7a5700', desc: 'Für schwerwiegendere Erkrankungen. Keine Überweisung erforderlich, aber Termin nötig; Wartezeiten können lang sein.' },
    { label: 'Krise: Yorisoi Hotline', badge: '0120-279-338', badgeColor: '#b22620', desc: '24/7, kostenlos, mehrsprachig. Rufe an, wenn du in einer Krise bist oder Gedanken an Selbstverletzung hast. Sage: "精神的につらいです" (Ich leide psychisch).' },
  ],
  PT: [
    { label: 'Comece aqui: Clínica 心療内科', badge: 'Sem encaminhamento', badgeColor: '#206777', desc: 'Melhor primeiro passo para estresse, ansiedade e depressão. Mais acessível que 精神科 (psiquiatria) e coberto pelo NHI. Busque 心療内科 no Google Maps.' },
    { label: 'Especialista: Psiquiatra 精神科', badge: 'Coberto pelo NHI', badgeColor: '#7a5700', desc: 'Para condições mais graves. Sem encaminhamento necessário, mas consulta precisa de agendamento; tempos de espera podem ser longos.' },
    { label: 'Crise: Yorisoi Hotline', badge: '0120-279-338', badgeColor: '#b22620', desc: '24/7, gratuito, multilíngue. Ligue se estiver em crise ou tiver pensamentos de automutilação. Diga: "精神的につらいです" (Estou sofrendo mentalmente).' },
  ],
  RU: [
    { label: 'Начать здесь: Клиника 心療内科', badge: 'Направление не нужно', badgeColor: '#206777', desc: 'Лучший первый шаг при стрессе, тревоге и депрессии. Более доступен, чем 精神科 (психиатрия), покрывается NHI. Найдите 心療内科 на Google Maps.' },
    { label: 'Специалист: Психиатр 精神科', badge: 'Покрывается NHI', badgeColor: '#7a5700', desc: 'Для более серьёзных состояний. Направление не требуется, но нужна запись; время ожидания может быть долгим.' },
    { label: 'Кризис: Yorisoi Hotline', badge: '0120-279-338', badgeColor: '#b22620', desc: '24/7, бесплатно, многоязычно. Звоните при кризисе или мыслях о причинении себе вреда. Скажите: "精神的につらいです" (Мне психически тяжело).' },
  ],
  YUE: [
    { label: '首先：心療内科診所', badge: '唔需要轉診', badgeColor: '#206777', desc: '處理壓力、焦慮同抑鬱嘅最佳第一步。比精神科更易就診，且NHI保險適用。喺Google地圖搜索「心療内科」。' },
    { label: '專科：精神科醫生', badge: 'NHI適用', badgeColor: '#7a5700', desc: '適用於較嚴重嘅心理健康情況。唔需要轉診但需要預約，等待時間可能較長。' },
    { label: '危機：よりそいホットライン', badge: '0120-279-338', badgeColor: '#b22620', desc: '24/7，免費，多語言。如果你處於危機中或有自傷念頭，請立即致電。說「精神的につらいです」（我精神上好辛苦）即可。' },
  ],
}

const H_MH       = { EN: 'Mental Health Resources', JP: 'メンタルヘルスの相談窓口', ZH: '心理健康资源', 'ZH-T': '心理健康資源', KO: '정신 건강 지원', ES: 'Recursos de Salud Mental', FR: 'Ressources en Santé Mentale', IT: 'Risorse per la Salute Mentale', TL: 'Mga Mapagkukunan ng Kalusugang Mental', ID: 'Sumber Kesehatan Mental', DE: 'Psychische Gesundheitsressourcen', PT: 'Recursos de Saúde Mental', RU: 'Ресурсы психического здоровья', YUE: '心理健康資源' }

export default function HotlinePage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const mhItems: typeof MH_ITEMS['EN'] = (MH_ITEMS as Record<string, typeof MH_ITEMS['EN']>)[lang] ?? MH_ITEMS['EN']

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
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#206777', fontVariationSettings: "'FILL' 1" as string }}>call</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800 }}>{tr(HOTLINE.title, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28 }}>{tr(HOTLINE.subtitle, lang)}</p>

      {CARDS.map(item => (
        <section key={item.number} style={{ marginBottom: 24 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '20px', border: '1px solid rgba(226,190,186,0.2)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{item.icon}</span>
              </div>
              <div>
                <p className="font-headline" style={{ fontSize: 22, fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.number}</p>
                <p style={{ fontSize: 12, color: '#5a413d', marginTop: 2 }}>{tl(item.title, lang)}</p>
              </div>
              <span className="font-label" style={{ marginLeft: 'auto', fontSize: 10, background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: 999, fontWeight: 700 }}>{tr(COMMON.free, lang)}</span>
            </div>
            <p style={{ fontSize: 13, color: '#1e1b1c', lineHeight: 1.65, marginBottom: 14 }}>{tl(item.desc, lang)}</p>
            {[
              { icon: 'schedule', label: tr(COMMON.hours, lang), value: tl(item.availability, lang) },
              { icon: 'person', label: tr(COMMON.for, lang), value: tl(item.who, lang) },
              { icon: 'translate', label: tr(COMMON.languages, lang), value: tl(item.langs, lang) },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 15, color: item.color, flexShrink: 0, marginTop: 1 }}>{row.icon}</span>
                <div>
                  <span className="font-label" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#78716c', display: 'block', marginBottom: 1 }}>{row.label}</span>
                  <span style={{ fontSize: 13, color: '#5a413d' }}>{row.value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Mental Health */}
      <section style={{ marginBottom: 24 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#1e1b1c' }}>{tl(H_MH, lang)}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mhItems.map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#374151', flexShrink: 0, marginTop: 2, fontVariationSettings: "'FILL' 1" as string }}>psychology</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 5 }}>
                  <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c' }}>{item.label}</p>
                  <span style={{ fontSize: 10, background: item.badgeColor, color: '#fff', padding: '2px 7px', borderRadius: 999, fontWeight: 700 }}>{item.badge}</span>
                </div>
                <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#faf2f2', borderRadius: 14, padding: '16px 18px', border: '1px solid rgba(226,190,186,0.2)' }}>
        <h2 className="font-headline" style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#1e1b1c' }}>{tr(HOTLINE.otherNums, lang)}</h2>
        {OTHER.map((item, i, arr) => (
          <div key={item.name} style={{ marginBottom: i < arr.length - 1 ? 10 : 0 }}>
            <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c', marginBottom: 2 }}>{item.name}</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#206777', marginBottom: 1 }}>{item.number}</p>
            <p style={{ fontSize: 12, color: '#5a413d' }}>{tl(item.note, lang)}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
