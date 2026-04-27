import { NextResponse } from 'next/server';
import { z } from 'zod';

function getWeb3FormsAccessKey() {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error('WEB3FORMS_ACCESS_KEY is not configured.');
  }

  return accessKey;
}

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  honeypot: z.string().optional(),
  hCaptchaToken: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const accessKey = getWeb3FormsAccessKey();
    const body = await req.json();

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ message: 'Nice try, bot.' }, { status: 400 });
    }

    const validatedData = contactSchema.parse(body);

    const formData = new FormData();
    formData.append('access_key', accessKey);
    formData.append('name', validatedData.name);
    formData.append('email', validatedData.email);
    formData.append('message', validatedData.message);
    formData.append('subject', `New Message from ${validatedData.name}`);

    if (validatedData.hCaptchaToken) {
      formData.append('h-captcha-response', validatedData.hCaptchaToken);
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data: { success?: boolean; message?: string } = await response.json();

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { error: data.message || 'Failed to submit form.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: 'Form submitted successfully.' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to submit contact form.' }, { status: 500 });
  }
}
