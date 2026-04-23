'use client'
import Link from 'next/link'
import { useLang } from '../../lang-context'
import { useSaved } from '../../saved-context'
import { tr, COMMON } from '../../translations'

const ITEM = { href: '/dashboard/articles/culture', title: 'Medical Culture in Japan', titleJP: '日本の医療文化の違い', icon: 'compare_arrows', color: '#7a5700' }

const TITLE = { EN: 'Medical Culture in Japan', JP: '日本の医療文化の違い', ZH: '日本的医疗文化差异', 'ZH-T': '日本的醫療文化差異', KO: '일본 의료 문화의 차이', ES: 'Cultura Médica en Japón', FR: 'Culture Médicale au Japon', IT: 'Cultura Medica in Giappone', TL: 'Kultura ng Medisina sa Japan', ID: 'Budaya Medis di Jepang', DE: 'Medizinische Kultur in Japan', PT: 'Cultura Médica no Japão', RU: 'Медицинская культура Японии' }
const SUB   = { EN: 'What surprises most foreigners about how medicine is practiced here.', JP: '外国人が最も驚く日本の医療現場の違いとは。', ZH: '大多数外国人对日本医疗实践感到惊讶的地方。', 'ZH-T': '大多數外國人對日本醫療實踐感到驚訝的地方。', KO: '대부분의 외국인이 놀라는 일본 의료 관행의 차이.', ES: 'Lo que sorprende a los extranjeros sobre la medicina aquí.', FR: 'Ce qui surprend les étrangers sur la pratique médicale ici.', IT: 'Ciò che sorprende gli stranieri sulla medicina qui.', TL: 'Ang nagugulat sa karamihang dayuhan tungkol sa medikal na gawi dito.', ID: 'Apa yang mengejutkan sebagian besar orang asing tentang praktik medis di sini.', DE: 'Was Ausländer über die Medizin hier überrascht.', PT: 'O que surpreende os estrangeiros sobre a medicina aqui.', RU: 'Что удивляет иностранцев в японской медицине.' }
function tl(m: Record<string,string>, l: string) { return m[l] ?? m['EN'] }

const SECTION_LABELS: Record<string, Record<string,string>> = {
  philosophy: { EN: 'Philosophy & Decision-Making', JP: '医療哲学・意思決定', ZH: '理念与决策', 'ZH-T': '理念與決策', KO: '철학 & 의사결정', ES: 'Filosofía y Decisiones', FR: 'Philosophie et Décisions', IT: 'Filosofia e Decisioni', TL: 'Pilosopiya at Pagpapasya', ID: 'Filosofi & Pengambilan Keputusan', DE: 'Philosophie & Entscheidungsfindung', PT: 'Filosofia & Decisões', RU: 'Философия и принятие решений' },
  clinical:   { EN: 'Clinical Approach', JP: '臨床上のアプローチ', ZH: '临床方法', 'ZH-T': '臨床方法', KO: '임상적 접근', ES: 'Enfoque Clínico', FR: 'Approche Clinique', IT: 'Approccio Clinico', TL: 'Klinikal na Pamamaraan', ID: 'Pendekatan Klinis', DE: 'Klinischer Ansatz', PT: 'Abordagem Clínica', RU: 'Клинический подход' },
  practical:  { EN: 'Practical & Daily Life', JP: '実用・日常生活', ZH: '实用与日常生活', 'ZH-T': '實用與日常生活', KO: '실용 & 일상생활', ES: 'Práctica y Vida Diaria', FR: 'Pratique et Vie Quotidienne', IT: 'Pratico e Vita Quotidiana', TL: 'Praktikal at Pang-araw-araw', ID: 'Praktis & Kehidupan Sehari-hari', DE: 'Praktisch & Alltag', PT: 'Prático & Vida Diária', RU: 'Практика и повседневная жизнь' },
}

const ABROAD_LABEL: Record<string,string> = { EN: 'Many countries', JP: '多くの国', ZH: '许多国家', 'ZH-T': '許多國家', KO: '많은 국가', ES: 'Muchos países', FR: 'Beaucoup de pays', IT: 'Molti paesi', TL: 'Maraming bansa', ID: 'Banyak negara', DE: 'Viele Länder', PT: 'Muitos países', RU: 'Многие страны' }
const JAPAN_LABEL: Record<string,string>  = { EN: 'Japan', JP: '日本', ZH: '日本', 'ZH-T': '日本', KO: '일본', ES: 'Japón', FR: 'Japon', IT: 'Giappone', TL: 'Japan', ID: 'Jepang', DE: 'Japan', PT: 'Japão', RU: 'Япония' }

type DiffML = { section: string; icon: string; color: string; title: Record<string,string>; abroad: { flag: string; label: Record<string,string>; text: Record<string,string> }; japan: { flag: string; label: Record<string,string>; text: Record<string,string> }; note: Record<string,string> }

