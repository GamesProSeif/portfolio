"use client";

import { useEffect, useRef, useState } from "react";
import p5 from "p5";

export default function RainCanvas({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLDivElement>(null);
	const [primaryColor, setPrimaryColor] = useState<[number, number, number]>([0, 0, 0]);
	let prevWidth = 0, prevHeight = 0;

	const getPrimaryColor = () => {
		const root = getComputedStyle(document.documentElement);
		const primary = root.getPropertyValue("--primary").trim();

		console.log(primary);

		const match = primary.match(/\d+/g);
		if (match) {
			return match.map(Number);
		}
		return [163, 117, 255];
	};

	useEffect(() => {
		if (typeof window === "undefined") return;

		if (primaryColor.every(v => v === 0))
			setPrimaryColor(getPrimaryColor() as typeof primaryColor);

		const sketch = (p: p5) => {
			const rainDrops: p5.Vector[] = [];
			const rainCount = 150;
			const rainSize = 1.5;
			const gravity = 15;
			const fallAngle = 0.125 * Math.PI;
			let fallAngleVector: p5.Vector;

			p.setup = () => {
				fallAngleVector = p5.Vector.fromAngle(fallAngle);

				const parent = canvasRef.current;
				if (!parent) return;

				// eslint-disable-next-line react-hooks/exhaustive-deps
				prevWidth = parent.clientWidth;
				// eslint-disable-next-line react-hooks/exhaustive-deps
				prevHeight = parent.clientHeight;

				const canvas = p.createCanvas(parent.clientWidth, parent.clientHeight);
				if (canvasRef.current) {
					canvas.parent(canvasRef.current);
				}

				p.rectMode(p.CENTER);
				p.colorMode(p.HSL);

				for (let i = 0; i < rainCount; i++) {
					rainDrops.push(p.createVector(
						p.random(-100, p.width + 100),
						p.random(p.height),
						p.random(0.5, 1)
					));
				}
			};

			p.draw = () => {
				const parent = canvasRef.current;
				if (!parent) return;

				const newWidth = parent.clientWidth;
				const newHeight = parent.clientHeight;
				if (newWidth !== prevWidth || newHeight !== prevHeight) {
					p.resizeCanvas(newWidth, newHeight);
					prevWidth = newWidth;
					prevHeight = newHeight;
				}

				p.clear();
				p.background(0, 0, 0, 0);

				for (let i = 0; i < rainCount; i++) {
					rainDrops[i].x += rainDrops[i].z * fallAngleVector.x;
					rainDrops[i].y += gravity * rainDrops[i].z * fallAngleVector.y;
					if (rainDrops[i].y > p.height) {
						rainDrops[i].x = p.random(-100, p.width + 100);
						rainDrops[i].y = 0;
					}
				}

				p.noStroke();
				for (let i = 0; i < rainCount; i++) {
					p.push();
					p.translate(rainDrops[i].x, rainDrops[i].y);
					p.rotate(-fallAngle * rainDrops[i].z);
					p.translate(-rainDrops[i].x, -rainDrops[i].y);
					p.fill(...primaryColor, rainDrops[i].z * 255);
					p.rect(
						rainDrops[i].x,
						rainDrops[i].y,
						1 * rainSize,
						8 * rainSize * rainDrops[i].z
					);
					p.pop();
				}
			};

			p.windowResized = () => {
				if (canvasRef.current) {
					p.resizeCanvas(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
				}
			};

		};

		const myP5 = new p5(sketch);

		return () => {
			myP5.remove();
		};
	}, [primaryColor]);

	return <div ref={canvasRef} className={className} />;
};
