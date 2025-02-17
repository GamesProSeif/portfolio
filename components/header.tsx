"use client";

import siteConfig from "@/site-config.json";
import Github from "@/public/github.svg";
import Linkedin from "@/public/linkedin.svg";
import { Mail, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function Header() {
	const { setTheme } = useTheme();
	const links = [
		{
			href: "/",
			text: "Home"
		},
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
			href: "/#contact",
			text: "Contact",
			hideOnMobile: true
		},
	];

	return (
		<header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
			<div className="mx-auto container flex h-14 items-center px-4 w-full">
				<div className="mr-4 flex">
					<nav className="flex items-center gap-4 text-sm font-medium xl:gap-6">
						{ links.map((link, i) => (
							<Link
								key={i}
								href={link.href}
								className={"transition-colors hover:text-foreground/70 text-foreground/80" + (link.hideOnMobile === true ? " hidden sm:block" : "")}
							>{ link.text }</Link>
						))}
					</nav>
				</div>
				<div className="flex flex-1 items-center justify-end gap-2">
					<Link
						href={siteConfig.github}
						target="_blank"
						className={cn(buttonVariants({ variant: "ghost", size: "icon"}), "h-8 w-8")}
					>
						<Github className="h-4 w-4" />
					</Link>
					<Link
						href={siteConfig.linkedin}
						target="_blank"
						className={cn(buttonVariants({ variant: "ghost", size: "icon"}), "h-8 w-8")}
					>
						<Linkedin className="h-4 w-4" />
					</Link>
					<Link
						href={`mailto:${siteConfig.mail}`}
						target="_blank"
						className={cn(buttonVariants({ variant: "ghost", size: "icon"}), "h-8 w-8")}
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
		</header>
	);
}