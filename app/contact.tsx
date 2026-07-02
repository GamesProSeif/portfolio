"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import siteConfig from "@/site-config.json";
import { ArrowUpRight, Check, LoaderCircle, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Contact() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!submitted)
			return;

		const timeout = setTimeout(() => setSubmitted(false), 3000);

		return () => clearTimeout(timeout);
	}, [submitted]);

	async function onSubmit() {
		try {
			setIsSubmitting(true);
			const res = await fetch(
				"/contact",
				{
					method: "POST",
					body: JSON.stringify({ name, email, message }),
					headers: {
						"Content-Type": "application/json"
					}
				},
			);

			if (res.ok) {
				setSubmitted(true);
			}
		} catch {
			setError(true);
		} finally {
			setIsSubmitting(false);
		}
	}

	const inputStyles = "rounded-none border-input bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-lg";

	return (
		<>
			<SectionHeading index="03" kicker="Let's talk" title="Contact" id="contact" />
			<div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
				<Reveal>
					<p className="text-lg md:text-xl text-muted-foreground text-pretty">
						Have a question or a project in mind? Feel free to reach out
						&mdash; I&apos;m always open to discussing new ideas.
					</p>
					<a
						href={`mailto:${siteConfig.mail}`}
						className="group mt-8 inline-flex items-center gap-2 border-b-2 border-primary pb-1 font-display text-xl md:text-2xl font-semibold transition-colors hover:text-primary"
					>
						{siteConfig.mail}
						<ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
					</a>
					<p className="mt-8 flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
						<MapPin className="h-4 w-4 text-primary" />
						{ siteConfig.location }
					</p>
				</Reveal>
				<Reveal delay={120}>
					<form className="space-y-5" onSubmit={e => { e.preventDefault(); onSubmit() }}>
						<div className="space-y-2">
							<label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
								Name
							</label>
							<Input
								id="contact-name"
								name="name"
								placeholder="Your name"
								className={`${inputStyles} py-6`}
								required
								value={name}
								onChange={e => setName(e.target.value)}
								autoComplete="given-name"
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
								Email
							</label>
							<Input
								id="contact-email"
								name="email"
								placeholder="you@example.com"
								type="email"
								className={`${inputStyles} py-6`}
								required
								value={email}
								onChange={e => setEmail(e.target.value)}
								autoComplete="email"
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
								Message
							</label>
							<Textarea
								id="contact-message"
								name="message"
								placeholder="Tell me about your project..."
								className={inputStyles}
								rows={4}
								required
								value={message}
								onChange={e => setMessage(e.target.value)}
							/>
						</div>
						<Button
							type="submit"
							className="w-full text-lg h-14 rounded-none transition-all hover:shadow-[0_0_32px_hsl(var(--primary)/0.45)]"
							disabled={isSubmitting || submitted}
						>{ isSubmitting ? <LoaderCircle className="animate-spin" /> : "Send message" }</Button>

						{ submitted &&
							<p className="flex items-center justify-center gap-2 text-primary">
								<Check />
								Your message has been sent!
							</p>
						}
						{
							error &&
							<p className="flex items-center justify-center gap-2 text-destructive">
								An unknown error has occurred while processing your message.
							</p>
						}
					</form>
				</Reveal>
			</div>
		</>
	);
}
