'use client'
import Link from 'next/link'
import { useLang } from '../../lang-context'
import { useSaved } from '../../saved-context'
import { tr, COMMON, ARTICLES } from '../../translations'

const ITEM = { href: '/dashboard/articles/late-night-medicine', title: 'Getting Medicine Late at Night', titleJP: '夜間に薬を入手する方法', icon: 'local_pharmacy', color: '#374151' }

function tl(m: Record<string,string>, l: string) { return m[l] ?? m['EN'] }

const INTRO = { EN: 'Most Japanese pharmacies close by 7–8 PM. If you need medicine at night, you still have several options.', JP: 'ほとんどの薬局は19〜20時に閉まります。夜中に薬が必要になっても、いくつかの選択肢があります。', ZH: '日本大多数药局在晚上7〜8点关门。如果夜间需要药物，您仍然有几种选择。', 'ZH-T': '日本大多數藥局在晚上7〜8點關門。如果夜間需要藥物，您仍然有幾種選擇。', KO: '일본의 대부분의 약국은 저녁 7〜8시에 문을 닫습니다. 밤에 약이 필요하더라도 몇 가지 선택지가 있습니다.', ES: 'La mayoría de las farmacias japonesas cierran a las 7–8 PM. Si necesita medicamentos por la noche, todavía tiene varias opciones.', FR: "La plupart des pharmacies japonaises ferment à 19h–20h. Si vous avez besoin de médicaments la nuit, vous avez encore plusieurs options.", IT: "La maggior parte delle farmacie giapponesi chiude alle 19-20. Se hai bisogno di medicine di notte, hai ancora diverse opzioni.", TL: 'Karamihan sa mga Japanese pharmacy ay nagsasara sa 7–8 PM. Kung kailangan mo ng gamot sa gabi, mayroon ka pa ring ilang pagpipilian.', ID: 'Sebagian besar apotek Jepang tutup pukul 19.00–20.00. Jika Anda membutuhkan obat di malam hari, Anda masih memiliki beberapa pilihan.', DE: 'Die meisten japanischen Apotheken schließen um 19–20 Uhr. Wenn Sie nachts Medikamente benötigen, haben Sie noch mehrere Möglichkeiten.', PT: 'A maioria das farmácias japonesas fecha às 19h–20h. Se você precisar de medicamentos à noite, ainda tem várias opções.', RU: 'Большинство японских аптек закрываются в 19–20 часов. Если вам нужны лекарства ночью, у вас всё равно есть несколько вариантов.' }
const SEC_OPTIONS = { EN: 'Your Options at Night', JP: '夜間の選択肢', ZH: '夜间选择', 'ZH-T': '夜間選擇', KO: '야간 선택지', ES: 'Sus Opciones por la Noche', FR: 'Vos Options la Nuit', IT: 'Le Tue Opzioni di Notte', TL: 'Ang Iyong Mga Pagpipilian sa Gabi', ID: 'Pilihan Anda di Malam Hari', DE: 'Ihre Optionen in der Nacht', PT: 'Suas Opções à Noite', RU: 'Ваши варианты ночью' }
const SEC_PACKAGING = { EN: 'Reading Japanese Medicine Packaging', JP: '日本の薬のパッケージを読む', ZH: '阅读日本药品包装', 'ZH-T': '閱讀日本藥品包裝', KO: '일본 의약품 포장 읽기', ES: 'Leer el Empaquetado de Medicamentos Japoneses', FR: 'Lire les Emballages de Médicaments Japonais', IT: 'Leggere il Packaging dei Farmaci Giapponesi', TL: 'Pagbabasa ng Japanese Medicine Packaging', ID: 'Membaca Kemasan Obat Jepang', DE: 'Japanische Medikamentenverpackungen lesen', PT: 'Lendo Embalagens de Medicamentos Japoneses', RU: 'Читаем японские упаковки лекарств' }
const PACKAGING_INTRO = { EN: "Most convenience store medicines are labeled in Japanese. Use Google Translate's camera mode to scan the label. Key words to look for:", JP: 'コンビニの薬はほとんど日本語表記です。Google翻訳のカメラ機能でラベルをスキャンしてください。覚えておくと便利なキーワード:', ZH: '便利店的药品大多用日文标注。请使用Google翻译的相机模式扫描标签。以下是需要注意的关键词：', 'ZH-T': '便利商店的藥品大多用日文標注。請使用Google翻譯的相機模式掃描標籤。以下是需要注意的關鍵詞：', KO: '편의점 의약품은 대부분 일본어로 표기되어 있습니다. Google 번역의 카메라 모드로 라벨을 스캔하세요. 알아두면 유용한 키워드:', ES: 'La mayoría de los medicamentos de tiendas de conveniencia están etiquetados en japonés. Use el modo cámara de Google Translate para escanear la etiqueta. Palabras clave a buscar:', FR: "La plupart des médicaments en épicerie sont étiquetés en japonais. Utilisez le mode caméra de Google Traduction pour scanner l'étiquette. Mots clés à rechercher :", IT: "La maggior parte dei medicinali nei negozi sono etichettati in giapponese. Usa la modalità fotocamera di Google Translate per scansionare l'etichetta. Parole chiave da cercare:", TL: 'Karamihan sa mga gamot sa convenience store ay may label sa Hapon. Gamitin ang camera mode ng Google Translate para i-scan ang label. Mga pangunahing salitang dapat hanapin:', ID: 'Sebagian besar obat di toko serba ada berlabel bahasa Jepang. Gunakan mode kamera Google Translate untuk memindai label. Kata kunci yang perlu dicari:', DE: 'Die meisten Medikamente in Convenience-Stores sind auf Japanisch etikettiert. Verwenden Sie den Kameramodus von Google Übersetzer, um das Etikett zu scannen. Schlüsselwörter, auf die Sie achten sollten:', PT: 'A maioria dos medicamentos em lojas de conveniência estão rotulados em japonês. Use o modo câmera do Google Translate para escanear o rótulo. Palavras-chave a procurar:', RU: 'Большинство лекарств в магазинах шаговой доступности подписаны по-японски. Используйте режим камеры Google Переводчика для сканирования этикетки. Ключевые слова:' }
const LINK_NIGHT = { EN: 'Find a night clinic near you', JP: '夜間クリニックを探す', ZH: '查找附近的夜间诊所', 'ZH-T': '查找附近的夜間診所', KO: '내 근처 야간 클리닉 찾기', ES: 'Encuentra una clínica nocturna cerca', FR: 'Trouver une clinique de nuit près de vous', IT: 'Trova una clinica notturna vicino a te', TL: 'Humanap ng night clinic malapit sa iyo', ID: 'Temukan klinik malam di dekat Anda', DE: 'Nacht-Klinik in Ihrer Nähe finden', PT: 'Encontre uma clínica noturna perto de você', RU: 'Найти ночную клинику рядом' }

