import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ShieldAlert, Cpu, ChevronRight, Menu, X, UserCheck, PhoneCall, Terminal } from 'lucide-react';
import EmployeePortalModal from './EmployeePortalModal';
import SurvilXLogo from './SurvilXLogo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDefaultTab, setModalDefaultTab] = useState<'login' | 'signup' | 'securityKey'>('login');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openEmployeePortal = (tab: 'login' | 'signup' | 'securityKey' = 'login') => {
    setModalDefaultTab(tab);
    setModalOpen(true);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Solutions', href: '#services-section' },
    { label: 'Technology', href: '#workflow-section' },
    { label: 'Industries', href: '#industries-section' },
    { label: 'About', href: '#about-section' },
    { label: 'Careers', href: '#careers-section' },
    { label: 'Contact', href: '#contact-section' },
    { label: '🛡️ Admin Panel', href: '#admin-console' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Close mobile drawer first to allow layout to settle
    setMobileMenuOpen(false);
    
    // Calculate and perform smooth scroll in the next event loop tick
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const topOffset = 85; // height of sticky header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 80);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050B1A]/95 backdrop-blur-md border-b border-slate-900/60 shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
        id="main-navigation-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, '#home')}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <SurvilXLogo size={44} showPing={true} className="group-hover:scale-105 transition duration-300" />
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-white font-sans tracking-tight leading-none">
                  SurveilX <span className="text-brand">AI</span>
                </span>
                <span className="text-[9px] font-bold text-slate-400 font-mono tracking-widest uppercase mt-0.5">
                  SECURE_MONITORING
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition duration-200 hover:bg-slate-900/30 rounded-lg"
                  id={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
              <span className="h-4 w-[1px] bg-slate-800 mx-2" />
              <button
                onClick={() => openEmployeePortal('login')}
                className="flex items-center gap-1.5 text-slate-300 hover:text-brand px-3 py-2 text-sm font-semibold transition duration-200 rounded-lg group"
                id="header-btn-employee-login"
              >
                <Terminal className="h-4 w-4 text-slate-500 group-hover:text-brand transition" />
                Employee Login
              </button>
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#contact-section"
                onClick={(e) => handleScrollTo(e, '#contact-section')}
                className="text-white border border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-900/40 px-4 py-2 rounded-lg text-xs font-bold transition duration-200"
                id="header-btn-demo"
              >
                Book Demo
              </a>
              <a
                href="#contact-section"
                onClick={(e) => handleScrollTo(e, '#contact-section')}
                className="bg-brand text-white hover:bg-brand-dark px-4 py-2 rounded-lg text-xs font-bold shadow-md shadow-red-500/10 transition duration-200 font-sans flex items-center gap-1"
                id="header-btn-audit"
              >
                Get Free Security Audit <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => openEmployeePortal('login')}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900/40"
                title="Employee Login"
                id="mobile-portal-trigger"
              >
                <Terminal className="h-5 w-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900/40 focus:outline-none"
                id="mobile-hamburger-btn"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-[#050B1A] border-b border-slate-900 overflow-hidden"
              id="mobile-drawer"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="block text-slate-300 hover:text-white py-3 px-4 rounded-xl font-medium hover:bg-slate-900/80 transition duration-200"
                  >
                    {link.label}
                  </a>
                ))}
                
                <span className="block h-[1px] bg-slate-900 my-4" />

                <div className="flex flex-col gap-3 px-4">
                  <button
                    onClick={() => openEmployeePortal('login')}
                    className="flex items-center justify-center gap-2 border border-slate-800 bg-slate-950/40 text-slate-300 hover:text-white py-3 rounded-xl text-sm font-semibold transition"
                  >
                    <Terminal className="h-4 w-4" /> Employee Portal Terminal
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="#contact-section"
                      onClick={(e) => handleScrollTo(e, '#contact-section')}
                      className="block text-center border border-slate-800 text-white py-3 rounded-xl text-xs font-bold transition bg-slate-950/20"
                    >
                      Book Demo
                    </a>
                    <a
                      href="#contact-section"
                      onClick={(e) => handleScrollTo(e, '#contact-section')}
                      className="block text-center bg-brand text-white py-3 rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      Security Audit
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Embedded Employee Portal Modal */}
      <EmployeePortalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTab={modalDefaultTab}
      />
    </>
  );
}
