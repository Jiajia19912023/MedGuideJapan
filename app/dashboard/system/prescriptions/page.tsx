'use client'
import Link from 'next/link'
import { useLang } from '../../lang-context'
import { useSaved } from '../../saved-context'
import { tr, COMMON } from '../../translations'

const ITEM = { href: '/dashboard/system/prescriptions', title: 'Prescription Rules', titleJP: '処方薬のルール', icon: 'medication', color: '#206777' }
function tl(m: Record<string,string>, l: string) { return m[l] ?? m['EN'] }

const TITLE = { EN: 'Prescription Rules', JP: '処方薬のルール', ZH: '处方药规定', 'ZH-T': '處方藥規定', KO: '처방전 규정', ES: 'Reglas de Recetas Médicas', FR: 'Règles de Prescription', IT: 'Regole sulle Prescrizioni', TL: 'Mga Patakaran sa Reseta', ID: 'Aturan Resep', DE: 'Rezeptregeln', PT: 'Regras de Prescrição', RU: 'Правила рецептов', YUE: '處方藥規定' }
const SUB   = { EN: 'How prescriptions work in Japan and what to expect.', JP: '日本での処方薬の仕組みと注意点。', ZH: '日本处方药的运作方式及注意事项。', 'ZH-T': '日本處方藥的運作方式及注意事項。', KO: '일본에서 처방전이 어떻게 작동하는지.', ES: 'Cómo funcionan las recetas en Japón.', FR: 'Comment fonctionnent les ordonnances au Japon.', IT: 'Come funzionano le prescrizioni in Giappone.', TL: 'Paano gumagana ang mga reseta sa Japan.', ID: 'Bagaimana resep bekerja di Jepang.', DE: 'Wie Rezepte in Japan funktionieren.', PT: 'Como funcionam as prescrições no Japão.', RU: 'Как работают рецепты в Японии.', YUE: '日本處方藥嘅運作方式及注意事項。' }

const H_FLOW  = { EN: 'From Doctor to Pharmacy', JP: '処方から受け取りまでの流れ', ZH: '从就诊到取药流程', 'ZH-T': '從就診到取藥流程', KO: '처방에서 수령까지 흐름', ES: 'Del Médico a la Farmacia', FR: 'Du Médecin à la Pharmacie', IT: 'Dal Medico alla Farmacia', TL: 'Mula sa Doktor hanggang Parmasya', ID: 'Dari Dokter ke Apotek', DE: 'Vom Arzt zur Apotheke', PT: 'Do Médico à Farmácia', RU: 'От врача до аптеки', YUE: '從就診到取藥流程' }
const H_TIPS  = { EN: 'Useful to Know', JP: '役立つ知識', ZH: '实用知识', 'ZH-T': '實用知識', KO: '알아두면 유용한 정보', ES: 'Información Útil', FR: 'Informations Utiles', IT: 'Informazioni Utili', TL: 'Kapaki-pakinabang na Malaman', ID: 'Informasi Berguna', DE: 'Nützliche Informationen', PT: 'Informações Úteis', RU: 'Полезно знать', YUE: '實用知識' }
const H_MEDS  = { EN: 'Commonly Prescribed Medicines', JP: 'よく処方される薬', ZH: '常见处方药', 'ZH-T': '常見處方藥', KO: '자주 처방되는 약', ES: 'Medicamentos Comúnmente Recetados', FR: 'Médicaments Couramment Prescrits', IT: 'Farmaci Comunemente Prescritti', TL: 'Mga Karaniwang Iniresetang Gamot', ID: 'Obat yang Sering Diresepkan', DE: 'Häufig Verschriebene Medikamente', PT: 'Medicamentos Comumente Prescritos', RU: 'Часто назначаемые лекарства', YUE: '常見處方藥' }
const IMPORTANT = { EN: 'Important: ', JP: '重要：', ZH: '重要：', 'ZH-T': '重要：', KO: '중요: ', ES: 'Importante: ', FR: 'Important : ', IT: 'Importante: ', TL: 'Mahalaga: ', ID: 'Penting: ', DE: 'Wichtig: ', PT: 'Importante: ', RU: 'Важно: ', YUE: '重要：' }
const IMPORTANT_TEXT = {
  EN: 'Prescriptions in Japan expire 4 days after issue. Be aware of weekends. An expired prescription requires a new doctor visit.',
  JP: '処方箋の有効期限は発行から4日以内です。土日を挟む場合はご注意ください。期限切れの場合は再受診が必要です。',
  ZH: '日本的处方单自开具之日起4天内有效。请注意周末情况。过期处方需重新就诊。',
  'ZH-T': '日本的處方單自開具之日起4天內有效。請注意週末情況。過期處方需重新就診。',
  KO: '일본 처방전은 발행일로부터 4일 이내에 유효합니다. 주말에 주의하세요. 기간이 지난 처방전은 재진이 필요합니다.',
  ES: 'Las recetas en Japón vencen 4 días después de su emisión. Tenga en cuenta los fines de semana. Una receta vencida requiere una nueva visita al médico.',
  FR: 'Les ordonnances au Japon expirent 4 jours après leur émission. Attention aux week-ends. Une ordonnance expirée nécessite une nouvelle consultation.',
  DE: 'Rezepte in Japan verfallen 4 Tage nach Ausstellung. Wochenenden beachten. Ein abgelaufenes Rezept erfordert einen neuen Arztbesuch.',
  PT: 'As prescrições no Japão vencem 4 dias após a emissão. Atenção aos fins de semana. Uma prescrição vencida requer nova consulta.',
  RU: 'Рецепты в Японии действительны 4 дня с момента выдачи. Учтите выходные. Просроченный рецепт требует нового визита к врачу.',
  IT: 'Le prescrizioni in Giappone scadono 4 giorni dopo l\'emissione. Attenzione ai weekend. Una prescrizione scaduta richiede una nuova visita.',
  TL: 'Ang mga reseta sa Japan ay nag-eexpire pagkatapos ng 4 na araw. Mag-ingat sa mga weekend. Ang na-expire na reseta ay nangangailangan ng bagong pagbisita sa doktor.',
  ID: 'Resep di Jepang kedaluwarsa 4 hari setelah diterbitkan. Perhatikan hari libur. Resep kedaluwarsa memerlukan kunjungan dokter baru.',
  YUE: '日本嘅處方單自開具之日起4天內有效。請注意週末情況。過期處方需重新就診。',
}
const BACK_RX = { EN: '← Back to Referrals', JP: '紹介状について戻る', ZH: '← 返回转诊信', 'ZH-T': '← 返回轉診信', KO: '← 의뢰서로 돌아가기', ES: '← Volver a Derivaciones', FR: '← Retour aux Références', IT: '← Torna ai Referral', TL: '← Bumalik sa Referral', ID: '← Kembali ke Rujukan', DE: '← Zurück zu Überweisungen', PT: '← Voltar aos Encaminhamentos', RU: '← Назад к направлениям', YUE: '← 返回轉診信' }

