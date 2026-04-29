import siteConfig from "@/site-config.json";

export type Course = (typeof siteConfig.courses)[number];

export function getAllCourses(): Course[] {
	return siteConfig.courses;
}

export function getCourseById(id: string): Course | undefined {
	return siteConfig.courses.find((c) => c.id === id);
}
