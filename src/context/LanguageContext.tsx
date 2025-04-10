'use client'

import { createContext, useState, useContext, ReactNode } from 'react'

type Language = 'en' | 'sv'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.booking': 'Book Consultation',
    
    // Hero
    'hero.title': 'Modern Architecture for Modern Living',
    'hero.subtitle': 'Innovative designs for residential and commercial spaces that blend form and function.',
    'hero.cta.projects': 'View Projects',
    'hero.cta.booking': 'Book Consultation',
    'hero.scroll': 'Scroll to explore',
    
    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': 'A selection of architectural work',
    'projects.filter.all': 'All Projects',
    'projects.filter.professional': 'Professional Work',
    'projects.filter.personal': 'Personal Projects',
    'projects.category.residential': 'Residential',
    'projects.category.commercial': 'Commercial',
    'projects.category.personal': 'Personal Project',
    'projects.viewProject': 'View Project',
    'projects.location': 'Location',
    'projects.year': 'Year',
    'projects.area': 'Area',
    'projects.client': 'Client',
    
    // About
    'about.title': 'About the Architect',
    'about.p1': 'With over 10 years of experience in architectural design, I specialize in creating spaces that balance aesthetic beauty with practical functionality. My approach combines modern minimalist principles with sustainable practices to create buildings that stand the test of time.',
    'about.p2': 'My portfolio includes a diverse range of projects from residential homes to commercial properties, each designed with careful attention to client needs, environmental impact, and innovative use of space and materials.',
    'about.cta': 'Learn More',
    'about.education': 'Education',
    'about.experience': 'Experience',
    
    // Services
    'services.title': 'Services',
    'services.subtitle': 'Architectural solutions for your needs',
    'services.residential.title': 'Residential Design',
    'services.residential.description': 'Custom home designs that reflect your lifestyle and preferences, from new constructions to renovations and extensions.',
    'services.commercial.title': 'Commercial Projects',
    'services.commercial.description': 'Functional and inspiring spaces for businesses, including offices, retail spaces, and hospitality venues.',
    'services.consultation.title': 'Consultation',
    'services.consultation.description': 'Professional advice on architectural possibilities, feasibility studies, and design concepts for your project.',
    
    // Booking
    'booking.title': 'Book a Consultation',
    'booking.subtitle': 'Schedule a time to discuss your architectural project',
    'booking.calendar.title': 'Select a Date',
    'booking.timeslots.title': 'Available Time Slots',
    'booking.timeslots.empty': 'Please select a date to view available time slots',
    'booking.project.label': 'Project Type',
    'booking.project.placeholder': 'Describe your project type',
    'booking.submit': 'Book Appointment',
    'booking.name': 'Name',
    'booking.email': 'Email',
    'booking.phone': 'Phone',
    'booking.message': 'Message (Optional)',
    'booking.cancel': 'Cancel',
    'booking.confirmed': 'Booking Confirmed!',
    'booking.emailSent': 'Confirmation emails sent to you and the architect',
    'booking.emailDetails': 'Your confirmation email includes:',
    'booking.appointmentDetails': 'Appointment details',
    'booking.cancelLink': 'Link to cancel your appointment if needed',
    'booking.rescheduleOption': 'Option to reschedule for a different time',
    'booking.done': 'Done',
    'booking.consultationInfo': 'Consultation Information',
    'booking.selectDate': 'Select a date from the calendar to view available time slots'
  },
  sv: {
    // Navigation
    'nav.projects': 'Projekt',
    'nav.about': 'Om',
    'nav.services': 'Tjänster',
    'nav.booking': 'Boka Konsultation',
    
    // Hero
    'hero.title': 'Modern Arkitektur för Modernt Liv',
    'hero.subtitle': 'Innovativa designer för bostäder och kommersiella utrymmen som kombinerar form och funktion.',
    'hero.cta.projects': 'Visa Projekt',
    'hero.cta.booking': 'Boka Konsultation',
    'hero.scroll': 'Scrolla för att utforska',
    
    // Projects
    'projects.title': 'Projekt',
    'projects.subtitle': 'Ett urval av arkitektoniska arbeten',
    'projects.filter.all': 'Alla Projekt',
    'projects.filter.professional': 'Professionellt Arbete',
    'projects.filter.personal': 'Personliga Projekt',
    'projects.category.residential': 'Bostad',
    'projects.category.commercial': 'Kommersiell',
    'projects.category.personal': 'Personligt Projekt',
    'projects.viewProject': 'Visa Projekt',
    'projects.location': 'Plats',
    'projects.year': 'År',
    'projects.area': 'Yta',
    'projects.client': 'Kund',
    
    // About
    'about.title': 'Om Arkitekten',
    'about.p1': 'Med över 10 års erfarenhet inom arkitektonisk design, specialiserar jag mig på att skapa utrymmen som balanserar estetisk skönhet med praktisk funktionalitet. Min metod kombinerar moderna minimalistiska principer med hållbara metoder för att skapa byggnader som står tidens test.',
    'about.p2': 'Min portfölj inkluderar ett brett utbud av projekt från bostadshus till kommersiella fastigheter, var och en designad med noggrann uppmärksamhet på kundens behov, miljöpåverkan och innovativ användning av utrymme och material.',
    'about.cta': 'Läs Mer',
    'about.education': 'Utbildning',
    'about.experience': 'Erfarenhet',
    
    // Services
    'services.title': 'Tjänster',
    'services.subtitle': 'Arkitektoniska lösningar för dina behov',
    'services.residential.title': 'Bostadsdesign',
    'services.residential.description': 'Skräddarsydda hemdesigner som återspeglar din livsstil och preferenser, från nybyggnationer till renoveringar och tillbyggnader.',
    'services.commercial.title': 'Kommersiella Projekt',
    'services.commercial.description': 'Funktionella och inspirerande utrymmen för företag, inklusive kontor, butikslokaler och hotellverksamhet.',
    'services.consultation.title': 'Konsultation',
    'services.consultation.description': 'Professionell rådgivning om arkitektoniska möjligheter, genomförbarhetsstudier och designkoncept för ditt projekt.',
    
    // Booking
    'booking.title': 'Boka en Konsultation',
    'booking.subtitle': 'Schemalägg en tid för att diskutera ditt arkitektoniska projekt',
    'booking.calendar.title': 'Välj ett Datum',
    'booking.timeslots.title': 'Tillgängliga Tider',
    'booking.timeslots.empty': 'Vänligen välj ett datum för att se tillgängliga tider',
    'booking.project.label': 'Projekttyp',
    'booking.project.placeholder': 'Beskriv din projekttyp',
    'booking.submit': 'Boka Möte',
    'booking.name': 'Namn',
    'booking.email': 'E-post',
    'booking.phone': 'Telefon',
    'booking.message': 'Meddelande (Valfritt)',
    'booking.cancel': 'Avbryt',
    'booking.confirmed': 'Bokning Bekräftad!',
    'booking.emailSent': 'Bekräftelsemail skickat till dig och arkitekten',
    'booking.emailDetails': 'Ditt bekräftelsemail innehåller:',
    'booking.appointmentDetails': 'Mötesdetaljer',
    'booking.cancelLink': 'Länk för att avboka ditt möte vid behov',
    'booking.rescheduleOption': 'Möjlighet att omboka till en annan tid',
    'booking.done': 'Klar',
    'booking.consultationInfo': 'Konsultationsinformation',
    'booking.selectDate': 'Välj ett datum från kalendern för att se tillgängliga tider'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
