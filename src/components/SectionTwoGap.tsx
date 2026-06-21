import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EyeOff, AlertTriangle, Clock, Archive, ShieldX, TrendingDown, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function SectionTwoGap() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards = [
    {
      id: 1,
      title: 'Missed Suspicious Activity',
      icon: EyeOff,
      problem: 'Employees/guards can only watch a fraction of screens simultaneously, letting subtle, highly organized theft pass unnoticed in blind spots.',
      surveilxImpact: 'Continuous Computer Vision analyzes 100% of camera frames, registering suspicious dwell times and product movements automatically.',
      stat: '94% undetected live action'
    },
    {
      id: 2,
      title: 'Too Much Footage to Review Manually',
      icon: Archive,
      problem: 'Searching through days of static, unindexed recordings to find a 10-second shoplifting file is labor-intensive and mostly abandoned.',
      surveilxImpact: 'Instant event indexing filters footage by motion parameters, cashier lines, or specific entry/exit threshold activity in seconds.',
      stat: 'Average 12 hours wasted per incident'
    },
    {
      id: 3,
      title: 'Delayed Theft Detection',
      icon: Clock,
      problem: 'Shrink or inventory loss is found weeks later during audits, when suspects are long gone and retrieval timelines are expired.',
      surveilxImpact: 'Real-time alert dispatch pushes high-priority feeds to the remote security verification team for diagnostic analysis within minutes.',
      stat: 'Typical 14-day tracking delay'
    },
    {
      id: 4,
      title: 'No Structured Evidence Workflow',
      icon: AlertTriangle,
      problem: 'Incidents are reported to insurers or police via low-res exports, unindexed timestamps, or verbal descriptions, leading to rejected claims.',
      surveilxImpact: 'Automated evidence packaging compiles secure timestamps, annotated screenshots, and tamper-proof logs into an audit-ready PDF.',
      stat: '68% prosecution/claim rejection rate'
    }
  ];

  return (
    <section id="the-gap" className="py-24 bg-white text-navy relative overflow-hidden">
      {/* Dynamic light gradient overlays */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 bg-red-150 border border-brand/25 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldX className="h-3 w-3" /> THE SURVEILLANCE GAP
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              CCTV Alone Is Passive.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-600">
                SurveilX AI Makes It Intelligent.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 text-slate-600 text-sm md:text-base leading-relaxed">
            <p>
              Traditional cameras do not prevent loss—they simply record it. Security guards cannot manage 24/7 feeds manually. SurveilX AI bridges this vital gap, injecting real-time automated analytics and human-in-the-loop review onto your existing camera hardware.
            </p>
          </div>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="gap-cards-container">
          {cards.map((card, i) => {
            const IconComponent = card.icon;
            const isHovered = activeCard === card.id;

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setActiveCard(card.id)}
                onMouseLeave={() => setActiveCard(null)}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isHovered 
                    ? 'border-brand bg-[#0B132B] text-white shadow-xl shadow-red-500/5' 
                    : 'border-slate-100 bg-slate-50/50 text-navy'
                }`}
                id={`gap-card-${card.id}`}
              >
                <div>
                  {/* Card Icon Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`h-12 w-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
                      isHovered ? 'bg-brand text-white shadow-md' : 'bg-red-50 text-brand'
                    }`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className={`text-[10px] font-bold font-mono uppercase px-2.5 py-1 rounded-full ${
                      isHovered ? 'bg-red-500/20 text-brand' : 'bg-red-50 text-red-500'
                    }`}>
                      {card.stat}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight mb-3 font-sans h-14 flex items-center">
                    {card.title}
                  </h3>

                  {/* Problem vs SurveilX */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${
                        isHovered ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        The CCTV Failure:
                      </span>
                      <p className={`text-xs leading-relaxed ${isHovered ? 'text-slate-300' : 'text-slate-600'}`}>
                        {card.problem}
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg border transition-all duration-200 mt-2 ${
                      isHovered 
                        ? 'bg-slate-950/50 border-brand/30' 
                        : 'bg-emerald-50/40 border-emerald-100/50'
                    }`}>
                      <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                        isHovered ? 'text-brand' : 'text-emerald-700'
                      }`}>
                        <CheckCircle2 className="h-3 w-3" /> SurveilX Countermeasure:
                      </span>
                      <p className={`text-[11px] leading-relaxed mt-1 ${isHovered ? 'text-slate-200' : 'text-emerald-900'}`}>
                        {card.surveilxImpact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Micro interaction link */}
                <div className="pt-6 mt-6 border-t border-slate-900/10 flex justify-between items-center text-xs">
                  <span className={`${isHovered ? 'text-brand font-bold' : 'text-slate-400'}`}>
                    Active Protection
                  </span>
                  <span className={`font-mono text-[10px] ${isHovered ? 'text-white' : 'text-slate-400'}`}>
                    ID // 0{card.id}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom banner block */}
        <div className="mt-12 bg-[#0B132B] rounded-2xl p-6 border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 via-transparent to-indigo-500/10 -z-10" />
          
          <div className="flex gap-4 items-center">
            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg bg-red-500/10 text-brand border border-red-500/20">
              <TrendingDown className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <p className="font-sans font-bold text-sm">Convert passive surveillance assets into operational cost savers.</p>
              <p className="text-xs text-slate-400">Deploy custom algorithms on any RTSP network in under 24 hours.</p>
            </div>
          </div>
          
          <a
            href="#contact-section"
            className="shrink-0 bg-brand hover:bg-brand-dark text-white text-xs font-bold font-sans py-2.5 px-5 rounded-lg transition duration-200 text-center w-full md:w-auto"
          >
            Audit System Compatibility
          </a>
        </div>

      </div>
    </section>
  );
}
