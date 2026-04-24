'use client'
import Link from 'next/link'
import { useLang } from '../../lang-context'
import { useSaved } from '../../saved-context'
import { tr, COMMON } from '../../translations'

const ITEM = { href: '/dashboard/system/referrals', title: 'Referrals & Large Hospitals', titleJP: '紹介状と大病院', icon: 'description', color: '#b22620' }
function tl(m: Record<string,string>, l: string) { return m[l] ?? m['EN'] }

const TITLE = { EN: 'Referrals & Large Hospitals', JP: '紹介状と大病院', ZH: '转诊信与大型医院', 'ZH-T': '轉診信與大型醫院', YUE: '轉診信與大型醫院', KO: '진료 의뢰서와 대형 병원', ES: 'Derivaciones y Hospitales Grandes', FR: 'Références et Grands Hôpitaux', IT: 'Referral e Grandi Ospedali', TL: 'Mga Referral at Malalaking Ospital', ID: 'Rujukan dan Rumah Sakit Besar', DE: 'Überweisungen & Krankenhäuser', PT: 'Encaminhamentos e Hospitais', RU: 'Направления и крупные больницы' }
const SUB   = { EN: 'When you need a specialist and how to get there.', JP: '専門医が必要なときの手順と紹介状の使い方。', ZH: '需要专科医生时如何获得转诊。', 'ZH-T': '需要專科醫生時如何獲得轉診。', YUE: '需要專科醫生時如何獲得轉診。', KO: '전문의가 필요할 때 어떻게 해야 하는지.', ES: 'Cuándo necesitas un especialista y cómo llegar.', FR: 'Quand vous avez besoin d\'un spécialiste.', IT: 'Quando hai bisogno di uno specialista.', TL: 'Kailan kailangan ng espesyalista at paano makuha.', ID: 'Kapan butuh spesialis dan cara mendapatkannya.', DE: 'Wann Sie einen Spezialisten brauchen.', PT: 'Quando precisar de um especialista.', RU: 'Когда нужен специалист и как туда попасть.' }

