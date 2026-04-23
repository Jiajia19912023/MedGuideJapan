import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import DashboardShell from './shell'

export const metadata: Metadata = {
  title: 'MedGuide Japan',
  description: 'Free multilingual healthcare guide for foreigners in Japan. Find hospitals, understand the system, and get emergency help.',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>
}