const OPTIONS = [
  {
    icon: 'store', color: '#206777',
    title: { EN: 'Convenience Store (コンビニ)', JP: 'コンビニエンスストア', ZH: '便利店（コンビニ）', 'ZH-T': '便利商店（コンビニ）', KO: '편의점(コンビニ)', ES: 'Tienda de Conveniencia (コンビニ)', FR: 'Épicerie 24h (コンビニ)', IT: 'Convenience Store (コンビニ)', TL: 'Convenience Store (コンビニ)', ID: 'Minimarket (コンビニ)', DE: 'Convenience Store (コンビニ)', PT: 'Loja de Conveniência (コンビニ)', RU: 'Круглосуточный магазин (コンビニ)' },
    badge: { EN: 'Open 24h', JP: '24時間営業', ZH: '24小时营业', 'ZH-T': '24小時營業', KO: '24시간 운영', ES: 'Abierto 24h', FR: 'Ouvert 24h', IT: 'Aperto 24h', TL: 'Bukas 24h', ID: 'Buka 24 jam', DE: '24h geöffnet', PT: 'Aberto 24h', RU: 'Открыто 24ч' },
    badgeColor: '#206777',
    desc: { EN: 'Seven-Eleven, FamilyMart, and Lawson carry a small but useful range of OTC medicines. Look for the medicine aisle near the register.', JP: 'セブンイレブン・ファミリーマート・ローソンでは、小規模ながら実用的な市販薬を取り扱っています。レジ近くの医薬品コーナーを探してください。', ZH: 'Seven-Eleven、FamilyMart和Lawson提供种类不多但实用的非处方药。寻找靠近收银台的医药区。', 'ZH-T': 'Seven-Eleven、FamilyMart和Lawson提供種類不多但實用的非處方藥。尋找靠近收銀台的醫藥區。', KO: '세븐일레븐, 패밀리마트, 로손에서 소규모이지만 유용한 일반의약품을 취급합니다. 계산대 근처의 의약품 코너를 찾으세요.', ES: 'Seven-Eleven, FamilyMart y Lawson tienen una pequeña pero útil gama de medicamentos sin receta. Busque el pasillo de medicamentos cerca de la caja.', FR: "Seven-Eleven, FamilyMart et Lawson proposent une petite gamme utile de médicaments en vente libre. Cherchez le rayon médicaments près de la caisse.", IT: "Seven-Eleven, FamilyMart e Lawson portano una piccola ma utile gamma di farmaci OTC. Cerca il corridoio dei farmaci vicino alla cassa.", TL: 'Ang Seven-Eleven, FamilyMart, at Lawson ay may maliit ngunit kapaki-pakinabang na hanay ng mga OTC na gamot. Hanapin ang aisle ng gamot malapit sa counter.', ID: 'Seven-Eleven, FamilyMart, dan Lawson menjual berbagai obat OTC yang kecil namun berguna. Cari lorong obat di dekat kasir.', DE: 'Seven-Eleven, FamilyMart und Lawson führen eine kleine, aber nützliche Auswahl an rezeptfreien Medikamenten. Suchen Sie den Medikamenten-Gang in der Nähe der Kasse.', PT: 'Seven-Eleven, FamilyMart e Lawson têm uma pequena mas útil gama de medicamentos sem prescrição. Procure o corredor de medicamentos perto do caixa.', RU: 'Seven-Eleven, FamilyMart и Lawson предлагают небольшой, но полезный ассортимент безрецептурных препаратов. Найдите аптечный ряд рядом с кассой.' },
    items: {
      EN: ['Cold & flu relief (パブロン, ルル, etc.)', 'Fever reducers — ibuprofen, acetaminophen', 'Stomachache & digestive tablets', 'Rehydration drinks (ポカリスエット)', 'Basic bandages and antiseptic'],
      JP: ['風邪薬（パブロン・ルルなど）', '解熱剤（イブプロフェン・アセトアミノフェン）', '胃腸薬・整腸剤', '経口補水液（ポカリスエット）', '絆創膏・消毒液'],
      ZH: ['感冒药（パブロン、ルル等）', '退烧药——布洛芬、对乙酰氨基酚', '胃痛及消化药片', '补水饮料（ポカリスエット）', '基本绷带和消毒液'],
      'ZH-T': ['感冒藥（パブロン、ルル等）', '退燒藥——布洛芬、對乙醯氨基酚', '胃痛及消化藥片', '補水飲料（ポカリスエット）', '基本繃帶和消毒液'],
      KO: ['감기약 (パブロン, ルル 등)', '해열제 — 이부프로펜, 아세트아미노펜', '복통 및 소화제', '이온 음료 (ポカリスエット)', '기본 붕대 및 소독제'],
      ES: ['Alivio para resfriado y gripe (パブロン, ルル, etc.)', 'Antipiréticos — ibuprofeno, paracetamol', 'Tabletas para el estómago y digestivas', 'Bebidas de rehidratación (ポカリスエット)', 'Vendas básicas y antiséptico'],
      FR: ['Médicaments contre rhume et grippe (パブロン, ルル, etc.)', 'Antipyrétiques — ibuprofène, paracétamol', 'Comprimés digestifs et contre les maux de ventre', 'Boissons de réhydratation (ポカリスエット)', 'Pansements de base et antiseptique'],
      IT: ['Rimedi per raffreddore e influenza (パブロン, ルル, ecc.)', 'Antipiretici — ibuprofene, paracetamolo', 'Compresse per stomaco e digestivi', 'Bevande di reidratazione (ポカリスエット)', 'Bende di base e antisettici'],
      TL: ['Gamot para sa sipon at trangkaso (パブロン, ルル, atbp.)', 'Fever reducers — ibuprofen, acetaminophen', 'Mga tablet para sa sakit ng tiyan at panunulaw', 'Inuming pangmuling-hydrasyon (ポカリスエット)', 'Mga básicong bendahe at antiseptiko'],
      ID: ['Obat flu dan pilek (パブロン, ルル, dll.)', 'Penurun demam — ibuprofen, acetaminophen', 'Tablet sakit perut & pencernaan', 'Minuman rehidrasi (ポカリスエット)', 'Perban dasar dan antiseptik'],
      DE: ['Erkältungs- und Grippemittel (パブロン, ルル, usw.)', 'Fiebermittel — Ibuprofen, Paracetamol', 'Magenschmerz- und Verdauungstabletten', 'Rehydrationsgetränke (ポカリスエット)', 'Grundlegende Verbände und Antiseptikum'],
      PT: ['Remédio para resfriado e gripe (パブロン, ルル, etc.)', 'Antitérmicos — ibuprofeno, paracetamol', 'Comprimidos para dor de estômago e digestão', 'Bebidas de reidratação (ポカリスエット)', 'Curativos básicos e antisséptico'],
      RU: ['Средства от простуды и гриппа (パブロン, ルル и др.)', 'Жаропонижающие — ибупрофен, парацетамол', 'Таблетки от боли в желудке и пищеварения', 'Напитки для регидратации (ポカリスエット)', 'Базовые бинты и антисептик'],
    },
  },
  {
    icon: 'local_pharmacy', color: '#b22620',
    title: { EN: '24-Hour Pharmacy (24時間薬局)', JP: '24時間薬局', ZH: '24小时药局（24時間薬局）', 'ZH-T': '24小時藥局（24時間薬局）', KO: '24시간 약국(24時間薬局)', ES: 'Farmacia 24 horas (24時間薬局)', FR: 'Pharmacie 24h (24時間薬局)', IT: 'Farmacia 24 ore (24時間薬局)', TL: '24-Hour Pharmacy (24時間薬局)', ID: 'Apotek 24 jam (24時間薬局)', DE: '24-Stunden-Apotheke (24時間薬局)', PT: 'Farmácia 24 horas (24時間薬局)', RU: 'Аптека 24 часа (24時間薬局)' },
    badge: { EN: 'Limited locations', JP: '店舗数が限られる', ZH: '门店有限', 'ZH-T': '門店有限', KO: '매장 수 제한', ES: 'Ubicaciones limitadas', FR: 'Emplacements limités', IT: 'Sedi limitate', TL: 'Limitadong lokasyon', ID: 'Lokasi terbatas', DE: 'Begrenzte Standorte', PT: 'Locais limitados', RU: 'Ограниченное число точек' },
    badgeColor: '#7a5700',
    desc: { EN: 'Some major cities have 24-hour dispensing pharmacies. They can fill prescriptions and carry the full range of OTC products. Search Google Maps for "24時間薬局 [your city]".', JP: '主要都市には24時間対応の調剤薬局があります。処方薬の調剤と市販薬の販売が可能です。Googleマップで「24時間薬局 ＋ 都市名」と検索してください。', ZH: '部分大城市有24小时调剂药局。可以调剂处方药并提供全系列非处方药。在Google地图搜索"24時間薬局 ＋ 您的城市"。', 'ZH-T': '部分大城市有24小時調劑藥局。可以調劑處方藥並提供全系列非處方藥。在Google地圖搜尋「24時間薬局 ＋ 您的城市」。', KO: '일부 주요 도시에는 24시간 조제 약국이 있습니다. 처방전 조제와 모든 범위의 일반의약품 취급이 가능합니다. 구글 맵에서 "24時間薬局 [도시명]"을 검색하세요.', ES: 'Algunas ciudades importantes tienen farmacias dispensadoras de 24 horas. Pueden preparar recetas y llevan toda la gama de productos OTC. Busque en Google Maps "24時間薬局 [su ciudad]".', FR: "Certaines grandes villes ont des pharmacies dispensatrices 24h. Elles peuvent préparer des ordonnances et proposent toute la gamme de produits OTC. Cherchez sur Google Maps \"24時間薬局 [votre ville]\".", IT: "Alcune grandi città hanno farmacie dispensatrici 24 ore. Possono preparare prescrizioni e portano l'intera gamma di prodotti OTC. Cerca su Google Maps \"24時間薬局 [la tua città]\".", TL: 'Ang ilang malalaking lungsod ay may 24-hour dispensing pharmacy. Maaari silang mag-fill ng mga reseta at may buong hanay ng mga OTC na produkto. Maghanap sa Google Maps ng "24時間薬局 [iyong lungsod]".', ID: 'Beberapa kota besar memiliki apotek dispensasi 24 jam. Mereka bisa mengisi resep dan membawa rangkaian produk OTC lengkap. Cari di Google Maps "24時間薬局 [kota Anda]".', DE: 'Einige Großstädte haben 24-Stunden-Apotheken. Sie können Rezepte einlösen und führen das gesamte OTC-Sortiment. Suchen Sie auf Google Maps nach "24時間薬局 [Ihre Stadt]".', PT: 'Algumas cidades importantes têm farmácias dispensadoras de 24 horas. Elas podem avisar receitas e carregam toda a gama de produtos OTC. Pesquise no Google Maps "24時間薬局 [sua cidade]".', RU: 'В некоторых крупных городах есть круглосуточные аптеки. Они выдают лекарства по рецептам и держат полный ассортимент безрецептурных товаров. Ищите на Google Maps "24時間薬局 [ваш город]".' },
    items: {
      EN: ['Full prescription filling', 'Wider OTC medicine selection', 'Pharmacist consultation available', 'Common in Tokyo, Osaka, Nagoya'],
      JP: ['処方薬の調剤が可能', '市販薬の品揃えが豊富', '薬剤師に相談できる', '東京・大阪・名古屋に多い'],
      ZH: ['可调剂处方药', '更广泛的非处方药选择', '可咨询药剂师', '常见于东京、大阪、名古屋'],
      'ZH-T': ['可調劑處方藥', '更廣泛的非處方藥選擇', '可諮詢藥劑師', '常見於東京、大阪、名古屋'],
      KO: ['처방전 전체 조제 가능', '더 넓은 일반의약품 선택', '약사 상담 가능', '도쿄, 오사카, 나고야에 많음'],
      ES: ['Preparación completa de recetas', 'Mayor selección de medicamentos OTC', 'Consulta con farmacéutico disponible', 'Común en Tokio, Osaka, Nagoya'],
      FR: ['Préparation complète des ordonnances', 'Plus large sélection de médicaments OTC', 'Consultation avec pharmacien disponible', 'Courant à Tokyo, Osaka, Nagoya'],
      IT: ['Preparazione completa delle prescrizioni', 'Selezione più ampia di farmaci OTC', 'Consulenza farmacista disponibile', 'Comune a Tokyo, Osaka, Nagoya'],
      TL: ['Buong prescription filling', 'Mas malawak na seleksyon ng OTC na gamot', 'Available ang konsultasyon sa parmasyutiko', 'Karaniwan sa Tokyo, Osaka, Nagoya'],
      ID: ['Pengisian resep penuh', 'Pilihan obat OTC yang lebih luas', 'Konsultasi apoteker tersedia', 'Umum di Tokyo, Osaka, Nagoya'],
      DE: ['Vollständige Rezepteinlösung', 'Breitere OTC-Medikamentenauswahl', 'Pharmazeutenberatung verfügbar', 'Häufig in Tokio, Osaka, Nagoya'],
      PT: ['Aviamento completo de receitas', 'Maior seleção de medicamentos OTC', 'Consulta com farmacêutico disponível', 'Comum em Tóquio, Osaka, Nagoya'],
      RU: ['Полное выдавание по рецептам', 'Более широкий выбор безрецептурных', 'Консультация фармацевта доступна', 'Распространено в Токио, Осаке, Нагое'],
    },
  },
  {
    icon: 'emergency', color: '#374151',
    title: { EN: 'Hospital Pharmacy (院内薬局)', JP: '病院内薬局（院内薬局）', ZH: '院内药局（院内薬局）', 'ZH-T': '院內藥局（院内薬局）', KO: '병원 내 약국(院内薬局)', ES: 'Farmacia del hospital (院内薬局)', FR: 'Pharmacie hospitalière (院内薬局)', IT: 'Farmacia ospedaliera (院内薬局)', TL: 'Hospital Pharmacy (院内薬局)', ID: 'Apotek rumah sakit (院内薬局)', DE: 'Krankenhausapotheke (院内薬局)', PT: 'Farmácia hospitalar (院内薬局)', RU: 'Больничная аптека (院内薬局)' },
    badge: { EN: 'Emergency only', JP: '緊急時のみ', ZH: '仅限急诊', 'ZH-T': '僅限急診', KO: '응급 시에만', ES: 'Solo emergencias', FR: 'Urgences uniquement', IT: 'Solo emergenze', TL: 'Emergency lang', ID: 'Hanya darurat', DE: 'Nur Notfall', PT: 'Apenas emergência', RU: 'Только экстренно' },
    badgeColor: '#374151',
    desc: { EN: "If you're treated at a night-emergency hospital, the hospital's internal pharmacy will dispense exactly what the doctor prescribed — even at 2 AM.", JP: '夜間救急病院で診察を受けた場合、病院内の薬局で処方された薬を受け取れます — 深夜2時でも対応可能です。', ZH: '如果您在夜间急救医院就诊，医院内部药局将按照医生的处方配药——即使在凌晨2点也能提供服务。', 'ZH-T': '如果您在夜間急救醫院就診，醫院內部藥局將按照醫生的處方配藥——即使在凌晨2點也能提供服務。', KO: '야간 응급 병원에서 치료를 받는 경우, 병원 내부 약국에서 의사가 처방한 약을 정확히 제공합니다 — 새벽 2시에도 가능합니다.', ES: 'Si es tratado en un hospital de urgencias nocturnas, la farmacia interna del hospital dispensará exactamente lo que recetó el médico — incluso a las 2 AM.', FR: "Si vous êtes traité dans un hôpital d'urgence nocturne, la pharmacie interne de l'hôpital délivrera exactement ce que le médecin a prescrit — même à 2h du matin.", IT: "Se sei trattato in un ospedale d'emergenza notturna, la farmacia interna dell'ospedale dispenserà esattamente ciò che il medico ha prescritto — anche alle 2 di notte.", TL: 'Kung ikaw ay ginagamot sa isang night-emergency hospital, ang panloob na parmasya ng ospital ay magbibigay ng eksaktong inireseta ng doktor — kahit sa 2 AM.', ID: 'Jika Anda dirawat di rumah sakit gawat darurat malam, apotek internal rumah sakit akan memberikan persis apa yang diresepkan dokter — bahkan pukul 2 pagi.', DE: 'Wenn Sie in einem Nacht-Notfallkrankenhaus behandelt werden, gibt die interne Krankenhausapotheke genau das aus, was der Arzt verschrieben hat — auch um 2 Uhr morgens.', PT: 'Se você for tratado em um hospital de emergência noturna, a farmácia interna do hospital dispensará exatamente o que o médico receitou — mesmo às 2h da manhã.', RU: 'Если вас лечат в ночной больнице скорой помощи, внутренняя больничная аптека выдаст именно то, что прописал врач — даже в 2 часа ночи.' },
    items: {
      EN: ["Only available after seeing a doctor", 'Prescription medications only', 'Available at 救急病院 (emergency hospitals)'],
      JP: ['診察後のみ利用可能', '処方薬のみ', '救急病院で利用可能'],
      ZH: ['仅在就诊后可用', '仅限处方药', '在救急病院（急救医院）提供'],
      'ZH-T': ['僅在就診後可用', '僅限處方藥', '在救急病院（急救醫院）提供'],
      KO: ['진료 후에만 이용 가능', '처방약만 가능', '救急病院(응급 병원)에서 이용 가능'],
      ES: ['Solo disponible después de ver a un médico', 'Solo medicamentos con receta', 'Disponible en 救急病院 (hospitales de emergencia)'],
      FR: ["Disponible seulement après consultation médicale", 'Médicaments sur ordonnance uniquement', 'Disponible dans les 救急病院 (hôpitaux d\'urgence)'],
      IT: ['Disponibile solo dopo aver visto un medico', 'Solo farmaci su prescrizione', 'Disponibile presso 救急病院 (ospedali di emergenza)'],
      TL: ['Available lang pagkatapos makita ng doktor', 'Prescription medications lang', 'Available sa 救急病院 (emergency hospitals)'],
      ID: ['Hanya tersedia setelah bertemu dokter', 'Hanya obat resep', 'Tersedia di 救急病院 (rumah sakit darurat)'],
      DE: ['Nur nach Arztbesuch verfügbar', 'Nur verschreibungspflichtige Medikamente', 'Verfügbar in 救急病院 (Notfallkrankenhäusern)'],
      PT: ['Disponível apenas após consulta médica', 'Apenas medicamentos com receita', 'Disponível em 救急病院 (hospitais de emergência)'],
      RU: ['Доступно только после приёма врача', 'Только рецептурные препараты', 'Доступно в 救急病院 (больницах скорой помощи)'],
    },
  },
]

