
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import EmailTemplate from '@/components/email/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY || 're_FNECWVnj_6vZVGPDhDub5dhB4X9hNhng4');

export async function POST(req: Request) {
  try {
    const { name, email, date, time, projectType, message } = await req.json();

    // Generate a Google Meet link
    const meetLink = `https://meet.google.com/lookup/${Math.random().toString(36).substring(2, 10)}?anonymous=true`;
    
    // Architect's phone number
    const architectPhone = '+46704800934';

    // Send email to architect
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'karin.gunnerek@gmail.com',
      subject: 'New Booking Received',
      html: `
        <h2>New Booking</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
        <p><strong>Meeting Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
      `,
    });

    // Send confirmation email to client using the EmailTemplate
    const emailHtml = EmailTemplate({
      clientName: name,
      appointmentDate: date,
      appointmentTime: time,
      projectType: projectType || 'Consultation',
      meetLink: meetLink,
      architectPhone: architectPhone,
      language: 'en'
    });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Booking Confirmation: Consultation with Karin Gunnerek Architecture',
      html: emailHtml,
    });

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ status: 'error', error });
  }
}
