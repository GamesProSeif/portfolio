import { getCourseById, getAllCourses } from "@/lib/courses";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return getAllCourses().flatMap((c) =>
		Array.from({ length: c.slideCount }, (_, i) => ({
			courseId: c.id,
			slide: String(i + 1),
		}))
	);
}

export async function generateMetadata(
	{ params }: { params: Promise<{ courseId: string; slide: string }> }
): Promise<Metadata> {
	const { courseId, slide } = await params;
	const course = getCourseById(courseId);
	if (!course) notFound();
	const n = parseInt(slide, 10);
	if (isNaN(n) || n < 1 || n > course.slideCount) notFound();
	return { title: `${course.title} — Presentation ${n}` };
}

export default async function PresentationPage(
	{ params }: { params: Promise<{ courseId: string; slide: string }> }
) {
	const { courseId, slide } = await params;
	const course = getCourseById(courseId);
	if (!course) notFound();

	const n = parseInt(slide, 10);
	if (isNaN(n) || n < 1 || n > course.slideCount) notFound();

	return (
		<div className="w-full">
			<iframe
				src={`/presentations/${courseId}/${n}.html`}
				className="w-full h-[calc(100vh-3.5rem)] border-0"
				title={`${course.title} — Presentation ${n}`}
				sandbox="allow-scripts allow-same-origin"
				loading="eager"
			/>
		</div>
	);
}
