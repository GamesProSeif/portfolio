import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex justify-center py-12 px-4">
			<div className="p-4 bg-muted/20 border w-full max-w-lg flex flex-col items-center">
				<h3 className="text-2xl font-semibold mb-2 flex items-center gap-2"><AlertCircle /> Not Found</h3>
				<p className="mb-2">This page does not exist.</p>
				<Link href="/" className={cn(
					buttonVariants({ variant: "ghost" }),
					"border w-full"
				)}>Back to Home</Link>
			</div>
		</div>
	);
}