import { getPostBySlug } from "@/lib/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

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
		<div className="container mx-auto py-12 px-4">
			<h1 className="text-3xl font-bold">{post.title}</h1>
			<p className="text-gray-500">{post.date}</p>
			<hr className="my-6" />
			<article className="max-w-none markdown">
				<ReactMarkdown rehypePlugins={[rehypeHighlight]}>{post.content}</ReactMarkdown>
			</article>
		</div>
	);
}
