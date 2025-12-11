import { useState, useEffect, useRef } from 'react';
import { Heart, Activity, Shield, Zap, TrendingUp, Award, Users, ChevronRight, Sparkles, Brain, Lock } from 'lucide-react';

// Theme Context Hook (simplified for demo)
const useTheme = () => {
  const [isDark, setIsDark] = useState(true);
  return { isDark, toggleTheme: () => setIsDark(!isDark) };
};

// Enhanced Particle Background with Advanced Effects
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const particleCount = 120;
    
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 0.5,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      opacity: Math.random() * 0.7 + 0.3,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      color: Math.random() > 0.5 ? 'blue' : 'cyan'
    }));

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = isDark ? 'rgba(17, 24, 39, 0.05)' : 'rgba(249, 250, 251, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, i) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const angle = Math.atan2(dy, dx);
          const force = (200 - distance) / 200;
          particle.vx -= Math.cos(angle) * force * 0.6;
          particle.vy -= Math.sin(angle) * force * 0.6;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vx *= 0.98;
        particle.vy *= 0.98;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        particle.pulsePhase += particle.pulseSpeed;
        const pulseScale = 1 + Math.sin(particle.pulsePhase) * 0.4;

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * pulseScale * 4
        );
        
        const colors = {
          blue: isDark ? 'rgba(59, 130, 246' : 'rgba(37, 99, 235',
          cyan: isDark ? 'rgba(6, 182, 212' : 'rgba(8, 145, 178'
        };
        
        const color = colors[particle.color];
        gradient.addColorStop(0, `${color}, ${particle.opacity})`);
        gradient.addColorStop(0.4, `${color}, ${particle.opacity * 0.6})`);
        gradient.addColorStop(1, `${color}, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            const opacity = isDark ? 0.2 : 0.25;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * (1 - distance / 150)})`;
            ctx.lineWidth = 1.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: isDark ? 0.6 : 0.5 }}
    />
  );
};

// Floating Element Component
const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
  <div 
    className="animate-float"
    style={{ 
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }}
  >
    {children}
  </div>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, gradient, delay = 0 }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`group relative p-8 rounded-3xl transition-all duration-700 cursor-pointer transform hover:-translate-y-4 hover:scale-105 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50' 
          : 'bg-white/80 backdrop-blur-xl border border-gray-200 hover:border-blue-400/50 shadow-xl hover:shadow-2xl'
      }`}
      style={{
        animation: 'fadeInUp 0.8s ease-out forwards',
        animationDelay: `${delay}s`,
        opacity: 0
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-cyan-500/5 group-hover:to-purple-500/5 rounded-3xl transition-all duration-700"></div>
      
      <div className={`relative bg-gradient-to-br ${gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
        <Icon className="w-10 h-10 text-white" />
        <div className="absolute inset-0 bg-white/20 rounded-2xl animate-shimmer"></div>
      </div>
      
      <h4 className={`text-2xl font-bold mb-4 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h4>
      
      <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ value, label, icon, delay = 0 }) => {
  const { isDark } = useTheme();
  const [count, setCount] = useState(0);
  const targetValue = parseFloat(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          setCount(targetValue);
          clearInterval(counter);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [targetValue, delay]);

  return (
    <div 
      className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-500"
      style={{
        animation: 'float 4s ease-in-out infinite',
        animationDelay: `${delay}s`
      }}
    >
      <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-500 filter drop-shadow-lg">
        {icon}
      </div>
      <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
        {value.includes('%') ? `${count.toFixed(1)}%` : 
         value.includes('s') ? `<${Math.floor(count)}s` :
         value.includes('K') ? `${Math.floor(count / 1000)}K+` : value}
      </div>
      <div className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}
      </div>
    </div>
  );
};

// Main Home Component
export const Home = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'State-of-the-art machine learning algorithms analyze your health data with exceptional accuracy and reliability.',
      gradient: 'from-blue-500 via-blue-600 to-cyan-600'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive heart disease risk assessment in seconds with real-time processing and immediate insights.',
      gradient: 'from-cyan-500 via-cyan-600 to-blue-600'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and processed with enterprise-grade security. Your privacy is our top priority.',
      gradient: 'from-purple-500 via-blue-600 to-cyan-500'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/30 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/30 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Hero Icon */}
          <FloatingElement delay={0} duration={4}>
            <div 
              className="inline-flex items-center justify-center mb-10 relative"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 blur-3xl opacity-50 animate-spin-slow"></div>
              <div className="relative bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 p-6 rounded-3xl shadow-2xl">
                <Heart className="w-28 h-28 text-white animate-heartbeat drop-shadow-2xl" />
              </div>
            </div>
          </FloatingElement>
          
          {/* Heading */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x pb-2">
              Heart Disease
            </span>
            <span className={`block ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Prediction
            </span>
          </h1>
          
          {/* Subheading */}
          <p className={`text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto mb-12 leading-relaxed font-light ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Harness the power of <span className="font-semibold text-cyan-400">artificial intelligence</span> to assess your cardiovascular health risk with clinical-grade accuracy
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button
              onClick={() => onNavigate?.('predict')}
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 text-white text-xl font-bold rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Analysis
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            <button
              className={`group px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 ${
                isDark 
                  ? 'border-gray-700 text-white hover:border-blue-500 hover:bg-blue-500/10' 
                  : 'border-gray-300 text-gray-900 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              Learn More
              <Sparkles className="inline-block w-6 h-6 ml-2 group-hover:rotate-12 transition-transform" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className={`flex flex-wrap items-center justify-center gap-8 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">Award-Winning AI</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">10,000+ Users Trust Us</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className={`w-6 h-10 rounded-full border-2 ${
            isDark ? 'border-gray-700' : 'border-gray-300'
          } flex items-start justify-center p-2`}>
            <div className={`w-1.5 h-1.5 rounded-full ${
              isDark ? 'bg-gray-500' : 'bg-gray-600'
            } animate-scroll-down`}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-5xl sm:text-6xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">HeartPredict</span>?
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Cutting-edge technology meets healthcare innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-32 px-4">
        <div className={`max-w-6xl mx-auto rounded-[3rem] p-16 relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-gray-800/60 backdrop-blur-2xl border border-gray-700/50' 
            : 'bg-gradient-to-br from-white/80 via-blue-50/80 to-cyan-50/80 backdrop-blur-2xl border border-blue-100/50'
        } shadow-2xl`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5"></div>
          
          <div className="relative z-10">
            <h3 className={`text-4xl font-bold text-center mb-16 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Trusted by Healthcare Professionals
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-16">
              <StatsCard value="99.5" label="Accuracy Rate" icon="🎯" delay={0} />
              <StatsCard value="2" label="Analysis Time" icon="⚡" delay={0.2} />
              <StatsCard value="10000" label="Predictions Made" icon="❤️" delay={0.4} />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.1); }
          20%, 40% { transform: scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-heartbeat { animation: heartbeat 2s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-scroll-down { animation: scroll-down 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Home;