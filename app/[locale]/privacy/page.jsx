import fs from 'fs';
import path from 'path';
import LegalDocument from '@/components/legal/LegalDocument';

// The policy is published in English only; /es/privacy shows the same text and points to /en/privacy.
export const metadata = {
  metadataBase: new URL('https://www.goodcompanyit.com'),
  title: 'Privacy & Cookie Policy | Good Company I.T.',
  description:
    'How Good Company I.T. Consulting LLC collects and uses personal information and cookies on goodcompanyit.com, and the choices you have.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.goodcompanyit.com/en/privacy',
  },
};

export default function PrivacyPage() {
  const markdown = fs.readFileSync(
    path.join(process.cwd(), 'content', 'legal', 'privacy-policy.en.md'),
    'utf8'
  );
  return <LegalDocument markdown={markdown} />;
}
