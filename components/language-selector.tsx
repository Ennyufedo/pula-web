"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface LanguageSelectorProps {
  label: string
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
]

export default function LanguageSelector({ label }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(label)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language)
    setIsOpen(false)
  }

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 rounded flex items-center justify-between transition-colors"
        style={{
          backgroundColor: "#F0F8FF",
          borderColor: "#CBD5E1",
          border: "1px solid",
        }}
      >
        <span className="text-gray-700">{selectedLanguage}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 rounded shadow-lg z-20 max-h-60 overflow-y-auto"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#CBD5E1",
            border: "1px solid",
          }}
        >
          {LANGUAGES.map((language, index) => (
            <button
              key={index}
              onClick={() => handleLanguageSelect(language)}
              className="w-full text-left p-3 transition-colors border-b last:border-b-0"
              style={{
                borderColor: "#CBD5E1",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F0F8FF"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              {language}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
