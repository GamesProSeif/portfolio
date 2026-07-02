import siteConfig from "@/site-config.json";
import Image from "next/image";
import Github from "@/public/github.svg";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";

const projects = [
	{
		title: "EduZone",
		image: "/projects/eduzone.png",
		category: "Web App"
	},
	{
		title: "Tutor Samah ESL",
		image: "/projects/tutorsamahesl.png",
		category: "Portfolio"
	},
	{
		title: "Revues Dashboard",
		image: "/projects/revues.png",
		category: "Web-based Analytics Dashboard"
	},
	{
		title: "3Bs Dashboard",
		image: "/projects/3bs.png",
		category: "Web-based Analytics Dashboard"
	}
];

export default function Projects() {
	return (
		<>
			<SectionHeading index="02" kicker="Selected work" title="Projects" id="projects" />
			<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
				{ projects.map((project, i) => (
					<Reveal key={i} delay={(i % 2) * 120}>
						<div className="group/project-item border bg-card transition-all duration-300 hover:border-primary/60 hover:shadow-[0_16px_48px_-16px_hsl(var(--primary)/0.4)]">
							<div className="relative overflow-hidden border-b">
								<div className="relative aspect-video">
									<Image
										src={project.image}
										alt={`Project ${project.title} image`}
										sizes="(min-width: 768px) 50vw, 100vw"
										fill
										className="object-cover transition-transform duration-700 ease-out group-hover/project-item:scale-105"
									/>
								</div>
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/project-item:opacity-100" />
								<span className="absolute left-4 top-4 border bg-background/80 px-2.5 py-1 font-mono text-xs text-primary backdrop-blur">
									0{i + 1}
								</span>
							</div>
							<div className="flex items-center justify-between gap-4 p-6">
								<div>
									<h4 className="font-display text-2xl font-semibold">
										{ project.title }
									</h4>
									<p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
										{ project.category }
									</p>
								</div>
								<ArrowUpRight className="h-6 w-6 shrink-0 text-muted-foreground transition-all duration-300 group-hover/project-item:-translate-y-1 group-hover/project-item:translate-x-1 group-hover/project-item:text-primary" />
							</div>
						</div>
					</Reveal>
				))}
			</div>
			<Reveal delay={100}>
				<Link
					href={siteConfig.github+"?tab=repositories"}
					target="_blank"
					className="group mt-8 flex h-16 w-full items-center justify-center gap-3 border text-lg text-muted-foreground transition-colors hover:border-primary hover:text-primary"
				>
					More projects on Github
					<Github
						fill="currentColor"
						style={{ width: "1.25rem", height: "1.25rem" }}
						className="transition-transform group-hover:scale-110"
					/>
				</Link>
			</Reveal>
		</>
	);
}
