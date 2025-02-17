import { cn } from "@/lib/utils";
import siteConfig from "@/site-config.json";
import Github from "@/public/github.svg";
import Linkedin from "@/public/linkedin.svg";
import { Mail } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const currentYear = (new Date()).getFullYear();

export default function Footer() {
	return (
		<footer className="min-h-14 border-t mt-4 py-4">
			<div className="flex items-center justify-center gap-2 text-muted-foreground">
				<Link
					href={siteConfig.github}
					target="_blank"
					className={cn(buttonVariants({ variant: "ghost", size: "icon"}), "h-16 w-16")}
				>
					<Github style={{ width: "1.5rem", height: "1.5rem" }} />
				</Link>
				<Link
					href={siteConfig.linkedin}
					target="_blank"
					className={cn(buttonVariants({ variant: "ghost", size: "icon"}), "h-16 w-16")}
				>
					<Linkedin style={{ width: "1.5rem", height: "1.5rem" }} />
				</Link>
				<Link
					href={`mailto:${siteConfig.mail}`}
					target="_blank"
					className={cn(buttonVariants({ variant: "ghost", size: "icon"}), "h-16 w-16")}
				>
					<Mail style={{ width: "1.5rem", height: "1.5rem" }} />
				</Link>
			</div>
			<div className="flex justify-center items-center mt-4">
				<p className="text-muted-foreground text-sm">Copyright &copy; { currentYear } { siteConfig.name }. All rights reserved.</p>
			</div>
		</footer>
	)
}