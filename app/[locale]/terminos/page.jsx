import fs from 'fs';
import path from 'path';
import LegalDocument from '@/components/legal/LegalDocument';

// Spanish version of the Terms of Service. For users who accept the Terms in Spanish, this version applies.
export const metadata = {
  metadataBase: new URL('https://www.goodcompanyit.com'),
  title: 'Términos y Condiciones | Good Company I.T.',
  description:
    'Términos y Condiciones de goodcompanyit.com y de las evaluaciones y herramientas gratuitas de Good Company I.T. Consulting LLC.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.goodcompanyit.com/es/terminos',
    languages: { en: '/en/terms', es: '/es/terminos' },
  },
};

export default function TerminosPage() {
  const markdown = fs.readFileSync(
    path.join(process.cwd(), 'content', 'legal', 'terms-and-conditions.es.md'),
    'utf8'
  );
  return <LegalDocument markdown={markdown} />;
}
