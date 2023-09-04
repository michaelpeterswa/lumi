'use client'

import { ThemeProvider } from 'next-themes'

// @ts-ignore
export function TProvider({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>
}