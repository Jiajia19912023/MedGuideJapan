'use client'
import Link from 'next/link'
import { useLang } from '../lang-context'
import { useSaved } from '../saved-context'
import { tr, COMMON, AMBULANCE } from '../translations'

const ITEM = { href: '/dashboard/ambulance', title: 'Ambulance Guide', titleJP: '救急ガイド', icon: 'ambulance', color: '#b22620' }
function tl(m: Record<string, string>, l: string) { return m[l] ?? m['EN'] }

const CALL_FOR: Record<string, string[]> = {
  EN: ['Loss of consciousness or unresponsive','Stopped breathing or severe difficulty breathing','Severe chest pain or pressure','Suspected stroke (face drooping, arm weakness, slurred speech)','Severe bleeding that cannot be stopped','Suspected spinal injury — do not move the person','Poisoning or drug overdose','Drowning or severe burns'],
  JP: ['意識を失っている・反応がない','呼吸が止まっている・著しく呼吸困難','激しい胸の痛みや圧迫感','脳卒中の疑い（顔の歪み・腕の脱力・言語障害）','止まらない激しい出血','脊椎損傷の疑い — 動かさないこと','中毒・薬物過剰摂取','溺水・重度のやけど'],
  ZH: ['意识丧失或无反应','停止呼吸或严重呼吸困难','严重胸痛或胸部压迫感','疑似脑卒中（面部下垂、手臂无力、言语不清）','无法止住的大量出血','疑似脊椎受伤 — 请勿移动伤者','中毒或药物过量','溺水或严重烧伤'],
  'ZH-T': ['意識喪失或無反應','停止呼吸或嚴重呼吸困難','嚴重胸痛或胸部壓迫感','疑似腦卒中（面部下垂、手臂無力、言語不清）','無法止住的大量出血','疑似脊椎受傷 — 請勿移動傷者','中毒或藥物過量','溺水或嚴重燒傷'],
  KO: ['의식 상실 또는 반응 없음','호흡 정지 또는 심한 호흡 곤란','심한 흉통 또는 압박감','뇌졸중 의심(얼굴 처짐, 팔 힘 빠짐, 말 어눌함)','멈추지 않는 심한 출혈','척추 부상 의심 — 움직이지 말 것','중독 또는 약물 과다복용','익수 또는 심한 화상'],
  ES: ['Pérdida de consciencia o sin respuesta','Parada respiratoria o dificultad grave para respirar','Dolor o presión severa en el pecho','Posible derrame cerebral (cara caída, brazo débil, habla trabada)','Sangrado grave que no se puede detener','Posible lesión en la columna — no mover a la persona','Envenenamiento o sobredosis','Ahogamiento o quemaduras graves'],
  FR: ['Perte de connaissance ou sans réaction','Arrêt respiratoire ou grande difficulté à respirer','Douleur ou pression thoracique sévère','AVC suspecté (visage affaissé, faiblesse du bras, parole difficile)','Saignement grave impossible à arrêter','Lésion vertébrale suspectée — ne pas déplacer la personne','Empoisonnement ou surdose','Noyade ou brûlures graves'],
  IT: ['Perdita di coscienza o nessuna risposta','Respirazione arrestata o grave difficoltà respiratoria','Dolore o pressione toracica severa','Ictus sospetto (viso cadente, debolezza del braccio, difficoltà nel parlare)','Sanguinamento grave che non si arresta','Sospetta lesione spinale — non spostare la persona','Avvelenamento o overdose','Annegamento o ustioni gravi'],
  TL: ['Pagkawala ng malay o hindi tumutugon','Huminto ang paghinga o matinding kahirapan sa paghinga','Matinding sakit o presyon sa dibdib','Pinaghihinalaang stroke (pagbaluktot ng mukha, panghihina ng braso, hindi malinaw ang pananalita)','Matinding pagdurugo na hindi mapigilan','Pinaghihinalaang pinsala sa gulugod — huwag ilipat ang tao','Pagkalason o overdose ng gamot','Pagkalunod o matinding paso'],
  ID: ['Kehilangan kesadaran atau tidak responsif','Napas berhenti atau kesulitan bernapas yang parah','Nyeri dada atau tekanan yang parah','Diduga stroke (wajah melorot, lengan lemah, bicara tidak jelas)','Pendarahan parah yang tidak bisa dihentikan','Diduga cedera tulang belakang — jangan gerakkan orangnya','Keracunan atau overdosis obat','Tenggelam atau luka bakar parah'],
  DE: ['Bewusstlosigkeit oder keine Reaktion','Atemstillstand oder schwere Atemnot','Schwerer Brustschmerz oder -druck','Verdacht auf Schlaganfall (hängender Mund, Armschwäche, undeutliche Sprache)','Starke Blutung, die nicht gestoppt werden kann','Verdacht auf Wirbelsäulenverletzung — Person nicht bewegen','Vergiftung oder Medikamentenüberdosierung','Ertrinken oder schwere Verbrennungen'],
  PT: ['Perda de consciência ou sem resposta','Respiração parada ou dificuldade respiratória grave','Dor no peito severa ou pressão','Suspeita de AVC (queda da face, fraqueza no braço, fala arrastada)','Sangramento grave que não pode ser interrompido','Suspeita de lesão na coluna — não mova a pessoa','Envenenamento ou overdose','Afogamento ou queimaduras graves'],
  RU: ['Потеря сознания или отсутствие реакции','Остановка дыхания или тяжёлые затруднения','Сильная боль или давление в груди','Подозрение на инсульт (опущение лица, слабость руки, нечёткая речь)','Сильное кровотечение, которое невозможно остановить','Подозрение на травму позвоночника — не двигать','Отравление или передозировка','Утопление или тяжёлые ожоги'],
}

