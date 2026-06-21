import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Sparkles, Tv, Shield, FileCheck, Eye } from 'lucide-react';

export default function UseCasesSection() {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const useCases = [
    {
      id: 1,
      tag: 'Shoplifting Detection',
      desc: 'Detect product theft patterns dynamically. Our vision models track items passing from hangers to coat liners in blind aisles, raising risk scores before targets reach the checkout doors.',
      loc: 'Apparel Retail & Micro Markets',
      signal: 'CONCEALMENT_TRIGGERED'
    },
    {
      id: 2,
      tag: 'Employee Theft Review',
      desc: 'Validate operations by comparing transaction receipt streams directly with corresponding video logs to isolate cashier Sweethearting, voided checkouts, and manual drawer overrides.',
      loc: 'Point-of-Sale Terminals',
      signal: 'Sweethearting Void Matching'
    },
    {
      id: 3,
      tag: 'Cash Counter Monitoring',
      desc: 'Identify cashbox status violations. Generates alert logs if cash register trays remain open after transacting, or if an unauthorized staff member accesses POS terminals.',
      loc: 'Cash Counters & Banks',
      signal: 'TILL_STATUS_ABNORMAL'
    },
    {
      id: 4,
      tag: 'Stock Room Activity Tracking',
      desc: 'High-value stockrooms, vaults, and inventory shelves monitor entry schedules, generating alerts if personnel enter storage sectors after designated hours.',
      loc: 'Warehouses & Backrooms',
      signal: 'PERIMETER_CROSS_ALARM'
    },
    {
      id: 5,
      tag: 'Unauthorized Access Detection',
      desc: 'Enforces badge checks on secure entry points. AI detects "tailgating" when an unbadged intruder follows an authorized manager through high-security server rooms.',
      loc: 'Commercial Offices & Gates',
      signal: 'ACCESS_VIOLATION_T4'
    },
    {
      id: 6,
      tag: 'Grab-and-Run Incident Review',
      desc: 'Fast video indexing lets managers isolate raw frame blocks instantly, creating structured evidence folders of grab-and-run thefts for police in under 60 seconds.',
      loc: 'Grocery & C-Stores',
      signal: 'INDEX_SPEED_COMPLETED'
    },
    {
      id: 7,
      tag: 'Suspicious Movement Detection',
      desc: 'Monitors loitering dwell times near ATM machines or high-value cabinets. Vision models differentiate natural shopping dwell from scoping movements.',
      loc: 'Micro Markets & Vaults',
      signal: 'DWELL_CRITICAL_82%'
    },
    {
      id: 8,
      tag: 'Parking Area Monitoring',
      desc: 'Tracks suspicious or idling vehicles at back delivery ramps or employee parking areas during night hours. Connects streams with license capture engines.',
      loc: 'Parking & Outdoors',
      signal: 'ANPR_CAMERA_LOCK'
    },
    {
      id: 9,
      tag: 'After-Hours Surveillance',
      desc: 'Virtual tripwires protect floors during off-hours. SurveilX AI filters out safe cleaning teams, flagging unbadged intrusion to remote verifiers immediately.',
      loc: 'Offices & Cargo Depots',
      signal: 'TRIPWIRE_ZONE_ALERT'
    },
    {
      id: 10,
      tag: 'Camera Offline Alerts',
      desc: 'Schedules continuous system diagnostics, detecting stream dropouts, cable faults, vandalism, or lens obfuscations. Pings IT representatives to maintain security uptime.',
      loc: 'Infrastructure Uptime',
      signal: 'HEARTBEAT_FAULT_DETECT'
    },
    {
      id: 11,
      tag: 'Incident Evidence Preparation',
      desc: 'Compiles encrypted snapshots, timestamp narratives, mult-angle logs, and signed evidence blocks into a certified PDF package ready for court or insurers.',
      loc: 'Legal Authorities Support',
      signal: 'DOSSIER_SHA256_SEALED'
    },
    {
      id: 12,
      tag: 'Multi-Location Monitoring',
      desc: 'Sinks streams into central corporate hubs, letting loss prevention directors administer stores, track compliance, and audit cashier behavior globally.',
      loc: 'Corporate HQ Class Desk',
      signal: 'CLOUD_FEDERATION_OK'
    }
  ];

  const activeObj = useCases[selectedCase];

  return (
    <section id="use-cases-section" className="py-24 bg-white text-navy relative overflow-hidden border-t border-slate-100">
      
      {/* Absolute styling decorations */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-red-50 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
            <Tag className="h-3.5 w-3.5" /> SPECIFIED SCOPES
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight font-sans">
            Security Use Cases We Cover
          </h2>
          <p className="mt-4 text-slate-600 max-w-lg mx-auto text-sm md:text-base">
            Select a security use case below to view how SurveilX AI tracks anomalies, generates real-time telemetry, and prepares evidence.
          </p>
        </div>

        {/* PILL-STYLE FEATURE TAGS */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto mb-12" id="use-cases-pills">
          {useCases.map((uc, i) => (
            <button
              key={uc.id}
              onClick={() => setSelectedCase(i)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                selectedCase === i
                  ? 'bg-brand border-brand text-white shadow-md shadow-brand/10'
                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-705'
              }`}
              id={`pill-${uc.id}`}
            >
              <span className="font-sans">{uc.tag}</span>
            </button>
          ))}
        </div>

        {/* INTERACTIVE USE CASE SCREEN DISPLAY */}
        <div className="max-w-3xl mx-auto" id="use-case-viewer">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCase}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="bg-[#0B132B] rounded-2xl border border-slate-800 p-6 md:p-8 text-white relative overflow-hidden shadow-xl"
            >
              {/* Matrix scan line effect */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand/30 animate-pulse pointer-events-none" />

              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                {/* Left Side: Scope Content */}
                <div className="space-y-4 md:w-3/5">
                  <span className="bg-brand/10 border border-brand/20 text-brand px-2.5 py-1 rounded text-[10px] tracking-widest font-mono font-extrabold uppercase inline-block">
                    {activeObj.signal}
                  </span>
                  <div>
                    <h3 className="text-2xl font-extrabold text-white font-sans tracking-tight leading-none">
                      {activeObj.tag}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1 uppercase">SCOPE PROFILE: // {activeObj.loc}</p>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed font-sans">
                    {activeObj.desc}
                  </p>
                </div>

                {/* Right Side: Mock Monitor Visual */}
                <div className="bg-slate-950 rounded-xl border border-slate-900 p-4 md:w-2/5 flex flex-col justify-between font-mono text-xs">
                  <div className="flex justify-between items-center text-[10px] border-b border-slate-900 pb-2 text-slate-500">
                    <span className="flex items-center gap-1"><Tv className="h-3.5 w-3.5 text-brand" /> MONITOR_FEED</span>
                    <span>ONLINE</span>
                  </div>

                  {/* Micro vector sketch map */}
                  <div className="py-8 text-center space-y-2">
                    <div className="text-brand text-xs font-bold animate-pulse">● FEED STALKING IN PROCESS</div>
                    <div className="w-11/12 mx-auto bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-brand h-full animate-pulse" style={{ width: '82%' }} />
                    </div>
                    <p className="text-[10px] text-slate-500 font-sans leading-tight">Threat probability tracking index active within mapped bounding sectors.</p>
                  </div>

                  <div className="pt-2 border-t border-slate-905 flex justify-between items-center text-[9px] text-slate-400">
                    <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-emerald-400" /> SEALED LOGS</span>
                    <span>SX-SYS-V26</span>
                  </div>
                </div>

              </div>
              
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
