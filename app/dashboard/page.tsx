'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useLang } from './lang-context'
import { tr, HOME, RESIDENCY, COMMON } from './translations'

const POPULAR_TAGS: Record<string, string>[] = [
  { EN: 'Fever',          JP: '発熱',    ZH: '发烧',  'ZH-T': '發燒', KO: '발열',   ES: 'Fiebre',            FR: 'Fièvre',             IT: 'Febbre',             TL: 'Lagnat',          ID: 'Demam',           DE: 'Fieber',             PT: 'Febre',            RU: 'Температура',    YUE: '發燒' },
  { EN: 'Abdominal Pain', JP: '腹痛',    ZH: '腹痛',  'ZH-T': '腹痛', KO: '복통',   ES: 'Dolor Abdominal',   FR: 'Douleur Abdominale', IT: 'Dolore Addominale',  TL: 'Sakit sa Tiyan', ID: 'Sakit Perut',     DE: 'Bauchschmerzen',     PT: 'Dor Abdominal',    RU: 'Боль в животе',  YUE: '肚痛' },
  { EN: 'Emergency',      JP: '緊急',    ZH: '紧急',  'ZH-T': '緊急', KO: '응급',   ES: 'Emergencia',        FR: 'Urgence',            IT: 'Emergenza',          TL: 'Emergency',       ID: 'Darurat',         DE: 'Notfall',            PT: 'Emergência',       RU: 'Срочно',         YUE: '急症' },
  { EN: 'Pediatrics',     JP: '小児科',  ZH: '儿科',  'ZH-T': '兒科', KO: '소아과', ES: 'Pediatría',         FR: 'Pédiatrie',          IT: 'Pediatria',          TL: 'Pediatrics',      ID: 'Pediatri',        DE: 'Pädiatrie',          PT: 'Pediatria',        RU: 'Педиатрия',      YUE: '兒科' },
  { EN: 'Pharmacy',       JP: '薬局',    ZH: '药局',  'ZH-T': '藥局', KO: '약국',   ES: 'Farmacia',          FR: 'Pharmacie',          IT: 'Farmacia',           TL: 'Parmasya',        ID: 'Apotek',          DE: 'Apotheke',           PT: 'Farmácia',         RU: 'Аптека',         YUE: '藥房' },
  { EN: 'Insurance Card', JP: '保険証',  ZH: '保险证','ZH-T': '保險證',KO: '보험증', ES: 'Tarjeta de Seguro', FR: "Carte d'Assurance",  IT: 'Tessera Sanitaria',  TL: 'Insurance Card',  ID: 'Kartu Asuransi',  DE: 'Versicherungskarte', PT: 'Cartão de Seguro', RU: 'Страховой полис',YUE: '健保卡' },
]

const ACT_NOW = [
  { icon: 'bedtime',    accent: false, iconColor: '#b22620', arrow: true,  badge: false, href: '/dashboard/night-care', titleKey: 'actTitle0', descKey: 'actDesc0' },
  { icon: 'ambulance',  accent: true,  iconColor: '#fff',    arrow: false, badge: true,  href: '/dashboard/ambulance',  titleKey: 'actTitle1', descKey: 'actDesc1' },
  { icon: 'call',       accent: false, iconColor: '#206777', arrow: false, badge: false, href: '/dashboard/hotline',    titleKey: 'actTitle2', descKey: 'actDesc2' },
  { icon: 'fact_check', accent: false, iconColor: '#7a5700', arrow: false, badge: false, href: '/dashboard/checklist',  titleKey: 'actTitle3', descKey: 'actDesc3' },
]

const ACT_T: Record<string, Record<string, string>> = {
  actTitle0: { EN: 'Night/Holiday Care',    JP: '夜間・休日診療',    ZH: '夜间/节假日就医',  'ZH-T': '夜間/假日就醫',  KO: '야간/휴일 진료',    ES: 'Atención Nocturna', FR: 'Soins Nocturnes',        IT: 'Cure Notturne',            TL: 'Gabi/Holiday na Pag-aalaga', ID: 'Perawatan Malam/Libur',  DE: 'Nachtversorgung',   PT: 'Atendimento Noturno', RU: 'Ночная помощь',     YUE: '夜間／假日就診' },
  actDesc0:  { EN: 'Guide to after-hours clinics', JP: '時間外クリニックのガイド', ZH: '非工作时间诊所指南', 'ZH-T': '非工作時間診所指南', KO: '시간 외 클리닉 안내', ES: 'Guía de clínicas', FR: 'Guide cliniques hors heures', IT: 'Guida cliniche fuori orario', TL: 'Gabay sa mga klinika', ID: 'Panduan klinik luar jam', DE: 'Leitfaden Notfallkliniken', PT: 'Guia de clínicas', RU: 'Руководство по клиникам', YUE: '放工後同假日嘅診所指南' },
  actTitle1: { EN: 'Ambulance Criteria',    JP: '救急車の基準',       ZH: '救护车标准',       'ZH-T': '救護車標準',     KO: '구급차 기준',        ES: 'Criterios Ambulancia', FR: 'Critères Ambulance', IT: 'Criteri Ambulanza',        TL: 'Pamantayan ng Ambulansya',   ID: 'Kriteria Ambulans',      DE: 'Rettungswagen',     PT: 'Critérios Ambulância', RU: 'Критерии скорой',   YUE: '救護車召喚標準' },
  actDesc1:  { EN: 'When to call an ambulance', JP: '救急車を呼ぶタイミング', ZH: '何时叫救护车', 'ZH-T': '何時叫救護車', KO: '구급차 부르는 시기', ES: 'Cuándo llamar ambulancia', FR: 'Quand appeler ambulance', IT: 'Quando chiamare ambulanza', TL: 'Kailan tumawag ng ambulansya', ID: 'Kapan memanggil ambulans', DE: 'Wann Krankenwagen', PT: 'Quando chamar ambulância', RU: 'Когда вызывать скорую', YUE: '幾時先需要叫白車' },
  actTitle2: { EN: '#7119 / #8000',         JP: '#7119 / #8000',     ZH: '#7119 / #8000',    'ZH-T': '#7119 / #8000',  KO: '#7119 / #8000',      ES: '#7119 / #8000',   FR: '#7119 / #8000',          IT: '#7119 / #8000',            TL: '#7119 / #8000',              ID: '#7119 / #8000',          DE: '#7119 / #8000',     PT: '#7119 / #8000',       RU: '#7119 / #8000',     YUE: '#7119 / #8000' },
  actDesc2:  { EN: 'Emergency & Pediatric Advice', JP: '救急・小児科電話相談', ZH: '急救及儿科咨询', 'ZH-T': '急救及兒科諮詢', KO: '응급 및 소아과 상담', ES: 'Consultas de emergencia', FR: 'Conseils urgence/pédiatrie', IT: 'Pronto Soccorso e Pediatria', TL: 'Emergency at Pediatric na Payo', ID: 'Saran Darurat & Anak', DE: 'Notfall & Pädiatrie', PT: 'Consultas emergência', RU: 'Скорая и педиатрия', YUE: '急症同兒科電話諮詢' },
  actTitle3: { EN: 'Preparation Checklist', JP: '準備チェックリスト', ZH: '准备清单',         'ZH-T': '準備清單',        KO: '준비 체크리스트',    ES: 'Lista de Preparación', FR: 'Liste de Préparation',   IT: 'Lista di Controllo',       TL: 'Checklist ng Paghahanda',    ID: 'Daftar Persiapan',       DE: 'Checkliste',        PT: 'Lista de Preparação', RU: 'Контрольный список',YUE: '求診前準備清單' },
  actDesc3:  { EN: 'Items to bring for your visit', JP: '受診時に持参するもの', ZH: '就诊时应携带的物品', 'ZH-T': '就診時應攜帶的物品', KO: '방문 시 가져갈 것들', ES: 'Qué llevar a tu visita', FR: 'Éléments à apporter', IT: 'Cosa portare alla visita', TL: 'Mga dalahin sa pagbisita', ID: 'Barang yang dibawa', DE: 'Mitzubringende Sachen', PT: 'O que levar', RU: 'Что взять с собой', YUE: '睇醫生要帶啲咩' },
}

