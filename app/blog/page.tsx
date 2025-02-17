import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { HeartCrack } from "lucide-react";

export default function Blog() {
	const posts = getAllPosts();

	return (
		<div className="container mx-auto py-12 px-4">
			<h1 className="text-3xl font-bold mb-6">Blog</h1>
			{posts.map((post) => (
				<Link href={`/blog/${post.slug}`} key={post.slug}>
					<div className="mb-6 bg-muted/20 border rounded-md p-4 w-full hover:bg-muted/50 transition-all duration-150 hover:ring ring-primary">
						<h3 className="text-2xl font-semibold text-primary">
							{post.title}
						</h3>
						<p className="text-muted-foreground text-sm">{post.date}</p>
						<p className="mt-2">{post.excerpt}</p>
					</div>
				</Link>
			))}
			{ posts.length === 0 &&
				<div className="flex flex-col justify-center items-center text-center bg-muted/20 border p-4">
					<h3 className="text-2xl font-semibold flex gap-2 items-center">No Posts Yet <HeartCrack className="text-primary" /></h3>
					<p className="text-muted-foreground">Come back later...</p>
				</div>
			}
		</div>
	);
}
