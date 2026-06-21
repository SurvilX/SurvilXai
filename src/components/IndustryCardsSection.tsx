import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Store, Zap, Warehouse, Building, ShoppingBag, Utensils, Truck, ShieldAlert, ArrowUpRight } from 'lucide-react';

export default function IndustryCardsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const industries = [
    {
      id: 1,
      title: 'Grocery Stores',
      icon: ShoppingCart,
      metrics: 'CAM 01',
      desc: 'High-density coverage for checkout lines, active aisles, stock zones, and fresh food counters.',
      hoverFeature: 'POS Transaction Correlation',
      color: 'from-orange-500/20 to-red-600/20',
      imgUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Convenience Stores',
      icon: Store,
      metrics: 'CAM 02',
      desc: 'Late-night safety, cash counter visibility, product theft detection and outdoor area surveillance.',
      hoverFeature: 'After-Hours Intruder Traps',
      color: 'from-red-500/20 to-pink-600/20',
      imgUrl: 'https://images.unsplash.com/photo-1604719312563-8912e9227c6a?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Micro Markets',
      icon: Zap,
      metrics: 'CAM 03',
      desc: 'Autonomous retail environments with smart skeletal trackers reporting product handling activity.',
      hoverFeature: 'Grab-and-Run Event Flag',
      color: 'from-amber-500/20 to-orange-600/20',
      imgUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      title: 'Warehouses',
      icon: Warehouse,
      metrics: 'CAM 04',
      desc: 'Gate verification, loading docks, high-value bulk racks, and secure perimeter protection lines.',
      hoverFeature: 'License Plate Tracker Grounding',
      color: 'from-indigo-600/20 to-brand/20',
      imgUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      title: 'Offices & Commercial',
      icon: Building,
      metrics: 'CAM 05',
      desc: 'Sentry rules for badged doors, elevator banks, datacenter access points, and server suites.',
      hoverFeature: 'Tailgating Detection Filters',
      color: 'from-blue-600/20 to-indigo-600/20',
      imgUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 6,
      title: 'Apparel Retail',
      icon: ShoppingBag,
      metrics: 'CAM 06',
      desc: 'Skeletal track alerts on luxury apparel clothing shelves, shopping racks, and stockrooms.',
      hoverFeature: 'Product Handling Vector Scans',
      color: 'from-rose-500/20 to-purple-600/20',
      imgUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 7,
      title: 'Food Service & Cafeterias',
      icon: Utensils,
      metrics: 'CAM 07',
      desc: 'Counter voids, cash drawers, dining rows, order pickup zones, and delivery staging perimeters.',
      hoverFeature: 'Sweethearting Checkout Alarms',
      color: 'from-emerald-500/20 to-teal-600/20',
      imgUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 8,
      title: 'Parking & Outdoor Areas',
      icon: Truck,
      metrics: 'CAM 08',
      desc: 'Vehicle tracking, loitering detection, dark parking garage perimeter checks and tripwires.',
      hoverFeature: 'Virtual Tripwire Alarms',
      color: 'from-purple-600/20 to-red-650/20',
      imgUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="industries-section" className="py-24 bg-[#050B1A] text-white relative overflow-hidden border-t border-slate-900/60">
      
      {/* Visual background details */}
      <div className="absolute inset-0 bg-radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops)) from-indigo-950/10 via-slate-950 to-black -z-10" />
      <div className="absolute top-[30%] right-[5%] w-96 h-96 bg-red-600/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand/15 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldAlert className="h-3.5 w-3.5" /> SECURED ENVIRONMENTS
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">
            Designed for High-Risk, <br className="hidden md:block font-sans" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-rose-500 to-indigo-400">
              High-Value Environments
            </span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto text-sm md:text-base">
            Every business environment has unique threat profiles. SurveilX AI custom-configures localized monitoring rules to eliminate blind spots.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="industries-grid">
          {industries.map((ind, i) => {
            const IconComponent = ind.icon;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={ind.id}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                className={`group relative overflow-hidden rounded-[1.8rem] border border-slate-900 bg-slate-950 p-6 flex flex-col justify-between h-[360px] cursor-pointer shadow-lg transition-all duration-300 ${
                  isHovered ? 'shadow-2xl shadow-brand/10 border-slate-700/80' : ''
                }`}
                id={`industry-card-${ind.id}`}
              >
                {/* Background image covering the full card area with subtle contrast reduction / custom opacity overlay */}
                <div className="absolute inset-0 -z-10 bg-slate-950">
                  <img
                    src={ind.imgUrl}
                    alt={ind.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-35 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Rich dark vignette and linear gradients to ensure complete high contrast of typography */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950/80 to-slate-950/40" />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${ind.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
                </div>

                {/* Top header row: Red signal indicator badge on the top right */}
                <div className="flex justify-between items-start">
                  <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-black/60 border border-white/10 text-slate-400 group-hover:bg-brand group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-md">
                    <IconComponent className="h-4.5 w-4.5" />
                  </div>
                  
                  {/* Image 1 Compliant Active Camera Tracker Label in the top right corner */}
                  <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5 shadow-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444] animate-pulse" />
                    {ind.metrics}
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-black text-white tracking-tight leading-none group-hover:text-brand transition-colors duration-150">
                      {ind.title}
                    </h3>
                    <div className="h-6 w-6 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:bg-brand/20 group-hover:text-brand transition-colors duration-200">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* High contrast descriptive text that is fully readable relative to dark backgrounds */}
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium line-clamp-3">
                    {ind.desc}
                  </p>

                  {/* Technical Algorithm feature detail shown inside card */}
                  <div className="pt-2 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span className="group-hover:text-amber-500 transition-colors">{ind.hoverFeature}</span>
                    <span className="text-[9px] tracking-wider text-slate-600">ACTIVE</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Dynamic call out info banner */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <p className="text-slate-400 text-xs">
            Don't see your specific industrial complex listed? We provide bespoke vector customization for high-security environments, cargo container bays, and luxury jewelry houses globally.
          </p>
          <a
            href="#contact-section"
            className="inline-flex items-center gap-1.5 text-brand text-xs font-bold font-mono uppercase mt-4 hover:text-brand-dark transition-colors duration-200"
          >
            Request Bespoke Vector Customization →
          </a>
        </div>

      </div>
    </section>
  );
}
