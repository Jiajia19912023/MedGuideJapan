'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type LangCode = 'EN' | 'JP' | 'ZH' | 'ZH-T' | 'KO' | 'ES' | 'FR' | 'IT' | 'TL' | 'ID' | 'DE' | 'PT' | 'RU' | 'YUE'

const VALID: LangCode[] = ['EN','JP','ZH','ZH-T','KO','ES','FR','IT','TL','ID','DE','PT','RU','YUE']
const KEY = 'mj-lang'

interface LangCtx { lang: LangCode; setLang: (l: LangCode) => void }
const Ctx = createContext<LangCtx>({ lang: 'EN', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('EN')

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as LangCode | null
    if (stored && VALID.includes(stored)) setLangState(stored)
  }, [])

  function setLang(l: LangCode) {
    setLangState(l)
    localStorage.setItem(KEY, l)
  }

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}

export function useLang() { return useContext(Ctx) }
