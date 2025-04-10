'use client'

import { Phone } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-secondary/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Karin Gunnerek Architecture</h3>
            <p className="mb-2">Storgatan 45</p>
            <p className="mb-2">541 30 Skövde, Sweden</p>
            <div className="flex items-center mt-4">
              <a 
                href="tel:+46704800934" 
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Phone size={18} className="mr-2" />
                Call Directly
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">{t('nav.services')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#services" className="hover:text-primary transition-colors">
                  {t('services.residential.title')}
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-primary transition-colors">
                  {t('services.commercial.title')}
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-primary transition-colors">
                  {t('services.consultation.title')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">{t('nav.projects')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#projects" className="hover:text-primary transition-colors">
                  {t('projects.filter.all')}
                </a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-primary transition-colors">
                  {t('projects.filter.professional')}
                </a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-primary transition-colors">
                  {t('projects.filter.personal')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Karin Gunnerek Architecture. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a 
              href="mailto:info@karingunnerek.se" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              info@karingunnerek.se
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
