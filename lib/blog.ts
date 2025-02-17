import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "assets/blogs/");

export function getAllPosts() {
	const files = fs.readdirSync(BLOG_DIR).filter(fileName => fileName.endsWith(".md"));

	return files.map((fileName) => {
		const filePath = path.join(BLOG_DIR, fileName);
		const fileContent = fs.readFileSync(filePath, "utf8");
		const { data } = matter(fileContent);

		return {
			slug: fileName.replace(".md", ""),
			title: data.title,
			date: data.date,
			excerpt: data.excerpt,
		};
	});
}

export function getPostBySlug(slug: string) {
	const filePath = path.join(BLOG_DIR, `${slug}.md`);
	const fileContent = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(fileContent);

	return {
		title: data.title,
		date: data.date,
		content,
	};
}
