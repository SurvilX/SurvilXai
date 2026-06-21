import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileSearch, Map, Sliders, Play, BadgeCheck, FileHeart, ChevronRight, Zap } from 'lucide-react';

export default function TimelineSection() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: 'Security Audit',
      subtitle: 'Understand Business Risks & Setup',
      icon: FileSearch,
      desc: 'Our loss consultants analyze your physical floor plans, checkout positions, stock storage centers, and current camera systems. We discover blind spots and determine if raw analog/digital RTSP configurations are ready for direct cloud-stream ingestion.',
      targetUptime: 'Completed in 2 hours',
      tagline: 'AUDIT_ASSESSMENT'
    },
    {
      id: 2,
      title: 'Camera & Zone Mapping',
      subtitle: 'Identify Priority Areas',
      icon: Map,
      desc: 'SurveilX engineers establish specialized virtual "tripwires" and spatial zones across checkout bays, product shelves, and perimeter lines. By specifying boundary masks, our platform avoids false triggers from public sidewalks or harmless store restocking.',
      targetUptime: 'Mask layout validated',
      tagline: 'ZONE_COORDINATION'
    },
    {
      id: 3,
      title: 'AI Monitoring Setup',
      subtitle: 'Configure Alerts & Workflows',
      icon: Sliders,
      desc: 'We map the neural rules to fit your operating schedule. Configure rules like concealment tracking (Aisles 3 & 4), Sweethearting void matching (Cashier terminals), or Loitering perimeter timers (Rear docks) with priority client push notifications.',
      targetUptime: '100% cloud-synced',
      tagline: 'ALGORITHM_CONFIG'
    },
    {
      id: 4,
      title: 'Live Surveillance Begins',
      subtitle: 'Monitoring Team Activates Feed',
      icon: Play,
      desc: 'The SurveilX AI off-site specialist review desk is engaged. Proactive camera observation begins, ensuring security streams flow normally and the localized edge routers maintain encrypted stream delivery protocols 24/7/365.',
      targetUptime: '24/7/365 active loop',
      tagline: 'WATCH_ENGAGEMENT'
    },
    {
      id: 5,
      title: 'Incident Verification',
      subtitle: 'Human Validation Process',
      icon: BadgeCheck,
      desc: 'Whenever computer vision flags threat thresholds (e.g. dwell violations or cashbox status triggers), a remote monitoring specialist reviews the video cut within seconds, validating the incident before waking store managers.',
      targetUptime: '<32 seconds validation',
      tagline: 'HUMAN_VERIFICATION'
    },
    {
      id: 6,
      title: 'Evidence Delivery',
      subtitle: 'Structured Report Dispatched',
      icon: FileHeart,
      desc: 'Confirmed loss files are compiled into secure, tamper-proof PDF folders. Reports highlight chronological event shots, camera indices, text narratives, and loss mitigation recommendations, fully prepped for police or insurers.',
      targetUptime: 'SHA256 seal assigned',
      tagline: 'EVIDENCE_SUCCESS'
    }
  ];

  return (
    <section id="timeline-section" className="py-24 bg-[#050B1A] text-white relative overflow-hidden border-t border-slate-900/60">
      
      {/* Background decorations */}
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand/15 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="h-3.5 w-3.5" /> DEPLOYMENT ROADMAP
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">
            How SurveilX AI Works
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto text-sm md:text-base">
            From initial asset assessment to live 24/7 proactive defense, explore our zero-friction implementation lifecycle.
          </p>
        </div>

        {/* STEPPER HORIZONTAL TABS (Desktop-centric indicator layout) */}
        <div className="relative mb-12 hidden lg:block" id="timeline-stepper">
          {/* Horizontal Progress Line behind circles */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-800 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-[2px] bg-brand -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: `${((activeStep - 1) / 5) * 100}%` }}
          />

          <div className="relative z-10 flex justify-between items-center">
            {steps.map((st) => {
              const StIcon = st.icon;
              const isActive = activeStep === st.id;
              const isPast = activeStep > st.id;

              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStep(st.id)}
                  className="flex flex-col items-center focus:outline-none cursor-pointer group"
                  id={`timeline-st-btn-${st.id}`}
                >
                  <div className={`h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#0B132B] border-brand text-white shadow-lg shadow-red-500/10 scale-110' 
                      : isPast 
                        ? 'bg-brand border-brand text-white' 
                        : 'bg-slate-950 border-slate-800 text-slate-500 group-hover:border-slate-600 group-hover:text-white'
                  }`}>
                    <StIcon className="h-5 w-5" />
                  </div>
                  
                  <span className={`text-[10px] uppercase font-mono font-bold mt-3 tracking-wider transition ${
                    isActive ? 'text-brand' : 'text-slate-500'
                  }`}>
                    Step {st.id}
                  </span>
                  <span className={`text-xs font-semibold mt-1 max-w-[120px] text-center leading-none tracking-tight transition ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}>
                    {st.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE TIMELINE CARD DETAILS */}
        <div className="max-w-4xl mx-auto" id="active-timeline-card">
          {steps.map((st) => {
            if (st.id !== activeStep) return null;
            const StIcon = st.icon;

            return (
              <motion.div
                key={st.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0B132B] border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <StIcon className="h-44 w-44 text-white" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
                  
                  {/* Left block index (3 cols) */}
                  <div className="md:col-span-3 space-y-4">
                    <span className="bg-brand/10 border border-brand/20 text-brand px-3 py-1 rounded text-[10px] tracking-widest font-mono font-extrabold uppercase">
                      {st.tagline}
                    </span>
                    
                    <div className="flex items-center gap-3 md:block md:space-y-2 pt-2">
                      <div className="h-14 w-14 bg-slate-950 text-white border border-slate-800 flex items-center justify-center rounded-2xl">
                        <StIcon className="h-6 w-6 text-brand" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-mono">STAGE CODE</div>
                        <div className="text-sm font-bold text-white font-sans leading-none">Step {st.id} of 6</div>
                      </div>
                    </div>

                    <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-900 text-xs font-mono">
                      <span className="text-slate-500 block text-[9px] uppercase font-bold mb-1">Target Metrics</span>
                      <span className="text-white font-bold">{st.targetUptime}</span>
                    </div>
                  </div>

                  {/* Right block descriptions (9 cols) */}
                  <div className="md:col-span-9 space-y-4">
                    <div>
                      <h3 className="text-lg text-slate-400 font-mono font-bold leading-none">{st.title}</h3>
                      <h4 className="text-2xl font-extrabold font-sans text-white tracking-tight leading-none mt-2">{st.subtitle}</h4>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed font-sans">
                      {st.desc}
                    </p>

                    <div className="pt-4 border-t border-slate-850 flex items-center justify-between">
                      <div className="flex gap-2">
                        {st.id > 1 && (
                          <button
                            onClick={() => setActiveStep(prev => prev - 1)}
                            className="bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 py-2 px-4 rounded-lg hover:border-slate-700 transition"
                            id="btn-timeline-prev"
                          >
                            ← Previous Step
                          </button>
                        )}
                        {st.id < 6 && (
                          <button
                            onClick={() => setActiveStep(prev => prev + 1)}
                            className="bg-brand text-xs font-bold text-white py-2 px-4 rounded-lg hover:bg-brand-dark transition flex items-center gap-1.5"
                            id="btn-timeline-next-btn"
                          >
                            Next Step <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>

                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        SurveilX Security Enforcer v26
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
