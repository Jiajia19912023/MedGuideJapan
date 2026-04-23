'use client'
import Link from 'next/link'
import { useLang } from '../lang-context'
import { useSaved } from '../saved-context'
import { tr, COMMON, NIGHTCARE } from '../translations'

const ITEM = { href: '/dashboard/night-care', title: 'Night & Holiday Care', titleJP: '夜間・休日診療', icon: 'bedtime', color: '#b22620' }
function tl(m: Record<string, string>, l: string) { return m[l] ?? m['EN'] }

const TYPES = [
  {
    title: { EN: '夜間・休日急患センター (Night/Holiday Emergency Center)', JP: '夜間・休日急患センター', ZH: '夜间/节假日急诊中心', 'ZH-T': '夜間/節假日急診中心', KO: '야간·휴일 응급 센터', ES: 'Centro de Urgencias Nocturnas/Festivos', FR: "Centre d'Urgences Nocturnes/Jours Fériés", IT: 'Centro Urgenze Notturne/Festivi', TL: 'Night/Holiday Emergency Center', ID: 'Pusat Darurat Malam/Hari Libur', DE: 'Nacht-/Feiertagsnotaufnahme', PT: 'Centro de Emergência Noturno/Feriado', RU: 'Ночной/праздничный центр скорой помощи' },
    icon: 'local_hospital', color: '#b22620',
    desc: { EN: 'Government-run centers available on nights and public holidays. Treats non-life-threatening conditions. Usually lower cost than hospital ER.', JP: '夜間・祝日に利用できる公立の急患センター。命に関わらない症状を診察。通常の救急病院より費用が安い。', ZH: '政府运营的夜间和节假日急诊中心。治疗非危及生命的疾病。通常费用低于医院急诊室。', 'ZH-T': '政府運營的夜間和節假日急診中心。治療非危及生命的疾病。通常費用低於醫院急診室。', KO: '정부 운영의 야간·공휴일 응급 센터. 생명을 위협하지 않는 증상을 진료. 보통 병원 응급실보다 비용이 저렴.', ES: 'Centros gubernamentales disponibles por las noches y días festivos. Trata condiciones no mortales. Generalmente más económico que el ER del hospital.', FR: "Centres gouvernementaux disponibles les nuits et jours fériés. Traite les conditions non mortelles. Généralement moins cher que les urgences hospitalières.", IT: 'Centri governativi disponibili di notte e nei giorni festivi. Tratta condizioni non pericolose per la vita. Di solito meno costoso del pronto soccorso.', TL: 'Mga sentro ng gobyerno na available sa gabi at pampublikong holidays. Ginagamot ang mga kondisyong hindi nagbabanta sa buhay. Karaniwang mas mura kaysa sa ER ng ospital.', ID: 'Pusat yang dikelola pemerintah, tersedia malam hari dan hari libur. Mengobati kondisi yang tidak mengancam jiwa. Biasanya lebih murah dari UGD rumah sakit.', DE: 'Staatlich betriebene Zentren, verfügbar nachts und an Feiertagen. Behandelt nicht lebensbedrohliche Erkrankungen. Meist günstiger als das Krankenhaus-ER.', PT: 'Centros governamentais disponíveis à noite e em feriados. Trata condições não fatais. Geralmente mais barato que o pronto-socorro do hospital.', RU: 'Государственные центры, работающие ночью и в праздники. Лечат незначительные состояния. Обычно дешевле больничного приёмного покоя.' },
  },
  {
    title: { EN: '救急病院 (Emergency Hospital)', JP: '救急病院', ZH: '急救医院', 'ZH-T': '急救醫院', KO: '응급병원', ES: 'Hospital de Emergencias', FR: "Hôpital d'Urgences", IT: 'Ospedale di Emergenza', TL: 'Emergency Hospital', ID: 'Rumah Sakit Darurat', DE: 'Notfallkrankenhaus', PT: 'Hospital de Emergência', RU: 'Экстренная больница' },
    icon: 'emergency', color: '#374151',
    desc: { EN: 'Available 24/7 for serious emergencies. May charge a ¥5,000–¥10,000 surcharge if arriving without referral or ambulance.', JP: '重篤な緊急事態に24時間対応。紹介状や救急車なしで受診した場合、5,000〜10,000円の加算料がかかる場合あり。', ZH: '24小时应对严重紧急情况。没有转诊或救护车到院可能会收取5,000〜10,000日元的附加费。', 'ZH-T': '24小時應對嚴重緊急情況。沒有轉診或救護車到院可能會收取5,000〜10,000日元的附加費。', KO: '심각한 응급 상황에 24시간 대응. 소개장이나 구급차 없이 방문 시 5,000〜10,000엔의 추가 요금이 발생할 수 있습니다.', ES: 'Disponible 24/7 para emergencias graves. Puede cobrar un recargo de ¥5,000–¥10,000 sin referencia o ambulancia.', FR: "Disponible 24h/24 pour les urgences graves. Peut facturer un supplément de ¥5 000–¥10 000 sans ordonnance ni ambulance.", IT: 'Disponibile 24/7 per emergenze gravi. Può addebitare ¥5.000–¥10.000 senza referenza o ambulanza.', TL: 'Available 24/7 para sa malalang emergency. Maaaring maningil ng ¥5,000–¥10,000 kung walang referral o ambulansya.', ID: 'Tersedia 24/7 untuk keadaan darurat serius. Mungkin mengenakan biaya ¥5.000–¥10.000 tanpa rujukan atau ambulans.', DE: 'Rund um die Uhr für ernsthafte Notfälle verfügbar. Kann ¥5.000–¥10.000 Aufschlag ohne Überweisung oder Krankenwagen berechnen.', PT: 'Disponível 24/7 para emergências graves. Pode cobrar ¥5.000–¥10.000 sem encaminhamento ou ambulância.', RU: 'Работает 24/7 при серьёзных экстренных ситуациях. Могут взимать ¥5 000–¥10 000 без направления или скорой.' },
  },
  {
    title: { EN: 'コンビニ受診 — Convenience Clinics', JP: 'コンビニ受診（夜間クリニック）', ZH: '便民门诊（夜间诊所）', 'ZH-T': '便民門診（夜間診所）', KO: '야간 편의 클리닉', ES: 'Clínicas de Conveniencia Nocturnas', FR: 'Cliniques de Nuit', IT: 'Cliniche Notturne', TL: 'Convenience Clinics (Gabi)', ID: 'Klinik Malam', DE: 'Nacht-Kliniken', PT: 'Clínicas Noturnas de Conveniência', RU: 'Ночные амбулаторные клиники' },
    icon: 'store', color: '#206777',
    desc: { EN: 'Some clinics near major stations keep extended hours. Check Google Maps for "夜間クリニック" near you.', JP: '主要駅周辺に営業時間が長いクリニックがあります。Googleマップで「夜間クリニック ＋ 都市名」を検索してみてください。', ZH: '一些主要车站附近的诊所延长营业时间。在谷歌地图搜索"夜間クリニック"（夜间诊所）附近。', 'ZH-T': '一些主要車站附近的診所延長營業時間。在谷歌地圖搜索"夜間クリニック"（夜間診所）附近。', KO: '주요 역 근처 일부 클리닉은 연장 운영합니다. 구글 지도에서 근처 "夜間クリニック"를 검색해보세요.', ES: 'Algunas clínicas cerca de estaciones importantes tienen horario extendido. Busca "夜間クリニック" en Google Maps.', FR: 'Certaines cliniques près des grandes gares ont des horaires prolongés. Cherchez "夜間クリニック" sur Google Maps.', IT: 'Alcune cliniche vicino alle stazioni principali hanno orari estesi. Cerca "夜間クリニック" su Google Maps.', TL: 'Ang ilang klinika malapit sa malalaking istasyon ay may mahabang oras. Hanapin ang "夜間クリニック" sa Google Maps.', ID: 'Beberapa klinik dekat stasiun besar memiliki jam buka yang panjang. Cari "夜間クリニック" di Google Maps.', DE: 'Einige Kliniken in der Nähe großer Bahnhöfe haben erweiterte Öffnungszeiten. Suche "夜間クリニック" auf Google Maps.', PT: 'Algumas clínicas perto de estações grandes têm horário estendido. Procure "夜間クリニック" no Google Maps.', RU: 'Некоторые клиники рядом с крупными станциями работают в расширенном режиме. Ищите "夜間クリニック" на Google Maps.' },
  },
]