const DIFFS: DiffML[] = [
  // ── PHILOSOPHY & DECISION-MAKING ─────────────────────────────────────────
  {
    section: 'philosophy', icon: 'gavel', color: '#b22620',
    title: { EN: 'Who decides your treatment?', JP: '治療を決めるのは誰か？', ZH: '谁来决定您的治疗方案？', 'ZH-T': '誰來決定您的治療方案？', KO: '치료를 결정하는 사람은 누구인가요?', ES: '¿Quién decide su tratamiento?', FR: 'Qui décide de votre traitement ?', IT: 'Chi decide il tuo trattamento?', TL: 'Sino ang nagpapasya sa inyong paggamot?', ID: 'Siapa yang memutuskan pengobatan Anda?', DE: 'Wer entscheidet über Ihre Behandlung?', PT: 'Quem decide o seu tratamento?', RU: 'Кто принимает решение о лечении?' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Patient-led. Doctors present options and the patient decides. Shared decision-making is the norm.', JP: '患者主導。医師が選択肢を提示し、患者が決める「共同意思決定」が一般的。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Doctor-led. The physician decides the course of treatment. Being asked "what do you prefer?" is rare outside of end-of-life decisions.', JP: '医師主導。治療方針は医師が決定し、「あなたはどうしたいですか？」と聞かれることは少ない。' } },
    note: { EN: 'This doesn\'t mean poor care — Japanese doctors are highly trained. If you want to discuss options, ask directly: "選択肢はありますか？" (Are there alternatives?)', JP: '医療の質が低いわけではありません。選択肢を聞きたい場合は「選択肢はありますか？」と直接尋ねましょう。' },
  },
  {
    section: 'philosophy', icon: 'campaign', color: '#b22620',
    title: { EN: 'Terminal diagnosis — who gets told first?', JP: '告知 — 誰が最初に病名を伝えられるか？', ZH: '终末期诊断——谁会第一个被告知？', 'ZH-T': '末期診斷——誰會第一個被告知？', KO: '말기 진단 — 누가 먼저 통보받나요?', ES: 'Diagnóstico terminal — ¿quién se entera primero?', FR: 'Diagnostic terminal — qui est informé en premier ?', IT: 'Diagnosi terminale — chi viene informato per primo?', TL: 'Terminong diagnosis — sino ang unang nakakaalam?', ID: 'Diagnosis terminal — siapa yang diberitahu pertama?', DE: 'Unheilbare Diagnose — wer wird zuerst informiert?', PT: 'Diagnóstico terminal — quem é informado primeiro?', RU: 'Терминальный диагноз — кого информируют первым?' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Patient-first disclosure is the ethical and legal standard. The patient is informed first; family is told afterward, with the patient\'s consent.', JP: '患者への最初の告知が倫理的・法的標準。患者が先に知らされ、その同意のうえで家族に伝えられる。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Historically, Japanese doctors have informed the family before — or sometimes instead of — the patient about serious or terminal diagnoses. This is slowly changing, but the family-first approach remains common, especially with elderly patients.', JP: '重篤・末期診断の場合、歴史的に患者より先に、または代わりに家族へ告知することがあった。ゆっくりと変化しているが、特に高齢患者では家族優先の告知が今も一般的。' } },
    note: { EN: 'If you want the doctor to speak directly with the patient, you can request it: "患者本人に直接伝えてもらえますか？" (Please tell the patient directly).', JP: '医師に患者本人へ直接伝えてほしい場合は「患者本人に直接伝えてもらえますか？」と伝えましょう。' },
  },
  {
    section: 'philosophy', icon: 'family_restroom', color: '#7a5700',
    title: { EN: 'Family as the primary decision-maker', JP: '家族が意思決定の主体になる', ZH: '家庭成员作为主要决策者', 'ZH-T': '家庭成員作為主要決策者', KO: '가족이 주요 의사결정자가 되는 경우', ES: 'La familia como principal tomadora de decisiones', FR: 'La famille comme principal décideur', IT: 'La famiglia come principale decisore', TL: 'Ang pamilya bilang pangunahing gumagawa ng desisyon', ID: 'Keluarga sebagai pengambil keputusan utama', DE: 'Die Familie als Hauptentscheidungsträger', PT: 'A família como principal tomadora de decisões', RU: 'Семья как главный принимающий решения' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Patient autonomy is the legal and ethical standard. Adults make their own medical decisions, even if family disagrees.', JP: '患者の自律性が法的・倫理的基準。成人は家族が反対しても自分で医療決定ができる。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'For elderly or seriously ill patients, the family is often treated as the primary decision-making party. Doctors may present plans to family first, seek family consent for procedures, and avoid burdening the patient with difficult information — all seen as an act of care.', JP: '高齢・重症患者の場合、家族が主たる意思決定者とみなされることが多い。医師が先に家族に説明し、家族の同意を求め、難しい情報を患者に直接伝えない場合もある。これは患者への「思いやり」として行われる。' } },
    note: { EN: 'If you are the patient and want to be in control of your own care, state this clearly at admission: "治療に関する説明と決定は私自身にお願いしたいです".', JP: '自分の治療に関する判断を自分でしたい場合は、入院時に「治療に関する説明と決定は私自身にお願いしたいです」と明確に伝えましょう。' },
  },
  {
    section: 'philosophy', icon: 'rate_review', color: '#206777',
    title: { EN: 'Second opinions — uncommon and sometimes awkward', JP: 'セカンドオピニオン — 珍しく、時に気まずい', ZH: '第二意见——不常见，有时令人尴尬', 'ZH-T': '第二意見——不常見，有時令人尷尬', KO: '두 번째 의견 — 드물고 때로는 어색한', ES: 'Segundas opiniones — poco comunes y a veces incómodas', FR: 'Deuxièmes avis — rares et parfois gênants', IT: 'Seconde opinioni — rare e a volte scomode', TL: 'Pangalawang opinyon — hindi karaniwan at minsan awkward', ID: 'Pendapat kedua — tidak umum dan kadang canggung', DE: 'Zweitmeinungen — unüblich und manchmal unangenehm', PT: 'Segundas opiniões — incomuns e às vezes constrangedoras', RU: 'Второе мнение — редкость и иногда неловкость' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Seeking a second opinion is a normal part of medical decision-making. Doctors generally facilitate referrals for this purpose.', JP: 'セカンドオピニオンを求めることは、医療意思決定において一般的。医師も通常、紹介状の発行に協力的。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Second opinions (セカンドオピニオン) are your legal right but remain culturally uncommon. Some doctors may interpret the request as distrust. Larger hospitals increasingly have dedicated second-opinion clinics (セカンドオピニオン外来).', JP: 'セカンドオピニオンは法的権利だが、文化的にはまだ一般的でない。医師によっては「不信感」と受け取ることもある。大きな病院では「セカンドオピニオン外来」を設けていることもある。' } },
    note: { EN: 'Frame your request as wanting to "understand your options better." Ask: "セカンドオピニオンを受けたいのですが、紹介状をいただけますか？" (I\'d like a second opinion — may I have a referral?)', JP: '「選択肢をより理解したい」という形で伝えると良い。「セカンドオピニオンを受けたいのですが、紹介状をいただけますか？」と尋ねましょう。' },
  },
  {
    section: 'philosophy', icon: 'elderly', color: '#7a5700',
    title: { EN: '"Keep alive" — Japan\'s medical philosophy', JP: '「生かす」— 日本の医療の哲学', ZH: '「维持生命」——日本的医疗哲学', 'ZH-T': '「維持生命」——日本的醫療哲學', KO: '"생명 유지" — 일본 의료 철학', ES: '"Mantener con vida" — la filosofía médica japonesa', FR: '"Maintenir en vie" — la philosophie médicale japonaise', IT: '"Tenere in vita" — la filosofia medica giapponese', TL: '"Panatilihing buhay" — ang pilosopiya ng medikal sa Japan', ID: '"Menjaga tetap hidup" — filosofi medis Jepang', DE: '"Am Leben erhalten" — Japans medizinische Philosophie', PT: '"Manter vivo" — a filosofia médica japonesa', RU: '«Поддержать жизнь» — медицинская философия Японии' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'End-of-life care discussions focus on quality of life. Patients and families often choose palliative care over aggressive intervention, especially for the very elderly.', JP: '終末期ケアでは「生活の質（QOL）」が重視される。高齢者には積極的治療よりも緩和ケアを選ぶ文化が根付いている。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Japanese medical culture strongly emphasizes extending life (生かす — "keep alive"). Invasive surgery may be recommended even for patients in their 80s or 90s. Tube feeding is often used as a permanent long-term measure — not just a temporary bridge — and may continue until death. Declining aggressive treatment can be socially and medically difficult.', JP: '日本の医療文化には「生かす」という強い価値観がある。80〜90代の高齢者にも侵襲的な手術を勧めることがある。経管栄養は「一時的な処置」ではなく「永続的な延命手段」として使われることが多く、死去するまで継続される場合もある。積極的治療を断ることは文化的・医療的に難しい状況になりうる。' } },
    note: { EN: 'If you or a family member has clear end-of-life wishes, document them explicitly (advance directive / 事前指示書). Proactively raise this with the doctor — palliative-first care will not be assumed.', JP: '本人や家族に明確な終末期の意向がある場合は、文書化（事前指示書）することを強く推奨。積極的でない治療を望む場合は、医師に自ら先に伝えること。' },
  },
  // ── CLINICAL APPROACH ────────────────────────────────────────────────────
  {
    section: 'clinical', icon: 'science', color: '#206777',
    title: { EN: 'Antibiotics — when are they prescribed?', JP: '抗生物質 — いつ処方されるか？', ZH: '抗生素——何时开具处方？', 'ZH-T': '抗生素——何時開具處方？', KO: '항생제 — 언제 처방받나요?', ES: 'Antibióticos — ¿cuándo se recetan?', FR: 'Antibiotiques — quand sont-ils prescrits ?', IT: 'Antibiotici — quando vengono prescritti?', TL: 'Antibiotics — kailan ini inireseta?', ID: 'Antibiotik — kapan diresepkan?', DE: 'Antibiotika — wann werden sie verschrieben?', PT: 'Antibióticos — quando são prescritos?', RU: 'Антибиотики — когда их назначают?' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Often prescribed early or preventively, sometimes before bacterial culture results are back.', JP: '早期または予防的に処方されることが多く、培養結果が出る前に投与される場合もある。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Doctors typically wait for bacterial culture results before prescribing antibiotics. This reduces antibiotic resistance — but means you may wait longer for treatment.', JP: '細菌培養の結果が出てから処方するのが一般的。薬剤耐性を抑える効果があるが、時間がかかることも。' } },
    note: { EN: 'Japan has one of the lowest antibiotic overprescription rates in the world. Trust the process.', JP: '日本は抗生物質の過剰処方率が世界最低水準。プロセスを信頼しましょう。' },
  },
  {
    section: 'clinical', icon: 'medication', color: '#b22620',
    title: { EN: 'Pain management — a different threshold', JP: '疼痛管理 — モルヒネと強い鎮痛剤', ZH: '疼痛管理——不同的标准', 'ZH-T': '疼痛管理——不同的標準', KO: '통증 관리 — 다른 기준', ES: 'Manejo del dolor — un umbral diferente', FR: 'Gestion de la douleur — un seuil différent', IT: 'Gestione del dolore — una soglia diversa', TL: 'Pamamahala ng sakit — ibang pamantayan', ID: 'Manajemen nyeri — ambang batas yang berbeda', DE: 'Schmerzmanagement — eine andere Schwelle', PT: 'Gestão da dor — um limiar diferente', RU: 'Управление болью — другой порог' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Opioids are prescribed more broadly for post-operative pain and chronic conditions. Pain relief is treated as a patient right.', JP: 'オピオイドは術後疼痛や慢性疾患に広く処方され、痛みの緩和は患者の権利として認識されている。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Morphine and strong opioids are primarily reserved for cancer pain and end-of-life care. Post-surgery pain is typically managed with Tylenol (カロナール) and NSAIDs (ロキソニン). The underlying philosophy is more conservative — stoicism around pain is culturally ingrained.', JP: 'モルヒネなどの強力なオピオイドは主にがん性疼痛や終末期ケアに限定。術後は通常カロナールやロキソニンで対応。慣れている水準より痛みが残ると感じることがある。' } },
    note: { EN: 'If pain is unmanaged, explicitly say: "もっと強い鎮痛剤が必要です" (I need stronger pain relief). Speak up — don\'t wait.', JP: '痛みが管理されていない場合は「もっと強い鎮痛剤が必要です」と医師に直接伝えましょう。' },
  },
  {
    section: 'clinical', icon: 'volunteer_activism', color: '#b22620',
    title: { EN: 'Organ transplants — a critical gap', JP: '臓器移植 — 日本における大きな格差', ZH: '器官移植——关键缺口', 'ZH-T': '器官移植——關鍵缺口', KO: '장기이식 — 중요한 격차', ES: 'Trasplantes de órganos — una brecha crítica', FR: 'Transplantations d\'organes — un écart critique', IT: 'Trapianti di organi — un divario critico', TL: 'Organ transplant — isang kritikal na agwat', ID: 'Transplantasi organ — kesenjangan kritis', DE: 'Organtransplantationen — eine kritische Lücke', PT: 'Transplantes de órgãos — uma lacuna crítica', RU: 'Трансплантация органов — критический разрыв' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Organ donation and transplant programs are well-established. Waiting lists exist but transplants are performed regularly.', JP: '臓器提供・移植プログラムが確立されており、ウェイティングリストはあるものの移植は定期的に実施されている。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Organ donation rates in Japan are among the lowest in the developed world due to cultural and legal factors. Transplant-capable surgeons and facilities are extremely limited. If you need a transplant, it is highly possible you will need to return to your home country.', JP: '日本の臓器提供率は先進国の中で最も低い水準。文化的・法的背景が影響している。移植手術ができる医師・施設は非常に限られており、移植が必要になった場合、帰国が必要になる可能性が高い。' } },
    note: { EN: 'If you have a condition that may require a transplant, discuss this explicitly with your doctor early. Do not assume Japanese hospitals can perform it.', JP: '移植が必要になりうる疾患がある場合は、早い段階で医師に明確に相談を。日本で対応できると思い込まないこと。' },
  },
  {
    section: 'clinical', icon: 'health_and_safety', color: '#16a34a',
    title: { EN: 'Preventive medicine — Japan\'s checkup culture', JP: '予防医学 — 日本の健診文化', ZH: '预防医学——日本的体检文化', 'ZH-T': '預防醫學——日本的體檢文化', KO: '예방 의학 — 일본의 건강검진 문화', ES: 'Medicina preventiva — la cultura de chequeos de Japón', FR: 'Médecine préventive — la culture du bilan de santé au Japon', IT: 'Medicina preventiva — la cultura dei check-up in Giappone', TL: 'Preventibong medisina — kultura ng check-up sa Japan', ID: 'Kedokteran preventif — budaya pemeriksaan kesehatan Jepang', DE: 'Präventivmedizin — Japans Check-up-Kultur', PT: 'Medicina preventiva — a cultura de check-ups do Japão', RU: 'Профилактическая медицина — культура диспансеризации в Японии' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Annual checkups are recommended but vary widely in scope, cost, and whether they are mandated.', JP: '年に一度の健康診断は推奨されているが、内容・費用・義務の度合いは国によって大きく異なる。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Japan has one of the most organized preventive medicine cultures in the world. National health checkups (特定健診) are legally mandated for NHI enrollees aged 40–74. Employers must provide annual checkups (定期健康診断) for employees. Full-body examinations (人間ドック) are widely available for ¥20,000–¥50,000.', JP: '日本は世界でも最も組織化された予防医学文化の一つ。40〜74歳のNHI加入者には特定健診が法的に義務付けられており、企業は従業員に定期健康診断を実施しなければならない。人間ドックは2〜5万円程度で広く提供されている。' } },
    note: { EN: 'If you are 40+, check with your city hall whether you are eligible for the free 特定健診 — you may already be paying for it through your insurance premiums.', JP: '40歳以上の場合、市区町村で特定健診の受診資格を確認しましょう。保険料ですでに対象になっている可能性があります。' },
  },
  {
    section: 'clinical', icon: 'video_call', color: '#374151',
    title: { EN: 'Telemedicine — is it available?', JP: 'オンライン診療 — 使えるの？', ZH: '远程医疗——可以使用吗？', 'ZH-T': '遠距醫療——可以使用嗎？', KO: '원격 진료 — 이용 가능한가요?', ES: 'Telemedicina — ¿está disponible?', FR: 'Télémédecine — est-elle disponible ?', IT: 'Telemedicina — è disponibile?', TL: 'Telemedicine — available ba ito?', ID: 'Telemedicine — apakah tersedia?', DE: 'Telemedizin — ist sie verfügbar?', PT: 'Telemedicina — está disponível?', RU: 'Телемедицина — доступна ли она?' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Online consultations are widely available, often same-day.', JP: 'オンライン診療は広く普及。当日対応のアプリも多数ある。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Telemedicine (オンライン診療) exists but is not standard. Most conditions require an in-person visit. The system is slowly expanding post-COVID.', JP: 'オンライン診療は存在するが標準ではない。ほとんどの症状は対面診察が必要。コロナ後に徐々に拡大中。' } },
    note: { EN: 'Some clinics now offer オンライン診療 for follow-up appointments. Ask your clinic if it\'s available.', JP: 'フォローアップ診察にオンライン診療を導入しているクリニックもあります。事前に確認を。' },
  },
  {
    section: 'clinical', icon: 'psychology', color: '#374151',
    title: { EN: 'Mental health — the first step', JP: 'メンタルヘルス — 最初の一歩', ZH: '心理健康——第一步', 'ZH-T': '心理健康——第一步', KO: '정신 건강 — 첫 번째 단계', ES: 'Salud mental — el primer paso', FR: 'Santé mentale — le premier pas', IT: 'Salute mentale — il primo passo', TL: 'Kalusugang pangkaisipan — ang unang hakbang', ID: 'Kesehatan mental — langkah pertama', DE: 'Psychische Gesundheit — der erste Schritt', PT: 'Saúde mental — o primeiro passo', RU: 'Психическое здоровье — первый шаг' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Seeing a therapist or psychiatrist is increasingly normalized. Primary care doctors refer to mental health professionals routinely.', JP: '精神科やカウンセラーへの受診はむしろ奨励されており、かかりつけ医からの紹介も日常的。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'There is still social stigma around psychiatric care (精神科). A gentler first step is 心療内科 (psychosomatic medicine clinic), which is more accepted and treats stress, anxiety, and depression.', JP: '精神科への受診にはまだ社会的スティグマがある。最初のステップとしては「心療内科」がより受け入れやすく、ストレス・不安・うつを診てくれる。' } },
    note: { EN: 'If you\'re struggling: 心療内科 is the easiest entry point. No referral needed.', JP: 'つらい時は：心療内科が最も入りやすい窓口です。紹介状は不要。' },
  },
  // ── PRACTICAL & DAILY LIFE ───────────────────────────────────────────────
  {
    section: 'practical', icon: 'local_florist', color: '#7a5700',
    title: { EN: 'Flowers and food in the ward', JP: '病室への花・差し入れ', ZH: '病房内的鲜花与食物', 'ZH-T': '病房內的鮮花與食物', KO: '병실의 꽃과 음식', ES: 'Flores y comida en la sala', FR: 'Fleurs et nourriture dans le service', IT: 'Fiori e cibo in reparto', TL: 'Mga bulaklak at pagkain sa ward', ID: 'Bunga dan makanan di bangsal', DE: 'Blumen und Essen auf der Station', PT: 'Flores e comida na enfermaria', RU: 'Цветы и еда в палате' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Bringing flowers or outside food for a hospitalized patient is a common and welcome gesture of care from family and friends.', JP: '花や外部からの食べ物は、ケアの気持ちとして家族・友人が持参するのが一般的。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Flowers are prohibited in most wards for infection control reasons. Outside food must be cleared with staff in advance. Always check before bringing anything.', JP: 'ほとんどの病棟では感染管理の観点から花は厳禁。外部からの食べ物はスタッフへの確認が必要。事前に必ず確認しましょう。' } },
    note: { EN: 'A fruit basket may be permitted. Always check with the nurses\' station first.', JP: 'フルーツバスケットは許可される場合もあります。ナースステーションに確認を。' },
  },
  {
    section: 'practical', icon: 'restaurant', color: '#206777',
    title: { EN: 'Hospital meals and dietary rules', JP: '入院食 — 制限とルール', ZH: '住院餐食与饮食规定', 'ZH-T': '住院餐食與飲食規定', KO: '병원 식사와 식이 규정', ES: 'Comidas hospitalarias y reglas dietéticas', FR: 'Repas hospitaliers et règles alimentaires', IT: 'Pasti ospedalieri e regole dietetiche', TL: 'Mga pagkain sa ospital at mga patakaran sa diyeta', ID: 'Makanan rumah sakit dan aturan diet', DE: 'Krankenhausmahlzeiten und Ernährungsregeln', PT: 'Refeições hospitalares e regras alimentares', RU: 'Больничное питание и диетические правила' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Family can often bring meals from outside. Religious or dietary restrictions (halal, kosher, vegan) are generally accommodated on request.', JP: '家族が食事を持参するのは自由なことが多い。宗教・食事制限（ハラール・コーシャ・ヴィーガン）はリクエスト対応が一般的。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Outside food and snacks are generally not permitted, or require prior staff approval. Religious dietary requirements (halal, kosher) are typically not accommodated. Hospital meals follow a fixed, nutritionist-managed menu with very limited flexibility.', JP: '病院外からの食事・お菓子の持ち込みは原則禁止、または事前にスタッフへの確認が必要。宗教上の食事制限（ハラール・コーシャなど）には通常対応できない。病院食は栄養士が管理した固定メニュー。' } },
    note: { EN: 'Severe allergies must be declared to staff at admission. If you have religious dietary restrictions, contact the hospital before admission — options are extremely limited.', JP: '重篤なアレルギーは入院時にスタッフへ必ず伝えること。宗教上の食事制限がある場合は入院前に病院に相談を。' },
  },
  {
    section: 'practical', icon: 'no_luggage', color: '#374151',
    title: { EN: 'Valuables and personal belongings', JP: '入院時の貴重品と持ち物管理', ZH: '贵重物品与个人财物', 'ZH-T': '貴重物品與個人財物', KO: '귀중품 및 개인 소지품', ES: 'Objetos de valor y pertenencias personales', FR: 'Objets de valeur et effets personnels', IT: 'Oggetti di valore e effetti personali', TL: 'Mga mahahalagang bagay at personal na ari-arian', ID: 'Barang berharga dan barang pribadi', DE: 'Wertsachen und persönliche Gegenstände', PT: 'Objetos de valor e pertences pessoais', RU: 'Ценности и личные вещи' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Patients can generally keep personal belongings such as wallets and phones in their room. Policies vary by facility.', JP: '患者は財布・スマホなど個人の持ち物を部屋に保管できる。施設によってポリシーは異なる。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Belongings are typically checked at admission. Cash and credit cards may not be permitted in the room. Sharp objects, cigarettes, alcohol, and lighters are prohibited. A small locker may be provided.', JP: '入院時には持ち物を全てチェックされるのが一般的。現金・クレジットカードは病室への持ち込み不可の場合が多い。刃物・タバコ・アルコール・ライターは持ち込み禁止。小型ロッカーが提供される場合もある。' } },
    note: { EN: 'Leave valuables (cash, cards, jewelry) at home or with a family member before admission. Bring only essentials, and confirm specific rules with the hospital in advance.', JP: '貴重品（現金・カード・装飾品など）は家族に預けるか自宅に置いてから入院を。必需品のみを持参し、病院の具体的なルールは事前に確認しておくこと。' },
  },
  {
    section: 'practical', icon: 'directions_walk', color: '#206777',
    title: { EN: 'Leaving the ward', JP: '病棟外への外出・散歩', ZH: '离开病房', 'ZH-T': '離開病房', KO: '병동 밖으로 나가기', ES: 'Salir de la sala', FR: 'Quitter le service', IT: 'Lasciare il reparto', TL: 'Pag-alis sa ward', ID: 'Meninggalkan bangsal', DE: 'Die Station verlassen', PT: 'Sair da enfermaria', RU: 'Выход из палаты' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Family members can often take patients into the hallway or courtyard without any special procedure.', JP: '家族が患者を廊下や庭に連れ出すことは、特別な手続きなしで行えることが多い。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Leaving the ward — even for a short walk — requires prior permission from the attending physician or nurse. Depending on the patient\'s condition and ward policy, permission may not be granted. Never leave without permission.', JP: '病棟の外へ出ること（短い散歩も含む）には、担当医または看護師への事前許可が必要。患者の状態、治療方針、病棟のルールによって許可されないことも多い。許可なく連れ出すことは厳禁。' } },
    note: { EN: 'If you want to take a family member for a walk, ask the nurses\' station at least a day in advance. Permission may not always be granted.', JP: '家族を散歩に連れ出したい場合は、少なくとも1日前にナースステーションに申し出ましょう。許可されない場合もあります。' },
  },
  {
    section: 'practical', icon: 'smoke_free', color: '#374151',
    title: { EN: 'No smoking — anywhere on the premises', JP: '喫煙 — 敷地内全面禁煙', ZH: '禁止吸烟——任何地方都不允许', 'ZH-T': '禁止吸菸——任何地方都不允許', KO: '금연 — 구내 어디서도', ES: 'Prohibido fumar — en cualquier lugar de las instalaciones', FR: 'Interdiction de fumer — partout dans l\'établissement', IT: 'Vietato fumare — ovunque nelle strutture', TL: 'Bawal manigarilyo — kahit saan sa lugar', ID: 'Dilarang merokok — di mana pun di dalam gedung', DE: 'Rauchverbot — überall auf dem Gelände', PT: 'Proibido fumar — em qualquer lugar das instalações', RU: 'Курение запрещено — на всей территории' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Some hospitals have designated outdoor smoking areas where patients may smoke during their stay.', JP: '一部の病院では屋外喫煙エリアが設けられており、患者が喫煙できる場合もある。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Japanese hospitals are completely smoke-free, including all outdoor areas on the premises. If smoking is discovered during hospitalization, voluntary discharge may be requested — and in some cases, future admissions may be refused.', JP: '日本の病院は屋外を含む敷地内全面禁煙。入院中に喫煙が発覚した場合、自主退院を求められることがある。' } },
    note: { EN: 'There are no smoking areas available. If you are concerned about nicotine withdrawal, ask the nursing staff about nicotine patches or other alternatives at admission.', JP: '喫煙スペースは通常存在しません。ニコチン離脱症状が心配な場合は、入院時にニコチンパッチなどの代替手段を看護師に相談しましょう。' },
  },
  {
    section: 'practical', icon: 'bloodtype', color: '#b22620',
    title: { EN: 'Blood type — a cultural fixture', JP: '血液型 — 事前に確認しておこう', ZH: '血型——文化现象', 'ZH-T': '血型——文化現象', KO: '혈액형 — 문화적 상식', ES: 'Grupo sanguíneo — un elemento cultural', FR: 'Groupe sanguin — un élément culturel', IT: 'Gruppo sanguigno — un elemento culturale', TL: 'Blood type — isang kultural na tradisyon', ID: 'Golongan darah — bagian dari budaya', DE: 'Blutgruppe — ein kulturelles Thema', PT: 'Tipo sanguíneo — um elemento cultural', RU: 'Группа крови — культурный феномен' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Blood type is determined medically when needed. Most people outside Japan do not know their blood type from memory.', JP: '血液型は必要な際に医療的に調べるもの。日常的に把握していない人も多い。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Blood type (血液型) is deeply embedded in Japanese culture — asked at clinic registration, used in personality discussions, and referenced socially. Medical staff will likely ask yours at intake.', JP: '日本では血液型は日常的な話題で、入院・外来受付時に「血液型を教えてください」と聞かれる可能性が高い。A・B・O・ABのいずれかを事前に把握しておくと受付がスムーズになる。' } },
    note: { EN: 'Check your passport, previous medical records, or blood donor card. Saying "I don\'t know" is fine — staff can test — but may visibly surprise Japanese staff.', JP: 'パスポート、保険証、過去の医療記録などで確認しておきましょう。本当に知らない場合でも問題はありません（検査で確認できます）が、「知らない」と言うと驚かれることがあります。' },
  },
  {
    section: 'practical', icon: 'print', color: '#206777',
    title: { EN: 'Lab results and medical records — still paper-based', JP: '検査結果と医療記録', ZH: '检查结果与医疗记录——仍以纸质为主', 'ZH-T': '檢查結果與醫療記錄——仍以紙質為主', KO: '검사 결과와 의료 기록 — 아직 종이 기반', ES: 'Resultados y registros médicos — todavía en papel', FR: 'Résultats et dossiers médicaux — encore sur papier', IT: 'Risultati e cartelle cliniche — ancora su carta', TL: 'Mga resulta ng lab at medikal na rekord — papel pa rin', ID: 'Hasil lab dan rekam medis — masih berbasis kertas', DE: 'Laborbefunde und Krankenakten — noch papierbasiert', PT: 'Resultados e registros médicos — ainda em papel', RU: 'Результаты анализов и медкарты — до сих пор на бумаге' },
    abroad: { flag: '🌍', label: ABROAD_LABEL, text: { EN: 'Lab results are available via patient portal apps, often within hours. Sharing and downloading records is easy.', JP: '検査結果はアプリで数時間以内に確認でき、ダウンロード・共有も可能。' } },
    japan:  { flag: '🇯🇵', label: JAPAN_LABEL, text: { EN: 'Results are printed on paper and handed to you at your next appointment. Online patient portals are rare. Digitization is slowly expanding with the マイナ保険証 (My Number health card) system, but adoption is uneven.', JP: '結果は紙で印刷され、次回の診察時に手渡しされる。マイナ保険証の普及でデジタル化は進みつつある。' } },
    note: { EN: 'Apps like ユビー and パシャカルテ can help you photograph and organize your Japanese medical records. Keep your paper records — they matter.', JP: 'ユビーやパシャカルテなどのアプリを使うと、日本の医療記録をデジタル管理できます。' },
  },
]


const CAT_LABEL = { EN: 'Medical Culture', JP: '医療文化', ZH: '医疗文化', 'ZH-T': '醫療文化', KO: '의료 문화', ES: 'Cultura Médica', FR: 'Culture Médicale', IT: 'Cultura Medica', TL: 'Kulturang Medikal', ID: 'Budaya Medis', DE: 'Medizinische Kultur', PT: 'Cultura Médica', RU: 'Медицинская культура' }
const INTRO = {
  EN: "Japan's medical system is excellent — but it works differently from what many foreigners expect. These aren't quality issues; they're cultural and philosophical differences. Knowing them in advance prevents frustration and helps you get the best care.",
  JP: '日本の医療制度は、外国人にとっていくつかの驚きがあります。医療の質そのものの問題ではなく、文化・哲学・慣習の違いです。知っておくことで、戸惑いを防ぎ、より良い医療体験ができます。',
  ZH: '日本的医疗体系非常优秀，但对许多外国人来说运作方式有所不同。这不是医疗质量问题，而是文化和哲学上的差异。提前了解这些差异，可以避免困惑，帮助您获得最好的医疗体验。',
  'ZH-T': '日本的醫療體系非常優秀，但對許多外國人來說運作方式有所不同。這不是醫療品質問題，而是文化和哲學上的差異。提前了解這些差異，可以避免困惑，幫助您獲得最好的醫療體驗。',
  KO: '일본의 의료 시스템은 세계적 수준입니다. 그러나 많은 외국인이 기대하는 것과 다르게 작동합니다. 이는 의료 품질의 문제가 아니라 문화적·철학적 차이입니다. 미리 알아두면 당혹감을 방지하고 더 나은 의료 경험을 할 수 있습니다.',
  ES: 'El sistema médico de Japón es excelente, pero funciona de manera diferente a lo que muchos extranjeros esperan. No son problemas de calidad, son diferencias culturales y filosóficas.',
  FR: 'Le système médical japonais est excellent, mais il fonctionne différemment de ce que beaucoup d\'étrangers attendent. Ce ne sont pas des problèmes de qualité, ce sont des différences culturelles.',
  DE: 'Japans Medizinsystem ist exzellent, funktioniert aber anders als viele Ausländer erwarten. Es sind keine Qualitätsprobleme, sondern kulturelle und philosophische Unterschiede.',
  PT: 'O sistema médico do Japão é excelente, mas funciona de maneira diferente do que muitos estrangeiros esperam. Não são problemas de qualidade, são diferenças culturais e filosóficas.',
  RU: 'Медицинская система Японии превосходна, но работает иначе, чем ожидают многие иностранцы. Это не проблемы качества, а культурные и философские различия.',
  IT: 'Il sistema medico giapponese è eccellente, ma funziona diversamente da ciò che molti stranieri si aspettano. Non sono problemi di qualità, ma differenze culturali e filosofiche.',
  TL: 'Ang sistemang medikal ng Japan ay mahusay — ngunit naiiba ang pagpapatakbo nito. Hindi ito tungkol sa kalidad, kundi sa mga pagkakaiba sa kultura at pilosopiya.',
  ID: 'Sistem medis Jepang sangat baik — tetapi bekerja berbeda dari yang diharapkan banyak orang asing. Ini bukan masalah kualitas, tetapi perbedaan budaya dan filosofis.',
}
const BOTTOM = {
  EN: "Japan has world-class healthcare. Understanding the differences as 'a different philosophy' rather than 'wrong' will help you navigate the system and get the best care possible.",
  JP: '日本の医療は世界トップレベルです。違いを「おかしい」と感じるのではなく、「異なる哲学」として理解することが、より良いケアを受けるための第一歩です。',
  ZH: '日本拥有世界一流的医疗水平。将这些差异理解为"不同的哲学"而非"错误"，将有助于您更好地利用这个医疗系统，获得最优质的照护。',
  'ZH-T': '日本擁有世界一流的醫療水平。將這些差異理解為「不同的哲學」而非「錯誤」，將有助於您更好地利用這個醫療系統，獲得最優質的照護。',
  KO: '일본은 세계적 수준의 의료를 보유하고 있습니다. 차이점을 "잘못된 것"이 아닌 "다른 철학"으로 이해하면 시스템을 더 잘 활용하고 최선의 진료를 받을 수 있습니다.',
  ES: 'Japón tiene atención médica de clase mundial. Entender las diferencias como "una filosofía diferente" te ayudará a navegar el sistema.',
  FR: 'Le Japon a des soins de santé de classe mondiale. Comprendre les différences comme "une philosophie différente" vous aidera à naviguer dans le système.',
  DE: 'Japan hat erstklassige Gesundheitsversorgung. Die Unterschiede als "andere Philosophie" zu verstehen, hilft Ihnen, das System zu navigieren.',
  PT: 'O Japão tem saúde de classe mundial. Entender as diferenças como "uma filosofia diferente" ajudará a navegar no sistema.',
  RU: 'В Японии медицина мирового класса. Понимание различий как "другой философии" поможет вам ориентироваться в системе.',
  IT: 'Il Giappone ha un\'assistenza sanitaria di livello mondiale. Capire le differenze come "una filosofia diversa" ti aiuterà a navigare nel sistema.',
  TL: 'Ang Japan ay may world-class na pangangalagang pangkalusugan. Ang pag-unawa sa mga pagkakaiba bilang "ibang pilosopiya" ay makakatulong sa iyo na mag-navigate sa sistema.',
  ID: 'Jepang memiliki layanan kesehatan kelas dunia. Memahami perbedaan sebagai "filosofi yang berbeda" akan membantu Anda menavigasi sistem.',
}
const BOTTOM_LABEL = { EN: 'Bottom line: ', JP: 'まとめ：', ZH: '总结：', 'ZH-T': '總結：', KO: '요약: ', ES: 'En resumen: ', FR: 'En résumé : ', IT: 'In sintesi: ', TL: 'Sa madaling salita: ', ID: 'Intinya: ', DE: 'Fazit: ', PT: 'Em resumo: ', RU: 'Итог: ' }

export default function CulturePage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)

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

      <div style={{ marginBottom: 20, marginTop: 16 }}>
        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b22620', fontWeight: 700, marginBottom: 8 }}>
          {tl(CAT_LABEL, lang)}
        </p>
        <h1 className="font-headline" style={{ fontSize: 24, fontWeight: 800, color: '#1e1b1c', lineHeight: 1.3, marginBottom: 10 }}>{tl(TITLE, lang)}</h1>
        <p style={{ fontSize: 13, color: '#78716c' }}>{tl(SUB, lang)}</p>
      </div>

      <div style={{ height: 1, background: 'rgba(226,190,186,0.3)', marginBottom: 24 }} />

      <p style={{ fontSize: 14, color: '#5a413d', lineHeight: 1.7, marginBottom: 32 }}>{tl(INTRO, lang)}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DIFFS.flatMap((d, i) => {
          const isNewSection = i === 0 || d.section !== DIFFS[i - 1].section
          const els = []
          if (isNewSection) {
            els.push(
              <div key={`sec-${d.section}`} style={{ marginTop: i === 0 ? 0 : 16, marginBottom: 4, paddingBottom: 8, borderBottom: '1px solid #f0ebe9' }}>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716c' }}>
                  {tl(SECTION_LABELS[d.section] ?? {}, lang)}
                </p>
              </div>
            )
          }
          els.push(
            <section key={i} style={{ background: '#fff', borderRadius: 16, padding: '20px', border: '1px solid rgba(226,190,186,0.2)', borderLeft: `3px solid ${d.color}` }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: d.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{d.icon}</span>
                </div>
                <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, color: '#1e1b1c' }}>{tl(d.title, lang)}</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                <div style={{ background: '#f8f8f8', borderRadius: 10, padding: '12px 14px' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{d.abroad.flag} {tl(d.abroad.label, lang)}</p>
                  <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{tl(d.abroad.text, lang)}</p>
                </div>
                <div style={{ background: '#fff8f0', borderRadius: 10, padding: '12px 14px', border: `1px solid ${d.color}20` }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: d.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{d.japan.flag} {tl(d.japan.label, lang)}</p>
                  <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{tl(d.japan.text, lang)}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '10px 12px', background: '#faf2f2', borderRadius: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#b22620', flexShrink: 0, marginTop: 1 }}>lightbulb</span>
                <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.55 }}>{tl(d.note, lang)}</p>
              </div>
            </section>
          )
          return els
        })}
      </div>

      <div style={{ marginTop: 28, background: '#faf2f2', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)' }}>
        <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.6 }}>
          <strong>{tl(BOTTOM_LABEL, lang)}</strong>
          {tl(BOTTOM, lang)}
        </p>
      </div>
    </main>
  )
}
