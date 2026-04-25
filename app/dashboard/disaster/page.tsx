'use client'
import Link from 'next/link'
import { useLang } from '../lang-context'
import { useSaved } from '../saved-context'
import { tr, COMMON } from '../translations'

const ITEM = { href: '/dashboard/disaster', title: 'Disaster Preparedness', titleJP: '災害時の備え', icon: 'emergency_home', color: '#b45309' }
function tl(m: Record<string, string>, l: string) { return m[l] ?? m['EN'] }

const TITLE = { EN: 'Disaster Preparedness', JP: '災害時の備え', ZH: '灾害应急准备', 'ZH-T': '災害應急準備', KO: '재난 대비', ES: 'Preparación para Desastres', FR: 'Préparation aux Catastrophes', IT: 'Preparazione ai Disastri', TL: 'Paghahanda sa Sakuna', ID: 'Kesiapsiagaan Bencana', DE: 'Katastrophenschutz', PT: 'Preparação para Desastres', RU: 'Готовность к бедствиям', YUE: '災害應急準備' }
const SUB = { EN: 'Japan experiences earthquakes, typhoons, and tsunamis. This guide covers alerts, evacuation, and free multilingual resources available 24/7.', JP: '日本では地震・台風・津波が発生します。警報の受け取り方・避難方法・24時間使える無料多言語サービスをまとめました。', ZH: '日本有地震、台风和海啸。本指南涵盖警报接收、疏散和全天候免费多语言资源。', 'ZH-T': '日本有地震、颱風和海嘯。本指南涵蓋警報接收、疏散和全天候免費多語言資源。', KO: '일본에는 지진, 태풍, 쓰나미가 있습니다. 경보 수신, 대피 방법, 24시간 무료 다국어 서비스를 정리했습니다.', ES: 'Japón experimenta terremotos, tifones y tsunamis. Esta guía cubre alertas, evacuación y recursos multilingües.', FR: 'Le Japon connaît des tremblements de terre, typhons et tsunamis. Ce guide couvre les alertes et l\'évacuation.', IT: 'Il Giappone è soggetto a terremoti, tifoni e tsunami. Guida agli avvisi, evacuazione e risorse multilingue.', TL: 'Ang Japan ay may mga lindol, bagyo, at tsunami. Ang gabay na ito ay sumasaklaw sa mga alerto at evacuation.', ID: 'Jepang mengalami gempa, topan, dan tsunami. Panduan ini mencakup peringatan, evakuasi, dan sumber daya multibahasa.', DE: 'Japan erlebt Erdbeben, Taifune und Tsunamis. Leitfaden zu Warnungen und Evakuierung.', PT: 'O Japão tem terremotos, tufões e tsunamis. Este guia cobre alertas, evacuação e recursos multilíngues.', RU: 'В Японии бывают землетрясения, тайфуны и цунами. Руководство по оповещениям и эвакуации.', YUE: '日本有地震、颱風同海嘯。本指南涵蓋警報接收、疏散同全天候免費多語言資源。' }

const SECTION_RESOURCES = { EN: 'Official Resources & Services', JP: '公式リソース・サービス', ZH: '官方资源与服务', 'ZH-T': '官方資源與服務', KO: '공식 리소스 및 서비스', ES: 'Recursos y Servicios Oficiales', FR: 'Ressources et Services Officiels', IT: 'Risorse e Servizi Ufficiali', TL: 'Mga Opisyal na Mapagkukunan at Serbisyo', ID: 'Sumber Daya dan Layanan Resmi', DE: 'Offizielle Ressourcen & Dienste', PT: 'Recursos e Serviços Oficiais', RU: 'Официальные ресурсы и службы', YUE: '官方資源與服務' }
const SECTION_PREPARE = { EN: 'What to prepare now', JP: '事前にやっておくこと', ZH: '现在需要准备的事项', 'ZH-T': '現在需要準備的事項', KO: '지금 준비해야 할 것', ES: 'Qué preparar ahora', FR: 'Ce qu\'il faut préparer maintenant', IT: 'Cosa preparare adesso', TL: 'Ano ang ihahanda ngayon', ID: 'Apa yang perlu dipersiapkan sekarang', DE: 'Was jetzt vorzubereiten ist', PT: 'O que preparar agora', RU: 'Что подготовить сейчас', YUE: '而家需要準備嘅事項' }
const OPEN_BTN = { EN: 'Open', JP: '開く', ZH: '打开', 'ZH-T': '打開', KO: '열기', ES: 'Abrir', FR: 'Ouvrir', IT: 'Apri', TL: 'Buksan', ID: 'Buka', DE: 'Öffnen', PT: 'Abrir', RU: 'Открыть', YUE: '打開' }

