'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

const Hero = () => {
  const { t } = useLanguage()
  
  return (
    <section className="relative h-screen flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {/* Actual image with overlay */}
          <div className="absolute inset-0 bg-black/30 z-10" />
          <Image 
            src="/images/hero/modern_building_light.jpg"
            alt="Modern aesthetic architectural building"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/80">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="bg-white text-black hover:bg-white/90 px-6 py-3 rounded-md font-medium text-center">
              {t('hero.cta.projects')}
            </a>
            <a href="#booking" className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium text-center">
              {t('hero.cta.booking')}
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white text-sm mb-2">{t('hero.scroll')}</span>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce mt-2" />
        </div>
      </div>
    </section>
  )
}

export default Hero
