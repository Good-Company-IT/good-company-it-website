import fs from 'fs';
import path from 'path';
import LegalDocument from '@/components/legal/LegalDocument';

// English Terms of Service. The Spanish version lives at /es/terminos; for users who accept in Spanish,
// the Spanish version applies (see section 13 of both documents).
export const metadata = {
  metadataBase: new URL('https://www.goodcompanyit.com'),
  title: 'Terms of Service | Good Company I.T.',
  description:
    'Terms of Service for goodcompanyit.com and the free assessments and tools offered by Good Company I.T. Consulting LLC.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.goodcompanyit.com/en/terms',
    languages: { en: '/en/terms', es: '/es/terminos' },
  },
};

export default function TermsPage() {
  const markdown = fs.readFileSync(
    path.join(process.cwd(), 'content', 'legal', 'terms-of-service.en.md'),
    'utf8'
  );
  return <LegalDocument markdown={markdown} />;
}
