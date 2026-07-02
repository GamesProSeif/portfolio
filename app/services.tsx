import { AppWindow, Atom, Bot, Cog, Database } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import { cn } from "@/lib/utils";

const services = [
	{
		title: "Data Science",
		icon: Atom,
		items: [
			"Machine learning model development",
			"Data analysis & visualization",
			"Interactive dashboards",
			"Predictive analytics & forecasting",
			"AI-powered automation",
			"Fraud detection & anomaly detection"
		]
	},
	{
		title: "Web Development",
		icon: AppWindow,
		items: [
			"Single Page Applications (SPAs)",
			"Landing pages and business websites",
			"Portfolio websites",
			"Full-Stack Web Applications",
			"Performance optimization & SEO"
		]
	},
	{
		title: "Backend Development",
		icon: Database,
		items: [
			"RESTful & GraphQL APIs",
			"Database design & optimization (SQL & NoSQL)",
			"Authentication & security best practices",
			"Scalable cloud-based architectures"
		]
	},
	{
		title: "AI & Automation",
		icon: Bot,
		items: [
			"Chatbot & NLP applications",
			"AI-driven recommendation systems",
			"Intelligent workflow automation"
		]
	},
	{
		title: "DevOps & Deployment",
		icon: Cog,
		items: [
			"CI/CD pipelines & version control (Git)",
			"Cloud deployment (AWS, Vercel, Firebase)",
			"Docker & containerized applications"
		]
	},
];

export default function Services() {
	return (
		<>
			<SectionHeading index="01" kicker="Capabilities" title="What I do" />
			<div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
				{ services.map((service, i) => (
					<Reveal
						key={i}
						delay={(i % 3) * 100}
						className={cn(i < 2 ? "md:col-span-3" : "md:col-span-2")}
					>
						<div className="group relative h-full border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.35)]">
							<div className="flex items-start justify-between">
								<div className="flex h-12 w-12 items-center justify-center border bg-background text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
									<service.icon className="h-6 w-6" />
								</div>
								<span className="font-mono text-sm text-muted-foreground/60">
									0{i + 1}
								</span>
							</div>
							<h4 className="mt-6 font-display text-2xl font-semibold">
								{ service.title }
							</h4>
							<ul className="mt-4 space-y-2 text-muted-foreground">
								{ service.items.map((item, j) => (
									<li key={j} className="flex gap-2.5 text-sm leading-relaxed">
										<span className="select-none font-mono text-primary">+</span>
										{ item }
									</li>
								))}
							</ul>
						</div>
					</Reveal>
				))}
			</div>
		</>
	);
}
