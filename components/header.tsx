"use client";

import siteConfig from "@/site-config.json";
import Github from "@/public/github.svg";
import Linkedin from "@/public/linkedin.svg";
import { Mail, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Header() {
	const { setTheme } = useTheme();
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const onScroll = () => {
			const doc = document.documentElement;
			const max = doc.scrollHeight - doc.clientHeight;
			setProgress(max > 0 ? doc.scrollTop / max : 0);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const links = [
		{
			href: "/#projects",
			text: "Projects",
			hideOnMobile: true
		},
		{
			href: "/blog",
			text: "Blog"
		},
		{
			href: "/courses",
			text: "Courses"
		},
		{
			href: "/#contact",
			text: "Contact",
			hideOnMobile: true
		},
	];

	const [firstName, ...lastNames] = siteConfig.name.split(" ");

	return (
		<header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
			<div className="mx-auto container flex h-14 items-center px-4 w-full">
				<Link href="/" className="mr-6 font-display text-lg font-bold tracking-tight">
					{firstName}
					<span className="text-primary">.</span>
					<span className="hidden sm:inline">{lastNames.join(" ")}</span>
				</Link>
				<nav className="flex items-center gap-4 xl:gap-6 font-mono text-xs uppercase tracking-[0.15em]">
					{ links.map((link, i) => (
						<Link
							key={i}
							href={link.href}
							className={"transition-colors text-muted-foreground hover:text-primary" + (link.hideOnMobile === true ? " hidden sm:block" : "")}
						>{ link.text }</Link>
					))}
				</nav>
				<div className="flex flex-1 items-center justify-end gap-2">
					<Link
						href={siteConfig.github}
						target="_blank"
						className={cn(buttonVariants({ variant: "ghost", size: "icon"}), "h-8 w-8 hover:text-primary")}
					>
						<Github className="h-4 w-4" />
					</Link>
					<Link
						href={siteConfig.linkedin}
						target="_blank"
						className={cn(buttonVariants({ variant: "ghost", size: "icon"}), "h-8 w-8 hover:text-primary")}
					>
						<Linkedin className="h-4 w-4" />
					</Link>
					<Link
						href={`mailto:${siteConfig.mail}`}
						target="_blank"
						className={cn(buttonVariants({ variant: "ghost", size: "icon"}), "h-8 w-8 hover:text-primary")}
					>
						<Mail className="h-4 w-4" />
					</Link>
					<Button
						size="icon"
						className="hover:bg-accent hover:text-accent-foreground py-2 group/toggle h-8 w-8 px-0"
						variant="ghost"
						onClick={() => setTheme(theme => theme === "light" ? "dark" : "light")}
					>
						<Sun className="h-4 w-4 hidden [html.dark_&]:block" />
						<Moon className="h-4 w-4 hidden [html.light_&]:block" />
					</Button>
				</div>
			</div>
			<div
				className="absolute bottom-0 left-0 h-px bg-primary transition-[width] duration-150 ease-out"
				style={{ width: `${progress * 100}%` }}
				aria-hidden="true"
			/>
		</header>
	);
}
