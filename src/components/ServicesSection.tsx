import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, ShieldAlert, BadgeCheck, FileCheck2, LayoutDashboard, HeartPulse, Check, Info, ArrowUpRight, Zap, RefreshCw } from 'lucide-react';

export default function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: 'live-monitoring',
      title: 'Live CCTV Monitoring',
      icon: Camera,
      description: 'Continuous proactive review of camera parameters conducted by our certified, off-site surveillance surveillance analysts to intercept incidents as they form.',
      features: [
        'Live camera observation & virtual patrols',
        'Suspicious dwell and behavior tracking',
        'Store floor & point-of-sale surveillance',
        'Main entry and exit flow monitoring',
        'High-density cash counter observation',
        'Outdoor parking & loading dock patrol'
      ],
      metric: 'Dwell tracking accuracy: 99.8%',
      details: 'Certified operators stream priority feeds to confirm suspect behavior within moments. Ideal for crowded lobbies, checkout aisles, and delivery bays.'
    },
    {
      id: 'ai-theft-detection',
      title: 'AI Theft Detection',
      icon: ShieldAlert,
      description: 'Localized neural vision algorithms analyze product and skeletal interactions on live feeds, scoring risk profiles dynamically.',
      features: [
        'Skeletal suspicious behavior detection',
        'Concealment and product-handling alerts',
        'Advanced pixel motion intelligence',
        'Real-time object risk scoring analytics',
        'Digital detection zone bounding boxes',
        'Smart event indexing for timeline search'
      ],
      metric: 'Alert reaction latency: <2.4s',
      details: 'Neural nets detect when items are moved from retail shelves into bags or pockets. Our computer vision tracks complex vectors, flagging actions immediately.'
    },
    {
      id: 'human-verified-alerts',
      title: 'Human Verified Alerts',
      icon: BadgeCheck,
      description: 'Avoid alarm fatigue. Every trigger is dual-filtered: verified by SurveilX computer vision, then confirmed by a live monitoring officer before dispatch.',
      features: [
        'Dual AI + Human-in-the-loop validation',
        'Real verified incident alert dispatch',
        '97.2% reduction in client false alarms',
        'Tiered incident escalation workflows',
        'Priority SMS/Push manager notifications',
        'Direct link to live incident review terminal'
      ],
      metric: 'False alarms minimized by 97.2%',
      details: 'Filters out environmental noise like winds, animals, or shadows, pushing only genuine risks to your security dashboard and phone.'
    },
    {
      id: 'incident-evidence',
      title: 'Incident & Evidence Reports',
      icon: FileCheck2,
      description: 'Classified digital incident packages built automatically, containing raw archives, annotations, and system telemetry to support prosecution.',
      features: [
        'Timestamped, chronologically annotated logs',
        'Integrated multi-camera angle sources',
        'Tamper-proof evidence summaries',
        'High-resolution annotated screenshots',
        'Secured vector video download clips',
        'Actionable loss prevention advice'
      ],
      metric: '99.4% insurance claim success',
      details: 'Our evidence dossiers are fully ready for legal authorities, giving you structured support for insurance submittals and police reports.'
    },
    {
      id: 'multi-location',
      title: 'Multi-Location Surveillance',
      icon: LayoutDashboard,
      description: 'Command and control countless regional branch complexes seamlessly inside a single enterprise cloud interface.',
      features: [
        'Unified location-wise camera listing',
        'Central HQ master security desk',
        'Intelligent site-level priority routing',
        'Store-by-store loss statistics dashboards',
        'Granular team authorization settings',
        'Cross-location suspect indexing search'
      ],
      metric: 'Supports up to 10k camera nodes',
      details: 'Compare branch risk scores, run cross-store audits, and administer user access tiers for global loss prevention operations effortlessly.'
    },
    {
      id: 'camera-health',
      title: 'Camera Health Monitoring',
      icon: HeartPulse,
      description: 'Continuous backend telemetry checkup routines ensuring your diagnostic hardware maintains active stream status 24/7/365.',
      features: [
        'Online/offline connectivity checker',
        'Intelligent monitoring schedules',
        'Automated network outage escalation',
        'Remote diagnostic stream repair attempts',
        'Daily hardware health summary reports',
        'Vandalism and lens occlusion alerts'
      ],
      metric: 'Uptime guarantee: 99.9%',
      details: 'Provides alerts if a camera is disconnected, lens is blocked, or focus is corrupted, preventing dead angles when incidents occur.'
    }
  ];

  return (
    <section id="services-section" className="py-24 bg-white text-navy relative overflow-hidden border-t border-slate-100">
      {/* Visual Accents */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-1.5 bg-red-50 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="h-3.5 w-3.5" /> SECURITY CAPABILITIES
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight font-sans">
            Complete AI Surveillance & <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-red-600 to-indigo-900">
              Monitoring Services
            </span>
          </h2>
          <p className="mt-4 text-slate-600 font-sans max-w-xl mx-auto text-sm md:text-base">
            Equip your enterprise security team with specialized surveillance modules custom-tuned to address retail shrink, compliance, and multi-location logistics.
          </p>
        </div>

        {/* 6 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {services.map((service) => {
            const IconComp = service.icon;

            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -6 }}
                className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden cursor-pointer"
                id={`service-card-${service.id}`}
              >
                {/* Red outline hover accent */}
                <div className="absolute inset-0 border border-transparent group-hover:border-brand/45 rounded-2xl pointer-events-none transition-all duration-300" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-brand/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Top Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#0B132B] text-white group-hover:bg-brand group-hover:scale-105 transition-all duration-300 shadow-md">
                      <IconComp className="h-6 w-6" />
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold bg-[#0B132B]/5 text-[#0B132B] px-2.5 py-1 rounded-full">
                      {service.metric}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-extrabold text-[#0B132B] tracking-tight leading-tight mb-3 font-sans">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6 h-16 overflow-hidden text-ellipsis">
                    {service.description}
                  </p>

                  <span className="block h-[1px] bg-slate-100 mb-5" />

                  {/* Feature Checklist */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      Included Capabilities
                    </span>
                    <ul className="space-y-2.5 text-xs text-slate-700">
                      {service.features.slice(0, 4).map((feat, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <span className="h-4 w-4 shrink-0 rounded-full bg-red-50 text-brand flex items-center justify-center p-0.5">
                            <Check className="h-3 w-3 font-bold" />
                          </span>
                          <span className="font-medium font-sans leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Trigger */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(service.id)}
                    className="text-xs font-bold text-brand hover:text-brand-dark flex items-center gap-1 transition"
                  >
                    View System Specs <Info className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-brand transition">
                    SX-SPEC-{service.id.substring(0, 3).toUpperCase()}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Modal / Expanded Spec overlay */}
        <AnimatePresence>
          {selectedService && (() => {
            const serviceObj = services.find(s => s.id === selectedService);
            if (!serviceObj) return null;
            const IconObj = serviceObj.icon;

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedService(null)}
                  className="fixed inset-0 bg-[#050B1A]/80 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl border border-slate-100 max-w-lg w-full p-6 md:p-8 shadow-2xl relative z-10 text-navy"
                >
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-navy transition"
                  >
                    ✕
                  </button>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 bg-[#0B132B] text-white flex items-center justify-center rounded-lg shadow-md">
                      <IconObj className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-lg text-navy font-sans tracking-tight">{serviceObj.title}</h4>
                      <p className="text-xs text-brand font-semibold font-mono tracking-wider">{serviceObj.metric}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                    {serviceObj.details}
                  </p>

                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                      Complete Capability Checklist:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {serviceObj.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-tight">
                          <Check className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="flex-1 border border-slate-200 hover:border-slate-300 text-slate-700 transition font-sans py-2.5 rounded-lg text-sm font-semibold"
                    >
                      Close Specs
                    </button>
                    <a
                      href="#contact-section"
                      onClick={() => setSelectedService(null)}
                      className="flex-1 bg-brand hover:bg-brand-dark text-white text-center py-2.5 rounded-lg text-sm font-semibold transition"
                    >
                      Audit This Service
                    </a>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </AnimatePresence>

      </div>
    </section>
  );
}
