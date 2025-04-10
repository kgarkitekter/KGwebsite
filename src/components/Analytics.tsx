'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // Replace with actual GA4 measurement ID

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && window.gtag) {
      // Track page views
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
      })
    }
  }, [pathname, searchParams])

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
            
            // Custom event tracking
            document.addEventListener('DOMContentLoaded', function() {
              // Track navigation clicks
              document.querySelectorAll('nav a').forEach(link => {
                link.addEventListener('click', function() {
                  gtag('event', 'navigation_click', {
                    'link_text': this.innerText,
                    'link_url': this.href
                  });
                });
              });
              
              // Track booking form submissions
              const bookingForm = document.querySelector('form');
              if (bookingForm) {
                bookingForm.addEventListener('submit', function() {
                  gtag('event', 'booking_submission', {
                    'form_id': 'consultation_booking'
                  });
                });
              }
              
              // Track language toggle
              const languageToggle = document.querySelector('[aria-label="Toggle language"]');
              if (languageToggle) {
                languageToggle.addEventListener('click', function() {
                  gtag('event', 'language_toggle', {
                    'current_language': document.documentElement.lang
                  });
                });
              }
              
              // Track project clicks
              document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('click', function() {
                  const projectTitle = this.querySelector('h3')?.innerText || 'Unknown Project';
                  gtag('event', 'project_click', {
                    'project_title': projectTitle
                  });
                });
              });
            });
          `,
        }}
      />
      
      {/* Hotjar Tracking Code for heatmaps */}
      <Script
        id="hotjar-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3579383,hjsv:6}; // Replace with actual Hotjar ID
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />
    </>
  )
}