const H_STEPS = { EN: 'How Referrals Work', JP: '紹介までの流れ', ZH: '转诊流程', 'ZH-T': '轉診流程', YUE: '轉診流程', KO: '진료 의뢰 절차', ES: 'Cómo funciona la derivación', FR: 'Comment fonctionne la référence', IT: 'Come funzionano i referral', TL: 'Paano Gumagana ang Referral', ID: 'Cara Kerja Rujukan', DE: 'Wie Überweisungen funktionieren', PT: 'Como funcionam os encaminhamentos', RU: 'Как работают направления' }
const H_WHY  = { EN: 'Why Get a Referral?', JP: '紹介状を取得する理由', ZH: '为什么需要转诊？', 'ZH-T': '為什麼需要轉診？', YUE: '為什麼需要轉診？', KO: '왜 의뢰서가 필요한가?', ES: '¿Por qué pedir una derivación?', FR: 'Pourquoi obtenir une référence?', IT: 'Perché richiedere un referral?', TL: 'Bakit Kumuha ng Referral?', ID: 'Mengapa Perlu Rujukan?', DE: 'Warum eine Überweisung?', PT: 'Por que obter encaminhamento?', RU: 'Зачем нужно направление?' }
const H_TYPES = { EN: 'Common Specialties', JP: '主な診療科一覧', ZH: '常见专科', 'ZH-T': '常見專科', YUE: '常見專科', KO: '주요 전문과목', ES: 'Especialidades Comunes', FR: 'Spécialités Courantes', IT: 'Specialità Comuni', TL: 'Karaniwang Espesyalidad', ID: 'Spesialisasi Umum', DE: 'Häufige Fachrichtungen', PT: 'Especialidades Comuns', RU: 'Распространённые специализации' }

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
  'ZH-T': [
    { step: '1', title: '先去附近的診所', desc: '前往附近的クリニック（小診所）就診，向醫生說明症狀。醫生會判斷是否需要專科治療。' },
    { step: '2', title: '申請轉診信（紹介状）', desc: '如果需要專科治療，請向醫生申請紹介状（shōkaijō）。這是寫給特定醫院或科室的正式信件，包含您的完整病史。' },
    { step: '3', title: '聯繫醫院', desc: '致電醫院前台（受付）預約相關科室。請攜帶紹介状、醫療保險卡（保険証）和身份證件。' },
    { step: '4', title: '在醫院就診', desc: '在前台出示轉診信，工作人員會引導您前往相應科室。等待時間通常比診所長，建議帶水、零食和消遣物品。' },
  ],
  KO: [
    { step: '1', title: '먼저 근처 클리닉 방문', desc: '근처 クリニック(클리닉)을 방문해 증상을 설명하세요. 의사가 전문의 치료가 필요한지 판단합니다.' },
    { step: '2', title: '의뢰서(紹介状) 요청', desc: '전문 치료가 필요하면 紹介状(쇼카이조)를 요청하세요. 특정 병원이나 진료과에 보내는 공식 서한으로, 전체 병력이 기재됩니다.' },
    { step: '3', title: '병원에 연락', desc: '병원 접수처(受付)에 전화해 해당 진료과 예약을 잡으세요. 의뢰서, 보험증(保険証), 신분증을 지참하세요.' },
    { step: '4', title: '병원에서 진료', desc: '접수처에 의뢰서를 제출하면 해당 과로 안내됩니다. 클리닉보다 대기 시간이 길 수 있으니 물, 간식, 읽을 거리를 준비하세요.' },
  ],
  YUE: [
    { step: '1', title: '先去附近嘅診所', desc: '前往附近嘅クリニック（小診所）就診，同醫生講清楚你嘅症狀。醫生會判斷係咪需要專科治療。' },
    { step: '2', title: '申請轉診信（紹介状）', desc: '如果需要專科治療，請向醫生申請紹介状（shōkaijō）。呢係寫俾特定醫院或科室嘅正式信件，包含你嘅完整病史。' },
    { step: '3', title: '聯絡醫院', desc: '致電醫院前台（受付）預約相關科室。請攜帶紹介状、醫療保險卡（保険証）同身份證件。' },
    { step: '4', title: '喺醫院就診', desc: '喺前台出示轉診信，工作人員會引導你前往相應科室。等待時間通常比診所長，建議帶埋水、零食同消遣物品。' },
  ],
  ES: [
    { step: '1', title: 'Visita primero una clínica local', desc: 'Comienza en un クリニック cercano. Explica tus síntomas. El médico evaluará si necesitas atención especializada o puede ser tratado allí.' },
    { step: '2', title: 'Solicita una carta de derivación (紹介状)', desc: 'Si se necesita atención especializada, solicita una 紹介状 (shōkaijō). Es una carta formal para un hospital o departamento específico. Informa al siguiente médico de tu historial completo.' },
    { step: '3', title: 'Contacta al hospital', desc: 'Llama a la recepción del hospital (受付) para hacer una cita con el departamento correspondiente. Lleva tu 紹介状, tarjeta de seguro (保険証) e identificación.' },
    { step: '4', title: 'En el hospital', desc: 'Presenta tu carta de derivación en recepción. Te dirigirán al departamento correcto. Espera tiempos de espera más largos que en una clínica — lleva agua, snacks y algo para leer.' },
  ],
  FR: [
    { step: '1', title: "Visitez d'abord une clinique locale", desc: "Commencez dans un クリニック près de chez vous. Expliquez vos symptômes. Le médecin évaluera si vous avez besoin de soins spécialisés." },
    { step: '2', title: 'Demandez une lettre de référence (紹介状)', desc: "Si des soins spécialisés sont nécessaires, demandez une 紹介状 (shōkaijō). C'est une lettre formelle à un hôpital ou département spécifique. Elle transmet votre historique complet au médecin suivant." },
    { step: '3', title: "Contactez l'hôpital", desc: "Appelez la réception de l'hôpital (受付) pour prendre rendez-vous avec le département concerné. Apportez votre 紹介状, carte d'assurance (保険証) et pièce d'identité." },
    { step: '4', title: "À l'hôpital", desc: "Présentez votre lettre de référence à l'accueil. On vous dirigera vers le bon département. Les temps d'attente sont plus longs qu'en clinique — apportez de l'eau, des collations et de quoi vous occuper." },
  ],
  IT: [
    { step: '1', title: 'Prima visita una clinica locale', desc: "Inizia in un クリニック vicino a te. Spiega i tuoi sintomi. Il medico valuterà se hai bisogno di cure specialistiche." },
    { step: '2', title: 'Richiedi una lettera di referral (紹介状)', desc: "Se è necessaria assistenza specialistica, chiedi una 紹介状 (shōkaijō). È una lettera formale per un ospedale o reparto specifico. Comunica al prossimo medico la tua storia completa." },
    { step: '3', title: "Contatta l'ospedale", desc: "Chiama la reception dell'ospedale (受付) per fissare un appuntamento con il reparto pertinente. Porta la tua 紹介状, tessera assicurativa (保険証) e documento d'identità." },
    { step: '4', title: "In ospedale", desc: "Presenta la tua lettera di referral alla reception. Sarai indirizzato al reparto corretto. Aspettati attese più lunghe rispetto a una clinica — porta acqua, snack e qualcosa da leggere." },
  ],
  TL: [
    { step: '1', title: 'Bisitahin muna ang lokal na klinika', desc: 'Magsimula sa isang クリニック malapit sa iyo. Ipaliwanag ang iyong mga sintomas. Susuriin ng doktor kung kailangan mo ng espesyalistang pangangalaga.' },
    { step: '2', title: 'Humiling ng sulat-rekomendasyon (紹介状)', desc: "Kung kailangan ng espesyalistang pangangalaga, humiling ng 紹介状 (shōkaijō). Ito ay isang pormal na sulat-rekomendasyon para sa isang partikular na ospital o departamento. Ipinaparating nito sa susunod na doktor ang iyong buong kasaysayan." },
    { step: '3', title: 'Makipag-ugnayan sa ospital', desc: "Tumawag sa reception ng ospital (受付) para gumawa ng appointment sa kaugnay na departamento. Dalhin ang iyong 紹介状, insurance card (保険証), at ID." },
    { step: '4', title: 'Sa ospital', desc: "Ipakita ang iyong referral letter sa reception. Ikaw ay didiretsuhin sa tamang departamento. Asahan ang mas mahabang paghihintay kaysa sa klinika — magdala ng tubig, meryenda, at bagay na babasahin." },
  ],
  ID: [
    { step: '1', title: 'Kunjungi klinik lokal terlebih dahulu', desc: 'Mulai di クリニック terdekat. Jelaskan gejala Anda. Dokter akan mengevaluasi apakah Anda memerlukan perawatan spesialis.' },
    { step: '2', title: 'Minta surat rujukan (紹介状)', desc: "Jika diperlukan perawatan spesialis, minta 紹介状 (shōkaijō). Ini adalah surat resmi untuk rumah sakit atau departemen tertentu. Ini memberi tahu dokter berikutnya tentang riwayat lengkap Anda." },
    { step: '3', title: 'Hubungi rumah sakit', desc: "Hubungi bagian penerimaan rumah sakit (受付) untuk membuat janji dengan departemen yang relevan. Bawa 紹介状, kartu asuransi (保険証), dan KTP." },
    { step: '4', title: 'Di rumah sakit', desc: "Tunjukkan surat rujukan di bagian penerimaan. Anda akan diarahkan ke departemen yang benar. Perkirakan waktu tunggu lebih lama dari klinik — bawa air, camilan, dan sesuatu untuk dibaca." },
  ],
  DE: [
    { step: '1', title: 'Zuerst eine lokale Klinik aufsuchen', desc: 'Beginnen Sie in einem クリニック in Ihrer Nähe. Erklären Sie Ihre Symptome. Der Arzt wird beurteilen, ob Sie spezialisierte Versorgung benötigen.' },
    { step: '2', title: 'Überweisungsbrief beantragen (紹介状)', desc: "Wenn Spezialbehandlung erforderlich ist, bitten Sie um einen 紹介状 (shōkaijō). Das ist ein formeller Brief an ein bestimmtes Krankenhaus oder eine Abteilung. Er teilt dem nächsten Arzt Ihre vollständige Geschichte mit." },
    { step: '3', title: 'Das Krankenhaus kontaktieren', desc: "Rufen Sie die Krankenhausaufnahme (受付) an, um einen Termin mit der entsprechenden Abteilung zu vereinbaren. Bringen Sie Ihren 紹介状, Versicherungskarte (保険証) und Ausweis mit." },
    { step: '4', title: 'Im Krankenhaus', desc: "Zeigen Sie Ihren Überweisungsbrief an der Rezeption vor. Sie werden zur richtigen Abteilung weitergeleitet. Erwarten Sie längere Wartezeiten als in einer Klinik — bringen Sie Wasser, Snacks und etwas zu lesen mit." },
  ],
  PT: [
    { step: '1', title: 'Visite primeiro uma clínica local', desc: 'Comece em um クリニック perto de você. Explique seus sintomas. O médico avaliará se você precisa de cuidados especializados.' },
    { step: '2', title: 'Solicite uma carta de encaminhamento (紹介状)', desc: "Se for necessário cuidado especializado, peça uma 紹介状 (shōkaijō). É uma carta formal para um hospital ou departamento específico. Ela informa ao próximo médico seu histórico completo." },
    { step: '3', title: 'Entre em contato com o hospital', desc: "Ligue para a recepção do hospital (受付) para marcar uma consulta com o departamento relevante. Traga sua 紹介状, cartão de seguro (保険証) e identidade." },
    { step: '4', title: 'No hospital', desc: "Apresente sua carta de encaminhamento na recepção. Você será direcionado ao departamento correto. Espere esperas mais longas que em uma clínica — leve água, lanches e algo para ler." },
  ],
  RU: [
    { step: '1', title: 'Сначала посетите местную клинику', desc: 'Начните с クリニック поблизости. Объясните симптомы. Врач оценит, нужна ли вам специализированная помощь или можно лечиться там.' },
    { step: '2', title: 'Попросите направление (紹介状)', desc: "Если нужна специализированная помощь, попросите 紹介状 (shōkaijō). Это официальное письмо в конкретную больницу или отделение. Оно передаёт следующему врачу вашу полную историю." },
    { step: '3', title: 'Свяжитесь с больницей', desc: "Позвоните в регистратуру больницы (受付), чтобы записаться в нужное отделение. Возьмите с собой 紹介状, страховую карточку (保険証) и документ, удостоверяющий личность." },
    { step: '4', title: 'В больнице', desc: "Предъявите направление на ресепшн. Вас направят в нужное отделение. Ожидайте более долгого ожидания, чем в клинике — возьмите воду, перекус и что-нибудь почитать." },
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
  'ZH-T': [
    { icon: 'savings', title: '節省費用', desc: '在有200張以上床位的醫院，無轉診信就診需額外支付5,000至10,000日元的「選定療養費」。' },
    { icon: 'schedule', title: '節省時間', desc: '持有轉診信的患者通常可以優先預約。直接去大醫院掛號可能要等待3至5小時。' },
    { icon: 'history_edu', title: '更好的醫療', desc: '轉診信包含您的完整病史、症狀、檢查結果及原醫生的評估，讓專科醫生能快速了解您的情況。' },
  ],
  KO: [
    { icon: 'savings', title: '비용 절약', desc: '200병상 이상 병원을 의뢰서 없이 방문하면 일반 진료비 외에 5,000~10,000엔의 추가 요금이 발생합니다.' },
    { icon: 'schedule', title: '시간 절약', desc: '의뢰서가 있으면 우선 예약이 가능한 경우가 많습니다. 대형 병원 방문 시 3~5시간 대기는 드문 일이 아닙니다.' },
    { icon: 'history_edu', title: '더 나은 진료', desc: '의뢰서에는 전체 병력, 증상, 검사 결과, 담당의 소견이 포함되어 전문의가 즉시 상황을 파악할 수 있습니다.' },
  ],
  YUE: [
    { icon: 'savings', title: '慳錢', desc: '喺有200張以上床位嘅醫院，無轉診信就診需要額外支付5,000至10,000日元嘅「選定療養費」。' },
    { icon: 'schedule', title: '慳時間', desc: '持有轉診信嘅患者通常可以優先預約。直接去大醫院掛號可能要等待3至5小時。' },
    { icon: 'history_edu', title: '更好嘅醫療', desc: '轉診信包含你嘅完整病史、症狀、檢查結果及原醫生嘅評估，讓專科醫生能快速了解你嘅情況。' },
  ],
  ES: [
    { icon: 'savings', title: 'Ahorra dinero', desc: 'Sin una derivación en un hospital con 200+ camas, pagará un cargo no cubierto de ¥5,000–¥10,000 además de las tarifas normales.' },
    { icon: 'schedule', title: 'Ahorra tiempo', desc: 'Los pacientes referidos suelen tener prioridad en la programación. Las personas sin cita en grandes hospitales pueden esperar 3–5 horas.' },
    { icon: 'history_edu', title: 'Mejor atención', desc: 'Su carta de derivación contiene su historial completo, síntomas, resultados de pruebas y la evaluación del médico remitente — dando al especialista una ventaja.' },
  ],
  FR: [
    { icon: 'savings', title: "Économise de l'argent", desc: "Sans référence dans un hôpital de 200+ lits, vous payerez un surcoût non couvert de ¥5,000–¥10,000 en plus des frais normaux." },
    { icon: 'schedule', title: 'Économise du temps', desc: "Les patients référés ont souvent la priorité pour les rendez-vous. Les patients sans rendez-vous dans les grands hôpitaux peuvent attendre 3 à 5 heures." },
    { icon: 'history_edu', title: 'Meilleurs soins', desc: "Votre lettre de référence contient votre historique complet, symptômes, résultats de tests et l'évaluation du médecin référent — donnant une longueur d'avance au spécialiste." },
  ],
  IT: [
    { icon: 'savings', title: 'Risparmia denaro', desc: "Senza referral in un ospedale con 200+ letti, pagherai un sovrapprezzo non coperto di ¥5,000–¥10,000 in aggiunta alle tariffe normali." },
    { icon: 'schedule', title: 'Risparmia tempo', desc: "I pazienti con referral spesso ricevono priorità nelle prenotazioni. I walk-in nei grandi ospedali possono aspettare 3–5 ore." },
    { icon: 'history_edu', title: 'Cure migliori', desc: "La tua lettera di referral contiene la tua storia completa, sintomi, risultati degli esami e la valutazione del medico di riferimento — dando al specialista un vantaggio." },
  ],
  TL: [
    { icon: 'savings', title: 'Nakakatipid ng pera', desc: 'Nang walang referral sa isang ospital na may 200+ higaan, magbabayad ka ng ¥5,000–¥10,000 na dagdag na bayad sa itaas ng normal na bayad.' },
    { icon: 'schedule', title: 'Nakakatipid ng oras', desc: 'Ang mga pasyenteng may referral ay madalas na bibigyan ng priyoridad sa pag-schedule. Ang mga walk-in sa malalaking ospital ay maaaring maghintay ng 3–5 oras.' },
    { icon: 'history_edu', title: 'Mas magandang pangangalaga', desc: 'Ang iyong referral letter ay naglalaman ng iyong buong kasaysayan, mga sintomas, resulta ng mga pagsusuri, at pagtatasa ng nag-refer na doktor — nagbibigay ng kalamangan sa espesyalista.' },
  ],
  ID: [
    { icon: 'savings', title: 'Menghemat uang', desc: 'Tanpa rujukan di rumah sakit dengan 200+ tempat tidur, Anda akan membayar biaya tambahan ¥5,000–¥10,000 di atas biaya normal.' },
    { icon: 'schedule', title: 'Menghemat waktu', desc: 'Pasien yang dirujuk sering mendapat prioritas jadwal. Pasien tanpa janji di rumah sakit besar bisa menunggu 3–5 jam.' },
    { icon: 'history_edu', title: 'Perawatan lebih baik', desc: 'Surat rujukan Anda berisi riwayat lengkap, gejala, hasil tes, dan penilaian dokter perujuk — memberi spesialis keunggulan.' },
  ],
  DE: [
    { icon: 'savings', title: 'Spart Geld', desc: 'Ohne Überweisung in einem Krankenhaus mit 200+ Betten zahlen Sie einen ungedeckten Aufpreis von ¥5.000–¥10.000 zusätzlich zu den normalen Gebühren.' },
    { icon: 'schedule', title: 'Spart Zeit', desc: 'Überwiesene Patienten werden oft bei der Terminvergabe bevorzugt. Spontanbesuche in großen Krankenhäusern können 3–5 Stunden Wartezeit bedeuten.' },
    { icon: 'history_edu', title: 'Bessere Versorgung', desc: 'Ihr Überweisungsbrief enthält Ihre vollständige Geschichte, Symptome, Testergebnisse und die Einschätzung des überweisenden Arztes — was dem Spezialisten einen Vorsprung gibt.' },
  ],
  PT: [
    { icon: 'savings', title: 'Economiza dinheiro', desc: 'Sem encaminhamento em um hospital com 200+ leitos, você pagará uma sobretaxa não coberta de ¥5.000–¥10.000 além das taxas normais.' },
    { icon: 'schedule', title: 'Economiza tempo', desc: 'Pacientes encaminhados geralmente recebem prioridade no agendamento. Visitas sem hora marcada em grandes hospitais podem esperar 3–5 horas.' },
    { icon: 'history_edu', title: 'Melhor atendimento', desc: 'Sua carta de encaminhamento contém seu histórico completo, sintomas, resultados de exames e a avaliação do médico encaminhador — dando ao especialista uma vantagem.' },
  ],
  RU: [
    { icon: 'savings', title: 'Экономия денег', desc: 'Без направления в больницу с 200+ койками вы заплатите непокрытую надбавку ¥5,000–¥10,000 сверх обычных тарифов.' },
    { icon: 'schedule', title: 'Экономия времени', desc: 'Пациентам с направлением часто дают приоритет при записи. Самостоятельное посещение крупных больниц может занять 3–5 часов ожидания.' },
    { icon: 'history_edu', title: 'Лучший уход', desc: 'Ваше направление содержит полную историю, симптомы, результаты тестов и оценку направляющего врача — давая специалисту фору.' },
  ],
}

