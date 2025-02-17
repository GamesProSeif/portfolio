"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import siteConfig from "@/site-config.json";
import { Check, LoaderCircle } from "lucide-react";
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

	return (
		<>
			<p className="text-primary text-base md:text-lg mb-2">Let&apos;s talk</p>
			<h3 id="contact" className="text-4xl md:text-5xl font-medium mb-6">
				Contact
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="text-muted-foreground">
					<p className="mb-4">Have a question or a project in mind? Feel free to reach out.</p>
					<div className="flex items-center gap-2">
						<span>Location:</span>
						<div className="text-black dark:text-white">{ siteConfig.location }</div>
					</div>
				</div>
				<form className="space-y-6" onSubmit={e => { e.preventDefault(); onSubmit() }}>
					<Input
						name="name"
						placeholder="Name"
						className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-lg py-6"
						required
						value={name}
						onChange={e => setName(e.target.value)}
						autoComplete="given-name"
					/>
					<Input
						name="email"
						placeholder="Email"
						type="email"
						className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-lg py-6"
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
						autoComplete="email"
					/>
					<Textarea
						name="message"
						placeholder="Message"
						className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-lg"
						rows={3}
						required
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
					<Button
						type="submit"
						className="w-full text-lg h-14"
						variant="outline"
						disabled={isSubmitting || submitted}
					>{ isSubmitting ? <LoaderCircle className="animate-spin" /> : "Submit" }</Button>

					{ submitted &&
						<p className="flex items-center justify-center gap-2">
							<Check />
							Your message has been sent!
						</p>
					}
					{
						error &&
						<p className="flex items-center justify-center gap-2">
							An unknown error has occurred while processing your message.
						</p>
					}
				</form>
			</div>
		</>
	);
}