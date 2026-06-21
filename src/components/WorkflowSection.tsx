import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Cpu, Zap, Eye, FileText, BellRing, ChevronRight, Activity, ArrowDown } from 'lucide-react';

export default function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    {
      id: 1,
      num: '01',
      title: 'Camera Feed',
      icon: Camera,
      badge: 'LIVE INGRESS',
      description: 'Your existing analog, digital, or IP cameras stream secured raw RTSP footage directly into SurveilX edge devices with zero hardware replacements.',
      telemetry: {
        latency: '8.4 ms',
        codec: 'H.265 Secure',
        streamRate: '30 FPS @ 4K'
      }
    },
    {
      id: 2,
      num: '02',
      title: 'AI Video Analysis',
      icon: Cpu,
      badge: 'VISION SYSTEM',
      description: 'Localized neural network layers decode incoming pixel blocks in real-time, mapping movement vectors, skeletal postures, and dwell coordinates.',
      telemetry: {
        layerDepth: '48 blocks',
        tensorRate: '12 Tflops',
        trackingModels: '8 concurrent'
      }
    },
    {
      id: 3,
      num: '03',
      title: 'Risk Detection',
      icon: Zap,
      badge: 'ANESTHETIZED EVAL',
      description: 'Proprietary SurveilX AI evaluates object interactions (e.g. products sliding into jackets or unauthorized after-hours cash drawer touches) yielding a risk probability score.',
      telemetry: {
        threshold: 'Risk > 82%',
        scanZones: 'Custom mapped',
        falseFilter: 'Enforced'
      }
    },
    {
      id: 4,
      num: '04',
      title: 'Human Verification',
      icon: Eye,
      badge: 'HUMAN INTERPRET',
      description: 'Flagged, high-risk segments are instantly routed to trained SurveilX remote monitoring dispatchers for visual confirmation, filtering out mock alarms.',
      telemetry: {
        staffCert: 'SOL-Tier-3',
        avgEscalation: '32 seconds',
        doubleValidation: 'Active'
      }
    },
    {
      id: 5,
      num: '05',
      title: 'Alert & Evidence Report',
      icon: FileText,
      badge: 'INTEGRITY SEAL',
      description: 'Once confirmed, our operators bundle timestamp logs, targeted video cuts, and location telemetry into a structured, tamper-proof SHA256 sealed digital package.',
      telemetry: {
        reportFormat: 'PDF + CJS Video',
        cryptoSignature: 'SHA256 Enforced',
        deliveryStatus: 'SMS/Email/HQ'
      }
    },
    {
      id: 6,
      num: '06',
      title: 'Client Action',
      icon: BellRing,
      badge: 'CRITICAL RESP',
      description: 'Store managers receive high-priority push notifications detailing the incident context, allowing instant floor management intervention, law calling, or insurance filing.',
      telemetry: {
        mobileHook: 'Push Notification',
        payoutRelevance: '99.8%',
        authorityAlert: 'Conditional'
      }
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 6) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="workflow-section" className="py-24 bg-[#050B1A] text-white relative overflow-hidden border-t border-slate-900/60">
      {/* Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-950 to-black -z-10" />
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl -z-10 animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand/10 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-semibold uppercase tracking-wider mb-3">
            <Activity className="h-3.5 w-3.5" /> THE INTELLIGENCE LIFECYCLE
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">
            From Camera Footage to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-rose-500 to-indigo-400">
              Real-Time Security Intelligence
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Our cloud platform ingests feeds, isolates anomalies with localized Vision Networks, and submits certified reports directly to stakeholders in seconds.
          </p>
        </div>

        {/* Step-by-Step Flow Map (Interactive) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="wf-grid">
          
          {/* Left Column: Interactive workflow cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4" id="wf-left-col">
            <div className="grid grid-cols-2 gap-4">
              {steps.map((step) => {
                const StepIcon = step.icon;
                const isActive = activeStep === step.id;

                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveStep(step.id);
                      setIsPlaying(false);
                    }}
                    className={`text-left p-5 rounded-xl border transition-all duration-300 relative group flex flex-col justify-between overflow-hidden ${
                      isActive 
                        ? 'bg-gradient-to-br from-[#0B132B]/80 to-[#1C2541]/40 border-brand shadow-lg shadow-brand/5' 
                        : 'bg-slate-950/60 border-slate-900 text-slate-400 hover:border-slate-800 hover:bg-slate-900/40 hover:text-white'
                    }`}
                    id={`wf-step-btn-${step.id}`}
                  >
                    {/* Corner numeric identifier */}
                    <span className={`absolute top-3 right-3 text-[10px] font-mono font-bold ${
                      isActive ? 'text-brand' : 'text-slate-700'
                    }`}>
                      Stage {step.num}
                    </span>

                    <div>
                      <div className={`h-10 w-10 flex items-center justify-center rounded-lg border mb-4 shadow-sm transition-transform duration-300 ${
                        isActive 
                          ? 'bg-red-500/10 border-brand/35 text-brand scale-105' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:scale-105'
                      }`}>
                        <StepIcon className="h-5 w-5" />
                      </div>
                      
                      <h3 className={`text-base font-bold font-sans tracking-tight mb-2 ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}>
                        {step.title}
                      </h3>
                    </div>

                    {/* Progress slider bar active line */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Integration Flow controls */}
            <div className="flex justify-between items-center bg-slate-950 border border-slate-900 rounded-xl p-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                {isPlaying ? 'AUTOMATIC WORKFLOW DEMO PLAYING' : 'MANUAL CONTROLS ENGAGED'}
              </span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded text-[10px] hover:border-slate-700 hover:bg-slate-800 transition"
              >
                {isPlaying ? 'PAUSE LIFECYCLE ROTATION' : 'RESUME AUTOMATIC DEMO'}
              </button>
            </div>
          </div>

          {/* Right Column: High Fidelity active state monitoring panel (5 cols) */}
          <div className="lg:col-span-5 flex" id="wf-right-col">
            <AnimatePresence mode="wait">
              {steps.map((step) => {
                if (step.id !== activeStep) return null;
                const StepIcon = step.icon;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full bg-[#0B132B]/90 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm shadow-2xl"
                  >
                    {/* Matrix overlay */}
                    <div className="absolute inset-0 bg-radial-gradient(from 50% 50% at 50% 50%, rgba(255, 45, 45, 0.03) 0%, transparent 100%) pointer-events-none" />

                    <div>
                      {/* Badge Header info */}
                      <div className="flex justify-between items-center mb-6 border-b border-slate-800/80 pb-4">
                        <span className="bg-brand/10 border border-brand/20 px-3 py-1 rounded text-[10px] tracking-widest font-mono text-brand font-extrabold uppercase">
                          {step.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-500 tracking-wider uppercase">
                          SEQUENCE ID: #SX-{step.num}-992
                        </span>
                      </div>

                      {/* Main stage icon & title */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="h-14 w-14 shrink-0 bg-brand text-white flex items-center justify-center rounded-2xl border border-brand/20 shadow-md">
                          <StepIcon className="h-7 w-7" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-brand font-bold uppercase tracking-wider">
                            ACTIVE OPERATION STAGE
                          </div>
                          <h3 className="text-xl md:text-2xl font-black font-sans text-white tracking-tight leading-none mt-1">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Rich Description */}
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                        {step.description}
                      </p>

                      {/* Diagnostics list */}
                      <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 space-y-3 font-mono text-xs">
                        <div className="text-slate-500 border-b border-slate-900 pb-1 text-[10px] font-bold tracking-widest uppercase">
                          LIVE STAGE DIAGNOSTICS
                        </div>
                        {Object.entries(step.telemetry).map(([key, val]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-slate-400 font-sans">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span>
                            <span className="text-white font-bold">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Status panel */}
                    <div className="mt-8 pt-4 border-t border-slate-850 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        PIPELINE INTEGRITY SECURE
                      </span>
                      <ChevronRight className="h-4 w-4 text-brand animate-ping" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
