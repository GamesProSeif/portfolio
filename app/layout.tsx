import siteConfig from "@/site-config.json";
import type { Metadata } from "next";
import { Montserrat, Fira_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
});

const firaMono = Fira_Mono({
	variable: "--font-fira-mono",
	subsets: ["latin"],
	weight: ["400"]
});

export const metadata: Metadata = siteConfig.seo;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="scroll-smooth">
			<body
				className={`${montserrat.variable} ${firaMono.variable} antialiased font-[family-name:var(--font-montserrat)] min-h-screen flex flex-col`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main className="flex-1">
						{children}
					</main>
					<Footer />
				</ThemeProvider>
			</body>
			<GoogleAnalytics gaId={siteConfig.googleAnalyticsID} />
		</html>
	);
}