const ARTICLE_SLUGS = ['surprises', 'wait-times', 'late-night-medicine', 'culture', 'hospitalization']
const ARTICLE_TITLES: Record<string, Record<string, string>> = {
  surprises:            { EN: 'Surprises in Japanese Hospitals',   JP: '日本の病院で驚くこと',   ZH: '在日本医院的意外发现',  'ZH-T': '在日本醫院的意外發現', KO: '일본 병원에서 놀라운 점',  ES: 'Sorpresas en Hospitales',         FR: 'Surprises dans les Hôpitaux',    IT: 'Sorprese negli Ospedali',       TL: 'Mga Sorpresa sa mga Ospital', ID: 'Kejutan di Rumah Sakit Jepang', DE: 'Überraschungen',           PT: 'Surpresas nos Hospitais',   RU: 'Сюрпризы в больницах',   YUE: '喺日本醫院嘅驚奇位' },
  'wait-times':         { EN: 'Why wait times are long',           JP: '待ち時間が長い理由',     ZH: '为什么等待时间很长',    'ZH-T': '為什麼等待時間很長',   KO: '대기 시간이 긴 이유',      ES: 'Por qué los tiempos son largos',  FR: 'Pourquoi les temps sont longs',  IT: 'Perché i tempi sono lunghi',    TL: 'Bakit matagal ang paghihintay', ID: 'Mengapa waktu tunggu lama', DE: 'Warum Wartezeiten lang',   PT: 'Por que esperas são longas',RU: 'Почему долго ждать',     YUE: '點解等候時間咁長' },
  'late-night-medicine':{ EN: 'Getting medicine at late night',    JP: '夜間に薬を入手する方法', ZH: '深夜获取药品的方法',    'ZH-T': '深夜獲取藥品的方法',   KO: '늦은 밤 약 구하는 방법',   ES: 'Conseguir medicamentos de noche', FR: 'Médicaments la nuit',            IT: 'Ottenere medicine di notte',    TL: 'Pagkuha ng gamot sa gabi',      ID: 'Mendapatkan obat di malam', DE: 'Medikamente nachts',       PT: 'Remédios à noite',          RU: 'Лекарства ночью',        YUE: '深夜點樣攞藥' },
  'culture':            { EN: 'Medical Culture in Japan',          JP: '日本の医療文化の違い',   ZH: '日本的医疗文化差异',    'ZH-T': '日本的醫療文化差異',   KO: '일본 의료 문화의 차이',    ES: 'Cultura Médica en Japón',         FR: 'Culture Médicale au Japon',      IT: 'Cultura Medica in Giappone',    TL: 'Kulturang Medikal sa Hapon',    ID: 'Budaya Medis di Jepang',    DE: 'Medizinische Kultur',      PT: 'Cultura Médica no Japão',   RU: 'Медицинская культура',   YUE: '日本嘅醫療文化' },
  'hospitalization':    { EN: 'If You Are Hospitalized in Japan',  JP: '日本で入院したら',       ZH: '在日本住院须知',        'ZH-T': '在日本住院須知',       KO: '일본에서 입원한다면',      ES: 'Si Eres Hospitalizado',           FR: 'Si Vous Êtes Hospitalisé',       IT: 'Se Sei Ricoverato',             TL: 'Kung Ikaw ay Maospital',        ID: 'Jika Anda Dirawat',         DE: 'Wenn Sie hospitalisiert',  PT: 'Se Você For Hospitalizado', RU: 'Если вас госпитализировали',YUE: '喺日本住院要知啲咩' },
}

