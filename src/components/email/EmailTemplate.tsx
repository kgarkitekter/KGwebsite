import React from 'react';

interface EmailTemplateProps {
  clientName: string;
  appointmentDate: string;
  appointmentTime: string;
  projectType: string;
  meetLink: string;
  architectPhone: string;
  language: 'en' | 'sv';
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  clientName,
  appointmentDate,
  appointmentTime,
  projectType,
  meetLink,
  architectPhone,
  language
}) => {
  const translations = {
    en: {
      subject: 'Your Consultation with Karin Gunnerek Architecture',
      greeting: 'Hello',
      confirmationText: 'Your consultation has been confirmed for:',
      date: 'Date',
      time: 'Time',
      project: 'Project Type',
      meetingDetails: 'Meeting Details',
      joinMeeting: 'Join Video Meeting',
      noSignIn: '(No sign-in required)',
      phoneBackup: 'If video doesn\'t work, call',
      questions: 'If you have any questions before the meeting, please reply to this email.',
      lookingForward: 'Looking forward to discussing your project!',
      regards: 'Best regards,',
      architectName: 'Karin Gunnerek',
      architectTitle: 'Architect',
      cancelReschedule: 'Need to cancel or reschedule?',
      cancelLink: 'Cancel appointment',
      rescheduleLink: 'Reschedule appointment'
    },
    sv: {
      subject: 'Din konsultation med Karin Gunnerek Arkitektur',
      greeting: 'Hej',
      confirmationText: 'Din konsultation har bekräftats för:',
      date: 'Datum',
      time: 'Tid',
      project: 'Projekttyp',
      meetingDetails: 'Mötesdetaljer',
      joinMeeting: 'Delta i videomöte',
      noSignIn: '(Ingen inloggning krävs)',
      phoneBackup: 'Om video inte fungerar, ring',
      questions: 'Om du har några frågor före mötet, vänligen svara på detta mail.',
      lookingForward: 'Ser fram emot att diskutera ditt projekt!',
      regards: 'Med vänliga hälsningar,',
      architectName: 'Karin Gunnerek',
      architectTitle: 'Arkitekt',
      cancelReschedule: 'Behöver du avboka eller omboka?',
      cancelLink: 'Avboka tid',
      rescheduleLink: 'Omboka tid'
    }
  };

  const t = translations[language];

  return `
    <!DOCTYPE html>
    <html lang="${language}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${t.subject}</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }
        .email-header {
          background-color: #1E293B;
          color: white;
          padding: 24px;
          text-align: center;
        }
        .email-header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 500;
        }
        .email-body {
          padding: 32px 24px;
        }
        .greeting {
          font-size: 20px;
          margin-bottom: 16px;
        }
        .appointment-details {
          background-color: #f5f7fa;
          border-radius: 6px;
          padding: 20px;
          margin: 24px 0;
        }
        .detail-row {
          display: flex;
          margin-bottom: 12px;
        }
        .detail-label {
          font-weight: 600;
          width: 120px;
          color: #555;
        }
        .detail-value {
          flex: 1;
        }
        .meeting-section {
          margin: 32px 0;
          padding: 20px;
          background-color: #f0f7ff;
          border-radius: 6px;
          border-left: 4px solid #3b82f6;
        }
        .meeting-section h3 {
          margin-top: 0;
          color: #2563eb;
        }
        .btn {
          display: inline-block;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: 500;
          margin: 8px 0;
        }
        .phone-backup {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
          color: #555;
        }
        .phone-number {
          font-weight: 600;
          color: #333;
        }
        .email-footer {
          padding: 24px;
          background-color: #f5f7fa;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
        .footer-links {
          margin-top: 16px;
        }
        .footer-link {
          color: #2563eb;
          text-decoration: none;
          margin: 0 8px;
        }
        .signature {
          margin: 32px 0;
        }
        .signature-name {
          font-weight: 600;
          margin-bottom: 4px;
        }
        .signature-title {
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Karin Gunnerek Architecture</h1>
        </div>
        <div class="email-body">
          <div class="greeting">${t.greeting} ${clientName},</div>
          
          <p>${t.confirmationText}</p>
          
          <div class="appointment-details">
            <div class="detail-row">
              <div class="detail-label">${t.date}:</div>
              <div class="detail-value">${appointmentDate}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">${t.time}:</div>
              <div class="detail-value">${appointmentTime}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">${t.project}:</div>
              <div class="detail-value">${projectType}</div>
            </div>
          </div>
          
          <div class="meeting-section">
            <h3>${t.meetingDetails}</h3>
            <a href="${meetLink}" class="btn">${t.joinMeeting}</a>
            <div style="font-size: 14px; margin-top: 4px;">${t.noSignIn}</div>
            
            <div class="phone-backup">
              ${t.phoneBackup}: <span class="phone-number">${architectPhone}</span>
            </div>
          </div>
          
          <p>${t.questions}</p>
          <p>${t.lookingForward}</p>
          
          <div class="signature">
            <div>${t.regards}</div>
            <div class="signature-name">${t.architectName}</div>
            <div class="signature-title">${t.architectTitle}</div>
          </div>
        </div>
        
        <div class="email-footer">
          <div>${t.cancelReschedule}</div>
          <div class="footer-links">
            <a href="#" class="footer-link">${t.cancelLink}</a> | 
            <a href="#" class="footer-link">${t.rescheduleLink}</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default EmailTemplate;
