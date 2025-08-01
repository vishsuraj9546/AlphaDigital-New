import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // ✅ Validate fields
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    // ✅ Connect to DB
    await connectDB();

    // ✅ Save to DB
    await Contact.create({ name, email, message });

    // ✅ Setup email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Send email notification
    await transporter.sendMail({
      from: `"AlphaDigital Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ API error:', error);

    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