const STEPS: Record<string, string[]> = {
  EN: ['"Kyūkyū desu" (救急です) — "It\'s an emergency."','Give your address (building name, floor, room number). Use GPS if unsure.','Describe the patient\'s condition briefly.','Stay on the line — the operator will guide you until the ambulance arrives.','Bring insurance card and ID to the hospital.'],
  JP: ['「救急です」と伝える','住所（建物名・階・部屋番号）を伝える。わからない場合はGPS位置情報を使う。','患者の状態を簡潔に説明する。','電話を切らないこと — 救急車が到着するまでオペレーターが誘導してくれる。','保険証と身分証明書を病院に持参する。'],
  ZH: ['说"救急です"（Kyūkyū desu）— "紧急情况"','报告地址（建筑名称、楼层、房间号）。不确定时使用GPS。','简要描述患者情况。','保持通话 — 救护车到达前调度员会一直指导您。','携带保险证和身份证去医院。'],
  'ZH-T': ['說"救急です"（Kyūkyū desu）— "緊急情況"','報告地址（建築名稱、樓層、房間號）。不確定時使用GPS。','簡要描述患者情況。','保持通話 — 救護車到達前調度員會一直指導您。','攜帶保險證和身份證去醫院。'],
  KO: ['"큐큐데스"（救急です）— "응급 상황"','주소(건물 이름, 층, 호수)를 알려주세요. 모를 경우 GPS 사용.','환자의 상태를 간략히 설명하세요.','전화를 끊지 마세요 — 구급차 도착까지 상담원이 안내합니다.','병원에 보험증과 신분증을 가져가세요.'],
  ES: ['Di "Kyūkyū desu" (救急です) — "Es una emergencia."','Da tu dirección (edificio, piso, habitación). Usa GPS si no estás seguro.','Describe brevemente al paciente.','No cuelgues — el operador te guiará hasta que llegue la ambulancia.','Lleva tarjeta de seguro e identificación al hospital.'],
  FR: ['Dites "Kyūkyū desu" (救急です) — "C\'est une urgence."','Donnez votre adresse (bâtiment, étage, chambre). GPS si besoin.','Décrivez brièvement l\'état du patient.','Restez en ligne — l\'opérateur vous guidera jusqu\'à l\'ambulance.','Apportez votre carte d\'assurance et pièce d\'identité.'],
  IT: ['Di\' "Kyūkyū desu" (救急です) — "È un\'emergenza."','Fornisci l\'indirizzo (edificio, piano, stanza). Usa GPS se non sei sicuro.','Descrivi brevemente le condizioni del paziente.','Rimani in linea — l\'operatore ti guiderà fino all\'ambulanza.','Porta la tessera sanitaria e il documento d\'identità.'],
  TL: ['Sabihin ang "Kyūkyū desu" (救急です) — "May emergency."','Ibigay ang address (gusali, palapag, kwarto). Gamitin ang GPS kung hindi sigurado.','Ilarawan nang maikli ang kondisyon ng pasyente.','Huwag ibaba ang telepono — gagabayan kayo ng operator hanggang dumating ang ambulansya.','Dalhin ang insurance card at ID sa ospital.'],
  ID: ['Katakan "Kyūkyū desu" (救急です) — "Ini darurat."','Berikan alamat Anda (gedung, lantai, kamar). Gunakan GPS jika tidak yakin.','Jelaskan kondisi pasien secara singkat.','Tetap di telepon — operator akan membimbing sampai ambulans tiba.','Bawa kartu asuransi dan kartu identitas ke rumah sakit.'],
  DE: ['Sagen Sie "Kyūkyū desu" (救急です) — "Es ist ein Notfall."','Nennen Sie Ihre Adresse (Gebäude, Etage, Zimmer). GPS nutzen, wenn unsicher.','Beschreiben Sie kurz den Zustand des Patienten.','Bleiben Sie in der Leitung — der Operator führt Sie bis zum Krankenwagen.','Bringen Sie Versicherungskarte und Ausweis ins Krankenhaus.'],
  PT: ['Diga "Kyūkyū desu" (救急です) — "É uma emergência."','Informe seu endereço (edifício, andar, quarto). Use o GPS se não tiver certeza.','Descreva brevemente a condição do paciente.','Permaneça na linha — o atendente guiará até a chegada da ambulância.','Leve o cartão de seguro e identidade ao hospital.'],
  RU: ['Скажите "Kyūkyū desu" (救急です) — "Это экстренный случай."','Назовите адрес (здание, этаж, номер комнаты). Используйте GPS при необходимости.','Кратко опишите состояние пациента.','Не вешайте трубку — оператор сопровождает до прибытия скорой.','Возьмите в больницу страховую карту и удостоверение.'],
}

