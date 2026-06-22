import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import KeyStoreAndPasskey from './KeyStoreAndPasskey';
import { db } from '../lib/supabase';
import { 
  ShieldCheck, Shield, Key, Lock, User, CheckCircle2, RefreshCw, Cpu, Mail, 
  MapPin, Phone, ExternalLink, Zap, Terminal, FileText, Check, Award, Camera, 
  CheckSquare, ChevronRight, CircleDot, PenTool, Star, X, Upload, AlertTriangle, Tv
} from 'lucide-react';

interface EmployeePortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup' | 'securityKey';
}

export default function EmployeePortalModal({ isOpen, onClose, defaultTab = 'login' }: EmployeePortalModalProps) {
  // Navigation states
  const [isLoginMode, setIsLoginMode] = useState<boolean>(defaultTab === 'login');
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedInEmployee, setLoggedInEmployee] = useState<any>(null);

  // Registered database loaded from same central database
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([
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
      photoUrl: '',
      completedAt: '18 June 2026'
    }
  ]);

  // Synchronize on open
  useEffect(() => {
    if (isOpen) {
      // Async fetch list of registered employees from central server API/Database instead of relying strictly on device localStorage
      const fetchCentralEmployees = async () => {
        try {
          const list = await db.getEmployees();
          if (list && list.length > 0) {
            setRegisteredUsers(list);
          }
        } catch (e) {
          console.error("Error syncing central employees list:", e);
        }
      };
      fetchCentralEmployees();

      if (defaultTab === 'securityKey') {
        setIsLoginMode(true);
        setShowPasskeyScreen(true);
        setShowKeyStore(true);
      } else {
        setIsLoginMode(defaultTab === 'login');
        setShowPasskeyScreen(false);
        setShowKeyStore(false);
      }
      setOnboardingStep(1);
      // Reset errors
      setLoginError(null);
      setAccountError(null);
      setProfileError(null);
      setOrderSubmitted(false);
      setCouponApplied(false);
      setCouponCode('');
      setCouponError(null);
      setPasskeyVerified(false);
      setPasskeyVerifying(false);
    }
  }, [isOpen, defaultTab]);

  // Passkey and Key Store states
  const [showPasskeyScreen, setShowPasskeyScreen] = useState<boolean>(false);
  const [showKeyStore, setShowKeyStore] = useState<boolean>(false);
  const [activeThumbnail, setActiveThumbnail] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  
  const [orderName, setOrderName] = useState<string>('');
  const [orderPhone, setOrderPhone] = useState<string>('');
  const [orderAddr1, setOrderAddr1] = useState<string>('');
  const [orderAddr2, setOrderAddr2] = useState<string>('');
  const [orderCity, setOrderCity] = useState<string>('');
  const [orderState, setOrderState] = useState<string>('');
  const [orderPin, setOrderPin] = useState<string>('');
  const [orderQty, setOrderQty] = useState<number>(1);
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [passkeyVerifying, setPasskeyVerifying] = useState<boolean>(false);
  const [passkeyVerified, setPasskeyVerified] = useState<boolean>(false);

  // Reference for smooth scroll to order form
  const orderFormRef = useRef<HTMLDivElement | null>(null);

  // Login Form states (Image 1 replica)
  const [loginEmployeeId, setLoginEmployeeId] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState<boolean>(false);

  // Step 1 states (Image 2 replica)
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');
  const [confirmPasswordField, setConfirmPasswordField] = useState<string>('');
  const [accountError, setAccountError] = useState<string | null>(null);

  // Step 2 states (Image 3 replica)
  const [firstNameField, setFirstNameField] = useState<string>('');
  const [lastNameField, setLastNameField] = useState<string>('');
  const [mobileNumberField, setMobileNumberField] = useState<string>('');
  const [addressField, setAddressField] = useState<string>('');
  const [educationField, setEducationField] = useState<string>('');
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string>('');
  const [profileError, setProfileError] = useState<string | null>(null);

  // Step 3 states (Image 4 replica)
  const [agreementChecked, setAgreementChecked] = useState<boolean>(false);
  const [drawPath, setDrawPath] = useState<string>('');
  const [isSigning, setIsSigning] = useState<boolean>(false);

  // Step 4 states (Image 5 replica)
  const [generatedEmpCode, setGeneratedEmpCode] = useState<string>('');
  const [copiedCodeLink, setCopiedCodeLink] = useState<boolean>(false);

  // References
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sigCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle Photo File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setProfileError("File size is larger than 4MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUploadedPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Canvas drawing handlers
  const startDrawing = (clientX: number, clientY: number) => {
    if (!sigCanvasRef.current) return;
    const canvas = sigCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(clientX - rect.left, clientY - rect.top);
      setIsSigning(true);
    }
  };

  const draw = (clientX: number, clientY: number) => {
    if (!isSigning || !sigCanvasRef.current) return;
    const canvas = sigCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(clientX - rect.left, clientY - rect.top);
      ctx.stroke();
      setDrawPath('drawn');
    }
  };

  const stopDrawing = () => {
    setIsSigning(false);
  };

  const clearSignature = () => {
    if (!sigCanvasRef.current) return;
    const canvas = sigCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setDrawPath('');
    }
  };

  // Delay context initialization for signing canvas setup
  useEffect(() => {
    if (onboardingStep === 3 && isOpen) {
      setTimeout(() => {
        if (sigCanvasRef.current) {
          const ctx = sigCanvasRef.current.getContext('2d');
          if (ctx) {
            ctx.strokeStyle = '#881337'; // deep red/burgundy ink
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
          }
        }
      }, 250);
    }
  }, [onboardingStep, isOpen]);

  // Render YubiKey display graphic
  const renderMainGraphic = () => {
    switch (activeThumbnail) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl h-[260px] w-full">
            <svg viewBox="0 0 140 280" className="w-full max-w-[140px] mx-auto drop-shadow-xl animate-fadeIn">
              {/* Body */}
              <rect x="25" y="10" width="90" height="230" rx="20" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              {/* USB-C Tip on top */}
              <rect x="45" y="0" width="50" height="20" rx="3" fill="#D1D5DB" />
              <rect x="49" y="4" width="42" height="4" fill="#9CA3AF" />
              <rect x="53" y="10" width="34" height="2" fill="#D1D5DB" />
              {/* Keychain hole on bottom */}
              <circle cx="70" cy="215" r="16" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
              <circle cx="70" cy="215" r="12" fill="#FFFFFF" />
              {/* Touch contacts circle */}
              <circle cx="70" cy="115" r="28" fill="#F59E0B" className="animate-pulse" />
              <circle cx="70" cy="115" r="24" fill="#D97706" />
              {/* Inner detail gold Y symbol */}
              <path d="M 70,103 L 70,118 L 60,128 M 70,118 L 80,128" stroke="#FEF3C7" strokeWidth="5" strokeLinecap="round" fill="none" />
              <circle cx="70" cy="115" r="20" fill="transparent" stroke="#FBBF24" strokeWidth="1" />
            </svg>
            <span className="text-[10px] font-mono font-bold text-slate-400 mt-3">COSMIC HOUSING VIEW</span>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl h-[260px] w-full text-center space-y-3">
            <div className="relative">
              <Zap className="h-16 w-16 text-emerald-500 animate-ping absolute inset-0 opacity-15" />
              <Tv className="h-16 w-16 text-[#EF4444] relative z-10" />
            </div>
            <h5 className="font-extrabold text-xs text-slate-800 font-sans">NFC Touch Authentication</h5>
            <p className="text-[10px] text-slate-405 text-slate-400 leading-relaxed font-semibold max-w-[200px] mx-auto">
              Hover key against your Android or iOS smartphone to securely authorize sessions instantly.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl h-[260px] w-full text-left space-y-4">
            <h5 className="font-extrabold text-[10px] text-slate-400 font-mono tracking-wider uppercase">Operating System Suite</h5>
            <div className="grid grid-cols-2 gap-2 w-full text-[10px] font-sans font-extrabold">
              <div className="bg-white border rounded-lg p-2.5 flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-blue-500" /> Windows 11</div>
              <div className="bg-white border rounded-lg p-2.5 flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-purple-500" /> macOS Pro</div>
              <div className="bg-white border rounded-lg p-2.5 flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Linux Secure</div>
              <div className="bg-white border rounded-lg p-2.5 flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-rose-500" /> iOS / Android</div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl h-[260px] w-full text-left space-y-3">
            <h5 className="font-extrabold text-[10px] text-slate-400 font-mono uppercase">Multi-Protocol Suite</h5>
            <div className="w-full text-[10px] font-mono text-slate-600 space-y-2">
              <div className="flex justify-between border-b pb-0.5"><span>FIDO2 / WebAuthn</span> <span className="font-extrabold text-emerald-600">CERTIFIED</span></div>
              <div className="flex justify-between border-b pb-0.5"><span>Smart Card (PIV)</span> <span className="font-extrabold text-emerald-600">CERTIFIED</span></div>
              <div className="flex justify-between border-b pb-0.5"><span>YubiOTP (OATH)</span> <span className="font-extrabold text-emerald-600">CERTIFIED</span></div>
              <div className="flex justify-between"><span>OpenPGP Suite</span> <span className="font-extrabold text-emerald-600">CERTIFIED</span></div>
            </div>
          </div>
        );
      case 4:
      default:
        return (
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl h-[260px] w-full text-center space-y-3">
            <Lock className="h-14 w-14 text-[#EF4444]" />
            <h5 className="font-extrabold text-xs text-slate-800">MIL-SPEC Hardened</h5>
            <p className="text-[10px] text-slate-405 text-slate-400 leading-relaxed font-semibold max-w-[200px] mx-auto">
              Waterproof, dustproof, crushproof housing with zero active batteries. Made in Sweden.
            </p>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          id="modal-backdrop-secured"
        />

        {/* Modal Window Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative w-full overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl z-10 font-sans transition-all duration-300 ${
            showKeyStore ? 'max-w-4xl' : 'max-w-2xl'
          }`}
          id="modal-card-secure-viewport"
        >
          {/* Close button with high target hit area */}
          <button
            onClick={onClose}
            className="absolute top-5 right-6 text-slate-400 hover:text-slate-800 transition duration-200 text-xl font-bold p-2 z-20"
            id="modal-top-close-btn"
          >
            ✕
          </button>          {isLoggedIn ? (
            /* CONTROL PANEL/SECURE DASHBOARD VIEW (IMAGE 3 ACCURATE GRAPHIC) */
            <div className="bg-[#FAFAFC] min-h-[550px] text-slate-800 flex flex-col text-left font-sans select-none">
              
              {/* Image 3 COMPLIANT TOP HEADER ROW */}
              <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-white relative">
                <div className="flex items-center gap-2">
                  {/* Bullseye logo with red target */}
                  <div className="relative h-6.5 w-6.5 bg-[#EF4444]/10 rounded-full flex items-center justify-center border border-[#EF4444]/20 shrink-0">
                    <div className="absolute h-4 w-4 rounded-full border-2 border-[#EF4444] flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
                    </div>
                  </div>
                  <span className="text-sm font-black tracking-tight font-sans text-slate-900">
                    SurveilX<span className="text-[#EF4444]">AI</span>
                  </span>
                </div>
                
                {/* Secondary close window indicator */}
                <span className="text-[9px] font-bold font-mono text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  SECURE PORTAL
                </span>
              </div>

              {/* Scrollable Container */}
              <div className="p-5 md:p-6.5 space-y-4 max-h-[72vh] overflow-y-auto">
                
                {/* GRAND GRADIENT BADGE CARD: Welcome, user */}
                <div className="bg-gradient-to-r from-slate-950 via-[#1E293B] to-[#7F1D1D] rounded-[1.8rem] p-6 text-white shadow-xl relative flex justify-between items-center overflow-hidden border border-slate-900">
                  <div className="flex items-center gap-4.5">
                    {/* Empty/Abstract User graphic placeholder (Image 3 look) */}
                    <div className="h-16 w-16 bg-slate-200/90 rounded-[1.2rem] shrink-0 overflow-hidden border-2 border-white/20 shadow-md flex items-center justify-center select-none relative">
                      {loggedInEmployee.photoUrl ? (
                        <img 
                          src={loggedInEmployee.photoUrl} 
                          alt="Employee"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[#E2E8F0] flex items-center justify-center">
                          {/* Standard mockup avatar gray shape from Image 3 */}
                          <div className="h-11 w-11 rounded-md bg-[#CBD5E1]" />
                        </div>
                      )}
                    </div>
                    
                    <div className="text-left font-sans space-y-0.5">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 font-mono block">
                        EMPLOYEE PORTAL
                      </span>
                      <h4 className="text-base font-light text-slate-200 leading-none">
                        Welcome,
                      </h4>
                      <h3 className="text-xl font-black text-white leading-tight capitalize tracking-tight font-sans">
                        {loggedInEmployee.fullName ? (
                          loggedInEmployee.fullName.trim().split(' ')[0].charAt(0).toUpperCase() + loggedInEmployee.fullName.trim().split(' ')[0].slice(1).toLowerCase()
                        ) : "User"}
                      </h3>
                      <div className="flex flex-col gap-1 mt-1.5">
                        <span className="text-[10px] bg-white/10 font-mono font-bold text-slate-300 py-0.5 px-2.5 rounded-md inline-block uppercase tracking-wide border border-white/5 select-text self-start">
                          {loggedInEmployee.employeeId}
                        </span>
                        <span className="text-[10.5px] text-slate-300/90 font-medium block whitespace-nowrap overflow-hidden text-ellipsis max-w-[220px]">
                          {loggedInEmployee.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Red circular logout exit button inside badge card */}
                  <button 
                    onClick={() => {
                      setIsLoggedIn(false);
                      setLoggedInEmployee(null);
                    }}
                    title="Sign Out"
                    className="h-10 w-10 bg-white/10 hover:bg-[#EF4444]/65 border border-white/15 hover:border-[#EF4444]/20 rounded-2xl flex items-center justify-center text-white transition duration-200 cursor-pointer shadow-md shadow-black/10 shrink-0"
                  >
                    {/* Logout arrow symbol */}
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>

                {/* TWO-COLUMN STATUS BENTO / STACKED STATUS CARDS FROM IMAGE 3 */}
                <div className="space-y-2.5">
                  
                  {/* Status 1: Account Status */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-4.5 flex items-center gap-4.5 shadow-xs transition hover:border-slate-200">
                    <div className="h-9 w-9 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100/30">
                      {/* Check badge */}
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="text-left font-sans">
                      <p className="text-[10px] text-slate-400 font-mono font-black tracking-wider uppercase">
                        ACCOUNT STATUS
                      </p>
                      <p className="text-sm font-extrabold text-slate-800 lowercase mt-0.5">
                        active
                      </p>
                    </div>
                  </div>

                  {/* Status 2: Agreement signed */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-4.5 flex items-center gap-4.5 shadow-xs transition hover:border-slate-200">
                    <div className="h-9 w-9 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100/30">
                      {/* Signed doc check icon */}
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <rect x="5" y="2" width="14" height="20" rx="2" />
                        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="text-left font-sans">
                      <p className="text-[10px] text-slate-400 font-mono font-black tracking-wider uppercase">
                        AGREEMENT
                      </p>
                      <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                        Signed
                      </p>
                    </div>
                  </div>

                  {/* Status 3: Security Passkey Active */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-4.5 flex items-center gap-4.5 shadow-xs transition hover:border-slate-200">
                    <div className="h-9 w-9 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100/30">
                      {/* Green key icon */}
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m0 0a2 2 0 01-2 2m2-2h3m-3.4 1.7l-4 4a5 5 0 11-7-7 5 5 0 018.6 3.3L15 7" />
                      </svg>
                    </div>
                    <div className="text-left font-sans">
                      <p className="text-[10px] text-slate-400 font-mono font-black tracking-wider uppercase">
                        SECURITY PASSKEY
                      </p>
                      <p className="text-sm font-extrabold text-[#111827] mt-0.5">
                        Active
                      </p>
                    </div>
                  </div>
                </div>

                {/* PERSONAL USER REGISTRY INFORMATION LIST */}
                <div className="bg-white border border-slate-100 rounded-2.5xl p-5 shadow-xs text-left">
                  <h3 className="text-base font-black text-slate-900 font-sans tracking-tight mb-4.5 border-b border-slate-50 pb-2 flex items-center gap-2">
                    {/* User profile key */}
                    <svg className="h-4 w-4 text-slate-450" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Your Details
                  </h3>
                  
                  <div className="space-y-3 font-sans text-xs">
                    
                    {/* row 1: Name */}
                    <div className="flex border-b border-slate-50/50 pb-2 sm:pb-2.5">
                      <span className="text-slate-400 font-bold uppercase font-mono text-[9px] w-24 shrink-0 mt-0.5">
                        NAME
                      </span>
                      <span className="font-bold text-slate-800 capitalize select-text">
                        {loggedInEmployee.fullName || "user yadav"}
                      </span>
                    </div>

                    {/* row 2: Email */}
                    <div className="flex border-b border-slate-50/50 pb-2 sm:pb-2.5">
                      <span className="text-slate-400 font-bold uppercase font-mono text-[9px] w-24 shrink-0 mt-0.5">
                        EMAIL
                      </span>
                      <span className="font-semibold text-slate-800 break-all select-text">
                        {loggedInEmployee.email || "user2@mail.com"}
                      </span>
                    </div>

                    {/* row 3: Mobile */}
                    <div className="flex border-b border-slate-50/50 pb-2 sm:pb-2.5">
                      <span className="text-slate-400 font-bold uppercase font-mono text-[9px] w-24 shrink-0 mt-0.5">
                        MOBILE
                      </span>
                      <span className="font-semibold text-slate-800 select-text">
                        {loggedInEmployee.phone || "+91 9876543211"}
                      </span>
                    </div>

                    {/* row 4: Education */}
                    <div className="flex border-b border-slate-50/50 pb-2 sm:pb-2.5">
                      <span className="text-slate-400 font-bold uppercase font-mono text-[9px] w-24 shrink-0 mt-0.5">
                        EDUCATION
                      </span>
                      <span className="font-semibold text-slate-800 select-text">
                        {loggedInEmployee.education || "10th Pass"}
                      </span>
                    </div>

                    {/* row 5: Employee ID */}
                    <div className="flex border-b border-slate-50/50 pb-2 sm:pb-2.5">
                      <span className="text-slate-400 font-bold uppercase font-mono text-[9px] w-24 shrink-0 mt-0.5">
                        EMPLOYEE ID
                      </span>
                      <span className="font-mono font-bold text-slate-800 select-text bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        {loggedInEmployee.employeeId || "CAM20260619DTIW"}
                      </span>
                    </div>

                    {/* row 6: Address */}
                    <div className="flex pb-1">
                      <span className="text-slate-400 font-bold uppercase font-mono text-[9px] w-24 shrink-0 mt-0.5">
                        ADDRESS
                      </span>
                      <span className="font-semibold text-slate-800 select-text block capitalize">
                        {loggedInEmployee.address || "usa"}
                      </span>
                    </div>

                  </div>
                </div>

                {/* WARNING WORKSPACE TRIGGER CARD FROM IMAGE 3 */}
                <div className="bg-[#FFF1F2] border border-[#FECDD3]/50 rounded-2.5xl p-5 flex gap-4 text-left shadow-xs transition duration-200">
                  <div className="h-10 w-10 bg-[#FFE4E6] border border-[#F43F5E]/15 text-[#EF4444] rounded-2xl flex items-center justify-center shrink-0">
                    {/* TV play monitor icon */}
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="3" width="18" height="12" rx="2" />
                      <path d="M12 9l3 2-3 2V9z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="space-y-1 font-sans flex-1">
                    <h5 className="font-black text-[13px] text-slate-900">
                      Monitoring dashboard access
                    </h5>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed font-sans">
                      Your live monitoring workspace will be activated after you complete training and the mandatory onboarding webinar.
                    </p>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="pt-4 border-t border-slate-100 text-center">
                  <p className="text-[9px] text-[#A1A1AA] font-semibold tracking-wide font-sans leading-relaxed select-none max-w-sm mx-auto">
                    © 2026 SurveilXAI · SurveilXAI never asks for any registration, deposit or advance fee.
                  </p>
                </div>

              </div>
            </div>
          ) : (showKeyStore || showPasskeyScreen) ? (
            <KeyStoreAndPasskey
              showKeyStore={showKeyStore}
              showPasskeyScreen={showPasskeyScreen}
              loggedInEmployee={loggedInEmployee}
              onBackToLogin={() => {
                setShowPasskeyScreen(false);
                setLoggedInEmployee(null);
              }}
              onEnterDashboard={(employee) => {
                setLoggedInEmployee(employee);
                setIsLoggedIn(true);
                setShowPasskeyScreen(false);
                db.insertKeyLog({
                  email: employee?.email || employee?.fullName || 'unknown_employee',
                  action_type: 'Employee Dashboard Login',
                  key_type: `ID: ${employee?.employeeId || 'N/A'}`,
                  ip_address: '103.155.12.84'
                });
              }}
              setShowKeyStore={setShowKeyStore}
              setShowPasskeyScreen={setShowPasskeyScreen}
            />
          ) : isLoginMode ? (
            /* ========================================================= */
            /* IMAGE 1: EMPLOYEE LOGIN COMPONENT IN MODAL                */
            /* ========================================================= */
            <motion.div
              key="employee-login-modal-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 sm:p-10 md:p-12 text-left bg-white"
            >
              {/* Badge Icon and Headers in horizontal row */}
              <div className="flex gap-4 items-center mb-8">
                <div className="h-12 w-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6 text-[#EF4444]" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-tight font-sans">
                    Employee Login
                  </h3>
                  <p className="text-xs text-slate-500 font-medium font-sans mt-0.5">
                    Secure access to your SurvilX portal
                  </p>
                </div>
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-xs text-red-600 font-semibold mb-6 flex items-start gap-2">
                  <AlertTriangle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoginError(null);
                  const id = loginEmployeeId.trim();
                  const match = registeredUsers.find(
                    (u) => u.employeeId.toUpperCase() === id.toUpperCase() && u.password === loginPassword
                  );
                  if (match) {
                    setLoggedInEmployee(match);
                    setShowPasskeyScreen(true);
                    db.insertKeyLog({
                      email: match.email || match.fullName,
                      action_type: 'Employee Credential Login',
                      key_type: `ID Code: ${match.employeeId}`,
                      ip_address: '103.155.12.84'
                    });
                  } else {
                    setLoginError("Invalid Employee ID code or password credentials. Please verify your registration code.");
                  }
                }} 
                className="space-y-6"
              >
                {/* Employee ID with specialized badge icon */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-login-id" className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                    EMPLOYEE ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <FileText className="h-4.5 w-4.5" />
                    </div>
                    <input 
                      type="text" 
                      id="modal-login-id"
                      required
                      value={loginEmployeeId}
                      onChange={(e) => setLoginEmployeeId(e.target.value)}
                      placeholder="CAM20260000XXXX"
                      className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm text-slate-850 placeholder-slate-400 focus:border-[#EF4444] focus:ring-1 focus:ring-[#EF4444] focus:outline-none transition font-sans font-medium"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-login-passwd" className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="h-4.5 w-4.5" />
                    </div>
                    <input 
                      type="password" 
                      id="modal-login-passwd"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Your password"
                      className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm text-slate-850 placeholder-slate-400 focus:border-[#EF4444] focus:ring-1 focus:ring-[#EF4444] focus:outline-none transition font-sans font-medium"
                    />
                  </div>
                </div>

                {/* Continue button */}
                <button 
                  type="submit"
                  className="w-full bg-[#EF4444] hover:bg-red-650 text-white font-extrabold py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:shadow-xl transition-all active:scale-98"
                >
                  <span>Continue</span>
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </form>

              {/* Link switching to Signup step 1 */}
              <div className="text-center mt-6">
                <p className="text-xs text-slate-500 font-medium font-sans">
                  New employee?{' '}
                  <button 
                    onClick={() => {
                      setIsLoginMode(false);
                      setOnboardingStep(1);
                    }}
                    className="text-[#EF4444] font-bold hover:underline font-sans cursor-pointer"
                  >
                    Create your account
                  </button>
                </p>
              </div>
            </motion.div>
          ) : (
            /* ========================================================= */
            /* MULTI-STAGE STEPPER REGISTRATION WORKFLOW IN MODAL         */
            /* ========================================================= */
            <motion.div
              key="employee-signup-onboarding-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white text-slate-800"
            >
              {/* Stepper horizontal line and labels */}
              <div className="bg-slate-50/60 p-6 border-b border-slate-100 flex justify-center items-center select-none rounded-t-[2.5rem]">
                <div className="flex items-center gap-2 sm:gap-4 max-w-md w-full justify-between">
                  {[
                    { step: 1, label: 'Account' },
                    { step: 2, label: 'Profile' },
                    { step: 3, label: 'Agreement' },
                    { step: 4, label: 'Done' }
                  ].map((item, idx, arr) => (
                    <React.Fragment key={item.step}>
                      <div className="flex flex-col items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition border ${
                          onboardingStep === item.step 
                            ? 'bg-[#EF4444] border-[#EF4444] text-white font-extrabold ring-4 ring-red-100' 
                            : onboardingStep > item.step 
                            ? 'bg-emerald-500 border-emerald-500 text-white font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-400'
                        }`}>
                          {onboardingStep > item.step ? (
                            <Check className="h-4.5 w-4.5 text-white" />
                          ) : (
                            <span>{item.step}</span>
                          )}
                        </div>
                        <span className={`text-[10px] mt-1 font-bold ${
                          onboardingStep === item.step 
                            ? 'text-[#EF4444]' 
                            : onboardingStep > item.step 
                            ? 'text-emerald-500' 
                            : 'text-slate-400'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                      
                      {idx < arr.length - 1 && (
                        <div className="flex-1 h-0.5 mx-1 max-w-[50px] bg-slate-200 relative">
                          <div className={`absolute top-0 bottom-0 left-0 transition-all duration-300 bg-[#EF4444] ${
                            onboardingStep > item.step ? 'w-full bg-emerald-500' : 'w-0'
                          }`} />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="max-h-[70vh] overflow-y-auto">
                {/* STEP 1: ACCOUNT DETAILS (Image 2 replica) */}
                {onboardingStep === 1 && (
                  <div className="p-8 sm:p-10 text-left">
                    <div className="mb-6">
                      <h3 className="text-3xl font-extrabold tracking-tight text-slate-950 font-sans leading-none">
                        Create Your Account
                      </h3>
                      <p className="text-slate-450 text-xs font-semibold font-sans mt-2 leading-relaxed">
                        Start your SurvilX employee onboarding.
                      </p>
                    </div>

                    {accountError && (
                      <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-xs text-red-650 font-semibold mb-6 flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{accountError}</span>
                      </div>
                    )}

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        setAccountError(null);
                        if (passwordField.length < 6) {
                          setAccountError("Password must be at least 6 characters in length.");
                          return;
                        }
                        if (passwordField !== confirmPasswordField) {
                          setAccountError("Password values do not match.");
                          return;
                        }
                        setOnboardingStep(2);
                      }} 
                      className="space-y-5"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                          EMAIL ADDRESS
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Mail className="h-4.5 w-4.5" />
                          </div>
                          <input 
                            type="email" 
                            required
                            value={emailField}
                            onChange={(e) => setEmailField(e.target.value)}
                            placeholder="you@email.com"
                            className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#EF4444] focus:ring-1 focus:ring-[#EF4444] focus:outline-none font-sans font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                          PASSWORD
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Lock className="h-4.5 w-4.5" />
                          </div>
                          <input 
                            type="password" 
                            required
                            value={passwordField}
                            onChange={(e) => setPasswordField(e.target.value)}
                            placeholder="Minimum 6 characters"
                            className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#EF4444] focus:ring-1 focus:ring-[#EF4444] focus:outline-none font-sans font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                          CONFIRM PASSWORD
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Lock className="h-4.5 w-4.5" />
                          </div>
                          <input 
                            type="password" 
                            required
                            value={confirmPasswordField}
                            onChange={(e) => setConfirmPasswordField(e.target.value)}
                            placeholder="Re-enter password"
                            className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#EF4444] focus:ring-1 focus:ring-[#EF4444] focus:outline-none font-sans font-medium"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-[#EF4444] hover:bg-red-650 text-white font-extrabold py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition active:scale-98"
                      >
                        <span>Continue to Profile</span>
                        <ChevronRight className="h-4.5 w-4.5" />
                      </button>
                    </form>

                    <div className="text-center mt-6">
                      <p className="text-xs text-slate-500 font-medium font-sans">
                        Already an employee?{' '}
                        <button 
                          onClick={() => {
                            setIsLoginMode(true);
                            setLoginError(null);
                          }}
                          className="text-[#EF4444] font-bold hover:underline font-sans cursor-pointer"
                        >
                          Login here
                        </button>
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 2: PROFILE INFORMATION (Image 3 replica) */}
                {onboardingStep === 2 && (
                  <div className="p-8 sm:p-10 text-left">
                    <div className="mb-6">
                      <h3 className="text-2xl font-extrabold tracking-tight text-slate-950 font-sans">
                        Complete Your Profile
                      </h3>
                      <p className="text-slate-400 text-xs font-semibold font-sans mt-1">
                        Provide your personal details for contract formulation.
                      </p>
                    </div>

                    {profileError && (
                      <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-xs text-red-650 font-semibold mb-6 flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{profileError}</span>
                      </div>
                    )}

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        setProfileError(null);
                        if (!firstNameField || !lastNameField || !mobileNumberField || !addressField || !educationField) {
                          setProfileError("Please complete all compulsory asterisk (*) fields.");
                          return;
                        }
                        setOnboardingStep(3);
                      }} 
                      className="space-y-6"
                    >
                      {/* Interactive block photo uploader */}
                      <div className="flex gap-4 items-center">
                        <div className="relative">
                          <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                          />
                          <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="h-20 w-20 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-[#EF4444] hover:bg-[#FFF5F5] transition flex flex-col items-center justify-center cursor-pointer overflow-hidden p-1 select-none"
                          >
                            {uploadedPhotoUrl ? (
                              <img 
                                src={uploadedPhotoUrl} 
                                alt="Passport Preview" 
                                className="w-full h-full object-cover rounded-xl"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <>
                                <Camera className="h-5 w-5 text-slate-450 mb-0.5" />
                                <span className="text-[9px] text-slate-450 font-black font-mono leading-none">PHOTO</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-xs font-extrabold text-slate-700 font-sans flex items-center gap-1">
                            Passport-size Photo <span className="text-red-500">*</span>
                          </h4>
                          <p className="text-[10px] text-slate-400 leading-snug mt-1 font-sans">
                            Clear, front-facing. JPG/PNG, under 4MB.
                          </p>
                          <button 
                            type="button" 
                            onClick={() => fileInputRef.current?.click()}
                            className="text-red-500 font-bold text-xs mt-1 underline hover:text-red-650 font-sans"
                          >
                            Upload photo
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                            FIRST NAME *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={firstNameField}
                            onChange={(e) => setFirstNameField(e.target.value)}
                            placeholder="First name"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-[#EF4444] focus:outline-none font-sans font-medium"
                          />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                            LAST NAME *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={lastNameField}
                            onChange={(e) => setLastNameField(e.target.value)}
                            placeholder="Last name"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-[#EF4444] focus:outline-none font-sans font-medium"
                          />
                        </div>
                      </div>

                      {/* Locked Email display layout */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                          EMAIL
                        </label>
                        <input 
                          type="email" 
                          disabled
                          value={emailField}
                          className="w-full rounded-xl border border-slate-150 bg-slate-50 px-4 py-3 text-sm text-slate-500 font-sans"
                        />
                      </div>

                      {/* Mobile phone field with prefix indicator block */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                          MOBILE NUMBER *
                        </label>
                        <div className="flex rounded-xl overflow-hidden border border-slate-200 focus-within:border-[#EF4444]">
                          <span className="bg-slate-50 border-r border-slate-200 px-4 py-3 text-slate-500 text-sm font-bold font-sans">
                            +91
                          </span>
                          <input 
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            value={mobileNumberField}
                            onChange={(e) => setMobileNumberField(e.target.value.replace(/\D/g, ''))}
                            placeholder="9000000000"
                            className="flex-1 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-sans font-medium"
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                          FULL ADDRESS *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={addressField}
                          onChange={(e) => setAddressField(e.target.value)}
                          placeholder="House, street, city, state, pincode"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-[#EF4444] focus:outline-none font-sans font-medium"
                        />
                      </div>

                      {/* Education select field */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                          EDUCATION *
                        </label>
                        <select 
                          required
                          value={educationField}
                          onChange={(e) => setEducationField(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-855 focus:border-[#EF4444] focus:outline-none font-sans font-bold cursor-pointer"
                        >
                          <option value="">Select education</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Graduate">Graduate</option>
                          <option value="Post Graduate">Post Graduate</option>
                          <option value="High School">High School (12th Pass)</option>
                        </select>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-[#EF4444] hover:bg-red-650 text-white font-extrabold py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition active:scale-98"
                      >
                        <span>Continue to Agreement</span>
                        <ChevronRight className="h-4.5 w-4.5" />
                      </button>
                    </form>
                  </div>
                )}

                {/* STEP 3: CONTRACT REVIEW AGREEMENT AND SIGNATURE (Image 4 replica) */}
                {onboardingStep === 3 && (
                  <div className="p-6 sm:p-8 text-left space-y-8 bg-white">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight text-center font-sans uppercase">
                        EMPLOYMENT AGREEMENT
                      </h2>
                      <p className="text-center text-[10px] sm:text-xs text-slate-450 font-mono tracking-wider font-bold block mt-1 uppercase">
                        Remote Video Surveillance Analyst
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      This Employment Agreement (&quot;Agreement&quot;) is made on 18 June 2026 between <span className="font-extrabold text-[#EF4444]">SurvilX</span> (&quot;the Company&quot;) and the Employee named below, setting out the terms of remote engagement.
                    </p>

                    {/* Blue/grey summary block layout */}
                    <div className="bg-[#FAFBFD] border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                      <div className="h-20 w-16 bg-white border rounded-xl shrink-0 overflow-hidden border-slate-200 flex items-center justify-center">
                        {uploadedPhotoUrl ? (
                          <img 
                            src={uploadedPhotoUrl} 
                            alt="Passport" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <User className="h-8 w-8 text-slate-350" />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-6 text-xs font-sans flex-1 w-full text-left">
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono">NAME</span>
                          <span className="font-extrabold text-slate-800 capitalize">{firstNameField} {lastNameField}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono">EMAIL</span>
                          <span className="font-extrabold text-slate-800 break-all">{emailField}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono">MOBILE</span>
                          <span className="font-extrabold text-slate-800">+91 {mobileNumberField}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono">EDUCATION</span>
                          <span className="font-extrabold text-slate-800">{educationField}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono">POSITION</span>
                          <span className="font-extrabold text-[#EF4444]">Remote Video Surveillance Analyst</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono">COMPENSATION</span>
                          <span className="font-extrabold text-slate-800">₹35,000 / month</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono">ADDRESS</span>
                          <span className="font-extrabold text-slate-800 block text-[11px] leading-tight">{addressField}</span>
                        </div>
                      </div>
                    </div>

                    {/* Full terms and conditions list */}
                    <div className="space-y-4 font-sans text-xs text-slate-800">
                      <h4 className="font-black text-slate-900 border-b pb-1">Terms &amp; Conditions</h4>
                      <ol className="space-y-4 list-decimal pl-4 leading-relaxed text-slate-700 font-medium">
                        <li>
                          <strong className="text-slate-900 font-extrabold">Position &amp; Engagement.</strong> The Employee is engaged as a Remote Video Surveillance Analyst on a full-time, work-from-home basis.
                        </li>
                        <li>
                          <strong className="text-slate-900 font-extrabold">Compensation.</strong> Monthly compensation of ₹35,000, subject to performance, attendance, and completion of training.
                        </li>
                        <li>
                          <strong className="text-slate-900 font-extrabold">Work From Home.</strong> The role is fully remote; the Employee must work from a quiet, distraction-free environment.
                        </li>
                        <li>
                          <strong className="text-slate-900 font-extrabold">Equipment (Bring Your Own).</strong> The Employee shall provide their own laptop/desktop, stable internet, and a hardware security key (passkey) required to access Company surveillance systems. The security key may be purchased from any retailer of the Employee's choice.
                        </li>
                        <li>
                          <strong className="text-slate-900 font-extrabold">Mandatory Training &amp; Webinar.</strong> The Employee agrees to attend the mandatory onboarding webinar and complete training before active duty.
                        </li>
                        <li>
                          <strong className="text-slate-900 font-extrabold">Confidentiality &amp; Privacy.</strong> The Employee shall keep all footage, incident data, and Company information strictly confidential and handle it in a privacy-conscious manner.
                        </li>
                        <li>
                          <strong className="text-slate-900 font-extrabold">Professional Conduct.</strong> The Employee shall follow monitoring guidelines, report incidents accurately, and maintain professional communication.
                        </li>
                        <li>
                          <strong className="text-slate-900 font-extrabold">No Advance Fee.</strong> SurvilX does not collect any registration, deposit, security, or advance fee from candidates or employees at any stage.
                        </li>
                        <li>
                          <strong className="text-slate-900 font-extrabold">Termination.</strong> Either party may terminate this engagement with notice as per Company policy. Misconduct or breach of confidentiality may lead to immediate termination.
                        </li>
                      </ol>
                    </div>

                    {/* Declaration checkbox */}
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-slate-800 select-none items-start">
                      <input 
                        type="checkbox" 
                        id="modal-agree-checkbox" 
                        checked={agreementChecked}
                        onChange={(e) => setAgreementChecked(e.target.checked)}
                        className="mt-1 h-4 w-4 text-[#EF4444] border-slate-300 rounded focus:ring-red-500 shrink-0 cursor-pointer"
                      />
                      <label htmlFor="modal-agree-checkbox" className="font-medium text-slate-700 text-[11px] block text-left cursor-pointer">
                        I, <span className="font-extrabold text-slate-900 capitalize">{firstNameField} {lastNameField}</span>, hereby declare that the information I have provided is true and correct, and I have read, understood, and accept the above Terms &amp; Conditions of employment with SurvilX.
                      </label>
                    </div>

                    {/* Signatures rows */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                      {/* Employee Pad */}
                      <div className="space-y-1.5 flex flex-col">
                        <span className="text-[9px] font-extrabold text-slate-400 font-mono tracking-widest uppercase block">
                          EMPLOYEE SIGNATURE
                        </span>
                        
                        <div className="border border-slate-200 border-dashed rounded-2xl p-2 bg-slate-50 relative flex-1 flex flex-col items-center justify-center min-h-[120px]">
                          <button 
                            type="button" 
                            onClick={clearSignature}
                            className="absolute top-2 right-2 text-[10px] font-bold text-slate-500 hover:text-red-700 bg-white border px-2 py-0.5 rounded shadow-sm transition"
                          >
                            ✕ Clear
                          </button>
                          
                          <canvas 
                            ref={sigCanvasRef}
                            width={240}
                            height={110}
                            onMouseDown={(e) => startDrawing(e.clientX, e.clientY)}
                            onMouseMove={(e) => draw(e.clientX, e.clientY)}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={(e) => {
                              if (e.touches[0]) startDrawing(e.touches[0].clientX, e.touches[0].clientY);
                            }}
                            onTouchMove={(e) => {
                              if (e.touches[0]) draw(e.touches[0].clientX, e.touches[0].clientY);
                            }}
                            onTouchEnd={stopDrawing}
                            className="w-full h-[110px] cursor-crosshair relative z-10 touch-none"
                          />
                          
                          {drawPath === '' && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-450 text-xs font-sans font-semibold">
                              Sign here with your mouse or finger
                            </div>
                          )}
                        </div>
                        
                        <span className="text-[10px] font-mono text-slate-400 block tracking-wide capitalize pl-1">
                          {firstNameField} {lastNameField} · 18 June 2026
                        </span>
                      </div>

                      {/* Official Stamp */}
                      <div className="space-y-1.5 flex flex-col">
                        <span className="text-[9px] font-extrabold text-slate-400 font-mono tracking-widest uppercase block">
                          AUTHORIZED SIGNATORY
                        </span>

                        <div className="border border-slate-200 bg-white rounded-2xl p-4 flex-1 flex items-center justify-between shadow-sm relative overflow-hidden min-h-[140px]">
                          <div className="space-y-3.5 text-left font-sans">
                            <div className="font-serif italic text-3xl font-extrabold text-rose-800 tracking-widest select-none pt-2">
                              Mac Bolak
                            </div>
                            <div className="border-t border-slate-200 pt-1.5 leading-tight">
                              <h5 className="font-extrabold text-xs text-slate-800">Mac Bolak</h5>
                              <span className="text-[10px] text-slate-450 block font-semibold">Founder &amp; CEO, SurvilX</span>
                            </div>
                          </div>

                          {/* Certificate Badge */}
                          <div className="relative border-4 border-dashed border-red-650/45 rounded-full w-24 h-24 flex flex-col items-center justify-center text-center -rotate-12 select-none pointer-events-none p-1">
                            <span className="text-[7px] text-red-600 font-extrabold tracking-widest font-mono">SURVILX</span>
                            <ShieldCheck className="h-6 w-6 text-red-600 my-0.5" />
                            <span className="text-[7px] text-red-600 font-bold uppercase tracking-wide">AUTHORIZED</span>
                            <span className="text-[8px] text-red-600 font-black tracking-widest bg-red-50 px-1 rounded">SEALED</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sign & submit / Print save buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-150">
                      <button 
                        type="button"
                        onClick={() => window.print()}
                        className="flex-1 bg-white border border-slate-250 text-slate-700 font-extrabold py-4 px-6 rounded-2xl text-[11px] sm:text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition cursor-pointer"
                      >
                        <svg className="h-4.5 w-4.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        <span>Print / Save PDF</span>
                      </button>

                      <button 
                        type="button"
                        disabled={!agreementChecked || drawPath === ''}
                        onClick={() => {
                          const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
                          const code = `CAM20260618${randomSuffix}`;
                          
                          const newEmployeeObj = {
                            employeeId: code,
                            email: emailField,
                            password: passwordField,
                            fullName: `${firstNameField} ${lastNameField}`,
                            firstName: firstNameField,
                            lastName: lastNameField,
                            phone: `+91 ${mobileNumberField}`,
                            address: addressField,
                            education: educationField,
                            photoUrl: uploadedPhotoUrl,
                            signaturePath: drawPath,
                            completedAt: '18 June 2026'
                          };
                          
                          setRegisteredUsers((prev) => [newEmployeeObj, ...prev]);
                          // Sync with Supabase Database
                          db.insertEmployee(newEmployeeObj);
                          db.insertKeyLog({
                            email: emailField,
                            action_type: 'Employee Onboard Signup',
                            key_type: `ID Code: ${code}`,
                            ip_address: '103.155.12.84'
                          });
                          
                          setGeneratedEmpCode(code);
                          setOnboardingStep(4);
                        }}
                        className={`flex-[2] text-white font-extrabold py-4 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition duration-200 select-none ${
                          agreementChecked && drawPath !== ''
                            ? 'bg-[#EF4444] hover:bg-red-650 cursor-pointer active:scale-98'
                            : 'bg-slate-300 pointer-events-none opacity-85'
                        }`}
                      >
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Sign &amp; Submit Agreement</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: SUCCESS REGISTRATION COMPLETE (Image 5 replica) */}
                {onboardingStep === 4 && (
                  <div className="p-8 sm:p-10 text-center bg-white text-slate-800 font-sans">
                    <div className="flex justify-center mb-6">
                      <div className="h-20 w-20 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shadow-inner relative">
                        <Check className="h-10 w-10 text-emerald-500" />
                        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping pointer-events-none" />
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans capitalize">
                      Congratulations, {firstNameField || "User"}!
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-md mx-auto mt-2 leading-relaxed">
                      Your registration is complete. Welcome to SurvilX.
                    </p>

                    {/* Employee code badges pill */}
                    <div className="my-8 max-w-sm mx-auto space-y-2">
                      <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase block font-mono">
                        YOUR EMPLOYEE CODE
                      </span>
                      
                      <div className="flex rounded-2xl border border-red-100 bg-red-50/50 p-4 justify-between items-center overflow-hidden gap-3 font-mono">
                        <span className="text-xl sm:text-2xl font-black text-red-700 tracking-widest pl-2">
                          {generatedEmpCode}
                        </span>
                        
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(generatedEmpCode);
                            setCopiedCodeLink(true);
                            setTimeout(() => setCopiedCodeLink(false), 2000);
                          }}
                          className="bg-white hover:bg-slate-50 border text-slate-700 rounded-xl p-2.5 shadow-sm transition active:scale-95 cursor-pointer shrink-0"
                          title="Copy code to clipboard"
                        >
                          {copiedCodeLink ? (
                            <span className="text-xs text-emerald-600 font-bold px-1 font-sans">Copied!</span>
                          ) : (
                            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Yellow Warning alert block */}
                    <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#854D0E] font-semibold leading-relaxed text-left max-w-md mx-auto my-6">
                      <AlertTriangle className="h-5 w-5 text-[#EAB308] shrink-0 mt-0.5" />
                      <p>
                        Please save this Employee Code safely — you will need it to log in to the employee portal.
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-450 font-sans italic mt-2">
                      We have also sent this code to your email: <span className="text-slate-700 font-extrabold font-mono">{emailField}</span>
                    </p>

                    <button 
                      type="button"
                      onClick={() => {
                        setIsLoginMode(true);
                        setLoginEmployeeId(generatedEmpCode);
                        setLoginPassword(passwordField);
                        setOnboardingStep(1);
                        setLoginError(null);
                      }}
                      className="w-full mt-6 bg-[#EF4444] hover:bg-red-650 text-white font-extrabold py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition active:scale-98"
                    >
                      <span>Go to Employee Login</span>
                      <ChevronRight className="h-4.5 w-4.5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
