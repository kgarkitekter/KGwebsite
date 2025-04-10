'use client'

import { useLanguage } from '@/context/LanguageContext'

const AboutSection = () => {
  const { t } = useLanguage()
  
  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">{t('about.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary mb-6">
              {/* Architect's photo */}
              <img 
                src="/images/about/architect_photo.jpg" 
                alt="Karin Gunnerek" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium mb-2">Karin Gunnerek</h3>
            <p className="text-muted-foreground text-center">Architect & Founder</p>
          </div>
          
          <div className="md:col-span-2">
            <p className="mb-6 text-lg">{t('about.p1')}</p>
            <p className="mb-8 text-lg">{t('about.p2')}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <h4 className="text-lg font-medium mb-2">{t('about.education')}</h4>
                <ul className="space-y-2">
                  <li>Master of Architecture, KTH Royal Institute of Technology</li>
                  <li>Bachelor of Science in Built Environment, Chalmers University</li>
                </ul>
              </div>
              
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <h4 className="text-lg font-medium mb-2">{t('about.experience')}</h4>
                <ul className="space-y-2">
                  <li>10+ years in residential and commercial architecture</li>
                  <li>Specialization in sustainable design solutions</li>
                  <li>Projects throughout Sweden with focus on Skövde region</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