const STEPS: Record<string, { icon: string; title: string; desc: string }[]> = {
  EN: [
    { icon: 'medical_services', title: 'Doctor issues a prescription (処方箋)', desc: 'After your clinic or hospital visit, the doctor writes a 処方箋 (shohōsen). This slip lists your medicines, dosage, and instructions.' },
    { icon: 'local_pharmacy', title: 'Take it to a pharmacy (薬局)', desc: 'You can use any licensed pharmacy (薬局, yakkyoku) — not just the one attached to the clinic. Many patients use their local 薬局 so the pharmacist knows their full medication history.' },
    { icon: 'payments', title: 'Pay for your medicine', desc: 'With NHI: you pay 30% of the medicine cost. Without insurance: you pay 100%. Most prescriptions cost ¥200–¥1,500 with insurance.' },
    { icon: 'info', title: 'Prescription is valid for 4 days', desc: 'Japanese prescriptions expire after 4 days from the date of issue. Fill it promptly — you cannot use it after the expiration, and you\'ll need to revisit the doctor.' },
  ],
  JP: [
    { icon: 'medical_services', title: '医師が処方箋を発行', desc: 'クリニックや病院の受診後、医師が処方箋（しょほうせん）を発行します。薬の種類・用量・使用方法が記載されています。' },
    { icon: 'local_pharmacy', title: '薬局に持参する', desc: 'クリニック併設の薬局でなくても構いません。かかりつけ薬局を持つと、薬剤師が服用中の薬を把握してくれるため安心です。' },
    { icon: 'payments', title: '薬代を支払う', desc: 'NHI加入時：薬代の30%を自己負担。未加入時：全額（10割）自己負担。保険があれば多くの場合200〜1,500円程度です。' },
    { icon: 'info', title: '処方箋の有効期限は4日間', desc: '日本の処方箋は発行日から4日間のみ有効です。期限内に薬局で受け取るようにしてください。期限を過ぎると再受診が必要になります。' },
  ],
  ZH: [
    { icon: 'medical_services', title: '医生开具处方单（処方箋）', desc: '就诊结束后，医生会开一张処方箋（shohōsen）。上面列有药品名称、剂量和用法说明。' },
    { icon: 'local_pharmacy', title: '前往药局（薬局）取药', desc: '可以去任何持牌薬局，不必是诊所附设的药局。很多患者会固定使用同一家薬局，方便药剂师了解用药史。' },
    { icon: 'payments', title: '支付药费', desc: '持NHI：自付30%。无保险：全额自付（100%）。有保险的情况下，大多数处方约需200至1,500日元。' },
    { icon: 'info', title: '处方单有效期为4天', desc: '日本处方单自开具之日起4天内有效。请尽快去薬局取药，过期后不得使用，需要重新就诊。' },
  ],
  'ZH-T': [
    { icon: 'medical_services', title: '醫生開具處方單（処方箋）', desc: '就診結束後，醫生會開一張処方箋（shohōsen）。上面列有藥品名稱、劑量和用法說明。' },
    { icon: 'local_pharmacy', title: '前往藥局（薬局）取藥', desc: '可以去任何持牌薬局，不必是診所附設的藥局。很多患者會固定使用同一家薬局，方便藥劑師了解用藥史。' },
    { icon: 'payments', title: '支付藥費', desc: '持NHI：自付30%。無保險：全額自付（100%）。有保險的情況下，大多數處方約需200至1,500日元。' },
    { icon: 'info', title: '處方單有效期為4天', desc: '日本處方單自開具之日起4天內有效。請儘快去薬局取藥，過期後不得使用，需要重新就診。' },
  ],
  KO: [
    { icon: 'medical_services', title: '의사가 처방전(処方箋) 발행', desc: '진료 후 의사가 処方箋(shohōsen)를 발행합니다. 약 이름, 용량, 복용 방법이 기재되어 있습니다.' },
    { icon: 'local_pharmacy', title: '약국(薬局)에 제출', desc: '클리닉 부설 약국이 아닌 아무 약국(薬局)이나 이용할 수 있습니다. 단골 약국을 정해두면 약사가 복용 이력을 파악할 수 있어 안전합니다.' },
    { icon: 'payments', title: '약값 지불', desc: 'NHI 가입 시: 약값의 30% 자부담. 미가입 시: 전액(100%) 자부담. 보험 있으면 대부분 200~1,500엔 정도입니다.' },
    { icon: 'info', title: '처방전 유효기간은 4일', desc: '일본 처방전은 발행일로부터 4일 이내에만 유효합니다. 기간 내에 약국에서 수령하세요. 기간이 지나면 재진이 필요합니다.' },
  ],
  ES: [
    { icon: 'medical_services', title: 'El médico emite una receta (処方箋)', desc: 'Tras la consulta, el médico escribe una 処方箋 (shohōsen). Este documento lista sus medicamentos, dosis e instrucciones.' },
    { icon: 'local_pharmacy', title: 'Llévela a una farmacia (薬局)', desc: 'Puede usar cualquier farmacia (薬局) autorizada, no solo la del consultorio. Muchos pacientes usan su farmacia local para que el farmacéutico conozca su historial completo.' },
    { icon: 'payments', title: 'Pague su medicina', desc: 'Con NHI: paga el 30% del costo. Sin seguro: paga el 100%. La mayoría de recetas cuestan ¥200–¥1,500 con seguro.' },
    { icon: 'info', title: 'La receta es válida por 4 días', desc: 'Las recetas en Japón vencen 4 días después de la emisión. Llénela pronto — no puede usarla después del vencimiento, y deberá volver al médico.' },
  ],
  FR: [
    { icon: 'medical_services', title: 'Le médecin délivre une ordonnance (処方箋)', desc: 'Après votre visite, le médecin rédige une 処方箋 (shohōsen). Ce document liste vos médicaments, dosages et instructions.' },
    { icon: 'local_pharmacy', title: 'Apportez-la à une pharmacie (薬局)', desc: 'Vous pouvez utiliser n\'importe quelle pharmacie (薬局) agréée — pas seulement celle rattachée à la clinique. Beaucoup de patients utilisent leur 薬局 locale pour que le pharmacien connaisse tout leur historique.' },
    { icon: 'payments', title: 'Payez vos médicaments', desc: 'Avec NHI: vous payez 30% du coût. Sans assurance: vous payez 100%. La plupart des ordonnances coûtent ¥200–¥1,500 avec assurance.' },
    { icon: 'info', title: 'L\'ordonnance est valide 4 jours', desc: 'Les ordonnances japonaises expirent après 4 jours. Remplissez-la rapidement — vous ne pouvez pas l\'utiliser après expiration, vous devrez revisiter le médecin.' },
  ],
  IT: [
    { icon: 'medical_services', title: 'Il medico emette una prescrizione (処方箋)', desc: 'Dopo la visita, il medico scrive una 処方箋 (shohōsen). Questo documento elenca i tuoi farmaci, dosaggio e istruzioni.' },
    { icon: 'local_pharmacy', title: 'Portala a una farmacia (薬局)', desc: 'Puoi usare qualsiasi farmacia (薬局) autorizzata — non solo quella allegata alla clinica. Molti pazienti usano la loro 薬局 locale per far conoscere al farmacista il loro storico completo.' },
    { icon: 'payments', title: 'Paga i tuoi farmaci', desc: 'Con NHI: paghi il 30% del costo. Senza assicurazione: paghi il 100%. La maggior parte delle prescrizioni costa ¥200–¥1.500 con assicurazione.' },
    { icon: 'info', title: 'La prescrizione è valida 4 giorni', desc: 'Le prescrizioni giapponesi scadono dopo 4 giorni dall\'emissione. Compilatela prontamente — non potete usarla dopo la scadenza, dovrete rivisitare il medico.' },
  ],
  TL: [
    { icon: 'medical_services', title: 'Mag-isyu ang doktor ng reseta (処方箋)', desc: 'Pagkatapos ng iyong pagbisita, sumusulat ang doktor ng 処方箋 (shohōsen). Nakalista dito ang iyong mga gamot, dosis at mga tagubilin.' },
    { icon: 'local_pharmacy', title: 'Dalhin sa parmasya (薬局)', desc: 'Maaari kang pumunta sa anumang lisensyadong parmasya (薬局) — hindi kailangang ang naka-attach sa klinika. Maraming pasyente ang gumagamit ng lokal na 薬局 para malaman ng parmasyutiko ang buong kasaysayan.' },
    { icon: 'payments', title: 'Bayaran ang iyong gamot', desc: 'May NHI: nagbabayad ng 30% ng halaga ng gamot. Walang insurance: nagbabayad ng 100%. Ang karamihang reseta ay nagkakahalaga ng ¥200–¥1,500 na may insurance.' },
    { icon: 'info', title: 'Ang reseta ay may bisa sa loob ng 4 na araw', desc: 'Ang mga reseta sa Japan ay nag-eexpire pagkatapos ng 4 na araw mula sa petsa ng pag-isyu. Punan ito agad — hindi mo ito magagamit pagkatapos ng pagkaka-expire, at kailangan mong bumalik sa doktor.' },
  ],
  ID: [
    { icon: 'medical_services', title: 'Dokter mengeluarkan resep (処方箋)', desc: 'Setelah kunjungan, dokter menulis 処方箋 (shohōsen). Dokumen ini mencantumkan obat, dosis, dan instruksi Anda.' },
    { icon: 'local_pharmacy', title: 'Bawa ke apotek (薬局)', desc: 'Anda bisa menggunakan apotek (薬局) mana saja yang berlisensi — tidak hanya yang terpasang di klinik. Banyak pasien menggunakan 薬局 lokal agar apoteker mengetahui riwayat pengobatan lengkap mereka.' },
    { icon: 'payments', title: 'Bayar obat Anda', desc: 'Dengan NHI: Anda membayar 30% dari biaya obat. Tanpa asuransi: Anda membayar 100%. Sebagian besar resep biaya ¥200–¥1.500 dengan asuransi.' },
    { icon: 'info', title: 'Resep berlaku 4 hari', desc: 'Resep Jepang kedaluwarsa setelah 4 hari sejak tanggal penerbitan. Isi segera — Anda tidak dapat menggunakannya setelah kedaluwarsa, dan harus kembali ke dokter.' },
  ],
  DE: [
    { icon: 'medical_services', title: 'Arzt stellt ein Rezept aus (処方箋)', desc: 'Nach Ihrem Besuch schreibt der Arzt eine 処方箋 (shohōsen). Dieses Dokument listet Ihre Medikamente, Dosierung und Anweisungen auf.' },
    { icon: 'local_pharmacy', title: 'Zur Apotheke bringen (薬局)', desc: 'Sie können jede zugelassene Apotheke (薬局) nutzen — nicht nur die der Klinik. Viele Patienten nutzen ihre lokale 薬局, damit der Apotheker ihre vollständige Medikationshistorie kennt.' },
    { icon: 'payments', title: 'Bezahlen Sie Ihre Medikamente', desc: 'Mit NHI: Sie zahlen 30% der Medikamentenkosten. Ohne Versicherung: Sie zahlen 100%. Die meisten Rezepte kosten ¥200–¥1.500 mit Versicherung.' },
    { icon: 'info', title: 'Das Rezept ist 4 Tage gültig', desc: 'Japanische Rezepte laufen 4 Tage nach Ausstellung ab. Lösen Sie es umgehend ein — Sie können es nach Ablauf nicht mehr verwenden und müssen den Arzt erneut besuchen.' },
  ],
  PT: [
    { icon: 'medical_services', title: 'Médico emite uma prescrição (処方箋)', desc: 'Após sua consulta, o médico escreve uma 処方箋 (shohōsen). Este documento lista seus medicamentos, dosagem e instruções.' },
    { icon: 'local_pharmacy', title: 'Leve a uma farmácia (薬局)', desc: 'Você pode usar qualquer farmácia (薬局) licenciada — não apenas a da clínica. Muitos pacientes usam sua 薬局 local para que o farmacêutico conheça o histórico completo.' },
    { icon: 'payments', title: 'Pague por seus medicamentos', desc: 'Com NHI: você paga 30% do custo do medicamento. Sem seguro: você paga 100%. A maioria das prescrições custa ¥200–¥1.500 com seguro.' },
    { icon: 'info', title: 'A receita é válida por 4 dias', desc: 'As prescrições japonesas vencem 4 dias após a emissão. Preencha-a prontamente — não pode usá-la após o vencimento, e terá que revisitar o médico.' },
  ],
  RU: [
    { icon: 'medical_services', title: 'Врач выдаёт рецепт (処方箋)', desc: 'После приёма врач пишет 処方箋 (shohōsen). В этом документе перечислены ваши лекарства, дозировка и инструкции.' },
    { icon: 'local_pharmacy', title: 'Отнесите в аптеку (薬局)', desc: 'Можно использовать любую лицензированную аптеку (薬局) — не только при клинике. Многие пациенты ходят в свою постоянную 薬局, чтобы фармацевт знал их полную историю.' },
    { icon: 'payments', title: 'Оплатите лекарства', desc: 'С NHI: платите 30% стоимости лекарств. Без страховки: платите 100%. Большинство рецептов стоит ¥200–¥1 500 со страховкой.' },
    { icon: 'info', title: 'Рецепт действителен 4 дня', desc: 'Японские рецепты истекают через 4 дня с момента выдачи. Отоварьте его скорее — после истечения срока он недействителен, придётся посетить врача снова.' },
  ],
  YUE: [
    { icon: 'medical_services', title: '醫生開具處方單（処方箋）', desc: '就診結束後，醫生會開一張処方箋（shohōsen）。上面列有藥品名稱、劑量同用法說明。' },
    { icon: 'local_pharmacy', title: '前往藥局（薬局）取藥', desc: '可以去任何持牌薬局，唔一定要係診所附設嘅薬局。好多患者會固定用同一間薬局，方便藥劑師了解用藥記錄。' },
    { icon: 'payments', title: '支付藥費', desc: '有NHI：自付30%。冇保險：全額自付（100%）。有保險嘅情況下，大多數處方約需¥200至¥1,500。' },
    { icon: 'info', title: '處方單有效期為4天', desc: '日本嘅處方單自開具之日起4天內有效。請儘快去薬局取藥，過期後唔可以使用，需要重新就診。' },
  ],
}

