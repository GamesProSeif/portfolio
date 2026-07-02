import siteConfig from "@/site-config.json";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Fira_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

const displayFont = Bricolage_Grotesque({
	variable: "--font-display",
	subsets: ["latin"],
});

const sansFont = Instrument_Sans({
	variable: "--font-sans",
	subsets: ["latin"],
});

const monoFont = Fira_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
	weight: ["400", "500"]
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
				className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} antialiased font-sans min-h-screen flex flex-col`}
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
