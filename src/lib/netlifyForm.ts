export function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] ?? '')}`)
    .join('&');
}

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export async function submitContact(fields: ContactFields): Promise<'success' | 'error'> {
  try {
    const response = await fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        ...fields,
      }),
    });

    return response.ok ? 'success' : 'error';
  } catch {
    return 'error';
  }
}
