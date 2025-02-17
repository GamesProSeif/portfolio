import siteConfig from "@/site-config.json";
import Image from "next/image";
import Github from "@/public/github.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
			<p className="text-primary text-base md:text-lg mb-2">My work</p>
			<h3 id="projects" className="text-4xl md:text-5xl font-medium mb-8">
				Projects
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
				{ projects.map((project, i) => (
					<div key={i} className="group/project-item">
						<div className="p-8 rounded-md bg-primary">
							<div className="relative w-full aspect-video">
								<Image
									src={project.image}
									alt={`Project ${project.title}
									image`}
									sizes="50vw, 100vw"
									fill
									className="object-cover rounded-md group-hover/project-item:scale-105 transition-all shadow-md group-hover/project-item:shadow-xl"
								/>
							</div>
						</div>
						<h4 className="text-2xl font-semibold mt-2">{ project.title }</h4>
						<p className="text-sm md:text-base font-medium text-muted-foreground">{ project.category }</p>
					</div>
				))}
			</div>
			<Link
				href={siteConfig.github+"?tab=repositories"}
				target="_blank"
				className={cn(
					buttonVariants({ variant: "outline", size: "lg" }),
					"mt-8 w-full text-lg h-14 text-muted-foreground"
				)}
			>
				More projects on Github
				<Github fill="currentColor" style={{ width: "1.25rem", height: "1.25rem"}} />
			</Link>
		</>
	);
}