const TIPS: Record<string, { label: string; desc: string }[]> = {
  EN: [
    { label: 'Generic drugs (後発品)', desc: 'Ask the pharmacy for generic versions (後発品, kōhatsuhin). They are cheaper and equally effective. The pharmacist can explain options.' },
    { label: 'Dispensing fee (調剤料)', desc: 'Pharmacies charge a separate dispensing fee (¥300–¥800). This is normal and is also covered 30% by NHI.' },
    { label: 'Medication notebook (お薬手帳)', desc: 'Your pharmacist will offer an お薬手帳 (drug history booklet). Keep all your prescriptions here — it prevents dangerous drug interactions and helps any doctor you visit.' },
    { label: 'Bringing medicine from abroad', desc: 'Some foreign medications are controlled or banned in Japan. Check before traveling. You can bring a 1–2 month supply for personal use with a doctor\'s note.' },
    { label: 'OTC medicines (市販薬)', desc: 'Common medicines (cold, pain, stomach) are available over-the-counter at pharmacies (薬局) and drug stores (ドラッグストア) without a prescription.' },
  ],
  JP: [
    { label: 'ジェネリック薬品（後発品）', desc: '薬局でジェネリック（後発品）を希望することができます。先発品と同等の効果で費用を抑えられます。薬剤師に相談しましょう。' },
    { label: '調剤料について', desc: '薬局では調剤料（約300〜800円）が別途かかります。これは正常な費用で、NHI加入者は30%負担となります。' },
    { label: 'お薬手帳の活用', desc: '薬局でお薬手帳の作成を勧められます。処方薬の記録を一冊にまとめておくことで、薬の飲み合わせ事故を防ぎ、どの医療機関でも情報共有ができます。' },
    { label: '海外からの薬の持ち込み', desc: '日本で規制・禁止されている薬もあります。渡航前に確認を。個人使用目的であれば医師の証明書とともに1〜2ヶ月分の持ち込みが認められる場合があります。' },
    { label: '市販薬について', desc: '風邪薬・鎮痛剤・胃腸薬などは処方箋なしで薬局やドラッグストアで購入できます。' },
  ],
  ZH: [
    { label: '仿制药（後発品）', desc: '可以向药局申请仿制药（後発品，kōhatsuhin）。效果与原研药相同，但价格更低。可向药剂师咨询。' },
    { label: '调剂费（調剤料）', desc: '药局会另外收取调剂费（约300至800日元）。这是正常费用，NHI持有者只需自付30%。' },
    { label: '用药手册（お薬手帳）', desc: '药剂师会建议您建立お薬手帳（用药记录本）。将所有处方记录在此，可预防药物相互作用，并方便任何医生了解您的用药情况。' },
    { label: '携带海外药品', desc: '某些外国药品在日本受到管制或禁止。出发前请确认。持医生证明，个人使用目的可携带1至2个月的用量。' },
    { label: '非处方药（市販薬）', desc: '感冒药、止痛药、肠胃药等常见药物无需处方，可在薬局或ドラッグストア（药妆店）直接购买。' },
  ],
  'ZH-T': [
    { label: '學名藥（後発品）', desc: '可以向藥局申請學名藥（後発品，kōhatsuhin）。效果與原研藥相同，但價格更低。可向藥劑師諮詢。' },
    { label: '調劑費（調剤料）', desc: '藥局會另外收取調劑費（約300至800日元）。這是正常費用，NHI持有者只需自付30%。' },
    { label: '用藥手冊（お薬手帳）', desc: '藥劑師會建議您建立お薬手帳（用藥記錄本）。將所有處方記錄在此，可預防藥物相互作用，並方便任何醫生了解您的用藥情況。' },
    { label: '攜帶海外藥品', desc: '某些外國藥品在日本受到管制或禁止。出發前請確認。持醫生證明，個人使用目的可攜帶1至2個月的用量。' },
    { label: '非處方藥（市販薬）', desc: '常見藥物（感冒、疼痛、腸胃）無需處方，可在薬局或ドラッグストア（藥妝店）直接購買。' },
  ],
  KO: [
    { label: '제네릭 약품(後発品)', desc: '약국에서 제네릭(後発品, kōhatsuhin)을 요청할 수 있습니다. 오리지널과 동일한 효과이며 더 저렴합니다.' },
    { label: '조제료(調剤料)', desc: '약국에서는 별도의 조제료(300~800엔)가 청구됩니다. 정상적인 비용이며 NHI 가입자는 30%만 부담합니다.' },
    { label: '투약 수첩(お薬手帳)', desc: '약사가 お薬手帳(투약 기록 수첩)을 권할 것입니다. 모든 처방 기록을 여기에 보관하면 약물 상호작용을 방지하고 어느 의사에게도 정보를 공유할 수 있습니다.' },
    { label: '해외 약품 반입', desc: '일부 외국 약품은 일본에서 규제 또는 금지됩니다. 여행 전에 확인하세요. 의사 소견서와 함께 1~2개월 분의 개인 사용 의약품은 반입이 허용될 수 있습니다.' },
    { label: '일반의약품(市販薬)', desc: '감기약, 진통제, 소화제 등은 처방전 없이 薬局(약국)이나 ドラッグストア(드럭스토어)에서 구입할 수 있습니다.' },
  ],
  ES: [
    { label: 'Medicamentos genéricos (後発品)', desc: 'Solicite en la farmacia versiones genéricas (後発品, kōhatsuhin). Son más baratos e igualmente efectivos. El farmacéutico puede explicar las opciones.' },
    { label: 'Tarifa de dispensación (調剤料)', desc: 'Las farmacias cobran una tarifa de dispensación por separado (¥300–¥800). Esto es normal y también está cubierto al 30% por NHI.' },
    { label: 'Libreta de medicamentos (お薬手帳)', desc: 'Su farmacéutico le ofrecerá un お薬手帳 (libreta de historial). Conserve todas sus recetas aquí — previene interacciones peligrosas y ayuda a cualquier médico que visite.' },
    { label: 'Traer medicina del extranjero', desc: 'Algunos medicamentos extranjeros están controlados o prohibidos en Japón. Verifique antes de viajar. Puede traer un suministro de 1–2 meses para uso personal con nota médica.' },
    { label: 'Medicamentos sin receta (市販薬)', desc: 'Los medicamentos comunes (resfriado, dolor, estómago) están disponibles sin receta en farmacias (薬局) y tiendas de drogas (ドラッグストア).' },
  ],
  FR: [
    { label: 'Médicaments génériques (後発品)', desc: 'Demandez à la pharmacie des versions génériques (後発品, kōhatsuhin). Ils sont moins chers et tout aussi efficaces. Le pharmacien peut expliquer les options.' },
    { label: 'Frais de délivrance (調剤料)', desc: 'Les pharmacies facturent des frais de délivrance séparés (¥300–¥800). C\'est normal et aussi couvert à 30% par NHI.' },
    { label: 'Carnet de médicaments (お薬手帳)', desc: 'Votre pharmacien vous proposera un お薬手帳 (carnet d\'historique). Conservez toutes vos ordonnances ici — cela prévient les interactions dangereuses et aide tout médecin que vous consultez.' },
    { label: 'Apporter des médicaments de l\'étranger', desc: 'Certains médicaments étrangers sont contrôlés ou interdits au Japon. Vérifiez avant de voyager. Vous pouvez apporter un approvisionnement de 1–2 mois pour usage personnel avec une note du médecin.' },
    { label: 'Médicaments sans ordonnance (市販薬)', desc: 'Les médicaments courants (rhume, douleur, estomac) sont disponibles sans ordonnance dans les pharmacies (薬局) et les drogueries (ドラッグストア).' },
  ],
  IT: [
    { label: 'Farmaci generici (後発品)', desc: 'Chiedi alla farmacia versioni generiche (後発品, kōhatsuhin). Sono più economici ed ugualmente efficaci. Il farmacista può spiegare le opzioni.' },
    { label: 'Tariffa di dispensazione (調剤料)', desc: 'Le farmacie applicano una tariffa di dispensazione separata (¥300–¥800). È normale ed è anch\'essa coperta al 30% dall\'NHI.' },
    { label: 'Taccuino dei farmaci (お薬手帳)', desc: 'Il farmacista vi offrirà un お薬手帳 (libretto della storia farmacologica). Tenetevi tutte le prescrizioni — previene interazioni pericolose e aiuta qualsiasi medico visitiate.' },
    { label: 'Portare medicine dall\'estero', desc: 'Alcuni farmaci stranieri sono controllati o vietati in Giappone. Verificare prima di viaggiare. È possibile portare una fornitura di 1–2 mesi per uso personale con nota medica.' },
    { label: 'Farmaci da banco (市販薬)', desc: 'I farmaci comuni (raffreddore, dolore, stomaco) sono disponibili senza ricetta nelle farmacie (薬局) e drogherie (ドラッグストア).' },
  ],
  TL: [
    { label: 'Generic na gamot (後発品)', desc: 'Humingi sa parmasya ng generic na bersyon (後発品, kōhatsuhin). Mas mura at pantay-pantay ang epekto. Ang parmasyutiko ay maaaring magpaliwanag ng mga opsyon.' },
    { label: 'Bayad sa dispensasyon (調剤料)', desc: 'Ang mga parmasya ay nagsingil ng hiwalay na dispensing fee (¥300–¥800). Normal ito at sakop din ng 30% ng NHI.' },
    { label: 'Notebook ng gamot (お薬手帳)', desc: 'Ang iyong parmasyutiko ay mag-aalok ng お薬手帳 (booklet ng kasaysayan ng gamot). Itago ang lahat ng iyong mga reseta dito — pinipigilan ang mapanganib na interaksyon at tumutulong sa sinumang doktor.' },
    { label: 'Pagdadala ng gamot mula sa ibang bansa', desc: 'Ang ilang dayuhang gamot ay kontrolado o ipinagbabawal sa Japan. Suriin bago maglakbay. Maaari kang magdala ng suplay ng 1–2 buwan para sa personal na paggamit na may nota ng doktor.' },
    { label: 'Gamot na walang reseta (市販薬)', desc: 'Ang mga karaniwang gamot (sipon, sakit, tiyan) ay available nang walang reseta sa mga parmasya (薬局) at drug store (ドラッグストア).' },
  ],
  ID: [
    { label: 'Obat generik (後発品)', desc: 'Minta ke apotek versi generik (後発品, kōhatsuhin). Lebih murah dan sama efektifnya. Apoteker bisa menjelaskan pilihannya.' },
    { label: 'Biaya peracikan (調剤料)', desc: 'Apotek mengenakan biaya peracikan terpisah (¥300–¥800). Ini normal dan juga ditanggung 30% oleh NHI.' },
    { label: 'Buku catatan obat (お薬手帳)', desc: 'Apoteker Anda akan menawarkan お薬手帳 (buku catatan riwayat obat). Simpan semua resep di sini — mencegah interaksi obat berbahaya dan membantu dokter mana pun yang Anda kunjungi.' },
    { label: 'Membawa obat dari luar negeri', desc: 'Beberapa obat asing dikontrol atau dilarang di Jepang. Periksa sebelum bepergian. Anda bisa membawa persediaan 1–2 bulan untuk penggunaan pribadi dengan catatan dokter.' },
    { label: 'Obat bebas (市販薬)', desc: 'Obat umum (pilek, nyeri, perut) tersedia tanpa resep di apotek (薬局) dan toko obat (ドラッグストア).' },
  ],
  DE: [
    { label: 'Generika (後発品)', desc: 'Bitten Sie die Apotheke um Generika (後発品, kōhatsuhin). Sie sind günstiger und gleich wirksam. Der Apotheker kann Optionen erklären.' },
    { label: 'Abgabegebühr (調剤料)', desc: 'Apotheken berechnen eine separate Abgabegebühr (¥300–¥800). Das ist normal und wird auch zu 30% von NHI übernommen.' },
    { label: 'Medikamentenheft (お薬手帳)', desc: 'Ihr Apotheker wird Ihnen ein お薬手帳 (Medikamentenbüchlein) anbieten. Bewahren Sie alle Ihre Rezepte hier auf — verhindert gefährliche Wechselwirkungen und hilft jedem Arzt, den Sie besuchen.' },
    { label: 'Medikamente aus dem Ausland mitbringen', desc: 'Einige ausländische Medikamente sind in Japan kontrolliert oder verboten. Prüfen Sie dies vor der Reise. Sie können einen 1-2-Monats-Vorrat für den persönlichen Gebrauch mit ärztlichem Attest mitbringen.' },
    { label: 'Rezeptfreie Medikamente (市販薬)', desc: 'Gängige Medikamente (Erkältung, Schmerzen, Magen) sind ohne Rezept in Apotheken (薬局) und Drogerien (ドラッグストア) erhältlich.' },
  ],
  PT: [
    { label: 'Medicamentos genéricos (後発品)', desc: 'Peça à farmácia versões genéricas (後発品, kōhatsuhin). São mais baratos e igualmente eficazes. O farmacêutico pode explicar as opções.' },
    { label: 'Taxa de dispensação (調剤料)', desc: 'As farmácias cobram uma taxa de dispensação separada (¥300–¥800). Isso é normal e também é coberto a 30% pelo NHI.' },
    { label: 'Caderneta de medicamentos (お薬手帳)', desc: 'Seu farmacêutico oferecerá um お薬手帳 (caderneta de histórico). Guarde todas as suas prescrições aqui — previne interações perigosas e ajuda qualquer médico que você visitar.' },
    { label: 'Trazer medicamentos do exterior', desc: 'Alguns medicamentos estrangeiros são controlados ou proibidos no Japão. Verifique antes de viajar. Pode trazer um suprimento de 1–2 meses para uso pessoal com nota médica.' },
    { label: 'Medicamentos sem receita (市販薬)', desc: 'Medicamentos comuns (resfriado, dor, estômago) estão disponíveis sem receita em farmácias (薬局) e drogarias (ドラッグストア).' },
  ],
  RU: [
    { label: 'Дженерики (後発品)', desc: 'Попросите в аптеке дженерики (後発品, kōhatsuhin). Они дешевле и столь же эффективны. Фармацевт может объяснить варианты.' },
    { label: 'Плата за отпуск (調剤料)', desc: 'Аптеки взимают отдельную плату за отпуск лекарств (¥300–¥800). Это нормально и тоже покрывается на 30% страховкой NHI.' },
    { label: 'Книжка лекарств (お薬手帳)', desc: 'Фармацевт предложит вам お薬手帳 (книжку лекарственной истории). Храните все рецепты здесь — предотвращает опасные взаимодействия и помогает любому врачу, которого вы посетите.' },
    { label: 'Ввоз лекарств из-за рубежа', desc: 'Некоторые иностранные лекарства в Японии под контролем или запрещены. Проверьте перед поездкой. Можно ввезти запас на 1–2 месяца для личного использования с медицинской справкой.' },
    { label: 'Безрецептурные лекарства (市販薬)', desc: 'Обычные лекарства (от простуды, боли, желудка) продаются без рецепта в аптеках (薬局) и аптечных магазинах (ドラッグストア).' },
  ],
  YUE: [
    { label: '學名藥（後発品）', desc: '可以向薬局申請學名藥（後発品，kōhatsuhin）。效果與原研藥相同，但價格更低。可向藥劑師諮詢。' },
    { label: '調劑費（調剤料）', desc: '藥局會另外收取調劑費（約¥300至¥800）。這係正常費用，NHI持有者只需自付30%。' },
    { label: '用藥手冊（お薬手帳）', desc: '藥劑師會建議你建立お薬手帳（用藥記錄本）。將所有處方記錄喺度，可預防藥物相互作用，並方便任何醫生了解你嘅用藥情況。' },
    { label: '攜帶海外藥品', desc: '某些外國藥品在日本受到管制或禁止。出發前請確認。持醫生證明，個人使用目的可攜帶1至2個月嘅用量。' },
    { label: '非處方藥（市販薬）', desc: '常見藥物（感冒、疼痛、腸胃）無需處方，可喺薬局或ドラッグストア（藥妝店）直接購買。' },
  ],
}

