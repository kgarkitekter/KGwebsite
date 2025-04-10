
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_FNECWVnj_6vZVGPDhDub5dhB4X9hNhng4');

export async function POST(req: Request) {
  try {
    const { name, email, date, time, message } = await req.json();

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'architect@example.com',
      subject: 'New Booking Received',
      html: `
        <h2>New Booking</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `,
    });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Booking Confirmation',
      html: `
        <h2>Booking Confirmed</h2>
        <p>Thank you, ${name}! Your consultation is booked for ${date} at ${time}.</p>
      `,
    });

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ status: 'error', error });
  }
}
