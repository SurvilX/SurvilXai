import React, { useState, useEffect } from 'react';
import { Camera, ShieldCheck, Eye, RefreshCw, ChevronRight, Sliders, Play, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const [activeFrame, setActiveFrame] = useState(0);
  const [animatedRisk, setAnimatedRisk] = useState(72);
  const [radarAngle, setRadarAngle] = useState(0);

  // Rotate mockup active camera frame or stats
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setActiveFrame((prev) => (prev + 1) % 3);
    }, 4000);

    const radarInterval = setInterval(() => {
      setRadarAngle((prev) => (prev + 2) % 360);
    }, 30);

    const riskInterval = setInterval(() => {
      // simulate risk score fluctuation around high score
      setAnimatedRisk(() => Math.floor(88 + Math.random() * 8));
    }, 1500);

    return () => {
      clearInterval(frameInterval);
      clearInterval(radarInterval);
      clearInterval(riskInterval);
    };
  }, []);

  const featurePills = [
    { label: 'AI Detection Online', desc: 'Active algorithms' },
    { label: 'Human Verified Alerts', desc: 'Zero false alarms' },
    { label: 'Evidence Reports Ready', desc: 'Secure SHA256' },
    { label: 'Live Monitoring Active', desc: '24/7/365 Team' },
  ];

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 bg-[#020612] text-white flex items-center overflow-hidden"
    >
      {/* Immersive glass skyscraper & dark operations center image underlay */}
      <div className="absolute inset-0 -z-20 pointer-events-none select-none overflow-hidden bg-slate-950">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
          alt="Surveillance headquarters architecture backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-[0.22] mix-blend-luminosity scale-105 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020612] via-slate-950/80 to-[#020612]" />
      </div>

      {/* Cybernetic sharp cyber grid layer (horizontal & vertical cyan-blue vectors) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e90c_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90c_1px,transparent_1px)] bg-[size:42px_42px] pointer-events-none -z-10" />
      
      {/* Cyberpunk high-visibility horizontal red radar line passing through center of page */}
      <div className="absolute top-[48%] left-0 right-0 h-[1px] bg-[#EF4444]/65 shadow-[0_0_15px_rgba(239,68,68,0.9)] pointer-events-none z-10 opacity-75 sm:opacity-100" />

      {/* Bounding telemetry tracker frame #1 (Floating on background - Person detection overlay) */}
      <div className="absolute top-[26%] right-[18%] hidden md:block border border-[#EF4444]/70 bg-[#EF4444]/5 px-2.5 py-1.5 rounded-sm font-mono text-[9px] font-black text-[#EF4444] tracking-widest select-none pointer-events-none animate-pulse">
        <div className="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 border-t-2 border-l-2 border-[#EF4444]" />
        <div className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 border-t-2 border-r-2 border-[#EF4444]" />
        <div className="absolute -bottom-1.5 -left-1.5 h-3.5 w-3.5 border-b-2 border-l-2 border-[#EF4444]" />
        <div className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 border-b-2 border-r-2 border-[#EF4444]" />
        TRACKING • PERSON 0.98
      </div>

      {/* Bounding telemetry tracker frame #2 (Floating on background - Object/Aisle detection) */}
      <div className="absolute bottom-[16%] right-[32%] hidden md:block border border-[#EF4444]/50 bg-[#EF4444]/5 px-2.5 py-1 rounded-sm font-mono text-[9px] font-black text-[#EF4444] tracking-wider select-none pointer-events-none">
        <div className="absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2 border-[#EF4444]" />
        <div className="absolute -top-1 -right-1 h-2 w-2 border-t-2 border-r-2 border-[#EF4444]" />
        <div className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 border-[#EF4444]" />
        <div className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-[#EF4444]" />
        OBJECT 0.86
      </div>

      {/* Dynamic ambient color glow spots */}
      <div className="absolute top-[15%] left-[10%] w-[450px] h-[450px] bg-red-500/5 rounded-full blur-[140px] -z-10 animate-pulse" />
      <div className="absolute bottom-[25%] right-[5%] w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[140px] -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="hero-layout">
          
          {/* LEFT COLUMN: HERO INTRO & VALUE PROP (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left" id="hero-left-content">
            
            {/* Live active top badge */}
            <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/25 px-3 py-1.5 rounded-full" id="hero-active-badge">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-90"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand"></span>
              </span>
              <span className="text-[10px] font-extrabold tracking-widest font-mono text-brand uppercase">
                LIVE MONITORING ACTIVE • AI Surveillance Intelligence
              </span>
            </div>

            {/* Main high-impact headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-black font-sans tracking-tight leading-tight uppercase">
              AI-Powered CCTV <br className="hidden sm:block font-sans" />
              Monitoring & <span className="text-brand">Theft Protection</span>
            </h1>

            {/* Subheading descriptive context */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl font-sans font-medium leading-relaxed">
              SurveilX turns ordinary CCTV cameras into intelligent security operations with AI-powered live-surveillance, suspicious activity detection, human-verified alerts, and structured evidence reports.
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleScrollTo('#contact-section')}
                className="bg-brand hover:bg-brand-dark text-white font-bold py-3.5 px-7 rounded-xl text-xs sm:text-sm shadow-lg shadow-red-500/20 hover:scale-102 transition duration-200 font-sans flex items-center gap-1.5 cursor-pointer"
                id="hero-btn-audit-cta"
              >
                Get Free Security Audit <ChevronRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => handleScrollTo('#demo-section')}
                className="bg-slate-900/90 hover:bg-slate-800 text-slate-300 font-bold border border-slate-800 py-3.5 px-6 rounded-xl text-xs sm:text-sm hover:text-white transition duration-200 flex items-center gap-2 cursor-pointer"
                id="hero-btn-demo-cta"
              >
                <Sliders className="h-4 w-4 text-brand" /> Watch Platform Demo
              </button>
            </div>

            {/* Under CTAs feature pills */}
            <div className="pt-8 border-t border-slate-900/60 grid grid-cols-2 md:grid-cols-4 gap-4" id="hero-feature-pills">
              {featurePills.map((p, index) => (
                <div key={index} className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white leading-none">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand shrink-0" />
                    {p.label}
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono pl-5">{p.desc}</p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: CYBERSECURITY CLASSIC COMMAND CENTER HUD PANEL matching second image exactly */}
          <div className="lg:col-span-5" id="hero-right-console">
            <div className="w-full bg-[#0a0f24]/75 backdrop-blur-md border border-white/10 rounded-[1.8rem] p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between h-[360px]">
              
              {/* HUD Header Bar */}
              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-slate-400 font-bold pb-2 border-b border-white/5 uppercase">
                <span>surveilx • command center</span>
                <span className="text-[9px] text-[#10B981] font-sans flex items-center gap-1 font-black">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  SECURE
                </span>
              </div>

              {/* Alert Segment Card styled exactly like screenshot */}
              <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-2xl p-5 my-3 relative overflow-hidden backdrop-blur-sm">
                
                {/* Visual neon background indicator block */}
                <div className="space-y-1">
                  <span className="text-[8px] font-mono font-black text-brand tracking-widest uppercase block leading-none">
                    AI ALERT • CAMERA AISLE 3
                  </span>
                  <h4 className="text-lg md:text-xl font-extrabold text-white font-sans tracking-tight leading-snug">
                    Suspicious Product Handling
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono font-bold">
                    Human Review Active • 18s clip marked
                  </p>
                </div>
              </div>

              {/* Metrics HUD Row */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
                {/* Risk scoring telemetry block */}
                <div className="bg-black/45 p-3 rounded-xl border border-white/5">
                  <span className="text-[8px] font-mono text-slate-400 tracking-wider block uppercase mb-1 leading-none">
                    AI RISK SCORE
                  </span>
                  <div className="text-2xl font-black text-brand tracking-tight leading-none animate-pulse">
                    92%
                  </div>
                </div>

                {/* Health scoring telemetry block */}
                <div className="bg-black/45 p-3 rounded-xl border border-white/5">
                  <span className="text-[8px] font-mono text-slate-400 tracking-wider block uppercase mb-1 leading-none">
                    CAMERA HEALTH
                  </span>
                  <div className="text-2xl font-black text-[#10B981] tracking-tight leading-none">
                    98%
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 block mt-1 leading-none font-bold">
                    312 online
                  </span>
                </div>
              </div>

              {/* Little detail branding tracker tag */}
              <div className="absolute right-6 top-1 text-[8px] font-mono text-[#EF4444]/65 font-bold tracking-widest select-none pointer-events-none bg-[#EF4444]/10 border border-[#EF4444]/25 px-1.5 py-0.5 rounded transform translate-y-12">
                RISK_S7
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
