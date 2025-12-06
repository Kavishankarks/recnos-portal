"use client";

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    life: number;
}

export default function MouseSparks() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const animationFrameId = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const colors = [
            'rgba(255, 153, 51, 0.8)', // Saffron
            'rgba(0, 243, 255, 0.8)',   // Blue Neon
            'rgba(255, 255, 255, 0.8)'  // White
        ];

        const createParticles = (e: MouseEvent) => {
            const particleCount = 3;
            for (let i = 0; i < particleCount; i++) {
                particles.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 3 + 1,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 - 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 1.0
                });
            }
        };

        window.addEventListener('mousemove', createParticles);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.current.length; i++) {
                const p = particles.current[i];
                p.x += p.speedX;
                p.y += p.speedY;
                p.life -= 0.02;
                p.size *= 0.95;

                if (p.life > 0) {
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1.0;
                } else {
                    particles.current.splice(i, 1);
                    i--;
                }
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', createParticles);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999
            }}
        />
    );
}
