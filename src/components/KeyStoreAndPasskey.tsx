import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Key, RefreshCw, CheckCircle2, Zap, Tv, Cpu, Lock, Star, 
  Award, ChevronRight, Check, AlertTriangle, ExternalLink 
} from 'lucide-react';
import { db } from '../lib/supabase';

// Static product image path imports
import yubiFrontSide from '../assets/images/yubikey_front_side_1781792456749.jpg';
import yubiBestSeller from '../assets/images/yubikey_best_seller_1781792470732.jpg';
import yubiCompatTable from '../assets/images/yubikey_compat_table_1781792487328.jpg';
import yubiServices from '../assets/images/yubikey_services_1781792500449.jpg';
import yubiFeatures from '../assets/images/yubikey_features_1781792518519.jpg';

interface KeyStoreAndPasskeyProps {
  showKeyStore: boolean;
  showPasskeyScreen: boolean;
  loggedInEmployee: any;
  onBackToLogin: () => void;
  onEnterDashboard: (employee: any) => void;
  setShowKeyStore: (show: boolean) => void;
  setShowPasskeyScreen: (show: boolean) => void;
}

export default function KeyStoreAndPasskey({
  showKeyStore,
  showPasskeyScreen,
  loggedInEmployee,
  onBackToLogin,
  onEnterDashboard,
  setShowKeyStore,
  setShowPasskeyScreen
}: KeyStoreAndPasskeyProps) {
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
  
  // Windows Security simulated popup states
  const [showWinSec, setShowWinSec] = useState<boolean>(false);
  const [winSecStep, setWinSecStep] = useState<'choose' | 'insert'>('choose');
  const [passkeyCodeInput, setPasskeyCodeInput] = useState<string>('');
  const [winSecError, setWinSecError] = useState<string>('');
  const [winSecSelectedEmployee, setWinSecSelectedEmployee] = useState<any>(null);

  const orderFormRef = useRef<HTMLDivElement | null>(null);

  // Render YubiKey display graphic
  const renderMainGraphic = () => {
    let imgSrc = yubiFrontSide;
    let altText = "YubiKey Front & Side Profile View";

    switch (activeThumbnail) {
      case 0:
        imgSrc = yubiFrontSide;
        altText = "Yubikey 5C NFC - Front & Side Profile View";
        break;
      case 1:
        imgSrc = yubiBestSeller;
        altText = "YubiKey 5 Series Best Seller Hands-on Banner";
        break;
      case 2:
        imgSrc = yubiCompatTable;
        altText = "YubiKey Advanced Protocol Compatibility Table";
        break;
      case 3:
        imgSrc = yubiServices;
        altText = "YubiKey Compatible Services List";
        break;
      case 4:
      default:
        imgSrc = yubiFeatures;
        altText = "YubiKey Premium Manufacturing & Design Features";
        break;
    }

    return (
      <div className="flex flex-col items-center justify-center p-2 bg-slate-50 border border-slate-100 rounded-2xl h-[260px] w-full overflow-hidden select-none relative group transition-all duration-350">
        <img
          src={imgSrc}
          alt={altText}
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-2.5 right-2.5 bg-slate-900/75 backdrop-blur-md px-2 py-0.5 rounded-lg text-[8px] font-bold font-mono text-slate-100 uppercase tracking-widest hidden sm:block">
          View {activeThumbnail + 1} / 5
        </div>
      </div>
    );
  };

  const handleWinSecSubmit = () => {
    const code = passkeyCodeInput.trim().toUpperCase();
    if (!code) {
      setWinSecError("Please enter your hardware key code.");
      return;
    }

    if (code === 'JAN20020108SURVILX') {
      let mockEmployee = loggedInEmployee;
      if (!mockEmployee || mockEmployee.employeeId === 'CAM20260618HUJ0') {
        mockEmployee = {
          fullName: 'Aman Yadav',
          email: 'aman.yadav@gmail.com',
          phone: '+91 9876543211',
          education: 'Graduate',
          employeeId: 'JAN20020108SURVILX',
          address: 'Delhi, India',
          photoUrl: '',
          completedAt: new Date().toLocaleDateString('en-GB')
        };
      } else {
        mockEmployee = {
          ...loggedInEmployee,
          employeeId: 'JAN20020108SURVILX'
        };
      }
      
      setShowWinSec(false);
      setPasskeyCodeInput('');
      setPasskeyVerified(true);
      
      // Register in central database if not exists so it displays on lists
      db.insertEmployee(mockEmployee).catch(e => console.error("Error writing employee to database:", e));
      
      onEnterDashboard(mockEmployee);
    } else if (code === 'FEB20020208SURVILX') {
      let mockEmployee = loggedInEmployee;
      if (!mockEmployee || mockEmployee.employeeId === 'CAM20260618HUJ0') {
        mockEmployee = {
          fullName: 'Rahul Kumar',
          email: 'rahul@mail.com',
          phone: '+91 8122334455',
          education: '12th Pass',
          employeeId: 'FEB20020208SURVILX',
          address: 'Noida, Uttar Pradesh',
          photoUrl: '',
          completedAt: new Date().toLocaleDateString('en-GB')
        };
      } else {
        mockEmployee = {
          ...loggedInEmployee,
          employeeId: 'FEB20020208SURVILX'
        };
      }
      
      setShowWinSec(false);
      setPasskeyCodeInput('');
      setPasskeyVerified(true);
      
      db.insertEmployee(mockEmployee).catch(e => console.error("Error writing employee to database:", e));

      onEnterDashboard(mockEmployee);
    } else {
      setWinSecError("Passkey code not recognized. Please verify your hardware security key.");
    }
  };

  if (showKeyStore) {
    return (
      <motion.div
        key="employee-key-store-panel"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-left bg-white max-h-[85vh] overflow-y-auto"
      >
        {/* Title Header bar */}
        <div className="border-b border-slate-150 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50 sticky top-0 z-20 backdrop-blur-md">
          <button
            type="button"
            onClick={() => {
              setShowKeyStore(false);
              setOrderSubmitted(false);
            }}
            className="font-extrabold text-xs text-slate-500 hover:text-red-650 transition flex items-center gap-1 cursor-pointer"
          >
            ← Back to Security Pre-Check
          </button>
          <div className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">
            Official Hardware Key Store
          </div>
        </div>

        {orderSubmitted ? (
          /* ORDER PLACED CONFIRMATION (Image 4 Success screen details) */
          <div className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shadow-inner relative">
                <Check className="h-10 w-10 text-emerald-500" />
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping pointer-events-none" />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              Order Placed Successfully!
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
              We have received and registered your order under our secure employee delivery network. Your key will be dispatched with priority delivery.
            </p>

            {/* Summary receipt card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-[1.5rem] p-6 text-left space-y-4 text-xs font-sans">
              <div className="border-b pb-3 flex justify-between items-center">
                <span className="font-extrabold text-slate-800">Order Reference ID:</span>
                <span className="font-mono font-extrabold text-[#EF4444] uppercase bg-red-50 px-2 py-0.5 rounded">
                  COD-{Math.random().toString(36).substring(3, 9).toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono">DELIVERY TO</span>
                  <span className="font-extrabold text-slate-800 block mt-0.5 capitalize">{orderName || loggedInEmployee?.fullName || "Employee"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono">EST. ARRIVAL</span>
                  <span className="font-extrabold text-emerald-600 block mt-0.5">3 Days (Express Priority)</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono">SHIPPING ADDRESS</span>
                  <span className="font-extrabold text-slate-700 block mt-0.5 capitalize leading-tight">
                    {orderAddr1}{orderAddr2 ? `, ${orderAddr2}` : ''}, {orderCity || 'HQ'}, {orderState || 'Delhi'} - {orderPin || '110001'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono">TOTAL PAID</span>
                  <span className="font-extrabold text-slate-800 block mt-0.5">{couponApplied ? '₹0 COD (Employee Covered)' : `₹${(2000 * orderQty).toLocaleString()} COD`}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider font-mono">DELIVERY METHOD</span>
                  <span className="font-extrabold text-slate-800 block mt-0.5">Cash on Delivery</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-[#854D0E] font-semibold text-left">
              <AlertTriangle className="h-5 w-5 text-[#EAB308] shrink-0 mt-0.5" />
              <p>
                Please verify your phone number <span className="text-slate-900 font-extrabold">{orderPhone || '+91 9999988888'}</span>. Our courier agent will contact this number prior to delivery.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowKeyStore(false);
                setOrderSubmitted(false);
              }}
              className="w-full bg-slate-900 hover:bg-slate-850 cursor-pointer text-white font-extrabold py-4 px-6 rounded-2xl text-sm transition-all duration-200 text-center"
            >
              ← Return to Security Verification Screen
            </button>
          </div>
        ) : (
          /* STORE MAIN DETAILS (Images 2, 3, 4) */
          <div className="divide-y divide-slate-150">
            {/* IMAGE 2 LAYOUT BLOCK */}
            <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start font-sans">
              
              {/* Left side column: Main image & Carousel thumbnails */}
              <div className="md:col-span-5 flex flex-col gap-4 w-full">
                {/* Interactive Viewport */}
                {renderMainGraphic()}

                {/* Thumbnail indicators */}
                <div className="grid grid-cols-5 gap-2 select-none">
                  {[
                    { img: yubiFrontSide, title: "Product profile views" },
                    { img: yubiBestSeller, title: "Best Seller hands-on showcase" },
                    { img: yubiCompatTable, title: "Advanced compatibility table details" },
                    { img: yubiServices, title: "Supported compatible services and software" },
                    { img: yubiFeatures, title: "Quality design elements" }
                  ].map((item, num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setActiveThumbnail(num)}
                      className={`relative aspect-square border-2 rounded-xl overflow-hidden bg-white cursor-pointer flex items-center justify-center p-0.5 transition ${
                        activeThumbnail === num
                          ? 'border-[#EF4444] ring-2 ring-red-150 scale-102'
                          : 'border-slate-200 hover:border-slate-350 bg-slate-50'
                      }`}
                    >
                      <img
                        src={item.img}
                        alt={`YubiKey thumbnail ${num + 1}: ${item.title}`}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right side column: Product Details */}
              <div className="md:col-span-7 space-y-4 text-left w-full">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full">
                    <Award className="h-3 w-3 text-amber-600" /> BEST SELLER
                  </span>
                  <span className="inline-flex items-center gap-1 bg-red-50 border border-red-100 text-red-600 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full">
                    <ShieldCheck className="h-3 w-3 text-red-500" /> OFFICIAL
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                    Yubico YubiKey 5C NFC
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-bold font-sans mt-0.5 leading-snug">
                    Hardware Security Key – USB-C + NFC | Multi-Protocol | FIDO2/WebAuthn Secure Cryptographic Module
                  </p>
                </div>

                {/* Ratings */}
                <div className="flex items-center gap-2 select-none">
                  <div className="flex items-center text-amber-400">
                    <Star className="h-4 w-4 fill-current animate-pulse" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">4.5 Rating</span>
                  <span className="text-xs text-slate-400 font-semibold">(6,070 ratings)</span>
                </div>

                {/* Price strip */}
                <div className="flex items-baseline gap-2 py-2 border-y border-slate-100 select-none">
                  <span className="text-3xl font-black text-slate-950 font-sans">₹2,000</span>
                  <span className="text-base text-slate-400 line-through font-semibold font-mono">₹6,108</span>
                  <span className="text-emerald-500 font-extrabold text-sm ml-2 px-2 py-0.5 bg-emerald-50 rounded-lg">67% OFF</span>
                </div>

                {/* Cash on Delivery available container */}
                <div className="bg-gradient-to-r from-emerald-50/50 to-emerald-50/10 border border-emerald-100 p-4 rounded-2xl flex items-start gap-3 text-left">
                  <div className="bg-emerald-100/80 p-2 rounded-xl text-emerald-600 shrink-0 mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="font-extrabold text-emerald-800 text-xs sm:text-sm font-sans">
                      Cash on Delivery available
                    </h5>
                    <p className="text-emerald-600 text-xs font-medium font-sans leading-relaxed">
                      Pay when you receive the product at your doorstep. Free delivery to all operating locations.
                    </p>
                  </div>
                </div>

                {/* Buy Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    orderFormRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#1E293B] hover:bg-slate-800 cursor-pointer text-white font-extrabold py-4 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-98"
                >
                  <span>Order Now</span>
                  <ChevronRight className="h-4.5 w-4.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* IMAGE 3: FEATURES & COMPATIBILITY */}
            <div className="p-6 sm:p-8 md:p-10 bg-slate-50/60 font-sans text-left">
              <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase font-mono text-center mb-8 border-b pb-2">
                Key Features &amp; Advanced Compatibility
              </h3>

              {/* Features and standards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { icon: <Zap className="h-5 w-5" />, title: "USB-C + NFC", desc: "Plug in via USB-C or tap on NFC-enabled devices." },
                  { icon: <ShieldCheck className="h-5 w-5" />, title: "Multi-Protocol Security", desc: "FIDO2, WebAuthn, U2F, Smart Card, OTP, OpenPGP." },
                  { icon: <ExternalLink className="h-5 w-5" />, title: "Widely Compatible", desc: "Works with Google, Microsoft, Apple, password managers & 100s more." },
                  { icon: <Key className="h-5 w-5" />, title: "Passwordless Login", desc: "Hardware-bound passkey for the strongest authentication." },
                  { icon: <Tv className="h-5 w-5" />, title: "Works with Phones", desc: "NFC tap authentication on Android and iPhone." },
                  { icon: <Lock className="h-5 w-5" />, title: "Tamper-Resistant", desc: "Waterproof, crushproof, no batteries needed." }
                ].map((feat, idx) => (
                  <div key={idx} className="bg-white border border-slate-150 p-5 rounded-2xl flex flex-col gap-3">
                    <div className="h-10 w-10 bg-rose-50 border border-rose-100 text-[#EF4444] rounded-xl flex items-center justify-center shrink-0">
                      {feat.icon}
                    </div>
                    <div>
                      <h5 className="font-extrabold text-xs text-slate-900">{feat.title}</h5>
                      <p className="text-[11px] text-slate-500 font-semibold mt-1 leading-normal">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Advanced Compatibility text list */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h4 className="font-extrabold text-sm text-slate-800 uppercase tracking-widest font-mono text-left mb-4">
                  Advanced Protocols
                </h4>
                <div className="flex flex-wrap gap-1.5 leading-none">
                  {[
                    'WebAuthn', 'FIDO (CTAP 1, 2, 2.1)', 'U2F', 'Smart Card / PIV', 'Yubico OTP', 'OATH-HOTP', 
                    'OATH-TOTP', 'OpenPGP', 'Static Passwords'
                  ].map((plat) => (
                    <span key={plat} className="bg-slate-200 border border-slate-300 text-slate-600 rounded-lg px-2.5 py-1 text-[10px] font-bold">
                      {plat}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {[
                    { title: "EMAIL & PRODUCTIVITY", desc: "Microsoft, Apple ID, Google Account, Dropbox, Proton" },
                    { title: "PASSWORD MANAGERS", desc: "1Password, Bitwarden, KeePass, LastPass" },
                    { title: "PERSONAL FINANCE", desc: "Vanguard, Coinbase, KeyBank, Kraken" },
                    { title: "SOCIAL", desc: "Instagram, Facebook, X, YouTube" }
                  ].map((cat, i) => (
                    <div key={i} className="bg-slate-100 border border-slate-200 p-4 rounded-xl text-left space-y-1">
                      <h6 className="font-extrabold text-[9px] text-[#EF4444] tracking-wider uppercase font-mono">{cat.title}</h6>
                      <p className="text-[10px] text-slate-600 font-extrabold leading-relaxed">{cat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* IMAGE 4: COD SHIPPING ADDRESS & ORDER FORM */}
            <div ref={orderFormRef} className="font-sans antialiased text-left bg-white scroll-mt-20">
              <div className="bg-rose-900 text-white p-6 md:p-8 flex flex-col justify-between items-start rounded-t-3xl">
                <div className="space-y-1">
                  <h4 className="text-2xl font-black tracking-tight font-sans">
                    Order Now
                  </h4>
                  <p className="text-rose-100 text-xs sm:text-sm font-semibold">
                    Free delivery · Cash on Delivery · Employees order free with coupon
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Form Inputs */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!orderName.trim() || !orderPhone.trim() || !orderAddr1.trim() || !orderCity.trim() || !orderState || !orderPin.trim()) {
                      alert("Please fill in all mandatory fields denoted by * symbol.");
                      return;
                    }
                    // Track and sync with Supabase and local storage
                    db.insertYubiOrder({
                      fullName: orderName.trim(),
                      phone: orderPhone.trim(),
                      address: `${orderAddr1.trim()}${orderAddr2 ? `, ${orderAddr2.trim()}` : ''}, ${orderCity.trim()}, ${orderState} - ${orderPin.trim()}`,
                      quantity: orderQty,
                      keyType: couponApplied ? 'YubiKey 5C NFC (Promo ₹0)' : `YubiKey 5C (COD ₹${(2000 * orderQty).toLocaleString()})`
                    });

                    db.insertKeyLog({
                      email: `${orderName.trim()} (${orderPhone.trim()})`,
                      action_type: `YubiKey Ordered (Qty: ${orderQty})`,
                      key_type: couponApplied ? 'YubiKey 5C NFC (Promo ₹0)' : `YubiKey 5C (COD ₹${(2000 * orderQty).toLocaleString()})`,
                      ip_address: `${orderAddr1.trim()}${orderAddr2 ? `, ${orderAddr2.trim()}` : ''}, ${orderCity.trim()}, ${orderState} - ${orderPin.trim()}`
                    });
                    setOrderSubmitted(true);
                  }}
                  className="lg:col-span-7 space-y-5 w-full"
                >
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderName}
                      onChange={(e) => setOrderName(e.target.value)}
                      placeholder={loggedInEmployee?.fullName || "Your full name"}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-850 placeholder-slate-400 focus:border-[#EF4444] focus:outline-none transition font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                      PHONE NUMBER *
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-slate-200">
                      <span className="bg-slate-50 border-r text-xs sm:text-sm text-slate-500 font-bold px-3.5 flex items-center select-none font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[6-9][0-9]{9}"
                        value={orderPhone}
                        onChange={(e) => setOrderPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full bg-white px-4 py-3 text-xs sm:text-sm text-slate-850 placeholder-slate-400 focus:outline-none transition font-medium font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                      ADDRESS LINE 1 *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderAddr1}
                      onChange={(e) => setOrderAddr1(e.target.value)}
                      placeholder="House no, building, street"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-850 placeholder-slate-400 focus:border-[#EF4444] focus:outline-none transition font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                      ADDRESS LINE 2
                    </label>
                    <input
                      type="text"
                      value={orderAddr2}
                      onChange={(e) => setOrderAddr2(e.target.value)}
                      placeholder="Area, landmark (optional)"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-850 placeholder-slate-400 focus:border-[#EF4444] focus:outline-none transition font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                        CITY *
                      </label>
                      <input
                        type="text"
                        required
                        value={orderCity}
                        onChange={(e) => setOrderCity(e.target.value)}
                        placeholder="City"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-850 focus:outline-none transition font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                        STATE *
                      </label>
                      <select
                        required
                        value={orderState}
                        onChange={(e) => setOrderState(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs sm:text-sm text-slate-850 focus:outline-none transition font-bold"
                      >
                        <option value="">-- Select --</option>
                        {['Delhi', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'West Bengal', 'Telangana', 'Uttar Pradesh', 'Gujarat', 'Haryana', 'Punjab', 'Other'].map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                        PIN CODE *
                      </label>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        value={orderPin}
                        onChange={(e) => setOrderPin(e.target.value)}
                        placeholder="Pin Code"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-850 focus:outline-none transition font-medium font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                      QUANTITY
                    </label>
                    <select
                      value={orderQty}
                      onChange={(e) => setOrderQty(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs sm:text-sm text-[#EF4444] focus:outline-none transition font-bold"
                    >
                      {[1, 2, 3, 4, 5].map(q => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#EF4444] hover:bg-red-650 cursor-pointer text-white font-extrabold py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Place Order · {couponApplied ? '₹0 COD' : `₹${(2000 * orderQty).toLocaleString()} COD`}
                  </button>
                </form>

                {/* Right Column invoice */}
                <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-[2rem] p-6 text-left space-y-5 w-full">
                  <h4 className="font-black text-sm text-slate-900 border-b pb-2 uppercase tracking-wide">
                    Order Summary
                  </h4>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-500 font-medium">Product</span>
                      <span className="text-slate-900">Yubico YubiKey 5C NFC × {orderQty}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-500 font-medium">Subtotal Price</span>
                      <span className="text-slate-900 font-mono">₹{(2000 * orderQty).toLocaleString()}</span>
                    </div>
                    
                    {couponApplied && (
                      <div className="flex justify-between items-center text-xs text-emerald-600 font-extrabold font-mono">
                        <span>Promo Code Offset</span>
                        <span>- ₹{(2000 * orderQty).toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-500 font-medium">Delivery Fee</span>
                      <span className="text-emerald-500 font-extrabold">FREE</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t">
                    <label className="text-[9px] font-extrabold text-slate-500 font-mono tracking-widest uppercase block">
                      COUPON CODE
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError(null);
                        }}
                        placeholder="Enter coupon code"
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs border-slate-350 focus:outline-none font-bold uppercase"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCouponError(null);
                          const code = couponCode.trim().toUpperCase();
                          if (code === 'CAMFREE' || code === 'SURVEILX' || code === 'FREEKEY') {
                            setCouponApplied(true);
                          } else {
                            setCouponError("Invalid code.");
                            setCouponApplied(false);
                          }
                        }}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase px-4 rounded-xl cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <span className="text-[10px] text-red-500 font-bold block">{couponError}</span>
                    )}
                    {couponApplied && (
                      <span className="text-[10px] text-emerald-600 font-black block">✓ Coupon Applied!</span>
                    )}
                  </div>

                  <div className="pt-4 border-t flex justify-between items-baseline select-none">
                    <span className="font-black text-sm text-slate-900">Total (COD)</span>
                    <span className="font-extrabold text-2xl text-slate-900 font-sans font-mono animate-fadeIn">
                      {couponApplied ? '₹0' : `₹${(2000 * orderQty).toLocaleString()}`}
                    </span>
                  </div>

                  <div className="pt-2 border-t flex justify-between text-[9px] text-slate-400 font-bold select-none font-mono tracking-wide">
                    <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-500" /> SECURE ORDER</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> FREE DELIVERY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  // PASSKEY SCREEN (Image 1 style)
  return (
    <motion.div
      key="employee-passkey-precheck-panel"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-8 sm:p-10 md:p-12 text-left bg-white max-h-[85vh] overflow-y-auto"
    >
      <div className="flex gap-4 items-center mb-8 font-sans">
        <div className="h-12 w-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 animate-pulse">
          <ShieldCheck className="h-6 w-6 text-[#EF4444]" />
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-tight text-slate-900 leading-tight font-sans">
            Employee Login
          </h3>
          <p className="text-xs text-slate-500 font-medium font-sans mt-0.5">
            Secure access to your SurvilX portal
          </p>
        </div>
      </div>

      {/* Yellow Alert Box (Image 1 style) */}
      <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-[1.5rem] p-6 text-left flex gap-4 items-start mb-8 shadow-sm">
        <div className="h-10 w-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 text-[#EAB308]">
          <Key className="h-5 w-5" />
        </div>
        <div className="space-y-1 font-sans">
          <h4 className="font-extrabold text-[#854D0E] text-sm leading-tight">
            Passkey required to login
          </h4>
          <p className="text-[#854D0E]/90 text-xs font-semibold leading-relaxed">
            Access to SurvilX surveillance systems requires a security key (passkey). Set up your passkey now using a hardware security key or this device.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {passkeyVerifying ? (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center space-y-4 transition">
            <div className="flex justify-center">
              <RefreshCw className="h-10 w-10 text-[#EF4444] animate-spin" />
            </div>
            <div className="space-y-1">
              <h5 className="font-extrabold text-sm text-slate-800">Verifying Hardware Passkey...</h5>
              <p className="text-[11px] text-slate-505 text-slate-550 leading-relaxed max-w-sm mx-auto">
                Insert your physical security key into physical USB port or hold onto NFC sensor now. Waiting for touches...
              </p>
            </div>
          </div>
        ) : passkeyVerified ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-4 text-emerald-800 animate-fadeIn">
            <div className="flex justify-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-500 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h5 className="font-black text-slate-900 text-sm">Passkey Registered &amp; Verified!</h5>
              <p className="text-xs text-emerald-700 font-medium">
                Your hardware protocol handshake has been safely bound to your Employee session.
              </p>
            </div>
            <button
              onClick={() => {
                onEnterDashboard(loggedInEmployee);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition shadow-md shadow-emerald-600/10 active:scale-95 cursor-pointer font-sans w-full"
            >
              Go to Employee Dashboard
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setShowWinSec(true);
              setWinSecStep('choose');
              setPasskeyCodeInput('');
              setWinSecError('');
            }}
            className="w-full bg-[#1E293B] cursor-pointer text-white font-extrabold py-5 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-3 shadow-lg hover:bg-slate-800 transition duration-200"
          >
            <Key className="h-5 w-5 text-amber-400 shrink-0" />
            <span>Set up Passkey</span>
          </button>
        )}

        {/* Buy link block */}
        <div className="bg-[#FAFBFD] border border-slate-150 rounded-[1.5rem] p-5 flex flex-col sm:flex-row gap-4 items-center justify-between text-left mt-8">
          <div className="space-y-1">
            <h5 className="font-extrabold text-xs text-slate-800 font-sans">
              Don't have a hardware security key yet?
            </h5>
          </div>
          <button
            type="button"
            onClick={() => setShowKeyStore(true)}
            className="text-[#EF4444] font-black text-xs hover:underline cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0 group font-sans"
          >
            Get a security key{' '}
            <ChevronRight className="h-4 w-4 tracking-normal transform group-hover:translate-x-0.5 transition" />
          </button>
        </div>
      </div>

      {/* Bottom info link */}
      <div className="pt-8 border-t border-slate-100 flex justify-between items-center text-xs text-slate-450 font-mono mt-8 font-sans">
        <button
          type="button"
          onClick={onBackToLogin}
          className="font-extrabold text-slate-500 hover:text-red-650 transition flex items-center gap-1 cursor-pointer font-sans"
        >
          ← Back to login credentials
        </button>
        <span>SECURED GATEWAY v2.3</span>
      </div>

      {/* Windows Security Simulated Modal */}
      {showWinSec && (
        <div className="fixed inset-0 bg-slate-950/65 z-50 flex items-center justify-center p-4 backdrop-blur-xs font-sans">
          <div className="bg-white text-slate-900 rounded-2xl w-full max-w-[435px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col text-left font-sans animate-scaleUp">
            
            {/* Title / Header bar */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2.5 border-b border-slate-100 select-none">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-sans font-medium">
                {/* Shield Icon from Lucide */}
                <div className="h-4.5 w-4.5 bg-[#0078D4] text-white flex items-center justify-center rounded-[3px] shrink-0">
                  <ShieldCheck className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-sans font-semibold text-[11px] tracking-wide text-slate-600">Windows Security</span>
              </div>
              <button 
                onClick={() => {
                  setShowWinSec(false);
                  setWinSecError('');
                  setPasskeyCodeInput('');
                }}
                className="text-slate-400 hover:text-slate-800 hover:bg-slate-100 px-1.5 py-0.5 rounded transition text-xs font-bold leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            {winSecStep === 'choose' ? (
              /* STEP 1: CHOOSE A PASSKEY (Image 1 style) */
              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-xl font-medium text-slate-900 font-sans tracking-tight leading-snug">
                    Choose a passkey
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {/* Option 1: Mobile device */}
                  <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-xl flex items-center gap-4 hover:bg-slate-100 transition cursor-pointer select-none">
                    <div className="h-10 w-10 bg-slate-200/40 rounded-xl flex items-center justify-center text-slate-600 shrink-0 border border-slate-100">
                      {/* QR grid */}
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" />
                        <path d="M14 14h2v2h-2zm4 4h3v3h-3zm-4 4h3v-3h-3zm4-4h3v3h-3z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="font-sans">
                      <p className="text-[13px] font-medium text-slate-800">iPhone, iPad, or Android device</p>
                    </div>
                  </div>

                  {/* Option 2: Security Key */}
                  <div 
                    onClick={() => {
                      setWinSecStep('insert');
                      setWinSecError('');
                    }}
                    className="border border-slate-200 bg-white p-4 rounded-xl flex items-center gap-4 hover:bg-slate-50 transition cursor-pointer select-none"
                  >
                    <div className="h-10 w-10 bg-[#0078D4]/10 rounded-xl flex items-center justify-center text-[#0078D4] shrink-0 border border-[#0078D4]/5">
                      {/* USB icon */}
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="2" width="12" height="15" rx="2" />
                        <path d="M10 17v5" />
                        <path d="M14 17v5" />
                        <path d="M10 6h4" />
                        <path d="M10 10h4" />
                      </svg>
                    </div>
                    <div className="font-sans">
                      <p className="text-[13px] font-medium text-slate-800">Security key</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setShowWinSec(false)}
                    className="border-2 border-slate-900 bg-white hover:bg-slate-50 font-sans text-xs text-slate-800 font-bold px-10 py-2 rounded-lg transition duration-150 shadow-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* STEP 2: SIGN IN WITH A PASSKEY (Image 2 style) */
              <div className="p-6 space-y-4.5 font-sans">
                <div>
                  <h3 className="text-xl font-medium text-slate-900 tracking-tight">
                    Sign in with a passkey
                  </h3>
                </div>

                {/* Sub Header row with info indicator */}
                <div className="flex items-center justify-between bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="text-slate-700 shrink-0">
                      <svg className="h-5 w-5 text-slate-650" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="6" y="2" width="12" height="15" rx="2" />
                        <path d="M10 17v5" />
                        <path d="M14 17v5" />
                      </svg>
                    </div>
                    <div className="text-left font-sans">
                      <p className="text-[12px] font-bold text-slate-800 leading-tight">Security key</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-none">Passkey for surveilxai.com</p>
                    </div>
                  </div>
                  <div className="h-5 w-5 bg-sky-100 text-[#0078D4] rounded-full flex items-center justify-center text-[11px] font-extrabold select-none shrink-0 font-serif">
                    i
                  </div>
                </div>

                {/* Center Graphic */}
                <div className="py-2.5 text-center space-y-3">
                  <div className="flex justify-center select-none animate-pulse">
                    <div className="relative p-3 rounded-full border-4 border-dashed border-[#0078D4]/20 bg-[#0078D4]/5">
                      <svg className="h-12 w-12 text-[#0078D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="7" y="2" width="10" height="14" rx="2" />
                        <path d="M9 16v4h6v-4" />
                        <path d="M10 5h4" />
                        <path d="M10 9h4" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-[13px] font-semibold text-slate-800 max-w-xs mx-auto text-center leading-relaxed">
                    Insert your security key into the USB port.
                  </p>
                </div>

                {/* Pendrive Submit Prompt */}
                <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 space-y-2.5">
                  <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-550 font-mono">
                    Enter Physical Passkey:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      autoFocus
                      value={passkeyCodeInput}
                      onChange={(e) => {
                        setPasskeyCodeInput(e.target.value);
                        setWinSecError('');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleWinSecSubmit();
                        }
                      }}
                      placeholder="••••••••••••••••"
                      className="bg-white border text-center border-slate-200 focus:border-[#0078D4] rounded-lg py-2 px-3 text-xs text-slate-900 font-mono font-extrabold tracking-wider focus:outline-none focus:ring-1 focus:ring-[#0078D4]/20 w-full shadow-xs"
                    />
                    <button
                      onClick={handleWinSecSubmit}
                      className="bg-[#0078D4] hover:bg-[#005A9E] text-white font-extrabold text-xs px-5 py-2.5 rounded-lg transition duration-150 shrink-0 shadow-md shadow-[#0078D4]/10 cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                  
                  {winSecError && (
                    <p className="text-[10px] text-red-600 font-bold block">
                      ⚠️ {winSecError}
                    </p>
                  )}
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setWinSecStep('choose');
                      setWinSecError('');
                    }}
                    className="text-[#0078D4] hover:underline text-xs font-semibold select-none cursor-pointer"
                  >
                    Choose a different passkey
                  </button>
                  <button 
                    onClick={() => {
                      setShowWinSec(false);
                      setWinSecError('');
                      setPasskeyCodeInput('');
                    }}
                    className="border-2 border-slate-900 bg-white hover:bg-slate-50 font-sans text-xs text-slate-800 font-bold px-8 py-2 rounded-lg transition duration-150 shadow-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </motion.div>
  );
}
