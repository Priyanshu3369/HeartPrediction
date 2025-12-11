import { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = 100;
    
    // Initialize particles with more properties
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.6 + 0.2,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01
    }));

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, i) => {
        // Mouse interaction - repel particles
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 150;
          particle.vx -= Math.cos(angle) * force * 0.5;
          particle.vy -= Math.sin(angle) * force * 0.5;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Pulsing effect
        particle.pulsePhase += particle.pulseSpeed;
        const pulseScale = 1 + Math.sin(particle.pulsePhase) * 0.3;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * pulseScale * 3
        );
        
        if (isDark) {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${particle.opacity})`);
          gradient.addColorStop(0.5, `rgba(59, 130, 246, ${particle.opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        } else {
          gradient.addColorStop(0, `rgba(37, 99, 235, ${particle.opacity})`);
          gradient.addColorStop(0.5, `rgba(37, 99, 235, ${particle.opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            const opacity = isDark ? 0.15 : 0.2;
            ctx.strokeStyle = isDark
              ? `rgba(59, 130, 246, ${opacity * (1 - distance / 120)})`
              : `rgba(37, 99, 235, ${opacity * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: isDark ? 0.5 : 0.4 }}
    />
  );
};

