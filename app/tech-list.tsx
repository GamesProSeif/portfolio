import DockerIcon from "@/assets/tech/docker.svg";
import ExpressIcon from "@/assets/tech/express.svg";
import BashIcon from "@/assets/tech/gnubash.svg";
import JavaScriptIcon from "@/assets/tech/javascript.svg";
import JestIcon from "@/assets/tech/jest.svg";
import NestIcon from "@/assets/tech/nestjs.svg";
import NextIcon from "@/assets/tech/nextdotjs.svg";
import NodejsIcon from "@/assets/tech/nodedotjs.svg";
import NumpyIcon from "@/assets/tech/numpy.svg";
import NuxtIcon from "@/assets/tech/nuxt.svg";
import PandasIcon from "@/assets/tech/pandas.svg";
import PassportIcon from "@/assets/tech/passport.svg";
import PowerBIIcon from "@/assets/tech/powerbi.svg"; // Icon by https://icons8.com
import PythonIcon from "@/assets/tech/python.svg";
import ReactIcon from "@/assets/tech/react.svg";
import ScikitLearnIcon from "@/assets/tech/scikitlearn.svg";
import TableauIcon from "@/assets/tech/tableau.svg"; // Icon by https://icons8.com
import TailwindIcon from "@/assets/tech/tailwindcss.svg";
import TypeORMIcon from "@/assets/tech/typeorm.svg";
import TypeScriptIcon from "@/assets/tech/typescript.svg";
import VueIcon from "@/assets/tech/vuedotjs.svg";

const techList = [
	{ text: "Bash", icon: BashIcon },
	{ text: "NodeJS", icon: NodejsIcon },
	{ text: "JavaScript", icon: JavaScriptIcon },
	{ text: "TypeScript", icon: TypeScriptIcon },
	{ text: "Docker", icon: DockerIcon },
	{ text: "Jest", icon: JestIcon },
	{ text: "TailwindCSS", icon: TailwindIcon },
	{ text: "React", icon: ReactIcon },
	{ text: "NextJS", icon: NextIcon },
	{ text: "Vue", icon: VueIcon },
	{ text: "NuxtJS", icon: NuxtIcon },
	{ text: "ExpressJS", icon: ExpressIcon },
	{ text: "NestJS", icon: NestIcon },
	{ text: "PassportJS", icon: PassportIcon },
	{ text: "TypeORM", icon: TypeORMIcon },
	{ text: "PowerBI", icon: PowerBIIcon },
	{ text: "Tableau", icon: TableauIcon },
	{ text: "Python", icon: PythonIcon },
	{ text: "ScikitLearn", icon: ScikitLearnIcon },
	{ text: "Pandas", icon: PandasIcon },
	{ text: "Numpy", icon: NumpyIcon },
];

const half = Math.ceil(techList.length / 2);
const rowA = techList.slice(0, half);
const rowB = techList.slice(half);

export default function TechList() {
	return (
		<div className="relative overflow-x-hidden group/tech-list py-10 space-y-5 mask-fade-edges">
			<div className="flex items-center gap-4 w-max animate-scroll-left group-hover/tech-list:paused">
				{[...rowA, ...rowA].map((item, i) => (
					<TechItem item={item} key={i} />
				))}
			</div>
			<div className="flex items-center gap-4 w-max animate-scroll-right group-hover/tech-list:paused">
				{[...rowB, ...rowB].map((item, i) => (
					<TechItem item={item} key={i} />
				))}
			</div>
		</div>
	);
}

function TechItem({ item }: { item: typeof techList[number]}) {
	return (
		<div className="group/tech-item flex items-center gap-3 border bg-card px-5 py-3 transition-colors hover:border-primary/60">
			<item.icon
				className="h-6 w-6 transition-all group-hover/tech-item:scale-110 group-hover/tech-item:text-primary"
				fill="currentColor"
			/>
			<p className="font-mono text-sm whitespace-nowrap">{ item.text }</p>
		</div>
	);
}
