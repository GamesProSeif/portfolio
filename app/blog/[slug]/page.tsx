import { getPostBySlug } from "@/lib/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";

import "highlight.js/styles/github-dark.css";

export async function generateMetadata(
	{ params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
	let post: ReturnType<typeof getPostBySlug>;
	try {
		post = getPostBySlug((await params).slug);
	} catch {
		notFound();
	}

	if (!post)
		notFound();

	return {
		title: post.title,
		description: post.content.substring(0, 150) + "...",
		openGraph: {
			title: post.title,
			description: post.content.substring(0, 150) + "...",
			type: "article",
		},
	};
}

export default async function BlogPost(
	{ params }: { params: Promise<{ slug: string }> }
) {
	let post: ReturnType<typeof getPostBySlug>;
	try {
		post = getPostBySlug((await params).slug);
	} catch {
		notFound();
	}

	if (!post)
		notFound();

	return (
		<div className="container mx-auto py-12 px-4 max-w-4xl">
			<h1 className="text-3xl font-bold">{post.title}</h1>
			<p className="text-gray-500">{post.date}</p>
			<hr className="my-6" />
			<article className="markdown">
				<ReactMarkdown
					remarkPlugins={[remarkGfm, remarkRehype]}
					rehypePlugins={[
						rehypeHighlight, rehypeSlug,
					]}
				>{post.content}</ReactMarkdown>
			</article>
		</div>
	);
}
