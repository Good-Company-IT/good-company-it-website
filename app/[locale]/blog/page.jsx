//Functions
import TranslationsProvider from "@/TranslationsProvider";
import initTranslations from "@/i18n";
import dynamic from "next/dynamic";
import Script from "next/script";

// Import Container component
import Main from "@/components/blog/Main";

//Different namespaces
const i18nNameSpaces = ["home", "navbar", "footer", "common"];

const metadata_en = {
  metadataBase: new URL('https://www.goodcompanyit.com'),
  title: "Blog - IT & Cybersecurity Insights | Good Company IT",
  description: "Practical guides, security tips, and expert advice to help startups and growing businesses build a strong IT foundation and stay protected against modern cyber threats.",
  keywords: "IT support, cybersecurity, managed IT services, small business IT, cybersecurity tips, IT consulting, cloud solutions, compliance, data protection",
  language: "en",
  subject: "IT & Cybersecurity Blog",
  coverage: "Global",
  robots: "index, follow",
  author: "Good Company IT",
  publisher: "Good Company IT",
  og: {
    type: "website",
    title: "IT & Cybersecurity Insights | Good Company IT Blog",
    description: "Practical guides, security tips, and expert advice to help startups and growing businesses build a strong IT foundation.",
    site_name: "Good Company IT",
    url: "https://www.goodcompanyit.com/en/blog"
  },
  alternates: {
    canonical: "https://www.goodcompanyit.com/en/blog",
    languages: {
      'en': '/en/blog',
      'es': '/es/blog',
      'fr': '/fr/blog'
    }
  }
};

const metadata_es = {
  metadataBase: new URL('https://www.goodcompanyit.com'),
  title: "Blog - Tecnología y Ciberseguridad | Good Company IT",
  description: "Guías prácticas, consejos de seguridad y asesoramiento experto para ayudar a startups y empresas en crecimiento a construir una base sólida de TI y protegerse contra las amenazas cibernéticas modernas.",
  keywords: "soporte IT, ciberseguridad, servicios IT gestionados, IT para pequeñas empresas, consejos de ciberseguridad, consultoría IT, soluciones en la nube, cumplimiento, protección de datos",
  language: "es",
  subject: "Blog de TI y Ciberseguridad",
  coverage: "Global",
  robots: "index, follow",
  author: "Good Company IT",
  publisher: "Good Company IT",
  og: {
    type: "website",
    title: "Tecnología y Ciberseguridad | Blog de Good Company IT",
    description: "Guías prácticas, consejos de seguridad y asesoramiento experto para startups y empresas en crecimiento.",
    site_name: "Good Company IT",
    url: "https://www.goodcompanyit.com/es/blog"
  },
  alternates: {
    canonical: "https://www.goodcompanyit.com/es/blog",
    languages: {
      'en': '/en/blog',
      'es': '/es/blog',
      'fr': '/fr/blog'
    }
  }
};

const metadata_fr = {
  metadataBase: new URL('https://www.goodcompanyit.com'),
  title: "Blog - IT & Cybersécurité | Good Company IT",
  description: "Guides pratiques, conseils en sécurité et expertise pour aider les startups et entreprises en croissance à bâtir une infrastructure IT solide et se protéger contre les cybermenaces modernes.",
  keywords: "support IT, cybersécurité, services IT gérés, IT pour PME, conseils cybersécurité, conseil IT, solutions cloud, conformité, protection des données",
  language: "fr",
  subject: "Blog IT et Cybersécurité",
  coverage: "Global",
  robots: "index, follow",
  author: "Good Company IT",
  publisher: "Good Company IT",
  og: {
    type: "website",
    title: "IT & Cybersécurité | Blog Good Company IT",
    description: "Guides pratiques, conseils en sécurité et expertise pour startups et entreprises en croissance.",
    site_name: "Good Company IT",
    url: "https://www.goodcompanyit.com/fr/blog"
  },
  alternates: {
    canonical: "https://www.goodcompanyit.com/fr/blog",
    languages: {
      'en': '/en/blog',
      'es': '/es/blog',
      'fr': '/fr/blog'
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
  
  const { resources } = await initTranslations(locale, i18nNameSpaces);

  return (
    <>
      <TranslationsProvider
        resources={resources}
        locale={locale}
        namespaces={i18nNameSpaces}
      >
        <Main 
 
        />
      </TranslationsProvider>
    </>
  );
}