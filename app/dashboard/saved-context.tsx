'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface SavedItem {
  href: string
  title: string
  titleJP: string
  icon: string
  color: string
}

interface SavedCtx {
  items: SavedItem[]
  isSaved: (href: string) => boolean
  toggle: (item: SavedItem) => void
}

const Ctx = createContext<SavedCtx>({ items: [], isSaved: () => false, toggle: () => {} })

export function SavedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SavedItem[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mj_saved')
      if (stored) setItems(JSON.parse(stored))
    } catch {}
  }, [])

  function toggle(item: SavedItem) {
    setItems(prev => {
      const next = prev.some(i => i.href === item.href)
        ? prev.filter(i => i.href !== item.href)
        : [...prev, item]
      try { localStorage.setItem('mj_saved', JSON.stringify(next)) } catch {}
      return next
    })
  }

  return (
    <Ctx.Provider value={{ items, isSaved: (href) => items.some(i => i.href === href), toggle }}>
      {children}
    </Ctx.Provider>
  )
}

export function useSaved() { return useContext(Ctx) }
