"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const SUGGESTIONS = [
  "hello",
  "world",
  "translate",
  "language",
  "dictionary",
  "vocabulary",
  "apple",
  "banana",
  "orange",
  "computer",
  "internet",
  "website",
]

interface SearchInputProps {
  disabled?: boolean
  onSearch: (query: string) => void
  value: string
  onChange: (value: string) => void
}

export default function SearchInput({ disabled = false, onSearch, value, onChange }: SearchInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (value.trim() === "") {
      setSuggestions([])
      return
    }

    const filteredSuggestions = SUGGESTIONS.filter((item) => item.toLowerCase().includes(value.toLowerCase())).slice(
      0,
      5,
    )

    setSuggestions(filteredSuggestions)
  }, [value])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setShowSuggestions(true)
    setSelectedIndex(-1)
  }

  const handleInputFocus = () => {
    if (disabled) {
      toast({
        title: "Languages required",
        description: "You must select source and destination language first.",
        variant: "destructive",
      })
      inputRef.current?.blur()
      return
    }
    setShowSuggestions(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionSelect(suggestions[selectedIndex])
        } else {
          handleSearch()
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleSuggestionSelect = (suggestion: string) => {
    onChange(suggestion)
    setShowSuggestions(false)
    setSelectedIndex(-1)
    onSearch(suggestion)
  }

  const handleSearch = () => {
    setShowSuggestions(false)
    onSearch(value)
  }

  const clearInput = () => {
    onChange("")
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5" style={{ color: disabled ? "#a2a9b1" : "#72777d" }} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          placeholder="Type your word here"
          disabled={disabled}
          className="w-full pl-10 pr-10 py-3 rounded-lg text-lg focus:outline-none transition-colors"
          style={{
            border: `1px solid #a2a9b1`,
            backgroundColor: disabled ? "#f8f9fa" : "#ffffff",
            color: disabled ? "#a2a9b1" : "#222222",
            cursor: disabled ? "not-allowed" : "text",
          }}
          onFocusCapture={(e) => !disabled && (e.currentTarget.style.borderColor = "#0645ad")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#a2a9b1")}
        />
        {value && !disabled && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors"
            style={{ color: "#72777d" }}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {!disabled && showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto"
          style={{ border: `1px solid #a2a9b1` }}
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionSelect(suggestion)}
              className="w-full text-left px-4 py-3 text-sm focus:outline-none flex items-center space-x-3 transition-colors"
              style={{
                backgroundColor: index === selectedIndex ? "#f8f9fa" : "transparent",
                color: "#222222",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = index === selectedIndex ? "#f8f9fa" : "transparent")
              }
            >
              <Search className="h-4 w-4" style={{ color: "#72777d" }} />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
