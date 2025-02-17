export async function POST(req: Request) {
	const data = await req.json();

	if (!data.name || !data.email || !data.message)
		return Response.json({ message: "Invalid input" }, { status: 400 })

	console.log(data);
	const { name, message, email } = data;

	const payload = {
		embeds: [
			{
				title: "New Contact Form Submission",
				color: 0x0099ff,
				fields: [
					{ name: "👤 Name", value: name, inline: true },
					{ name: "📧 Email", value: email, inline: true },
					{ name: "💬 Message", value: message }
				],
				timestamp: new Date().toISOString()
			}
		]
	};

	try {
		const response = await fetch(process.env.DISCORD_WEBHOOK_LINK as string, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});

		console.log(response)
		console.log(await response.json())

		if (!response.ok) throw new Error("Failed to send message");

		Response.json({ message: "Message sent successfully!" });
	} catch (error) {
		if (error instanceof Error)
			Response.json(
				{ message: "Error sending message", error: error.message },
				{ status: 500 }
			);
	}

	return Response.json({ ok: true })
}