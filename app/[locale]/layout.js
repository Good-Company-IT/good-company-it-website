// app/layout.js
import dynamic from 'next/dynamic';
import Script from 'next/script';
import TranslationsProvider from "@/TranslationsProvider";
import initTranslations from "@/i18n";
import { Analytics } from "@vercel/analytics/react";
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={poppins.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5PDB3BJW"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5PDB3BJW');`}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E7RL326PKG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E7RL326PKG');
          `}
        </Script>
      </body>
    </html>
  );
}