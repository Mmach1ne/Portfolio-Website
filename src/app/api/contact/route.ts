import { NextResponse } from 'next/server';
import { encode } from '@/lib/netlifyForm';

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';

  let body: string;
  if (contentType.includes('application/x-www-form-urlencoded')) {
    body = await request.text();
  } else {
    const formData = await request.formData();
    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      fields[key] = String(value);
    }
    body = encode(fields);
  }

  const origin = new URL(request.url).origin;
  const response = await fetch(`${origin}/__forms.html`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  return new NextResponse(null, { status: response.ok ? 200 : 502 });
}
