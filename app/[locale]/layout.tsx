import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import ScrollRefresh from "@/components/landing/ScrollRefresh";
import { dirOf, getMessages, isLocale, locales } from "@/messages";
import "../globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Only needed on /ar, so skip the preload on every route. 500 is left out to save two font files;
// medium text falls back to 400.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  preload: false,
});

// The ENGENOVA wordmark is set in Montserrat Bold.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: "700",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale).ui;

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${archivo.variable} ${plexMono.variable} ${plexArabic.variable} ${montserrat.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-navy focus:px-4 focus:py-3 focus:text-white"
        >
          {t.skip}
        </a>
        {children}
        <ScrollRefresh locale={locale} />
      </body>
    </html>
  );
}