const SYSTEM_T: Record<string, Record<string, string>> = {
  s0t: { EN: 'Where to visit first?',               JP: 'まずどこへ行くべき？',           ZH: '首先去哪里？',        'ZH-T': '首先去哪裡？',      KO: '먼저 어디로?',       ES: '¿Dónde ir primero?',    FR: 'Où aller en premier?',    IT: 'Dove andare prima?',    TL: 'Saan pumunta muna?',    ID: 'Ke mana pergi pertama?', DE: 'Wohin zuerst?',      PT: 'Onde ir primeiro?',    RU: 'Куда идти сначала?',      YUE: '第一次應該去邊度？' },
  s0d: { EN: 'Understanding the "Kakaritsuke-i" (Primary Care Doctor) system and how to choose your first clinic.', JP: '「かかりつけ医」制度の理解と、最初のクリニックの選び方。', ZH: '了解"家庭医生"制度及如何选择第一家诊所。', 'ZH-T': '了解「家庭醫生」制度及如何選擇第一家診所。', KO: '"단골의사" 제도 이해와 첫 클리닉 선택법.', ES: 'El sistema del médico de cabecera.', FR: 'Le système de médecin traitant.', IT: 'Il sistema del medico di famiglia.', TL: 'Ang sistemang "Kakaritsuke-i" at kung paano pumili ng klinika.', ID: 'Memahami sistem "Kakaritsuke-i" dan cara memilih klinik pertama.', DE: 'Das Hausarzt-System.', PT: 'O sistema de médico de família.', RU: 'Система семейного врача.', YUE: '認識「Kakaritsuke-i（家庭醫生）」制度，同點樣揀第一間診所。' },
  s1t: { EN: 'Referrals & Large Hospitals',          JP: '紹介状と大病院',                 ZH: '转诊与大型医院',      'ZH-T': '轉診與大型醫院',    KO: '의뢰서와 대형병원',  ES: 'Derivaciones y Hospitales', FR: 'Références et Hôpitaux', IT: 'Referenze e Grandi Ospedali', TL: 'Mga Referral at Malalaking Ospital', ID: 'Rujukan & Rumah Sakit Besar', DE: 'Überweisungen', PT: 'Encaminhamentos', RU: 'Направления и больницы', YUE: '轉介信同大型醫院' },
  s1d: { EN: 'What happens without a referral? Learning the referral system.', JP: '紹介状なしだとどうなる？紹介制度を理解しましょう。', ZH: '没有转诊单会怎样？', 'ZH-T': '沒有轉診單會怎樣？了解轉診制度。', KO: '의뢰서 없으면 어떻게?', ES: '¿Qué pasa sin derivación?', FR: 'Sans référence?', IT: 'Cosa succede senza una referenza?', TL: 'Ano ang mangyayari nang walang referral?', ID: 'Apa yang terjadi tanpa rujukan?', DE: 'Ohne Überweisung?', PT: 'Sem encaminhamento?', RU: 'Без направления?', YUE: '冇轉介信會點？認識轉介制度。' },
  s2t: { EN: 'Prescription Rules',                   JP: '処方箋のルール',                 ZH: '处方规则',            'ZH-T': '處方規則',          KO: '처방전 규칙',         ES: 'Reglas de Prescripción', FR: "Règles d'Ordonnance", IT: 'Regole sulle Ricette', TL: 'Mga Patakaran sa Reseta', ID: 'Aturan Resep', DE: 'Rezeptregeln', PT: 'Regras de Prescrição', RU: 'Правила рецепта', YUE: '處方藥規則' },
  s2d: { EN: 'Expiration dates and receiving medicine at external pharmacies.', JP: '有効期限と院外薬局での薬の受け取り方。', ZH: '有效期和在外部药房取药。', 'ZH-T': '有效期和在外部藥局取藥。', KO: '유효기간과 외부 약국 이용법.', ES: 'Fechas de vencimiento y farmacias.', FR: "Dates d'expiration et pharmacies.", IT: 'Date di scadenza e farmacie esterne.', TL: 'Mga petsa ng pagbabago at mga panlabas na parmasya.', ID: 'Tanggal kedaluwarsa dan apotek eksternal.', DE: 'Verfallsdaten und Apotheken.', PT: 'Datas de validade e farmácias.', RU: 'Сроки и внешние аптеки.', YUE: '處方有效期同院外藥房取藥。' },
  s3t: { EN: 'Insurance & Fees',                     JP: '保険と費用',                     ZH: '保险与费用',          'ZH-T': '保險與費用',        KO: '보험과 비용',         ES: 'Seguro y Costos',   FR: 'Assurance et Frais', IT: 'Assicurazione e Costi', TL: 'Insurance at Bayad', ID: 'Asuransi & Biaya', DE: 'Versicherung & Kosten', PT: 'Seguro e Custos', RU: 'Страховка и расходы', YUE: '保險同費用' },
  s3d: { EN: 'The 30% co-payment system and high-cost medical expense benefits.', JP: '3割負担の仕組みと高額療養費制度について。', ZH: '30%自付比例和高额医疗费补贴。', 'ZH-T': '30%自付比例和高額醫療費補貼。', KO: '30% 본인부담 제도와 고액의료비 혜택.', ES: 'El sistema de copago del 30%.', FR: 'Le système de ticket modérateur 30%.', IT: 'Il sistema del ticket del 30%.', TL: 'Ang 30% na sistema ng co-payment.', ID: 'Sistem pembayaran bersama 30%.', DE: 'Das 30%-Selbstbehalt-System.', PT: 'O sistema de 30% de copagamento.', RU: 'Система 30% доплаты.', YUE: '自付3成同高額醫療費制度。' },
}

