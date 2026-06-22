import React, { useState } from 'react';
import { ShieldCheck, Target, Heart, Eye, BellRing, Brain, Check } from 'lucide-react';

export default function AboutUsSection() {
  const [activeValue, setActiveValue] = useState<'mission' | 'vision' | 'values'>('mission');

  const cards = {
    mission: {
      title: 'Our Mission Statement',
      icon: Target,
      desc: 'To transition business networks away from passive video storage and toward active operational security. By infusing high-scale computer vision models with certified off-site analytical officers, we protect inventory, preserve capital, and ensure safe working environments.',
      points: [
        'Prevent loss before target egress',
        'Minimize merchant false alarm penalties',
        'Support prosecution with certified data checks'
      ]
    },
    vision: {
      title: 'Our Strategic Vision',
      icon: Brain,
      desc: 'To establish SurveilX AI as the standard global security operating platform for retail and logistics. We view camera feeds not merely as video bytes, but as contextual spatial streams capable of answering compliance, safety, and inventory vectors automatically.',
      points: [
        'Global real-time stream aggregation',
        'Bespoke zero-friction edge integration',
        'Next-generation cognitive skeletal tracking'
      ]
    },
    values: {
      title: 'Our Core Values',
      icon: Heart,
      desc: 'Operational Integrity, Privacy Centricity, and Absolute Reliability. SurveilX AI maintains a secure architecture where incoming raw feeds are treated under extreme GDPR/HIPAA standards, and operators serve with absolute dedication to accuracy.',
      points: [
        'Rigorous operator cert guidelines',
        'Anonymized pixel masking algorithms',
        'SHA256 authenticated digital evidence chains'
      ]
    }
  };

  const activeCard = cards[activeValue];
  const IconComponent = activeCard.icon;

  return (
    <section id="about-section" className="py-24 bg-white text-navy relative overflow-hidden border-t border-slate-100">

      {/* Decorative details */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* About Headline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-red-50 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="h-3.5 w-3.5" /> CORPORATE INTEGRITY
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight font-sans">
              About SurveilX AI
            </h2>
            <p className="mt-4 text-slate-600 font-sans text-sm md:text-base leading-relaxed">
              SurveilX AI helps modern enterprises transform passive CCTV footage into proactive operating intelligence. By joining deep computer vision networks with trained off-site verification centers, we deliver dependable loss protection, cashier Sweethearting detection, and secure compliance reporting.
            </p>
          </div>

          {/* Right Side Image/Diagnostics Panel (Visual Highlight requested) */}
          <div className="bg-[#0B132B] text-white p-6 md:p-8 rounded-3xl border border-slate-850 shadow-xl relative overflow-hidden">
            {/* Ambient Red glow */}
            <div className="absolute inset-0 bg-radial-gradient(from 50% 50% at 50% 50%, rgba(255, 45, 45, 0.05) 0%, transparent 100%) pointer-events-none" />

            <h3 className="text-sm font-bold font-mono tracking-wider text-brand mb-4">ACTIVE PROTECTION STREAMS</h3>

            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-start gap-4 p-3 rounded-lg bg-slate-950/60 border border-slate-900">
                <div className="h-8 w-8 rounded bg-red-500/10 text-brand flex items-center justify-center border border-red-500/20 shrink-0">
                  <Eye className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white leading-none">24/7 Live Monitoring</h4>
                  <p className="text-slate-400 text-[11px] mt-1">Sustained camera audits to spot theft behavior in active zones.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg bg-slate-950/60 border border-slate-900">
                <div className="h-8 w-8 rounded bg-red-500/10 text-brand flex items-center justify-center border border-red-500/20 shrink-0">
                  <BellRing className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white leading-none">Human Verified Alerts</h4>
                  <p className="text-slate-400 text-[11px] mt-1">Dual filtration prevents false alert disruption on mobile devices.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg bg-slate-950/60 border border-slate-900">
                <div className="h-8 w-8 rounded bg-red-500/10 text-brand flex items-center justify-center border border-red-500/20 shrink-0">
                  <Brain className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white leading-none">Ai Risk Detection</h4>
                  <p className="text-slate-400 text-[11px] mt-1">Computer vision models trace product concealed postures instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CORE CORPORATE PROFILE STEPPER CARD SECTION (Section 11 items) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="about-corporate-grids">

          {/* Picker Left Side (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              onClick={() => setActiveValue('mission')}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${activeValue === 'mission'
                  ? 'bg-[#0B132B] border-brand text-white shadow-md shadow-red-500/5'
                  : 'bg-slate-50 border-slate-100 text-slate-705 hover:bg-slate-100'
                }`}
              id="btn-about-mission"
            >
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-sm font-sans tracking-tight leading-none">Our Corporate Mission</span>
                <Target className={`h-4 w-4 ${activeValue === 'mission' ? 'text-brand' : 'text-slate-400'}`} />
              </div>
            </button>

            <button
              onClick={() => setActiveValue('vision')}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${activeValue === 'vision'
                  ? 'bg-[#0B132B] border-brand text-white shadow-md'
                  : 'bg-slate-50 border-slate-100 text-slate-705 hover:bg-slate-100'
                }`}
              id="btn-about-vision"
            >
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-sm font-sans tracking-tight leading-none">Our Long-term Vision</span>
                <Brain className={`h-4 w-4 ${activeValue === 'vision' ? 'text-brand' : 'text-slate-400'}`} />
              </div>
            </button>

            <button
              onClick={() => setActiveValue('values')}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${activeValue === 'values'
                  ? 'bg-[#0B132B] border-brand text-white shadow-md'
                  : 'bg-slate-50 border-slate-100 text-slate-705 hover:bg-slate-100'
                }`}
              id="btn-about-values"
            >
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-sm font-sans tracking-tight leading-none">Our Core Integrity values</span>
                <Heart className={`h-4 w-4 ${activeValue === 'values' ? 'text-brand' : 'text-slate-400'}`} />
              </div>
            </button>
          </div>

          {/* Stepper Card Display Right Side (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="bg-slate-50/50 border border-slate-100 p-6 md:p-8 rounded-2xl min-h-[260px] flex flex-col justify-between">

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-50 text-brand">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold font-sans tracking-tight text-navy">{activeCard.title}</h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed font-sans">
                  {activeCard.desc}
                </p>

                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block mb-2">Key Directives:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                    {activeCard.points.map((pt, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="h-4.5 w-4.5 shrink-0 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center p-0.5">
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/50 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>SURVEILX_CORPORATE_PROFILE // VER_CE_11</span>
                <span>SECURED PLATFORM</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