const LINKS = [
  {
    icon: 'open_in_new',
    color: '#b45309',
    name: 'NHK World',
    url: 'https://www3.nhk.or.jp/nhkworld/',
    tag: { EN: 'Emergency News', JP: '緊急ニュース', ZH: '紧急新闻', 'ZH-T': '緊急新聞', KO: '긴급 뉴스', ES: 'Noticias de Emergencia', FR: "Informations d'Urgence", IT: 'Notizie di Emergenza', TL: 'Emergency News', ID: 'Berita Darurat', DE: 'Notfallnachrichten', PT: 'Notícias de Emergência', RU: 'Экстренные новости', YUE: '緊急新聞' },
    desc: { EN: 'NHK\'s English-language broadcast. During disasters, NHK World provides live updates, evacuation orders, and safety information in English 24/7.', JP: 'NHKの英語放送。災害時はNHK Worldが24時間英語でライブ情報・避難指示・安全情報を提供します。', ZH: 'NHK英语广播。灾难期间，NHK World 24小时提供英语实时更新、撤离命令和安全信息。', 'ZH-T': 'NHK英語廣播。災難期間，NHK World 24小時提供英語即時更新、撤離命令和安全信息。', KO: 'NHK의 영어 방송. 재난 시 NHK World는 24시간 영어로 실시간 업데이트, 대피 명령, 안전 정보를 제공합니다.', ES: 'Transmisión en inglés de NHK. Durante desastres, NHK World proporciona actualizaciones en vivo, órdenes de evacuación e información de seguridad en inglés 24/7.', FR: "Diffusion en anglais de NHK. En cas de catastrophe, NHK World fournit des mises à jour en direct, des ordres d'évacuation et des informations de sécurité en anglais 24h/24.", IT: 'Trasmissione in inglese di NHK. Durante le catastrofi, NHK World fornisce aggiornamenti in diretta, ordini di evacuazione e informazioni sulla sicurezza in inglese 24/7.', TL: 'Broadcast sa Ingles ng NHK. Sa panahon ng sakuna, nagbibigay ang NHK World ng live updates, evacuation orders, at safety information sa Ingles 24/7.', ID: 'Siaran berbahasa Inggris NHK. Saat bencana, NHK World menyediakan pembaruan langsung, perintah evakuasi, dan informasi keselamatan dalam bahasa Inggris 24/7.', DE: 'Englischsprachiger Rundfunk von NHK. Bei Katastrophen liefert NHK World Live-Updates, Evakuierungsbefehle und Sicherheitsinformationen auf Englisch rund um die Uhr.', PT: 'Transmissão em inglês da NHK. Durante desastres, a NHK World fornece atualizações ao vivo, ordens de evacuação e informações de segurança em inglês 24h.', RU: 'Англоязычное вещание NHK. Во время стихийных бедствий NHK World предоставляет прямые трансляции, приказы об эвакуации и информацию о безопасности на английском языке 24/7.', YUE: 'NHK嘅英語廣播。災難期間，NHK World 24小時以英語提供即時更新、撤離命令同安全信息。' },
  },
  {
    icon: 'open_in_new',
    color: '#1d4ed8',
    name: 'JMA (気象庁)',
    url: 'https://www.jma.go.jp/bosai/',
    tag: { EN: 'Disaster Alerts', JP: '災害アラート', ZH: '灾害预警', 'ZH-T': '災害預警', KO: '재난 경보', ES: 'Alertas de Desastres', FR: 'Alertes aux Catastrophes', IT: 'Allerte Catastrofi', TL: 'Disaster Alerts', ID: 'Peringatan Bencana', DE: 'Katastrophenwarnungen', PT: 'Alertas de Desastres', RU: 'Предупреждения о бедствиях', YUE: '災害預警' },
    desc: { EN: 'Japan Meteorological Agency\'s real-time disaster dashboard. Shows earthquake intensity maps, typhoon tracks, and tsunami warnings across Japan.', JP: '気象庁のリアルタイム防災情報。地震震度マップ・台風進路・津波警報を確認できます。', ZH: '日本气象厅实时灾害仪表板。显示日本各地的地震烈度图、台风路径和海啸预警。', 'ZH-T': '日本氣象廳即時災害儀表板。顯示日本各地的地震烈度圖、颱風路徑和海嘯預警。', KO: '일본 기상청 실시간 재난 대시보드. 일본 전역의 지진 진도 지도, 태풍 경로, 쓰나미 경보를 표시합니다.', ES: 'Panel de desastres en tiempo real de la Agencia Meteorológica de Japón. Muestra mapas de intensidad sísmica, trayectorias de tifones y advertencias de tsunami.', FR: "Tableau de bord des catastrophes en temps réel de l'Agence météorologique japonaise. Montre les cartes d'intensité sismique, les trajectoires de typhons et les avertissements de tsunami.", IT: "Dashboard in tempo reale dell'Agenzia Meteorologica Giapponese. Mostra mappe di intensità sismica, traiettorie dei tifoni e avvisi di tsunami.", TL: 'Real-time disaster dashboard ng Japan Meteorological Agency. Nagpapakita ng earthquake intensity maps, typhoon tracks, at tsunami warnings sa buong Japan.', ID: 'Dasbor bencana real-time Badan Meteorologi Jepang. Menampilkan peta intensitas gempa, jalur topan, dan peringatan tsunami di seluruh Jepang.', DE: 'Echtzeit-Katastrophen-Dashboard der Japan Meteorological Agency. Zeigt Erdbebenintensitätskarten, Taifunrouten und Tsunamiwarnungen für ganz Japan.', PT: 'Painel de desastres em tempo real da Agência Meteorológica do Japão. Mostra mapas de intensidade sísmica, rotas de tufões e alertas de tsunami.', RU: 'Панель мониторинга стихийных бедствий Японского метеорологического агентства в режиме реального времени. Карты интенсивности землетрясений, тайфуны, предупреждения о цунами.', YUE: '日本氣象廳即時災害儀表板。顯示日本各地嘅地震烈度圖、颱風路徑同海嘯預警。' },
  },
  {
    icon: 'smartphone',
    color: '#059669',
    name: 'Safety Tips (App)',
    url: 'https://www.jnto.go.jp/safety-tips/eng/app.html',
    tag: { EN: 'Free App · 14 Languages', JP: '無料アプリ・14言語対応', ZH: '免费应用・14种语言', 'ZH-T': '免費應用・14種語言', KO: '무료 앱 · 14개 언어', ES: 'App Gratuita · 14 Idiomas', FR: 'App Gratuite · 14 Langues', IT: 'App Gratuita · 14 Lingue', TL: 'Libreng App · 14 Wika', ID: 'App Gratis · 14 Bahasa', DE: 'Kostenlose App · 14 Sprachen', PT: 'App Gratuito · 14 Idiomas', RU: 'Бесплатное приложение · 14 языков', YUE: '免費應用・14種語言' },
    desc: { EN: 'Official Japan Tourism Agency disaster alert app. Sends push notifications the moment an earthquake, tsunami, or severe weather warning is issued. Works in 14 languages including English, Chinese, and Korean.', JP: '観光庁公式の防災アラートアプリ。地震・津波・悪天候の警報を即座にプッシュ通知で受信。英語・中国語・韓国語など14言語対応。', ZH: '日本观光厅官方防灾警报应用。地震、海啸或恶劣天气警报发出时立即推送通知。支持包括英语、中文、韩语在内的14种语言。', 'ZH-T': '日本觀光廳官方防災警報應用。地震、海嘯或惡劣天氣警報發出時立即推送通知。支持包括英語、中文、韓語在內的14種語言。', KO: '일본 관광청 공식 재난 경보 앱. 지진, 쓰나미 또는 악천후 경보가 발령되는 즉시 푸시 알림을 보냅니다. 영어, 중국어, 한국어를 포함한 14개 언어 지원.', ES: 'App oficial de alertas de desastres de la Agencia de Turismo de Japón. Envía notificaciones push en el momento en que se emite un aviso de terremoto, tsunami o mal tiempo. Funciona en 14 idiomas.', FR: "Application officielle d'alerte aux catastrophes de l'Agence japonaise du tourisme. Envoie des notifications push dès l'émission d'une alerte tremblement de terre, tsunami ou météo sévère. 14 langues.", IT: "App ufficiale di allerta catastrofi dell'Agenzia Turismo Giapponese. Invia notifiche push nel momento in cui viene emessa un'allerta terremoto, tsunami o maltempo. 14 lingue.", TL: 'Opisyal na disaster alert app ng Japan Tourism Agency. Nagpapadala ng push notifications sa sandaling mag-isyu ng earthquake, tsunami, o severe weather warning. 14 na wika.', ID: 'Aplikasi peringatan bencana resmi Badan Pariwisata Jepang. Mengirim notifikasi push saat peringatan gempa, tsunami, atau cuaca buruk diterbitkan. Mendukung 14 bahasa.', DE: 'Offizielle Katastrophen-Alarm-App der Japanischen Tourismusbehörde. Sendet Push-Benachrichtigungen sobald Erdbeben-, Tsunami- oder Unwetterwarnungen ausgegeben werden. 14 Sprachen.', PT: 'App oficial de alertas de desastres da Agência de Turismo do Japão. Envia notificações push assim que um alerta de terremoto, tsunami ou mau tempo é emitido. 14 idiomas.', RU: 'Официальное приложение для оповещения о стихийных бедствиях Японского агентства туризма. Мгновенные push-уведомления при землетрясениях, цунами или штормах. 14 языков.', YUE: '日本觀光廳官方防災警報應用。地震、海嘯或惡劣天氣警報發出時即時推送通知。支援包括英語、中文、韓語在內嘅14種語言。' },
  },
  {
    icon: 'call',
    color: '#7c3aed',
    name: '#171 災害用伝言ダイヤル',
    url: null,
    tag: { EN: 'Disaster Message Dial', JP: '災害用伝言ダイヤル', ZH: '灾害留言电话', 'ZH-T': '災害留言電話', KO: '재난 메시지 다이얼', ES: 'Línea de Mensajes de Desastre', FR: 'Ligne de Messages de Catastrophe', IT: 'Linea Messaggi per Catastrofi', TL: 'Disaster Message Dial', ID: 'Dial Pesan Bencana', DE: 'Katastrophen-Nachrichtendienst', PT: 'Discagem de Mensagens de Desastre', RU: 'Телефон экстренных сообщений', YUE: '災害留言電話' },
    desc: { EN: 'A phone service activated during major disasters. Call #171 to record or listen to safety messages from family. Free to use. Works when regular calls are congested.', JP: '大規模災害時に開設される電話サービス。#171に電話して家族の安否メッセージを録音・再生できます。無料で利用でき、通話が混雑しているときでも使えます。', ZH: '重大灾难期间启动的电话服务。拨打#171录制或收听家人的安全信息。免费使用，在普通电话拥堵时仍可使用。', 'ZH-T': '重大災難期間啟動的電話服務。撥打#171錄製或收聽家人的安全信息。免費使用，在普通電話擁堵時仍可使用。', KO: '대규모 재난 시 운영되는 전화 서비스. #171에 전화하여 가족의 안전 메시지를 녹음하거나 청취할 수 있습니다. 무료 사용, 일반 통화가 혼잡할 때도 사용 가능.', ES: 'Servicio telefónico activado durante grandes desastres. Llama al #171 para grabar o escuchar mensajes de seguridad de la familia. Gratuito. Funciona cuando las llamadas normales están congestionadas.', FR: "Service téléphonique activé lors de grandes catastrophes. Appelez le #171 pour enregistrer ou écouter des messages de sécurité de votre famille. Gratuit. Fonctionne quand les appels normaux sont saturés.", IT: 'Servizio telefonico attivato durante grandi catastrofi. Chiama il #171 per registrare o ascoltare messaggi di sicurezza dalla famiglia. Gratuito. Funziona quando le chiamate normali sono congestionate.', TL: 'Serbisyong telepono na ina-activate sa panahon ng malalaking sakuna. Tumawag sa #171 para mag-record o makinig ng safety messages mula sa pamilya. Libre gamitin.', ID: 'Layanan telepon yang diaktifkan saat bencana besar. Hubungi #171 untuk merekam atau mendengarkan pesan keselamatan dari keluarga. Gratis. Bekerja saat panggilan biasa macet.', DE: 'Telefondienst, der bei schweren Katastrophen aktiviert wird. Rufen Sie #171 an, um Sicherheitsnachrichten der Familie aufzunehmen oder anzuhören. Kostenlos. Funktioniert bei überlasteten Leitungen.', PT: 'Serviço telefônico ativado durante grandes desastres. Ligue para #171 para gravar ou ouvir mensagens de segurança da família. Gratuito. Funciona quando as chamadas normais estão congestionadas.', RU: 'Телефонный сервис, активируемый во время крупных бедствий. Звоните на #171 для записи или прослушивания сообщений о безопасности от семьи. Бесплатно. Работает при перегруженных линиях.', YUE: '大規模災難期間啟動嘅電話服務。撥打#171錄製或收聽家人嘅安全信息。免費使用，普通電話擁塞時仍可使用。' },
  },
]

