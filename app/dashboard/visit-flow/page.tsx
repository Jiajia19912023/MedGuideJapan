'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '../lang-context'
import { useSaved } from '../saved-context'
import { tr, COMMON } from '../translations'

const ITEM = { href: '/dashboard/visit-flow', title: 'Visit Flow Guide', titleJP: '受診の流れガイド', icon: 'account_tree', color: '#1e1b1c' }
function tl(m: Record<string,string>, l: string) { return m[l] ?? m['EN'] }

const PAGE_TITLE = { EN: 'Visit Flow Guide', JP: '受診の流れガイド', ZH: '就医流程指南', 'ZH-T': '就醫流程指南', KO: '진료 흐름 안내', ES: 'Guía de Flujo de Visita', FR: 'Guide de Flux de Visite', IT: 'Guida al Flusso della Visita', TL: 'Gabay sa Daloy ng Pagbisita', ID: 'Panduan Alur Kunjungan', DE: 'Besuchsablauf-Leitfaden', PT: 'Guia de Fluxo de Visita', RU: 'Руководство по визиту' }
const PAGE_SUB  = { EN: 'Step-by-step guide for adults — emergency and non-emergency.', JP: '成人向け緊急・非緊急の受診ステップを図解で解説。', ZH: '成人紧急和非紧急情况的就医步骤图解。', 'ZH-T': '成人緊急和非緊急情況的就醫步驟圖解。', KO: '성인을 위한 응급 및 비응급 진료 단계별 안내.', ES: 'Guía paso a paso para emergencias y visitas rutinarias.', FR: 'Guide étape par étape pour urgences et visites routinières.', IT: 'Guida passo passo per emergenze e visite di routine.', TL: 'Hakbang-hakbang na gabay para sa mga emergensya at karaniwang pagbisita.', ID: 'Panduan langkah demi langkah untuk kedaruratan dan kunjungan rutin.', DE: 'Schritt-für-Schritt für Notfälle und Routinebesuche.', PT: 'Guia passo a passo para emergências e visitas rotineiras.', RU: 'Пошаговое руководство для экстренных и плановых визитов.' }

const BTN_ROUTINE   = { EN: 'Routine Visit', JP: '通常受診', ZH: '普通就诊', 'ZH-T': '普通就診', KO: '일반 진료', ES: 'Visita Rutinaria', FR: 'Visite Routinière', IT: 'Visita di Routine', TL: 'Karaniwang Pagbisita', ID: 'Kunjungan Rutin', DE: 'Routinebesuch', PT: 'Visita Rotineira', RU: 'Плановый визит' }
const BTN_EMERGENCY = { EN: 'Emergency', JP: '緊急時', ZH: '紧急情况', 'ZH-T': '緊急情況', KO: '응급 상황', ES: 'Emergencia', FR: 'Urgence', IT: 'Emergenza', TL: 'Emerhensya', ID: 'Darurat', DE: 'Notfall', PT: 'Emergência', RU: 'Экстренно' }
const WARN_119 = { EN: 'If life is at risk, call 119 immediately. Do not take time to read this guide.', JP: '命の危険がある場合はすぐに119番に電話してください。このガイドを読む時間はありません。', ZH: '如有生命危险，请立即拨打119。不要浪费时间阅读此指南。', 'ZH-T': '如有生命危險，請立即撥打119。不要浪費時間閱讀此指南。', KO: '생명이 위험한 경우 즉시 119에 전화하세요. 이 가이드를 읽을 시간이 없습니다.', ES: 'Si hay peligro de vida, llame al 119 inmediatamente.', FR: 'Si la vie est en danger, appelez le 119 immédiatement.', IT: 'Se c\'è pericolo di vita, chiama il 119 immediatamente.', TL: 'Kung may banta sa buhay, tumawag agad sa 119.', ID: 'Jika jiwa terancam, hubungi 119 segera.', DE: 'Lebensgefahr: Sofort 119 anrufen.', PT: 'Se há risco de vida, ligue 119 imediatamente.', RU: 'При угрозе жизни — немедленно звоните 119.' }
const H_NOTSURE = { EN: 'Not sure which path?', JP: '緊急か通常か判断に迷ったら？', ZH: '不确定该怎么做？', 'ZH-T': '不確定該怎麼做？', KO: '어떻게 해야 할지 모르겠다면?', ES: '¿No estás seguro del camino?', FR: 'Pas sûr de la voie à suivre?', IT: 'Non sei sicuro della strada?', TL: 'Hindi sigurado kung anong landas?', ID: 'Tidak yakin harus ke mana?', DE: 'Nicht sicher welchen Weg?', PT: 'Não sabe qual caminho?', RU: 'Не уверены, что выбрать?' }
const LBL_STEP = { EN: 'Step', JP: 'ステップ', ZH: '步骤', 'ZH-T': '步驟', KO: '단계', ES: 'Paso', FR: 'Étape', IT: 'Passaggio', TL: 'Hakbang', ID: 'Langkah', DE: 'Schritt', PT: 'Passo', RU: 'Шаг' }
const LBL_DECISION = { EN: 'Decision', JP: '判断', ZH: '判断', 'ZH-T': '判斷', KO: '판단', ES: 'Decisión', FR: 'Décision', IT: 'Decisione', TL: 'Desisyon', ID: 'Keputusan', DE: 'Entscheidung', PT: 'Decisão', RU: 'Решение' }
const LBL_HEALTH_CHECK = { EN: 'Use the Health Check Tool', JP: '健康チェックツールを使う', ZH: '使用健康检查工具', 'ZH-T': '使用健康檢查工具', KO: '건강 체크 도구 사용', ES: 'Usar la herramienta de chequeo', FR: 'Utiliser l\'outil de bilan santé', IT: 'Usa lo strumento di controllo salute', TL: 'Gamitin ang Health Check Tool', ID: 'Gunakan Alat Pemeriksaan Kesehatan', DE: 'Gesundheitscheck-Tool nutzen', PT: 'Usar a ferramenta de verificação de saúde', RU: 'Использовать инструмент проверки здоровья' }
const LBL_PHRASES = { EN: 'See Medical Japanese Phrases', JP: '医療日本語フレーズ集を見る', ZH: '查看医疗日语短语集', 'ZH-T': '查看醫療日語短語集', KO: '의료 일본어 표현집 보기', ES: 'Ver frases médicas en japonés', FR: 'Voir les phrases médicales japonaises', IT: 'Vedi le frasi mediche in giapponese', TL: 'Tingnan ang Medical Japanese Phrases', ID: 'Lihat Frasa Medis Bahasa Jepang', DE: 'Medizinische japanische Phrasen ansehen', PT: 'Ver frases médicas em japonês', RU: 'Посмотреть медицинские фразы на японском' }

type FlowType = 'emergency' | 'non-emergency'

