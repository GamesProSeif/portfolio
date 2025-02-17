import siteConfig from "@/site-config.json";
import TechList from "./tech-list";
import Services from "./services";
import Projects from "./projects";
import Contact from "./contact";

export default function Home() {
	return (
		<>
			<div className="container mx-auto mt-16 px-4 max-w-5xl">
				<section className="space-y-4">
					<p className="text-muted-foreground md:text-lg">Hi, I&apos;m { siteConfig.name }</p>
					<div className="flex flex-col space-y-4 md:gap-4">
						<div>
							{ siteConfig.jobTitles.map((jobTitle, i) => (
								<h3 key={i} className="leading-none text-4xl sm:text-5xl md:text-6xl font-medium text-pretty">{ jobTitle }</h3>
							))}
						</div>
						<p className="md:text-2xl text-muted-foreground">{ siteConfig.moto }</p>
					</div>
				</section>
				<section>
					<TechList />
				</section>
				<section className="py-8 md:mt-6 max-w-lg mx-auto">
					<Services />
				</section>
				<hr className="my-6" />
				<section className="py-8">
					<Projects />
				</section>
				<hr className="my-6" />
				<section className="py-8">
					<Contact />
				</section>
			</div>
		</>
	);
}
