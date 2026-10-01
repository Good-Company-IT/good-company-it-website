import fs from 'fs';
import path from 'path';
import LegalDocument from '@/components/legal/LegalDocument';

// Spanish-only document required by Colombian data-protection law (Ley 1581 de 2012).
export const metadata = {
  metadataBase: new URL('https://www.goodcompanyit.com'),
  title: 'Política de Tratamiento de Datos Personales | Good Company I.T.',
  description:
    'Política de Tratamiento de Datos Personales de Good Company I.T. Consulting LLC: finalidades, derechos de los titulares y cómo presentar consultas y reclamos.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.goodcompanyit.com/es/politica-de-tratamiento-de-datos',
  },
};

export default function DataProcessingPolicyPage() {
  const markdown = fs.readFileSync(
    path.join(process.cwd(), 'content', 'legal', 'data-processing-policy.es.md'),
    'utf8'
  );
  return <LegalDocument markdown={markdown} />;
}
