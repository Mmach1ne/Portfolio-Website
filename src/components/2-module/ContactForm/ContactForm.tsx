import { useState } from 'react';
import { Button, Stack, Text } from '@/components/0-primitive';
import { FormField, SectionHeading } from '@/components/1-composition';
import { site } from '@/content';
import { submitContact } from '@/lib/netlifyForm';
import { tokens } from '@/theme';

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    const result = await submitContact(formData);
    setSubmitStatus(result);

    if (result === 'success') {
      setFormData({ name: '', email: '', message: '' });
    }

    setSubmitting(false);
    window.setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto' }}>
      <SectionHeading title={site.contact.heading} underline />
      <Text variant="body" sx={{ textAlign: 'center' }}>
        {site.contact.description}
      </Text>

      <form name="contact" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <input
          type="text"
          name="bot-field"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        <Stack spacing={2}>
          <FormField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={submitting}
          />
          <FormField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={submitting}
          />
          <FormField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            required
            disabled={submitting}
          />
          <Button type="submit" variant="secondary" loading={submitting} loadingText="SENDING...">
            SUBMIT
          </Button>
        </Stack>
      </form>

      {submitStatus === 'success' ? (
        <Text variant="body" sx={{ color: tokens.palette.accent, textAlign: 'center' }}>
          Thanks! Your message has been sent successfully.
        </Text>
      ) : null}
      {submitStatus === 'error' ? (
        <Text variant="body" sx={{ color: tokens.palette.error, textAlign: 'center' }}>
          Oops! There was a problem sending your message. Please try again.
        </Text>
      ) : null}
    </Stack>
  );
}
