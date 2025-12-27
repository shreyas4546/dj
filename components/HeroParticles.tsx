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
  const particlePool = useRef<Particle[]>([]); // Pool for reusing particle objects
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

    const spawnParticle = (x: number, y: number, velocityX: number, velocityY: number) => {
      let p: Particle;
      
      // Reuse particle from pool if available, otherwise create a new object
      if (particlePool.current.length > 0) {
        p = particlePool.current.pop()!;
      } else {
        // Create a shell object if pool is empty
        p = {
          x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0, color: '', size: 0
        };
      }

      const angle = Math.random() * Math.PI * 2;
      // Inherit some mouse velocity, add random explosion force
      const speed = Math.random() * 0.5;
      
      // Reset/Initialize properties
      p.x = x;
      p.y = y;
      p.vx = velocityX * 0.15 + Math.cos(angle) * speed;
      p.vy = velocityY * 0.15 + Math.sin(angle) * speed;
      p.life = 100;
      p.maxLife = 100 + Math.random() * 50;
      p.color = colors[Math.floor(Math.random() * colors.length)];
      p.size = Math.random() * 1.5 + 0.5;

      particles.current.push(p);
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
                 spawnParticle(x, y, vx, vy);
            }
        }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const active = particles.current;
      const pool = particlePool.current;
      
      for (let i = 0; i < active.length; i++) {
        const p = active[i];
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
          // Optimization: Only apply heavy shadow blur if the particle is reasonably visible
          if (alpha > 0.2) {
             ctx.shadowBlur = 10;
             ctx.shadowColor = p.color;
          } else {
             ctx.shadowBlur = 0;
          }
          
          ctx.fill();
          
          // Reset shadow for next draw calls
          ctx.shadowBlur = 0;
        } else {
          // Particle died: Return to pool
          pool.push(p);
          
          // Fast remove from active array: swap with last element and pop (O(1))
          // This avoids the O(N) cost of splice()
          if (i < active.length - 1) {
            active[i] = active[active.length - 1];
          }
          active.pop();
          
          // Decrement index to re-process the element we just swapped into this position
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