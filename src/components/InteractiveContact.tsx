import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Users, ShieldAlert, CheckCircle2, Send, ChevronRight, FileCheck, Building2, MapPin } from 'lucide-react';
import { AuditFormData } from '../types';
import { db } from '../lib/supabase';

export default function InteractiveContact() {
  const [formData, setFormData] = useState<AuditFormData>({
    fullName: '',
    companyName: '',
    businessType: 'Retail Store',
    numberOfLocations: '1-5',
    phone: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [selectedAuditArea, setSelectedAuditArea] = useState<string>('cctv_ai_upgrade');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;
    
    setIsSubmitting(true);
    // Push the contact details directly to Supabase table
    db.insertContact({
      fullName: formData.fullName,
      companyName: formData.companyName,
      businessType: formData.businessType,
      numberOfLocations: formData.numberOfLocations,
      phone: formData.phone,
      email: formData.email,
      message: formData.message
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
    }, 1500);
  };

  const auditAreas = [
    { id: 'cctv_ai_upgrade', label: 'CCTV AI Upgrade Scan', desc: 'Determine if existing cameras support computer vision rules.' },
    { id: 'theft_shield', label: 'Theft & Loss Prevention Audit', desc: 'Analyze floor plan high-risk coverage & blind spots.' },
    { id: 'smart_cashier', label: 'Cashier/POS Event Matching', desc: 'Correlate cashier transaction streams with video logs.' },
    { id: 'multi_site_sync', label: 'Multi-Location HQ Sync', desc: 'Review bandwidth & centralized monitoring strategies.' }
  ];

  return (
    <section id="contact-section" className="py-20 bg-white relative overflow-hidden text-navy">
      {/* Decorative vector background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 -z-10" />
      <div className="absolute top-10 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldAlert className="h-3 w-3" /> SECURITY ASSESSMENT
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            Request Your Free Security Audit
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Connect with a SurveilX AI Loss Prevention expert to verify camera capabilities, explore smart detection rules, and configure live monitoring safeguards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-grid">
          {/* LEFT COLUMN: CONTACT SYSTEM DETAILS (5 cols) */}
          <div className="lg:col-span-5 space-y-8" id="contact-left-col">
            <div className="bg-[#0B132B] text-white p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-xl border border-slate-800">
              {/* Mesh background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-indigo-500/15 -z-10" />
              
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileCheck className="text-brand h-5 w-5" />
                Audit Scope Overview
              </h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Our certified security consultants perform full diagnostic mapping on your premises' parameters.
              </p>

              <div className="space-y-4">
                {auditAreas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedAuditArea(area.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 ${
                      selectedAuditArea === area.id
                        ? 'bg-slate-900 border-brand shadow-lg text-white'
                        : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50'
                    }`}
                    id={`audit-area-${area.id}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-xs uppercase tracking-wide">{area.label}</span>
                      {selectedAuditArea === area.id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-brand animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-sans leading-normal">{area.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Contact methods */}
            <div className="space-y-4">
              <h4 className="font-bold text-navy text-sm uppercase tracking-wider">Direct Channels</h4>
              
              <a href="mailto:help.survilxai@outlook.com" className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition group">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-50 text-brand group-hover:bg-brand group-hover:text-white transition duration-200">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Sales Inquiry Email</div>
                  <div className="text-sm font-bold text-navy font-mono">help.survilxai@outlook.com</div>
                </div>
              </a>

              <a href="tel:+18005553921" className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition group">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-50 text-brand group-hover:bg-brand group-hover:text-white transition duration-200">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Monitoring Services Direct</div>
                  <div className="text-sm font-bold text-navy font-mono">+1 (800) 555-3921</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Service Hours</div>
                  <div className="text-xs font-bold text-navy">24/7/365 CCTV Analytics Live Team</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT REQUEST FORM (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50/50 p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm" id="contact-right-col">
            <AnimatePresence mode="wait">
              {!isDone ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h3 className="text-lg font-bold text-navy mb-4">Loss Prevention Assessment Questionnaire</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Marcus Peterson"
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition"
                        id="form-fullname"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Company Name *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                          <Building2 className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          required
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="e.g. Peterson Retail Foods"
                          className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-navy focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition"
                          id="form-company"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Business Type</label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition"
                        id="form-type"
                      >
                        <option value="Retail Store">Grocery / Supermarket</option>
                        <option value="Convenience Store">Convenience Store</option>
                        <option value="Micro Market">Micro Market / Automated Retail</option>
                        <option value="Warehouse">Industrial Warehouse & Logistics</option>
                        <option value="Office">Commercial Office Space</option>
                        <option value="Food Service">Food Service & QSR Cafeterias</option>
                        <option value="Other">Other Enterprise Setting</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Number of Locations</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                          <MapPin className="h-4 w-4" />
                        </span>
                        <select
                          name="numberOfLocations"
                          value={formData.numberOfLocations}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-navy focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition"
                          id="form-locations"
                        >
                          <option value="1">1 Location</option>
                          <option value="2-5">2-5 Locations</option>
                          <option value="6-20">6-20 Locations</option>
                          <option value="21-100">21-100 Locations</option>
                          <option value="100+">100+ Enterprise Sites</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. (415) 555-2391"
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition"
                        id="form-phone"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. marcus@petersonfoods.com"
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition"
                        id="form-email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Message / Details of Existing CCTV Setup</label>
                    <textarea
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="e.g. We have 14 analog and 6 IP standard dome cameras in our central market floor. Looking to replace active security patrols with SurveilX AI active alert telemetry..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-navy focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition resize-none"
                      id="form-message"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand text-white py-3.5 text-sm font-bold shadow-md shadow-red-500/10 hover:bg-brand-dark transition-all duration-200 disabled:opacity-50"
                      id="btn-submit-audit"
                    >
                      {isSubmitting ? (
                        <>Processing Assessment Request...</>
                      ) : (
                        <>
                          Request Custom security Audit <ChevronRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-2">
                      🔒 Your parameters are securely encrypted before transmission. SurveilX AI respects privacy under extreme security guidelines.
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-5"
                >
                  <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-inner">
                    <CheckCircle2 className="h-10 w-10 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy">Audit Request Initiated!</h3>
                    <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
                      Thank you, <span className="font-semibold text-navy">{formData.fullName}</span> from <span className="font-semibold text-brand">{formData.companyName}</span>.
                      Your request has been filed for <span className="font-semibold text-navy">{formData.numberOfLocations} locations</span>.
                    </p>
                  </div>
                  <div className="max-w-md mx-auto bg-slate-100/80 p-5 rounded-xl border border-slate-200 text-left text-xs space-y-2 font-mono">
                    <div className="text-slate-500 font-bold border-b border-slate-200 pb-1 flex justify-between">
                      <span>AUDIT_SESSION_INITIATED</span>
                      <span className="text-emerald-600">STATE: PENDING_ALLOCATION</span>
                    </div>
                    <div><span className="text-slate-500">ASSIGNED_EXPERTISE:</span> {selectedAuditArea.toUpperCase()}</div>
                    <div><span className="text-slate-400">DISPATCH_TELEGRAM:</span> We are dispatching SurveilX loss assessment protocols to <span className="text-navy font-sans font-bold">{formData.email}</span> within the next 30 minutes.</div>
                  </div>
                  <button
                    onClick={() => { setIsDone(false); setFormData({ fullName: '', companyName: '', businessType: 'Retail Store', numberOfLocations: '1-5', phone: '', email: '', message: '' }); }}
                    className="inline-flex items-center gap-1.5 text-xs text-brand hover:text-brand-dark font-bold font-mono transition"
                    id="btn-another-audit"
                  >
                    File Another Location Audit Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
