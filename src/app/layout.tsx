import { WhatsApp } from "assets/whatsapp";
import { Dialog, DialogContent, DialogTrigger } from "components/ui/dialog";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { Toast } from "./toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lions Brazil - Comunicações",
  description: "...",
};

export const GTM_ID = process.env.NEXT_PUBLIC_GTM;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${GTM_ID}');
            `,
          }}
        />
      </head>
      <body className={`${inter.className}`}>
        <header className="md:p-8 p-4">
          <Dialog>
            <nav className="md:space-x-8 w-full flex md:justify-center justify-between items-center max-md:sr-only">
              <Link href="/#">...</Link>
            </nav>

            <DialogContent
              aria-hidden
              className="md:hidden !w-screen !h-fit flex flex-col items-center"
            >
              <DialogTrigger asChild>
                <Link href="#" className="dialog-link">
                  ...
                </Link>
              </DialogTrigger>
            </DialogContent>
          </Dialog>
        </header>
        <div className="fixed bottom-8 right-8 flex z-[100] rounded-full bg-green-600 hover:scale-105 transition-all">
          <a
            href={`https://wa.me/...?text=${encodeURIComponent(
              "Olá vim do site!"
            )}`}
            className="p-4 w-fit"
            aria-label="WhatsApp"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsApp className="w-8 h-8 text-white" />
          </a>
        </div>
        {children}
        <footer>
          <section className="items-center max-w-7xl px-4 mx-auto justify-center w-full">
            <p className="text-sm py-2 text-center">
              <span className="text-primary-300">Copyright © </span>
              <span className="text-orange-600">Lions 2024</span>
              <span className="text-primary-300"> | Distribuído por </span>
              <Link
                href="https://www.devstyle.com.br"
                className="text-orange-600"
              >
                DevStyle
              </Link>
            </p>
          </section>
        </footer>
        <Toast />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            title=" "
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      </body>
    </html>
  );
};

export default RootLayout;
