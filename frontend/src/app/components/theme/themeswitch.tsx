"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return (
        <label className="cursor-pointer label">
          <span className="label-text">🌕</span> 
          <input type="checkbox" id="themeselect" className="toggle toggle-primary" onClick={() => {
            const checkbox = document.getElementById("themeselect") as HTMLInputElement
            if (checkbox.checked) {
                setTheme("light")
            } else {
                setTheme("dark")
            }
          } }/>
          <span className="label-text">☀️</span>
        </label>
      )
  } else {
    return (
        <label className="cursor-pointer label">
        <span className="label-text">🌕</span> 
        <input type="checkbox" id="themeselect" className="toggle toggle-primary" defaultChecked onClick={() => {
            const checkbox = document.getElementById("themeselect") as HTMLInputElement
            if (checkbox.checked) {
                setTheme("light")
            } else {
                setTheme("dark")
            }
        } }/>
        <span className="label-text">☀️</span>
        </label>
    )
    }
}

export default ThemeSwitch