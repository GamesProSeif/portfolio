import siteConfig from "@/site-config.json";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import TechList from "./tech-list";
import Services from "./services";
import Projects from "./projects";
import Contact from "./contact";
import HeroCanvas from "@/components/hero-canvas";

function HeroTitle({ title }: { title: string }) {
	const [first, ...rest] = title.split(" ");
	return (
		<h1 className="font-display font-bold tracking-tight text-balance leading-[0.95] text-5xl sm:text-7xl lg:text-8xl">
			<span className="text-primary">{first}</span>
			<br />
			{rest.join(" ")}
		</h1>
	);
}

export default function Home() {
	return (
		<>
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 -z-20 bg-grid mask-fade-b opacity-40" aria-hidden="true" />
				<HeroCanvas className="absolute inset-0 -z-10 h-full w-full mask-fade-b" />

				<div className="container mx-auto max-w-5xl px-4">
					<div className="flex min-h-[calc(100svh-3.5rem)] flex-col justify-center py-24">
						<p className="hero-rise font-mono text-sm md:text-base uppercase tracking-[0.35em] text-primary mb-6">
							Hi, I&apos;m {siteConfig.name}
						</p>
						<div className="hero-rise space-y-2" style={{ animationDelay: "0.12s" }}>
							{siteConfig.jobTitles.map((jobTitle, i) => (
								<HeroTitle key={i} title={jobTitle} />
							))}
						</div>
						<p
							className="hero-rise mt-8 max-w-2xl text-lg md:text-2xl text-muted-foreground text-pretty"
							style={{ animationDelay: "0.24s" }}
						>
							{siteConfig.moto}
						</p>
						<div
							className="hero-rise mt-10 flex flex-wrap items-center gap-4"
							style={{ animationDelay: "0.36s" }}
						>
							<Link
								href="/#projects"
								className="group inline-flex h-14 items-center gap-2 bg-primary px-8 text-lg font-medium text-primary-foreground transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.45)]"
							>
								View my work
								<ArrowDownRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
							</Link>
							<Link
								href="/#contact"
								className="group inline-flex h-14 items-center gap-2 border border-input bg-background/60 px-8 text-lg font-medium backdrop-blur transition-colors hover:border-primary hover:text-primary"
							>
								Get in touch
								<ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Link>
						</div>
						<p
							className="hero-rise mt-12 font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground"
							style={{ animationDelay: "0.48s" }}
						>
							[ {siteConfig.location} ]
						</p>
					</div>
				</div>

				<div
					className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
					aria-hidden="true"
				>
					<span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
						Scroll
					</span>
					<span className="block h-10 w-px bg-primary animate-scroll-cue" />
				</div>
			</section>

			<section className="border-y bg-card/40">
				<TechList />
			</section>

			<section className="container mx-auto max-w-5xl px-4 py-24 md:py-32">
				<Services />
			</section>

			<section className="border-t">
				<div className="container mx-auto max-w-5xl px-4 py-24 md:py-32">
					<Projects />
				</div>
			</section>

			<section className="border-t">
				<div className="container mx-auto max-w-5xl px-4 py-24 md:py-32">
					<Contact />
				</div>
			</section>
		</>
	);
}
