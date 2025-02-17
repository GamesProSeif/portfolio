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

export default function TechList() {
	const infiniteTechList = [...techList, ...techList];

	return (
		<div className="relative overflow-x-hidden group/tech-list py-8">
			<div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20"></div>
			<div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20"></div>
			<div className="flex items-center gap-12 md:gap-20 w-max animate-scroll-left group-hover/tech-list:paused">
				{ infiniteTechList.map((item, i) => (
					<TechItem item={item} key={i} />
				))}
			</div>
		</div>
	);
}

function TechItem({ item }: { item: typeof techList[number]}) {
	return (
		<div className="flex items-center gap-2 group/tech-item">
			<item.icon className="h-8 w-8 group-hover/tech-item:scale-110 transition-transform" fill="currentColor" />
			<p className="text-lg font-medium">{ item.text }</p>
		</div>
	);
}
