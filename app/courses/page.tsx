import Link from "next/link";
import { getAllCourses } from "@/lib/courses";
import { BookOpen } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Courses"
};

export default function CoursesPage() {
	const courses = getAllCourses();

	return (
		<div className="container mx-auto py-12 px-4">
			<h1 className="text-3xl font-bold mb-6">Courses</h1>
			{courses.map((course) => (
				<Link href={`/courses/${course.id}`} key={course.id}>
					<div className="mb-6 bg-muted/20 border rounded-md p-4 w-full hover:bg-muted/50 transition-all duration-150 hover:ring ring-primary flex items-start gap-4">
						<BookOpen className="text-primary mt-1 shrink-0" />
						<div>
							<h3 className="text-2xl font-semibold text-primary">{course.title}</h3>
							<p className="text-muted-foreground text-sm">{course.slideCount} presentations</p>
							<p className="mt-2">{course.description}</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