const EMERGENCY_STEPS: Record<string, { step: number; icon: string; color: string; title: string; desc: string; action?: string; note?: string; isDecision?: boolean }[]> = {
  EN: [
    { step: 1, icon: 'priority_high', color: '#b22620', title: 'Is it life-threatening?', desc: 'Unconscious, not breathing, severe bleeding, suspected stroke or heart attack, major trauma.', action: 'YES → proceed below', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: 'Call 119', desc: 'Say: "Kyūkyū desu" (救急です). Give your address. Stay on the line. The dispatcher will guide you.', note: 'Ambulances are FREE to dispatch in Japan (hospital fees apply later).' },
    { step: 3, icon: 'door_front', color: '#7a5700', title: 'While waiting for the ambulance', desc: 'Keep the patient still and warm. Do not give food or water. Unlock the front door. Gather insurance card and any medications.' },
    { step: 4, icon: 'local_hospital', color: '#206777', title: 'Arrive at the ER (救急外来)', desc: 'The ambulance takes you to the nearest hospital equipped to treat the condition. You cannot choose the hospital.' },
    { step: 5, icon: 'medical_services', color: '#206777', title: 'Triage and Treatment', desc: 'A triage nurse assesses severity (Level 1–5). Life-threatening cases are treated immediately. You may wait if non-critical after initial assessment.' },
    { step: 6, icon: 'payments', color: '#374151', title: 'Payment', desc: 'Pay at discharge. With NHI: 30% co-pay + emergency surcharge (¥5,000–¥10,000). Without insurance: full cost. Major hospitals accept credit cards.' },
  ],
  JP: [
    { step: 1, icon: 'priority_high', color: '#b22620', title: '生命の危険がありますか？', desc: '意識なし・呼吸停止・大量出血・脳卒中・心臓発作・重大な外傷など。', action: 'YES → 以下へ進む', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: '119番に電話する', desc: '「救急です」と伝え、住所を告げてください。電話を切らずにオペレーターの指示に従ってください。', note: '日本の救急車の出動は無料です（その後の医療費は別途かかります）。' },
    { step: 3, icon: 'door_front', color: '#7a5700', title: '救急車を待つ間にすること', desc: '患者を安静に保ち、暖かくしてください。飲食は与えないこと。玄関の鍵を開けておく。保険証と服用中の薬を準備しておく。' },
    { step: 4, icon: 'local_hospital', color: '#206777', title: '救急外来に到着', desc: '救急車は症状に対応できる最寄りの病院に搬送します。病院を選ぶことはできません。' },
    { step: 5, icon: 'medical_services', color: '#206777', title: 'トリアージと治療', desc: 'トリアージナースが重症度（レベル1〜5）を評価します。生命に関わる場合は即時対応。最初の評価後に緊急性が低いと判断された場合は待機となることもあります。' },
    { step: 6, icon: 'payments', color: '#374151', title: '会計・支払い', desc: '退院・退室時に支払い。NHI加入時：3割負担＋救急加算（5,000〜10,000円）。未加入時：全額負担。大病院ではクレジットカード可。' },
  ],
  ZH: [
    { step: 1, icon: 'priority_high', color: '#b22620', title: '是否有生命危险？', desc: '意识丧失、停止呼吸、大量出血、疑似中风或心脏病发作、重大外伤等。', action: '是 → 继续以下步骤', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: '拨打119', desc: '说：「救急です（Kyūkyū desu）」，提供您的地址，保持通话，调度员会给予指导。', note: '日本救护车出动免费（之后的医疗费用另计）。' },
    { step: 3, icon: 'door_front', color: '#7a5700', title: '等待救护车期间', desc: '让患者保持安静和温暖。不要给予食物或水。打开前门。准备好保险卡和正在服用的药物。' },
    { step: 4, icon: 'local_hospital', color: '#206777', title: '到达急诊室（救急外来）', desc: '救护车会将您送往最近的有能力处理该病情的医院，无法自行选择医院。' },
    { step: 5, icon: 'medical_services', color: '#206777', title: '分诊与治疗', desc: '分诊护士评估病情严重程度（1至5级）。危及生命的情况会立即处理。初步评估后非危重患者可能需要等待。' },
    { step: 6, icon: 'payments', color: '#374151', title: '费用支付', desc: '出院时支付。持NHI：30%自付+急救附加费（5,000至10,000日元）。无保险：全额自付。大型医院接受信用卡。' },
  ],
  KO: [
    { step: 1, icon: 'priority_high', color: '#b22620', title: '생명을 위협하는 상황인가요?', desc: '의식 없음, 호흡 정지, 심한 출혈, 뇌졸중 또는 심장마비 의심, 중대한 외상 등.', action: '예 → 아래로 진행', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: '119에 전화', desc: '"Kyūkyū desu（救急です）"라고 말하고 주소를 알려주세요. 전화를 끊지 말고 지시에 따르세요.', note: '일본 구급차 출동은 무료입니다(이후 병원비는 별도).' },
    { step: 3, icon: 'door_front', color: '#7a5700', title: '구급차 기다리는 동안', desc: '환자를 안정시키고 따뜻하게 해주세요. 음식이나 물을 주지 마세요. 현관문을 열어두고 보험증과 복용 중인 약을 준비하세요.' },
    { step: 4, icon: 'local_hospital', color: '#206777', title: '응급실(救急外来) 도착', desc: '구급차는 해당 증상을 처치할 수 있는 가장 가까운 병원으로 이송합니다. 병원을 선택할 수 없습니다.' },
    { step: 5, icon: 'medical_services', color: '#206777', title: '중증도 분류 및 치료', desc: '분류 간호사가 중증도(레벨 1~5)를 평가합니다. 생명을 위협하는 경우 즉시 처치합니다. 초기 평가 후 비위급 환자는 대기할 수 있습니다.' },
    { step: 6, icon: 'payments', color: '#374151', title: '비용 지불', desc: '퇴원 시 결제. NHI 가입: 30% 자부담 + 응급 가산(5,000~10,000엔). 미가입: 전액 부담. 대형 병원은 신용카드 가능.' },
  ],
  'ZH-T': [
    { step: 1, icon: 'priority_high', color: '#b22620', title: '是否有生命危險？', desc: '意識喪失、停止呼吸、大量出血、疑似中風或心臟病發作、重大外傷等。', action: '是 → 繼續以下步驟', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: '撥打119', desc: '說：「救急です（Kyūkyū desu）」，提供您的地址，保持通話，調度員會給予指導。', note: '日本救護車出動免費（之後的醫療費用另計）。' },
    { step: 3, icon: 'door_front', color: '#7a5700', title: '等待救護車期間', desc: '讓患者保持安靜和溫暖。不要給予食物或水。打開前門。準備好保險卡和正在服用的藥物。' },
    { step: 4, icon: 'local_hospital', color: '#206777', title: '到達急診室（救急外来）', desc: '救護車會將您送往最近的有能力處理該病情的醫院，無法自行選擇醫院。' },
    { step: 5, icon: 'medical_services', color: '#206777', title: '分診與治療', desc: '分診護士評估病情嚴重程度（1至5級）。危及生命的情況會立即處理。初步評估後非危重患者可能需要等待。' },
    { step: 6, icon: 'payments', color: '#374151', title: '費用支付', desc: '出院時支付。持NHI：30%自付+急救附加費（5,000至10,000日元）。無保險：全額自付。大型醫院接受信用卡。' },
  ],
  ES: [
    { step: 1, icon: 'priority_high', color: '#b22620', title: '¿Hay riesgo de vida?', desc: 'Inconsciente, sin respiración, hemorragia grave, posible derrame cerebral o infarto, trauma grave.', action: 'SÍ → continúa abajo', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: 'Llama al 119', desc: 'Di: "Kyūkyū desu" (救急です). Da tu dirección. Mantente en la línea. El operador te guiará.', note: 'El envío de ambulancias es GRATUITO en Japón (los gastos hospitalarios se aplican después).' },
    { step: 3, icon: 'door_front', color: '#7a5700', title: 'Mientras esperas la ambulancia', desc: 'Mantén al paciente quieto y abrigado. No le des comida ni agua. Abre la puerta principal. Reúne la tarjeta de seguro y los medicamentos.' },
    { step: 4, icon: 'local_hospital', color: '#206777', title: 'Llegada a urgencias (救急外来)', desc: 'La ambulancia te lleva al hospital más cercano equipado para tratar la condición. No puedes elegir el hospital.' },
    { step: 5, icon: 'medical_services', color: '#206777', title: 'Triaje y tratamiento', desc: 'Una enfermera de triaje evalúa la gravedad (Nivel 1–5). Los casos de riesgo vital se tratan de inmediato. Puede haber espera si no es crítico tras la evaluación inicial.' },
    { step: 6, icon: 'payments', color: '#374151', title: 'Pago', desc: 'Paga al alta. Con NHI: 30% copago + recargo de urgencias (¥5,000–¥10,000). Sin seguro: coste completo. Los grandes hospitales aceptan tarjeta de crédito.' },
  ],
  FR: [
    { step: 1, icon: 'priority_high', color: '#b22620', title: "Y a-t-il un risque vital?", desc: 'Inconscient, ne respire pas, saignement grave, AVC ou infarctus suspects, traumatisme grave.', action: 'OUI → continuez ci-dessous', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: 'Appelez le 119', desc: 'Dites: "Kyūkyū desu" (救急です). Donnez votre adresse. Restez en ligne. Le régulateur vous guidera.', note: "L'envoi d'une ambulance est GRATUIT au Japon (les frais hospitaliers s'appliquent ensuite)." },
    { step: 3, icon: 'door_front', color: '#7a5700', title: "En attendant l'ambulance", desc: "Gardez le patient immobile et au chaud. Ne donnez pas à manger ni à boire. Déverrouillez la porte. Préparez la carte d'assurance et les médicaments." },
    { step: 4, icon: 'local_hospital', color: '#206777', title: 'Arrivée aux urgences (救急外来)', desc: "L'ambulance vous emmène à l'hôpital le plus proche équipé pour traiter la condition. Vous ne pouvez pas choisir l'hôpital." },
    { step: 5, icon: 'medical_services', color: '#206777', title: 'Triage et traitement', desc: "Une infirmière de triage évalue la gravité (Niveau 1–5). Les cas vitaux sont traités immédiatement. Vous pouvez attendre si non critique après l'évaluation initiale." },
    { step: 6, icon: 'payments', color: '#374151', title: 'Paiement', desc: "Payez à la sortie. Avec NHI: 30% ticket modérateur + supplément urgences (¥5 000–¥10 000). Sans assurance: coût total. Les grands hôpitaux acceptent les cartes bancaires." },
  ],
  IT: [
    { step: 1, icon: 'priority_high', color: '#b22620', title: "C'è rischio di vita?", desc: 'Incosciente, non respira, emorragia grave, possibile ictus o infarto, trauma grave.', action: 'SÌ → procedi sotto', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: 'Chiama il 119', desc: 'Di\': "Kyūkyū desu" (救急です). Dai il tuo indirizzo. Resta in linea. Il centralinista ti guiderà.', note: "L'invio dell'ambulanza è GRATUITO in Giappone (le spese ospedaliere si applicano dopo)." },
    { step: 3, icon: 'door_front', color: '#7a5700', title: "Mentre aspetti l'ambulanza", desc: "Tieni il paziente fermo e al caldo. Non dargli cibo né acqua. Apri la porta d'ingresso. Prepara la tessera assicurativa e i farmaci." },
    { step: 4, icon: 'local_hospital', color: '#206777', title: 'Arrivo al pronto soccorso (救急外来)', desc: "L'ambulanza ti porta all'ospedale più vicino attrezzato per trattare la condizione. Non puoi scegliere l'ospedale." },
    { step: 5, icon: 'medical_services', color: '#206777', title: 'Triage e trattamento', desc: "Un infermiere di triage valuta la gravità (Livello 1–5). I casi salvavita vengono trattati immediatamente. Potresti aspettare se non critico dopo la valutazione iniziale." },
    { step: 6, icon: 'payments', color: '#374151', title: 'Pagamento', desc: "Paga alla dimissione. Con NHI: 30% ticket + supplemento urgenze (¥5.000–¥10.000). Senza assicurazione: costo totale. I grandi ospedali accettano carte di credito." },
  ],
  TL: [
    { step: 1, icon: 'priority_high', color: '#b22620', title: 'May banta ba sa buhay?', desc: 'Walang malay, hindi humihinga, matinding pagdurugo, pinaghihinalaang stroke o atake sa puso, malubhang trauma.', action: 'OO → magpatuloy sa ibaba', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: 'Tumawag sa 119', desc: 'Sabihin: "Kyūkyū desu" (救急です). Ibigay ang iyong address. Manatili sa linya. Gagabayan ka ng dispatcher.', note: 'Ang pagpapadala ng ambulansya ay LIBRE sa Japan (ang bayarin sa ospital ay applicable pagkatapos).' },
    { step: 3, icon: 'door_front', color: '#7a5700', title: 'Habang hinihintay ang ambulansya', desc: 'Panatilihing tahimik at mainit ang pasyente. Huwag magbigay ng pagkain o tubig. Buksan ang pintuan. Ihanda ang insurance card at mga gamot.' },
    { step: 4, icon: 'local_hospital', color: '#206777', title: 'Pagdating sa ER (救急外来)', desc: 'Dadalhin ka ng ambulansya sa pinakamalapit na ospital na may kakayahang gamutin ang kondisyon. Hindi mo maaaring piliin ang ospital.' },
    { step: 5, icon: 'medical_services', color: '#206777', title: 'Triage at paggamot', desc: 'Sinusuri ng triage nurse ang kalubhaan (Antas 1–5). Ang mga banta sa buhay ay ginagamot agad. Maaaring maghintay kung hindi kritikal pagkatapos ng unang pagtatasa.' },
    { step: 6, icon: 'payments', color: '#374151', title: 'Bayad', desc: 'Bayaran sa pag-alis. Sa NHI: 30% co-pay + emergency surcharge (¥5,000–¥10,000). Walang insurance: buong halaga. Tumatanggap ng credit card ang malalaking ospital.' },
  ],
  ID: [
    { step: 1, icon: 'priority_high', color: '#b22620', title: 'Apakah ada ancaman jiwa?', desc: 'Tidak sadar, tidak bernapas, pendarahan hebat, diduga stroke atau serangan jantung, trauma berat.', action: 'YA → lanjutkan di bawah', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: 'Hubungi 119', desc: 'Katakan: "Kyūkyū desu" (救急です). Berikan alamat Anda. Tetap di telepon. Petugas akan membimbing Anda.', note: 'Pengiriman ambulans GRATIS di Jepang (biaya rumah sakit berlaku setelahnya).' },
    { step: 3, icon: 'door_front', color: '#7a5700', title: 'Saat menunggu ambulans', desc: 'Jaga pasien tetap diam dan hangat. Jangan berikan makanan atau minuman. Buka pintu depan. Siapkan kartu asuransi dan obat-obatan.' },
    { step: 4, icon: 'local_hospital', color: '#206777', title: 'Tiba di UGD (救急外来)', desc: 'Ambulans membawa Anda ke rumah sakit terdekat yang mampu menangani kondisi tersebut. Anda tidak dapat memilih rumah sakit.' },
    { step: 5, icon: 'medical_services', color: '#206777', title: 'Triase dan pengobatan', desc: 'Perawat triase menilai keparahan (Tingkat 1–5). Kasus yang mengancam jiwa ditangani segera. Anda mungkin menunggu jika tidak kritis setelah penilaian awal.' },
    { step: 6, icon: 'payments', color: '#374151', title: 'Pembayaran', desc: 'Bayar saat keluar. Dengan NHI: 30% co-pay + biaya tambahan darurat (¥5.000–¥10.000). Tanpa asuransi: biaya penuh. Rumah sakit besar menerima kartu kredit.' },
  ],
  DE: [
    { step: 1, icon: 'priority_high', color: '#b22620', title: 'Besteht Lebensgefahr?', desc: 'Bewusstlos, nicht atmend, schwere Blutung, Verdacht auf Schlaganfall oder Herzinfarkt, schweres Trauma.', action: 'JA → weiter unten', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: 'Rufen Sie 119 an', desc: 'Sagen Sie: "Kyūkyū desu" (救急です). Geben Sie Ihre Adresse an. Bleiben Sie in der Leitung. Der Disponent wird Sie anleiten.', note: 'Der Einsatz von Rettungswagen ist in Japan KOSTENLOS (Krankenhauskosten fallen danach an).' },
    { step: 3, icon: 'door_front', color: '#7a5700', title: 'Während Sie auf den Rettungswagen warten', desc: 'Halten Sie den Patienten ruhig und warm. Geben Sie nichts zu essen oder trinken. Öffnen Sie die Eingangstür. Bereiten Sie Versicherungskarte und Medikamente vor.' },
    { step: 4, icon: 'local_hospital', color: '#206777', title: 'Ankunft in der Notaufnahme (救急外来)', desc: 'Der Rettungswagen bringt Sie in das nächste geeignete Krankenhaus. Sie können das Krankenhaus nicht selbst wählen.' },
    { step: 5, icon: 'medical_services', color: '#206777', title: 'Triage und Behandlung', desc: 'Eine Triagepflegerin bewertet den Schweregrad (Stufe 1–5). Lebensgefährliche Fälle werden sofort behandelt. Bei nicht-kritischem Befund können Wartezeiten entstehen.' },
    { step: 6, icon: 'payments', color: '#374151', title: 'Zahlung', desc: 'Zahlen Sie bei der Entlassung. Mit NHI: 30% Eigenanteil + Notaufnahme-Zuschlag (¥5.000–¥10.000). Ohne Versicherung: voller Betrag. Große Krankenhäuser akzeptieren Kreditkarten.' },
  ],
  PT: [
    { step: 1, icon: 'priority_high', color: '#b22620', title: 'Há risco de vida?', desc: 'Inconsciente, sem respiração, sangramento grave, suspeita de derrame ou infarto, trauma grave.', action: 'SIM → continue abaixo', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: 'Ligue 119', desc: 'Diga: "Kyūkyū desu" (救急です). Informe seu endereço. Permaneça na linha. O atendente irá orientá-lo.', note: 'O acionamento de ambulâncias é GRATUITO no Japão (taxas hospitalares se aplicam depois).' },
    { step: 3, icon: 'door_front', color: '#7a5700', title: 'Enquanto aguarda a ambulância', desc: 'Mantenha o paciente quieto e aquecido. Não dê comida nem água. Desbloqueie a porta da frente. Separe cartão de seguro e medicamentos.' },
    { step: 4, icon: 'local_hospital', color: '#206777', title: 'Chegada ao PS (救急外来)', desc: 'A ambulância leva você ao hospital mais próximo equipado para tratar a condição. Você não pode escolher o hospital.' },
    { step: 5, icon: 'medical_services', color: '#206777', title: 'Triagem e tratamento', desc: 'Um enfermeiro de triagem avalia a gravidade (Nível 1–5). Casos com risco de vida são tratados imediatamente. Você pode aguardar se não for crítico após a avaliação inicial.' },
    { step: 6, icon: 'payments', color: '#374151', title: 'Pagamento', desc: 'Pague na alta. Com NHI: 30% copagamento + sobretaxa de emergência (¥5.000–¥10.000). Sem seguro: custo total. Hospitais maiores aceitam cartão de crédito.' },
  ],
  RU: [
    { step: 1, icon: 'priority_high', color: '#b22620', title: 'Есть угроза жизни?', desc: 'Без сознания, не дышит, сильное кровотечение, подозрение на инсульт или инфаркт, тяжёлая травма.', action: 'ДА → продолжайте ниже', isDecision: true },
    { step: 2, icon: 'call', color: '#b22620', title: 'Звоните 119', desc: 'Скажите: "Kyūkyū desu" (救急です). Назовите адрес. Оставайтесь на линии. Диспетчер даст указания.', note: 'Вызов скорой помощи в Японии БЕСПЛАТНЫЙ (больничные расходы начисляются после).' },
    { step: 3, icon: 'door_front', color: '#7a5700', title: 'Пока ждёте скорую', desc: 'Не двигайте пациента, держите его в тепле. Не давайте еду или воду. Откройте входную дверь. Приготовьте страховую карту и лекарства.' },
    { step: 4, icon: 'local_hospital', color: '#206777', title: 'Приёмный покой (救急外来)', desc: 'Скорая доставит вас в ближайшую больницу, способную оказать помощь. Выбрать больницу самостоятельно нельзя.' },
    { step: 5, icon: 'medical_services', color: '#206777', title: 'Сортировка и лечение', desc: 'Медсестра оценивает тяжесть состояния (Уровень 1–5). Жизнеугрожающие случаи лечат немедленно. Не критические — могут ждать после первичной оценки.' },
    { step: 6, icon: 'payments', color: '#374151', title: 'Оплата', desc: 'Оплата при выписке. С NHI: 30% доплата + экстренная надбавка (¥5 000–¥10 000). Без страховки: полная стоимость. Крупные больницы принимают кредитные карты.' },
  ],
}

