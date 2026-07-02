import { cn } from "@/lib/utils";
import siteConfig from "@/site-config.json";
import Github from "@/public/github.svg";
import Linkedin from "@/public/linkedin.svg";
import { ArrowUp, Mail } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const currentYear = (new Date()).getFullYear();

export default function Footer() {
	return (
		<footer className="relative overflow-hidden border-t mt-4">
			<div className="container mx-auto max-w-5xl px-4 pt-12">
				<div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
					<div className="flex items-center gap-2 text-muted-foreground">
						<Link
							href={siteConfig.github}
							target="_blank"
							className={cn(buttonVariants({ variant: "ghost", size: "icon"}), "h-12 w-12 border hover:border-primary hover:text-primary")}
						>
							<Github style={{ width: "1.25rem", height: "1.25rem" }} />
						</Link>
						<Link
							href={siteConfig.linkedin}
							target="_blank"
							className={cn(buttonVariants({ variant: "ghost", size: "icon"}), "h-12 w-12 border hover:border-primary hover:text-primary")}
						>
							<Linkedin style={{ width: "1.25rem", height: "1.25rem" }} />
						</Link>
						<Link
							href={`mailto:${siteConfig.mail}`}
							target="_blank"
							className={cn(buttonVariants({ variant: "ghost", size: "icon"}), "h-12 w-12 border hover:border-primary hover:text-primary")}
						>
							<Mail style={{ width: "1.25rem", height: "1.25rem" }} />
						</Link>
					</div>
					<Link
						href="#"
						className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
					>
						Back to top
						<ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
					</Link>
				</div>
				<p className="mt-8 font-mono text-xs text-muted-foreground">
					&copy; { currentYear } { siteConfig.name } &mdash; All rights reserved.
				</p>
			</div>
			<div className="pointer-events-none select-none" aria-hidden="true">
				<p className="whitespace-nowrap text-center font-display text-[12.5vw] font-bold leading-none tracking-tight text-foreground/[0.04] -mb-[3vw]">
					{ siteConfig.name.toUpperCase() }
				</p>
			</div>
		</footer>
	);
}