const TIPS = [
  {
    icon: 'location_on',
    title: { EN: 'Find your evacuation site now', JP: '今すぐ避難場所を確認する', ZH: '现在找到您的疏散地点', 'ZH-T': '現在找到您的疏散地點', KO: '지금 대피 장소 찾기', ES: 'Encuentra tu sitio de evacuación ahora', FR: "Trouvez votre site d'évacuation maintenant", IT: 'Trova il tuo sito di evacuazione adesso', TL: 'Hanapin ang iyong evacuation site ngayon', ID: 'Temukan lokasi evakuasi Anda sekarang', DE: 'Finden Sie jetzt Ihren Evakuierungsort', PT: 'Encontre seu local de evacuação agora', RU: 'Найдите место эвакуации прямо сейчас', YUE: '而家搵好你嘅疏散地點' },
    desc: { EN: 'Search "避難場所 [your city/ward]" on Google Maps, or check your city hall website. Evacuation sites differ by disaster type (flood vs. earthquake).', JP: 'Googleマップで「避難場所 [市区町村名]」と検索、または市区町村のウェブサイトで確認。洪水と地震で避難場所が異なる場合があります。', ZH: '在谷歌地图搜索"避難場所 [您的城市]"，或查看市政厅网站。不同灾害类型（洪水与地震）的疏散地点不同。', 'ZH-T': '在谷歌地圖搜索"避難場所 [您的城市]"，或查看市政廳網站。不同災害類型（洪水與地震）的疏散地點不同。', KO: '구글 지도에서 "避難場所 [도시/구]"를 검색하거나 시청 웹사이트를 확인하세요. 대피 장소는 재난 유형(홍수 vs 지진)에 따라 다릅니다.', ES: 'Busca "避難場所 [tu ciudad]" en Google Maps o consulta el sitio web de tu ayuntamiento. Los sitios de evacuación varían según el tipo de desastre.', FR: 'Cherchez "避難場所 [votre ville]" sur Google Maps ou consultez le site de votre mairie. Les sites d\'évacuation diffèrent selon le type de catastrophe.', IT: 'Cerca "避難場所 [la tua città]" su Google Maps o controlla il sito del municipio. I siti di evacuazione variano per tipo di catastrofe.', TL: 'Hanapin ang "避難場所 [iyong lungsod]" sa Google Maps, o tingnan ang website ng city hall. Iba-iba ang evacuation sites ayon sa uri ng sakuna.', ID: 'Cari "避難場所 [kota Anda]" di Google Maps, atau periksa situs web balai kota. Lokasi evakuasi berbeda berdasarkan jenis bencana.', DE: 'Suchen Sie "避難場所 [Ihre Stadt]" auf Google Maps oder prüfen Sie die Website des Rathauses. Evakuierungsorte unterscheiden sich je nach Katastrophentyp.', PT: 'Pesquise "避難場所 [sua cidade]" no Google Maps ou verifique o site da prefeitura. Os locais de evacuação variam por tipo de desastre.', RU: 'Ищите "避難場所 [ваш город]" на Google Maps или проверьте сайт мэрии. Места эвакуации различаются в зависимости от типа стихийного бедствия.', YUE: '喺Google地圖搜索「避難場所 [你嘅城市]」，或查看市政廳網站。不同災害類型（洪水與地震）嘅疏散地點唔同。' },
  },
  {
    icon: 'notifications_active',
    title: { EN: 'Enable J-Alert on your phone', JP: 'Jアラートをスマートフォンで受信する', ZH: '在手机上启用J-Alert', 'ZH-T': '在手機上啟用J-Alert', KO: '스마트폰에서 J-Alert 활성화', ES: 'Activa J-Alert en tu teléfono', FR: 'Activer J-Alert sur votre téléphone', IT: 'Abilita J-Alert sul tuo telefono', TL: 'I-enable ang J-Alert sa iyong telepono', ID: 'Aktifkan J-Alert di ponsel Anda', DE: 'J-Alert auf Ihrem Telefon aktivieren', PT: 'Ative o J-Alert no seu telefone', RU: 'Включите J-Alert на своём телефоне', YUE: '喺手機啟用J-Alert' },
    desc: { EN: 'Japan\'s national emergency alert system (J-Alert) sends warnings directly to mobile phones. Make sure your phone\'s emergency alerts are turned on in Settings.', JP: '全国瞬時警報システム（Jアラート）はスマートフォンに直接警告を送ります。設定で緊急速報が有効になっていることを確認しましょう。', ZH: '日本国家紧急警报系统（J-Alert）直接向手机发送警告。确保手机设置中的紧急警报已开启。', 'ZH-T': '日本國家緊急警報系統（J-Alert）直接向手機發送警告。確保手機設置中的緊急警報已開啟。', KO: '일본의 국가 긴급 경보 시스템(J-Alert)이 모바일 폰에 직접 경고를 보냅니다. 설정에서 긴급 경보가 켜져 있는지 확인하세요.', ES: 'El sistema nacional de alertas de emergencia de Japón (J-Alert) envía advertencias directamente a los móviles. Asegúrate de que las alertas de emergencia estén activadas en Configuración.', FR: "Le système national d'alerte d'urgence du Japon (J-Alert) envoie des avertissements directement aux téléphones mobiles. Assurez-vous que les alertes d'urgence sont activées dans les Paramètres.", IT: 'Il sistema nazionale di allerta emergenze del Giappone (J-Alert) invia avvisi direttamente ai cellulari. Assicurati che le allerte di emergenza siano attive nelle Impostazioni.', TL: 'Ang pambansang emergency alert system ng Japan (J-Alert) ay nagpapadala ng mga babala direkta sa mga mobile phones. Siguraduhing naka-on ang emergency alerts sa Settings.', ID: 'Sistem peringatan darurat nasional Jepang (J-Alert) mengirim peringatan langsung ke ponsel. Pastikan peringatan darurat diaktifkan di Pengaturan.', DE: 'Japans nationales Notfallwarnsystem (J-Alert) sendet Warnungen direkt an Mobiltelefone. Stellen Sie sicher, dass Notfallbenachrichtigungen in den Einstellungen aktiviert sind.', PT: 'O sistema nacional de alertas de emergência do Japão (J-Alert) envia avisos diretamente para celulares. Certifique-se de que os alertas de emergência estão ativados nas Configurações.', RU: 'Национальная система экстренного оповещения Японии (J-Alert) отправляет предупреждения прямо на мобильные телефоны. Убедитесь, что экстренные оповещения включены в Настройках.', YUE: '日本全國緊急警報系統（J-Alert）直接向手機發送警告。確保手機設置中嘅緊急警報已開啟。' },
  },
  {
    icon: 'backpack',
    title: { EN: 'Prepare a go-bag', JP: '非常用持ち出し袋を準備する', ZH: '准备应急包', 'ZH-T': '準備應急包', KO: '비상 가방 준비하기', ES: 'Prepara una bolsa de emergencia', FR: "Préparez un sac d'urgence", IT: "Prepara una borsa d'emergenza", TL: 'Maghanda ng go-bag', ID: 'Siapkan tas darurat', DE: 'Notfallrucksack vorbereiten', PT: 'Prepare uma mochila de emergência', RU: 'Подготовьте тревожный чемоданчик', YUE: '準備應急包' },
    desc: { EN: 'Keep a bag ready with: water (3 days), food, medications, insurance card (保険証), passport, cash, flashlight, and a list of emergency contacts.', JP: '水（3日分）・食料・常備薬・保険証・パスポート・現金・懐中電灯・緊急連絡先リストを入れた袋を用意しておきましょう。', ZH: '准备一个包，放入：水（3天）、食物、药品、保险证（保険証）、护照、现金、手电筒和紧急联系人列表。', 'ZH-T': '準備一個包，放入：水（3天）、食物、藥品、保險證（保険証）、護照、現金、手電筒和緊急聯絡人列表。', KO: '다음을 넣은 가방을 준비하세요: 물 (3일분), 식량, 약, 보험증(保険証), 여권, 현금, 손전등, 비상 연락처 목록.', ES: 'Ten una bolsa lista con: agua (3 días), comida, medicamentos, tarjeta de seguro (保険証), pasaporte, efectivo, linterna y lista de contactos de emergencia.', FR: 'Gardez un sac prêt avec : eau (3 jours), nourriture, médicaments, carte d\'assurance (保険証), passeport, espèces, lampe torche et liste de contacts d\'urgence.', IT: 'Tieni una borsa pronta con: acqua (3 giorni), cibo, farmaci, tessera sanitaria (保険証), passaporto, contanti, torcia e lista contatti di emergenza.', TL: 'Maghanda ng bag na may: tubig (3 araw), pagkain, gamot, insurance card (保険証), pasaporte, cash, flashlight, at listahan ng emergency contacts.', ID: 'Siapkan tas dengan: air (3 hari), makanan, obat-obatan, kartu asuransi (保険証), paspor, uang tunai, senter, dan daftar kontak darurat.', DE: 'Halten Sie eine Tasche bereit mit: Wasser (3 Tage), Nahrung, Medikamenten, Versicherungskarte (保険証), Reisepass, Bargeld, Taschenlampe und Notfallkontaktliste.', PT: 'Mantenha uma mochila pronta com: água (3 dias), comida, medicamentos, cartão de seguro (保険証), passaporte, dinheiro, lanterna e lista de contatos de emergência.', RU: 'Держите наготове сумку с: водой (3 дня), едой, лекарствами, страховой картой (保険証), паспортом, наличными, фонариком и списком экстренных контактов.', YUE: '備好一個包，放入：水（3日份）、食物、藥品、保險證（保険証）、護照、現金、手電筒同緊急聯絡人列表。' },
  },
  {
    icon: 'translate',
    title: { EN: 'Learn key Japanese disaster words', JP: '災害時の重要な日本語を覚える', ZH: '学习日语关键灾难词汇', 'ZH-T': '學習日語關鍵災難詞彙', KO: '중요한 일본어 재난 단어 배우기', ES: 'Aprende palabras clave de desastres en japonés', FR: 'Apprenez les mots clés japonais des catastrophes', IT: 'Impara le parole chiave giapponesi per le catastrofi', TL: 'Matuto ng mahahalagang Japanese disaster words', ID: 'Pelajari kata-kata bencana penting dalam bahasa Jepang', DE: 'Lernen Sie wichtige japanische Katastrophenwörter', PT: 'Aprenda palavras-chave de desastres em japonês', RU: 'Выучите ключевые японские слова о бедствиях', YUE: '學習日文關鍵災難詞彙' },
    desc: { EN: '避難指示 = Evacuation order · 津波警報 = Tsunami warning · 地震 = Earthquake · 安全 = Safe · 助けてください = Please help me', JP: '避難指示・津波警報・地震・安全・助けてください — これらの言葉を覚えておきましょう。', ZH: '避難指示 = 撤离命令 · 津波警報 = 海啸警告 · 地震 = 地震 · 安全 = 安全 · 助けてください = 请帮帮我', 'ZH-T': '避難指示 = 撤離命令 · 津波警報 = 海嘯警告 · 地震 = 地震 · 安全 = 安全 · 助けてください = 請幫幫我', KO: '避難指示 = 대피 명령 · 津波警報 = 쓰나미 경보 · 地震 = 지진 · 安全 = 안전 · 助けてください = 도와주세요', ES: '避難指示 = Orden de evacuación · 津波警報 = Alerta de tsunami · 地震 = Terremoto · 安全 = Seguro · 助けてください = Por favor ayúdame', FR: '避難指示 = Ordre d\'évacuation · 津波警報 = Alerte tsunami · 地震 = Tremblement de terre · 安全 = Sûr · 助けてください = Aidez-moi', IT: '避難指示 = Ordine di evacuazione · 津波警報 = Allerta tsunami · 地震 = Terremoto · 安全 = Sicuro · 助けてください = Per favore aiutami', TL: '避難指示 = Evacuation order · 津波警報 = Tsunami warning · 地震 = Lindol · 安全 = Ligtas · 助けてください = Pakitulong', ID: '避難指示 = Perintah evakuasi · 津波警報 = Peringatan tsunami · 地震 = Gempa · 安全 = Aman · 助けてください = Tolong saya', DE: '避難指示 = Evakuierungsbefehl · 津波警報 = Tsunamiwarnung · 地震 = Erdbeben · 安全 = Sicher · 助けてください = Bitte helfen Sie mir', PT: '避難指示 = Ordem de evacuação · 津波警報 = Alerta de tsunami · 地震 = Terremoto · 安全 = Seguro · 助けてください = Por favor me ajude', RU: '避難指示 = Приказ об эвакуации · 津波警報 = Предупреждение о цунами · 地震 = Землетрясение · 安全 = Безопасно · 助けてください = Помогите, пожалуйста', YUE: '避難指示 = 撤離命令 · 津波警報 = 海嘯警告 · 地震 = 地震 · 安全 = 安全 · 助けてください = 請幫幫我' },
  },
]

