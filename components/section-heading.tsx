import Reveal from "./reveal";

export default function SectionHeading({
	index,
	kicker,
	title,
	id,
}: {
	index: string;
	kicker: string;
	title: string;
	id?: string;
}) {
	return (
		<Reveal>
			<p className="font-mono text-xs md:text-sm uppercase tracking-[0.35em] text-primary mb-3">
				[&nbsp;{index}&nbsp;]&nbsp;&mdash;&nbsp;{kicker}
			</p>
			<h2
				id={id}
				className="font-display text-4xl md:text-6xl font-bold tracking-tight scroll-mt-24"
			>
				{title}
			</h2>
		</Reveal>
	);
}
