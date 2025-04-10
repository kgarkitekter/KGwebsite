'use client'

import MainLayout from '@/components/layout/MainLayout'
import Hero from '@/components/layout/Hero'
import ProjectsSection from '@/components/projects/ProjectsSection'
import AboutSection from '@/components/layout/AboutSection'
import ServicesSection from '@/components/layout/ServicesSection'
import BookingSection from '@/components/booking/BookingSection'

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ServicesSection />
      <BookingSection />
    </MainLayout>
  )
}
