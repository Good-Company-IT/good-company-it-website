// app/layout.js
import dynamic from 'next/dynamic';
import Script from 'next/script';
import TranslationsProvider from "@/TranslationsProvider";
import initTranslations from "@/i18n";
import { Analytics } from "@vercel/analytics/react";
import { consentScript } from "@/utils/cookies/consentScript";
import "@/globals.css";

// Font from Google
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

// Components - Remove ssr: false and use regular imports or SSR-compatible dynamic imports
const NavbarLazyLoading = dynamic(
  () => import("@/components/common/Navbar/Main"),
  {
    loading: () => <div className="h-16 animate-pulse bg-gray-100" aria-label="Loading navigation" />,
  }
);

const FooterLazyLoading = dynamic(
  () => import("@/components/common/Footer/Main"),
  {
    loading: () => <div className="h-40 bg-white animate-pulse" aria-label="Loading footer" />,
  }
);

// For client-only components, create a wrapper
const ClientOnlyWrapper = dynamic(
  () => import('@/components/common/ClientOnlyWrapper/ClientOnlyWrapper')
);

const i18nNameSpaces = ["home", "navbar", "common", "footer"];

export default async function Layout({ children, params }) {
  // Await params before destructuring
  const { locale } = await params;

  const { t, resources } = await initTranslations(locale, i18nNameSpaces);

  const footerTranslations = {
    products: t('navbar:products'),
    resources: t('navbar:resources'),
    company: t('navbar:company'),
    about: t('navbar:about'),
    contact: t('navbar:contact'),
    disclaimer: t('footer:disclaimer'),
    termsLink: t('footer:termsLink'),
    privacyLink: t('footer:privacyLink'),
  };

  const cookieTranslations = {
    title: t('common:cookie_title'),
    description: t('common:cookie_desc'),
    agree: t('common:cookie_agree'),
    decline: t('common:cookie_decline')
  }

  return (
    <html lang={locale} suppressHydrationWarning className='scroll-smooth'>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={poppins.className}>
        {/* Cookie consent: sets Consent Mode to "denied" and loads Google tags only after the visitor accepts.
            Runs before anything else. Do NOT add trackers elsewhere; see docs/compliance.md. */}
        <Script id="consent-mode" strategy="beforeInteractive">
          {consentScript}
        </Script>
        <TranslationsProvider
          resources={resources}
          locale={locale}
          namespaces={i18nNameSpaces}
        >
          {/* Navbar */}
          <NavbarLazyLoading locale={locale} />
          <main className="w-full overflow-x-hidden">
            {children}
          </main>

          {/* Client-only components wrapper */}
          <ClientOnlyWrapper cookieTranslations={cookieTranslations} />

          {/* Footer */}
          <FooterLazyLoading locale={locale} translations={footerTranslations} />

          {/* Vercel Analytics */}
          <Analytics />

        </TranslationsProvider>
      </body>
    </html>
  );
}