const PACKAGING = [
  { jp: '用法・用量', meaning: { EN: 'Dosage instructions', JP: '用法・用量', ZH: '用法用量', 'ZH-T': '用法用量', KO: '용법·용량', ES: 'Instrucciones de dosificación', FR: 'Posologie', IT: 'Istruzioni per il dosaggio', TL: 'Mga tagubilin sa dosis', ID: 'Petunjuk penggunaan', DE: 'Dosierungsanleitung', PT: 'Instruções de dosagem', RU: 'Инструкция по применению' } },
  { jp: '成分', meaning: { EN: 'Active ingredients', JP: '有効成分', ZH: '成分', 'ZH-T': '成分', KO: '성분', ES: 'Ingredientes activos', FR: 'Ingrédients actifs', IT: 'Ingredienti attivi', TL: 'Mga aktibong sangkap', ID: 'Bahan aktif', DE: 'Wirkstoffe', PT: 'Ingredientes ativos', RU: 'Активные вещества' } },
  { jp: '使用上の注意', meaning: { EN: 'Warnings / precautions', JP: '注意事項', ZH: '注意事项', 'ZH-T': '注意事項', KO: '경고·주의사항', ES: 'Advertencias / precauciones', FR: 'Avertissements / précautions', IT: 'Avvertenze / precauzioni', TL: 'Mga babala / pag-iingat', ID: 'Peringatan / tindakan pencegahan', DE: 'Warnhinweise / Vorsichtsmaßnahmen', PT: 'Advertências / precauções', RU: 'Предупреждения / меры предосторожности' } },
  { jp: '15歳以上', meaning: { EN: 'For ages 15 and above', JP: '15歳以上対象', ZH: '15岁及以上适用', 'ZH-T': '15歲及以上適用', KO: '만 15세 이상', ES: 'Para mayores de 15 años', FR: 'Pour les 15 ans et plus', IT: 'Per età 15 anni e oltre', TL: 'Para sa 15 taong gulang pataas', ID: 'Untuk usia 15 tahun ke atas', DE: 'Ab 15 Jahren', PT: 'Para maiores de 15 anos', RU: 'Для лиц от 15 лет' } },
  { jp: '授乳中', meaning: { EN: 'While breastfeeding (often a warning)', JP: '授乳中（注意表示が多い）', ZH: '哺乳期间（常为警告）', 'ZH-T': '哺乳期間（常為警告）', KO: '수유 중 (주로 경고)', ES: 'Durante la lactancia (suele ser una advertencia)', FR: "Pendant l'allaitement (souvent un avertissement)", IT: "Durante l'allattamento (spesso un avviso)", TL: 'Habang nagpapasuso (madalas na babala)', ID: 'Selama menyusui (sering berupa peringatan)', DE: 'Während der Stillzeit (oft eine Warnung)', PT: 'Durante amamentação (frequentemente um aviso)', RU: 'Во время грудного вскармливания (часто предупреждение)' } },
]

