'use client'
import Link from 'next/link'
import { useLang } from '../../lang-context'
import { useResidency } from '../../residency-context'
import { useSaved } from '../../saved-context'
import { tr, COMMON } from '../../translations'

const ITEM = { href: '/dashboard/system/insurance', title: 'Insurance & Fees', titleJP: '保険と費用', icon: 'payments', color: '#7a5700' }

const TITLE = { EN: 'Insurance & Fees', JP: '保険と費用', ZH: '保险与费用', 'ZH-T': '保險與費用', YUE: '保險與費用', KO: '보험과 비용', ES: 'Seguro y Costos', FR: 'Assurance et Frais', IT: 'Assicurazione e Costi', TL: 'Seguro at Bayarin', ID: 'Asuransi & Biaya', DE: 'Versicherung & Kosten', PT: 'Seguro e Custos', RU: 'Страховка и расходы' }
const SUB   = { EN: 'Understanding costs and insurance in Japan.', JP: '日本の医療費と保険の仕組み。', ZH: '了解日本的医疗费用和保险。', 'ZH-T': '了解日本的醫療費用和保險。', YUE: '了解日本的醫療費用和保險。', KO: '일본 의료비와 보험 이해.', ES: 'Entendiendo costos y seguros en Japón.', FR: 'Comprendre les coûts et assurances au Japon.', IT: 'Capire i costi e le assicurazioni in Giappone.', TL: 'Pag-unawa sa mga gastos at seguro sa Japan.', ID: 'Memahami biaya dan asuransi di Jepang.', DE: 'Kosten und Versicherung in Japan verstehen.', PT: 'Entendendo custos e seguros no Japão.', RU: 'Понимание расходов и страховки в Японии.' }

const IMPORTANT_LABEL: Record<string,string> = { EN: 'Important', JP: '重要', ZH: '重要', 'ZH-T': '重要', YUE: '重要', KO: '중요', ES: 'Importante', FR: 'Important', IT: 'Importante', TL: 'Mahalaga', ID: 'Penting', DE: 'Wichtig', PT: 'Importante', RU: 'Важно' }
const ACTION_LABEL: Record<string,string>    = { EN: 'Action Required', JP: '要確認', ZH: '需要行動', 'ZH-T': '需要行動', YUE: '需要行動', KO: '조치 필요', ES: 'Acción requerida', FR: 'Action requise', IT: 'Azione richiesta', TL: 'Kailangan ng Aksyon', ID: 'Tindakan Diperlukan', DE: 'Maßnahme erforderlich', PT: 'Ação necessária', RU: 'Требуется действие' }
const COST_TITLE: Record<string,string>      = { EN: 'Estimated Medical Costs', JP: '医療費の目安', ZH: '医疗费用估计', 'ZH-T': '醫療費用估計', YUE: '醫療費用估計', KO: '예상 의료비', ES: 'Costos Médicos Estimados', FR: 'Coûts Médicaux Estimés', IT: 'Costi Medici Stimati', TL: 'Tinatayang Gastos sa Medikal', ID: 'Estimasi Biaya Medis', DE: 'Geschätzte Medizinkosten', PT: 'Custos Médicos Estimados', RU: 'Примерная стоимость лечения' }
const TIP_LABEL: Record<string,string>       = { EN: 'Tip: ', JP: 'ヒント：', ZH: '小提示：', 'ZH-T': '小提示：', YUE: '小提示：', KO: '팁: ', ES: 'Consejo: ', FR: 'Conseil : ', IT: 'Consiglio: ', TL: 'Tip: ', ID: 'Tips: ', DE: 'Tipp: ', PT: 'Dica: ', RU: 'Совет: ' }
const TIP_BODY: Record<string,string>        = {
  EN: 'The High-Cost Medical Expense Benefit (高額療養費) caps your monthly out-of-pocket costs for NHI members — roughly ¥44,400–¥80,100 depending on income.',
  JP: '高額療養費制度（こうがくりょうようひせいど）により、NHI加入者の月の自己負担には上限（所得に応じ約44,400〜80,100円）があります。',
  ZH: '高额疗养费制度（高額療養費制度）规定，NHI会员每月自付费用设有上限——依收入约¥44,400–¥80,100。',
  'ZH-T': '高額療養費制度（こうがくりょうようひせいど）規定，NHI會員每月自付費用設有上限——依收入約為¥44,400–¥80,100。',
  YUE: '高額療養費制度（こうがくりょうようひせいど）規定，NHI會員每月自付費用設有上限——依收入約為¥44,400–¥80,100。',
  KO: '고액요양비 제도（高額療養費制度）에 따라 NHI 가입자의 월 자기부담 한도는 소득에 따라 약 ¥44,400–¥80,100입니다.',
  ES: 'El Sistema de Gastos Médicos Elevados (高額療養費) limita sus gastos mensuales de bolsillo como miembro del NHI — aproximadamente ¥44,400–¥80,100 según los ingresos.',
  FR: 'Le système de prestations pour frais médicaux élevés (高額療養費) plafonne vos dépenses mensuelles à charge des membres NHI — environ ¥44 400–¥80 100 selon les revenus.',
  IT: 'Il sistema di prestazioni per spese mediche elevate (高額療養費) limita le spese mensili a carico dei membri NHI — circa ¥44.400–¥80.100 in base al reddito.',
  TL: 'Ang High-Cost Medical Expense Benefit (高額療養費) ay nagtakda ng limitasyon sa buwanang gastos ng mga miyembro ng NHI — humigit-kumulang ¥44,400–¥80,100 depende sa kita.',
  ID: 'Sistem Manfaat Biaya Medis Tinggi (高額療養費) membatasi biaya bulanan anggota NHI — sekitar ¥44.400–¥80.100 tergantung penghasilan.',
  DE: 'Das Hochkostensystem (高額療養費) begrenzt Ihre monatlichen Eigenkosten für NHI-Mitglieder — ungefähr ¥44.400–¥80.100 je nach Einkommen.',
  PT: 'O benefício por despesas médicas elevadas (高額療養費) limita seus gastos mensais para membros do NHI — aproximadamente ¥44.400–¥80.100 dependendo da renda.',
  RU: 'Система льгот при высоких расходах (高額療養費) ограничивает ежемесячные затраты членов NHI — примерно ¥44 400–¥80 100 в зависимости от дохода.',
}

function tl(m: Record<string,string>, l: string) { return m[l] ?? m['EN'] }

type Section = {
  residency: null | 'tourist' | 'newcomer' | 'resident'
  title: string
  desc: string
  items: string[]
  alert?: boolean
  warning?: boolean
}

