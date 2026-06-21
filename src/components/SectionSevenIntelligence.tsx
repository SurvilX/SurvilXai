import React, { useRef, useEffect } from 'react';
import { Eye, Users, Bell, Container, Sparkles, Check } from 'lucide-react';

const NeuralPlexusCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 340;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create random stars/nodes for the plexus
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const nodeCount = 32;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep cyber canvas blue/glow background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0f24'); // Slate/blue deep
      gradient.addColorStop(1, '#020512'); // Rich deep black blue
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Technical horizontal scan lines for the HUD monitor effect
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.012)';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 10) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw lines between nodes
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodeCount; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        // Wall bounce
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            const alpha = (1 - dist / 85) * 0.25;
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`; // Soft blue connection lines
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw node points
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(96, 165, 250, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl -z-10"
    />
  );
};

export default function SectionSevenIntelligence() {
  const cards = [
    {
      id: 1,
      title: 'Computer Vision Intelligence',
      icon: Eye,
      desc: 'Our neural models process 100% of your raw camera frame ingress, calculating skeletal angles, object trajectories, and linger coordinates at sub-second rate.',
      points: ['Skeletal vector modeling', 'Object dwell thresholds', 'Zero hardware dropouts']
    },
    {
      id: 2,
      title: 'Human-in-the-Loop Verification',
      icon: Users,
      desc: 'Avoid manager audit fatigues. Verified off-site operators analyze every AI trigger, validating authentic theft patterns and filtering false events before alert dispatches.',
      points: ['Certified SecOps desk', '<32s validation speeds', '97.2% reduction in noise']
    },
    {
      id: 3,
      title: 'Real-Time Alert Workflow',
      icon: Bell,
      desc: 'Authentic threats dispatch immediate push and SMS packets. Access live video logs, camera coordinates, and operator comments instantly on your phone.',
      points: ['Direct SMS & Push triggers', 'Live stream access link', 'Escalation routing options']
    },
    {
      id: 4,
      title: 'Secure Evidence Management',
      icon: Container,
      desc: 'Compiles encrypted snapshot records, camera channels, operational comments, and timestamps into chronological, SHA256 validated incident PDFs.',
      points: ['Court-ready dossiers', 'Secured downloader streams', 'Insurers submittal package']
    }
  ];

  return (
    <section className="py-24 bg-white text-navy relative overflow-hidden border-t border-slate-100">
      
      {/* Absolute decor */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16" id="s7-header">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 bg-red-50 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" /> INTELLIGENT SYSTEMS INTEGRITY
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight font-sans">
              AI Vision + Human Intelligence
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              SurveilX AI combines advanced localized computer vision algorithms with trained off-site human validation specialists to deliver dependable, high-fidelity security intelligence. We isolate authentic threats so you can act immediately.
            </p>
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="s7-cards-grid">
          {cards.map((card) => {
            const IconObj = card.icon;
            const isComputerVision = card.id === 1;

            if (isComputerVision) {
              return (
                <div
                  key={card.id}
                  className="relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between border border-[#1e293b] bg-slate-950 text-white shadow-xl min-h-[410px] group transition-all duration-300 transform hover:-translate-y-1"
                  id={`s7-card-${card.id}`}
                >
                  {/* Real-time Dynamic Plexus Canvas Network */}
                  <NeuralPlexusCanvas />

                  {/* Dark Vignette Overlay for top-tier clarity */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/20 -z-5 pointer-events-none" />

                  <div>
                    {/* Beautiful telemetry live status indicator from reference image */}
                    <div className="flex justify-between items-center mb-5">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/25 select-none animate-pulse">
                        <IconObj className="h-5 w-5" />
                      </div>
                      
                      <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-full text-[8px] font-mono font-bold text-red-500 uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444] animate-ping" />
                        NEURAL PROCESSING • LIVE
                      </div>
                    </div>
                    
                    <h3 className="text-base font-extrabold font-sans tracking-tight mb-2 text-brand">
                      {card.title}
                    </h3>
                    
                    <p className="text-xs text-slate-300 leading-relaxed font-sans mb-5">
                      {card.desc}
                    </p>
                  </div>

                  {/* High contrast live HUD telemetry metrics block matching second image */}
                  <div className="pt-4 border-t border-slate-800/60 mt-auto">
                    <div className="grid grid-cols-2 gap-4 pb-4">
                      <div>
                        <div className="text-[8px] text-slate-400 font-mono tracking-widest uppercase mb-1">
                          FRAMES ANALYZED / SEC
                        </div>
                        <div className="text-xl font-black font-sans text-white tracking-tight leading-none">
                          1,248
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] text-slate-400 font-mono tracking-widest uppercase mb-1">
                          MODEL CONFIDENCE
                        </div>
                        <div className="text-xl font-black font-sans text-red-400 tracking-tight leading-none animate-pulse">
                          99.2%
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {card.points.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-slate-300">
                          <Check className="h-3.5 w-3.5 text-brand shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={card.id}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between min-h-[410px] group hover:border-brand hover:bg-slate-950 hover:text-white transition-all duration-300 shadow-sm"
                id={`s7-card-${card.id}`}
              >
                <div>
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#0B132B] text-white group-hover:bg-brand group-hover:scale-105 transition duration-205 mb-5 select-none">
                    <IconObj className="h-5 w-5" />
                  </div>
                  
                  <h3 className="text-base font-extrabold font-sans tracking-tight mb-2 group-hover:text-brand transition duration-150">
                    {card.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 group-hover:text-slate-350 leading-relaxed font-sans mb-5">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 group-hover:border-slate-800 space-y-2.5 mt-auto">
                  {card.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-slate-700 group-hover:text-slate-200">
                      <Check className="h-3.5 w-3.5 text-brand shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