const HOW_STEPS: Record<string, string[]> = {
  EN: ['Call #7119 — a nurse will advise you and recommend the nearest facility.','Search Google Maps: "夜間救急クリニック [your city]"',"Check your city's official website for a list of on-duty hospitals (輪番病院).","Ask your hotel/building concierge — they often have a local list ready."],
  JP: ['#7119に電話 — 看護師がアドバイスし、近くの施設を紹介してくれます。','Googleマップで「夜間救急クリニック ＋ 都市名」を検索。','お住まいの市区町村の公式サイトで輪番病院リストを確認。','ホテルや建物のコンシェルジュに聞く — 地域のリストを持っていることが多い。'],
  ZH: ['拨打#7119 — 护士会提供建议并推荐最近的设施。','在谷歌地图搜索："夜間救急クリニック [您的城市]"','查看您所在城市的官方网站，了解值班医院（輪番病院）列表。','询问您的酒店/建筑礼宾部 — 他们通常有当地列表。'],
  'ZH-T': ['撥打#7119 — 護士會提供建議並推薦最近的設施。','在谷歌地圖搜索："夜間救急クリニック [您的城市]"','查看您所在城市的官方網站，了解值班醫院（輪番病院）列表。','詢問您的酒店/建築禮賓部 — 他們通常有當地列表。'],
  KO: ['#7119에 전화하세요 — 간호사가 조언을 해주고 가장 가까운 시설을 추천해 줍니다.','구글 지도 검색: "夜間救急クリニック [도시명]"','귀하 도시의 공식 웹사이트에서 당직 병원(輪番病院) 목록을 확인하세요.','호텔/건물 컨시어지에게 물어보세요 — 지역 목록을 갖고 있는 경우가 많습니다.'],
  ES: ['Llama al #7119 — una enfermera te asesorará y recomendará la instalación más cercana.','Busca en Google Maps: "夜間救急クリニック [tu ciudad]"','Consulta el sitio web oficial de tu ciudad para obtener una lista de hospitales de guardia.','Pregunta al conserje de tu hotel/edificio — suelen tener una lista local.'],
  FR: ['Appelez le #7119 — une infirmière vous conseillera et recommandera l\'établissement le plus proche.','Recherchez sur Google Maps: "夜間救急クリニック [votre ville]"','Consultez le site officiel de votre ville pour la liste des hôpitaux de garde.','Demandez au concierge de votre hôtel/immeuble — ils ont souvent une liste locale.'],
  IT: ['Chiama il #7119 — un\'infermiera ti consiglierà e raccomanderà la struttura più vicina.','Cerca su Google Maps: "夜間救急クリニック [la tua città]"','Controlla il sito ufficiale della tua città per un elenco degli ospedali di turno.','Chiedi al concierge del tuo hotel/edificio — hanno spesso un elenco locale.'],
  TL: ['Tumawag sa #7119 — ang nars ay magbibigay ng payo at magrerekomenda ng pinakamalapit na pasilidad.','Maghanap sa Google Maps: "夜間救急クリニック [iyong lungsod]"','Tingnan ang opisyal na website ng iyong lungsod para sa listahan ng mga ospital na naka-duty.','Tanungin ang concierge ng iyong hotel/gusali — madalas ay mayroon silang lokal na listahan.'],
  ID: ['Hubungi #7119 — perawat akan memberi saran dan merekomendasikan fasilitas terdekat.','Cari di Google Maps: "夜間救急クリニック [kota Anda]"','Periksa situs web resmi kota Anda untuk daftar rumah sakit jaga.','Tanyakan kepada concierge hotel/gedung Anda — mereka sering memiliki daftar lokal.'],
  DE: ['Rufen Sie #7119 an — eine Pflegekraft berät Sie und empfiehlt die nächste Einrichtung.','Suche bei Google Maps: "夜間救急クリニック [Ihre Stadt]"','Prüfen Sie die offizielle Website Ihrer Stadt für die Liste der Bereitschaftskrankenhäuser.','Fragen Sie den Concierge Ihres Hotels/Gebäudes — sie haben oft eine lokale Liste.'],
  PT: ['Ligue para #7119 — uma enfermeira aconselhará você e recomendará a instalação mais próxima.','Pesquise no Google Maps: "夜間救急クリニック [sua cidade]"','Verifique o site oficial de sua cidade para a lista de hospitais de plantão.','Pergunte ao concierge do seu hotel/edifício — geralmente têm uma lista local.'],
  RU: ['Позвоните на #7119 — медсестра даст совет и порекомендует ближайшее учреждение.','Поиск в Google Maps: "夜間救急クリニック [ваш город]"','Проверьте официальный сайт вашего города для списка дежурных больниц.','Спросите консьержа отеля/здания — у них часто есть местный список.'],
}

