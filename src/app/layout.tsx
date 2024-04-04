import { Logo } from "@/assets/Logo";
import { WhatsApp } from "@/assets/whatsapp";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { Toast } from "./toast";

export const metadata: Metadata = {
	title: "Lions Brazil - Comunicação",
	description: "...",
};

export const GTM_ID = process.env.NEXT_PUBLIC_GTM;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="pt-BR">
			<head>
        <link rel="stylesheet" href="https://use.typekit.net/ypi1mck.css"/>
				<Script
					id="gtm-script"
					strategy="afterInteractive"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
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
			<body className="tk-roc-grotesk-variable overflow-x-hidden">
				<header className="md:p-8 p-4 absolute z-50 top-0 w-full">
					<div className="flex items-center justify-between max-w-screen-xl space-x-8 w-full mx-auto">
						<Link href="/">
							<Logo className="max-w-xs w-full h-auto max-md:max-w-60" />
						</Link>
						<Dialog>
							<nav className="lg:space-x-8 w-full whitespace-nowrap font-bold flex lg:justify-center justify-between items-center max-lg:sr-only">
								<Link href="/#home">Home</Link>
								<Link href="/#about">Quem Somos</Link>
								<Link href="/#clients">Clientes Atendidos</Link>
								<Link href="/#cases">Cases de Sucesso</Link>
								<Link href="/#contact">Entre em Contato</Link>
							</nav>
							<DialogTrigger aria-hidden className="block lg:hidden p-4">
								<Menu className="w-6 h-6" />
							</DialogTrigger>

							<DialogContent
								aria-hidden
								className="lg:hidden !w-screen !h-fit flex flex-col items-center"
							>
								<DialogTrigger asChild>
									<Link href="/#home" className="dialog-link">
										Home
									</Link>
								</DialogTrigger>
								<DialogTrigger asChild>
									<Link href="/#about" className="dialog-link">
										Quem Somos
									</Link>
								</DialogTrigger>
								<DialogTrigger asChild>
									<Link href="/#clients" className="dialog-link">
										Clientes Atendidos
									</Link>
								</DialogTrigger>
								<DialogTrigger asChild>
									<Link href="/#cases" className="dialog-link">
										Cases de Sucesso
									</Link>
								</DialogTrigger>
								<DialogTrigger asChild>
									<Link href="/#contact" className="dialog-link">
										Entre em Contato
									</Link>
								</DialogTrigger>
							</DialogContent>
						</Dialog>
					</div>
				</header>
				<div className="fixed bottom-8 right-8 flex z-[100] rounded-full bg-green-600 hover:scale-105 transition-all">
					<a
						href={`https://wa.me/...?text=${encodeURIComponent(
							"Olá vim do site!",
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
