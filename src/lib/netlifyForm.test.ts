import { describe, expect, it, vi } from 'vitest';
import { encode, submitContact } from './netlifyForm';

describe('netlifyForm', () => {
  it('encode joins uri-encoded pairs', () => {
    expect(encode({ 'form-name': 'contact', name: 'Ray Xue' })).toBe(
      'form-name=contact&name=Ray%20Xue',
    );
  });

  it('submitContact returns success when fetch ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));

    await expect(
      submitContact({ name: 'Ray', email: 'ray@example.com', message: 'Hi' }),
    ).resolves.toBe('success');
  });

  it('submitContact returns error when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    await expect(
      submitContact({ name: 'Ray', email: 'ray@example.com', message: 'Hi' }),
    ).resolves.toBe('error');
  });
});
