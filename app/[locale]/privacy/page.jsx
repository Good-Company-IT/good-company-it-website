import fs from 'fs';
import path from 'path';
import LegalDocument from '@/components/legal/LegalDocument';

// The Privacy & Cookie Policy exists in English (/en/privacy) and Spanish (/es/privacy).
// Keep both versions aligned: any change to one must be applied to the other (see docs/compliance.md).
const VERSIONS = {
  en: {
    file: 'privacy-policy.en.md',
    title: 'Privacy & Cookie Policy | Good Company I.T.',
    description:
      'How Good Company I.T. Consulting LLC collects and uses personal information and cookies on goodcompanyit.com, and the choices you have.',
  },
  es: {
    file: 'privacy-policy.es.md',
    title: 'Política de Privacidad y Cookies | Good Company I.T.',
    description:
      'Cómo Good Company I.T. Consulting LLC recoge y usa información personal y cookies en goodcompanyit.com, y las opciones que usted tiene.',
  },
};

const versionFor = (locale) => VERSIONS[locale === 'es' ? 'es' : 'en'];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const version = versionFor(locale);
  return {
    metadataBase: new URL('https://www.goodcompanyit.com'),
    title: version.title,
    description: version.description,
    robots: 'index, follow',
    alternates: {
      canonical: `https://www.goodcompanyit.com/${locale === 'es' ? 'es' : 'en'}/privacy`,
      languages: { en: '/en/privacy', es: '/es/privacy' },
    },
  };
}

export default async function PrivacyPage({ params }) {
  const { locale } = await params;
  const markdown = fs.readFileSync(
    path.join(process.cwd(), 'content', 'legal', versionFor(locale).file),
    'utf8'
  );
  return <LegalDocument markdown={markdown} />;
}
