"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AppWindow, Atom, Bot, Cog, Database } from "lucide-react";

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
		title: "AI & Automation",
		icon: Bot,
		items: [
			"Chatbot & NLP applications",
			"AI-driven recommendation systems",
			"Intelligent workflow automation"
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
			<h3 className="text-3xl md:text-4xl font-semibold md:mb-6">
				What I do?
			</h3>
			<Accordion type="single" collapsible className="w-full mt-4 space-y-4">
				{ services.map((service, i) => (
					<AccordionItem key={i} value={`item-${i}`} className="bg-muted/20 rounded-md border px-4">
						<AccordionTrigger className="hover:no-underline">
							<div className="flex items-center gap-3 text-lg truncate">
								<service.icon className="text-primary" />
								{ service.title }
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<ul className="text-muted-foreground list-disc pl-6 space-y-2 font-medium">
								{ service.items.map((item, j) => (
									<li key={j}>{ item }</li>
								))}
							</ul>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</>
	);
}