const ROUTINE_STEPS: Record<string, { step: number; icon: string; color: string; title: string; desc: string; note?: string }[]> = {
  EN: [
    { step: 1, icon: 'help', color: '#206777', title: 'Identify your symptoms', desc: 'Fever, cold, pain, rash, or ongoing condition? Use the Health Check tool if unsure, or check which specialty (診療科) treats your symptoms.' },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: 'Find a nearby clinic (クリニック)', desc: 'Use Google Maps → search "内科 near me" or your symptom in Japanese. No referral or GP registration needed — walk in directly.', note: 'Most clinics open 9:00 AM. Arrive early to reduce wait time.' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: 'Prepare what to bring', desc: 'Insurance card (保険証), cash ¥3,000–¥10,000, list of current medications (薬リスト), and the Preparation Checklist from this app.' },
    { step: 4, icon: 'door_front', color: '#7a5700', title: 'At reception (受付)', desc: 'Hand in your insurance card and fill out a form (問診票) listing symptoms and medical history. Many clinics have English or multilingual forms.' },
    { step: 5, icon: 'chair', color: '#374151', title: 'Wait to be called', desc: 'Your name or number will be called. Wait time: 15–60 min at small clinics, 1–3 hours at hospitals.' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: 'See the doctor', desc: 'Describe your symptoms. Use the Phrases page if needed. The doctor may order tests, give a diagnosis, prescribe medicine, or issue a referral letter.' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: 'Receive prescription (処方箋)', desc: 'Take your 処方箋 to any pharmacy (薬局). Valid for 4 days only. With NHI, medicine costs ¥200–¥1,500.' },
    { step: 8, icon: 'payments', color: '#374151', title: 'Pay at the clinic', desc: 'Clinic counter: pay your co-pay (30% with NHI). Total typical visit: ¥1,000–¥3,000 with insurance.' },
  ],
  JP: [
    { step: 1, icon: 'help', color: '#206777', title: '症状を確認する', desc: '発熱・風邪・痛み・発疹・慢性疾患など。どれかわからない場合は健康チェックツールを使うか、症状に対応する診療科を確認してください。' },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: '近くのクリニックを探す', desc: 'Googleマップで「内科 近く」または症状を検索。かかりつけ医の登録や紹介状は不要です。予約なしで直接行けます。', note: '多くのクリニックは9時開院。待ち時間を減らすには早めの到着がおすすめ。' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: '持ち物を準備する', desc: '保険証・現金（3,000〜10,000円）・服用中の薬リスト・このアプリの準備チェックリストを確認しましょう。' },
    { step: 4, icon: 'door_front', color: '#7a5700', title: '受付で手続きをする', desc: '保険証を提示し、症状や既往歴を記入する問診票に記入します。英語・多言語対応の問診票があるクリニックも増えています。' },
    { step: 5, icon: 'chair', color: '#374151', title: '呼ばれるまで待機', desc: '名前または番号で呼ばれます。待ち時間の目安：小さいクリニックで15〜60分、病院では1〜3時間。' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: '診察を受ける', desc: '症状を説明してください。フレーズ集も活用できます。医師が検査・診断・処方箋の発行または紹介状を発行します。' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: '処方箋を受け取る', desc: '処方箋は任意の薬局（院外薬局可）で受け取れます。有効期限は4日間。NHI加入時の薬代は200〜1,500円程度。' },
    { step: 8, icon: 'payments', color: '#374151', title: '会計・支払い', desc: '診察後に窓口で支払い。NHI加入時の通常受診は1,000〜3,000円程度。' },
  ],
  ZH: [
    { step: 1, icon: 'help', color: '#206777', title: '确认症状', desc: '发烧、感冒、疼痛、皮疹或慢性病？不确定时可使用健康检查工具，或查询哪个科室处理您的症状。' },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: '查找附近诊所（クリニック）', desc: '在Google地图搜索"内科 near me"或用日语搜索症状。无需转诊或注册家庭医生，可直接前往。', note: '大多数诊所9点开诊，建议早到以减少等待时间。' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: '准备携带物品', desc: '保险卡（保険証）、现金3,000至10,000日元、当前用药清单（薬リスト），以及本应用的准备检查清单。' },
    { step: 4, icon: 'door_front', color: '#7a5700', title: '在前台（受付）办理', desc: '出示保险卡，填写列有症状和病史的问诊表（問診票）。许多诊所提供英语或多语言表格。' },
    { step: 5, icon: 'chair', color: '#374151', title: '等待叫号', desc: '会按姓名或号码叫诊。等待时间参考：小诊所15至60分钟，医院1至3小时。' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: '接受诊察', desc: '描述您的症状。如需要可使用短语集。医生可能会安排检查、给出诊断、开具处方或转诊信。' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: '领取处方单（処方箋）', desc: '持処方箋前往任意薬局（药局）取药，有效期仅4天。持NHI时药费约200至1,500日元。' },
    { step: 8, icon: 'payments', color: '#374151', title: '支付费用', desc: '诊察结束后在窗口付款。持NHI时普通就诊总费用约1,000至3,000日元。' },
  ],
  KO: [
    { step: 1, icon: 'help', color: '#206777', title: '증상 확인', desc: '발열, 감기, 통증, 발진, 만성 질환 등? 잘 모르면 건강 체크 도구를 사용하거나 증상에 맞는 진료과를 확인하세요.' },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: '근처 클리닉(クリニック) 찾기', desc: 'Google 지도에서 "내과 near me" 또는 증상을 일본어로 검색하세요. 의뢰서나 가정의 등록 없이 바로 방문 가능합니다.', note: '대부분 클리닉은 오전 9시 개원. 대기 시간을 줄이려면 일찍 도착하세요.' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: '지참물 준비', desc: '보험증(保険証), 현금 3,000~10,000엔, 복용 중인 약 목록(薬リスト), 그리고 이 앱의 준비 체크리스트를 확인하세요.' },
    { step: 4, icon: 'door_front', color: '#7a5700', title: '접수처(受付)에서 절차', desc: '보험증을 제출하고 증상과 병력을 기재한 문진표(問診票)를 작성하세요. 영어 또는 다국어 문진표를 제공하는 클리닉도 많습니다.' },
    { step: 5, icon: 'chair', color: '#374151', title: '호명 대기', desc: '이름이나 번호로 호출됩니다. 대기 시간 기준: 소형 클리닉 15~60분, 병원 1~3시간.' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: '진료 받기', desc: '증상을 설명하세요. 필요하면 표현집을 이용하세요. 의사가 검사, 진단, 처방전 또는 의뢰서를 발행할 수 있습니다.' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: '처방전(処方箋) 수령', desc: '処方箋을 약국(薬局) 어디서나 사용할 수 있습니다. 유효기간은 4일. NHI 가입 시 약값은 200~1,500엔.' },
    { step: 8, icon: 'payments', color: '#374151', title: '비용 지불', desc: '진료 후 창구에서 결제. NHI 가입 시 일반 진료 총비용은 1,000~3,000엔 정도.' },
  ],
  'ZH-T': [
    { step: 1, icon: 'help', color: '#206777', title: '確認症狀', desc: '發燒、感冒、疼痛、皮疹或慢性病？不確定時可使用健康檢查工具，或查詢哪個科室處理您的症狀。' },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: '查找附近診所（クリニック）', desc: '在Google地圖搜索「内科 near me」或用日語搜索症狀。無需轉診或登記家庭醫生，可直接前往。', note: '大多數診所9點開診，建議早到以減少等待時間。' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: '準備攜帶物品', desc: '保險卡（保険証）、現金3,000至10,000日元、當前用藥清單（薬リスト），以及本應用的準備清單。' },
    { step: 4, icon: 'door_front', color: '#7a5700', title: '在前台（受付）辦理', desc: '出示保險卡，填寫列有症狀和病史的問診表（問診票）。許多診所提供英語或多語言表格。' },
    { step: 5, icon: 'chair', color: '#374151', title: '等待叫號', desc: '會按姓名或號碼叫診。等待時間參考：小診所15至60分鐘，醫院1至3小時。' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: '接受診察', desc: '描述您的症狀。如需要可使用短語集。醫生可能會安排檢查、給出診斷、開具處方或轉診信。' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: '領取處方單（処方箋）', desc: '持処方箋前往任意藥局取藥，有效期僅4天。持NHI時藥費約200至1,500日元。' },
    { step: 8, icon: 'payments', color: '#374151', title: '支付費用', desc: '診察結束後在窗口付款。持NHI時普通就診總費用約1,000至3,000日元。' },
  ],
  ES: [
    { step: 1, icon: 'help', color: '#206777', title: 'Identifica tus síntomas', desc: '¿Fiebre, resfriado, dolor, sarpullido o condición crónica? Usa la herramienta de chequeo si no estás seguro, o averigua qué especialidad trata tus síntomas.' },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: 'Encuentra una clínica cercana (クリニック)', desc: 'Busca en Google Maps "内科 near me" o tu síntoma en japonés. No necesitas derivación ni registro previo — ve directamente.', note: 'La mayoría de clínicas abren a las 9:00. Llega temprano para reducir la espera.' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: 'Prepara lo que vas a llevar', desc: 'Tarjeta de seguro (保険証), efectivo ¥3,000–¥10,000, lista de medicamentos actuales (薬リスト) y la Lista de Preparación de esta app.' },
    { step: 4, icon: 'door_front', color: '#7a5700', title: 'En recepción (受付)', desc: 'Entrega tu tarjeta de seguro y rellena un formulario (問診票) con síntomas e historial. Muchas clínicas tienen formularios en inglés o multilingüe.' },
    { step: 5, icon: 'chair', color: '#374151', title: 'Espera a ser llamado', desc: 'Te llamarán por tu nombre o número. Espera: 15–60 min en clínicas pequeñas, 1–3 horas en hospitales.' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: 'Consulta con el médico', desc: 'Describe tus síntomas. Usa la página de Frases si la necesitas. El médico puede pedir pruebas, dar un diagnóstico, recetar o emitir una carta de derivación.' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: 'Recibe la receta (処方箋)', desc: 'Lleva tu 処方箋 a cualquier farmacia (薬局). Válida solo 4 días. Con NHI, los medicamentos cuestan ¥200–¥1,500.' },
    { step: 8, icon: 'payments', color: '#374151', title: 'Paga en la clínica', desc: 'Paga tu copago (30% con NHI) en el mostrador. Visita típica total: ¥1,000–¥3,000 con seguro.' },
  ],
  FR: [
    { step: 1, icon: 'help', color: '#206777', title: 'Identifiez vos symptômes', desc: "Fièvre, rhume, douleur, éruption ou maladie chronique? Utilisez l'outil de bilan santé si vous n'êtes pas sûr, ou cherchez quelle spécialité traite vos symptômes." },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: 'Trouvez une clinique (クリニック) proche', desc: 'Cherchez sur Google Maps "内科 near me" ou votre symptôme en japonais. Pas besoin de rendez-vous ni d\'inscription — allez directement.', note: 'La plupart des cliniques ouvrent à 9h. Arrivez tôt pour réduire l\'attente.' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: 'Préparez ce que vous emportez', desc: "Carte d'assurance (保険証), espèces ¥3 000–¥10 000, liste des médicaments actuels (薬リスト) et la liste de préparation de cette app." },
    { step: 4, icon: 'door_front', color: '#7a5700', title: 'À la réception (受付)', desc: "Remettez votre carte d'assurance et remplissez un formulaire (問診票) avec symptômes et antécédents. Beaucoup de cliniques ont des formulaires en anglais ou multilingues." },
    { step: 5, icon: 'chair', color: '#374151', title: 'Attendez d\'être appelé', desc: 'Votre nom ou numéro sera appelé. Attente: 15–60 min dans les petites cliniques, 1–3 heures à l\'hôpital.' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: 'Consultez le médecin', desc: 'Décrivez vos symptômes. Utilisez la page Phrases si besoin. Le médecin peut prescrire des examens, poser un diagnostic, rédiger une ordonnance ou une lettre de référence.' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: "Recevez l'ordonnance (処方箋)", desc: 'Apportez votre 処方箋 dans n\'importe quelle pharmacie (薬局). Valable 4 jours seulement. Avec NHI, les médicaments coûtent ¥200–¥1 500.' },
    { step: 8, icon: 'payments', color: '#374151', title: 'Payez à la clinique', desc: 'Payez votre ticket modérateur (30% avec NHI) au comptoir. Visite typique: ¥1 000–¥3 000 avec assurance.' },
  ],
  IT: [
    { step: 1, icon: 'help', color: '#206777', title: 'Identifica i sintomi', desc: 'Febbre, raffreddore, dolore, eruzione cutanea o condizione cronica? Usa lo strumento di controllo salute se non sei sicuro, o scopri quale specialità tratta i tuoi sintomi.' },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: 'Trova una clinica vicina (クリニック)', desc: 'Cerca su Google Maps "内科 near me" o il tuo sintomo in giapponese. Non serve appuntamento né registrazione — vai direttamente.', note: 'La maggior parte delle cliniche apre alle 9:00. Arriva presto per ridurre i tempi di attesa.' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: 'Prepara cosa portare', desc: 'Tessera assicurativa (保険証), contanti ¥3.000–¥10.000, lista dei farmaci attuali (薬リスト) e la lista di preparazione di questa app.' },
    { step: 4, icon: 'door_front', color: '#7a5700', title: "All'accettazione (受付)", desc: 'Consegna la tessera assicurativa e compila un modulo (問診票) con sintomi e anamnesi. Molte cliniche hanno moduli in inglese o multilingue.' },
    { step: 5, icon: 'chair', color: '#374151', title: 'Aspetta di essere chiamato', desc: 'Verrai chiamato per nome o numero. Attesa: 15–60 min nelle piccole cliniche, 1–3 ore negli ospedali.' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: 'Visita medica', desc: 'Descrivi i tuoi sintomi. Usa la pagina Frasi se ne hai bisogno. Il medico può ordinare esami, fare una diagnosi, prescrivere farmaci o emettere una lettera di referral.' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: 'Ritira la prescrizione (処方箋)', desc: 'Porta il tuo 処方箋 in qualsiasi farmacia (薬局). Valido solo 4 giorni. Con NHI, i farmaci costano ¥200–¥1.500.' },
    { step: 8, icon: 'payments', color: '#374151', title: 'Paga alla clinica', desc: 'Paga il ticket (30% con NHI) allo sportello. Visita tipica: ¥1.000–¥3.000 con assicurazione.' },
  ],
  TL: [
    { step: 1, icon: 'help', color: '#206777', title: 'Tukuyin ang iyong mga sintomas', desc: 'Lagnat, sipon, sakit, pantal, o patuloy na kondisyon? Gamitin ang Health Check tool kung hindi sigurado, o tingnan kung anong espesyalidad ang nagagamot sa iyong mga sintomas.' },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: 'Hanapin ang malapit na klinika (クリニック)', desc: 'Maghanap sa Google Maps ng "内科 near me" o ang iyong sintomas sa Japanese. Hindi kailangan ng referral — pumunta nang direkta.', note: 'Karamihan sa mga klinika ay nagbubukas ng 9:00 AM. Dumating nang maaga para mabawasan ang oras ng paghihintay.' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: 'Ihanda ang mga dala', desc: 'Insurance card (保険証), cash ¥3,000–¥10,000, listahan ng kasalukuyang gamot (薬リスト), at ang Preparation Checklist ng app na ito.' },
    { step: 4, icon: 'door_front', color: '#7a5700', title: 'Sa reception (受付)', desc: 'Ibigay ang iyong insurance card at punan ang form (問診票) na naglalaman ng mga sintomas at medical history. Maraming klinika ang may English o multilingual na form.' },
    { step: 5, icon: 'chair', color: '#374151', title: 'Maghintay na tawagin', desc: 'Ang iyong pangalan o numero ay tatawagin. Oras ng paghihintay: 15–60 min sa maliliit na klinika, 1–3 oras sa malalaking ospital.' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: 'Makipagkita sa doktor', desc: 'Ilarawan ang iyong mga sintomas. Gamitin ang Phrases page kung kailangan. Maaaring mag-order ng pagsusuri, mag-diagnose, mag-reseta, o maglabas ng referral letter ang doktor.' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: 'Tanggapin ang reseta (処方箋)', desc: 'Dalhin ang iyong 処方箋 sa anumang parmasya (薬局). 4 na araw lamang ang bisa. Sa NHI, ang gamot ay nagkakahalaga ng ¥200–¥1,500.' },
    { step: 8, icon: 'payments', color: '#374151', title: 'Bayaran sa klinika', desc: 'Bayaran ang iyong co-pay (30% sa NHI) sa counter. Karaniwang kabuuang gastos: ¥1,000–¥3,000 na may insurance.' },
  ],
  ID: [
    { step: 1, icon: 'help', color: '#206777', title: 'Kenali gejalamu', desc: 'Demam, pilek, nyeri, ruam, atau kondisi kronis? Gunakan alat Health Check jika tidak yakin, atau cari spesialisasi apa yang menangani gejalamu.' },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: 'Temukan klinik terdekat (クリニック)', desc: 'Cari di Google Maps "内科 near me" atau gejalamu dalam bahasa Jepang. Tidak perlu rujukan atau pendaftaran — datang langsung.', note: 'Sebagian besar klinik buka pukul 09.00. Datang lebih awal untuk mengurangi waktu tunggu.' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: 'Siapkan yang perlu dibawa', desc: 'Kartu asuransi (保険証), uang tunai ¥3.000–¥10.000, daftar obat saat ini (薬リスト), dan Daftar Persiapan dari app ini.' },
    { step: 4, icon: 'door_front', color: '#7a5700', title: 'Di resepsionis (受付)', desc: 'Serahkan kartu asuransi dan isi formulir (問診票) berisi gejala dan riwayat medis. Banyak klinik memiliki formulir dalam bahasa Inggris atau multibahasa.' },
    { step: 5, icon: 'chair', color: '#374151', title: 'Tunggu dipanggil', desc: 'Nama atau nomor kamu akan dipanggil. Waktu tunggu: 15–60 menit di klinik kecil, 1–3 jam di rumah sakit.' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: 'Bertemu dokter', desc: 'Ceritakan gejalamu. Gunakan halaman Frasa jika perlu. Dokter mungkin memesan tes, memberikan diagnosis, meresepkan obat, atau mengeluarkan surat rujukan.' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: 'Terima resep (処方箋)', desc: 'Bawa 処方箋-mu ke apotek (薬局) mana saja. Berlaku hanya 4 hari. Dengan NHI, obat berharga ¥200–¥1.500.' },
    { step: 8, icon: 'payments', color: '#374151', title: 'Bayar di klinika', desc: 'Bayar co-pay (30% dengan NHI) di loket. Total kunjungan tipikal: ¥1.000–¥3.000 dengan asuransi.' },
  ],
  DE: [
    { step: 1, icon: 'help', color: '#206777', title: 'Symptome erkennen', desc: 'Fieber, Erkältung, Schmerzen, Hautausschlag oder chronischer Zustand? Nutzen Sie den Gesundheitscheck wenn unsicher, oder prüfen Sie, welche Fachrichtung Ihre Symptome behandelt.' },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: 'Nächste Klinik finden (クリニック)', desc: 'Google Maps: "内科 near me" oder Ihr Symptom auf Japanisch. Keine Überweisung oder Voranmeldung nötig — einfach hingehen.', note: 'Die meisten Kliniken öffnen um 9:00 Uhr. Früh kommen verkürzt die Wartezeit.' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: 'Was mitnehmen', desc: 'Versicherungskarte (保険証), Bargeld ¥3.000–¥10.000, Medikamentenliste (薬リスト) und die Vorbereitungs-Checkliste dieser App.' },
    { step: 4, icon: 'door_front', color: '#7a5700', title: 'Am Empfang (受付)', desc: 'Versicherungskarte abgeben und Formular (問診票) mit Symptomen und Vorgeschichte ausfüllen. Viele Kliniken haben Formulare auf Englisch oder mehrsprachig.' },
    { step: 5, icon: 'chair', color: '#374151', title: 'Warten bis Sie aufgerufen werden', desc: 'Ihr Name oder Nummer wird aufgerufen. Wartezeit: 15–60 Min. in kleinen Kliniken, 1–3 Stunden in Krankenhäusern.' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: 'Arztgespräch', desc: 'Beschreiben Sie Ihre Symptome. Nutzen Sie die Phrasen-Seite bei Bedarf. Der Arzt kann Tests anordnen, eine Diagnose stellen, Medikamente verschreiben oder einen Überweisungsbrief ausstellen.' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: 'Rezept erhalten (処方箋)', desc: 'Bringen Sie Ihr 処方箋 in eine beliebige Apotheke (薬局). Nur 4 Tage gültig. Mit NHI kosten Medikamente ¥200–¥1.500.' },
    { step: 8, icon: 'payments', color: '#374151', title: 'In der Klinik bezahlen', desc: 'Zahlen Sie Ihren Eigenanteil (30% mit NHI) am Schalter. Typischer Besuch: ¥1.000–¥3.000 mit Versicherung.' },
  ],
  PT: [
    { step: 1, icon: 'help', color: '#206777', title: 'Identifique os sintomas', desc: 'Febre, resfriado, dor, erupção ou condição crônica? Use a ferramenta de verificação de saúde se não tiver certeza, ou verifique qual especialidade trata seus sintomas.' },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: 'Encontre uma clínica próxima (クリニック)', desc: 'Pesquise no Google Maps "内科 near me" ou seu sintoma em japonês. Não precisa de encaminhamento ou cadastro — vá diretamente.', note: 'A maioria das clínicas abre às 9h. Chegue cedo para reduzir o tempo de espera.' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: 'Prepare o que levar', desc: 'Cartão de seguro (保険証), dinheiro ¥3.000–¥10.000, lista de medicamentos atuais (薬リスト) e a Lista de Preparação deste app.' },
    { step: 4, icon: 'door_front', color: '#7a5700', title: 'Na recepção (受付)', desc: 'Entregue seu cartão de seguro e preencha um formulário (問診票) com sintomas e histórico. Muitas clínicas têm formulários em inglês ou multilíngue.' },
    { step: 5, icon: 'chair', color: '#374151', title: 'Aguarde ser chamado', desc: 'Seu nome ou número será chamado. Espera: 15–60 min em clínicas pequenas, 1–3 horas em hospitais.' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: 'Consulta com o médico', desc: 'Descreva seus sintomas. Use a página de Frases se precisar. O médico pode pedir exames, dar um diagnóstico, prescrever medicamentos ou emitir carta de encaminhamento.' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: 'Receba a receita (処方箋)', desc: 'Leve seu 処方箋 a qualquer farmácia (薬局). Válida por apenas 4 dias. Com NHI, os medicamentos custam ¥200–¥1.500.' },
    { step: 8, icon: 'payments', color: '#374151', title: 'Pague na clínica', desc: 'Pague o copagamento (30% com NHI) no balcão. Visita típica: ¥1.000–¥3.000 com seguro.' },
  ],
  RU: [
    { step: 1, icon: 'help', color: '#206777', title: 'Определите симптомы', desc: 'Температура, простуда, боль, сыпь или хроническое состояние? Используйте инструмент проверки здоровья, если не уверены, или узнайте, какая специализация лечит ваши симптомы.' },
    { step: 2, icon: 'store_mall_directory', color: '#206777', title: 'Найдите ближайшую клинику (クリニック)', desc: 'Ищите в Google Maps "内科 near me" или симптом на японском. Направление и предварительная запись не нужны — приходите сразу.', note: 'Большинство клиник открываются в 9:00. Придите пораньше, чтобы сократить ожидание.' },
    { step: 3, icon: 'fact_check', color: '#7a5700', title: 'Подготовьте что взять с собой', desc: 'Страховая карта (保険証), наличные ¥3 000–¥10 000, список текущих лекарств (薬リスト) и контрольный список из этого приложения.' },
    { step: 4, icon: 'door_front', color: '#7a5700', title: 'На стойке регистрации (受付)', desc: 'Отдайте страховую карту и заполните анкету (問診票) с симптомами и историей болезни. Во многих клиниках есть формы на английском или других языках.' },
    { step: 5, icon: 'chair', color: '#374151', title: 'Ожидайте вызова', desc: 'Вас вызовут по имени или номеру. Время ожидания: 15–60 мин в небольших клиниках, 1–3 часа в больницах.' },
    { step: 6, icon: 'stethoscope', color: '#206777', title: 'Приём у врача', desc: 'Опишите свои симптомы. Используйте страницу Фраз при необходимости. Врач может назначить анализы, поставить диагноз, выписать лекарства или направление.' },
    { step: 7, icon: 'local_pharmacy', color: '#7a5700', title: 'Получите рецепт (処方箋)', desc: 'Отнесите 処方箋 в любую аптеку (薬局). Действителен только 4 дня. С NHI лекарства стоят ¥200–¥1 500.' },
    { step: 8, icon: 'payments', color: '#374151', title: 'Оплата в клинике', desc: 'Оплатите долю (30% с NHI) на кассе. Типичный визит: ¥1 000–¥3 000 со страховкой.' },
  ],
}