const COST_P1 = { EN: 'Calling 119 and ambulance transport is free. Hospital treatment costs apply — typically 30% with National Health Insurance.', JP: '119番通報と救急車の搬送は無料です。ただし病院での治療費は別途かかります（国民健康保険加入者は通常3割負担）。', ZH: '拨打119和救护车运送免费。但医院治疗费用需自付，通常为国民健康保险的30%。', 'ZH-T': '撥打119和救護車運送免費。但醫院治療費用需自付，通常為國民健康保險的30%。', KO: '119 신고 및 구급차 이송은 무료입니다. 단, 병원 치료비는 별도 청구되며 국민건강보험 가입자는 보통 30% 자부담입니다.', ES: 'Llamar al 119 y el transporte en ambulancia es gratuito. Los costos de tratamiento hospitalario aplican — normalmente el 30% con el Seguro Nacional de Salud.', FR: "L'appel au 119 et le transport en ambulance sont gratuits. Les frais de traitement hospitalier s'appliquent — généralement 30% avec l'Assurance Nationale de Santé.", IT: "Chiamare il 119 e il trasporto in ambulanza sono gratuiti. I costi del trattamento ospedaliero si applicano — di solito il 30% con l'Assicurazione Sanitaria Nazionale.", TL: 'Ang pagtawag sa 119 at ambulansya ay libre. Ang bayad sa ospital ay naaangkop — karaniwan ay 30% sa ilalim ng National Health Insurance.', ID: 'Menelepon 119 dan transportasi ambulans gratis. Biaya perawatan rumah sakit tetap berlaku — biasanya 30% dengan Asuransi Kesehatan Nasional.', DE: 'Das Anrufen von 119 und der Krankentransport sind kostenlos. Krankenhausbehandlungskosten fallen an — in der Regel 30% mit der nationalen Krankenversicherung.', PT: 'Ligar para o 119 e o transporte de ambulância são gratuitos. Os custos de tratamento hospitalar se aplicam — normalmente 30% com o Seguro Nacional de Saúde.', RU: 'Звонок на 119 и перевозка на скорой помощи бесплатны. Стоимость лечения в больнице оплачивается — обычно 30% при национальной медицинской страховке.' }
const COST_P2 = { EN: 'Hospitals may charge a ¥5,000–¥10,000 initial consultation surcharge for emergency walk-in visits without a referral.', JP: '紹介状なしで救急外来を受診した場合、初診加算料（5,000〜10,000円）がかかる病院もあります。', ZH: '对于没有转诊直接来急诊的患者，医院可能会收取5,000〜10,000日元的初诊附加费。', 'ZH-T': '對於沒有轉診直接來急診的患者，醫院可能會收取5,000〜10,000日元的初診附加費。', KO: '소개장 없이 응급실을 방문하면 5,000〜10,000엔의 초진 추가 요금이 발생할 수 있습니다.', ES: 'Los hospitales pueden cobrar un recargo de ¥5,000–¥10,000 por visitas de emergencia sin derivación médica.', FR: "Les hôpitaux peuvent facturer un supplément de ¥5 000 à ¥10 000 pour les consultations d'urgence sans ordonnance de renvoi.", IT: "Gli ospedali possono addebitare un supplemento di ¥5.000–¥10.000 per visite d'emergenza senza referenza medica.", TL: 'Maaaring maningil ang mga ospital ng ¥5,000–¥10,000 na karagdagang bayad para sa emergency na pagbisita nang walang referral.', ID: 'Rumah sakit mungkin mengenakan biaya tambahan ¥5.000–¥10.000 untuk kunjungan UGD tanpa rujukan.', DE: 'Krankenhäuser können einen Aufschlag von ¥5.000–¥10.000 für Notaufnahmebesuche ohne Überweisung berechnen.', PT: 'Os hospitais podem cobrar um adicional de ¥5.000–¥10.000 para visitas de emergência sem encaminhamento médico.', RU: 'Больницы могут взимать дополнительный сбор ¥5 000–¥10 000 за экстренные визиты без направления от врача.' }