const TOOLS_T: Record<string, Record<string, string>> = {
  heading:   { EN: 'Practical Tools',         JP: '便利ツール',          ZH: '实用工具',        'ZH-T': '實用工具',        KO: '유용한 도구',         ES: 'Herramientas',           FR: 'Outils Pratiques',         IT: 'Strumenti Pratici',    TL: 'Mga Kasangkapan', ID: 'Alat Praktis',    DE: 'Praktische Tools',  PT: 'Ferramentas',            RU: 'Инструменты',            YUE: '實用工具' },
  flowT:     { EN: 'Visit Flow Guide',         JP: '受診の流れガイド',    ZH: '就医流程指南',    'ZH-T': '就醫流程指南',    KO: '진료 흐름 안내',      ES: 'Guía de Visita',         FR: 'Guide de visite',          IT: 'Guida alla visita',    TL: 'Gabay sa Pagbisita', ID: 'Panduan Kunjungan', DE: 'Besuchsablauf',     PT: 'Guia de Visita',         RU: 'Гид по визиту',          YUE: '求診流程圖' },
  flowD:     { EN: 'Step-by-step flowchart for emergencies and routine visits', JP: '緊急・非緊急のステップをフローチャートで確認', ZH: '紧急和非紧急情况的就医步骤', 'ZH-T': '緊急和非緊急情況的就醫步驟', KO: '응급 및 비응급 상황별 단계별 안내', ES: 'Diagrama para emergencias y visitas', FR: 'Organigramme pour urgences et visites', IT: 'Diagramma per emergenze e visite', TL: 'Hakbang para sa mga emerhensiya', ID: 'Diagram alir untuk kedaruratan', DE: 'Ablauf für Notfälle und Besuche', PT: 'Fluxograma para emergências', RU: 'Схема для экстренных визитов', YUE: '急症同一般求診嘅逐步流程' },
  phrasesT:  { EN: 'Medical Japanese Phrases', JP: '医療日本語フレーズ集', ZH: '医疗日语短语集',  'ZH-T': '醫療日語短語集',  KO: '의료 일본어 표현집',  ES: 'Frases Médicas en Japonés', FR: 'Phrases Médicales Japonaises', IT: 'Frasi Mediche Giapponesi', TL: 'Medikal na Parirala sa Hapon', ID: 'Frasa Medis Jepang', DE: 'Medizinische Japanisch-Phrasen', PT: 'Frases Médicas em Japonês', RU: 'Медицинские фразы на японском', YUE: '醫療日語常用句' },
  phrasesD:  { EN: 'Key phrases for reception, symptoms, appointments, and pharmacy', JP: '受付・症状説明・予約に使える日本語フレーズ', ZH: '挂号、描述症状、预约时的实用日语', 'ZH-T': '掛號、描述症狀、預約時的實用日語', KO: '접수, 증상 설명, 예약에 쓸 수 있는 일본어 표현', ES: 'Frases clave para recepción y farmacia', FR: 'Phrases clés pour réception et pharmacie', IT: 'Frasi chiave per reception e farmacia', TL: 'Mga pangunahing parirala para sa resepsyon', ID: 'Frasa kunci untuk resepsi dan apotek', DE: 'Schlüsselphrasen für Rezeption und Apotheke', PT: 'Frases-chave para recepção e farmácia', RU: 'Ключевые фразы для приёмной и аптеки', YUE: '掛號、症狀、預約、藥房嘅關鍵句' },
}

const SUPPORT_T: Record<string, Record<string, string>> = {
  title: { EN: 'English & Multilingual Support', JP: '英語・多言語サポート', ZH: '英语及多语言支持', 'ZH-T': '英語及多語言支援', KO: '영어 및 다국어 지원', ES: 'Apoyo en Inglés y Multilingüe', FR: 'Soutien Multilingue', IT: 'Supporto Multilingue', TL: 'Suporta sa Ingles at Multilingwal', ID: 'Dukungan Bahasa Inggris & Multibahasa', DE: 'Englischer & mehrsprachiger Support', PT: 'Suporte em Inglês e Multilíngue', RU: 'Поддержка на английском', YUE: '英語／多語言支援' },
  desc:  { EN: 'Free phone lines, interpreters, and apps for getting medical help in English', JP: '英語対応医師・無料通訳電話・多言語ウェブサービスへのアクセスガイド', ZH: '寻找英语医生、免费口译电话和多语言网络服务', 'ZH-T': '尋找英語醫生、免費口譯電話和多語言網絡服務', KO: '영어 의사, 무료 통역 전화, 다국어 웹 서비스 안내', ES: 'Líneas telefónicas gratuitas, intérpretes y aplicaciones', FR: 'Lignes téléphoniques gratuites, interprètes et applications', IT: 'Linee telefoniche gratuite, interpreti e applicazioni', TL: 'Mga libreng linya ng telepono, tagasalin, at apps', ID: 'Jalur telepon gratis, juru bahasa, dan aplikasi', DE: 'Kostenlose Leitungen, Dolmetscher und Apps', PT: 'Linhas gratuitas, intérpretes e aplicativos', RU: 'Бесплатные линии, переводчики и приложения', YUE: '免費電話、傳譯員同APP，幫你用英文睇醫生' },
}