export default function LateNightMedicinePage() {
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
        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b22620', fontWeight: 700, marginBottom: 8 }}>{tr(ARTICLES.category, lang)}</p>
        <h1 className="font-headline" style={{ fontSize: 24, fontWeight: 800, color: '#1e1b1c', lineHeight: 1.3, marginBottom: 10 }}>{tr(ARTICLES.lateNight.title, lang)}</h1>
        <p style={{ fontSize: 13, color: '#78716c' }}>{tr(ARTICLES.lateNight.sub, lang)}</p>
      </div>

      <div style={{ height: 1, background: 'rgba(226,190,186,0.3)', marginBottom: 24 }} />

      <p style={{ fontSize: 14, color: '#5a413d', lineHeight: 1.7, marginBottom: 28 }}>{tl(INTRO, lang)}</p>

      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, color: '#1e1b1c', marginBottom: 14 }}>{tl(SEC_OPTIONS, lang)}</h2>
        {OPTIONS.map(option => {
          const optItems = option.items[lang as keyof typeof option.items] ?? option.items.EN
          return (
            <div key={option.icon} style={{ background: '#fff', borderRadius: 14, padding: '18px', border: '1px solid rgba(226,190,186,0.2)', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: option.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{option.icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p className="font-headline" style={{ fontSize: 14, fontWeight: 700, color: '#1e1b1c' }}>{tl(option.title, lang)}</p>
                </div>
                <span style={{ fontSize: 10, background: option.badgeColor, color: '#fff', padding: '3px 8px', borderRadius: 999, fontWeight: 700, flexShrink: 0 }}>{tl(option.badge, lang)}</span>
              </div>
              <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6, marginBottom: 10 }}>{tl(option.desc, lang)}</p>
              <div style={{ background: '#faf2f2', borderRadius: 8, padding: '10px 12px' }}>
                {optItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: i < optItems.length - 1 ? 6 : 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: option.color, flexShrink: 0, marginTop: 2 }}>check</span>
                    <span style={{ fontSize: 12, color: '#5a413d' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, color: '#1e1b1c', marginBottom: 12 }}>{tl(SEC_PACKAGING, lang)}</h2>
        <div style={{ background: '#faf2f2', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(226,190,186,0.2)' }}>
          <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.6, marginBottom: 12 }}>{tl(PACKAGING_INTRO, lang)}</p>
          {PACKAGING.map((row, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: i < arr.length - 1 ? 8 : 0, marginBottom: i < arr.length - 1 ? 8 : 0, borderBottom: i < arr.length - 1 ? '1px solid rgba(226,190,186,0.15)' : 'none' }}>
              <span className="font-label" style={{ fontSize: 13, fontWeight: 700, color: '#206777', minWidth: 120, flexShrink: 0 }}>{row.jp}</span>
              <span style={{ fontSize: 13, color: '#5a413d' }}>{tl(row.meaning, lang)}</span>
            </div>
          ))}
        </div>
      </section>

      <Link href="/dashboard/night-care" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#b22620', textDecoration: 'none' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 15 }}>bedtime</span>
        {tl(LINK_NIGHT, lang)}
      </Link>
    </main>
  )
}