export default function DisasterPage() {
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

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, marginTop: 16 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#b45309', fontVariationSettings: "'FILL' 1" as string }}>emergency_home</span>
        <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800 }}>{tl(TITLE, lang)}</h1>
      </div>
      <p style={{ fontSize: 13, color: '#5a413d', marginBottom: 28, lineHeight: 1.65 }}>{tl(SUB, lang)}</p>

      {/* Links & Resources */}
      <section style={{ marginBottom: 32 }}>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
          {tl(SECTION_RESOURCES, lang)}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {LINKS.map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px', border: '1px solid rgba(226,190,186,0.2)', borderLeft: `3px solid ${item.color}` }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{item.icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 10px', marginBottom: 2 }}>
                    <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c' }}>{item.name}</p>
                    <span style={{ fontSize: 9, color: item.color, background: `${item.color}15`, padding: '2px 8px', borderRadius: 999, fontWeight: 700 }}>
                      {tl(item.tag, lang)}
                    </span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#5a413d', lineHeight: 1.65, marginBottom: item.url ? 12 : 0 }}>
                {tl(item.desc, lang)}
              </p>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: item.color, color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_new</span>
                  {tl(OPEN_BTN, lang)}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Preparation Tips */}
      <section>
        <h2 className="font-headline" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
          {tl(SECTION_PREPARE, lang)}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TIPS.map((tip, i) => (
            <div key={i} style={{ background: '#fffbeb', borderRadius: 12, padding: '16px', border: '1px solid rgba(180,83,9,0.1)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#fff', fontVariationSettings: "'FILL' 1" as string }}>{tip.icon}</span>
              </div>
              <div>
                <p className="font-headline" style={{ fontSize: 13, fontWeight: 700, color: '#1e1b1c', marginBottom: 5 }}>
                  {tl(tip.title, lang)}
                </p>
                <p style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.65 }}>
                  {tl(tip.desc, lang)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
