import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SectionTwoGap from './components/SectionTwoGap';
import WorkflowSection from './components/WorkflowSection';
import ServicesSection from './components/ServicesSection';
import CommandCenterDashboard from './components/CommandCenterDashboard';
import IndustryCardsSection from './components/IndustryCardsSection';
import SectionSevenIntelligence from './components/SectionSevenIntelligence';
import ComparisonSection from './components/ComparisonSection';
import TimelineSection from './components/TimelineSection';
import UseCasesSection from './components/UseCasesSection';
import AboutUsSection from './components/AboutUsSection';
import CareersSection from './components/CareersSection';
import InteractiveContact from './components/InteractiveContact';
import EmployeePortalModal from './components/EmployeePortalModal';
import SurvilXLogo from './components/SurvilXLogo';
import AdminPanelSection from './components/AdminPanelSection';

import { Shield, ShieldCheck, Mail, MapPin, Phone, ExternalLink, Zap, Terminal } from 'lucide-react';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'login' | 'signup' | 'securityKey'>('login');
  

  const openPortalWithTab = (tab: 'login' | 'signup' | 'securityKey') => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
    <div className="bg-white text-navy font-sans antialiased selection:bg-brand selection:text-white" id="root-app-viewport">
      
      {/* Sticky top navigation header */}
      <Header />

      {/* Hero area */}
      <Hero />

      {/* Section 2: THE GAP - CCTV vs SurveilX AI */}
      <SectionTwoGap />

      {/* Section 3: Animated workflow steps 01-06 */}
      <WorkflowSection />

      {/* Section 5: Real-time Cloud CommandCenter interactive dashboard */}
      <CommandCenterDashboard />

      {/* Section 4: Complete AI Surveillance services */}
      <ServicesSection />

      {/* Section 6: High-risk environments case cards */}
      <IndustryCardsSection />

      {/* Section 7: System intelligence values */}
      <SectionSevenIntelligence />

      {/* Section 8: Traditional vs SurveilX AI side-by-side metrics */}
      <ComparisonSection />

      {/* Section 9: Stepper implementation timeline stages */}
      <TimelineSection />

      {/* Section 10: Pill-style security use-cases */}
      <UseCasesSection />

      {/* Section 11: About Us details */}
      <AboutUsSection />

      {/* Careers Section */}
      <CareersSection />

      {/* Section 12: Premium Call to Action (CTA) Banner */}
      <section className="py-24 bg-[#050B1A] text-white relative overflow-hidden border-t border-slate-900/60" id="cta-banner-accent">
        {/* Vector coordinates overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#FF2D2D04_1px,transparent_1px),linear-gradient(to_bottom,#FF2D2D04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1 bg-brand/15 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5" /> SECURE YOUR PROPERTY TODAY
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-sans">
            Upgrade Your CCTV Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-600">
              AI-Powered Protection
            </span>
          </h2>

          <p className="text-slate-350 text-sm md:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Book a free security audit and discover how SurveilX AI can help protect your business through live monitoring, AI-assisted detection, and structured incident reporting.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="#contact-section"
              onClick={(e) => handleScrollToSection(e, '#contact-section')}
              className="bg-brand hover:bg-brand-dark text-white font-bold py-3.5 px-8 rounded-xl text-xs sm:text-sm shadow-md shadow-brand/20 transition-all duration-200"
            >
              Get Free Security Audit
            </a>
            
            <a
              href="#contact-section"
              onClick={(e) => handleScrollToSection(e, '#contact-section')}
              className="bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold border border-slate-800 py-3.5 px-7 rounded-xl text-xs sm:text-sm transition duration-200"
            >
              Book Demo
            </a>
          </div>
        </div>
      </section>

      {/* Section 13: Request audit form questionnaire */}
      <InteractiveContact />

      {/* Section 14: Secure Admin Panel */}
      <AdminPanelSection />

      {/* ENTERPRISE COMPREHENSIVE FOOTER */}
      <footer className="bg-[#050B1A] text-slate-400 font-sans border-t border-slate-900/60 pt-20 pb-10 relative overflow-hidden" id="central-footer-block">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
            
            {/* COLUMN 1: Brand & Contact Info (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <a
                href="#home"
                onClick={(e) => handleScrollToSection(e, '#home')}
                className="inline-flex items-center gap-2.5 group"
              >
                <SurvilXLogo size={42} showPing={false} className="group-hover:scale-105 transition duration-300" />
                <span className="text-lg font-extrabold text-white">SurveilX <span className="text-brand">AI</span></span>
              </a>

              <p className="text-xs text-slate-450 leading-relaxed max-w-sm">
                SurveilX AI provides AI-powered CCTV monitoring, theft protection, video intelligence, live surveillance, and loss prevention support for modern businesses.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['AI Video Intelligence', 'Live Monitoring', 'Theft Protection', 'Evidence Reporting'].map((tag) => (
                  <span key={tag} className="bg-slate-950 border border-slate-900 text-slate-500 rounded px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Registration / Location metadata */}
              <div className="space-y-2 pt-2 border-t border-slate-910 text-xs text-slate-500 font-mono">
                <div className="font-extrabold text-white text-[10px] uppercase tracking-widest mb-1.5">SURVEILX AI LTD</div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-slate-655 mt-0.5 shrink-0" />
                  <span>Suite 450, 100 SecOps Plaza, Silicon Gateway, CA 94107</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-655 shrink-0" />
                  <span>+1 (800) 555-SURVEILX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-655 shrink-0" />
                  <a href="mailto:help.survilxai@outlook.com" className="hover:text-white transition">help.survilxai@outlook.com</a>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Technology Details Link Lists (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-extrabold text-xs text-white uppercase tracking-wider font-mono">Enterprise Platform</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#workflow-section" onClick={(e) => handleScrollToSection(e, '#workflow-section')} className="hover:text-white transition">Vision Core Layers</a></li>
                <li><a href="#services-section" onClick={(e) => handleScrollToSection(e, '#services-section')} className="hover:text-white transition">CCTV Live Patrols</a></li>
                <li><a href="#demo-section" onClick={(e) => handleScrollToSection(e, '#demo-section')} className="hover:text-white transition">Threat Control Centers</a></li>
                <li><a href="#timeline-section" onClick={(e) => handleScrollToSection(e, '#timeline-section')} className="hover:text-white transition">Edge Router Mapping</a></li>
                <li><a href="#about-section" onClick={(e) => handleScrollToSection(e, '#about-section')} className="hover:text-white transition">Corporate About</a></li>
                <li><a href="/terms" className="hover:text-white transition flex items-center gap-1">Terms of Usage <ExternalLink className="h-3 w-3 inline text-slate-600" /></a></li>
              </ul>
            </div>

            {/* COLUMN 3: Industries Case Link Lists (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-extrabold text-xs text-white uppercase tracking-wider font-mono">Target Segments</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#industries-section" onClick={(e) => handleScrollToSection(e, '#industries-section')} className="hover:text-white transition">Grocery Markets</a></li>
                <li><a href="#industries-section" onClick={(e) => handleScrollToSection(e, '#industries-section')} className="hover:text-white transition">Convenience Registers</a></li>
                <li><a href="#industries-section" onClick={(e) => handleScrollToSection(e, '#industries-section')} className="hover:text-white transition">Automated Markets</a></li>
                <li><a href="#industries-section" onClick={(e) => handleScrollToSection(e, '#industries-section')} className="hover:text-white transition">Logistics Warehouses</a></li>
                <li><a href="#careers-section" onClick={(e) => handleScrollToSection(e, '#careers-section')} className="hover:text-white transition font-bold text-brand">Careers Specialist</a></li>
                <li><a href="/privacy" className="hover:text-white transition flex items-center gap-1">File Privacy Code <ExternalLink className="h-3 w-3 inline text-slate-600" /></a></li>
              </ul>
            </div>

            {/* COLUMN 4: STAFF PORTAL & MASTER CTAS (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="font-extrabold text-xs text-white uppercase tracking-wider font-mono">Staff Terminals Portal</h4>
              
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 space-y-3">
                <p className="text-[11px] text-slate-400 leading-normal leading-relaxed">
                  Authentication access controls for off-site verifiers, security operators, and LP directors.
                </p>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => openPortalWithTab('login')}
                    className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 py-1.5 rounded text-[10px] font-mono flex items-center justify-center gap-1 transition"
                  >
                    <Terminal className="h-3.5 w-3.5 text-brand" /> Employee Login Terminal
                  </button>
                  <button
                    onClick={() => openPortalWithTab('signup')}
                    className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-350 py-1.5 rounded text-[10px] font-mono flex items-center justify-center gap-1 transition"
                  >
                    New Employee Signup
                  </button>
                  <button
                    onClick={() => openPortalWithTab('securityKey')}
                    className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 py-1.5 rounded text-[10px] font-mono flex items-center justify-center gap-1 transition"
                  >
                    Setup Physical USB Key Handshake
                  </button>
                </div>
              </div>

              {/* Direct Footer audit trigger button */}
              <a
                href="#contact-section"
                onClick={(e) => handleScrollToSection(e, '#contact-section')}
                className="w-full block text-center bg-brand hover:bg-brand-dark text-white py-2.5 rounded-lg text-xs font-bold transition duration-200 shadow-md font-sans uppercase tracking-wider"
              >
                Get Free Security Audit
              </a>
            </div>

          </div>

          {/* BOTTOM COPYRIGHT LINKS ROW */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
            <div>
              © 2026 SurveilX AI. All rights reserved. SHA256 Secured.
            </div>
            
            <div className="flex flex-wrap gap-4 text-[10px] tracking-tight">
              <a href="#services-section" onClick={(e) => handleScrollToSection(e, '#services-section')} className="hover:text-white transition">AI Video Intelligence</a>
              <span>•</span>
              <a href="#services-section" onClick={(e) => handleScrollToSection(e, '#services-section')} className="hover:text-white transition">Live Monitoring</a>
              <span>•</span>
              <a href="#services-section" onClick={(e) => handleScrollToSection(e, '#services-section')} className="hover:text-white transition">Theft Protection</a>
              <span>•</span>
              <a href="#services-section" onClick={(e) => handleScrollToSection(e, '#services-section')} className="hover:text-white transition">Evidence Reporting</a>
            </div>
          </div>

        </div>

      </footer>

      {/* Global Embedded Portal Trigger */}
      <EmployeePortalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTab={modalTab}
      />

    </div>
  );
}