type CostGroup = { label: string; rows: { item: string; cost: string }[] }

const SECTIONS_EN: Section[] = [
  {
    residency: null,
    title: 'National Health Insurance (NHI / 国民健康保険)',
    desc: 'Japan\'s public insurance covers 70% of medical costs for eligible residents. You pay 30% (the "co-pay"). To be eligible, you must hold a valid residence status and have stayed (or plan to stay) in Japan for more than 3 months.',
    items: ['Enrollment: within 14 days of arrival or change of address','Monthly premium: ¥1,500–¥8,000+ depending on income','Co-pay: 30% of treatment cost','Children under 3 and seniors 75+ pay less'],
  },
  {
    residency: 'tourist',
    title: 'For Short-term Visitors (Tourist / Visa-free)',
    desc: 'You are NOT eligible for NHI. You will pay 100% of all medical costs out of pocket. Costs can be very high — a single hospital visit can run ¥10,000–¥50,000+.',
    items: ['Travel insurance: strongly recommended before departure','Credit/debit card: major hospitals accept Visa/Mastercard','Cash: always bring ¥20,000–¥50,000 for unexpected needs','Receipts: keep all receipts for home-country insurance reimbursement'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: 'For New Arrivals (< 6 months)',
    desc: 'If you have a residence card (在留カード), you must enroll in NHI within 14 days of registration. Until enrolled, you pay 100%. After enrollment, you pay 30%.',
    items: ['Enroll at your local city/ward office (市区町村役所)','Bring: residence card, passport, and your address registration','Monthly premium is income-based (lower first year)','Work visa holders may be covered by employer\'s health insurance instead'],
    warning: true,
  },
  {
    residency: 'resident',
    title: 'For Long-term / Permanent Residents',
    desc: 'You should already be enrolled in either NHI or employer-based insurance (社会保険). Your co-pay is 30% for most treatments.',
    items: ['Lost insurance card: report to your city office immediately','Changing jobs: re-enroll in NHI within 14 days if leaving company insurance','High-cost benefit (高額療養費): caps monthly out-of-pocket at ~¥80,000','Annual checkups (健康診断): often subsidized or free for NHI members'],
  },
]

const SECTIONS_JP: Section[] = [
  {
    residency: null,
    title: '国民健康保険（NHI）',
    desc: '日本の公的保険は、加入資格のある居住者の医療費の70%をカバーします。自己負担は30%。加入資格は有効な在留資格を持ち、3ヶ月以上の滞在（予定含む）が条件です。',
    items: ['加入手続き：来日または転居から14日以内','月額保険料：収入に応じて約1,500〜8,000円以上','自己負担：医療費の30%','3歳未満の子供と75歳以上の高齢者はさらに低い負担率'],
  },
  {
    residency: 'tourist',
    title: '短期旅行者・観光客の方へ',
    desc: 'NHIの加入資格はありません。すべての医療費を全額自己負担（10割）します。1回の受診で10,000〜50,000円以上かかることもあります。',
    items: ['海外旅行保険：出発前に加入を強く推奨','クレジットカード：大きな病院ではVisa/Mastercard利用可','現金：緊急時に備え20,000〜50,000円を用意','領収書：帰国後の保険請求に必要なので保管を'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: '来日6ヶ月未満の方へ',
    desc: '在留カードを持っている場合、住民登録から14日以内にNHIに加入する義務があります。加入前は全額自己負担、加入後は3割負担になります。',
    items: ['加入場所：お住まいの市区町村役所','持参物：在留カード・パスポート・住民票','月額保険料は所得に基づき、初年度は低め','就労ビザの場合は会社の社会保険に加入するケースも'],
    warning: true,
  },
  {
    residency: 'resident',
    title: '長期在留者・永住者の方へ',
    desc: 'NHIまたは勤務先の社会保険（社保）にすでに加入しているはずです。通常の治療では3割負担です。',
    items: ['保険証紛失：すぐに市区町村役所に届け出を','転職時：会社保険を脱退後14日以内にNHI加入が必要','高額療養費制度：月の自己負担上限は約80,000円','健康診断：NHI加入者は補助あり・無料の場合も'],
  },
]

const SECTIONS_ZHT: Section[] = [
  {
    residency: null,
    title: '國民健康保險（NHI / 国民健康保険）',
    desc: '日本的公費保險覆蓋符合資格居民70%的醫療費用。您需自付30%（「自付額」）。申請資格為持有有效在留資格，且已居住（或計劃居住）日本超過3個月。',
    items: ['加入手續：抵達或變更地址後14日內', '月額保費：依收入約¥1,500–¥8,000以上', '自付額：治療費用的30%', '3歲以下兒童及75歲以上長者負擔較少'],
  },
  {
    residency: 'tourist',
    title: '短期訪客（觀光客／免簽入境）',
    desc: '您沒有資格申請NHI。所有醫療費用須自費全額支付。費用可能非常高——單次醫院就診可能高達¥10,000–¥50,000以上。',
    items: ['旅遊保險：強烈建議出發前購買', '信用卡／簽帳卡：主要醫院接受Visa/Mastercard', '現金：請備帶¥20,000–¥50,000以備不時之需', '收據：保留所有收據以便回國後申請保險理賠'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: '新抵達者（在留未滿6個月）',
    desc: '若持有在留卡（在留カード），必須在住民登錄後14日內加入NHI。加入前需全額自付；加入後自付30%。',
    items: ['加入地點：您所在的市區町村役所', '攜帶文件：在留卡、護照及地址登錄證明', '月額保費根據收入計算（第一年較低）', '就業簽證持有者可能已由雇主的健保承保'],
    warning: true,
  },
  {
    residency: 'resident',
    title: '長期在留者／永久居留者',
    desc: '您應已加入NHI或雇主提供的健保（社会保険）。大多數治療自付30%。',
    items: ['遺失保險卡：請立即向市役所報告', '轉職時：離開公司保險後14日內重新加入NHI', '高額療養費（高額療養費）：每月自付上限約¥80,000', '年度健康檢查（健康診断）：NHI會員通常可享補貼或免費'],
  },
]

const SECTIONS_KO: Section[] = [
  {
    residency: null,
    title: '국민건강보험 (NHI / 国民健康保険)',
    desc: '일본의 공공 보험은 자격을 갖춘 거주자의 의료비 70%를 부담합니다. 본인 부담금은 30%입니다. 자격 요건: 유효한 재류 자격 보유 및 일본 체류 기간이 3개월 이상(예정 포함).',
    items: ['가입: 입국 또는 주소 변경 후 14일 이내', '월 보험료: 소득에 따라 ¥1,500–¥8,000 이상', '본인 부담금: 진료비의 30%', '3세 미만 어린이와 75세 이상 노인은 부담 낮음'],
  },
  {
    residency: 'tourist',
    title: '단기 방문자 (관광 / 무비자 입국)',
    desc: 'NHI 가입 자격이 없습니다. 모든 의료비를 100% 자기 부담으로 지불해야 합니다. 비용이 매우 높을 수 있으며, 단 한 번의 병원 방문에도 ¥10,000–¥50,000 이상이 들 수 있습니다.',
    items: ['여행 보험: 출발 전 강력 권고', '신용카드/직불카드: 주요 병원에서 Visa/Mastercard 사용 가능', '현금: 비상시를 위해 ¥20,000–¥50,000 준비', '영수증: 귀국 후 보험 청구를 위해 모든 영수증 보관'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: '신규 입국자 (6개월 미만)',
    desc: '재류카드(在留カード)를 소지한 경우, 주민 등록 후 14일 이내에 NHI에 가입해야 합니다. 가입 전에는 100%를 부담하며, 가입 후에는 30%만 부담합니다.',
    items: ['가입 장소: 거주 지역 시·구청 (市区町村役所)', '지참물: 재류카드, 여권, 주소 등록 서류', '월 보험료는 소득 기반(첫 해는 낮음)', '취업비자 소지자는 고용주의 건강보험에 적용될 수 있음'],
    warning: true,
  },
  {
    residency: 'resident',
    title: '장기 거주자 / 영주권자',
    desc: 'NHI 또는 고용주 기반 보험(社会保険)에 이미 가입되어 있어야 합니다. 대부분의 치료에서 본인 부담금은 30%입니다.',
    items: ['보험증 분실: 즉시 시청에 신고', '이직 시: 회사 보험 탈퇴 후 14일 이내에 NHI 재가입', '고액요양비(高額療養費): 월 자기 부담 상한 약 ¥80,000', '연간 건강검진(健康診断): NHI 가입자에게 보조금 또는 무료 제공'],
  },
]

const SECTIONS_ES: Section[] = [
  {
    residency: null,
    title: 'Seguro Nacional de Salud (NHI / 国民健康保険)',
    desc: 'El seguro público de Japón cubre el 70% de los costos médicos para residentes elegibles. El paciente paga el 30% ("copago"). Para ser elegible, debe tener un estatus de residencia válido y haber residido (o planear residir) en Japón por más de 3 meses.',
    items: ['Inscripción: dentro de 14 días de llegada o cambio de domicilio', 'Prima mensual: ¥1,500–¥8,000+ según ingresos', 'Copago: 30% del costo del tratamiento', 'Niños menores de 3 años y mayores de 75 años pagan menos'],
  },
  {
    residency: 'tourist',
    title: 'Para Visitantes de Corta Estadía (Turistas / Sin Visa)',
    desc: 'NO tiene derecho al NHI. Pagará el 100% de todos los costos médicos de su bolsillo. Los costos pueden ser muy altos — una sola visita al hospital puede costar ¥10,000–¥50,000 o más.',
    items: ['Seguro de viaje: fuertemente recomendado antes de partir', 'Tarjeta de crédito/débito: los hospitales principales aceptan Visa/Mastercard', 'Efectivo: tenga siempre ¥20,000–¥50,000 disponibles para imprevistos', 'Recibos: guarde todos los recibos para el reembolso del seguro'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: 'Para Recién Llegados (< 6 meses)',
    desc: 'Si tiene una tarjeta de residencia (在留カード), debe inscribirse en el NHI dentro de los 14 días de su registro. Hasta la inscripción, paga el 100%. Después, paga el 30%.',
    items: ['Inscríbase en la oficina municipal local (市区町村役所)', 'Lleve: tarjeta de residencia, pasaporte y registro de dirección', 'La prima mensual se basa en los ingresos (más baja el primer año)', 'Los titulares de visa de trabajo pueden estar cubiertos por el seguro del empleador'],
    warning: true,
  },
  {
    residency: 'resident',
    title: 'Para Residentes de Larga Duración / Permanentes',
    desc: 'Ya debería estar inscrito en el NHI o en el seguro del empleador (社会保険). Su copago es del 30% para la mayoría de los tratamientos.',
    items: ['Tarjeta perdida: repórtelo inmediatamente en la oficina municipal', 'Cambio de trabajo: reinscriba en NHI dentro de 14 días al dejar el seguro de empresa', 'Beneficio de alto costo (高額療養費): limita el gasto mensual a ~¥80,000', 'Chequeos anuales (健康診断): a menudo subsidiados o gratuitos para miembros del NHI'],
  },
]

const SECTIONS_FR: Section[] = [
  {
    residency: null,
    title: 'Assurance Maladie Nationale (NHI / 国民健康保険)',
    desc: "L'assurance publique japonaise couvre 70 % des frais médicaux pour les résidents éligibles. Vous payez 30 % (le « ticket modérateur »). Pour être éligible, vous devez avoir un statut de résidence valide et avoir séjourné (ou prévoir de séjourner) au Japon plus de 3 mois.",
    items: ["Inscription : dans les 14 jours suivant l'arrivée ou le changement d'adresse", 'Prime mensuelle : ¥1 500–¥8 000+ selon les revenus', 'Ticket modérateur : 30 % du coût du traitement', 'Les enfants de moins de 3 ans et les personnes de 75 ans et plus paient moins'],
  },
  {
    residency: 'tourist',
    title: 'Pour les Visiteurs de Courte Durée (Touristes / Sans Visa)',
    desc: "Vous n'êtes PAS éligible au NHI. Vous paierez 100 % de tous les frais médicaux de votre poche. Les coûts peuvent être très élevés — une seule visite à l'hôpital peut coûter ¥10 000–¥50 000 ou plus.",
    items: ['Assurance voyage : fortement recommandée avant le départ', 'Carte de crédit/débit : les grands hôpitaux acceptent Visa/Mastercard', "Espèces : gardez toujours ¥20 000–¥50 000 disponibles pour les imprévus", 'Reçus : conservez tous les reçus pour le remboursement de votre assurance'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: 'Pour les Nouveaux Arrivants (< 6 mois)',
    desc: "Si vous avez une carte de résidence (在留カード), vous devez vous inscrire au NHI dans les 14 jours suivant votre enregistrement. Avant l'inscription, vous payez 100 %. Après, vous payez 30 %.",
    items: ["Inscrivez-vous à la mairie locale (市区町村役所)", 'Apportez : carte de résidence, passeport et enregistrement de domicile', 'La prime mensuelle est basée sur les revenus (plus faible la première année)', "Les titulaires de visa de travail peuvent être couverts par l'assurance de l'employeur"],
    warning: true,
  },
  {
    residency: 'resident',
    title: 'Pour les Résidents de Longue Durée / Permanents',
    desc: "Vous devriez déjà être inscrit au NHI ou à l'assurance employeur (社会保険). Votre ticket modérateur est de 30 % pour la plupart des traitements.",
    items: ["Carte perdue : signalez-le immédiatement à la mairie", "Changement d'emploi : réinscrivez-vous au NHI dans les 14 jours après avoir quitté l'assurance de l'entreprise", 'Prestation à coût élevé (高額療養費) : plafonne les dépenses mensuelles à ~¥80 000', 'Bilans annuels (健康診断) : souvent subventionnés ou gratuits pour les membres NHI'],
  },
]

const SECTIONS_IT: Section[] = [
  {
    residency: null,
    title: 'Assicurazione Sanitaria Nazionale (NHI / 国民健康保険)',
    desc: "L'assicurazione pubblica giapponese copre il 70% dei costi medici per i residenti idonei. Il paziente paga il 30% (il «ticket»). Per essere idonei, è necessario avere uno stato di residenza valido ed essere rimasti (o pianificare di rimanere) in Giappone per più di 3 mesi.",
    items: ["Iscrizione: entro 14 giorni dall'arrivo o cambio di indirizzo", 'Premio mensile: ¥1.500–¥8.000+ in base al reddito', 'Ticket: 30% del costo del trattamento', 'I bambini sotto i 3 anni e gli anziani sopra i 75 anni pagano di meno'],
  },
  {
    residency: 'tourist',
    title: 'Per i Visitatori di Breve Periodo (Turisti / Senza Visto)',
    desc: "NON si è idonei al NHI. Si pagherà il 100% di tutti i costi medici di tasca propria. I costi possono essere molto alti — una singola visita ospedaliera può costare ¥10.000–¥50.000 o più.",
    items: ['Assicurazione di viaggio: fortemente raccomandata prima della partenza', 'Carta di credito/debito: i principali ospedali accettano Visa/Mastercard', 'Contanti: tenere sempre ¥20.000–¥50.000 disponibili per necessità impreviste', 'Ricevute: conservare tutte le ricevute per il rimborso assicurativo'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: 'Per i Nuovi Arrivati (< 6 mesi)',
    desc: "Se si possiede una carta di residenza (在留カード), è obbligatorio iscriversi al NHI entro 14 giorni dalla registrazione. Prima dell'iscrizione si paga il 100%. Dopo si paga il 30%.",
    items: ["Iscriversi all'ufficio comunale locale (市区町村役所)", "Portare: carta di residenza, passaporto e registrazione dell'indirizzo", 'Il premio mensile è basato sul reddito (più basso nel primo anno)', "I titolari di visto di lavoro possono essere coperti dall'assicurazione del datore di lavoro"],
    warning: true,
  },
  {
    residency: 'resident',
    title: 'Per Residenti a Lungo Termine / Permanenti',
    desc: "Dovreste già essere iscritti al NHI o all'assicurazione del datore di lavoro (社会保険). Il ticket è del 30% per la maggior parte dei trattamenti.",
    items: ["Tessera persa: segnalarlo immediatamente all'ufficio comunale", "Cambio di lavoro: reiscriversi al NHI entro 14 giorni dall'abbandono dell'assicurazione aziendale", 'Prestazione ad alto costo (高額療養費): limita la spesa mensile a ~¥80.000', 'Check-up annuali (健康診断): spesso sovvenzionati o gratuiti per i membri NHI'],
  },
]

const SECTIONS_TL: Section[] = [
  {
    residency: null,
    title: 'Pambansang Segurong Pangkalusugan (NHI / 国民健康保険)',
    desc: 'Ang pampublikong seguro ng Japan ay sumasaklaw sa 70% ng mga gastusin sa medikal para sa mga karapat-dapat na residente. Kailangan mong magbayad ng 30% (ang "co-pay"). Para maging karapat-dapat, kailangan mong may wastong katayuang panirahan at nanatili (o nagpaplano na manatili) sa Japan nang mahigit 3 buwan.',
    items: ['Pagpapatala: sa loob ng 14 na araw mula sa pagdating o pagbabago ng address', 'Buwanang premium: ¥1,500–¥8,000+ depende sa kita', 'Co-pay: 30% ng gastos sa paggamot', 'Mga batang wala pang 3 taong gulang at matatanda na 75 pataas ay nagbabayad ng mas kaunti'],
  },
  {
    residency: 'tourist',
    title: 'Para sa mga Panandaliang Bisita (Turista / Walang Visa)',
    desc: 'HINDI kayo karapat-dapat sa NHI. Magbabayad kayo ng 100% ng lahat ng gastusin sa medikal mula sa sariling bulsa. Ang mga gastos ay maaaring maging napakataas — ang isang pagbisita sa ospital ay maaaring umabot sa ¥10,000–¥50,000 o higit pa.',
    items: ['Segurong panlakbay: mariing inirerekomenda bago umalis', 'Credit/debit card: tinatanggap ng mga pangunahing ospital ang Visa/Mastercard', 'Cash: laging magdala ng ¥20,000–¥50,000 para sa mga hindi inaasahang pangangailangan', 'Mga resibo: itago ang lahat ng resibo para sa pagsingil ng seguro'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: 'Para sa mga Bagong Dating (< 6 na buwan)',
    desc: 'Kung mayroon kang residency card (在留カード), kailangan kang mag-enroll sa NHI sa loob ng 14 na araw mula sa iyong pagpaparehistro. Bago mag-enroll, magbabayad ka ng 100%. Pagkatapos mag-enroll, 30% na lamang.',
    items: ['Mag-enroll sa lokal na city/ward office (市区町村役所)', 'Magdala ng: residency card, pasaporte, at patunay ng address', 'Ang buwanang premium ay batay sa kita (mas mababa sa unang taon)', 'Ang mga may work visa ay maaaring saklaw ng seguro ng employer'],
    warning: true,
  },
  {
    residency: 'resident',
    title: 'Para sa mga Matagalang Naninirahan / Permanenteng Residente',
    desc: 'Dapat kang nakaenroll na sa NHI o sa insurance ng employer (社会保険). Ang iyong co-pay ay 30% para sa karamihan ng mga paggamot.',
    items: ['Nawala ang insurance card: iulat agad sa city office', 'Pagpapalit ng trabaho: mag-enroll ulit sa NHI sa loob ng 14 na araw pagkatapos umalis sa company insurance', 'High-cost benefit (高額療養費): nagtakda ng limitasyon sa buwanang gastos sa ~¥80,000', 'Taunang check-up (健康診断): kadalasang may subsidyo o libre para sa mga miyembro ng NHI'],
  },
]

const SECTIONS_ID: Section[] = [
  {
    residency: null,
    title: 'Asuransi Kesehatan Nasional (NHI / 国民健康保険)',
    desc: 'Asuransi publik Jepang menanggung 70% biaya medis bagi penduduk yang memenuhi syarat. Anda membayar 30% (iuran). Untuk memenuhi syarat, Anda harus memiliki status tempat tinggal yang sah dan telah tinggal (atau berencana tinggal) di Jepang lebih dari 3 bulan.',
    items: ['Pendaftaran: dalam 14 hari setelah tiba atau perubahan alamat', 'Premi bulanan: ¥1.500–¥8.000+ tergantung penghasilan', 'Iuran: 30% dari biaya pengobatan', 'Anak-anak di bawah 3 tahun dan lansia 75 tahun ke atas membayar lebih sedikit'],
  },
  {
    residency: 'tourist',
    title: 'Untuk Pengunjung Jangka Pendek (Wisatawan / Bebas Visa)',
    desc: 'Anda TIDAK berhak atas NHI. Anda akan membayar 100% dari semua biaya medis secara tunai. Biayanya bisa sangat tinggi — satu kunjungan ke rumah sakit bisa mencapai ¥10.000–¥50.000 atau lebih.',
    items: ['Asuransi perjalanan: sangat direkomendasikan sebelum berangkat', 'Kartu kredit/debit: rumah sakit besar menerima Visa/Mastercard', 'Uang tunai: selalu bawa ¥20.000–¥50.000 untuk kebutuhan darurat', 'Kuitansi: simpan semua kuitansi untuk klaim asuransi'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: 'Untuk Pendatang Baru (< 6 bulan)',
    desc: 'Jika Anda memiliki kartu residensi (在留カード), Anda wajib mendaftar ke NHI dalam 14 hari sejak pendaftaran alamat. Sebelum terdaftar, Anda membayar 100%. Setelah terdaftar, Anda membayar 30%.',
    items: ['Daftar di kantor kota/distrik setempat (市区町村役所)', 'Bawa: kartu residensi, paspor, dan bukti pendaftaran alamat', 'Premi bulanan berdasarkan penghasilan (lebih rendah di tahun pertama)', 'Pemegang visa kerja mungkin sudah ditanggung oleh asuransi perusahaan'],
    warning: true,
  },
  {
    residency: 'resident',
    title: 'Untuk Penduduk Jangka Panjang / Tetap',
    desc: 'Anda seharusnya sudah terdaftar di NHI atau asuransi perusahaan (社会保険). Iuran Anda adalah 30% untuk sebagian besar perawatan.',
    items: ['Kartu hilang: laporkan segera ke kantor kota', 'Ganti pekerjaan: daftar ulang ke NHI dalam 14 hari setelah meninggalkan asuransi perusahaan', 'Manfaat biaya tinggi (高額療養費): membatasi pengeluaran bulanan sekitar ¥80.000', 'Pemeriksaan tahunan (健康診断): sering disubsidi atau gratis untuk anggota NHI'],
  },
]

const SECTIONS_DE: Section[] = [
  {
    residency: null,
    title: 'Nationale Krankenversicherung (NHI / 国民健康保険)',
    desc: 'Japans staatliche Versicherung übernimmt 70 % der Krankenkosten für anspruchsberechtigte Einwohner. Sie zahlen 30 % (den „Eigenanteil"). Voraussetzung: gültiger Aufenthaltsstatus und Aufenthalt in Japan von mehr als 3 Monaten (geplant oder bereits erfüllt).',
    items: ['Anmeldung: innerhalb von 14 Tagen nach Ankunft oder Adressänderung', 'Monatsbeitrag: ¥1.500–¥8.000+ je nach Einkommen', 'Eigenanteil: 30 % der Behandlungskosten', 'Kinder unter 3 Jahren und Senioren ab 75 Jahren zahlen weniger'],
  },
  {
    residency: 'tourist',
    title: 'Für Kurzzeit-Besucher (Touristen / Visafrei)',
    desc: 'Sie haben KEINEN Anspruch auf NHI. Sie zahlen 100 % aller Arztkosten aus eigener Tasche. Die Kosten können sehr hoch sein — ein einzelner Krankenhausbesuch kann ¥10.000–¥50.000 oder mehr kosten.',
    items: ['Reiseversicherung: vor der Abreise dringend empfohlen', 'Kredit-/Debitkarte: große Krankenhäuser akzeptieren Visa/Mastercard', 'Bargeld: stets ¥20.000–¥50.000 für unvorhergesehene Ausgaben bereithalten', 'Quittungen: alle Quittungen für Versicherungserstattungen aufbewahren'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: 'Für Neuankömmlinge (< 6 Monate)',
    desc: 'Wenn Sie eine Aufenthaltskarte (在留カード) haben, müssen Sie sich innerhalb von 14 Tagen nach der Anmeldung beim NHI einschreiben. Bis zur Anmeldung zahlen Sie 100 %. Danach zahlen Sie 30 %.',
    items: ['Anmeldung beim lokalen Stadtbüro (市区町村役所)', 'Mitbringen: Aufenthaltskarte, Reisepass und Adressanmeldung', 'Monatsbeitrag einkommensabhängig (im ersten Jahr niedriger)', 'Arbeitsvisa-Inhaber können über die Arbeitgeberversicherung abgedeckt sein'],
    warning: true,
  },
  {
    residency: 'resident',
    title: 'Für Langzeit-/ Dauereinwohner',
    desc: 'Sie sollten bereits beim NHI oder der Arbeitgeberversicherung (社会保険) angemeldet sein. Ihr Eigenanteil beträgt bei den meisten Behandlungen 30 %.',
    items: ['Versicherungskarte verloren: sofort beim Stadtbüro melden', 'Jobwechsel: innerhalb von 14 Tagen nach Ende der Firmenversicherung beim NHI neu anmelden', 'Hochkostenleistung (高額療養費): begrenzt monatliche Eigenkosten auf ca. ¥80.000', 'Jährliche Vorsorge (健康診断): für NHI-Mitglieder oft subventioniert oder kostenlos'],
  },
]

const SECTIONS_PT: Section[] = [
  {
    residency: null,
    title: 'Seguro Nacional de Saúde (NHI / 国民健康保険)',
    desc: 'O seguro público do Japão cobre 70% dos custos médicos para residentes elegíveis. Você paga 30% (o "copagamento"). Para ser elegível, você deve ter um status de residência válido e ter permanecido (ou planeja permanecer) no Japão por mais de 3 meses.',
    items: ['Inscrição: dentro de 14 dias da chegada ou mudança de endereço', 'Prêmio mensal: ¥1.500–¥8.000+ conforme a renda', 'Copagamento: 30% do custo do tratamento', 'Crianças menores de 3 anos e idosos acima de 75 anos pagam menos'],
  },
  {
    residency: 'tourist',
    title: 'Para Visitantes de Curta Duração (Turistas / Sem Visto)',
    desc: 'Você NÃO tem direito ao NHI. Você pagará 100% de todos os custos médicos do seu próprio bolso. Os custos podem ser muito altos — uma única visita ao hospital pode custar ¥10.000–¥50.000 ou mais.',
    items: ['Seguro viagem: fortemente recomendado antes da partida', 'Cartão de crédito/débito: principais hospitais aceitam Visa/Mastercard', 'Dinheiro: sempre tenha ¥20.000–¥50.000 disponíveis para necessidades inesperadas', 'Recibos: guarde todos os recibos para reembolso do seguro'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: 'Para Recém-Chegados (< 6 meses)',
    desc: 'Se você tem um cartão de residência (在留カード), deve se inscrever no NHI dentro de 14 dias após o registro. Antes da inscrição, você paga 100%. Após a inscrição, você paga 30%.',
    items: ['Inscreva-se na prefeitura local (市区町村役所)', 'Leve: cartão de residência, passaporte e registro de endereço', 'O prêmio mensal é baseado na renda (mais baixo no primeiro ano)', 'Titulares de visto de trabalho podem ser cobertos pelo seguro do empregador'],
    warning: true,
  },
  {
    residency: 'resident',
    title: 'Para Residentes de Longa Duração / Permanentes',
    desc: 'Você já deve estar inscrito no NHI ou no seguro do empregador (社会保険). Seu copagamento é de 30% para a maioria dos tratamentos.',
    items: ['Cartão perdido: informe imediatamente na prefeitura', 'Mudança de emprego: reinscreva-se no NHI dentro de 14 dias após sair do seguro da empresa', 'Benefício de alto custo (高額療養費): limita as despesas mensais a ~¥80.000', 'Check-ups anuais (健康診断): frequentemente subsidiados ou gratuitos para membros do NHI'],
  },
]

const SECTIONS_RU: Section[] = [
  {
    residency: null,
    title: 'Национальное медицинское страхование (NHI / 国民健康保険)',
    desc: 'Государственная страховка Японии покрывает 70% медицинских расходов для имеющих право жителей. Вы платите 30% («сооплата»). Условие: действующий статус проживания и пребывание в Японии более 3 месяцев (фактическое или запланированное).',
    items: ['Регистрация: в течение 14 дней с момента прибытия или смены адреса', 'Ежемесячный взнос: ¥1 500–¥8 000+ в зависимости от дохода', 'Сооплата: 30% стоимости лечения', 'Дети до 3 лет и пожилые от 75 лет платят меньше'],
  },
  {
    residency: 'tourist',
    title: 'Для краткосрочных посетителей (туристы / безвизовый въезд)',
    desc: 'Вы НЕ имеете права на NHI. Вы будете платить 100% всех медицинских расходов из своего кармана. Расходы могут быть очень высокими — один визит в больницу может стоить ¥10 000–¥50 000 и более.',
    items: ['Туристическая страховка: настоятельно рекомендуется перед отъездом', 'Кредитная/дебетовая карта: крупные больницы принимают Visa/Mastercard', 'Наличные: всегда держите ¥20 000–¥50 000 на случай непредвиденных нужд', 'Квитанции: сохраняйте все квитанции для возмещения по страховке'],
    alert: true,
  },
  {
    residency: 'newcomer',
    title: 'Для недавно прибывших (< 6 месяцев)',
    desc: 'Если у вас есть карта резидента (在留カード), вы обязаны зарегистрироваться в NHI в течение 14 дней с момента регистрации по месту жительства. До регистрации вы платите 100%. После — 30%.',
    items: ['Регистрация в местном муниципальном офисе (市区町村役所)', 'Возьмите с собой: карту резидента, паспорт и справку о регистрации адреса', 'Ежемесячный взнос зависит от дохода (в первый год ниже)', 'Владельцы рабочей визы могут быть застрахованы через работодателя'],
    warning: true,
  },
  {
    residency: 'resident',
    title: 'Для долгосрочных / постоянных жителей',
    desc: 'Вы уже должны быть зарегистрированы в NHI или в страховке работодателя (社会保険). Ваша сооплата составляет 30% для большинства процедур.',
    items: ['Потеря страхового полиса: немедленно сообщите в муниципальный офис', 'Смена работы: зарегистрируйтесь в NHI в течение 14 дней после выхода из корпоративной страховки', 'Льгота при высоких расходах (高額療養費): ограничивает ежемесячные затраты примерно до ¥80 000', 'Ежегодные осмотры (健康診断): часто субсидируются или бесплатны для членов NHI'],
  },
]

const SECTIONS_MAP: Record<string, Section[]> = {
  EN: SECTIONS_EN, JP: SECTIONS_JP,
  ZH: SECTIONS_ZHT, 'ZH-T': SECTIONS_ZHT, YUE: SECTIONS_ZHT,
  KO: SECTIONS_KO, ES: SECTIONS_ES, FR: SECTIONS_FR, IT: SECTIONS_IT,
  TL: SECTIONS_TL, ID: SECTIONS_ID, DE: SECTIONS_DE, PT: SECTIONS_PT, RU: SECTIONS_RU,
}

const COST_TABLE_EN: CostGroup[] = [
  { label: 'With NHI (30% co-pay)', rows: [
    { item: 'Standard clinic visit', cost: '¥1,000–¥3,000' },
    { item: 'ER (non-emergency surcharge)', cost: '+¥5,000–¥10,000' },
    { item: 'Hospital admission (per day)', cost: '¥5,000–¥20,000' },
    { item: 'Prescription medicine', cost: '¥200–¥1,500' },
  ]},
  { label: 'Without insurance (100%)', rows: [
    { item: 'Standard clinic visit', cost: '¥3,000–¥10,000' },
    { item: 'ER visit', cost: '¥15,000–¥50,000+' },
    { item: 'Hospital admission (per day)', cost: '¥30,000–¥100,000+' },
    { item: 'Surgery (major)', cost: '¥500,000+' },
  ]},
]

const COST_TABLE_JP: CostGroup[] = [
  { label: 'NHI加入時（3割負担）', rows: [
    { item: '一般クリニック受診', cost: '1,000〜3,000円' },
    { item: '救急外来加算', cost: '+5,000〜10,000円' },
    { item: '入院（1日あたり）', cost: '5,000〜20,000円' },
    { item: '処方薬', cost: '200〜1,500円' },
  ]},
  { label: '保険なし（10割負担）', rows: [
    { item: '一般クリニック受診', cost: '3,000〜10,000円' },
    { item: '救急外来受診', cost: '15,000〜50,000円以上' },
    { item: '入院（1日あたり）', cost: '30,000〜100,000円以上' },
    { item: '手術（大手術）', cost: '500,000円以上' },
  ]},
]

const COST_TABLE_ZHT: CostGroup[] = [
  { label: '持NHI（自付30%）', rows: [
    { item: '普通診所就診', cost: '¥1,000–¥3,000' },
    { item: '急診（非緊急附加費）', cost: '+¥5,000–¥10,000' },
    { item: '住院（每日）', cost: '¥5,000–¥20,000' },
    { item: '處方藥', cost: '¥200–¥1,500' },
  ]},
  { label: '無保險（全額自付）', rows: [
    { item: '普通診所就診', cost: '¥3,000–¥10,000' },
    { item: '急診就診', cost: '¥15,000–¥50,000以上' },
    { item: '住院（每日）', cost: '¥30,000–¥100,000以上' },
    { item: '手術（大型）', cost: '¥500,000以上' },
  ]},
]

const COST_TABLE_KO: CostGroup[] = [
  { label: 'NHI 가입 (30% 본인부담)', rows: [
    { item: '일반 클리닉 방문', cost: '¥1,000–¥3,000' },
    { item: '응급실 (비응급 추가 요금)', cost: '+¥5,000–¥10,000' },
    { item: '입원 (1일)', cost: '¥5,000–¥20,000' },
    { item: '처방약', cost: '¥200–¥1,500' },
  ]},
  { label: '보험 없음 (100% 자기부담)', rows: [
    { item: '일반 클리닉 방문', cost: '¥3,000–¥10,000' },
    { item: '응급실 방문', cost: '¥15,000–¥50,000+' },
    { item: '입원 (1일)', cost: '¥30,000–¥100,000+' },
    { item: '수술 (대수술)', cost: '¥500,000+' },
  ]},
]

const COST_TABLE_ES: CostGroup[] = [
  { label: 'Con NHI (copago 30%)', rows: [
    { item: 'Visita estándar a clínica', cost: '¥1,000–¥3,000' },
    { item: 'Cargo extra urgencias (no emergencia)', cost: '+¥5,000–¥10,000' },
    { item: 'Ingreso hospitalario (por día)', cost: '¥5,000–¥20,000' },
    { item: 'Medicamentos recetados', cost: '¥200–¥1,500' },
  ]},
  { label: 'Sin seguro (100%)', rows: [
    { item: 'Visita estándar a clínica', cost: '¥3,000–¥10,000' },
    { item: 'Visita a urgencias', cost: '¥15,000–¥50,000+' },
    { item: 'Ingreso hospitalario (por día)', cost: '¥30,000–¥100,000+' },
    { item: 'Cirugía (mayor)', cost: '¥500,000+' },
  ]},
]

const COST_TABLE_FR: CostGroup[] = [
  { label: 'Avec NHI (30 % ticket modérateur)', rows: [
    { item: 'Visite standard en clinique', cost: '¥1 000–¥3 000' },
    { item: 'Supplément urgences (non urgence)', cost: '+¥5 000–¥10 000' },
    { item: 'Hospitalisation (par jour)', cost: '¥5 000–¥20 000' },
    { item: 'Médicaments sur ordonnance', cost: '¥200–¥1 500' },
  ]},
  { label: 'Sans assurance (100 %)', rows: [
    { item: 'Visite standard en clinique', cost: '¥3 000–¥10 000' },
    { item: 'Visite aux urgences', cost: '¥15 000–¥50 000+' },
    { item: 'Hospitalisation (par jour)', cost: '¥30 000–¥100 000+' },
    { item: 'Chirurgie (majeure)', cost: '¥500 000+' },
  ]},
]

const COST_TABLE_IT: CostGroup[] = [
  { label: 'Con NHI (ticket 30%)', rows: [
    { item: 'Visita ambulatoriale standard', cost: '¥1.000–¥3.000' },
    { item: 'Supplemento pronto soccorso (non urgenza)', cost: '+¥5.000–¥10.000' },
    { item: 'Ricovero ospedaliero (al giorno)', cost: '¥5.000–¥20.000' },
    { item: 'Farmaci prescritti', cost: '¥200–¥1.500' },
  ]},
  { label: 'Senza assicurazione (100%)', rows: [
    { item: 'Visita ambulatoriale standard', cost: '¥3.000–¥10.000' },
    { item: 'Visita al pronto soccorso', cost: '¥15.000–¥50.000+' },
    { item: 'Ricovero ospedaliero (al giorno)', cost: '¥30.000–¥100.000+' },
    { item: 'Intervento chirurgico (maggiore)', cost: '¥500.000+' },
  ]},
]

const COST_TABLE_TL: CostGroup[] = [
  { label: 'May NHI (30% co-pay)', rows: [
    { item: 'Karaniwang pagbisita sa klinika', cost: '¥1,000–¥3,000' },
    { item: 'Karagdagang bayad sa ER (hindi emergency)', cost: '+¥5,000–¥10,000' },
    { item: 'Hospitalization (bawat araw)', cost: '¥5,000–¥20,000' },
    { item: 'Gamot na may reseta', cost: '¥200–¥1,500' },
  ]},
  { label: 'Walang seguro (100%)', rows: [
    { item: 'Karaniwang pagbisita sa klinika', cost: '¥3,000–¥10,000' },
    { item: 'Pagbisita sa ER', cost: '¥15,000–¥50,000+' },
    { item: 'Hospitalization (bawat araw)', cost: '¥30,000–¥100,000+' },
    { item: 'Operasyon (malaki)', cost: '¥500,000+' },
  ]},
]

const COST_TABLE_ID: CostGroup[] = [
  { label: 'Dengan NHI (iuran 30%)', rows: [
    { item: 'Kunjungan klinik standar', cost: '¥1.000–¥3.000' },
    { item: 'Biaya tambahan UGD (bukan darurat)', cost: '+¥5.000–¥10.000' },
    { item: 'Rawat inap (per hari)', cost: '¥5.000–¥20.000' },
    { item: 'Obat resep', cost: '¥200–¥1.500' },
  ]},
  { label: 'Tanpa asuransi (100%)', rows: [
    { item: 'Kunjungan klinik standar', cost: '¥3.000–¥10.000' },
    { item: 'Kunjungan UGD', cost: '¥15.000–¥50.000+' },
    { item: 'Rawat inap (per hari)', cost: '¥30.000–¥100.000+' },
    { item: 'Operasi (besar)', cost: '¥500.000+' },
  ]},
]

const COST_TABLE_DE: CostGroup[] = [
  { label: 'Mit NHI (30 % Eigenanteil)', rows: [
    { item: 'Normaler Klinikbesuch', cost: '¥1.000–¥3.000' },
    { item: 'Notaufnahme-Aufschlag (nicht dringend)', cost: '+¥5.000–¥10.000' },
    { item: 'Krankenhausaufenthalt (pro Tag)', cost: '¥5.000–¥20.000' },
    { item: 'Verschriebene Medikamente', cost: '¥200–¥1.500' },
  ]},
  { label: 'Ohne Versicherung (100 %)', rows: [
    { item: 'Normaler Klinikbesuch', cost: '¥3.000–¥10.000' },
    { item: 'Notaufnahme-Besuch', cost: '¥15.000–¥50.000+' },
    { item: 'Krankenhausaufenthalt (pro Tag)', cost: '¥30.000–¥100.000+' },
    { item: 'Operation (größer)', cost: '¥500.000+' },
  ]},
]

const COST_TABLE_PT: CostGroup[] = [
  { label: 'Com NHI (copagamento 30%)', rows: [
    { item: 'Consulta padrão na clínica', cost: '¥1.500–¥3.000' },
    { item: 'Adicional pronto-socorro (não urgência)', cost: '+¥5.000–¥10.000' },
    { item: 'Internação (por dia)', cost: '¥5.000–¥20.000' },
    { item: 'Medicamentos prescritos', cost: '¥200–¥1.500' },
  ]},
  { label: 'Sem seguro (100%)', rows: [
    { item: 'Consulta padrão na clínica', cost: '¥3.000–¥10.000' },
    { item: 'Visita ao pronto-socorro', cost: '¥15.000–¥50.000+' },
    { item: 'Internação (por dia)', cost: '¥30.000–¥100.000+' },
    { item: 'Cirurgia (grande)', cost: '¥500.000+' },
  ]},
]

const COST_TABLE_RU: CostGroup[] = [
  { label: 'С NHI (сооплата 30%)', rows: [
    { item: 'Обычный визит в клинику', cost: '¥1 000–¥3 000' },
    { item: 'Надбавка за скорую помощь (не экстренная)', cost: '+¥5 000–¥10 000' },
    { item: 'Госпитализация (в сутки)', cost: '¥5 000–¥20 000' },
    { item: 'Рецептурные лекарства', cost: '¥200–¥1 500' },
  ]},
  { label: 'Без страховки (100%)', rows: [
    { item: 'Обычный визит в клинику', cost: '¥3 000–¥10 000' },
    { item: 'Визит в скорую помощь', cost: '¥15 000–¥50 000+' },
    { item: 'Госпитализация (в сутки)', cost: '¥30 000–¥100 000+' },
    { item: 'Операция (крупная)', cost: '¥500 000+' },
  ]},
]

const COST_MAP: Record<string, CostGroup[]> = {
  EN: COST_TABLE_EN, JP: COST_TABLE_JP,
  ZH: COST_TABLE_ZHT, 'ZH-T': COST_TABLE_ZHT, YUE: COST_TABLE_ZHT,
  KO: COST_TABLE_KO, ES: COST_TABLE_ES, FR: COST_TABLE_FR, IT: COST_TABLE_IT,
  TL: COST_TABLE_TL, ID: COST_TABLE_ID, DE: COST_TABLE_DE, PT: COST_TABLE_PT, RU: COST_TABLE_RU,
}

export default function InsurancePage() {
  const { lang } = useLang()
  const { residency } = useResidency()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const sections = SECTIONS_MAP[lang] ?? SECTIONS_EN
  const costTable = COST_MAP[lang] ?? COST_TABLE_EN
  const relevantSections = sections.filter(s => s.residency === null || s.residency === residency)

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
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#7a5700', fontVariationSettings: "'FILL' 1" as string }}>payments</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800 }}>{tl(TITLE, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28 }}>{tl(SUB, lang)}</p>

      {relevantSections.map((s, i) => (
        <section key={i} style={{ marginBottom: 24 }}>
          <div style={{ background: s.alert ? '#fef2f2' : s.warning ? '#fefce8' : '#fff', borderRadius: 14, padding: '18px 20px', border: `1px solid ${s.alert ? 'rgba(178,38,32,0.15)' : s.warning ? 'rgba(180,130,0,0.15)' : 'rgba(226,190,186,0.2)'}` }}>
            {(s.alert || s.warning) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: s.alert ? '#b22620' : '#7a5700', fontVariationSettings: "'FILL' 1" as string }}>warning</span>
                <span className="font-label" style={{ fontSize: 10, fontWeight: 700, color: s.alert ? '#b22620' : '#7a5700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {s.alert ? tl(IMPORTANT_LABEL, lang) : tl(ACTION_LABEL, lang)}
                </span>
              </div>
            )}
            <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, color: '#1e1b1c', marginBottom: 8 }}>{s.title}</h2>
            <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</p>
            {s.items.map((item, j) => (
              <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: s.alert ? '#b22620' : '#206777', flexShrink: 0, marginTop: 2 }}>check_small</span>
                <span style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section style={{ marginBottom: 24 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#1e1b1c' }}>
          {tl(COST_TITLE, lang)}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {costTable.map((group, gi) => (
            <div key={gi} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(226,190,186,0.2)' }}>
              <div style={{ padding: '8px 16px', background: gi === 0 ? '#f0fdf4' : '#fef2f2', borderBottom: '1px solid rgba(226,190,186,0.15)' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: gi === 0 ? '#16a34a' : '#b22620' }}>{group.label}</span>
              </div>
              {group.rows.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: ri < group.rows.length - 1 ? '1px solid rgba(226,190,186,0.1)' : 'none' }}>
                  <span style={{ fontSize: 13, color: '#5a413d' }}>{row.item}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c' }}>{row.cost}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div style={{ background: '#faf2f2', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)' }}>
        <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.6 }}>
          <strong>{tl(TIP_LABEL, lang)}</strong>
          {tl(TIP_BODY, lang)}
        </p>
      </div>
    </main>
  )
}
