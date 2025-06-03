"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"

interface LanguageSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese",
  "Japanese",
  "Arabic",
  "Dutch",
  "Korean",
]

export default function LanguageSelect({ value, onChange, placeholder = "Select language" }: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (language: string) => {
    onChange(language)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white rounded px-3 py-2 text-left text-sm focus:outline-none transition-colors"
        style={{
          border: `1px solid #a2a9b1`,
          color: value ? "#222222" : "#72777d",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#0645ad")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#a2a9b1")}
      >
        <span className="block truncate">{value || placeholder}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            style={{ color: "#72777d" }}
          />
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full bg-white rounded shadow-lg max-h-60 overflow-auto"
          style={{ border: `1px solid #a2a9b1` }}
        >
          {LANGUAGES.map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => handleSelect(language)}
              className="w-full text-left px-3 py-2 text-sm focus:outline-none flex items-center justify-between transition-colors"
              style={{ color: "#222222" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span>{language}</span>
              {value === language && <Check className="w-4 h-4" style={{ color: "#0645ad" }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
