'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import LanguageToggle from '@/components/LanguageToggle'
import { useLanguage } from '@/context/LanguageContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, setLanguage } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-medium">
          Karin Gunnerek Architecture
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/#projects" className="text-sm hover:text-primary transition-colors">
            {t('nav.projects')}
          </Link>
          <Link href="/#about" className="text-sm hover:text-primary transition-colors">
            {t('nav.about')}
          </Link>
          <Link href="/#services" className="text-sm hover:text-primary transition-colors">
            {t('nav.services')}
          </Link>
          <Link href="/#booking" className="text-sm hover:text-primary transition-colors">
            {t('nav.booking')}
          </Link>
          <LanguageToggle onChange={setLanguage} />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <LanguageToggle onChange={setLanguage} />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              href="/#projects" 
              className="text-sm hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.projects')}
            </Link>
            <Link 
              href="/#about" 
              className="text-sm hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link 
              href="/#services" 
              className="text-sm hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.services')}
            </Link>
            <Link 
              href="/#booking" 
              className="text-sm hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.booking')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
