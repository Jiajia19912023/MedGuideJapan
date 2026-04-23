'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type ResidencyType = 'tourist' | 'newcomer' | 'resident' | null

interface ResidencyCtx {
  residency: ResidencyType
  setResidency: (r: ResidencyType) => void
}

const Ctx = createContext<ResidencyCtx>({ residency: null, setResidency: () => {} })

export function ResidencyProvider({ children }: { children: ReactNode }) {
  const [residency, setResidencyState] = useState<ResidencyType>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mj_residency') as ResidencyType
      if (stored) setResidencyState(stored)
    } catch {}
  }, [])

  function setResidency(r: ResidencyType) {
    setResidencyState(r)
    try { if (r) localStorage.setItem('mj_residency', r) } catch {}
  }

  return <Ctx.Provider value={{ residency, setResidency }}>{children}</Ctx.Provider>
}

export function useResidency() { return useContext(Ctx) }
