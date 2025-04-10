'use client'

import { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'

type Language = 'en' | 'sv'

interface LanguageToggleProps {
  onChange?: (language: Language) => void
}

const LanguageToggle = ({ onChange }: LanguageToggleProps) => {
  const [language, setLanguage] = useState<Language>('en')
  const [isOpen, setIsOpen] = useState(false)

  const toggleLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setIsOpen(false)
    if (onChange) {
      onChange(newLanguage)
    }
    // Store language preference in localStorage
    localStorage.setItem('preferredLanguage', newLanguage)
  }

  useEffect(() => {
    // Check if there's a stored language preference
    const storedLanguage = localStorage.getItem('preferredLanguage') as Language
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'sv')) {
      setLanguage(storedLanguage)
      if (onChange) {
        onChange(storedLanguage)
      }
    }
  }, [onChange])

  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-1 text-sm hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle language"
      >
        <Globe size={16} />
        <span>{language === 'en' ? 'EN' : 'SV'}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-background border rounded-md shadow-md py-1 z-50">
          <button 
            className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-accent/50' : 'hover:bg-accent/20'}`}
            onClick={() => toggleLanguage('en')}
          >
            English
          </button>
          <button 
            className={`block w-full text-left px-4 py-2 text-sm ${language === 'sv' ? 'bg-accent/50' : 'hover:bg-accent/20'}`}
            onClick={() => toggleLanguage('sv')}
          >
            Svenska
          </button>
        </div>
      )}
    </div>
  )
}

export default LanguageToggle