export default function AmbulancePage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const items = CALL_FOR[lang] ?? CALL_FOR.EN
  const steps = STEPS[lang] ?? STEPS.EN

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
        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#b22620', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>ambulance</span>
        </div>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800, color: '#1e1b1c' }}>{tr(AMBULANCE.title, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28 }}>{tr(AMBULANCE.subtitle, lang)}</p>

      <div style={{ background: '#b22620', borderRadius: 16, padding: '20px', marginBottom: 28, textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 4 }}>{tr(AMBULANCE.emergency, lang)}</p>
        <p className="font-headline" style={{ fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1 }}>119</p>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 }}>{tr(AMBULANCE.freeCall, lang)}</p>
      </div>

      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{tr(AMBULANCE.callFor, lang)}</h2>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(226,190,186,0.2)', overflow: 'hidden' }}>
          {items.map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '11px 16px', alignItems: 'center', borderBottom: i < arr.length - 1 ? '1px solid rgba(226,190,186,0.12)' : 'none', background: '#fef2f2' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#b22620', flexShrink: 0, fontVariationSettings: "'FILL' 1" as string }}>priority_high</span>
              <span style={{ fontSize: 13, color: '#1e1b1c' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{tr(AMBULANCE.whatHappens, lang)}</h2>
        <div style={{ background: '#faf2f2', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(226,190,186,0.2)' }}>
          {steps.map((text, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < steps.length - 1 ? 10 : 0, alignItems: 'flex-start' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#b22620', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', border: '1px solid rgba(226,190,186,0.2)', marginBottom: 16 }}>
        <h2 className="font-headline" style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'text-bottom', marginRight: 4, color: '#7a5700' }}>payments</span>
          {tr(AMBULANCE.costTitle, lang)}
        </h2>
        <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6, marginBottom: 8 }}>{tl(COST_P1, lang)}</p>
        <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{tl(COST_P2, lang)}</p>
      </section>

      <Link href="/dashboard/hotline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#206777', textDecoration: 'none' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 15 }}>call</span>
        {tr(AMBULANCE.notEmergency, lang)}
      </Link>
    </main>
  )
}
