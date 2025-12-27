import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const HeroParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, initialized: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    const resizeCanvas = () => {
      // Use parent dimensions to ensure full coverage
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const colors = ['#00f3ff', '#bc13fe', '#ffffff', '#0066ff'];

    const createParticle = (x: number, y: number, velocityX: number, velocityY: number) => {
      const angle = Math.random() * Math.PI * 2;
      // Inherit some mouse velocity, add random explosion force
      const speed = Math.random() * 0.5;
      
      const particle: Particle = {
        x,
        y,
        vx: velocityX * 0.15 + Math.cos(angle) * speed,
        vy: velocityY * 0.15 + Math.sin(angle) * speed,
        life: 100,
        maxLife: 100 + Math.random() * 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 1.5 + 0.5
      };
      particles.current.push(particle);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Initialize last position on first move to prevent velocity spike
        if (!mouse.current.initialized) {
            mouse.current.lastX = x;
            mouse.current.lastY = y;
            mouse.current.initialized = true;
        }
        
        // Calculate velocity based on mouse movement
        const vx = x - mouse.current.lastX;
        const vy = y - mouse.current.lastY;

        mouse.current.lastX = x;
        mouse.current.lastY = y;

        // Only spawn if within canvas bounds
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            // Spawn density relative to movement speed (more speed = more particles)
            const speed = Math.sqrt(vx*vx + vy*vy);
            const count = Math.min(5, Math.floor(speed * 0.2) + 1);
            
            for(let i=0; i<count; i++) {
                 createParticle(x, y, vx, vy);
            }
        }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1.5; // Decay rate
        
        // Apply friction
        p.vx *= 0.96;
        p.vy *= 0.96;

        if (p.life > 0) {
          const alpha = p.life / p.maxLife;
          ctx.globalAlpha = alpha;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          
          // Neon Glow effect
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          
          ctx.fill();
          
          // Reset shadow for performance
          ctx.shadowBlur = 0;
        } else {
          particles.current.splice(i, 1);
          i--;
        }
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] mix-blend-screen opacity-100" 
    />
  );
};

export default HeroParticles;