const INFO_NOTE = {
  EN: 'A referral letter (紹介状) may take 1–2 days to prepare. Tell the doctor if it\'s urgent. There may be a separate preparation fee of ¥1,000–¥3,000.',
  JP: '紹介状（しょうかいじょう）の発行には通常1〜2日かかることがあります。急ぎの場合はその旨を医師に伝えましょう。発行費用（約1,000〜3,000円）は別途かかる場合があります。',
  ZH: '准备紹介状（转诊信）通常需要1至2天。如情况紧急，请告知医生。另外可能需要额外支付1,000至3,000日元的制作费用。',
  'ZH-T': '準備紹介状（轉診信）通常需要1至2天。如情況緊急，請告知醫生。另外可能需要額外支付1,000至3,000日元的製作費用。', YUE: '準備紹介状（轉診信）通常需要1至2天。如情況緊急，請告知醫生。另外可能需要額外支付1,000至3,000日元的製作費用。',
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
  EN: '← Back to Types of Facilities', JP: '施設の種類について戻る', ZH: '← 返回医疗设施类型', 'ZH-T': '← 返回醫療設施類型', YUE: '← 返回醫療設施類型',
  KO: '← 의료 시설 유형으로 돌아가기', ES: '← Volver a Tipos de Instalaciones', FR: '← Retour aux Types d\'Établissements',
  IT: '← Torna ai Tipi di Strutture', TL: '← Bumalik sa Mga Uri ng Pasilidad', ID: '← Kembali ke Jenis Fasilitas',
  DE: '← Zurück zu Einrichtungstypen', PT: '← Voltar aos Tipos de Instalações', RU: '← Назад к типам учреждений',
}

