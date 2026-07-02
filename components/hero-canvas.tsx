"use client";

import { useEffect, useRef } from "react";

type Particle = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	r: number;
	hot: boolean;
};

const LINK_DIST = 130;
const MOUSE_DIST = 190;
const MAX_SPEED = 0.6;

export default function HeroCanvas({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		let raf = 0;
		let width = 0;
		let height = 0;
		let running = true;
		let particles: Particle[] = [];
		const mouse = { x: -9999, y: -9999, active: false };

		let primary = "260, 52%, 58%";
		let base = "260, 20%, 7%";

		// CSS vars hold "260 52% 58%" — convert to comma form for canvas hsla()
		const parseHsl = (value: string, fallback: string) => {
			const trimmed = value.trim();
			return trimmed ? trimmed.split(/\s+/).join(", ") : fallback;
		};

		const readColors = () => {
			const styles = getComputedStyle(document.documentElement);
			primary = parseHsl(styles.getPropertyValue("--primary"), primary);
			base = parseHsl(styles.getPropertyValue("--foreground"), base);
		};

		const seed = () => {
			const count = Math.min(130, Math.floor((width * height) / 14000));
			particles = Array.from({ length: count }, (_, i) => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.35,
				vy: (Math.random() - 0.5) * 0.35,
				r: Math.random() * 1.5 + 0.7,
				hot: i % 6 === 0,
			}));
		};

		const draw = () => {
			ctx.clearRect(0, 0, width, height);

			if (!reducedMotion) {
				for (const p of particles) {
					if (mouse.active) {
						const dx = mouse.x - p.x;
						const dy = mouse.y - p.y;
						const d2 = dx * dx + dy * dy;
						if (d2 < MOUSE_DIST * MOUSE_DIST && d2 > 1) {
							const d = Math.sqrt(d2);
							p.vx += (dx / d) * 0.012;
							p.vy += (dy / d) * 0.012;
						}
					}
					p.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, p.vx));
					p.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, p.vy));
					p.x += p.vx;
					p.y += p.vy;
					if (p.x < 0 || p.x > width) p.vx *= -1;
					if (p.y < 0 || p.y > height) p.vy *= -1;
				}
			}

			// links between nearby particles
			for (let i = 0; i < particles.length; i++) {
				const a = particles[i];
				for (let j = i + 1; j < particles.length; j++) {
					const b = particles[j];
					const dx = a.x - b.x;
					const dy = a.y - b.y;
					const d2 = dx * dx + dy * dy;
					if (d2 < LINK_DIST * LINK_DIST) {
						const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.35;
						ctx.strokeStyle = `hsla(${primary}, ${alpha})`;
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.stroke();
					}
				}
			}

			// links to the pointer
			if (mouse.active) {
				for (const p of particles) {
					const dx = p.x - mouse.x;
					const dy = p.y - mouse.y;
					const d2 = dx * dx + dy * dy;
					if (d2 < MOUSE_DIST * MOUSE_DIST) {
						const alpha = (1 - Math.sqrt(d2) / MOUSE_DIST) * 0.6;
						ctx.strokeStyle = `hsla(${primary}, ${alpha})`;
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(p.x, p.y);
						ctx.lineTo(mouse.x, mouse.y);
						ctx.stroke();
					}
				}
			}

			// nodes
			for (const p of particles) {
				if (p.hot) {
					ctx.fillStyle = `hsla(${primary}, 0.9)`;
					ctx.shadowColor = `hsla(${primary}, 0.9)`;
					ctx.shadowBlur = 8;
				} else {
					ctx.fillStyle = `hsla(${base}, 0.45)`;
					ctx.shadowBlur = 0;
				}
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.shadowBlur = 0;
		};

		const loop = () => {
			if (running) draw();
			raf = requestAnimationFrame(loop);
		};

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = rect.width;
			height = rect.height;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			seed();
			if (reducedMotion) draw();
		};

		const onPointerMove = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
			mouse.active =
				mouse.x >= 0 && mouse.x <= rect.width && mouse.y >= 0 && mouse.y <= rect.height;
		};

		const onPointerLeave = () => {
			mouse.active = false;
		};

		readColors();
		resize();

		const themeObserver = new MutationObserver(() => {
			readColors();
			if (reducedMotion) draw();
		});
		themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

		const visibility = new IntersectionObserver(
			([entry]) => { running = entry.isIntersecting; },
			{ threshold: 0 }
		);
		visibility.observe(canvas);

		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", onPointerMove, { passive: true });
		document.addEventListener("pointerleave", onPointerLeave);

		if (!reducedMotion) raf = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(raf);
			themeObserver.disconnect();
			visibility.disconnect();
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onPointerMove);
			document.removeEventListener("pointerleave", onPointerLeave);
		};
	}, []);

	return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
