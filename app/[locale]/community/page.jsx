//Functions
import TranslationsProvider from "@/TranslationsProvider";
import initTranslations from "@/i18n";

// Import Container component
import Container from "@/components/community/Container";

//Different namespaces
const i18nNameSpaces = ["home", "navbar", "footer", "common"];


const metadata_en = {
  metadataBase: new URL('https://www.goodcompanyit.com'),
  title: "Good Company I.T. - Digital Solutions & Innovation for Modern Businesses",
  description: "Empower your business with Good Company I.T.. Expert web development, mobile apps, I.T. consulting, and cloud solutions. Reliable, modern digital services tailored to your growth.",
  keywords: "I.T. consulting, web development, mobile applications, cloud solutions, digital strategy, technology services, business transformation, software development, tech innovation",
  language: "en",
  subject: "I.T. & Digital Consulting Services",
  coverage: "Global",
  robots: "index, follow",
  author: "Good Company I.T.",
  publisher: "Good Company I.T.",
  og: {
    type: "website",
    title: "Good Company I.T. - Transform Your Business with Technology",
    description: "Professional I.T. and digital consulting services including web and mobile development, digital strategy, and cloud integration. Build your future with Good Company I.T..",
    site_name: "Good Company I.T.",
    url: "https://www.goodcompanyit.com/en/"
  },
  alternates: {
    canonical: "https://www.goodcompanyit.com/en",
    languages: {
      'en': '/en',
      'es': '/es',
    }
  }
};

const metadata_es = {
  metadataBase: new URL('https://www.goodcompanyit.com'),
  title: "Good Company I.T. - Soluciones Digitales e Innovación para Empresas Modernas",
  description: "Impulsa tu negocio con Good Company I.T.. Desarrollo web y móvil, consultoría en TI y soluciones en la nube. Servicios digitales confiables y modernos enfocados en tu crecimiento.",
  keywords: "consultoría en TI, desarrollo web, aplicaciones móviles, soluciones en la nube, estrategia digital, transformación empresarial, servicios tecnológicos, desarrollo de software, innovación tecnológica",
  language: "es",
  subject: "Servicios de Consultoría Digital y Tecnológica",
  coverage: "Global",
  robots: "index, follow",
  author: "Good Company I.T.",
  publisher: "Good Company I.T.",
  og: {
    type: "website",
    title: "Good Company I.T. - Transforma tu Negocio con Tecnología",
    description: "Servicios profesionales de consultoría digital y TI: desarrollo web y móvil, estrategia digital e integración en la nube. Construye tu futuro con Good Company I.T..",
    site_name: "Good Company I.T.",
    url: "https://www.goodcompanyit.com/es/"
  },
  alternates: {
    canonical: "https://www.goodcompanyit.com/es",
    languages: {
      'en': '/en',
      'es': '/es'
    }
  }
};


export async function generateMetadata({ params }) {
  // Await params before destructuring
  const { locale } = await params;
  
  let returnedMetadata = ''
  if (locale === "en") {
    returnedMetadata = metadata_en
  }
  if (locale === "es") {
    returnedMetadata = metadata_es
  }
  if (locale === "fr") {
    returnedMetadata = metadata_fr
  }
  return returnedMetadata
}

export default async function Home({ params }) {
  // Await params before destructuring
  const { locale } = await params;
  
  const { t, resources } = await initTranslations(locale, i18nNameSpaces);

  // When you have us-UK or es-MX, you want to use the main language for translations
  const mainLang = locale.split('-')[0];

  return (
    <>
      <TranslationsProvider
        resources={resources}
        locale={locale}
        namespaces={i18nNameSpaces}
      >
        <Container 
        />
      </TranslationsProvider>
    </>
  );
}