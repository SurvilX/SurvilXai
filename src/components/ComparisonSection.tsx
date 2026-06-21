import React from 'react';
import { ShieldX, ShieldCheck, XCircle, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export default function ComparisonSection() {
  const tableData = [
    {
      label: 'Activity Capture Protocol',
      traditional: 'Only records passive footage to hard disk DVR storage.',
      surveilx: 'Continuously processes streams to detect movement & behavior.',
      isSurveilXAdvantage: true,
    },
    {
      label: 'Incident Detection Cycle',
      traditional: 'Requires hours of manual, backward lookup after losses occurs.',
      surveilx: 'Instantly alerts remote verifiers of high-risk actions.',
      isSurveilXAdvantage: true,
    },
    {
      label: 'False Alarm Optimization',
      traditional: 'No filtering. Wind, shadows, or animals trigger alarms.',
      surveilx: 'AI + off-site humans filter out 97.2% of noise.',
      isSurveilXAdvantage: true,
    },
    {
      label: 'Verification & Escalation',
      traditional: 'Left completely to managers, security guards, or police.',
      surveilx: 'Immediate escalation with verified telemetry log.',
      isSurveilXAdvantage: true,
    },
    {
      label: 'Dossier & Prosecution',
      traditional: 'Loose, low-res flash drive exports with unindexed timings.',
      surveilx: 'Structured, certified SHA256 sealed PDF incident packages.',
      isSurveilXAdvantage: true,
    },
    {
      label: 'Multi-Location Operations',
      traditional: 'Extremely difficult to pull streams from multiple local systems.',
      surveilx: 'Central cloud console links and filters all stores instantly.',
      isSurveilXAdvantage: true,
    },
  ];

  return (
    <section id="comparison-section" className="py-24 bg-white text-navy relative overflow-hidden border-t border-slate-100">
      
      {/* Visual backgrounds */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-red-50 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="h-3.5 w-3.5" /> SYSTEM COMPARISON
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight font-sans">
            Built for Businesses That <br className="hidden md:block font-sans" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-rose-600 to-indigo-900">
              Need More Than Recording
            </span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-lg mx-auto text-sm md:text-base">
            Understand how SurveilX AI updates obsolete, analog-minded camera vaults into operational, active loss prevention centers.
          </p>
        </div>

        {/* COMPARISON COLUMNS (Side-by-Side Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16" id="comparison-side-by-side">
          
          {/* LEFT: Traditional CCTV */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 relative overflow-hidden" id="comp-left-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-200 text-slate-500">
                <ShieldX className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-700 font-sans tracking-tight">Traditional CCTV Systems</h3>
                <p className="text-xs text-slate-500">Passive Recording Vaults</p>
              </div>
            </div>

            <ul className="space-y-4 text-xs text-slate-650 font-sans">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy block">Only records footage</span>
                  Does not actively flag or review patterns, acting as a post-incident archive.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy block">Manual review required</span>
                  Forbids scale. Staff must click through logs manually to find specific frames.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy block">Incidents discovered late</span>
                  Unnoticed shrink adds up to catastrophic totals during annual store counting.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy block">No AI risk scoring</span>
                  Unable to differentiate between customer foot traffic and organized concealment.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy block">No structured evidence</span>
                  Leaves reports to disorganized cell phone exports, resulting in rejected claims.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy block">Difficult multi-location monitoring</span>
                  Each site remains an isolated data silo, necessitating cumbersome local logins.
                </div>
              </li>
            </ul>
          </div>

          {/* RIGHT: SurveilX AI */}
          <div className="bg-[#0B132B] border border-brand/30 rounded-3xl p-6 md:p-8 relative text-white shadow-2xl" id="comp-right-col">
            {/* Top orange gradient block */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 via-transparent to-indigo-500/10 pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 relative">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-red-500/10">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-sans tracking-tight">Active SurveilX AI System</h3>
                <p className="text-xs text-brand font-semibold font-mono tracking-wider">INTUITION & VERIFICATION ENGINE</p>
              </div>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-brand animate-ping" />
            </div>

            <ul className="space-y-4 text-xs text-slate-300 relative font-sans">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <span className="font-extrabold text-white block">AI-Assisted activity detection</span>
                  Algorithms monitor 100% of video layers, parsing behavior risk dynamically.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Live monitoring support</span>
                  Our 24/7 global off-site SecOps analysts conduct real-time observation.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Human verified alerts</span>
                  Ensures only high-risk, confirmed threats are escalated to store personnel.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Faster incident review</span>
                  Filter days of video into relevant product-handling slices in seconds.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Organized evidence reports</span>
                  Securely binds multi-angle shots, comments, and files into audit-ready PDFs.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-white block">Multi-location surveillance workflow</span>
                  A single secure cloud login links regional stores, warehouses, and checkout lines.
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* COMPARATIVE SPECS GRID SHEET */}
        <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-sm" id="comparison-spec-sheet">
          <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-navy">Performance Comparison Details</h4>
          </div>
          <div className="divide-y divide-slate-100">
            {tableData.map((row, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center text-xs">
                <div className="md:col-span-3 font-bold text-navy font-sans tracking-tight">
                  {row.label}
                </div>
                <div className="md:col-span-4 text-slate-500 font-sans">
                  {row.traditional}
                </div>
                <div className="md:col-span-12 lg:col-span-5 font-semibold text-slate-700 bg-brand/5 border border-brand/10 p-2.5 rounded-lg font-sans">
                  <span className="text-brand font-bold uppercase tracking-wider text-[9px] block mb-0.5">SurveilX Advantage</span>
                  {row.surveilx}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
