import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/supabase';
import { 
  Briefcase, MapPin, Send, CheckCircle2, Clock, Eye, ShieldCheck, 
  Tv, Sparkles, GraduationCap, Wifi, Laptop, Moon, Languages, 
  Home, TrendingUp, Users, Cpu, FileText, Check, Award,
  Camera, Lock, CheckSquare, ChevronRight, User, CircleDot, RefreshCw, PenTool, Star,
  X, Upload, AlertTriangle
} from 'lucide-react';

export default function CareersSection() {
  const [activeTab, setActiveTab] = useState<'info' | 'apply'>('info');
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [activeCamAngle, setActiveCamAngle] = useState<number>(0);
  const [liveRisk, setLiveRisk] = useState<number>(88);
  const [isCctvAlerting, setIsCctvAlerting] = useState<boolean>(true);

  // LOGIN vs ONBOARDING flow states
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedInEmployee, setLoggedInEmployee] = useState<any>(null);

  // Simple Careers Form state fields
  const [applyFullName, setApplyFullName] = useState<string>('');
  const [applyPhone, setApplyPhone] = useState<string>('');
  const [applyEmail, setApplyEmail] = useState<string>('');
  const [applyCityState, setApplyCityState] = useState<string>('');
  const [uploadedResumeName, setUploadedResumeName] = useState<string>('');
  const [isSubmittingApply, setIsSubmittingApply] = useState<boolean>(false);

  // Employee Login form inputs
  const [loginEmployeeId, setLoginEmployeeId] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // STEP 1: Account Creation fields
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');
  const [confirmPasswordField, setConfirmPasswordField] = useState<string>('');
  const [accountError, setAccountError] = useState<string | null>(null);

  // STEP 2: Profile Completion fields
  const [firstNameField, setFirstNameField] = useState<string>('');
  const [lastNameField, setLastNameField] = useState<string>('');
  const [mobileNumberField, setMobileNumberField] = useState<string>('');
  const [addressField, setAddressField] = useState<string>('');
  const [educationField, setEducationField] = useState<string>('Graduate');
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string>('');
  const [profileError, setProfileError] = useState<string | null>(null);

  // STEP 3: Agreement fields
  const [agreementChecked, setAgreementChecked] = useState<boolean>(false);
  const [drawPath, setDrawPath] = useState<string>('');
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [signatureSaved, setSignatureSaved] = useState<boolean>(false);

  // STEP 4: Success Details
  const [generatedEmpCode, setGeneratedEmpCode] = useState<string>('');
  const [copiedCodeCode, setCopiedCodeCode] = useState<boolean>(false);

  // Simulated list of users sync'd with local storage so login works in modal too!
  const [registeredUsers, setRegisteredUsers] = useState<Array<{
    employeeId: string;
    email: string;
    password: string;
    fullName: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    education: string;
    photoUrl: string;
    signaturePath: string;
    completedAt: string;
  }>>(() => {
    return [
      {
        employeeId: 'CAM20260618HUJ0',
        email: 'asd@mail.com',
        password: 'password123',
        fullName: 'jsjf sk',
        firstName: 'jsjf',
        lastName: 'sk',
        phone: '+91 123165456',
        address: 'kfs',
        education: 'Diploma',
        photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
        signaturePath: 'M 15 60 C 50 20, 80 80, 150 40',
        completedAt: '18 June 2026'
      }
    ];
  });

  // Support camera overlay risk logic
  useEffect(() => {
    const riskInterval = setInterval(() => {
      setLiveRisk(() => Math.floor(82 + Math.random() * 15));
    }, 2000);

    const alertToggleInterval = setInterval(() => {
      setIsCctvAlerting((prev) => !prev);
    }, 4000);

    return () => {
      clearInterval(riskInterval);
      clearInterval(alertToggleInterval);
    };
  }, []);

  // Countdown timer for automatic Telegram redirect
  const [countdown, setCountdown] = useState<number>(3);
  useEffect(() => {
    if (onboardingStep === 2) {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.open('https://t.me/survilXAi', '_blank', 'noopener,noreferrer');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [onboardingStep]);

  // File Upload drag states
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sigCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Drawing signature logic with responsive mouse & touch support and accurate aspect-ratio coordinate scaling
  const startDrawing = (clientX: number, clientY: number) => {
    if (!sigCanvasRef.current) return;
    const canvas = sigCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Apply elegant burgundy ink styling matching the company brand
    ctx.strokeStyle = '#881337'; 
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsSigning(true);
    setDrawPath(`M ${x} ${y}`);
  };

  const draw = (clientX: number, clientY: number) => {
    if (!isSigning || !sigCanvasRef.current) return;
    const canvas = sigCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.lineTo(x, y);
    ctx.stroke();
    setDrawPath((prev) => prev ? `${prev} L ${x} ${y}` : `M ${x} ${y}`);
  };

  const stopDrawing = () => {
    setIsSigning(false);
  };

  const clearSignature = () => {
    if (!sigCanvasRef.current) return;
    const canvas = sigCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawPath('');
    setSignatureSaved(false);
  };

  const saveSignature = () => {
    if (drawPath !== '') {
      setSignatureSaved(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.size <= 4 * 1024 * 1024) { 
        // Read file as object URL to display passport preview
        const url = URL.createObjectURL(file);
        setUploadedPhotoUrl(url);
      } else {
        alert("File size exceeds 4MB limit.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size <= 4 * 1024 * 1024) { 
        const url = URL.createObjectURL(file);
        setUploadedPhotoUrl(url);
      } else {
        alert("File size exceeds 4MB limit.");
      }
    }
  };

  const handleScrollToPortal = () => {
    setActiveTab('apply');
    const el = document.getElementById('applicant-portal-stage');
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

  // 12 Requirements Checklist items from Screenshot
  const roleChecklist = [
    'Monitor live CCTV camera feeds',
    'Observe suspicious activity',
    'Report unusual behavior or incidents',
    'Follow company monitoring guidelines',
    'Attend mandatory Zoom webinar',
    'Complete training process',
    'Maintain discipline and professionalism',
    'Work from a quiet environment'
  ];

  // Requirements Grid 6 from Screenshot
  const requirementsGrid = [
    {
      id: 'edu',
      title: 'Education',
      desc: 'Minimum 12th pass or a graduate degree.',
      icon: GraduationCap
    },
    {
      id: 'lang',
      title: 'Language',
      desc: 'Basic English / Hindi reading and writing skills.',
      icon: Languages
    },
    {
      id: 'net',
      title: 'Internet',
      desc: 'Stable connection, minimum 10 Mbps recommended.',
      icon: Wifi
    },
    {
      id: 'equip',
      title: 'Equipment',
      desc: 'Own laptop or desktop with a webcam.',
      icon: Laptop
    },
    {
      id: 'shift',
      title: 'Shifts',
      desc: 'Comfortable with flexible / night monitoring hours.',
      icon: Moon
    },
    {
      id: 'focus',
      title: 'Attention',
      desc: 'Strong observation skills and attention to detail.',
      icon: Eye
    }
  ];

  // Perks Grid 6 from Screenshot
  const perksGrid = [
    {
      id: 'sal',
      title: '₹35,000 / month',
      desc: 'Competitive salary paid on time, every month.',
      icon: IndianRupeePill
    },
    {
      id: 'rem',
      title: '100% Work From Home',
      desc: 'No commute — work from anywhere in India.',
      icon: Home
    },
    {
      id: 'train',
      title: 'Free Paid Training',
      desc: 'Comprehensive training on our monitoring platform.',
      icon: GraduationCap
    },
    {
      id: 'grow',
      title: 'Career Growth',
      desc: 'Clear path to Team Lead and Management roles.',
      icon: TrendingUp
    },
    {
      id: 'team',
      title: 'Supportive Team',
      desc: 'Friendly culture with manager support during shifts.',
      icon: Users
    },
    {
      id: 'tech',
      title: 'Cutting-Edge Tech',
      desc: 'Work with the latest AI and video-analytics tools.',
      icon: Cpu
    }
  ];

  // Steps Grid 4 from Screenshot
  const stepsGrid = [
    {
      step: '01',
      title: 'Apply Online',
      desc: 'Fill the short application with your basic details. It takes about 2 minutes.',
      icon: FileText
    },
    {
      step: '02',
      title: 'Complete Profile',
      desc: 'Set up your profile with personal details, education info and a passport photo.',
      icon: User
    },
    {
      step: '03',
      title: 'Sign Agreement',
      desc: 'Review and sign your employment agreement digitally on our secure portal.',
      icon: PenTool
    },
    {
      step: '04',
      title: 'Start Working',
      desc: 'Receive your unique Employee ID and begin your paid training immediately.',
      icon: ShieldCheck
    }
  ];

  // Testimonial Stream Logs
  const testimonials = [
    {
      name: 'Priya R.',
      role: 'Monitoring Analyst',
      duration: '8 months',
      avatar: 'PR',
      quote: '"I was nervous about work-from-home jobs, but the onboarding was completely transparent. I signed my agreement online and got my Employee ID the same day. Salary has always been on time."'
    },
    {
      name: 'Amit K.',
      role: 'Senior Analyst',
      duration: '1 year',
      avatar: 'AK',
      quote: '"The training was genuinely free and detailed. I had zero experience with surveillance before. Now I lead a small shift team. The growth here is real."'
    },
    {
      name: 'Sneha N.',
      role: 'Monitoring Analyst',
      duration: '6 months',
      avatar: 'SN',
      quote: '"What built my trust was the secure login with a hardware key and a proper signed agreement. It feels like a real company, not a random gig."'
    }
  ];

  return (
    <section id="careers-section" className="bg-[#050B1A] text-white relative overflow-hidden border-t border-slate-900/65">
      
      {/* 2D Mesh Net Decorator Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FF2D2D03_1px,transparent_1px),linear-gradient(to_bottom,#FF2D2D03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Decorative Orbs */}
      <div className="absolute top-[5%] left-[10%] w-[450px] h-[450px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[5%] w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[130px] pointer-events-none" />

      {/* 1. HERO BLOCK: Join SurveilX AI Protecting Thousands of Stores */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero side (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Recruiting now in India Banner */}
            <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-slate-800 rounded-full px-4 py-1.5 shadow-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-350 tracking-wide font-sans">
                Now Hiring in India · Remote
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-loose font-sans">
              Join the Team <br className="hidden md:inline" />
              Protecting <span className="text-brand">Thousands <br className="md:hidden" /> of Stores</span>
            </h2>

            <p className="text-slate-350 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-sans font-medium">
              SurveilX AI uses AI to help catch retail theft in real time. Become a Remote Video Surveillance Analyst and make a direct impact on loss prevention — all from the comfort of your home.
            </p>

            {/* Quick Currency Highlight Pill */}
            <div className="inline-flex items-center gap-3 bg-[#0B132B] border border-slate-800 p-3.5 pr-6 rounded-2xl shadow-xl">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-red-500/15">
                <span className="font-extrabold text-xl">₹</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base font-extrabold text-white leading-tight font-sans">₹35,000</span>
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider uppercase">per month + benefits</span>
              </div>
            </div>

            {/* Active Action Controls */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={handleScrollToPortal}
                className="bg-brand hover:bg-brand-dark text-white font-bold py-3.5 px-8 rounded-xl text-sm shadow-lg shadow-red-500/10 hover:scale-101 transition duration-200 cursor-pointer"
              >
                Apply Now →
              </button>
              
              <button
                onClick={() => {
                  const element = document.getElementById('about-role-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="bg-[#0B132B]/60 border border-slate-800 text-slate-300 font-bold py-3.5 px-6 rounded-xl text-sm hover:text-white transition duration-200 cursor-pointer"
              >
                Learn About Role
              </button>
            </div>

            {/* Footer specifications tags */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              {['Work From Home', 'Full Time', 'Remote', 'No Experience Needed'].map((tag) => (
                <span 
                  key={tag} 
                  className="bg-slate-900/60 border border-slate-800 text-slate-400 rounded-lg px-3 py-1.5 text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>

          {/* Right Hero Live Surveillance Simulator Frame (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <div className="w-full bg-[#0B132B]/90 border border-slate-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand to-red-400" />
              
              {/* Header tags */}
              <div className="flex justify-between items-center text-xs font-mono pb-3.5 mb-4 border-b border-slate-800/80 text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                  Live Monitoring Dashboard
                </span>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </div>
              </div>

              {/* CCTV Render Frame Grid container */}
              <div className="bg-black aspect-video rounded-2xl overflow-hidden relative border border-slate-900 group">
                
                {/* Scanner scanlines */}
                <div className="absolute inset-0 bg-linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.23) 50%), linear-gradient(90deg, rgba(255, 45, 45, 0.04), rgba(0, 0, 255, 0.02)); bg-[size:100%_4px,6px_100%] pointer-events-none opacity-40" />

                {/* Simulated store feed camera image */}
                <img 
                  src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=600&auto=format&fit=crop" 
                  alt="Simulated retail CCTV channel 04" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />

                {/* Intelligent Computer Vision UI overlays */}
                <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none">
                  
                  {/* Streaming status indicator top */}
                  <div className="flex justify-between items-start">
                    <span className="bg-black/80 text-xs px-2.5 py-1 rounded-md text-emerald-400 border border-emerald-950 font-bold flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      LIVE • CAM 04
                    </span>
                    <span className="bg-black/75 text-[10px] px-2 py-0.5 rounded text-slate-400">
                      SECURE STREAM // 98.4fps
                    </span>
                  </div>

                  {/* Bounding classification vectors */}
                  <div className="relative flex-1 flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.03, 1],
                        borderColor: ['#FF2D2D', '#EF4444', '#FF2D2D']
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute left-6 top-4 w-32 h-20 border-2 border-brand bg-brand/5 rounded-xl p-1.5 flex flex-col justify-between"
                    >
                      <div className="flex justify-between text-[9px] font-mono font-extrabold text-brand">
                        <span>SUSPECT__ACTION</span>
                        <span>{liveRisk}%</span>
                      </div>
                      <span className="text-[8px] font-mono text-slate-400 block tracking-tight">AISLE 3 CONCEAL</span>
                    </motion.div>

                    <div className="absolute right-10 bottom-2 w-20 h-10 border border-emerald-500 bg-emerald-500/10 rounded-lg p-1">
                      <span className="text-[8px] font-mono text-emerald-400 block font-bold leading-none">CASH_BOX_OK</span>
                    </div>
                  </div>

                  {/* Suspicious Warning Indicator alert footer block from screenshot 1 */}
                  <AnimatePresence>
                    {isCctvAlerting && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-black/90 p-2.5 rounded-xl border border-red-500/40 text-[10px] flex items-center gap-2.5 text-slate-100"
                      >
                        <div className="h-5 w-5 rounded-full border border-red-500 flex items-center justify-center bg-red-500/10 shrink-0">
                          <span className="text-red-500 font-extrabold font-mono text-[10px]">i</span>
                        </div>
                        <div className="flex-1 text-left font-sans">
                          <p className="font-extrabold text-white text-[11px] leading-tight">Suspicious activity detected</p>
                          <p className="text-slate-400 text-[10px] leading-tight">Self-checkout area · verifying now</p>
                        </div>
                        <span className="text-red-400 font-mono text-[9px] uppercase tracking-wider animate-pulse font-extrabold shrink-0">ESC_T4</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </div>

              {/* Dashboard telemetry stats row */}
              <div className="mt-4 grid grid-cols-3 gap-2.5 text-center font-mono text-xs">
                <div className="bg-slate-950/65 p-2 rounded-xl border border-slate-900 text-left">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Threat Index</span>
                  <span className="font-extrabold text-brand mt-0.5 text-sm block">{liveRisk}% RISK</span>
                </div>
                <div className="bg-slate-950/65 p-2 rounded-xl border border-slate-900 text-left">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Diagnostics</span>
                  <span className="font-extrabold text-emerald-400 mt-0.5 text-sm block">12/12 SAFE</span>
                </div>
                <div className="bg-slate-950/65 p-2 rounded-xl border border-slate-900 text-left">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Escalations</span>
                  <span className="font-extrabold text-brand mt-0.5 text-sm block">ACTIVE</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 2. YOUR ROLE SECTION: Remote Video Surveillance Analyst */}
      <div id="about-role-section" className="bg-white text-navy py-24 relative overflow-hidden border-t border-slate-100">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Premium laptop mockup workspace from screenshot 2 */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 p-3">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=610&auto=format&fit=crop" 
                  alt="Modern clean remote office workplace workspace setup"
                  referrerPolicy="no-referrer"
                  className="rounded-2xl w-full h-[360px] object-cover"
                />
                
                {/* Floating holographic card representing 100% Remote work */}
                <div className="absolute bottom-8 left-8 bg-white text-navy px-5 py-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3.5 max-w-[240px]">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-50 text-brand font-bold shrink-0">
                    <Home className="h-5 w-5" />
                  </div>
                  <div className="text-left font-sans">
                    <span className="font-extrabold text-sm block text-navy tracking-tight">100% Remote</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5 leading-tight">Work from anywhere in India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Detailed descriptions and checklist */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Red outline pill badge */}
              <div className="inline-flex items-center gap-1.5 bg-red-50 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider">
                <CircleDot className="h-3 w-3 fill-brand" /> YOUR ROLE
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-navy font-sans tracking-tight leading-none">
                Remote Video Surveillance Analyst
              </h2>

              <p className="text-slate-650 text-sm md:text-base leading-relaxed font-sans font-medium max-w-lg">
                As a Remote Video Surveillance Analyst, you'll be the frontline defender protecting retail stores. Using our AI platform, you'll monitor live feeds, flag suspicious activity, and help reduce theft in real time.
              </p>

              {/* Crimson colored check points list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl">
                {roleChecklist.map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold font-sans">
                    <div className="h-5 w-5 rounded-full bg-red-50 text-brand border border-red-100 flex items-center justify-center p-0.5 shrink-0 mt-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Three detailed pills from screenshot 2 footer */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                <div className="bg-red-50 border border-red-100 text-brand px-4 py-2.5 rounded-full text-xs font-extrabold flex items-center gap-1.5">
                  <span>₹</span> ₹35,000/mo
                </div>
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2.5 rounded-full text-xs font-extrabold flex items-center gap-1.5">
                  <Home className="h-4.5 w-4.5" /> 100% Remote
                </div>
                <div className="bg-[#EEF2F6] border border-slate-200 text-[#4F5E7B] px-4 py-2.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 font-sans">
                  <Clock className="h-4.5 w-4.5" /> Flexible Shifts
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* 3. "WHAT WE NEED" - Requirements Section (6 Grid Cards) */}
      <div className="bg-[#FAFBFD] text-navy py-24 relative overflow-hidden border-t border-slate-100">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 bg-red-50 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
              <CircleDot className="h-3 w-3 fill-brand" /> WHAT WE NEED
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-navy font-sans tracking-tight">
              Requirements
            </h2>
          </div>

          {/* Cards 6 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requirementsGrid.map((req) => {
              const ReqIcon = req.icon;
              return (
                <div 
                  key={req.id}
                  className="bg-white border border-slate-105 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-brand/40 transition duration-300 flex flex-col items-center text-center space-y-4"
                >
                  <div className="h-14 w-14 rounded-full bg-red-50 text-brand flex items-center justify-center border border-red-100">
                    <ReqIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-navy font-sans tracking-tight leading-none">
                    {req.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed max-w-[240px]">
                    {req.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* 4. "PERKS & BENEFITS" - Why You'll Love Working Here (white bg) */}
      <div className="bg-white text-navy py-24 relative overflow-hidden border-t border-slate-100">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Title block */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 bg-red-50 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
              <CircleDot className="h-3 w-3 fill-brand" /> PERKS & BENEFITS
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-navy font-sans tracking-tight text-center">
              Why You'll Love Working Here
            </h2>
          </div>

          {/* Grid list with red circle backdrop white icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perksGrid.map((perk) => {
              const PerkIcon = perk.icon;
              return (
                <div 
                  key={perk.id}
                  className="bg-[#FAFBFD] border border-slate-100 rounded-3xl p-6 flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md hover:border-brand/30 transition duration-300"
                >
                  <div className="h-14 w-14 rounded-full bg-brand text-white flex items-center justify-center shadow-md shadow-brand/15">
                    <PerkIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-navy font-sans tracking-tight leading-none">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed max-w-[240px]">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* 5. "GETTING STARTED" - How to Join SurveilX AI (black/navy bg) */}
      <div className="bg-[#050B1A] text-white py-24 relative overflow-hidden border-t border-slate-900/60">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 bg-brand/15 border border-brand/30 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
              <CircleDot className="h-3 w-3 fill-brand" /> GETTING STARTED
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight font-sans">
              How to Join SurveilX AI
            </h2>
            <p className="mt-3 text-slate-400 text-sm md:text-base max-w-sm mx-auto font-sans">
              A simple 4-step process to start your career.
            </p>
          </div>

          {/* Steps Horizontal Cards with absolute numeric backdrops */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="getting-started-steps-grid">
            {stepsGrid.map((s) => {
              const StepIcon = s.icon;
              return (
                <div 
                  key={s.step}
                  onClick={() => {
                    setActiveTab('apply');
                    setOnboardingStep(parseInt(s.step));
                    const element = document.getElementById('applicant-portal-stage');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="bg-[#0B132B]/70 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-brand/50 transition duration-350 cursor-pointer"
                >
                  {/* Absolute giant sequential step numbers in the background */}
                  <div className="absolute right-3 bottom-0 text-[100px] font-black pointer-events-none select-none text-slate-800/10 tracking-widest leading-none font-sans">
                    {s.step}
                  </div>

                  <div className="h-11 w-11 rounded-xl bg-brand/10 border border-brand/20 text-brand flex items-center justify-center p-2 mb-6 group-hover:scale-105 transition">
                    <StepIcon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-extrabold text-white font-sans tracking-tight mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed relative z-10 max-w-[210px]">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Under step verification badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-400 font-mono">
            {[
              'Secure Digital Agreement', 
              'Verified Employee ID', 
              'Hardware Passkey Login', 
              'On-Time Monthly Salary', 
              'Paid Training'
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <span className="h-4 w-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 p-0.5">
                  <Check className="h-2.5 w-2.5" />
                </span>
                <span>{badge}</span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 6. IMMERSIVE APPLICANT WORKFLOW & VERIFICATION WIZARD PORTAL */}
      <div id="applicant-portal-stage" className="py-24 bg-[#081023] border-t border-slate-900 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-red-650/4 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 relative">
          {/* Main Card Container */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 relative max-w-2xl mx-auto">
            
            <AnimatePresence mode="wait">
              {isLoggedIn ? (
                /* INCREDIBLY BEAUTIFUL ENGAGING EMPLOYEE PORTAL DASHBOARD */
                <motion.div
                  key="employee-dashboard-portal"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="bg-slate-50 min-h-[550px] text-slate-800 flex flex-col text-left"
                >
                  {/* Top Portal Banner bar */}
                  <div className="bg-[#EF4444] text-white p-6 relative">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full border-2 border-white/30 overflow-hidden bg-white/15 shrink-0 flex items-center justify-center">
                          {loggedInEmployee.photoUrl ? (
                            <img 
                              src={loggedInEmployee.photoUrl} 
                              alt="Employee Photo" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <User className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-lg tracking-tight font-sans text-white capitalize leading-none">
                            {loggedInEmployee.fullName || "Remote Analyst"}
                          </h4>
                          <span className="text-xs bg-white/20 border border-white/20 rounded-full py-0.5 px-2.5 inline-block font-mono text-white/90 uppercase tracking-widest mt-1">
                            {loggedInEmployee.employeeId}
                          </span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setIsLoggedIn(false);
                          setLoggedInEmployee(null);
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white rounded-xl py-2 px-4 text-xs font-bold font-sans transition cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-amber-500 to-emerald-500" />
                  </div>

                  <div className="p-6 md:p-8 space-y-6">
                    {/* Status Summary Banner Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block tracking-wider mb-1">
                          Monthly Salary
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-slate-900">₹35,000</span>
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50/70 border border-emerald-100/50 rounded py-0.5 px-1 font-sans">Active</span>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block tracking-wider mb-1">
                          Security Key Status
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                          <span className="text-sm font-bold text-amber-600">Pending Hardware Key</span>
                        </div>
                      </div>
                    </div>

                    {/* Step-by-Step Training Onboarding Progress Tracker */}
                    <div className="bg-amber-50/70 border border-amber-150 rounded-2xl p-4 text-xs text-amber-800 space-y-2">
                      <div className="flex items-center gap-2 font-bold font-sans">
                        <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                        <span>Action Required: Passkey & Onboarding Webinar</span>
                      </div>
                      <p className="leading-relaxed text-amber-900 font-medium font-sans">
                        To unlock active retail surveillance surveillance feeds and receive your official credentials package, you must complete your onboarding webinar.
                      </p>
                    </div>

                    {/* Interactive Widget Items */}
                    <div className="space-y-4">
                      <h5 className="font-extrabold text-xs text-slate-400 font-mono uppercase tracking-widest pl-1">
                        Portal Modules
                      </h5>

                      {/* 1. Webinar Module */}
                      <div className="bg-white border border-slate-150 rounded-2.5xl p-5 shadow-sm space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="bg-red-50 text-red-600 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider font-mono">
                              Onboarding Part 1
                            </span>
                            <h4 className="font-black text-slate-900 text-sm mt-1">
                              Mandatory Zoom Webinar Training
                            </h4>
                          </div>
                          <span className="bg-emerald-50 border border-emerald-100 font-bold text-emerald-600 text-[10px] py-1 px-2.5 rounded-full font-mono uppercase tracking-wider">
                            Scheduled
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-sans leading-relaxed">
                          Your hiring analyst will verify attendance and release CCTV systems keys following the live Q&A session. Complete this before active duty.
                        </p>
                        <a 
                          href="https://t.me/survilXAi" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 bg-[#EF4444] hover:bg-red-600 text-white rounded-xl py-2.5 px-4 text-xs font-bold font-sans transition cursor-pointer"
                        >
                          <Tv className="h-3.5 w-3.5" />
                          Join Telegram to Get Link
                        </a>
                      </div>

                      {/* 2. Hardware Security Key Module */}
                      <div className="bg-white border border-slate-150 rounded-2.5xl p-5 shadow-sm space-y-3">
                        <div>
                          <span className="bg-indigo-50 text-indigo-600 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider font-mono">
                            Onboarding Part 2
                          </span>
                          <h4 className="font-black text-slate-900 text-sm mt-1">
                            Hardware Passkey Registration (FIDO2)
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 font-sans leading-relaxed">
                          For absolute confidentiality of incident data (Rules #4 & #6), a hardware security key (passkey) is required to access company systems. You can use any hardware key from retailers like Amazon.
                        </p>
                        <button 
                          onClick={() => alert("Please connect your hardware USB block / passkey and touch to register...")}
                          className="bg-slate-900 hover:bg-black text-white rounded-xl py-2.5 px-4 text-xs font-bold font-sans transition cursor-pointer flex items-center gap-1.5"
                        >
                          <Lock className="h-3.5 w-3.5 text-indigo-400" />
                          Register Security Key
                        </button>
                      </div>

                      {/* 3. My Profile Information Block */}
                      <div className="bg-white border border-slate-150 rounded-2.5xl p-5 shadow-sm space-y-3">
                        <h4 className="font-black text-slate-900 text-sm">
                          Personal Registry Info
                        </h4>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-sans">
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-bold font-mono">Full Name</span>
                            <span className="font-extrabold text-slate-800 capitalize">{loggedInEmployee.fullName || "Unregistered"}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-bold font-mono">Email Contact</span>
                            <span className="font-extrabold text-slate-800 break-all">{loggedInEmployee.email || "Unregistered"}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-bold font-mono">Mobile Contact</span>
                            <span className="font-extrabold text-slate-800">{loggedInEmployee.phone || "Unregistered"}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-bold font-mono">Education</span>
                            <span className="font-extrabold text-slate-800">{loggedInEmployee.education || "Unregistered"}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-slate-400 block text-[9px] uppercase font-bold font-mono">Surveillance Workstation Address</span>
                            <span className="font-extrabold text-slate-800 block text-[11px] leading-snug">{loggedInEmployee.address || "Unregistered"}</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    <p className="text-[10px] text-center text-slate-400 font-mono">
                      🔒 SurvilX Portal Enforcer Security Session Active. Active Status: 2026-06-18
                    </p>
                  </div>
                </motion.div>
              ) : (
                onboardingStep === 1 ? (
                  <motion.div
                    key="career-application-step1"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white flex flex-col"
                  >
                    {/* RED COMPACT MODAL-LIKE HEADER (IMAGE 1) */}
                    <div className="bg-[#EF4444] text-white p-6 sm:p-8 text-left relative rounded-t-[2.5rem]">
                      
                      {/* Remote Now Hiring Badge */}
                      <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-white text-xs font-bold mb-4 font-sans">
                        <Briefcase className="h-3.5 w-3.5" /> Remote · Now Hiring
                      </div>

                      {/* Main Title and Description */}
                      <h3 className="text-3xl font-black tracking-tight leading-tight font-sans">
                        Apply for the Monitoring Role
                      </h3>
                      <p className="text-slate-100 text-xs sm:text-sm font-medium mt-1 leading-relaxed font-sans mt-2">
                        Fill the form below to start your application.
                      </p>

                      {/* Compensation badge */}
                      <div className="mt-5 inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 py-2.5 px-4 rounded-xl text-sm font-extrabold transition font-sans">
                        <span className="font-sans font-black bg-white text-[#EF4444] h-5 w-5 rounded-full flex items-center justify-center text-[10px] leading-none shrink-0 font-extrabold">₹</span>
                        <span>Earn up to ₹35,000 / month</span>
                      </div>

                    </div>

                    {/* FORM BODY */}
                    <div className="p-6 sm:p-8 md:p-10 text-left space-y-6">
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!applyFullName.trim() || !applyPhone.trim() || !applyEmail.trim() || !applyCityState.trim()) {
                            alert("Please fill all required fields.");
                            return;
                          }
                          setIsSubmittingApply(true);
                          
                          // Simulate API check/register
                          setTimeout(() => {
                            const code = "CAM" + new Date().getFullYear() + Math.random().toString(36).substring(2, 9).toUpperCase();
                            setGeneratedEmpCode(code);
                            
                            // Register in database / localStorage so they exist
                            const newUser = {
                              employeeId: code,
                              email: applyEmail.trim(),
                              password: 'password123',
                              fullName: applyFullName.trim(),
                              firstName: applyFullName.trim().split(' ')[0],
                              lastName: applyFullName.trim().split(' ').slice(1).join(' ') || 'Candidate',
                              phone: applyPhone.trim(),
                              address: applyCityState.trim(),
                              education: 'Graduate',
                              photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
                              signaturePath: 'M 15 60 C 50 20, 80 80, 150 40',
                              completedAt: new Date().toLocaleDateString('en-GB')
                            };
                            setRegisteredUsers(prev => [...prev, newUser]);
                            db.insertEmployee(newUser);
                            db.insertApplicant({
                              id: code,
                              fullName: applyFullName.trim(),
                              email: applyEmail.trim(),
                              phone: applyPhone.trim(),
                              address: applyCityState.trim(),
                              role: 'Security & Monitoring Officer',
                              education: 'Graduate Degree Holder',
                              completedAt: new Date().toLocaleDateString('en-GB'),
                              status: 'Applied'
                            });
                            db.insertKeyLog({
                              email: applyEmail.trim(),
                              action_type: 'Career App Submitted',
                              key_type: `Role: Monitoring, Code: ${code}`,
                              ip_address: applyCityState.trim()
                            });
                            
                            setIsSubmittingApply(false);
                            setOnboardingStep(2);
                          }, 1200);
                        }}
                        className="space-y-5"
                      >
                        {/* Name & Phone in layout (responsive row) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5 text-left">
                            <label className="text-[9.5px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                              YOUR FULL NAME *
                            </label>
                            <input 
                              type="text" 
                              required
                              value={applyFullName}
                              onChange={(e) => setApplyFullName(e.target.value)}
                              placeholder="Your full name"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-4.5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#EF4444] focus:ring-1 focus:ring-[#EF4444] focus:outline-none font-sans font-medium hover:border-slate-300 transition"
                            />
                          </div>

                          <div className="space-y-1.5 text-left">
                            <label className="text-[9.5px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                              TELEPHONE / WHATSAPP *
                            </label>
                            <input 
                              type="text" 
                              required
                              value={applyPhone}
                              onChange={(e) => setApplyPhone(e.target.value)}
                              placeholder="+91 ..."
                              className="w-full rounded-2xl border border-slate-200 bg-white px-4.5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#EF4444] focus:ring-1 focus:ring-[#EF4444] focus:outline-none font-sans font-medium hover:border-slate-300 transition"
                            />
                          </div>
                        </div>

                        {/* Email & CityState row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5 text-left">
                            <label className="text-[9.5px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                              EMAIL ID *
                            </label>
                            <input 
                              type="email" 
                              required
                              value={applyEmail}
                              onChange={(e) => setApplyEmail(e.target.value)}
                              placeholder="you@email.com"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-4.5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#EF4444] focus:ring-1 focus:ring-[#EF4444] focus:outline-none font-sans font-medium hover:border-slate-300 transition"
                            />
                          </div>

                          <div className="space-y-1.5 text-left">
                            <label className="text-[9.5px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                              CITY / STATE *
                            </label>
                            <input 
                              type="text" 
                              required
                              value={applyCityState}
                              onChange={(e) => setApplyCityState(e.target.value)}
                              placeholder="City, State"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-4.5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#EF4444] focus:ring-1 focus:ring-[#EF4444] focus:outline-none font-sans font-medium hover:border-slate-300 transition"
                            />
                          </div>
                        </div>

                        {/* Optional Upload Resume Component */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-[9.5px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                            UPLOAD RESUME / CV (OPTIONAL)
                          </label>
                          <div 
                            onClick={() => {
                              const name = prompt("Enter simulated resume filename (e.g. My_CV.pdf) or leave empty:") || "";
                              if (name) setUploadedResumeName(name);
                            }}
                            className="border border-dashed border-slate-200 bg-[#FAFBFD] hover:bg-slate-50 rounded-2xl p-6 text-center cursor-pointer transition flex flex-col justify-center items-center gap-2 group hover:border-[#EF4444]/40"
                          >
                            <Upload className="h-5 w-5 text-slate-400 group-hover:text-[#EF4444] transition" />
                            <span className="text-slate-550 text-xs font-semibold font-sans">
                              {uploadedResumeName ? `Selected: ${uploadedResumeName}` : "Click to upload (PDF, DOC · max 5MB)"}
                            </span>
                          </div>
                        </div>

                        {/* YELLOW SUBMISSION MANDATORY DETAILS BOX (IMAGE 1) */}
                        <div className="bg-[#FFFDF5] border border-[#FCD34D]/70 rounded-2xl p-4.5 text-xs text-[#854D0E] flex gap-3 text-left">
                          <span className="text-sm shrink-0">⚠️</span>
                          <p className="leading-relaxed font-sans font-semibold text-[11.5px]">
                            After submitting, joining the <strong className="font-extrabold text-[#78350F]">Telegram group is mandatory</strong> to get job details, work profile, salary & hiring details.
                          </p>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button 
                          type="submit"
                          disabled={isSubmittingApply}
                          className="w-full bg-[#EF4444] hover:bg-red-650 text-white font-extrabold py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-150 active:scale-98 disabled:opacity-50"
                        >
                          {isSubmittingApply ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                              <span>Submitting Application...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 shrink-0" />
                              <span>Apply Now</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="career-application-step2-success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="p-8 sm:p-10 md:p-12 text-center bg-white space-y-6"
                  >
                    {/* Huge elegant green checkmark button */}
                    <div className="h-16 w-16 bg-emerald-50 border-4 border-emerald-100 ring-8 ring-emerald-55 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                      <Check className="h-8 w-8" />
                    </div>

                    {/* Heading */}
                    <div className="space-y-1.5">
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug font-sans">
                        Application Submitted Successfully!
                      </h3>
                    </div>

                    {/* Mandate Amber Warning Banner (IMAGE 2 Replica) */}
                    <div className="bg-[#FFFDF5] border border-[#FCD34D] rounded-2xl p-5 text-left flex gap-3 text-xs text-[#854D0E] max-w-sm sm:max-w-md mx-auto">
                      <span className="text-sm shrink-0">⚠️</span>
                      <div className="space-y-1 font-sans font-semibold">
                        <p className="leading-relaxed text-[11.5px]">
                          Joining the Telegram group is <span className="bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-black uppercase text-[9.5px]">MANDATORY</span> to get your job details, work profile, salary & hiring details.
                        </p>
                      </div>
                    </div>

                    {/* Description Paragraph detail */}
                    <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium leading-relaxed max-w-md mx-auto">
                      Webinar details, Zoom link, training updates and next steps are shared only inside the Telegram group.
                    </p>

                    <div className="space-y-4 pt-2">
                      {/* Vibrant Green Telegram Button */}
                      <a 
                        href="https://t.me/survilXAi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#10B981] hover:bg-emerald-600 text-white font-extrabold py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-98 cursor-pointer max-w-xs mx-auto text-center font-sans"
                      >
                        <span className="shrink-0">Join Telegram Group</span>
                        <ChevronRight className="h-4.5 w-4.5" />
                      </a>

                      {/* Auto open counter info */}
                      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-mono">
                        <span>Opening Telegram automatically in</span>
                        <span className="font-extrabold text-emerald-600 font-mono text-sm">{countdown}s...</span>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* 7. "FROM OUR TEAM" - Hear From Our Analysts (white bg) */}
      <div className="bg-white text-navy py-24 relative overflow-hidden border-t border-slate-100">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 bg-red-50 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
              <CircleDot className="h-3 w-3 fill-brand" /> FROM OUR TEAM
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-navy font-sans tracking-tight text-center">
              Hear From Our Analysts
            </h2>
          </div>

          {/* Testimonial cards - responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div 
                key={test.name}
                className="bg-[#FAFBFD] border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div>
                  {/* Five yellow/orange stars above comment as shown in screenshot 6 */}
                  <div className="flex gap-1 mb-4 select-none">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4.5 w-4.5 text-amber-500 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-650 text-xs sm:text-sm leading-relaxed italic block tracking-wide font-sans mb-6">
                    {test.quote}
                  </p>
                </div>

                {/* Profile row */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                  <div className="h-10 w-10 rounded-full bg-brand text-white font-extrabold flex items-center justify-center text-sm shadow-md shrink-0">
                    {test.avatar}
                  </div>
                  <div className="text-left font-sans">
                    <h4 className="font-extrabold text-sm text-navy block leading-none">{test.name}</h4>
                    <span className="text-[10px] text-slate-450 block mt-1 uppercase font-bold font-mono tracking-wide leading-none">
                      {test.role} • {test.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ section */}
          <div className="mt-24 pt-16 border-t border-slate-100">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 bg-red-50 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="h-3 w-3 text-brand" /> ONBOARDING GUIDANCE
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#EF4444] font-sans tracking-tight text-center">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium">
                Everything you need to know about starting your remote monitoring career with us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  q: "Is this a genuine work-from-home job?",
                  a: "Yes. This is a 100% remote camera-monitoring role with CamscapeAI. You apply online, complete your profile, sign a digital employment agreement, and receive a unique Employee ID before you begin paid training."
                },
                {
                  q: "Is the webinar mandatory?",
                  a: "Yes. The onboarding webinar is mandatory because the final job role, salary structure, shift timing, training process, and tools are explained live, and your questions are answered directly by the team."
                },
                {
                  q: "Do I need prior experience?",
                  a: "No prior experience is required. We provide complete, paid training on our monitoring platform. Strong attention to detail and a stable internet connection matter more than experience."
                },
                {
                  q: "What equipment do I need?",
                  a: "A laptop or desktop with a webcam and a stable internet connection (minimum 10 Mbps). A quiet workspace helps you focus during monitoring shifts."
                },
                {
                  q: "When will I receive my salary?",
                  a: "Salary is paid monthly, on time. Candidates can earn up to ₹35,000/month. The exact structure is confirmed during onboarding."
                },
                {
                  q: "Is resume compulsory?",
                  a: "No, resume upload is optional. The online application takes about 2 minutes."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-[#FAFBFD] border border-slate-100 p-6 rounded-2xl text-left space-y-2 group hover:border-[#EF4444]/30 hover:bg-white transition duration-200">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-start gap-2.5">
                    <span className="text-[11px] font-mono font-black tracking-wider bg-red-100/60 text-[#EF4444] justify-center items-center h-5 w-5 rounded flex shrink-0 select-none">Q</span>
                    <span>{faq.q}</span>
                  </h4>
                  <div className="text-slate-650 text-xs sm:text-sm pl-7.5 leading-relaxed font-sans font-medium">
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

// Simple Custom Icon Component to represent Rupee Currency cleanly inside perks page
function IndianRupeePill(props: any) {
  return (
    <span className="font-extrabold text-xl font-sans" {...props}>₹</span>
  );
}