const NOT_SURE: Record<string, { q: string; a: string }[]> = {
  EN: [
    { q: 'Severe chest pain or trouble breathing', a: '→ Emergency: Call 119' },
    { q: 'Sudden confusion, facial drooping, or one-sided weakness', a: '→ Emergency: Call 119 (possible stroke)' },
    { q: 'High fever with stiff neck or rash', a: '→ Emergency: Call 119' },
    { q: 'Child under 1 with high fever', a: '→ Call #8000 (pediatric advice)' },
    { q: 'Unsure whether to go to ER at night', a: '→ Call #7119 for guidance' },
    { q: 'Fever, cold, mild stomach pain, rash', a: '→ Routine clinic visit the next morning' },
  ],
  JP: [
    { q: '激しい胸の痛み・呼吸困難', a: '→ 緊急：119番' },
    { q: '突然の意識混濁・顔の麻痺・片側の脱力感', a: '→ 緊急：119番（脳卒中の疑い）' },
    { q: '高熱＋項部硬直または発疹', a: '→ 緊急：119番' },
    { q: '生後1歳未満の高熱', a: '→ #8000（小児救急電話相談）' },
    { q: '夜間にERに行くべきか迷っている', a: '→ #7119に電話して判断を仰ぐ' },
    { q: '発熱・風邪・軽い腹痛・発疹', a: '→ 翌朝のクリニック受診で問題なし' },
  ],
  ZH: [
    { q: '剧烈胸痛或呼吸困难', a: '→ 紧急：拨打119' },
    { q: '突然意识模糊、面部下垂或单侧无力', a: '→ 紧急：拨打119（可能是中风）' },
    { q: '高烧伴颈部僵硬或皮疹', a: '→ 紧急：拨打119' },
    { q: '1岁以下婴儿高烧', a: '→ 拨打 #8000（小儿急救电话咨询）' },
    { q: '夜间不确定是否需要去急诊', a: '→ 拨打 #7119 获取指导' },
    { q: '发烧、感冒、轻度腹痛、皮疹', a: '→ 翌日上午前往诊所就诊即可' },
  ],
  KO: [
    { q: '심한 흉통 또는 호흡 곤란', a: '→ 응급: 119 전화' },
    { q: '갑작스런 의식 혼탁, 안면 마비, 또는 편측 마비', a: '→ 응급: 119 전화 (뇌졸중 의심)' },
    { q: '고열과 목 뻣뻣함 또는 발진', a: '→ 응급: 119 전화' },
    { q: '생후 1세 미만 영아의 고열', a: '→ #8000 전화 (소아 응급 상담)' },
    { q: '야간에 응급실에 가야 할지 모르겠을 때', a: '→ #7119에 전화해 상담' },
    { q: '발열, 감기, 가벼운 복통, 발진', a: '→ 다음 날 아침 클리닉 방문' },
  ],
  'ZH-T': [
    { q: '劇烈胸痛或呼吸困難', a: '→ 緊急：撥打119' },
    { q: '突然意識模糊、面部下垂或單側無力', a: '→ 緊急：撥打119（可能是中風）' },
    { q: '高燒伴頸部僵硬或皮疹', a: '→ 緊急：撥打119' },
    { q: '1歲以下嬰兒高燒', a: '→ 撥打 #8000（小兒急救電話諮詢）' },
    { q: '夜間不確定是否需要去急診', a: '→ 撥打 #7119 獲取指導' },
    { q: '發燒、感冒、輕度腹痛、皮疹', a: '→ 翌日上午前往診所就診即可' },
  ],
  ES: [
    { q: 'Dolor intenso en el pecho o dificultad para respirar', a: '→ Emergencia: Llama al 119' },
    { q: 'Confusión repentina, caída facial o debilidad en un lado', a: '→ Emergencia: Llama al 119 (posible derrame)' },
    { q: 'Fiebre alta con cuello rígido o sarpullido', a: '→ Emergencia: Llama al 119' },
    { q: 'Bebé menor de 1 año con fiebre alta', a: '→ Llama al #8000 (asesoría pediátrica)' },
    { q: 'No sabes si ir a urgencias por la noche', a: '→ Llama al #7119 para orientación' },
    { q: 'Fiebre, resfriado, leve dolor de estómago, sarpullido', a: '→ Visita la clínica a la mañana siguiente' },
  ],
  FR: [
    { q: 'Douleur thoracique intense ou difficulté à respirer', a: '→ Urgence: Appelez le 119' },
    { q: 'Confusion soudaine, affaissement facial ou faiblesse d\'un côté', a: '→ Urgence: Appelez le 119 (possible AVC)' },
    { q: 'Forte fièvre avec nuque raide ou éruption', a: '→ Urgence: Appelez le 119' },
    { q: 'Enfant de moins d\'1 an avec forte fièvre', a: '→ Appelez le #8000 (conseil pédiatrique)' },
    { q: 'Incertain d\'aller aux urgences la nuit', a: '→ Appelez le #7119 pour orientation' },
    { q: 'Fièvre, rhume, légère douleur abdominale, éruption', a: '→ Clinique le lendemain matin' },
  ],
  IT: [
    { q: 'Forte dolore al petto o difficoltà respiratoria', a: '→ Emergenza: Chiama il 119' },
    { q: 'Confusione improvvisa, asimmetria facciale o debolezza unilaterale', a: '→ Emergenza: Chiama il 119 (possibile ictus)' },
    { q: 'Febbre alta con rigidità del collo o eruzione cutanea', a: '→ Emergenza: Chiama il 119' },
    { q: 'Bambino sotto 1 anno con febbre alta', a: '→ Chiama il #8000 (consulenza pediatrica)' },
    { q: 'Incerto se andare al pronto soccorso di notte', a: '→ Chiama il #7119 per orientamento' },
    { q: 'Febbre, raffreddore, lieve dolore addominale, eruzione', a: '→ Clinica la mattina seguente' },
  ],
  TL: [
    { q: 'Matinding sakit sa dibdib o hirap na huminga', a: '→ Emergency: Tumawag ng 119' },
    { q: 'Biglang pagkalito, pag-droop ng mukha, o panig na kahinaan', a: '→ Emergency: Tumawag ng 119 (posibleng stroke)' },
    { q: 'Mataas na lagnat na may matigas na leeg o pantal', a: '→ Emergency: Tumawag ng 119' },
    { q: 'Sanggol na wala pang 1 taon na may mataas na lagnat', a: '→ Tumawag sa #8000 (payo para sa bata)' },
    { q: 'Hindi sigurado kung pumunta sa ER sa gabi', a: '→ Tumawag sa #7119 para sa gabay' },
    { q: 'Lagnat, sipon, banayad na sakit ng tiyan, pantal', a: '→ Pumunta sa klinika kinabukasan ng umaga' },
  ],
  ID: [
    { q: 'Nyeri dada hebat atau kesulitan bernapas', a: '→ Darurat: Hubungi 119' },
    { q: 'Kebingungan mendadak, wajah terkulai, atau kelemahan satu sisi', a: '→ Darurat: Hubungi 119 (kemungkinan stroke)' },
    { q: 'Demam tinggi dengan leher kaku atau ruam', a: '→ Darurat: Hubungi 119' },
    { q: 'Bayi di bawah 1 tahun dengan demam tinggi', a: '→ Hubungi #8000 (saran pediatrik)' },
    { q: 'Tidak yakin perlu ke UGD malam hari', a: '→ Hubungi #7119 untuk panduan' },
    { q: 'Demam, pilek, nyeri perut ringan, ruam', a: '→ Klinik esok pagi' },
  ],
  DE: [
    { q: 'Starke Brustschmerzen oder Atemprobleme', a: '→ Notfall: 119 anrufen' },
    { q: 'Plötzliche Verwirrtheit, Gesichtshängen oder einseitige Schwäche', a: '→ Notfall: 119 anrufen (möglicher Schlaganfall)' },
    { q: 'Hohes Fieber mit Nackenstarre oder Hautausschlag', a: '→ Notfall: 119 anrufen' },
    { q: 'Kind unter 1 Jahr mit hohem Fieber', a: '→ #8000 anrufen (Kinder-Beratung)' },
    { q: 'Unsicher ob nachts in die Notaufnahme', a: '→ #7119 anrufen für Beratung' },
    { q: 'Fieber, Erkältung, leichte Bauchschmerzen, Ausschlag', a: '→ Klinikbesuch am nächsten Morgen' },
  ],
  PT: [
    { q: 'Dor intensa no peito ou dificuldade para respirar', a: '→ Emergência: Ligue 119' },
    { q: 'Confusão repentina, rosto caído ou fraqueza de um lado', a: '→ Emergência: Ligue 119 (possível AVC)' },
    { q: 'Febre alta com rigidez no pescoço ou erupção', a: '→ Emergência: Ligue 119' },
    { q: 'Bebê com menos de 1 ano com febre alta', a: '→ Ligue #8000 (orientação pediátrica)' },
    { q: 'Incerto se deve ir ao PS à noite', a: '→ Ligue #7119 para orientação' },
    { q: 'Febre, resfriado, leve dor abdominal, erupção', a: '→ Clínica na manhã seguinte' },
  ],
  RU: [
    { q: 'Сильная боль в груди или затруднённое дыхание', a: '→ Экстренно: звоните 119' },
    { q: 'Внезапная спутанность, опущение лица или односторонняя слабость', a: '→ Экстренно: звоните 119 (возможный инсульт)' },
    { q: 'Высокая температура с ригидностью шеи или сыпью', a: '→ Экстренно: звоните 119' },
    { q: 'Ребёнок до 1 года с высокой температурой', a: '→ Звоните #8000 (консультация педиатра)' },
    { q: 'Не уверены, ехать ли в скорую ночью', a: '→ Звоните #7119 для консультации' },
    { q: 'Температура, простуда, лёгкая боль в животе, сыпь', a: '→ Клиника на следующее утро' },
  ],
}