const COMMON_MEDS: Record<string, { jp: string; en: string }[]> = {
  EN: [
    { jp: 'ロキソニン / Loxonin', en: 'NSAID painkiller (Loxoprofen) — common for pain/fever' },
    { jp: 'カロナール / Calonarl', en: 'Acetaminophen (Tylenol equivalent) — fever & mild pain' },
    { jp: '抗生物質', en: 'Antibiotics — prescription only, must complete full course' },
    { jp: '花粉症薬', en: 'Antihistamine for hay fever/allergies — available OTC or Rx' },
  ],
  JP: [
    { jp: 'ロキソニン', en: 'NSAIDs系鎮痛剤（ロキソプロフェン）— 痛み・発熱に広く使用' },
    { jp: 'カロナール', en: 'アセトアミノフェン（解熱・鎮痛）— 比較的副作用が少ない' },
    { jp: '抗生物質', en: '要処方箋。処方された分を必ず飲み切ることが重要です' },
    { jp: '花粉症薬（抗ヒスタミン薬）', en: '市販薬でも入手可。ひどい場合は処方薬の方が効果的' },
  ],
  ZH: [
    { jp: 'ロキソニン / 洛索洛芬', en: 'NSAIDs类止痛药 — 常用于疼痛和发烧' },
    { jp: 'カロナール / 对乙酰氨基酚', en: '解热止痛药（相当于泰诺）— 用于发烧和轻度疼痛' },
    { jp: '抗生物質 / 抗生素', en: '需处方。必须按疗程服完，不可中途停药' },
    { jp: '花粉症薬 / 抗过敏药', en: '用于花粉过敏等。部分可在薬局直接购买，严重时需处方' },
  ],
  'ZH-T': [
    { jp: 'ロキソニン / 洛索洛芬', en: 'NSAIDs類止痛藥 — 常用於疼痛和發燒' },
    { jp: 'カロナール / 對乙酰氨基酚', en: '解熱止痛藥（相當於泰諾）— 用於發燒和輕度疼痛' },
    { jp: '抗生物質 / 抗生素', en: '需處方。必須按療程服完，不可中途停藥' },
    { jp: '花粉症薬 / 抗過敏藥', en: '用於花粉過敏等。部分可在薬局直接購買，嚴重時需處方' },
  ],
  KO: [
    { jp: 'ロキソニン / 록소닌', en: 'NSAIDs계 진통제 — 통증과 발열에 흔히 사용' },
    { jp: 'カロナール / 아세트아미노펜', en: '해열·진통제(타이레놀 동등품) — 발열과 가벼운 통증' },
    { jp: '抗生物質 / 항생제', en: '처방 필요. 처방된 기간 동안 반드시 복용 완료해야 함' },
    { jp: '花粉症薬 / 항히스타민제', en: '꽃가루 알레르기 등에 사용. 일부는 약국에서 직접 구매 가능' },
  ],
  ES: [
    { jp: 'ロキソニン / Loxonin', en: 'Analgésico AINE (Loxoprofeno) — común para dolor/fiebre' },
    { jp: 'カロナール / Calonarl', en: 'Acetaminofeno (equivalente al Tylenol) — para fiebre y dolor leve' },
    { jp: '抗生物質 / Antibióticos', en: 'Solo con receta. Debe completar el ciclo completo.' },
    { jp: '花粉症薬 / Antihistamínico', en: 'Para alergia al polen. Disponible OTC o con receta.' },
  ],
  FR: [
    { jp: 'ロキソニン / Loxonin', en: 'Analgésique AINS (Loxoprofène) — courant pour douleur/fièvre' },
    { jp: 'カロナール / Calonarl', en: 'Acétaminophène (équivalent Tylenol) — pour fièvre et douleur légère' },
    { jp: '抗生物質 / Antibiotiques', en: 'Sur ordonnance uniquement. Doit compléter le cycle complet.' },
    { jp: '花粉症薬 / Antihistaminique', en: 'Pour rhume des foins/allergies. Disponible OTC ou sur ordonnance.' },
  ],
  IT: [
    { jp: 'ロキソニン / Loxonin', en: 'Analgesico FANS (Loxoprofene) — comune per dolore/febbre' },
    { jp: 'カロナール / Calonarl', en: 'Acetaminofene (equivalente al Tylenol) — per febbre e dolore lieve' },
    { jp: '抗生物質 / Antibiotici', en: 'Solo con prescrizione. Deve completare il ciclo completo.' },
    { jp: '花粉症薬 / Antistaminico', en: 'Per febbre da fieno/allergie. Disponibile OTC o su prescrizione.' },
  ],
  TL: [
    { jp: 'ロキソニン / Loxonin', en: 'NSAID painkiller (Loxoprofen) — karaniwan para sa sakit/lagnat' },
    { jp: 'カロナール / Calonarl', en: 'Acetaminophen (katumbas ng Tylenol) — para sa lagnat at banayad na sakit' },
    { jp: '抗生物質 / Antibiotics', en: 'Reseta lamang. Kailangan tapusin ang buong kurso.' },
    { jp: '花粉症薬 / Antihistamine', en: 'Para sa hay fever/allergy. Available OTC o Rx.' },
  ],
  ID: [
    { jp: 'ロキソニン / Loxonin', en: 'Pereda nyeri NSAID (Loxoprofen) — umum untuk nyeri/demam' },
    { jp: 'カロナール / Calonarl', en: 'Asetaminofen (setara Tylenol) — untuk demam & nyeri ringan' },
    { jp: '抗生物質 / Antibiotik', en: 'Hanya dengan resep. Harus menyelesaikan kursus penuh.' },
    { jp: '花粉症薬 / Antihistamin', en: 'Untuk alergi serbuk sari. Tersedia OTC atau Rx.' },
  ],
  DE: [
    { jp: 'ロキソニン / Loxonin', en: 'NSAID-Schmerzmittel (Loxoprofen) — häufig bei Schmerzen/Fieber' },
    { jp: 'カロナール / Calonarl', en: 'Acetaminophen (Tylenol-Äquivalent) — bei Fieber & leichten Schmerzen' },
    { jp: '抗生物質 / Antibiotika', en: 'Nur auf Rezept. Vollständigen Kurs abschließen.' },
    { jp: '花粉症薬 / Antihistaminikum', en: 'Für Heuschnupfen/Allergien. Ohne Rezept oder Rx erhältlich.' },
  ],
  PT: [
    { jp: 'ロキソニン / Loxonin', en: 'Analgésico AINE (Loxoprofeno) — comum para dor/febre' },
    { jp: 'カロナール / Calonarl', en: 'Acetaminofeno (equivalente ao Tylenol) — para febre e dor leve' },
    { jp: '抗生物質 / Antibióticos', en: 'Apenas com receita. Deve completar o ciclo completo.' },
    { jp: '花粉症薬 / Anti-histamínico', en: 'Para febre do feno/alergias. Disponível sem receita ou Rx.' },
  ],
  RU: [
    { jp: 'ロキソニン / Loxonin', en: 'НПВС болеутоляющее (локсопрофен) — при боли/жаре' },
    { jp: 'カロナール / Calonarl', en: 'Ацетаминофен (аналог Тайленола) — при жаре и слабой боли' },
    { jp: '抗生物質 / Антибиотики', en: 'Только по рецепту. Курс нужно пройти полностью.' },
    { jp: '花粉症薬 / Антигистамин', en: 'При поллинозе/аллергии. Безрецептурный или Rx.' },
  ],
  YUE: [
    { jp: 'ロキソニン / 洛索洛芬', en: 'NSAIDs類止痛藥（洛索洛芬）— 常用於疼痛同發燒' },
    { jp: 'カロナール / 對乙酰氨基酚', en: '解熱止痛藥（相當於泰諾）— 用於發燒同輕度疼痛' },
    { jp: '抗生物質 / 抗生素', en: '需處方。必須按療程服完，唔可以中途停藥。' },
    { jp: '花粉症薬 / 抗過敏藥', en: '用於花粉過敏等。部分可喺薬局直接購買，嚴重時需處方。' },
  ],
}