const APPS_T: Record<string, Record<string, string>> = {
  title: { EN: 'Recommended Apps', JP: 'おすすめアプリ', ZH: '推荐应用', 'ZH-T': '推薦應用', KO: '추천 앱', ES: 'Apps recomendadas', FR: 'Applications recommandées', IT: 'App consigliate', TL: 'Mga inirerekomendang Apps', ID: 'Aplikasi yang direkomendasikan', DE: 'Empfohlene Apps', PT: 'Apps recomendados', RU: 'Рекомендуемые приложения', YUE: '推薦APP' },
  desc:  { EN: 'Symptom checkers, medical translation, disaster alerts, and medication records — all free.', JP: '症状チェック・医療翻訳・防災アラート・お薬手帳など、日本の医療で役立つ無料アプリ一覧。', ZH: '症状检查、医疗翻译、防灾警报、用药记录等实用免费应用。', 'ZH-T': '症狀檢查、醫療翻譯、防災警報、用藥紀錄等實用免費應用。', KO: '증상 확인, 의료 번역, 재난 경보, 약 복용 기록 등 유용한 무료 앱 목록.', ES: 'Comprobadores de síntomas, traducción médica, alertas de desastres — todos gratuitos.', FR: 'Vérificateurs de symptômes, traduction médicale, alertes catastrophes — tout gratuit.', IT: 'Verificatori di sintomi, traduzione medica, allerte catastrofi — tutti gratuiti.', TL: 'Mga tagasuri ng sintomas, medikal na pagsasalin — lahat libre.', ID: 'Pemeriksaan gejala, terjemahan medis, peringatan bencana — semua gratis.', DE: 'Symptomprüfer, medizinische Übersetzung, Katastrophenwarnungen — alle kostenlos.', PT: 'Verificadores de sintomas, tradução médica, alertas de desastres — todos gratuitos.', RU: 'Проверка симптомов, медицинский перевод, предупреждения о бедствиях — всё бесплатно.', YUE: '症狀檢查、醫療翻譯、災害警報、用藥紀錄，全部免費。' },
}

const DISASTER_T = {
  title: { EN: 'Disaster Preparedness', JP: '災害時の備え', ZH: '灾害应急准备', 'ZH-T': '災害應急準備', KO: '재난 대비', ES: 'Preparación para Desastres', FR: 'Préparation aux Catastrophes', IT: 'Preparazione ai Disastri', TL: 'Paghahanda sa Sakuna', ID: 'Kesiapsiagaan Bencana', DE: 'Katastrophenschutz', PT: 'Preparação para Desastres', RU: 'Готовность к бедствиям', YUE: '災害應對準備' },
  desc:  { EN: 'Japan has earthquakes, typhoons, and tsunamis. Know where to evacuate, how to receive alerts, and free multilingual resources available 24/7.', JP: '日本では地震・台風・津波が発生します。避難場所の確認、アラートの受信方法、24時間使える無料多言語サービスを活用しましょう。', ZH: '日本有地震、台风和海啸。了解疏散地点、接收警报的方法，以及全天候免费多语言资源。', 'ZH-T': '日本有地震、颱風和海嘯。了解疏散地點、接收警報的方法，以及全天候免費多語言資源。', KO: '일본에는 지진, 태풍, 쓰나미가 있습니다. 대피 장소, 경보 수신 방법, 24시간 무료 다국어 서비스를 확인하세요.', ES: 'Japón tiene terremotos, tifones y tsunamis. Sepa dónde evacuar, cómo recibir alertas y acceder a recursos gratuitos multilingües.', FR: 'Le Japon est sujet aux séismes, typhons et tsunamis. Sachez où évacuer et comment recevoir les alertes.', IT: 'Il Giappone ha terremoti, tifoni e tsunami. Sappi dove evacuare e come ricevere avvisi con risorse gratuite multilingue.', TL: 'Ang Japan ay may mga lindol, bagyo, at tsunami. Alamin kung saan mag-evacuate at paano makatanggap ng mga alerto.', ID: 'Jepang mengalami gempa, topan, dan tsunami. Ketahui tempat evakuasi dan cara menerima peringatan dengan sumber daya multibahasa gratis.', DE: 'Japan hat Erdbeben, Taifune und Tsunamis. Wissen Sie, wo Sie evakuieren sollen und wie Sie Warnmeldungen erhalten.', PT: 'O Japão tem terremotos, tufões e tsunamis. Saiba para onde evacuar e como receber alertas com recursos gratuitos e multilíngues.', RU: 'В Японии бывают землетрясения, тайфуны и цунами. Знайте, куда эвакуироваться и как получать предупреждения.', YUE: '日本有地震、颱風同海嘯。要知道去邊避難、點接收警報，仲有24小時免費多語言資訊。' },
  free:  { EN: 'FREE RESOURCES', JP: '無料サービス', ZH: '免费资源', 'ZH-T': '免費資源', KO: '무료 서비스', ES: 'GRATIS', FR: 'GRATUIT', IT: 'GRATIS', TL: 'LIBRE', ID: 'GRATIS', DE: 'KOSTENLOS', PT: 'GRÁTIS', RU: 'БЕСПЛАТНО', YUE: '免費資源' },
  dial:  { EN: 'Disaster Message Dial', JP: '災害用伝言ダイヤル', ZH: '灾害留言电话', 'ZH-T': '災害留言電話', KO: '재난 메시지 다이얼', ES: 'Línea de Mensajes', FR: 'Messagerie Catastrophe', IT: 'Messaggeria Disastri', TL: 'Disaster Dial', ID: 'Dial Bencana', DE: 'Katastrophen-Dial', PT: 'Discagem Desastres', RU: 'Линия бедствий', YUE: '災害留言電話' },
}

const DISCLAIMER: Record<string, string> = {
  EN: '※ The following articles are for general reference only. Details may vary by hospital.',
  JP: '※ 以下の情報は一般的な参考情報です。病院によっても異なります。',
  ZH: '※ 以下信息仅供参考。具体情况因医院而异。',
  'ZH-T': '※ 以下資訊僅供參考。具體情況因醫院而異。',
  KO: '※ 아래 정보는 일반적인 참고용입니다. 병원마다 다를 수 있습니다.',
  ES: '※ La siguiente información es solo de referencia. Puede variar según el hospital.',
  FR: "※ Les informations suivantes sont à titre de référence uniquement. Cela peut varier selon l'hôpital.",
  IT: "※ Le seguenti informazioni sono solo di riferimento. Può variare a seconda dell'ospedale.",
  TL: '※ Ang sumusunod na impormasyon ay para sa pangkalahatang sanggunian lamang. Maaaring mag-iba depende sa ospital.',
  ID: '※ Informasi berikut hanya untuk referensi umum. Dapat bervariasi tergantung rumah sakit.',
  DE: '※ Die folgenden Informationen dienen nur als allgemeine Referenz. Es kann je nach Krankenhaus variieren.',
  PT: '※ As informações a seguir são apenas para referência geral. Pode variar de acordo com o hospital.',
  RU: '※ Следующая информация носит общий справочный характер. Может различаться в зависимости от больницы.',
  YUE: '※ 以下文章只作一般參考，實際情況因醫院而異。',
}

