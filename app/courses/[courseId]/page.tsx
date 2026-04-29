import { getCourseById, getAllCourses } from "@/lib/courses";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function generateStaticParams() {
	return getAllCourses().map((c) => ({ courseId: c.id }));
}

export async function generateMetadata(
	{ params }: { params: Promise<{ courseId: string }> }
): Promise<Metadata> {
	const { courseId } = await params;
	const course = getCourseById(courseId);
	if (!course) notFound();
	return {
		title: course.title,
		description: course.description,
	};
}

export default async function CourseOverviewPage(
	{ params }: { params: Promise<{ courseId: string }> }
) {
	const { courseId } = await params;
	const course = getCourseById(courseId);
	if (!course) notFound();

	const slides = Array.from({ length: course.slideCount }, (_, i) => i + 1);

	return (
		<div className="container mx-auto py-12 px-4 max-w-3xl">
			<p className="text-primary text-sm font-medium mb-1">Course</p>
			<h1 className="text-3xl md:text-4xl font-bold mb-3">{course.title}</h1>
			<p className="text-muted-foreground">{course.description}</p>
			<hr className="my-8" />
			<h2 className="text-xl font-semibold mb-4">Presentations ({course.slideCount})</h2>
			<ol className="space-y-2">
				{slides.map((n) => (
					<li key={n}>
						<Link
							href={`/courses/${courseId}/${n}`}
							className={cn(
								buttonVariants({ variant: "outline" }),
								"w-full justify-between h-12 text-base"
							)}
						>
							<span>Presentation {n}</span>
							<ChevronRight className="text-muted-foreground" />
						</Link>
					</li>
				))}
			</ol>
		</div>
	);
}