const TYPES = [
  {
    icon: 'stethoscope',
    label: { EN: 'Internal Medicine', JP: '内科', ZH: '内科', 'ZH-T': '內科', YUE: '內科', KO: '내과', ES: 'Medicina Interna', FR: 'Médecine interne', IT: 'Medicina interna', TL: 'Internal Medicine', ID: 'Penyakit Dalam', DE: 'Innere Medizin', PT: 'Medicina Interna', RU: 'Терапия' },
    note: { EN: 'General health, chest, stomach, infection', ZH: '全身、胸部、胃肠、感染', 'ZH-T': '全身、胸部、腸胃、感染', YUE: '全身、胸部、腸胃、感染', KO: '전신, 흉부, 위, 감염', ES: 'Salud general, pecho, estómago, infecciones', FR: 'Santé générale, poitrine, estomac, infection', IT: 'Salute generale, torace, stomaco, infezione', TL: 'Pangkalahatang kalusugan, dibdib, tiyan, impeksyon', ID: 'Kesehatan umum, dada, perut, infeksi', DE: 'Allgemeine Gesundheit, Brust, Magen, Infektion', PT: 'Saúde geral, tórax, estômago, infecção', RU: 'Общее здоровье, грудь, желудок, инфекции' },
  },
  {
    icon: 'personal_injury',
    label: { EN: 'Orthopedics', JP: '整形外科', ZH: '骨科', 'ZH-T': '骨科', YUE: '骨科', KO: '정형외과', ES: 'Traumatología', FR: 'Orthopédie', IT: 'Ortopedia', TL: 'Orthopedics', ID: 'Ortopedi', DE: 'Orthopädie', PT: 'Ortopedia', RU: 'Ортопедия' },
    note: { EN: 'Bone, joint, muscle, back pain', ZH: '骨骼、关节、肌肉、腰痛', 'ZH-T': '骨骼、關節、肌肉、腰痛', YUE: '骨骼、關節、肌肉、腰痛', KO: '뼈, 관절, 근육, 허리 통증', ES: 'Hueso, articulación, músculo, dolor de espalda', FR: 'Os, articulation, muscle, mal de dos', IT: 'Osso, articolazione, muscolo, mal di schiena', TL: 'Buto, kasukasuan, kalamnan, sakit sa likod', ID: 'Tulang, sendi, otot, sakit punggung', DE: 'Knochen, Gelenk, Muskel, Rückenschmerzen', PT: 'Osso, articulação, músculo, dor nas costas', RU: 'Кости, суставы, мышцы, боль в спине' },
  },
  {
    icon: 'cardiology',
    label: { EN: 'Cardiology', JP: '循環器科', ZH: '心内科', 'ZH-T': '心內科', YUE: '心內科', KO: '순환기내과', ES: 'Cardiología', FR: 'Cardiologie', IT: 'Cardiologia', TL: 'Cardiology', ID: 'Kardiologi', DE: 'Kardiologie', PT: 'Cardiologia', RU: 'Кардиология' },
    note: { EN: 'Heart, blood pressure', ZH: '心脏、血压', 'ZH-T': '心臟、血壓', YUE: '心臟、血壓', KO: '심장, 혈압', ES: 'Corazón, presión arterial', FR: 'Cœur, tension artérielle', IT: 'Cuore, pressione sanguigna', TL: 'Puso, presyon ng dugo', ID: 'Jantung, tekanan darah', DE: 'Herz, Blutdruck', PT: 'Coração, pressão arterial', RU: 'Сердце, давление' },
  },
  {
    icon: 'neurology',
    label: { EN: 'Neurology', JP: '神経内科', ZH: '神经内科', 'ZH-T': '神經內科', YUE: '神經內科', KO: '신경내과', ES: 'Neurología', FR: 'Neurologie', IT: 'Neurologia', TL: 'Neurology', ID: 'Neurologi', DE: 'Neurologie', PT: 'Neurologia', RU: 'Неврология' },
    note: { EN: 'Headache, dizziness, nerve conditions', ZH: '头痛、眩晕、神经疾病', 'ZH-T': '頭痛、眩暈、神經疾病', YUE: '頭痛、眩暈、神經疾病', KO: '두통, 어지럼증, 신경 질환', ES: 'Dolor de cabeza, mareos, condiciones nerviosas', FR: 'Maux de tête, vertiges, maladies nerveuses', IT: 'Mal di testa, vertigini, condizioni nervose', TL: 'Sakit ng ulo, pagkahilo, kondisyon ng nerbiyos', ID: 'Sakit kepala, pusing, kondisi saraf', DE: 'Kopfschmerzen, Schwindel, Nervenerkrankungen', PT: 'Dor de cabeça, tontura, condições nervosas', RU: 'Головная боль, головокружение, нервные расстройства' },
  },
  {
    icon: 'dermatology',
    label: { EN: 'Dermatology', JP: '皮膚科', ZH: '皮肤科', 'ZH-T': '皮膚科', YUE: '皮膚科', KO: '피부과', ES: 'Dermatología', FR: 'Dermatologie', IT: 'Dermatologia', TL: 'Dermatology', ID: 'Dermatologi', DE: 'Dermatologie', PT: 'Dermatologia', RU: 'Дерматология' },
    note: { EN: 'Skin, rash, allergies', ZH: '皮肤、皮疹、过敏', 'ZH-T': '皮膚、皮疹、過敏', YUE: '皮膚、皮疹、過敏', KO: '피부, 발진, 알레르기', ES: 'Piel, sarpullido, alergias', FR: 'Peau, éruption cutanée, allergies', IT: 'Pelle, rash, allergie', TL: 'Balat, pantal, allergy', ID: 'Kulit, ruam, alergi', DE: 'Haut, Ausschlag, Allergien', PT: 'Pele, erupção, alergias', RU: 'Кожа, сыпь, аллергии' },
  },
  {
    icon: 'pregnant_woman',
    label: { EN: 'OB/GYN', JP: '産婦人科', ZH: '妇产科', 'ZH-T': '婦產科', YUE: '婦產科', KO: '산부인과', ES: 'Ginecología/Obstetricia', FR: 'Gynécologie/Obstétrique', IT: 'Ginecologia/Ostetricia', TL: 'OB/GYN', ID: 'Kebidanan/Ginekologi', DE: 'Gynäkologie/Geburtshilfe', PT: 'Ginecologia/Obstetrícia', RU: 'Гинекология/Акушерство' },
    note: { EN: "Women's health, pregnancy", ZH: '女性健康、孕期', 'ZH-T': '女性健康、孕期', YUE: '女性健康、孕期', KO: '여성 건강, 임신', ES: 'Salud femenina, embarazo', FR: 'Santé féminine, grossesse', IT: 'Salute femminile, gravidanza', TL: 'Kalusugan ng kababaihan, pagbubuntis', ID: 'Kesehatan perempuan, kehamilan', DE: 'Frauengesundheit, Schwangerschaft', PT: 'Saúde feminina, gravidez', RU: 'Женское здоровье, беременность' },
  },
  {
    icon: 'visibility',
    label: { EN: 'Ophthalmology', JP: '眼科', ZH: '眼科', 'ZH-T': '眼科', YUE: '眼科', KO: '안과', ES: 'Oftalmología', FR: 'Ophtalmologie', IT: 'Oftalmologia', TL: 'Ophthalmology', ID: 'Oftalmologi', DE: 'Ophthalmologie', PT: 'Oftalmologia', RU: 'Офтальмология' },
    note: { EN: 'Eyes, vision', ZH: '眼睛、视力', 'ZH-T': '眼睛、視力', YUE: '眼睛、視力', KO: '눈, 시력', ES: 'Ojos, visión', FR: 'Yeux, vision', IT: 'Occhi, visione', TL: 'Mga mata, paningin', ID: 'Mata, penglihatan', DE: 'Augen, Sehen', PT: 'Olhos, visão', RU: 'Глаза, зрение' },
  },
  {
    icon: 'psychology',
    label: { EN: 'Psychiatry', JP: '精神科 / 心療内科', ZH: '精神科 / 心療内科', 'ZH-T': '精神科 / 心療内科', YUE: '精神科 / 心療内科', KO: '정신건강의학과 / 심료내과', ES: 'Psiquiatría', FR: 'Psychiatrie', IT: 'Psichiatria', TL: 'Psychiatry', ID: 'Psikiatri', DE: 'Psychiatrie', PT: 'Psiquiatria', RU: 'Психиатрия' },
    note: { EN: 'Mental health, stress, depression', ZH: '心理健康、压力、抑郁', 'ZH-T': '心理健康、壓力、抑鬱', YUE: '心理健康、壓力、抑鬱', KO: '정신 건강, 스트레스, 우울증', ES: 'Salud mental, estrés, depresión', FR: 'Santé mentale, stress, dépression', IT: 'Salute mentale, stress, depressione', TL: 'Kalusugang pangkaisipan, stress, depresyon', ID: 'Kesehatan mental, stres, depresi', DE: 'Psychische Gesundheit, Stress, Depression', PT: 'Saúde mental, estresse, depressão', RU: 'Психическое здоровье, стресс, депрессия' },
  },
]

export default function ReferralsPage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const steps = STEPS[lang] ?? STEPS['EN']
  const why = WHY[lang] ?? WHY['EN']

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
          {TYPES.map((t, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', border: '1px solid rgba(226,190,186,0.2)' }}>
              <p className="font-headline" style={{ fontSize: 12, fontWeight: 700, color: '#1e1b1c', marginBottom: 2 }}>{tl(t.label, lang)}</p>
              {lang !== 'JP' && <p style={{ fontSize: 10, color: '#78716c', marginBottom: 4 }}>{t.label.JP}</p>}
              <p style={{ fontSize: 11, color: '#5a413d', lineHeight: 1.5 }}>{tl(t.note, lang)}</p>
            </div>
          ))}
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