const RESIDENCY_ITEMS: { type: string; icon: string; color: string; bg: string }[] = [
  { type: 'tourist',  icon: 'flight',      color: '#206777', bg: '#f0fafa' },
  { type: 'newcomer', icon: 'card_travel', color: '#7a5700', bg: '#fdf8f0' },
  { type: 'resident', icon: 'home',        color: '#b22620', bg: '#fff5f5' },
]

function tl(map: Record<string, string>, lang: string) {
  return map[lang] ?? map['EN']
}

export default function DashboardHome() {
  const { lang } = useLang()

  useEffect(() => {
    const saved = sessionStorage.getItem('dashboard-scroll')
    if (saved) {
      requestAnimationFrame(() => window.scrollTo(0, parseInt(saved, 10)))
    }
    const onScroll = () => sessionStorage.setItem('dashboard-scroll', String(Math.round(window.scrollY)))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="mj-container" style={{ paddingTop: 36 }}>

      {/* ── HERO ── */}
      <section style={{ marginBottom: 44 }}>
        <p className="font-label" style={{ color: '#b22620', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
          {tr(HOME.tag, lang)}
        </p>
        <h2 className="font-headline" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', fontWeight: 900, color: '#1e1b1c', lineHeight: 1.15, marginBottom: 24 }}>
          {tr(HOME.h1, lang)}<br />{tr(HOME.h2, lang)}
        </h2>

        {/* Residency info — static, all 3 conditions always shown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {RESIDENCY_ITEMS.map(item => (
            <div key={item.type} style={{ background: item.bg, borderRadius: 12, border: `1px solid ${item.color}22`, borderLeft: `3px solid ${item.color}`, padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 20, color: item.color, flexShrink: 0, marginTop: 1, fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
              <div>
                <p className="font-headline" style={{ fontWeight: 700, fontSize: 13, color: item.color, marginBottom: 3 }}>
                  {tr(RESIDENCY[item.type as keyof typeof RESIDENCY], lang)}
                </p>
                <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.55 }}>
                  {tr(RESIDENCY[`${item.type}Desc` as keyof typeof RESIDENCY], lang)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Assessment Hub */}
        <div style={{ background: '#faf2f2', borderRadius: 16, padding: '20px', border: '1px solid rgba(226,190,186,0.25)', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 8, right: 8, opacity: 0.05, pointerEvents: 'none' }}>
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 52, fontVariationSettings: "'FILL' 1" as string }}>help</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 10px', marginBottom: 6 }}>
            <span className="font-headline" style={{ fontWeight: 700, fontSize: 15, color: '#1e1b1c' }}>{tr(HOME.unsure, lang)}</span>
            <span className="font-label" style={{ fontSize: 10, color: '#206777', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{tr(HOME.hub, lang)}</span>
          </div>
          <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 12 }}>{tr(HOME.hubDesc, lang)}</p>
          <div className="symptom-grid" style={{ marginBottom: 12 }}>
            {[
              { icon: 'thermometer',     href: '/dashboard/emergency',  key: 'sym0' },
              { icon: 'personal_injury', href: '/dashboard/emergency',  key: 'sym1' },
              { icon: 'dark_mode',       href: '/dashboard/night-care', key: 'sym2' },
              { icon: 'location_away',   href: '/dashboard/search',     key: 'sym3' },
            ].map(({ icon, href, key }) => (
              <Link key={key} href={href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 8px', background: '#fff', border: '1px solid rgba(226,190,186,0.2)', borderRadius: 10, gap: 4, textDecoration: 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fff5f5')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
              >
                <span className="material-symbols-outlined" aria-hidden="true" style={{ color: '#b22620', fontSize: 22, fontVariationSettings: "'FILL' 0" as string }}>{icon}</span>
                <span className="font-headline" style={{ fontSize: 11, fontWeight: 700, textAlign: 'center', lineHeight: 1.3, color: '#1e1b1c' }}>{tr(HOME[key as keyof typeof HOME], lang)}</span>
              </Link>
            ))}
          </div>
          <Link href="/dashboard/health-check" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 16px', background: '#fff', color: '#206777', border: '1px solid rgba(32,103,119,0.2)', borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: 'none', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f0fdfa')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
          >
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 16 }}>monitor_heart</span>
            {tr(HOME.checkBtn, lang)}
          </Link>
        </div>

        {/* Search */}
        <Link href="/dashboard/search" style={{ display: 'block', textDecoration: 'none' }}>
          <div style={{ position: 'relative' }}>
            <span className="material-symbols-outlined" aria-hidden="true" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(32,103,119,0.4)', fontSize: 20, pointerEvents: 'none' }}>search</span>
            <div style={{ width: '100%', padding: '14px 14px 14px 44px', boxSizing: 'border-box', background: '#faf2f2', borderBottom: '2px solid rgba(226,190,186,0.4)', borderRadius: '10px 10px 0 0', fontSize: 15, color: '#9a9090', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {tr(HOME.search, lang)}
            </div>
          </div>
        </Link>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginTop: 8 }}>
          <span className="font-label" style={{ fontSize: 10, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{tr(HOME.popular, lang)}</span>
          {POPULAR_TAGS.map(tag => {
            const label = tl(tag, lang)
            return (
              <Link key={tag.EN} href={`/dashboard/search?q=${encodeURIComponent(label)}`}
                style={{ padding: '4px 12px', background: '#f4eced', color: '#5a413d', borderRadius: 999, fontSize: 12, textDecoration: 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#ffdad5')}
                onMouseLeave={e => (e.currentTarget.style.background = '#f4eced')}
              >#{label}</Link>
            )
          })}
        </div>
      </section>

      {/* ── ACT NOW ── */}
      <section style={{ marginBottom: 44 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
          <h3 className="font-headline" style={{ fontSize: 18, fontWeight: 700 }}>{tr(HOME.actNow, lang)}</h3>
          <span className="font-label" style={{ fontSize: 10, color: '#206777', textTransform: 'uppercase', letterSpacing: '0.14em' }}>{tr(HOME.actSub, lang)}</span>
        </div>
        <div className="act-grid">
          {ACT_NOW.map(card => (
            <Link key={card.href} href={card.href} className="act-card" style={{ background: card.accent ? '#b22620' : '#fff', border: card.accent ? 'none' : '1px solid rgba(226,190,186,0.2)', borderRadius: 14, padding: '14px 14px 12px', gap: 10, boxShadow: card.accent ? '0 4px 20px rgba(178,38,32,0.2)' : '0 1px 4px rgba(0,0,0,0.04)', minHeight: 130 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 24, color: card.iconColor, fontVariationSettings: "'FILL' 1" as string }}>{card.icon}</span>
                {card.badge && <span className="font-label" style={{ fontSize: 9, background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '2px 6px', borderRadius: 4 }}>{tr(COMMON.urgent, lang)}</span>}
                {card.arrow && <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(178,38,32,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 12, color: '#b22620' }}>arrow_forward</span></div>}
              </div>
              <div>
                <div className="font-headline" style={{ fontWeight: 700, fontSize: 13, color: card.accent ? '#fff' : '#1e1b1c', lineHeight: 1.3, marginBottom: 3 }}>{tl(ACT_T[card.titleKey], lang)}</div>
                <div style={{ fontSize: 11, color: card.accent ? 'rgba(255,255,255,0.75)' : '#5a413d', lineHeight: 1.4 }}>{tl(ACT_T[card.descKey], lang)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── UNDERSTAND THE SYSTEM ── */}
      <section style={{ marginBottom: 44 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
          <h3 className="font-headline" style={{ fontSize: 18, fontWeight: 700 }}>{tr(HOME.system, lang)}</h3>
          <span className="font-label" style={{ fontSize: 10, color: '#206777', textTransform: 'uppercase', letterSpacing: '0.14em' }}>{tr(HOME.systemSub, lang)}</span>
        </div>
        <div className="system-grid">
          <Link href="/dashboard/system/primary-care" className="system-tall" style={{ background: '#faf2f2', borderRadius: 14, padding: '20px', border: '1px solid rgba(178,38,32,0.06)', textDecoration: 'none', display: 'block' }}>
            <h4 className="font-headline" style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#1e1b1c' }}>{tl(SYSTEM_T.s0t, lang)}</h4>
            <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.65 }}>{tl(SYSTEM_T.s0d, lang)}</p>
          </Link>
          <Link href="/dashboard/system/referrals" style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(226,190,186,0.2)', display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
            <div style={{ flex: 1 }}>
              <h4 className="font-headline" style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: '#1e1b1c' }}>{tl(SYSTEM_T.s1t, lang)}</h4>
              <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.6 }}>{tl(SYSTEM_T.s1d, lang)}</p>
            </div>
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 36, color: 'rgba(32,103,119,0.12)' }}>local_hospital</span>
          </Link>
          <Link href="/dashboard/system/prescriptions" style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', border: '1px solid rgba(226,190,186,0.2)', textDecoration: 'none', display: 'block' }}>
            <h4 className="font-headline" style={{ fontSize: 14, fontWeight: 700, marginBottom: 5, color: '#1e1b1c' }}>{tl(SYSTEM_T.s2t, lang)}</h4>
            <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.6 }}>{tl(SYSTEM_T.s2d, lang)}</p>
          </Link>
          <Link href="/dashboard/system/insurance" style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', border: '1px solid rgba(226,190,186,0.2)', textDecoration: 'none', display: 'block' }}>
            <h4 className="font-headline" style={{ fontSize: 14, fontWeight: 700, marginBottom: 5, color: '#1e1b1c' }}>{tl(SYSTEM_T.s3t, lang)}</h4>
            <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.6 }}>{tl(SYSTEM_T.s3d, lang)}</p>
          </Link>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section style={{ marginBottom: 44 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
          <h3 className="font-headline" style={{ fontSize: 18, fontWeight: 700 }}>{tl(TOOLS_T.heading, lang)}</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Link href="/dashboard/visit-flow" style={{ background: '#faf2f2', borderRadius: 14, padding: '18px 16px', border: '1px solid rgba(178,38,32,0.1)', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 26, color: '#b22620', fontVariationSettings: "'FILL' 1" as string }}>account_tree</span>
            <div>
              <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c', marginBottom: 4 }}>{tl(TOOLS_T.flowT, lang)}</p>
              <p style={{ fontSize: 11, color: '#5a413d', lineHeight: 1.5 }}>{tl(TOOLS_T.flowD, lang)}</p>
            </div>
          </Link>
          <Link href="/dashboard/phrases" style={{ background: '#eef7f9', borderRadius: 14, padding: '18px 16px', border: '1px solid rgba(32,103,119,0.1)', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 26, color: '#206777', fontVariationSettings: "'FILL' 1" as string }}>translate</span>
            <div>
              <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c', marginBottom: 4 }}>{tl(TOOLS_T.phrasesT, lang)}</p>
              <p style={{ fontSize: 11, color: '#5a413d', lineHeight: 1.5 }}>{tl(TOOLS_T.phrasesD, lang)}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── ENGLISH / MULTILINGUAL SUPPORT ── */}
      <section style={{ marginBottom: 44 }}>
        <Link href="/dashboard/english-support" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ background: 'linear-gradient(135deg, #eef7f9 0%, #f0fdf4 100%)', borderRadius: 16, padding: '20px', border: '1px solid rgba(32,103,119,0.15)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.07 }}>
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 80, fontVariationSettings: "'FILL' 1" as string }}>record_voice_over</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#206777', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 20, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>record_voice_over</span>
              </div>
              <div>
                <p className="font-headline" style={{ fontSize: 14, fontWeight: 700, color: '#1e1b1c', marginBottom: 1 }}>{tl(SUPPORT_T.title, lang)}</p>
                <span className="font-label" style={{ fontSize: 9, background: '#206777', color: '#fff', padding: '2px 6px', borderRadius: 999, fontWeight: 700 }}>{tr(COMMON.free, lang)}</span>
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.6, marginBottom: 14, maxWidth: 340 }}>{tl(SUPPORT_T.desc, lang)}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                { num: '03-5285-8088', name: 'AMDA' },
                { num: '050-3816-2787', name: 'JNTO' },
                { num: '03-5774-0992', name: 'TELL' },
              ].map(item => (
                <div key={item.num} style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 12, color: '#206777' }}>call</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#206777' }}>{item.name}</span>
                  <span style={{ fontSize: 10, color: '#5a413d' }}>{item.num}</span>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', right: 16, bottom: 16 }}>
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 18, color: '#206777', opacity: 0.6 }}>chevron_right</span>
            </div>
          </div>
        </Link>
      </section>

      {/* ── DISASTER PREPAREDNESS ── */}
      <section style={{ marginBottom: 44 }}>
        <Link href="/dashboard/disaster" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ background: '#fffbeb', borderRadius: 16, padding: '20px', border: '1px solid rgba(180,83,9,0.15)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.06, pointerEvents: 'none' }}>
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 90, fontVariationSettings: "'FILL' 1" as string }}>emergency_home</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 20, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>emergency_home</span>
              </div>
              <div>
                <p className="font-headline" style={{ fontSize: 14, fontWeight: 700, color: '#1e1b1c', marginBottom: 2 }}>{tl(DISASTER_T.title, lang)}</p>
                <span className="font-label" style={{ fontSize: 9, background: '#b45309', color: '#fff', padding: '2px 6px', borderRadius: 999, fontWeight: 700 }}>{tl(DISASTER_T.free, lang)}</span>
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.6, marginBottom: 14, maxWidth: 340 }}>{tl(DISASTER_T.desc, lang)}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['NHK World', 'JMA', 'Safety Tips', '#171'].map(label => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 8, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 11, color: '#b45309' }}>chevron_right</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#b45309' }}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', right: 16, bottom: 16 }}>
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 18, color: '#b45309', opacity: 0.6 }}>chevron_right</span>
            </div>
          </div>
        </Link>
      </section>

      {/* ── RECOMMENDED APPS ── */}
      <section style={{ marginBottom: 44 }}>
        <Link href="/dashboard/apps" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #ede8ff 100%)', borderRadius: 16, padding: '20px', border: '1px solid rgba(109,40,217,0.12)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.07, pointerEvents: 'none' }}>
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 90, fontVariationSettings: "'FILL' 1" as string }}>apps</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 20, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>apps</span>
              </div>
              <div>
                <p className="font-headline" style={{ fontSize: 14, fontWeight: 700, color: '#1e1b1c', marginBottom: 1 }}>{tl(APPS_T.title, lang)}</p>
                <span className="font-label" style={{ fontSize: 9, background: '#6d28d9', color: '#fff', padding: '2px 6px', borderRadius: 999, fontWeight: 700 }}>
                  {tr(COMMON.free, lang)}
                </span>
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.6, marginBottom: 14, maxWidth: 340 }}>{tl(APPS_T.desc, lang)}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                { icon: 'symptoms',       label: lang === 'JP' ? 'ユビー' : 'Ubie' },
                { icon: 'translate',      label: 'VoiceTra' },
                { icon: 'emergency_home', label: 'Safety Tips' },
                { icon: 'medication',     label: lang === 'JP' ? 'お薬手帳' : lang === 'YUE' ? '用藥手冊' : 'Okusuri Techo' },
                { icon: 'photo_camera',   label: lang === 'JP' ? 'パシャカルテ' : 'Pashakarute' },
              ].map(a => (
                <div key={a.icon} style={{ background: 'rgba(255,255,255,0.75)', borderRadius: 8, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 11, color: '#6d28d9' }}>{a.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#6d28d9' }}>{a.label}</span>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', right: 16, bottom: 16 }}>
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 18, color: '#6d28d9', opacity: 0.6 }}>chevron_right</span>
            </div>
          </div>
        </Link>
      </section>

      {/* ── INSIGHTS ── */}
      <section style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
          <h3 className="font-headline" style={{ fontSize: 18, fontWeight: 700 }}>{tr(HOME.insights, lang)}</h3>
          <span className="font-label" style={{ fontSize: 10, color: '#206777', textTransform: 'uppercase', letterSpacing: '0.14em' }}>{tr(HOME.insSub, lang)}</span>
        </div>
        <p style={{ fontSize: 11, color: '#9a9090', lineHeight: 1.5, marginBottom: 14 }}>
          {DISCLAIMER[lang] ?? DISCLAIMER.EN}
        </p>
        <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(226,190,186,0.2)' }}>
          {ARTICLE_SLUGS.map((slug, i) => (
            <Link key={slug} href={`/dashboard/articles/${slug}`} className="insight-row"
              style={{ borderBottom: i < ARTICLE_SLUGS.length - 1 ? '1px solid rgba(226,190,186,0.15)' : 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="font-label" style={{ fontSize: 11, fontWeight: 700, color: 'rgba(178,38,32,0.3)', minWidth: 22 }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="font-headline insight-title" style={{ fontSize: 14, color: '#1e1b1c', fontWeight: 500 }}>{tl(ARTICLE_TITLES[slug], lang)}</span>
              </div>
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 17, color: '#78716c', flexShrink: 0 }}>chevron_right</span>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}
