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

function tl(m: Record<string, string>, l: string): string {
  return m[l] ?? m['EN']
}

const ITEM = { href: '/dashboard/health-check', title: 'Check Current Health Status', titleJP: '今の健康状態を確認する', icon: 'monitor_heart', color: '#206777' }

type StepId = 'start' | 'symptom' | 'fever' | 'child' | 'injury' | 'result'
type ResultId = '119' | '7119' | '8000' | 'night-clinic' | 'clinic'

interface Result {
  color: string
  icon: string
  title: Record<string, string>
  desc: Record<string, string>
  number: string | null
  numberLabel?: string
  links: { label: Record<string, string>; href: string }[]
  tip?: Record<string, string>
}

const RESULTS: Record<ResultId, Result> = {
  '119': {
    color: '#b22620',
    icon: 'ambulance',
    title: {
      EN: 'Call 119 Now', JP: '今すぐ119番通報', ZH: '立即拨打119', 'ZH-T': '立即撥打119',
      KO: '지금 119에 전화하세요', ES: 'Llama al 119 ahora', FR: 'Appelez le 119 maintenant',
      IT: 'Chiama il 119 adesso', TL: 'Tumawag sa 119 ngayon', ID: 'Hubungi 119 sekarang',
      DE: 'Jetzt 119 anrufen', PT: 'Ligue para 119 agora', RU: 'Позвоните 119 сейчас', YUE: '即刻撥打119',
    },
    desc: {
      EN: 'This sounds like a life-threatening emergency. Call 119 immediately for an ambulance. Stay on the line and follow the operator\'s instructions.',
      JP: '命に関わる緊急事態の可能性があります。すぐに119番に電話し、救急車を要請してください。電話を切らず、指示に従ってください。',
      ZH: '情况可能危及生命。请立即拨打119叫救护车。保持通话，听从调度员的指示。',
      'ZH-T': '情況可能危及生命。請立即撥打119叫救護車。保持通話，聽從調度員的指示。',
      KO: '생명을 위협하는 응급 상황입니다. 즉시 119에 전화해 구급차를 요청하세요. 전화를 끊지 말고 지시를 따르세요.',
      ES: 'Esto parece una emergencia que amenaza la vida. Llama al 119 de inmediato. No cuelgues y sigue las instrucciones del operador.',
      FR: 'Cela ressemble à une urgence mettant la vie en danger. Appelez le 119 immédiatement. Restez en ligne et suivez les instructions.',
      IT: 'Sembra un\'emergenza che mette a rischio la vita. Chiama il 119 immediatamente. Rimani in linea e segui le istruzioni.',
      TL: 'Mukhang emergency na nagbabanta sa buhay ito. Tumawag sa 119 agad. Huwag ibaba ang telepono at sundin ang mga tagubilin.',
      ID: 'Ini tampak seperti keadaan darurat yang mengancam jiwa. Hubungi 119 segera. Tetap di telepon dan ikuti instruksi operator.',
      DE: 'Das klingt nach einem lebensbedrohlichen Notfall. Rufen Sie sofort 119 an. Bleiben Sie in der Leitung und befolgen Sie die Anweisungen.',
      PT: 'Parece uma emergência com risco de vida. Ligue para 119 imediatamente. Fique na linha e siga as instruções do operador.',
      RU: 'Это похоже на опасную для жизни ситуацию. Немедленно позвоните 119. Оставайтесь на связи и следуйте инструкциям диспетчера.',
      YUE: '你嘅情況可能有生命危險。請即刻撥打119叫救護車 (Ambulance)。唔好收線，跟住接線員嘅指示做。',
    },
    number: '119',
    numberLabel: 'Ambulance & Fire',
    links: [
      {
        label: {
          EN: 'Ambulance Guide', JP: '救急車ガイド', ZH: '救护车指南', 'ZH-T': '救護車指南',
          KO: '구급차 안내', ES: 'Guía de ambulancia', FR: 'Guide ambulance',
          IT: 'Guida all\'ambulanza', TL: 'Gabay sa Ambulansya', ID: 'Panduan Ambulans',
          DE: 'Krankenwagen-Guide', PT: 'Guia de Ambulância', RU: 'Руководство скорой помощи', YUE: '救護車指南',
        },
        href: '/dashboard/ambulance',
      },
      {
        label: {
          EN: 'What to say to 119', JP: '119番でのセリフ', ZH: '打119时说什么', 'ZH-T': '打119時說什麼',
          KO: '119에 할 말', ES: 'Qué decir al llamar al 119', FR: 'Que dire au 119',
          IT: 'Cosa dire al 119', TL: 'Ano ang sasabihin sa 119', ID: 'Apa yang dikatakan ke 119',
          DE: 'Was Sie 119 sagen sollen', PT: 'O que dizer ao 119', RU: 'Что сказать оператору 119', YUE: '打119時講咩說話',
        },
        href: '/dashboard/ambulance',
      },
    ],
    tip: {
      EN: 'Say: "Kyūkyū desu" (救急です) — "It\'s an emergency"',
      JP: '「救急です」と伝え、住所を教えてください。',
      ZH: '说：「救急です（Kyūkyū desu）」——「这是紧急情况」，并告知地址。',
      'ZH-T': '說：「救急です（Kyūkyū desu）」——「這是緊急情況」，並告知地址。',
      KO: '「救急です（큐큐 데스）」— "긴급합니다"라고 말하고 주소를 알려주세요.',
      ES: 'Di: "Kyūkyū desu" (救急です) — "Es una emergencia". Proporciona tu dirección.',
      FR: 'Dites : « Kyūkyū desu » (救急です) — « C\'est une urgence ». Donnez votre adresse.',
      IT: 'Di\': "Kyūkyū desu" (救急です) — "È un\'emergenza". Dai il tuo indirizzo.',
      TL: 'Sabihin: "Kyūkyū desu" (救急です) — "May emergency." Ibigay ang iyong address.',
      ID: 'Katakan: "Kyūkyū desu" (救急です) — "Ini darurat". Berikan alamat Anda.',
      DE: 'Sagen Sie: „Kyūkyū desu" (救急です) – „Es ist ein Notfall". Geben Sie Ihre Adresse an.',
      PT: 'Diga: "Kyūkyū desu" (救急です) — "É uma emergência". Forneça seu endereço.',
      RU: 'Скажите: «Кюкю дэсу» (救急です) — «Это экстренный случай». Назовите адрес.',
      YUE: '可以講：「救急です（Kyūkyū desu）」即係「有緊急情況」，然後告知地址。',
    },
  },
  '7119': {
    color: '#206777',
    icon: 'call',
    title: {
      EN: 'Call #7119', JP: '#7119に電話', ZH: '拨打 #7119', 'ZH-T': '撥打 #7119',
      KO: '#7119에 전화하세요', ES: 'Llama al #7119', FR: 'Appelez le #7119',
      IT: 'Chiama il #7119', TL: 'Tumawag sa #7119', ID: 'Hubungi #7119',
      DE: '#7119 anrufen', PT: 'Ligue para o #7119', RU: 'Позвоните на #7119', YUE: '撥打 #7119',
    },
    desc: {
      EN: 'A nurse or doctor will evaluate your symptoms and tell you whether to go to the ER, visit a night clinic, or wait until morning. Available 24h in most prefectures.',
      JP: '看護師または医師が症状を確認し、救急病院・夜間クリニック・朝まで待機のどれが適切か教えてくれます。多くの都道府県で24時間対応。',
      ZH: '护士或医生将评估您的症状，告知是否需要去急诊室、夜间诊所或等到早上。大多数都道府县提供24小时服务。',
      'ZH-T': '護士或醫生將評估您的症狀，告知是否需要去急診室、夜間診所或等到早上。大多數都道府縣提供24小時服務。',
      KO: '간호사나 의사가 증상을 평가하고 응급실, 야간 클리닉, 아니면 아침까지 기다려도 되는지 알려드립니다. 대부분 도도부현에서 24시간 운영합니다.',
      ES: 'Un enfermero o médico evaluará sus síntomas y le dirá si debe ir a urgencias, a una clínica nocturna o esperar hasta la mañana. Disponible 24h en la mayoría de prefecturas.',
      FR: 'Un infirmier ou médecin évaluera vos symptômes et vous dira s\'il faut aller aux urgences, à une clinique de nuit ou attendre le matin. Disponible 24h dans la plupart des préfectures.',
      IT: 'Un infermiere o medico valuterà i tuoi sintomi e ti dirà se andare al pronto soccorso, in una clinica notturna o aspettare la mattina. Disponibile 24h nella maggior parte delle prefetture.',
      TL: 'Mag-aassess ng nars o doktor ng iyong mga sintomas at sasabihin kung dapat kang pumunta sa ER, sa night clinic, o maghintay hanggang umaga. Available 24h sa karamihang prefectures.',
      ID: 'Seorang perawat atau dokter akan mengevaluasi gejala Anda dan memberitahu apakah perlu ke UGD, klinik malam, atau tunggu pagi. Tersedia 24 jam di sebagian besar prefektur.',
      DE: 'Eine Krankenschwester oder ein Arzt bewertet Ihre Symptome und sagt Ihnen, ob Sie in die Notaufnahme, eine Nachtklinik oder bis morgen früh warten sollen. In den meisten Präfekturen 24h verfügbar.',
      PT: 'Um enfermeiro ou médico avaliará seus sintomas e dirá se deve ir ao pronto-socorro, a uma clínica noturna ou esperar até de manhã. Disponível 24h na maioria das prefeituras.',
      RU: 'Медсестра или врач оценят ваши симптомы и скажут, нужно ли ехать в скорую, ночную клинику или подождать до утра. Работает круглосуточно в большинстве префектур.',
      YUE: '護士或醫生會評估你嘅症狀，同你講係要去急症室 (Emergency Room)、去夜間診所，定係等到朝早。大部分都道府縣24小時都有服務。',
    },
    number: '#7119',
    numberLabel: 'Medical Consultation Hotline',
    links: [
      {
        label: {
          EN: '#7119 & #8000 Guide', JP: '#7119・#8000ガイド', ZH: '#7119 & #8000 指南', 'ZH-T': '#7119 & #8000 指南',
          KO: '#7119 & #8000 안내', ES: 'Guía #7119 y #8000', FR: 'Guide #7119 & #8000',
          IT: 'Guida #7119 & #8000', TL: 'Gabay sa #7119 at #8000', ID: 'Panduan #7119 & #8000',
          DE: '#7119 & #8000 Guide', PT: 'Guia #7119 e #8000', RU: 'Руководство #7119 и #8000', YUE: '#7119 & #8000 指南',
        },
        href: '/dashboard/hotline',
      },
      {
        label: {
          EN: 'Night & Holiday Care', JP: '夜間・休日診療', ZH: '夜间及节假日医疗', 'ZH-T': '夜間及假日醫療',
          KO: '야간·공휴일 진료', ES: 'Atención nocturna y festiva', FR: 'Soins de nuit et jours fériés',
          IT: 'Cure notturne e festive', TL: 'Gabi at Holiday na Pag-aalaga', ID: 'Perawatan Malam dan Hari Libur',
          DE: 'Nacht- und Feiertagsversorgung', PT: 'Cuidados noturnos e feriados', RU: 'Ночная и праздничная помощь', YUE: '夜間及假日醫療',
        },
        href: '/dashboard/night-care',
      },
    ],
    tip: {
      EN: 'English available in Tokyo, Osaka, and major cities.',
      JP: '東京・大阪などの主要都市では英語対応あり。',
      ZH: '东京、大阪等主要城市提供英语服务。',
      'ZH-T': '東京、大阪等主要城市提供英語服務。',
      KO: '도쿄, 오사카 등 주요 도시에서 영어 대응 가능.',
      ES: 'Inglés disponible en Tokio, Osaka y ciudades principales.',
      FR: 'Anglais disponible à Tokyo, Osaka et dans les grandes villes.',
      IT: 'Inglese disponibile a Tokyo, Osaka e nelle principali città.',
      TL: 'May serbisyong Ingles sa Tokyo, Osaka, at mga pangunahing lungsod.',
      ID: 'Bahasa Inggris tersedia di Tokyo, Osaka, dan kota-kota besar.',
      DE: 'Englisch in Tokio, Osaka und Großstädten verfügbar.',
      PT: 'Inglês disponível em Tóquio, Osaka e cidades principais.',
      RU: 'Английский доступен в Токио, Осаке и крупных городах.',
      YUE: '東京、大阪等主要城市提供英語服務。',
    },
  },
  '8000': {
    color: '#7a5700',
    icon: 'child_care',
    title: {
      EN: 'Call #8000', JP: '#8000に電話', ZH: '拨打 #8000', 'ZH-T': '撥打 #8000',
      KO: '#8000에 전화하세요', ES: 'Llama al #8000', FR: 'Appelez le #8000',
      IT: 'Chiama il #8000', TL: 'Tumawag sa #8000', ID: 'Hubungi #8000',
      DE: '#8000 anrufen', PT: 'Ligue para o #8000', RU: 'Позвоните на #8000', YUE: '撥打 #8000',
    },
    desc: {
      EN: 'A pediatric nurse will assess your child\'s symptoms and tell you how urgent it is. Essential for parents unsure whether a fever or vomiting needs an ER visit.',
      JP: '小児科看護師がお子さんの症状を確認し、緊急度を教えてくれます。子供の発熱や嘔吐でどうすべきかわからない時に最適。',
      ZH: '儿科护士将评估您孩子的症状并告知紧急程度。对于不确定孩子发烧或呕吐是否需要急诊的家长非常有用。',
      'ZH-T': '兒科護士將評估您孩子的症狀並告知緊急程度。對於不確定孩子發燒或嘔吐是否需要急診的家長非常有用。',
      KO: '소아과 간호사가 아이의 증상과 긴급도를 알려드립니다. 아이의 발열이나 구토로 응급실이 필요한지 모를 때 필수적입니다.',
      ES: 'Un enfermero pediátrico evaluará los síntomas de su hijo e indicará la urgencia. Esencial para padres que no saben si la fiebre o los vómitos requieren urgencias.',
      FR: 'Un infirmier pédiatrique évaluera les symptômes de votre enfant et vous indiquera l\'urgence. Essentiel si vous ne savez pas si la fièvre ou les vomissements nécessitent les urgences.',
      IT: 'Un infermiere pediatrico valuterà i sintomi del bambino e indicherà l\'urgenza. Essenziale per i genitori incerti se febbre o vomito richiedano il pronto soccorso.',
      TL: 'Mag-aassess ng pediatric nurse ng mga sintomas ng iyong anak at sabihin ang antas ng pangangailangan. Mahalaga para sa mga magulang na hindi sigurado sa lagnat o pagsusuka ng bata.',
      ID: 'Perawat pediatri akan menilai gejala anak Anda dan tingkat urgensinya. Penting bagi orang tua yang tidak yakin apakah demam atau muntah perlu ke UGD.',
      DE: 'Eine Kinderkrankenschwester bewertet die Symptome Ihres Kindes und die Dringlichkeit. Unverzichtbar, wenn Sie unsicher sind, ob Fieber oder Erbrechen einen Notarztbesuch erfordern.',
      PT: 'Uma enfermeira pediátrica avaliará os sintomas do seu filho e a urgência. Essencial para pais incertos se febre ou vômito precisam de atendimento de emergência.',
      RU: 'Детская медсестра оценит симптомы вашего ребёнка и степень срочности. Необходимо, если вы не уверены, требует ли жар или рвота вызова скорой.',
      YUE: '兒科 (Pediatric) 護士會評估你小朋友嘅症狀同緊急程度。如果唔確定小朋友發燒或嘔吐係咪需要去急症室，呢個熱線最啱用。',
    },
    number: '#8000',
    numberLabel: 'Pediatric Advice Hotline',
    links: [
      {
        label: {
          EN: '#7119 & #8000 Guide', JP: '#7119・#8000ガイド', ZH: '#7119 & #8000 指南', 'ZH-T': '#7119 & #8000 指南',
          KO: '#7119 & #8000 안내', ES: 'Guía #7119 y #8000', FR: 'Guide #7119 & #8000',
          IT: 'Guida #7119 & #8000', TL: 'Gabay sa #7119 at #8000', ID: 'Panduan #7119 & #8000',
          DE: '#7119 & #8000 Guide', PT: 'Guia #7119 e #8000', RU: 'Руководство #7119 и #8000', YUE: '#7119 & #8000 指南',
        },
        href: '/dashboard/hotline',
      },
    ],
    tip: {
      EN: 'Available nights & holidays. Hours vary by prefecture.',
      JP: '夜間・休日に対応。都道府県により時間が異なります。',
      ZH: '夜间及节假日可用。各都道府县服务时间不同。',
      'ZH-T': '夜間及節假日可用。各都道府縣服務時間不同。',
      KO: '야간 및 공휴일 운영. 도도부현별 시간 상이.',
      ES: 'Disponible noches y festivos. Horarios varían por prefectura.',
      FR: 'Disponible les nuits et jours fériés. Horaires variables selon la préfecture.',
      IT: 'Disponibile di notte e nei festivi. Gli orari variano per prefettura.',
      TL: 'Available tuwing gabi at holidays. Magkakaiba ang oras sa bawat prefecture.',
      ID: 'Tersedia malam dan hari libur. Jam berbeda per prefektur.',
      DE: 'Nachts und an Feiertagen verfügbar. Zeiten je nach Präfektur unterschiedlich.',
      PT: 'Disponível noites e feriados. Horários variam por prefeitura.',
      RU: 'Работает ночью и в праздники. Часы работы зависят от префектуры.',
      YUE: '夜間及假日都有服務。各都道府縣嘅服務時間有所不同。',
    },
  },
  'night-clinic': {
    color: '#374151',
    icon: 'local_hospital',
    title: {
      EN: 'Find a Night Clinic', JP: '夜間クリニックを探す', ZH: '查找夜间诊所', 'ZH-T': '尋找夜間診所',
      KO: '야간 클리닉 찾기', ES: 'Busca una clínica nocturna', FR: 'Trouver une clinique de nuit',
      IT: 'Trova una clinica notturna', TL: 'Hanapin ang Night Clinic', ID: 'Temukan Klinik Malam',
      DE: 'Nachtklinik finden', PT: 'Encontre uma clínica noturna', RU: 'Найти ночную клинику', YUE: '搵夜間診所',
    },
    desc: {
      EN: 'Your symptoms suggest you should be seen tonight, but it\'s not an emergency requiring an ambulance. Call #7119 first — they\'ll find the nearest open clinic for you.',
      JP: '今夜中に受診することをおすすめしますが、救急車が必要な状態ではありません。まず#7119に電話して、近くの夜間クリニックを紹介してもらいましょう。',
      ZH: '您的症状建议今晚就诊，但不需要救护车。先拨打#7119，他们会为您找到最近的夜间诊所。',
      'ZH-T': '您的症狀建議今晚就診，但不需要救護車。先撥打#7119，他們會為您找到最近的夜間診所。',
      KO: '증상으로 볼 때 오늘 밤 진료가 필요하지만 구급차는 필요 없습니다. 먼저 #7119로 전화해 가까운 야간 클리닉을 찾으세요.',
      ES: 'Sus síntomas sugieren que debe ser atendido esta noche, pero no es urgencia de ambulancia. Llame primero al #7119 — encontrarán la clínica más cercana abierta.',
      FR: 'Vos symptômes suggèrent de consulter ce soir, mais ce n\'est pas une urgence nécessitant une ambulance. Appelez d\'abord le #7119 pour trouver la clinique de nuit la plus proche.',
      IT: 'I tuoi sintomi suggeriscono una visita stasera, ma non è un\'emergenza per l\'ambulanza. Chiama prima il #7119 — troveranno la clinica notturna più vicina.',
      TL: 'Nagmumungkahi ang iyong mga sintomas na dapat kang makita ngayong gabi, pero hindi kailangan ng ambulansya. Tumawag muna sa #7119 — hahanapin nila ang pinakamalapit na bukas na klinika.',
      ID: 'Gejala Anda menyarankan agar diperiksa malam ini, namun tidak butuh ambulans. Hubungi #7119 dulu — mereka akan menemukan klinik terdekat yang buka.',
      DE: 'Ihre Symptome deuten darauf hin, dass Sie heute Nacht einen Arzt aufsuchen sollten, aber kein Krankenwagen nötig ist. Rufen Sie zuerst #7119 an — sie finden die nächste offene Klinik.',
      PT: 'Seus sintomas sugerem que você deve ser atendido hoje à noite, mas não é uma emergência de ambulância. Ligue primeiro para o #7119 — eles encontrarão a clínica aberta mais próxima.',
      RU: 'Симптомы указывают на необходимость посетить врача сегодня ночью, но скорая не нужна. Сначала позвоните на #7119 — они найдут ближайшую открытую клинику.',
      YUE: '你嘅症狀建議今晚睇醫生，但唔需要叫救護車。先打 #7119，佢哋會幫你搵最近嘅夜間診所。',
    },
    number: '#7119',
    numberLabel: 'To find nearest open clinic',
    links: [
      {
        label: {
          EN: 'Night & Holiday Care', JP: '夜間・休日診療', ZH: '夜间及节假日医疗', 'ZH-T': '夜間及假日醫療',
          KO: '야간·공휴일 진료', ES: 'Atención nocturna y festiva', FR: 'Soins de nuit et jours fériés',
          IT: 'Cure notturne e festive', TL: 'Gabi at Holiday na Pag-aalaga', ID: 'Perawatan Malam dan Hari Libur',
          DE: 'Nacht- und Feiertagsversorgung', PT: 'Cuidados noturnos e feriados', RU: 'Ночная и праздничная помощь', YUE: '夜間及假日醫療',
        },
        href: '/dashboard/night-care',
      },
      {
        label: {
          EN: '#7119 & #8000 Guide', JP: '#7119・#8000ガイド', ZH: '#7119 & #8000 指南', 'ZH-T': '#7119 & #8000 指南',
          KO: '#7119 & #8000 안내', ES: 'Guía #7119 y #8000', FR: 'Guide #7119 & #8000',
          IT: 'Guida #7119 & #8000', TL: 'Gabay sa #7119 at #8000', ID: 'Panduan #7119 & #8000',
          DE: '#7119 & #8000 Guide', PT: 'Guia #7119 e #8000', RU: 'Руководство #7119 и #8000', YUE: '#7119 & #8000 指南',
        },
        href: '/dashboard/hotline',
      },
    ],
    tip: {
      EN: 'Or search Google Maps: 夜間救急クリニック [your city]',
      JP: 'またはGoogleマップで「夜間救急クリニック ＋ 都市名」で検索。',
      ZH: '或在谷歌地图搜索：夜間救急クリニック ＋ 您所在城市',
      'ZH-T': '或在Google Maps搜尋：夜間救急クリニック ＋ 您所在城市',
      KO: '또는 구글 맵에서 검색: 夜間救急クリニック ＋ 도시명',
      ES: 'O busca en Google Maps: 夜間救急クリニック [tu ciudad]',
      FR: 'Ou cherchez sur Google Maps : 夜間救急クリニック [votre ville]',
      IT: 'O cerca su Google Maps: 夜間救急クリニック [la tua città]',
      TL: 'O maghanap sa Google Maps: 夜間救急クリニック [iyong lungsod]',
      ID: 'Atau cari di Google Maps: 夜間救急クリニック [kota Anda]',
      DE: 'Oder Google Maps suchen: 夜間救急クリニック [Ihre Stadt]',
      PT: 'Ou pesquise no Google Maps: 夜間救急クリニック [sua cidade]',
      RU: 'Или поищите в Google Maps: 夜間救急クリニック [ваш город]',
      YUE: '或者喺Google Maps搜尋：夜間救急クリニック ＋ 你所在嘅地區。',
    },
  },
  'clinic': {
    color: '#16a34a',
    icon: 'medical_services',
    title: {
      EN: 'Visit a Regular Clinic', JP: '通常のクリニックへ', ZH: '前往普通诊所', 'ZH-T': '前往普通診所',
      KO: '일반 클리닉 방문', ES: 'Visita una clínica regular', FR: 'Consultez une clinique ordinaire',
      IT: 'Visita una clinica normale', TL: 'Bumisita sa Regular na Klinika', ID: 'Kunjungi Klinik Biasa',
      DE: 'Reguläre Klinik aufsuchen', PT: 'Visite uma clínica regular', RU: 'Обратитесь в обычную клинику', YUE: '去普通診所',
    },
    desc: {
      EN: 'Your symptoms can likely wait until a regular clinic opens. Bring your insurance card, cash (¥5,000–¥10,000), and a list of any current medications.',
      JP: '朝まで待って、通常のクリニックを受診できる状態です。保険証、現金（5,000〜10,000円）、服用中の薬のリストを持参してください。',
      ZH: '您的症状可能等到普通诊所开门再就诊。带好保险卡、现金（5,000–10,000日元）和目前用药清单。',
      'ZH-T': '您的症狀可能等到普通診所開門再就診。帶好保險卡、現金（5,000–10,000日圓）和目前用藥清單。',
      KO: '증상은 일반 클리닉이 열릴 때까지 기다릴 수 있습니다. 보험증, 현금(5,000–10,000엔), 복용 중인 약 목록을 지참하세요.',
      ES: 'Sus síntomas pueden esperar hasta que abra una clínica regular. Lleve su tarjeta de seguro, efectivo (¥5,000–¥10,000) y una lista de medicamentos actuales.',
      FR: 'Vos symptômes peuvent probablement attendre l\'ouverture d\'une clinique ordinaire. Apportez votre carte d\'assurance, des espèces (¥5,000–¥10,000) et la liste de vos médicaments.',
      IT: 'I tuoi sintomi possono probabilmente aspettare l\'apertura di una clinica normale. Porta la tessera sanitaria, contanti (¥5,000–¥10,000) e la lista dei farmaci.',
      TL: 'Maaaring maghintay ang iyong mga sintomas hanggang bukas ang regular na klinika. Magdala ng insurance card, cash (¥5,000–¥10,000), at listahan ng kasalukuyang gamot.',
      ID: 'Gejala Anda kemungkinan dapat menunggu hingga klinik biasa buka. Bawa kartu asuransi, uang tunai (¥5.000–¥10.000), dan daftar obat saat ini.',
      DE: 'Ihre Symptome können wahrscheinlich bis zur Öffnung einer regulären Klinik warten. Bringen Sie Ihre Versicherungskarte, Bargeld (¥5.000–¥10.000) und eine Liste Ihrer Medikamente mit.',
      PT: 'Seus sintomas provavelmente podem esperar até uma clínica regular abrir. Leve seu cartão de seguro, dinheiro (¥5.000–¥10.000) e lista de medicamentos.',
      RU: 'Ваши симптомы, вероятно, могут подождать открытия обычной клиники. Возьмите страховую карту, наличные (¥5,000–¥10,000) и список текущих препаратов.',
      YUE: '你嘅症狀可以等到普通診所開門再去睇醫生。記得帶保險卡 (Health Insurance Card)、現金（約5,000至10,000日圓）及藥物清單。',
    },
    number: null,
    links: [
      {
        label: {
          EN: 'Preparation Checklist', JP: '持ち物チェックリスト', ZH: '准备清单', 'ZH-T': '準備清單',
          KO: '준비 체크리스트', ES: 'Lista de preparación', FR: 'Liste de préparation',
          IT: 'Lista di preparazione', TL: 'Checklist sa Paghahanda', ID: 'Daftar Persiapan',
          DE: 'Vorbereitungscheckliste', PT: 'Lista de preparação', RU: 'Контрольный список', YUE: '準備清單',
        },
        href: '/dashboard/checklist',
      },
      {
        label: {
          EN: 'Surprises at Japanese Hospitals', JP: '日本の病院で驚くこと', ZH: '在日本医院的意外发现', 'ZH-T': '在日本醫院的意外發現',
          KO: '일본 병원에서 놀라운 점', ES: 'Sorpresas en hospitales japoneses', FR: 'Surprises dans les hôpitaux japonais',
          IT: 'Sorprese negli ospedali giapponesi', TL: 'Mga Sorpresa sa Mga Ospital sa Japan', ID: 'Kejutan di Rumah Sakit Jepang',
          DE: 'Überraschungen in japanischen Kliniken', PT: 'Surpresas em hospitais japoneses', RU: 'Сюрпризы японских больниц', YUE: '喺日本醫院嘅意外發現',
        },
        href: '/dashboard/articles/surprises',
      },
    ],
    tip: {
      EN: 'Clinics usually open at 9:00 AM. Arrive early to avoid long waits.',
      JP: 'クリニックは通常9時開院。待ち時間を減らすには開院前に到着を。',
      ZH: '诊所通常9时开门。早点去可以减少等待时间。',
      'ZH-T': '診所通常9時開門。早點去可以減少等待時間。',
      KO: '클리닉은 보통 오전 9시에 열립니다. 긴 대기를 피하려면 일찍 도착하세요.',
      ES: 'Las clínicas suelen abrir a las 9:00. Llega temprano para evitar largas esperas.',
      FR: 'Les cliniques ouvrent généralement à 9h00. Arrivez tôt pour éviter les longues attentes.',
      IT: 'Le cliniche di solito aprono alle 9:00. Arriva presto per evitare lunghe attese.',
      TL: 'Karaniwang nagbubukas ang mga klinika sa 9:00 AM. Pumunta nang maaga para maiwasan ang mahabang pila.',
      ID: 'Klinik biasanya buka pukul 09.00. Datanglah lebih awal untuk menghindari antrean panjang.',
      DE: 'Kliniken öffnen gewöhnlich um 9:00 Uhr. Kommen Sie früh, um lange Wartezeiten zu vermeiden.',
      PT: 'As clínicas geralmente abrem às 9h00. Chegue cedo para evitar longas esperas.',
      RU: 'Клиники обычно открываются в 9:00. Приходите пораньше, чтобы избежать очередей.',
      YUE: '診所通常9時開門。早啲去可以減少等候時間。',
    },
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
  question: Record<string, string>
  options: { value: string; label: Record<string, string>; icon: string; next: StepId | 'result' }[]
}

const NIGHT_OPTIONS: Step['options'] = [
  {
    value: 'night',
    label: {
      EN: 'Night or holiday — clinics are closed', JP: '夜間・休日（クリニックが閉まっている）',
      ZH: '夜间或节假日 — 诊所已关闭', 'ZH-T': '夜間或節假日 — 診所已關閉',
      KO: '야간 또는 공휴일 — 클리닉 닫힘', ES: 'Noche o festivo — las clínicas están cerradas',
      FR: 'Nuit ou jour férié — les cliniques sont fermées', IT: 'Notte o festivo — le cliniche sono chiuse',
      TL: 'Gabi o holiday — nakasara ang mga klinika', ID: 'Malam atau hari libur — klinik tutup',
      DE: 'Nacht oder Feiertag — Kliniken geschlossen', PT: 'Noite ou feriado — clínicas fechadas',
      RU: 'Ночь или праздник — клиники закрыты', YUE: '夜晚或假日 — 診所已關閉',
    },
    icon: 'bedtime',
    next: 'result',
  },
  {
    value: 'day',
    label: {
      EN: 'Daytime — clinics are open', JP: '昼間（クリニックが開いている）',
      ZH: '白天 — 诊所已开放', 'ZH-T': '白天 — 診所已開放',
      KO: '낮 — 클리닉 열림', ES: 'De día — las clínicas están abiertas',
      FR: 'Journée — les cliniques sont ouvertes', IT: 'Giorno — le cliniche sono aperte',
      TL: 'Araw — bukas ang mga klinika', ID: 'Siang hari — klinik buka',
      DE: 'Tagsüber — Kliniken geöffnet', PT: 'Dia — clínicas abertas',
      RU: 'Днём — клиники открыты', YUE: '日間 — 診所仍然開放',
    },
    icon: 'wb_sunny',
    next: 'result',
  },
]

const TIME_QUESTION: Record<string, string> = {
  EN: 'What time is it now?', JP: '今の時間帯は？', ZH: '现在是什么时间？', 'ZH-T': '現在是什麼時間？',
  KO: '지금 몇 시인가요?', ES: '¿Qué hora es ahora?', FR: 'Quelle heure est-il maintenant ?',
  IT: 'Che ore sono adesso?', TL: 'Anong oras na ngayon?', ID: 'Jam berapa sekarang?',
  DE: 'Wie spät ist es gerade?', PT: 'Que horas são agora?', RU: 'Который сейчас час?', YUE: '而家係幾點？',
}

const STEPS: Step[] = [
  {
    id: 'start',
    question: {
      EN: 'Is anyone in immediate danger right now?', JP: '今すぐ命に関わる状況ですか？',
      ZH: '现在有人处于直接危险中吗？', 'ZH-T': '現在有人處於直接危險中嗎？',
      KO: '지금 즉각적인 위험에 처해 있나요?', ES: '¿Hay alguien en peligro inmediato ahora mismo?',
      FR: 'Y a-t-il quelqu\'un en danger immédiat en ce moment ?', IT: 'Qualcuno è in pericolo immediato adesso?',
      TL: 'May nasa agarang panganib ba ngayon?', ID: 'Apakah ada seseorang dalam bahaya langsung sekarang?',
      DE: 'Befindet sich jemand gerade in unmittelbarer Gefahr?', PT: 'Alguém está em perigo imediato agora?',
      RU: 'Есть ли кто-то в непосредственной опасности прямо сейчас?', YUE: '而家係咪有人性命有危險？',
    },
    options: [
      {
        value: 'emergency',
        label: {
          EN: 'Yes — unconscious, not breathing, severe bleeding, or stroke',
          JP: 'はい — 意識なし・呼吸停止・大量出血・脳卒中',
          ZH: '是 — 失去意识、停止呼吸、严重出血或中风',
          'ZH-T': '是 — 失去意識、停止呼吸、嚴重出血或中風',
          KO: '예 — 의식 없음, 호흡 정지, 심한 출혈 또는 뇌졸중',
          ES: 'Sí — inconsciente, sin respirar, hemorragia grave o derrame',
          FR: 'Oui — inconscient, ne respire pas, saignement grave ou AVC',
          IT: 'Sì — inconsciente, non respira, sanguinamento grave o ictus',
          TL: 'Oo — walang malay, hindi humihinga, matinding dugo, o stroke',
          ID: 'Ya — tidak sadar, tidak bernapas, perdarahan hebat, atau stroke',
          DE: 'Ja — bewusstlos, kein Atemzug, starke Blutung oder Schlaganfall',
          PT: 'Sim — inconsciente, sem respirar, sangramento grave ou AVC',
          RU: 'Да — без сознания, не дышит, сильное кровотечение или инсульт',
          YUE: '係 — 失去知覺、停止呼吸、大量出血或中風',
        },
        icon: 'priority_high',
        next: 'result',
      },
      {
        value: 'no',
        label: {
          EN: 'No — I need help but it\'s not life-threatening',
          JP: 'いいえ — 助けは必要だが命に関わらない',
          ZH: '否 — 需要帮助但不危及生命',
          'ZH-T': '否 — 需要幫助但不危及生命',
          KO: '아니요 — 도움이 필요하지만 생명에 위협적이지 않음',
          ES: 'No — necesito ayuda pero no es mortal',
          FR: 'Non — j\'ai besoin d\'aide mais ce n\'est pas une urgence vitale',
          IT: 'No — ho bisogno di aiuto ma non è pericoloso per la vita',
          TL: 'Hindi — kailangan ko ng tulong ngunit hindi buhay-buhay',
          ID: 'Tidak — saya butuh bantuan tetapi tidak mengancam jiwa',
          DE: 'Nein — ich brauche Hilfe, aber es ist nicht lebensbedrohlich',
          PT: 'Não — preciso de ajuda mas não é ameaça à vida',
          RU: 'Нет — нужна помощь, но жизнь не под угрозой',
          YUE: '唔係 — 需要幫助但唔係生死關頭',
        },
        icon: 'check',
        next: 'symptom',
      },
    ],
  },
  {
    id: 'symptom',
    question: {
      EN: 'What is the main concern?', JP: '主な症状・状況は何ですか？',
      ZH: '主要问题是什么？', 'ZH-T': '主要問題是什麼？',
      KO: '주요 문제가 무엇인가요?', ES: '¿Cuál es la preocupación principal?',
      FR: 'Quel est le problème principal ?', IT: 'Qual è il problema principale?',
      TL: 'Ano ang pangunahing alalahanin?', ID: 'Apa masalah utamanya?',
      DE: 'Was ist das Hauptproblem?', PT: 'Qual é a principal preocupação?',
      RU: 'В чём главная проблема?', YUE: '主要症狀係咩？',
    },
    options: [
      {
        value: 'fever',
        label: {
          EN: 'Fever / cold / flu symptoms', JP: '発熱・風邪・インフルエンザ',
          ZH: '发烧 / 感冒 / 流感症状', 'ZH-T': '發燒 / 感冒 / 流感症狀',
          KO: '발열 / 감기 / 독감 증상', ES: 'Fiebre / resfriado / síntomas de gripe',
          FR: 'Fièvre / rhume / symptômes de grippe', IT: 'Febbre / raffreddore / sintomi influenzali',
          TL: 'Lagnat / sipon / sintomas ng trangkaso', ID: 'Demam / pilek / gejala flu',
          DE: 'Fieber / Erkältung / Grippesymptome', PT: 'Febre / resfriado / sintomas de gripe',
          RU: 'Жар / простуда / симптомы гриппа', YUE: '發燒／傷風／流感症狀',
        },
        icon: 'thermometer',
        next: 'fever',
      },
      {
        value: 'child',
        label: {
          EN: 'Child (infant or young child) is sick', JP: '赤ちゃん・子供の体調不良',
          ZH: '孩子（婴儿或幼儿）生病了', 'ZH-T': '孩子（嬰兒或幼兒）生病了',
          KO: '아이(영아 또는 어린이)가 아픔', ES: 'Un niño (bebé o niño pequeño) está enfermo',
          FR: 'Un enfant (nourrisson ou jeune enfant) est malade', IT: 'Un bambino (neonato o bimbo piccolo) è malato',
          TL: 'Maysakit ang bata (sanggol o maliit na bata)', ID: 'Anak (bayi atau anak kecil) sakit',
          DE: 'Kind (Säugling oder Kleinkind) ist krank', PT: 'Criança (bebê ou criança pequena) está doente',
          RU: 'Ребёнок (младенец или малыш) болен', YUE: '小朋友（嬰兒或幼童）生病',
        },
        icon: 'child_care',
        next: 'child',
      },
      {
        value: 'injury',
        label: {
          EN: 'Injury, pain, or burn', JP: 'ケガ・痛み・やけど',
          ZH: '受伤、疼痛或烧伤', 'ZH-T': '受傷、疼痛或燒傷',
          KO: '부상, 통증 또는 화상', ES: 'Lesión, dolor o quemadura',
          FR: 'Blessure, douleur ou brûlure', IT: 'Lesione, dolore o ustione',
          TL: 'Pinsala, sakit, o paso', ID: 'Cedera, nyeri, atau luka bakar',
          DE: 'Verletzung, Schmerz oder Verbrennung', PT: 'Lesão, dor ou queimadura',
          RU: 'Травма, боль или ожог', YUE: '受傷、痛楚或燒傷',
        },
        icon: 'personal_injury',
        next: 'injury',
      },
      {
        value: 'unsure',
        label: {
          EN: 'I feel unwell but I\'m not sure what\'s wrong', JP: 'なんとなく具合が悪い・よくわからない',
          ZH: '感觉不舒服但不确定是什么问题', 'ZH-T': '感覺不舒服但不確定是什麼問題',
          KO: '몸이 안 좋은데 뭐가 문제인지 모르겠어요', ES: 'Me siento mal pero no sé qué me pasa',
          FR: 'Je ne me sens pas bien mais je ne sais pas ce qui ne va pas', IT: 'Mi sento male ma non so cosa non va',
          TL: 'Hindi ako maganda ang pakiramdam pero hindi ko alam kung ano ang mali',
          ID: 'Saya merasa tidak enak badan tapi tidak tahu apa yang salah',
          DE: 'Ich fühle mich unwohl, weiß aber nicht was los ist', PT: 'Não me sinto bem mas não sei o que há de errado',
          RU: 'Чувствую себя плохо, но не знаю что именно', YUE: '唔舒服但唔確定係咩問題',
        },
        icon: 'help',
        next: 'result',
      },
    ],
  },
  { id: 'fever', question: TIME_QUESTION, options: NIGHT_OPTIONS },
  { id: 'child', question: TIME_QUESTION, options: NIGHT_OPTIONS },
  {
    id: 'injury',
    question: {
      EN: 'How serious is it?', JP: '重症度はどのくらいですか？',
      ZH: '伤势有多严重？', 'ZH-T': '傷勢有多嚴重？',
      KO: '얼마나 심각한가요?', ES: '¿Qué tan grave es?',
      FR: 'Quelle est la gravité ?', IT: 'Quanto è grave?',
      TL: 'Gaano ito kabigat?', ID: 'Seberapa serius itu?',
      DE: 'Wie ernst ist es?', PT: 'Qual é a gravidade?',
      RU: 'Насколько это серьёзно?', YUE: '傷勢有幾嚴重？',
    },
    options: [
      {
        value: 'serious',
        label: {
          EN: 'Serious — deep wound, possible fracture, severe burn, or heavy bleeding',
          JP: '重症 — 深い傷・骨折の疑い・重度のやけど・大量出血',
          ZH: '严重 — 深度伤口、可能骨折、严重烧伤或大量出血',
          'ZH-T': '嚴重 — 深度傷口、可能骨折、嚴重燒傷或大量出血',
          KO: '심각 — 깊은 상처, 골절 의심, 심한 화상 또는 심한 출혈',
          ES: 'Grave — herida profunda, posible fractura, quemadura severa o hemorragia',
          FR: 'Grave — plaie profonde, fracture possible, brûlure grave ou saignement abondant',
          IT: 'Grave — ferita profonda, possibile frattura, ustione grave o sanguinamento abbondante',
          TL: 'Malubha — malalim na sugat, posibleng bali, matinding paso, o mabigat na dugo',
          ID: 'Serius — luka dalam, kemungkinan patah tulang, luka bakar parah, atau perdarahan hebat',
          DE: 'Schwer — tiefe Wunde, möglicher Knochenbruch, schwere Verbrennung oder starke Blutung',
          PT: 'Grave — ferida profunda, possível fratura, queimadura grave ou sangramento intenso',
          RU: 'Серьёзно — глубокая рана, возможный перелом, тяжёлый ожог или сильное кровотечение',
          YUE: '嚴重 — 深度傷口、可能骨折、嚴重燒傷或大量出血',
        },
        icon: 'emergency',
        next: 'result',
      },
      {
        value: 'minor',
        label: {
          EN: 'Minor — cut, bruise, sprain, or mild burn',
          JP: '軽傷 — 軽い切り傷・打撲・捻挫・軽いやけど',
          ZH: '轻伤 — 轻微切伤、瘀伤、扭伤或轻微烧伤',
          'ZH-T': '輕傷 — 輕微切傷、瘀傷、扭傷或輕微燒傷',
          KO: '경미 — 절상, 멍, 염좌 또는 가벼운 화상',
          ES: 'Leve — corte, moratón, esguince o quemadura leve',
          FR: 'Mineur — coupure, bleu, entorse ou brûlure légère',
          IT: 'Lieve — taglio, livido, distorsione o ustione lieve',
          TL: 'Menor — hiwa, pasa, sprain, o banayad na paso',
          ID: 'Minor — luka kecil, memar, keseleo, atau luka bakar ringan',
          DE: 'Leicht — Schnitt, Prellung, Verstauchung oder leichte Verbrennung',
          PT: 'Leve — corte, hematoma, torção ou queimadura leve',
          RU: 'Незначительно — порез, синяк, растяжение или лёгкий ожог',
          YUE: '輕傷 — 輕微切傷、瘀傷、扭傷或輕微燒傷',
        },
        icon: 'band_aid',
        next: 'result',
      },
    ],
  },
]

const SAVE_LABEL: Record<string, string> = {
  EN: 'Save this result', JP: 'この結果を保存', ZH: '保存此结果', 'ZH-T': '保存此結果',
  KO: '이 결과 저장', ES: 'Guardar este resultado', FR: 'Sauvegarder ce résultat',
  IT: 'Salva questo risultato', TL: 'I-save ang resultang ito', ID: 'Simpan hasil ini',
  DE: 'Ergebnis speichern', PT: 'Salvar este resultado', RU: 'Сохранить результат', YUE: '儲存呢個結果',
}

const SAVED_LABEL: Record<string, string> = {
  EN: 'Saved', JP: '保存済み', ZH: '已保存', 'ZH-T': '已保存',
  KO: '저장됨', ES: 'Guardado', FR: 'Sauvegardé',
  IT: 'Salvato', TL: 'Na-save', ID: 'Disimpan',
  DE: 'Gespeichert', PT: 'Salvo', RU: 'Сохранено', YUE: '已儲存',
}

const HISTORY_LABEL: Record<string, string> = {
  EN: 'Previous Results', JP: '過去の記録', ZH: '之前的记录', 'ZH-T': '之前的記錄',
  KO: '이전 결과', ES: 'Resultados anteriores', FR: 'Résultats précédents',
  IT: 'Risultati precedenti', TL: 'Mga Nakaraang Resulta', ID: 'Hasil Sebelumnya',
  DE: 'Frühere Ergebnisse', PT: 'Resultados anteriores', RU: 'Предыдущие результаты', YUE: '之前嘅記錄',
}

const TIP_PREFIX: Record<string, string> = {
  EN: 'Tip: ', JP: 'ヒント：', ZH: '提示：', 'ZH-T': '提示：',
  KO: '팁：', ES: 'Consejo：', FR: 'Conseil：',
  IT: 'Consiglio：', TL: 'Tip：', ID: 'Tips：',
  DE: 'Tipp：', PT: 'Dica：', RU: 'Совет：', YUE: '貼士：',
}

export default function HealthCheckPage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
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
            {tl(currentStep.question, lang)}
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
                  {tl(opt.label, lang)}
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
                  {tl(r.title, lang)}
                </h2>
              </div>
              <p style={{ fontSize: 14, color: isUrgent ? 'rgba(255,255,255,0.9)' : '#5a413d', lineHeight: 1.7, marginBottom: r.number ? 20 : 0 }}>
                {tl(r.desc, lang)}
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

            {r.tip && (
              <div style={{ background: '#faf2f2', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(226,190,186,0.2)', marginBottom: 20 }}>
                <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.6 }}>
                  <strong>{tl(TIP_PREFIX, lang)}</strong>
                  {tl(r.tip, lang)}
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
                    <span style={{ fontSize: 13, color: '#1e1b1c', flex: 1 }}>{tl(link.label, lang)}</span>
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
                  {tl(SAVE_LABEL, lang)}
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', background: '#f0fdf4', border: '1px solid rgba(22,163,74,0.2)', borderRadius: 10, fontSize: 13, color: '#16a34a' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check_circle</span>
                  {tl(SAVED_LABEL, lang)}
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
            {tl(HISTORY_LABEL, lang)}
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
                    <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: r.color, marginBottom: 1 }}>{tl(r.title, lang)}</p>
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