const BRING_ITEMS: Record<string, string[]> = {
  EN: ['Health insurance card (保険証)','Residence card / Passport','Cash (¥5,000–¥15,000)','List of any current medications','Your phone with translation app ready'],
  JP: ['健康保険証','在留カード / パスポート','現金（5,000〜15,000円）','現在服用中の薬のリスト','翻訳アプリを起動したスマートフォン'],
  ZH: ['健康保险证（保険証）','在留卡 / 护照','现金（5,000〜15,000日元）','当前用药清单','准备好翻译应用的手机'],
  'ZH-T': ['健康保險證（保険証）','在留卡 / 護照','現金（5,000〜15,000日元）','當前用藥清單','準備好翻譯應用的手機'],
  KO: ['건강보험증（保険証）','재류카드 / 여권','현금（5,000〜15,000엔）','현재 복용 중인 약 목록','번역 앱을 켜둔 스마트폰'],
  ES: ['Tarjeta de seguro médico (保険証)','Tarjeta de residencia / Pasaporte','Efectivo (¥5,000–¥15,000)','Lista de medicamentos actuales','Teléfono con app de traducción lista'],
  FR: ["Carte d'assurance maladie (保険証)",'Carte de résidence / Passeport','Espèces (¥5 000–¥15 000)','Liste des médicaments actuels','Votre téléphone avec une application de traduction prête'],
  IT: ['Tessera sanitaria (保険証)','Permesso di soggiorno / Passaporto','Contanti (¥5.000–¥15.000)','Lista dei farmaci correnti','Telefono con app di traduzione pronta'],
  TL: ['Health insurance card (保険証)','Residence card / Pasaporte','Cash (¥5,000–¥15,000)','Listahan ng mga kasalukuyang gamot','Telepono na may translation app na handa'],
  ID: ['Kartu asuransi kesehatan (保険証)','Kartu residensi / Paspor','Uang tunai (¥5.000–¥15.000)','Daftar obat-obatan saat ini','Ponsel dengan aplikasi terjemahan siap'],
  DE: ['Krankenversicherungskarte (保険証)','Aufenthaltskarte / Reisepass','Bargeld (¥5.000–¥15.000)','Liste der aktuellen Medikamente','Ihr Telefon mit bereit stehender Übersetzungs-App'],
  PT: ['Cartão de seguro de saúde (保険証)','Cartão de residência / Passaporte','Dinheiro (¥5.000–¥15.000)','Lista de medicamentos atuais','Seu telefone com aplicativo de tradução pronto'],
  RU: ['Карта медицинского страхования (保険証)','Карта резидента / Паспорт','Наличные (¥5 000–¥15 000)','Список текущих лекарств','Телефон с готовым приложением-переводчиком'],
}

