import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap'
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Karin Gunnerek Architecture | Modern arkitektur i Skövde, Sverige',
  description: 'Professionell arkitektbyrå i Skövde som specialiserar sig på moderna bostäder, kommersiella byggnader och hållbar design. Boka konsultation idag.',
  keywords: 'arkitekt, Skövde, arkitektbyrå, bostadsdesign, husdesign, kommersiell arkitektur, hållbar design, modern arkitektur, byggnadsprojekt, Karin Gunnerek, Sverige',
  authors: [{ name: 'Karin Gunnerek' }],
  creator: 'Karin Gunnerek Architecture',
  publisher: 'Karin Gunnerek Architecture',
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    alternateLocale: 'en_US',
    title: 'Karin Gunnerek Architecture | Modern arkitektur i Skövde',
    description: 'Professionell arkitektbyrå i Skövde som specialiserar sig på moderna bostäder, kommersiella byggnader och hållbar design.',
    siteName: 'Karin Gunnerek Architecture',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karin Gunnerek Architecture | Modern arkitektur i Skövde',
    description: 'Professionell arkitektbyrå i Skövde som specialiserar sig på moderna bostäder, kommersiella byggnader och hållbar design.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      'en': '/en',
      'sv': '/sv',
    },
  },
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/icons/kg-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/icons/kg-logo.svg" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