export default function PrescriptionsPage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const steps = STEPS[lang] ?? STEPS['EN']
  const tips = TIPS[lang] ?? TIPS['EN']
  const meds = COMMON_MEDS[lang] ?? COMMON_MEDS['EN']

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
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#206777', fontVariationSettings: "'FILL' 1" as string }}>medication</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800 }}>{tl(TITLE, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28 }}>{tl(SUB, lang)}</p>

      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{tl(H_FLOW, lang)}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)', alignItems: 'flex-start' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#eef7f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#206777', fontVariationSettings: "'FILL' 1" as string }}>{s.icon}</span>
              </div>
              <div>
                <p className="font-headline" style={{ fontSize: 14, fontWeight: 700, color: '#1e1b1c', marginBottom: 4 }}>{s.title}</p>
                <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ background: '#fef9ec', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(122,87,0,0.15)', marginBottom: 28 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#7a5700', flexShrink: 0, marginTop: 1, fontVariationSettings: "'FILL' 1" as string }}>warning</span>
          <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>
            <strong>{tl(IMPORTANT, lang)}</strong>
            {tl(IMPORTANT_TEXT, lang)}
          </p>
        </div>
      </div>

      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{tl(H_TIPS, lang)}</h2>
        <div style={{ background: '#faf2f2', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(226,190,186,0.2)' }}>
          {tips.map((t, i) => (
            <div key={i} style={{ marginBottom: i < tips.length - 1 ? 14 : 0 }}>
              <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#206777', marginBottom: 3 }}>{t.label}</p>
              <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{tl(H_MEDS, lang)}</h2>
        <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(226,190,186,0.2)' }}>
          {meds.map((m, i) => (
            <div key={i} style={{ padding: '12px 16px', borderBottom: i < meds.length - 1 ? '1px solid rgba(226,190,186,0.12)' : 'none' }}>
              <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c', marginBottom: 3 }}>{m.jp}</p>
              <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.5 }}>{m.en}</p>
            </div>
          ))}
        </div>
      </section>

      <Link href="/dashboard/system/referrals" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#206777', textDecoration: 'none' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_back</span>
        {tl(BACK_RX, lang)}
      </Link>
    </main>
  )
}