const CHECKLIST_LINK = { EN: 'See full preparation checklist', JP: '持ち物チェックリストを見る', ZH: '查看完整准备清单', 'ZH-T': '查看完整準備清單', KO: '전체 준비 체크리스트 보기', ES: 'Ver lista de preparación completa', FR: 'Voir la liste de préparation complète', IT: 'Vedi lista di preparazione completa', TL: 'Tingnan ang buong checklist', ID: 'Lihat daftar persiapan lengkap', DE: 'Vollständige Vorbereitungscheckliste ansehen', PT: 'Ver lista de preparação completa', RU: 'Посмотреть полный список подготовки' }

export default function NightCarePage() {
  const { lang } = useLang()
  const { isSaved, toggle } = useSaved()
  const saved = isSaved(ITEM.href)
  const steps = HOW_STEPS[lang] ?? HOW_STEPS.EN
  const bringItems = BRING_ITEMS[lang] ?? BRING_ITEMS.EN

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
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#b22620', fontVariationSettings: "'FILL' 1" as string }}>bedtime</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800, color: '#1e1b1c' }}>{tr(NIGHTCARE.title, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28 }}>{tr(NIGHTCARE.subtitle, lang)}</p>

      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{tr(NIGHTCARE.typesTitle, lang)}</h2>
        {TYPES.map(item => (
          <div key={item.icon} style={{ display: 'flex', gap: 14, background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)', marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{item.icon}</span>
            </div>
            <div>
              <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c', marginBottom: 5 }}>{tl(item.title, lang)}</p>
              <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{tl(item.desc, lang)}</p>
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{tr(NIGHTCARE.howToFind, lang)}</h2>
        <div style={{ background: '#faf2f2', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(226,190,186,0.2)' }}>
          {steps.map((text, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < steps.length - 1 ? 10 : 0, alignItems: 'flex-start' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#b22620', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
              <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(226,190,186,0.2)', marginBottom: 16 }}>
        <h2 className="font-headline" style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'text-bottom', marginRight: 4, fontVariationSettings: "'FILL' 1" as string, color: '#7a5700' }}>inventory_2</span>
          {tr(NIGHTCARE.whatToBring, lang)}
        </h2>
        {bringItems.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#16a34a', flexShrink: 0, marginTop: 1, fontVariationSettings: "'FILL' 1" as string }}>check_circle</span>
            <span style={{ fontSize: 13, color: '#1e1b1c' }}>{item}</span>
          </div>
        ))}
      </section>

      <Link href="/dashboard/checklist" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#b22620', textDecoration: 'none' }}>
        {tl(CHECKLIST_LINK, lang)}
        <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_forward</span>
      </Link>
    </main>
  )
}