export default function VisitFlowPage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const [flow, setFlow] = useState<FlowType>('non-emergency')

  const steps = flow === 'emergency'
    ? (EMERGENCY_STEPS[lang] ?? EMERGENCY_STEPS['EN'])
    : (ROUTINE_STEPS[lang] ?? ROUTINE_STEPS['EN'])
  const notSure = NOT_SURE[lang] ?? NOT_SURE['EN']

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
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#1e1b1c', fontVariationSettings: "'FILL' 1" as string }}>account_tree</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800 }}>{tl(PAGE_TITLE, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 24 }}>{tl(PAGE_SUB, lang)}</p>

      {/* Toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, background: '#f4eced', borderRadius: 12, padding: 4 }}>
        <button onClick={() => setFlow('non-emergency')} style={{
          flex: 1, padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: flow === 'non-emergency' ? '#fff' : 'transparent',
          fontWeight: 700, fontSize: 13,
          color: flow === 'non-emergency' ? '#206777' : '#78716c',
          boxShadow: flow === 'non-emergency' ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.15s',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 15, verticalAlign: 'middle', marginRight: 4 }}>medical_services</span>
          {tl(BTN_ROUTINE, lang)}
        </button>
        <button onClick={() => setFlow('emergency')} style={{
          flex: 1, padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: flow === 'emergency' ? '#fff' : 'transparent',
          fontWeight: 700, fontSize: 13,
          color: flow === 'emergency' ? '#b22620' : '#78716c',
          boxShadow: flow === 'emergency' ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.15s',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 15, verticalAlign: 'middle', marginRight: 4 }}>emergency</span>
          {tl(BTN_EMERGENCY, lang)}
        </button>
      </div>

      {flow === 'emergency' && (
        <div style={{ background: '#fef2f2', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(178,38,32,0.15)', marginBottom: 24, display: 'flex', gap: 8 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#b22620', flexShrink: 0, marginTop: 1, fontVariationSettings: "'FILL' 1" as string }}>warning</span>
          <p style={{ fontSize: 13, color: '#b22620', fontWeight: 600, lineHeight: 1.5 }}>{tl(WARN_119, lang)}</p>
        </div>
      )}

      {/* Steps flowchart */}
      <section style={{ marginBottom: 32, position: 'relative', paddingLeft: 32 }}>
        <div style={{ position: 'absolute', left: 11, top: 12, bottom: 12, width: 2, background: flow === 'emergency' ? 'rgba(178,38,32,0.15)' : 'rgba(32,103,119,0.15)', borderRadius: 2 }} />
        {steps.map((s, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: i < steps.length - 1 ? 16 : 0 }}>
            <div style={{ position: 'absolute', left: -32, top: 0, width: 24, height: 24, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 13, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{s.icon}</span>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: `1px solid ${s.color}20`, borderLeft: `3px solid ${s.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span className="font-label" style={{ fontSize: 9, color: s.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {tl(LBL_STEP, lang)} {s.step}
                </span>
                {(s as any).isDecision && (
                  <span style={{ fontSize: 9, background: '#fef2f2', color: '#b22620', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                    {tl(LBL_DECISION, lang)}
                  </span>
                )}
              </div>
              <p className="font-headline" style={{ fontSize: 14, fontWeight: 700, color: '#1e1b1c', marginBottom: 6 }}>{s.title}</p>
              <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.65 }}>{s.desc}</p>
              {(s as any).note && <p style={{ fontSize: 12, color: s.color, marginTop: 8, fontStyle: 'italic' }}>{(s as any).note}</p>}
              {(s as any).action && <p style={{ fontSize: 12, fontWeight: 700, color: s.color, marginTop: 8 }}>{(s as any).action}</p>}
            </div>
          </div>
        ))}
      </section>

      {/* Not sure section */}
      <section style={{ marginBottom: 28 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{tl(H_NOTSURE, lang)}</h2>
        <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(226,190,186,0.2)' }}>
          {notSure.map((item, i) => (
            <div key={i} style={{ padding: '12px 16px', borderBottom: i < notSure.length - 1 ? '1px solid rgba(226,190,186,0.12)' : 'none', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#78716c', flexShrink: 0, marginTop: 2 }}>arrow_right</span>
              <div>
                <p style={{ fontSize: 13, color: '#1e1b1c', marginBottom: 2 }}>{item.q}</p>
                <p style={{ fontSize: 12, color: item.a.includes('119') ? '#b22620' : '#206777', fontWeight: 700 }}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Link href="/dashboard/health-check" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#eef7f9', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(32,103,119,0.1)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#206777' }}>monitor_heart</span>
          <span style={{ fontSize: 13, color: '#206777', fontWeight: 600 }}>{tl(LBL_HEALTH_CHECK, lang)}</span>
        </Link>
        <Link href="/dashboard/phrases" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#faf2f2', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(226,190,186,0.2)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#b22620' }}>translate</span>
          <span style={{ fontSize: 13, color: '#b22620', fontWeight: 600 }}>{tl(LBL_PHRASES, lang)}</span>
        </Link>
      </div>
    </main>
  )
}
