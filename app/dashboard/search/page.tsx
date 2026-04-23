'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '../lang-context'
import { tr, SEARCH } from '../translations'

const CAT_KEYS = ['all', 'symptoms', 'hospitals', 'insurance', 'medicine', 'emergency'] as const

const RESULTS_EN = [
  { title: 'Sudden Fever — What to Do', category: 'symptoms', href: '/dashboard/emergency', desc: 'Steps to take when you have a high fever in Japan.', kw: 'cold flu temperature headache chills sick cough runny nose' },
  { title: 'Finding an English-Speaking Doctor', category: 'hospitals', href: '/dashboard/english-support', desc: 'Free phone lines, interpreters, and apps for getting medical help in English.', kw: 'interpreter language communication help translate' },
  { title: 'Health Insurance for Foreigners (NHI)', category: 'insurance', href: '/dashboard/system/insurance', desc: 'National Health Insurance costs, co-pay, and eligibility.', kw: 'NHI coverage premium enroll cost coverage' },
  { title: 'Night & Holiday Clinics', category: 'hospitals', href: '/dashboard/night-care', desc: 'How to find after-hours medical care near you.', kw: 'weekend holiday after hours urgent late night' },
  { title: 'Filling Prescriptions in Japan', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'How the prescription and pharmacy system works.', kw: 'medicine drug pill pharmacy prescription' },
  { title: 'Ambulance — When to Call 119', category: 'emergency', href: '/dashboard/ambulance', desc: 'Guidelines for using emergency services in Japan.', kw: '119 call emergency critical injury rescue' },
  { title: 'Preparation Checklist for Hospital Visits', category: 'hospitals', href: '/dashboard/checklist', desc: 'Documents and items to bring to your appointment.', kw: 'document card ID bring prepare insurance card' },
  { title: 'Where to Go First — Clinics vs Hospitals', category: 'hospitals', href: '/dashboard/system/primary-care', desc: 'Clinic, hospital, or university hospital — how to choose.', kw: 'choose where go first difference clinic' },
  { title: 'Referral Letters (紹介状)', category: 'hospitals', href: '/dashboard/system/referrals', desc: 'When you need a referral and how to get one.', kw: 'specialist transfer introduction referral letter' },
  { title: 'Prescription Rules & Validity', category: 'medicine', href: '/dashboard/system/prescriptions', desc: '4-day expiry, generic drugs, and the お薬手帳.', kw: 'medicine drug expiry generic validity pill' },
  { title: 'Medical Japanese Phrases', category: 'hospitals', href: '/dashboard/phrases', desc: 'Key phrases for reception, symptoms, appointments, and pharmacy.', kw: 'speak say language word communicate' },
  { title: 'Visit Flow Guide', category: 'hospitals', href: '/dashboard/visit-flow', desc: 'Step-by-step flowchart for emergency and routine visits.', kw: 'steps process how guide procedure' },
  { title: 'Check My Health Status', category: 'symptoms', href: '/dashboard/health-check', desc: 'Answer a few questions to find out whether to call 119, #7119, or visit a clinic.', kw: 'symptom advice consult should I go quiz' },
  { title: '#7119 Medical Consultation Hotline', category: 'emergency', href: '/dashboard/hotline', desc: 'Free nurse/doctor consultation before going to ER.', kw: 'phone hotline nurse call consult 7119' },
  { title: '#8000 Pediatric Advice Hotline', category: 'emergency', href: '/dashboard/hotline', desc: 'Pediatric nurse advice for children\'s symptoms at night.', kw: 'child baby kids pediatric night 8000' },
  { title: 'Surprises in Japanese Hospitals', category: 'hospitals', href: '/dashboard/articles/surprises', desc: 'What to expect that differs from your home country.', kw: 'culture different custom expectation unusual' },
  { title: 'Why Wait Times Are Long', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: 'The reasons behind Japan\'s long outpatient wait times.', kw: 'queue long wait crowded slow' },
  { title: 'Medical Culture Differences', category: 'hospitals', href: '/dashboard/articles/culture', desc: 'Doctor-led decisions, antibiotics, pain management, and more.', kw: 'custom antibiotic decision different culture' },
  { title: 'Getting Medicine at Night', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Convenience stores, 24h pharmacies, and hospital dispensaries.', kw: 'convenience store late night buy medicine pharmacy' },
  { title: 'English & Multilingual Support', category: 'hospitals', href: '/dashboard/english-support', desc: 'Free phone hotlines, interpreter services, and multilingual apps for medical help in Japan.', kw: 'english help interpreter language app translate' },
  { title: 'If You Are Hospitalized in Japan', category: 'hospitals', href: '/dashboard/articles/hospitalization', desc: 'What to bring, ward rules, visiting hours, and clinical differences during a Japanese hospital stay.', kw: 'admitted ward inpatient stay bed nurse room Foley catheter PEG tube anticoagulant ceiling lift' },
]

const RESULTS_JP = [
  { title: '急な発熱 — 対処法', category: 'symptoms', href: '/dashboard/emergency', desc: '日本で高熱が出た時の対処ステップ。', kw: '風邪 インフルエンザ 発熱 高熱 解熱 頭痛 体温 鼻水 咳 熱' },
  { title: '英語対応の医師を探す', category: 'hospitals', href: '/dashboard/english-support', desc: '無料電話通訳・多言語サービス・英語対応病院の探し方。', kw: '英語 通訳 翻訳 言語 外国語 多言語' },
  { title: '外国人向け健康保険（NHI）', category: 'insurance', href: '/dashboard/system/insurance', desc: '国民健康保険の費用・自己負担・加入資格。', kw: '保険 国保 加入 医療費 保険料 社保 健康保険' },
  { title: '夜間・休日クリニック', category: 'hospitals', href: '/dashboard/night-care', desc: '近くの時間外医療の見つけ方。', kw: '夜間 深夜 休日 時間外 急患 休み 日曜' },
  { title: '日本での処方薬の受け取り方', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: '処方箋と薬局システムの仕組み。', kw: '薬 処方箋 薬局 薬剤師 お薬 もらう 買う' },
  { title: '救急車 — 119番を呼ぶ基準', category: 'emergency', href: '/dashboard/ambulance', desc: '日本の緊急サービスの使い方。', kw: '緊急 119 救命 助ける 呼ぶ 救急' },
  { title: '受診準備チェックリスト', category: 'hospitals', href: '/dashboard/checklist', desc: '受診時に必要な書類・持ち物。', kw: '書類 保険証 身分証 持ち物 準備 必要なもの' },
  { title: 'まずどこへ行くべき — クリニックと病院の違い', category: 'hospitals', href: '/dashboard/system/primary-care', desc: 'クリニック・病院・大学病院の選び方。', kw: '選択 どこ クリニック 病院 違い 行き先' },
  { title: '紹介状の使い方', category: 'hospitals', href: '/dashboard/system/referrals', desc: '紹介状が必要な時期と取得方法。', kw: '紹介 転院 専門 専科 セカンド' },
  { title: '処方箋のルールと有効期限', category: 'medicine', href: '/dashboard/system/prescriptions', desc: '4日間の有効期限・ジェネリック・お薬手帳。', kw: '薬 ジェネリック 有効期限 お薬手帳 後発品' },
  { title: '医療日本語フレーズ集', category: 'hospitals', href: '/dashboard/phrases', desc: '受付・症状説明・予約・薬局で使えるフレーズ。', kw: '日本語 フレーズ 言い方 会話 言葉 単語' },
  { title: '受診の流れガイド', category: 'hospitals', href: '/dashboard/visit-flow', desc: '緊急・非緊急の受診ステップをフローチャートで確認。', kw: '受診 流れ 手順 やり方 どうすれば 手続き' },
  { title: '今の健康状態を確認する', category: 'symptoms', href: '/dashboard/health-check', desc: '質問に答えて119・#7119・クリニックのどれが適切かを確認。', kw: '症状 判断 相談 どうする どこへ 確認' },
  { title: '#7119 救急安心センター', category: 'emergency', href: '/dashboard/hotline', desc: 'ER前の無料看護師・医師相談電話。', kw: '電話 相談 7119 看護師 ホットライン 医師' },
  { title: '#8000 子供の急病相談', category: 'emergency', href: '/dashboard/hotline', desc: '夜間の小児症状に関する看護師相談。', kw: '子供 小児 夜間 8000 こども 小児科 赤ちゃん' },
  { title: '日本の病院で驚くこと', category: 'hospitals', href: '/dashboard/articles/surprises', desc: '出身国と異なる、知っておくべきこと。', kw: '違い 文化 驚き 習慣 日本特有' },
  { title: '待ち時間が長い理由', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: '日本の外来が混む構造的な理由。', kw: '待ち時間 混む 待つ 時間 長い 行列' },
  { title: '日本の医療文化の違い', category: 'hospitals', href: '/dashboard/articles/culture', desc: '医師主導・抗生物質・疼痛管理などの文化差。', kw: '文化 違い 習慣 抗生物質 痛み 鎮痛剤' },
  { title: '夜間に薬を入手する方法', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'コンビニ・24時間薬局・院内薬局の使い分け。', kw: '夜 コンビニ 薬 買う 深夜 24時間' },
  { title: '英語・多言語サポート', category: 'hospitals', href: '/dashboard/english-support', desc: '無料電話相談・通訳サービス・多言語アプリで日本の医療を英語でサポート。', kw: '英語 多言語 通訳 サポート 言語 外国語' },
  { title: '日本で入院したら', category: 'hospitals', href: '/dashboard/articles/hospitalization', desc: '持ち物・病棟のルール・面会時間・フォーリー・PEG・抗凝固など、入院前に知っておきたいこと。', kw: '入院 持ち物 病室 病棟 面会 フォーリー 抗凝固 PEG チューブ 点滴 シーリングリフト 転落' },
]

const RESULTS_ZH = [
  { title: '突然发烧 — 怎么办', category: 'symptoms', href: '/dashboard/emergency', desc: '在日本出现高烧时的处理步骤。', kw: '感冒 流感 发烧 发热 退烧 体温 头痛 咳嗽 鼻涕 发冷 着凉' },
  { title: '寻找会说英语的医生', category: 'hospitals', href: '/dashboard/english-support', desc: '获取英文医疗帮助的免费电话、翻译和应用程序。', kw: '英语 翻译 通译 语言 外语 多语言 沟通' },
  { title: '外国人健康保险（NHI）', category: 'insurance', href: '/dashboard/system/insurance', desc: '国民健康保险费用、自付额和加入资格。', kw: '保险 国民保险 社保 医保 保费 加入 报销' },
  { title: '夜间和节假日诊所', category: 'hospitals', href: '/dashboard/night-care', desc: '如何在附近找到非工作时间的医疗服务。', kw: '急诊 夜诊 深夜 节假日 时间外 周末 休假' },
  { title: '在日本取处方药', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: '处方和药局系统的运作方式。', kw: '药 处方 药局 药店 开药 处方笺 取药' },
  { title: '救护车 — 何时拨打119', category: 'emergency', href: '/dashboard/ambulance', desc: '日本使用紧急服务的指南。', kw: '急救 119 救命 紧急 呼救 急救车' },
  { title: '医院就诊准备清单', category: 'hospitals', href: '/dashboard/checklist', desc: '预约时需要携带的文件和物品。', kw: '文件 保险证 身份证 证件 准备 材料 带什么' },
  { title: '首选哪里 — 诊所与医院的比较', category: 'hospitals', href: '/dashboard/system/primary-care', desc: '诊所、医院或大学医院 — 如何选择。', kw: '去哪里 选择 诊所 大医院 区别 哪里好' },
  { title: '转诊信（紹介状）', category: 'hospitals', href: '/dashboard/system/referrals', desc: '何时需要转诊以及如何获得转诊。', kw: '绍介状 转院 转诊 专科 专门 推荐信' },
  { title: '处方规则和有效期', category: 'medicine', href: '/dashboard/system/prescriptions', desc: '4天有效期、仿制药和药手帐。', kw: '药 仿制药 有效期 药手帐 过期 通用药' },
  { title: '医疗日语短句', category: 'hospitals', href: '/dashboard/phrases', desc: '挂号、说明症状、预约和药局的关键短句。', kw: '日语 会话 怎么说 表达 语言 单词 日文' },
  { title: '就诊流程指南', category: 'hospitals', href: '/dashboard/visit-flow', desc: '紧急和常规就诊的逐步流程图。', kw: '看病 步骤 流程 怎么做 手续 就诊方法' },
  { title: '检查我的健康状况', category: 'symptoms', href: '/dashboard/health-check', desc: '回答几个问题，了解是否需要拨打119、#7119或就诊诊所。', kw: '症状 判断 建议 怎么处理 要去医院吗 需要急救吗' },
  { title: '#7119 医疗咨询热线', category: 'emergency', href: '/dashboard/hotline', desc: '前往急诊前可免费咨询护士或医生。', kw: '电话 热线 咨询 护士 7119 免费 相谈' },
  { title: '#8000 儿科建议热线', category: 'emergency', href: '/dashboard/hotline', desc: '夜间儿童症状的儿科护士建议。', kw: '孩子 小儿 儿童 宝宝 8000 小孩 婴儿' },
  { title: '日本医院的意外发现', category: 'hospitals', href: '/dashboard/articles/surprises', desc: '与您所在国家不同的就医体验。', kw: '文化 差异 习惯 不同 注意事项' },
  { title: '等待时间长的原因', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: '日本门诊等待时间长的结构性原因。', kw: '等待 排队 候诊 时间 为什么' },
  { title: '医疗文化差异', category: 'hospitals', href: '/dashboard/articles/culture', desc: '医生主导的决策、抗生素、疼痛管理等。', kw: '文化 差异 习惯 抗生素 止痛 决策' },
  { title: '夜间购药', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: '便利店、24小时药局和医院药房的使用方法。', kw: '深夜 便利店 买药 晚上 24小时 夜间' },
  { title: '英语和多语言支持', category: 'hospitals', href: '/dashboard/english-support', desc: '免费电话热线、翻译服务和多语言应用程序。', kw: '英语 多语言 翻译 帮助 通译 外语' },
  { title: '在日本住院须知', category: 'hospitals', href: '/dashboard/articles/hospitalization', desc: '应带物品、病房规则、探视时间以及住院期间的医疗差异。', kw: '住院 病房 探视 病床 插管 抗凝 入院 导尿管 PEG 胃管 吊顶提升机' },
]

const RESULTS_ZH_T = [
  { title: '突然發燒 — 怎麼辦', category: 'symptoms', href: '/dashboard/emergency', desc: '在日本出現高燒時的處理步驟。' },
  { title: '尋找會說英語的醫生', category: 'hospitals', href: '/dashboard/english-support', desc: '獲取英文醫療幫助的免費電話、翻譯和應用程式。' },
  { title: '外國人健康保險（NHI）', category: 'insurance', href: '/dashboard/system/insurance', desc: '國民健康保險費用、自付額和加入資格。' },
  { title: '夜間和節假日診所', category: 'hospitals', href: '/dashboard/night-care', desc: '如何在附近找到非工作時間的醫療服務。' },
  { title: '在日本取處方藥', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: '處方和藥局系統的運作方式。' },
  { title: '救護車 — 何時撥打119', category: 'emergency', href: '/dashboard/ambulance', desc: '日本使用緊急服務的指南。' },
  { title: '醫院就診準備清單', category: 'hospitals', href: '/dashboard/checklist', desc: '預約時需要攜帶的文件和物品。' },
  { title: '首選哪裡 — 診所與醫院的比較', category: 'hospitals', href: '/dashboard/system/primary-care', desc: '診所、醫院或大學醫院 — 如何選擇。' },
  { title: '轉診信（紹介状）', category: 'hospitals', href: '/dashboard/system/referrals', desc: '何時需要轉診以及如何獲得轉診。' },
  { title: '處方規則和有效期', category: 'medicine', href: '/dashboard/system/prescriptions', desc: '4天有效期、仿製藥和藥手冊。' },
  { title: '醫療日語短句', category: 'hospitals', href: '/dashboard/phrases', desc: '掛號、說明症狀、預約和藥局的關鍵短句。' },
  { title: '就診流程指南', category: 'hospitals', href: '/dashboard/visit-flow', desc: '緊急和常規就診的逐步流程圖。' },
  { title: '檢查我的健康狀況', category: 'symptoms', href: '/dashboard/health-check', desc: '回答幾個問題，了解是否需要撥打119、#7119或就診診所。' },
  { title: '#7119 醫療諮詢熱線', category: 'emergency', href: '/dashboard/hotline', desc: '前往急診前可免費諮詢護士或醫生。' },
  { title: '#8000 兒科建議熱線', category: 'emergency', href: '/dashboard/hotline', desc: '夜間兒童症狀的兒科護士建議。' },
  { title: '日本醫院的意外發現', category: 'hospitals', href: '/dashboard/articles/surprises', desc: '與您所在國家不同的就醫體驗。' },
  { title: '等待時間長的原因', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: '日本門診等待時間長的結構性原因。' },
  { title: '醫療文化差異', category: 'hospitals', href: '/dashboard/articles/culture', desc: '醫生主導的決策、抗生素、疼痛管理等。' },
  { title: '夜間購藥', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: '便利商店、24小時藥局和醫院藥房的使用方法。' },
  { title: '英語和多語言支援', category: 'hospitals', href: '/dashboard/english-support', desc: '免費電話熱線、翻譯服務和多語言應用程式。' },
]

const RESULTS_KO = [
  { title: '갑자기 열이 날 때 — 대처법', category: 'symptoms', href: '/dashboard/emergency', desc: '일본에서 고열이 날 때의 처리 단계.' },
  { title: '영어를 하는 의사 찾기', category: 'hospitals', href: '/dashboard/english-support', desc: '영어로 의료 도움을 받을 수 있는 무료 전화, 통역사, 앱.' },
  { title: '외국인 건강보험(NHI)', category: 'insurance', href: '/dashboard/system/insurance', desc: '국민건강보험 비용, 자기부담금, 가입자격.' },
  { title: '야간 및 공휴일 클리닉', category: 'hospitals', href: '/dashboard/night-care', desc: '근처에서 야간 의료 서비스를 찾는 방법.' },
  { title: '일본에서 처방약 받기', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: '처방전 및 약국 시스템 이용 방법.' },
  { title: '구급차 — 119에 전화해야 할 때', category: 'emergency', href: '/dashboard/ambulance', desc: '일본 응급 서비스 이용 지침.' },
  { title: '병원 방문 준비 체크리스트', category: 'hospitals', href: '/dashboard/checklist', desc: '예약 시 지참해야 할 서류 및 물품.' },
  { title: '어디로 가야 할까 — 클리닉 vs 병원', category: 'hospitals', href: '/dashboard/system/primary-care', desc: '클리닉, 병원, 대학병원 — 선택 방법.' },
  { title: '의뢰서(紹介状)', category: 'hospitals', href: '/dashboard/system/referrals', desc: '의뢰서가 필요한 시점과 받는 방법.' },
  { title: '처방 규칙 및 유효기간', category: 'medicine', href: '/dashboard/system/prescriptions', desc: '4일 유효기간, 제네릭 의약품, 처방 수첩.' },
  { title: '의료 일본어 회화', category: 'hospitals', href: '/dashboard/phrases', desc: '접수, 증상 설명, 예약, 약국에서 쓰는 핵심 표현.' },
  { title: '진료 흐름 가이드', category: 'hospitals', href: '/dashboard/visit-flow', desc: '응급 및 일반 진료의 단계별 흐름도.' },
  { title: '내 건강 상태 확인', category: 'symptoms', href: '/dashboard/health-check', desc: '몇 가지 질문에 답해 119, #7119, 클리닉 중 어디가 적합한지 확인.' },
  { title: '#7119 의료 상담 전화', category: 'emergency', href: '/dashboard/hotline', desc: '응급실 방문 전 무료 간호사·의사 상담.' },
  { title: '#8000 소아과 상담 전화', category: 'emergency', href: '/dashboard/hotline', desc: '야간 소아 증상에 대한 소아과 간호사 상담.' },
  { title: '일본 병원에서 놀라운 것들', category: 'hospitals', href: '/dashboard/articles/surprises', desc: '본국과 다른 점 알아보기.' },
  { title: '대기 시간이 긴 이유', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: '일본 외래 대기 시간이 긴 구조적 이유.' },
  { title: '의료 문화 차이', category: 'hospitals', href: '/dashboard/articles/culture', desc: '의사 주도 결정, 항생제, 통증 관리 등.' },
  { title: '야간에 약 구하기', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: '편의점, 24시간 약국, 병원 내 약국 활용법.' },
  { title: '영어 및 다국어 지원', category: 'hospitals', href: '/dashboard/english-support', desc: '무료 전화 상담, 통역 서비스, 다국어 앱.' },
]

const RESULTS_ES = [
  { title: 'Fiebre repentina — qué hacer', category: 'symptoms', href: '/dashboard/emergency', desc: 'Pasos a seguir cuando tienes fiebre alta en Japón.' },
  { title: 'Encontrar un médico angloparlante', category: 'hospitals', href: '/dashboard/english-support', desc: 'Líneas gratuitas, intérpretes y apps para ayuda médica en inglés.' },
  { title: 'Seguro médico para extranjeros (NHI)', category: 'insurance', href: '/dashboard/system/insurance', desc: 'Costos, copago y elegibilidad del Seguro Nacional de Salud.' },
  { title: 'Clínicas nocturnas y festivas', category: 'hospitals', href: '/dashboard/night-care', desc: 'Cómo encontrar atención médica fuera de horario cerca de ti.' },
  { title: 'Surtir recetas en Japón', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Cómo funciona el sistema de recetas y farmacias.' },
  { title: 'Ambulancia — cuándo llamar al 119', category: 'emergency', href: '/dashboard/ambulance', desc: 'Guías para usar los servicios de emergencia en Japón.' },
  { title: 'Lista de preparación para visitas hospitalarias', category: 'hospitals', href: '/dashboard/checklist', desc: 'Documentos y artículos que debes llevar a tu cita.' },
  { title: 'Adónde ir primero — clínicas vs hospitales', category: 'hospitals', href: '/dashboard/system/primary-care', desc: 'Clínica, hospital o universidad — cómo elegir.' },
  { title: 'Cartas de derivación (紹介状)', category: 'hospitals', href: '/dashboard/system/referrals', desc: 'Cuándo necesitas una derivación y cómo obtenerla.' },
  { title: 'Reglas de receta y validez', category: 'medicine', href: '/dashboard/system/prescriptions', desc: 'Vencimiento de 4 días, medicamentos genéricos y el お薬手帳.' },
  { title: 'Frases médicas en japonés', category: 'hospitals', href: '/dashboard/phrases', desc: 'Frases clave para recepción, síntomas, citas y farmacia.' },
  { title: 'Guía de flujo de visita', category: 'hospitals', href: '/dashboard/visit-flow', desc: 'Diagrama paso a paso para visitas de emergencia y rutinarias.' },
  { title: 'Verificar mi estado de salud', category: 'symptoms', href: '/dashboard/health-check', desc: 'Responde preguntas para saber si llamar al 119, #7119 o visitar una clínica.' },
  { title: '#7119 Línea de consulta médica', category: 'emergency', href: '/dashboard/hotline', desc: 'Consulta gratuita con enfermera/médico antes de ir a urgencias.' },
  { title: '#8000 Línea de asesoramiento pediátrico', category: 'emergency', href: '/dashboard/hotline', desc: 'Asesoramiento de enfermera pediátrica para síntomas nocturnos.' },
  { title: 'Sorpresas en hospitales japoneses', category: 'hospitals', href: '/dashboard/articles/surprises', desc: 'Qué esperar que sea diferente de tu país de origen.' },
  { title: 'Por qué los tiempos de espera son largos', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: 'Las razones detrás de los largos tiempos de espera en Japón.' },
  { title: 'Diferencias culturales médicas', category: 'hospitals', href: '/dashboard/articles/culture', desc: 'Decisiones médicas, antibióticos, manejo del dolor y más.' },
  { title: 'Obtener medicamento de noche', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Tiendas de conveniencia, farmacias 24h y dispensarios hospitalarios.' },
  { title: 'Apoyo en inglés y multilingüe', category: 'hospitals', href: '/dashboard/english-support', desc: 'Líneas telefónicas gratuitas, servicios de intérpretes y apps multilingüe.' },
]

const RESULTS_FR = [
  { title: 'Fièvre soudaine — que faire', category: 'symptoms', href: '/dashboard/emergency', desc: 'Étapes à suivre en cas de forte fièvre au Japon.' },
  { title: 'Trouver un médecin anglophone', category: 'hospitals', href: '/dashboard/english-support', desc: 'Lignes gratuites, interprètes et applications pour aide médicale en anglais.' },
  { title: 'Assurance maladie pour étrangers (NHI)', category: 'insurance', href: '/dashboard/system/insurance', desc: 'Coûts, ticket modérateur et éligibilité de l\'Assurance Nationale.' },
  { title: 'Cliniques de nuit et jours fériés', category: 'hospitals', href: '/dashboard/night-care', desc: 'Comment trouver des soins en dehors des heures normales.' },
  { title: 'Remplir des ordonnances au Japon', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Comment fonctionne le système d\'ordonnances et de pharmacies.' },
  { title: 'Ambulance — quand appeler le 119', category: 'emergency', href: '/dashboard/ambulance', desc: 'Lignes directrices pour les services d\'urgence au Japon.' },
  { title: 'Liste de préparation pour les visites', category: 'hospitals', href: '/dashboard/checklist', desc: 'Documents et articles à apporter à votre rendez-vous.' },
  { title: 'Où aller en premier — cliniques vs hôpitaux', category: 'hospitals', href: '/dashboard/system/primary-care', desc: 'Clinique, hôpital ou universitaire — comment choisir.' },
  { title: 'Lettres de référence (紹介状)', category: 'hospitals', href: '/dashboard/system/referrals', desc: 'Quand vous avez besoin d\'une référence et comment l\'obtenir.' },
  { title: 'Règles d\'ordonnance et validité', category: 'medicine', href: '/dashboard/system/prescriptions', desc: 'Expiration de 4 jours, génériques et le お薬手帳.' },
  { title: 'Phrases médicales en japonais', category: 'hospitals', href: '/dashboard/phrases', desc: 'Phrases clés pour la réception, les symptômes, les rendez-vous.' },
  { title: 'Guide de flux de visite', category: 'hospitals', href: '/dashboard/visit-flow', desc: 'Organigramme étape par étape pour les visites d\'urgence et de routine.' },
  { title: 'Vérifier mon état de santé', category: 'symptoms', href: '/dashboard/health-check', desc: 'Répondez pour savoir s\'il faut appeler le 119, le #7119 ou une clinique.' },
  { title: '#7119 Ligne de consultation médicale', category: 'emergency', href: '/dashboard/hotline', desc: 'Consultation gratuite infirmière/médecin avant les urgences.' },
  { title: '#8000 Ligne de conseils pédiatriques', category: 'emergency', href: '/dashboard/hotline', desc: 'Conseils pédiatriques pour les symptômes nocturnes des enfants.' },
  { title: 'Surprises dans les hôpitaux japonais', category: 'hospitals', href: '/dashboard/articles/surprises', desc: 'Ce à quoi s\'attendre qui diffère de votre pays d\'origine.' },
  { title: 'Pourquoi les temps d\'attente sont longs', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: 'Les raisons des longs temps d\'attente en consultation externe.' },
  { title: 'Différences culturelles médicales', category: 'hospitals', href: '/dashboard/articles/culture', desc: 'Décisions médicales, antibiotiques, gestion de la douleur et plus.' },
  { title: 'Obtenir des médicaments la nuit', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Épiceries, pharmacies 24h et dispensaires hospitaliers.' },
  { title: 'Soutien en anglais et multilingue', category: 'hospitals', href: '/dashboard/english-support', desc: 'Lignes gratuites, services d\'interprètes et applications multilingues.' },
]

const RESULTS_IT = [
  { title: 'Febbre improvvisa — cosa fare', category: 'symptoms', href: '/dashboard/emergency', desc: 'Passi da seguire in caso di febbre alta in Giappone.' },
  { title: 'Trovare un medico anglofono', category: 'hospitals', href: '/dashboard/english-support', desc: 'Linee gratuite, interpreti e app per assistenza medica in inglese.' },
  { title: 'Assicurazione sanitaria per stranieri (NHI)', category: 'insurance', href: '/dashboard/system/insurance', desc: 'Costi, compartecipazione ed eleggibilità dell\'Assicurazione Nazionale.' },
  { title: 'Cliniche notturne e festive', category: 'hospitals', href: '/dashboard/night-care', desc: 'Come trovare assistenza medica fuori orario vicino a te.' },
  { title: 'Ricette mediche in Giappone', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Come funziona il sistema di prescrizioni e farmacie.' },
  { title: 'Ambulanza — quando chiamare il 119', category: 'emergency', href: '/dashboard/ambulance', desc: 'Linee guida per i servizi di emergenza in Giappone.' },
  { title: 'Lista di preparazione per visite ospedaliere', category: 'hospitals', href: '/dashboard/checklist', desc: 'Documenti e articoli da portare al tuo appuntamento.' },
  { title: 'Dove andare prima — cliniche vs ospedali', category: 'hospitals', href: '/dashboard/system/primary-care', desc: 'Clinica, ospedale o universitario — come scegliere.' },
  { title: 'Lettere di riferimento (紹介状)', category: 'hospitals', href: '/dashboard/system/referrals', desc: 'Quando hai bisogno di un riferimento e come ottenerlo.' },
  { title: 'Regole di prescrizione e validità', category: 'medicine', href: '/dashboard/system/prescriptions', desc: 'Scadenza di 4 giorni, farmaci generici e il お薬手帳.' },
  { title: 'Frasi mediche in giapponese', category: 'hospitals', href: '/dashboard/phrases', desc: 'Frasi chiave per reception, sintomi, appuntamenti e farmacia.' },
  { title: 'Guida al flusso della visita', category: 'hospitals', href: '/dashboard/visit-flow', desc: 'Diagramma di flusso per visite di emergenza e di routine.' },
  { title: 'Controlla il mio stato di salute', category: 'symptoms', href: '/dashboard/health-check', desc: 'Rispondi per sapere se chiamare il 119, #7119 o visitare una clinica.' },
  { title: '#7119 Linea di consulenza medica', category: 'emergency', href: '/dashboard/hotline', desc: 'Consulenza gratuita infermiera/medico prima del pronto soccorso.' },
  { title: '#8000 Linea di consulenza pediatrica', category: 'emergency', href: '/dashboard/hotline', desc: 'Consigli pediatrici per sintomi notturni dei bambini.' },
  { title: 'Sorprese negli ospedali giapponesi', category: 'hospitals', href: '/dashboard/articles/surprises', desc: 'Cosa aspettarsi di diverso rispetto al tuo paese d\'origine.' },
  { title: 'Perché i tempi di attesa sono lunghi', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: 'Le ragioni dei lunghi tempi di attesa ambulatoriali in Giappone.' },
  { title: 'Differenze culturali mediche', category: 'hospitals', href: '/dashboard/articles/culture', desc: 'Decisioni mediche, antibiotici, gestione del dolore e altro.' },
  { title: 'Acquistare medicine di notte', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Negozi, farmacie 24h e dispensari ospedalieri.' },
  { title: 'Supporto in inglese e multilingue', category: 'hospitals', href: '/dashboard/english-support', desc: 'Linee gratuite, servizi di interpreti e app multilingue.' },
]

const RESULTS_DE = [
  { title: 'Plötzliches Fieber — was tun', category: 'symptoms', href: '/dashboard/emergency', desc: 'Schritte bei hohem Fieber in Japan.' },
  { title: 'Einen englischsprachigen Arzt finden', category: 'hospitals', href: '/dashboard/english-support', desc: 'Kostenlose Leitungen, Dolmetscher und Apps für medizinische Hilfe auf Englisch.' },
  { title: 'Krankenversicherung für Ausländer (NHI)', category: 'insurance', href: '/dashboard/system/insurance', desc: 'Kosten, Zuzahlung und Berechtigung der nationalen Krankenversicherung.' },
  { title: 'Nacht- und Feiertagskliniken', category: 'hospitals', href: '/dashboard/night-care', desc: 'Wie man außerhalb der Geschäftszeiten medizinische Versorgung findet.' },
  { title: 'Rezepte in Japan einlösen', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Wie das Rezept- und Apothekensystem funktioniert.' },
  { title: 'Krankenwagen — wann 119 anrufen', category: 'emergency', href: '/dashboard/ambulance', desc: 'Richtlinien für Notfalldienste in Japan.' },
  { title: 'Vorbereitungsliste für Krankenhausbesuche', category: 'hospitals', href: '/dashboard/checklist', desc: 'Dokumente und Gegenstände für Ihren Termin.' },
  { title: 'Wohin zuerst — Kliniken vs Krankenhäuser', category: 'hospitals', href: '/dashboard/system/primary-care', desc: 'Klinik, Krankenhaus oder Uniklinik — wie man wählt.' },
  { title: 'Überweisungsschreiben (紹介状)', category: 'hospitals', href: '/dashboard/system/referrals', desc: 'Wann eine Überweisung nötig ist und wie man sie erhält.' },
  { title: 'Rezeptregeln und Gültigkeit', category: 'medicine', href: '/dashboard/system/prescriptions', desc: '4-Tage-Ablauf, Generika und das お薬手帳.' },
  { title: 'Medizinische Japanisch-Phrasen', category: 'hospitals', href: '/dashboard/phrases', desc: 'Schlüsselphrasen für Anmeldung, Symptome, Termine und Apotheke.' },
  { title: 'Besuchsablauf-Leitfaden', category: 'hospitals', href: '/dashboard/visit-flow', desc: 'Schritt-für-Schritt-Diagramm für Not- und Routinebesuche.' },
  { title: 'Gesundheitsstatus überprüfen', category: 'symptoms', href: '/dashboard/health-check', desc: 'Fragen beantworten: 119, #7119 anrufen oder Klinik besuchen?' },
  { title: '#7119 Medizinische Beratungsleitung', category: 'emergency', href: '/dashboard/hotline', desc: 'Kostenlose Pflegefachkraft/Arzt-Beratung vor der Notaufnahme.' },
  { title: '#8000 Pädiatrische Beratungsleitung', category: 'emergency', href: '/dashboard/hotline', desc: 'Pädiatrische Beratung für nächtliche Kindersymptome.' },
  { title: 'Überraschungen in japanischen Krankenhäusern', category: 'hospitals', href: '/dashboard/articles/surprises', desc: 'Was sich von Ihrem Heimatland unterscheidet.' },
  { title: 'Warum Wartezeiten lang sind', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: 'Die Gründe für die langen ambulanten Wartezeiten in Japan.' },
  { title: 'Medizinische Kulturunterschiede', category: 'hospitals', href: '/dashboard/articles/culture', desc: 'Arztentscheidungen, Antibiotika, Schmerzmanagement und mehr.' },
  { title: 'Medikamente in der Nacht besorgen', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Convenience-Stores, 24h-Apotheken und Krankenhausapotheken.' },
  { title: 'Englischer und mehrsprachiger Support', category: 'hospitals', href: '/dashboard/english-support', desc: 'Kostenlose Hotlines, Dolmetscherdienste und mehrsprachige Apps.' },
]

const RESULTS_PT = [
  { title: 'Febre repentina — o que fazer', category: 'symptoms', href: '/dashboard/emergency', desc: 'Passos a seguir quando você tem febre alta no Japão.' },
  { title: 'Encontrar um médico que fala inglês', category: 'hospitals', href: '/dashboard/english-support', desc: 'Linhas gratuitas, intérpretes e apps para ajuda médica em inglês.' },
  { title: 'Seguro de saúde para estrangeiros (NHI)', category: 'insurance', href: '/dashboard/system/insurance', desc: 'Custos, copagamento e elegibilidade do Seguro Nacional de Saúde.' },
  { title: 'Clínicas noturnas e feriados', category: 'hospitals', href: '/dashboard/night-care', desc: 'Como encontrar atendimento médico fora do horário perto de você.' },
  { title: 'Pegar receitas no Japão', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Como funciona o sistema de receitas e farmácias.' },
  { title: 'Ambulância — quando ligar para o 119', category: 'emergency', href: '/dashboard/ambulance', desc: 'Diretrizes para usar os serviços de emergência no Japão.' },
  { title: 'Lista de preparação para visitas hospitalares', category: 'hospitals', href: '/dashboard/checklist', desc: 'Documentos e itens para trazer à sua consulta.' },
  { title: 'Onde ir primeiro — clínicas vs hospitais', category: 'hospitals', href: '/dashboard/system/primary-care', desc: 'Clínica, hospital ou universitário — como escolher.' },
  { title: 'Cartas de encaminhamento (紹介状)', category: 'hospitals', href: '/dashboard/system/referrals', desc: 'Quando você precisa de um encaminhamento e como obtê-lo.' },
  { title: 'Regras de receita e validade', category: 'medicine', href: '/dashboard/system/prescriptions', desc: 'Vencimento de 4 dias, genéricos e o お薬手帳.' },
  { title: 'Frases médicas em japonês', category: 'hospitals', href: '/dashboard/phrases', desc: 'Frases-chave para recepção, sintomas, consultas e farmácia.' },
  { title: 'Guia de fluxo de visita', category: 'hospitals', href: '/dashboard/visit-flow', desc: 'Fluxograma passo a passo para visitas de emergência e de rotina.' },
  { title: 'Verificar meu estado de saúde', category: 'symptoms', href: '/dashboard/health-check', desc: 'Responda para saber se deve ligar para 119, #7119 ou visitar uma clínica.' },
  { title: '#7119 Linha de consulta médica', category: 'emergency', href: '/dashboard/hotline', desc: 'Consulta gratuita com enfermeira/médico antes de ir à emergência.' },
  { title: '#8000 Linha de orientação pediátrica', category: 'emergency', href: '/dashboard/hotline', desc: 'Orientação pediátrica para sintomas noturnos de crianças.' },
  { title: 'Surpresas nos hospitais japoneses', category: 'hospitals', href: '/dashboard/articles/surprises', desc: 'O que esperar que é diferente do seu país de origem.' },
  { title: 'Por que os tempos de espera são longos', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: 'As razões por trás dos longos tempos de espera ambulatorial no Japão.' },
  { title: 'Diferenças culturais médicas', category: 'hospitals', href: '/dashboard/articles/culture', desc: 'Decisões médicas, antibióticos, controle da dor e mais.' },
  { title: 'Conseguir remédio à noite', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Lojas de conveniência, farmácias 24h e dispensários hospitalares.' },
  { title: 'Suporte em inglês e multilíngue', category: 'hospitals', href: '/dashboard/english-support', desc: 'Linhas gratuitas, serviços de intérpretes e apps multilíngues.' },
]

const RESULTS_RU = [
  { title: 'Внезапная температура — что делать', category: 'symptoms', href: '/dashboard/emergency', desc: 'Шаги при высокой температуре в Японии.' },
  { title: 'Найти англоязычного врача', category: 'hospitals', href: '/dashboard/english-support', desc: 'Бесплатные телефоны, переводчики и приложения для помощи на английском.' },
  { title: 'Медицинская страховка для иностранцев (NHI)', category: 'insurance', href: '/dashboard/system/insurance', desc: 'Стоимость, доплата и условия национального медицинского страхования.' },
  { title: 'Ночные и праздничные клиники', category: 'hospitals', href: '/dashboard/night-care', desc: 'Как найти медицинскую помощь в нерабочее время рядом с вами.' },
  { title: 'Получение рецептов в Японии', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Как работает система рецептов и аптек.' },
  { title: 'Скорая помощь — когда звонить 119', category: 'emergency', href: '/dashboard/ambulance', desc: 'Правила использования экстренных служб в Японии.' },
  { title: 'Чек-лист для визита в больницу', category: 'hospitals', href: '/dashboard/checklist', desc: 'Документы и вещи, которые нужно взять на приём.' },
  { title: 'Куда идти сначала — клиника или больница', category: 'hospitals', href: '/dashboard/system/primary-care', desc: 'Клиника, больница или университетская больница — как выбрать.' },
  { title: 'Направительные письма (紹介状)', category: 'hospitals', href: '/dashboard/system/referrals', desc: 'Когда нужно направление и как его получить.' },
  { title: 'Правила рецептов и срок действия', category: 'medicine', href: '/dashboard/system/prescriptions', desc: '4-дневный срок, дженерики и お薬手帳.' },
  { title: 'Медицинские фразы на японском', category: 'hospitals', href: '/dashboard/phrases', desc: 'Ключевые фразы для регистратуры, симптомов, записи и аптеки.' },
  { title: 'Руководство по порядку посещения', category: 'hospitals', href: '/dashboard/visit-flow', desc: 'Пошаговая схема для экстренных и плановых посещений.' },
  { title: 'Проверить состояние здоровья', category: 'symptoms', href: '/dashboard/health-check', desc: 'Ответьте на вопросы: звонить 119, #7119 или идти в клинику?' },
  { title: '#7119 Горячая линия медицинских консультаций', category: 'emergency', href: '/dashboard/hotline', desc: 'Бесплатная консультация медсестры/врача до обращения в скорую.' },
  { title: '#8000 Педиатрическая горячая линия', category: 'emergency', href: '/dashboard/hotline', desc: 'Педиатрические советы при ночных симптомах у детей.' },
  { title: 'Неожиданности в японских больницах', category: 'hospitals', href: '/dashboard/articles/surprises', desc: 'Чем японские больницы отличаются от привычных вам.' },
  { title: 'Почему время ожидания такое долгое', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: 'Причины длительного ожидания в японских поликлиниках.' },
  { title: 'Различия в медицинской культуре', category: 'hospitals', href: '/dashboard/articles/culture', desc: 'Решения врача, антибиотики, обезболивание и другое.' },
  { title: 'Получить лекарство ночью', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Круглосуточные магазины, аптеки и больничные аптеки.' },
  { title: 'Поддержка на английском и других языках', category: 'hospitals', href: '/dashboard/english-support', desc: 'Бесплатные линии, услуги переводчиков и многоязычные приложения.' },
]

const RESULTS_TL = [
  { title: 'Biglaang Lagnat — Ano ang Gagawin', category: 'symptoms', href: '/dashboard/emergency', desc: 'Mga hakbang kung mayroon kang mataas na lagnat sa Japan.' },
  { title: 'Maghanap ng Doktor na Nagsasalita ng Ingles', category: 'hospitals', href: '/dashboard/english-support', desc: 'Libreng linya ng telepono, tagapagsalin, at mga app para sa tulong medikal.' },
  { title: 'Seguro sa Kalusugan para sa Dayuhan (NHI)', category: 'insurance', href: '/dashboard/system/insurance', desc: 'Gastos, co-pay, at pagiging karapat-dapat sa National Health Insurance.' },
  { title: 'Mga Klinika sa Gabi at Pista Opisyal', category: 'hospitals', href: '/dashboard/night-care', desc: 'Paano mahanap ang medikal na pag-aalaga sa labas ng oras.' },
  { title: 'Pagkuha ng Reseta sa Japan', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Paano gumagana ang sistema ng reseta at parmasya.' },
  { title: 'Ambulansya — Kailan Tatawag sa 119', category: 'emergency', href: '/dashboard/ambulance', desc: 'Gabay sa paggamit ng emergency services sa Japan.' },
  { title: 'Checklist sa Pagbisita sa Ospital', category: 'hospitals', href: '/dashboard/checklist', desc: 'Mga dokumento at bagay na dala sa appointment.' },
  { title: 'Saan Muna Pupunta — Klinika vs Ospital', category: 'hospitals', href: '/dashboard/system/primary-care', desc: 'Klinika, ospital, o unibersidad — paano pumili.' },
  { title: 'Mga Liham ng Referral (紹介状)', category: 'hospitals', href: '/dashboard/system/referrals', desc: 'Kailan kailangan ang referral at paano makuha.' },
  { title: 'Mga Patakaran sa Reseta at Bisa', category: 'medicine', href: '/dashboard/system/prescriptions', desc: '4-araw na pagkawala ng bisa, generic na gamot, at お薬手帳.' },
  { title: 'Mga Pariralang Medikal sa Hapon', category: 'hospitals', href: '/dashboard/phrases', desc: 'Mga pangunahing parirala para sa reception, sintomas, at parmasya.' },
  { title: 'Gabay sa Daloy ng Pagbisita', category: 'hospitals', href: '/dashboard/visit-flow', desc: 'Hakbang-hakbang na flowchart para sa emergency at routine na pagbisita.' },
  { title: 'Suriin ang Aking Kalusugan', category: 'symptoms', href: '/dashboard/health-check', desc: 'Sagutin ang ilang tanong para malaman kung tatawag sa 119, #7119, o klinika.' },
  { title: '#7119 Hotline ng Medikal na Konsultasyon', category: 'emergency', href: '/dashboard/hotline', desc: 'Libreng konsultasyon bago pumunta sa ER.' },
  { title: '#8000 Hotline ng Payo sa Pediatrics', category: 'emergency', href: '/dashboard/hotline', desc: 'Payo ng pediátrikong nars para sa mga sintomas ng bata sa gabi.' },
  { title: 'Mga Sorpresa sa mga Ospital sa Japan', category: 'hospitals', href: '/dashboard/articles/surprises', desc: 'Ano ang inaasahan na naiiba sa iyong bansang pinagmulan.' },
  { title: 'Bakit Matagal ang Oras ng Paghihintay', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: 'Mga dahilan ng matagal na oras ng paghihintay sa Japan.' },
  { title: 'Mga Pagkakaiba sa Kulturang Medikal', category: 'hospitals', href: '/dashboard/articles/culture', desc: 'Mga desisyon ng doktor, antibiotics, pamamahala ng sakit, at iba pa.' },
  { title: 'Pagkuha ng Gamot sa Gabi', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Convenience store, 24h na parmasya, at ospital na parmasya.' },
  { title: 'Suporta sa Ingles at Maraming Wika', category: 'hospitals', href: '/dashboard/english-support', desc: 'Libreng hotline, serbisyo ng tagapagsalin, at multilingual na apps.' },
]

const RESULTS_ID = [
  { title: 'Demam Tiba-tiba — Apa yang Harus Dilakukan', category: 'symptoms', href: '/dashboard/emergency', desc: 'Langkah yang harus diambil saat demam tinggi di Jepang.' },
  { title: 'Menemukan Dokter yang Berbicara Bahasa Inggris', category: 'hospitals', href: '/dashboard/english-support', desc: 'Saluran telepon gratis, penerjemah, dan aplikasi untuk bantuan medis.' },
  { title: 'Asuransi Kesehatan untuk Orang Asing (NHI)', category: 'insurance', href: '/dashboard/system/insurance', desc: 'Biaya, co-pay, dan kelayakan Asuransi Kesehatan Nasional.' },
  { title: 'Klinik Malam dan Hari Libur', category: 'hospitals', href: '/dashboard/night-care', desc: 'Cara menemukan perawatan medis di luar jam kerja di dekat Anda.' },
  { title: 'Mengambil Resep di Jepang', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Cara kerja sistem resep dan apotek.' },
  { title: 'Ambulans — Kapan Menghubungi 119', category: 'emergency', href: '/dashboard/ambulance', desc: 'Panduan penggunaan layanan darurat di Jepang.' },
  { title: 'Daftar Persiapan Kunjungan Rumah Sakit', category: 'hospitals', href: '/dashboard/checklist', desc: 'Dokumen dan barang yang harus dibawa ke janji temu.' },
  { title: 'Kemana Pergi Pertama — Klinik vs Rumah Sakit', category: 'hospitals', href: '/dashboard/system/primary-care', desc: 'Klinik, rumah sakit, atau universitas — cara memilih.' },
  { title: 'Surat Rujukan (紹介状)', category: 'hospitals', href: '/dashboard/system/referrals', desc: 'Kapan Anda membutuhkan rujukan dan cara mendapatkannya.' },
  { title: 'Aturan Resep dan Masa Berlaku', category: 'medicine', href: '/dashboard/system/prescriptions', desc: 'Kedaluwarsa 4 hari, obat generik, dan お薬手帳.' },
  { title: 'Frasa Medis dalam Bahasa Jepang', category: 'hospitals', href: '/dashboard/phrases', desc: 'Frasa kunci untuk resepsi, gejala, janji temu, dan apotek.' },
  { title: 'Panduan Alur Kunjungan', category: 'hospitals', href: '/dashboard/visit-flow', desc: 'Diagram alur langkah demi langkah untuk kunjungan darurat dan rutin.' },
  { title: 'Periksa Status Kesehatan Saya', category: 'symptoms', href: '/dashboard/health-check', desc: 'Jawab pertanyaan untuk mengetahui apakah harus menghubungi 119, #7119, atau klinik.' },
  { title: '#7119 Saluran Konsultasi Medis', category: 'emergency', href: '/dashboard/hotline', desc: 'Konsultasi gratis perawat/dokter sebelum ke UGD.' },
  { title: '#8000 Saluran Saran Pediatri', category: 'emergency', href: '/dashboard/hotline', desc: 'Saran perawat anak untuk gejala anak di malam hari.' },
  { title: 'Kejutan di Rumah Sakit Jepang', category: 'hospitals', href: '/dashboard/articles/surprises', desc: 'Apa yang berbeda dari negara asal Anda.' },
  { title: 'Mengapa Waktu Tunggu Lama', category: 'hospitals', href: '/dashboard/articles/wait-times', desc: 'Alasan di balik waktu tunggu rawat jalan yang lama di Jepang.' },
  { title: 'Perbedaan Budaya Medis', category: 'hospitals', href: '/dashboard/articles/culture', desc: 'Keputusan dokter, antibiotik, manajemen nyeri, dan lainnya.' },
  { title: 'Mendapatkan Obat di Malam Hari', category: 'medicine', href: '/dashboard/articles/late-night-medicine', desc: 'Minimarket, apotek 24 jam, dan apotek rumah sakit.' },
  { title: 'Dukungan Bahasa Inggris dan Multibahasa', category: 'hospitals', href: '/dashboard/english-support', desc: 'Hotline gratis, layanan penerjemah, dan aplikasi multibahasa.' },
]

function getResults(lang: string): { title: string; category: string; href: string; desc: string; kw?: string }[] {
  switch (lang) {
    case 'JP': return RESULTS_JP
    case 'ZH': return RESULTS_ZH
    case 'ZH-T': return RESULTS_ZH_T
    case 'KO': return RESULTS_KO
    case 'ES': return RESULTS_ES
    case 'FR': return RESULTS_FR
    case 'IT': return RESULTS_IT
    case 'DE': return RESULTS_DE
    case 'PT': return RESULTS_PT
    case 'RU': return RESULTS_RU
    case 'TL': return RESULTS_TL
    case 'ID': return RESULTS_ID
    default: return RESULTS_EN
  }
}

function formatCount(n: number, lang: string): string {
  if (lang === 'JP') return `${n}件`
  if (lang === 'ZH') return `${n}条结果`
  if (lang === 'ZH-T') return `${n}條結果`
  if (lang === 'KO') return `${n}개 결과`
  if (lang === 'ES') return `${n} resultado${n !== 1 ? 's' : ''}`
  if (lang === 'FR') return `${n} résultat${n !== 1 ? 's' : ''}`
  if (lang === 'IT') return `${n} risultat${n !== 1 ? 'i' : 'o'}`
  if (lang === 'TL') return `${n} resulta`
  if (lang === 'ID') return `${n} hasil`
  if (lang === 'DE') return `${n} Ergebnis${n !== 1 ? 'se' : ''}`
  if (lang === 'PT') return `${n} resultado${n !== 1 ? 's' : ''}`
  if (lang === 'RU') {
    const mod10 = n % 10, mod100 = n % 100
    if (mod10 === 1 && mod100 !== 11) return `${n} результат`
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} результата`
    return `${n} результатов`
  }
  return `${n} result${n !== 1 ? 's' : ''}`
}

export default function SearchPage() {
  const { lang } = useLang()
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState<typeof CAT_KEYS[number]>('all')
  const results = getResults(lang)

  const filtered = results.filter(r => {
    const matchCat = activeCat === 'all' || r.category === activeCat
    const q = query.toLowerCase()
    const matchQ = q === '' || r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q) || (r.kw?.toLowerCase().includes(q) ?? false)
    return matchCat && matchQ
  })

  return (
    <main className="mj-container" style={{ paddingTop: 28 }}>
      <Link href="/dashboard" className="page-back">
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
        {tr({ EN: 'Back to Home', JP: 'ホームに戻る', ZH: '返回首页', 'ZH-T': '返回首頁', KO: '홈으로', ES: 'Volver', FR: 'Retour', IT: 'Indietro', TL: 'Bumalik', ID: 'Kembali', DE: 'Zurück', PT: 'Voltar', RU: 'Назад' }, lang)}
      </Link>

      <h1 className="font-headline" style={{ fontSize: 22, fontWeight: 800, color: '#1e1b1c', marginBottom: 18 }}>{tr(SEARCH.title, lang)}</h1>

      <div style={{ position: 'relative', marginBottom: 16 }}>
        <span className="material-symbols-outlined" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(32,103,119,0.5)', fontSize: 20, pointerEvents: 'none' }}>search</span>
        <input
          className="search-input font-body"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={tr(SEARCH.placeholder, lang)}
          type="text"
          style={{ width: '100%', boxSizing: 'border-box', paddingLeft: 44, paddingRight: 40, paddingTop: 14, paddingBottom: 14, background: '#faf2f2', border: 'none', borderBottom: '2px solid rgba(226,190,186,0.4)', borderRadius: '12px 12px 0 0', fontSize: 15 }}
        />
        {query && (
          <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#78716c' }}>close</span>
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {CAT_KEYS.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)} style={{ padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', background: activeCat === cat ? '#b22620' : '#f4eced', color: activeCat === cat ? '#fff' : '#5a413d', transition: 'all 0.15s' }}>
            {tr(SEARCH.cats[cat], lang)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#78716c' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 40, display: 'block', marginBottom: 12, opacity: 0.4 }}>search_off</span>
          <p style={{ fontSize: 14 }}>{tr(SEARCH.noResults, lang)}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p className="font-label" style={{ fontSize: 11, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
            {formatCount(filtered.length, lang)}
          </p>
          {filtered.map(r => (
            <Link key={r.title} href={r.href} style={{ display: 'block', background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(226,190,186,0.2)', textDecoration: 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#fff5f5')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <span className="font-label" style={{ fontSize: 10, color: '#206777', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>{tr(SEARCH.cats[r.category as typeof CAT_KEYS[number]], lang)}</span>
                  <span className="font-headline" style={{ fontSize: 14, fontWeight: 700, color: '#1e1b1c', display: 'block', marginBottom: 4 }}>{r.title}</span>
                  <span style={{ fontSize: 12, color: '#5a413d', lineHeight: 1.5 }}>{r.desc}</span>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#c7bfbe', flexShrink: 0, marginTop: 2 }}>chevron_right</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
