import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Server, ShieldCheck, AlertTriangle, Play, Pause, Fullscreen, RefreshCw, Layers, Sliders, BellRing, Eye, CheckCircle2, XCircle } from 'lucide-react';
import { CameraFeed, SecurityIncident } from '../types';
import { db } from '../lib/supabase';

export default function CommandCenterDashboard() {
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');
  const [filterStatus, setFilterStatus] = useState<'all' | 'alerting' | 'offline'>('all');
  const [isLiveScanning, setIsLiveScanning] = useState(true);
  const [activeCameraId, setActiveCameraId] = useState<string>('cam-3');
  const [scanPulse, setScanPulse] = useState(0);

  // Stats
  const topStats = [
    { label: 'Total Locations', value: '24', change: 'Global Network', icon: Server, color: 'text-indigo-400' },
    { label: 'Active Cameras', value: '312', change: '99.9% Stream Rate', icon: Camera, color: 'text-white' },
    { label: 'AI Alerts Today', value: '47', change: '+12% vs yesterday', icon: AlertTriangle, color: 'text-brand' },
    { label: 'Verified Incidents', value: '12', change: 'Remote Action taken', icon: ShieldCheck, color: 'text-emerald-400 font-bold' }
  ];

  // Camera feeds mock starting pool
  const initialFeeds: CameraFeed[] = [
    { id: 'cam-1', name: 'Main Entry Dome', location: 'Grocery Site B', status: 'online', riskScore: 12, activityType: 'Normal Foot Traffic', timestamp: '14:36:12' },
    { id: 'cam-2', name: 'POS Counter 04', location: 'Convenience Site C', status: 'online', riskScore: 18, activityType: 'Payment processing', timestamp: '14:35:48' },
    { id: 'cam-3', name: 'Aisle 07 (Liquor / High-Value)', location: 'Grocery Site B', status: 'alerting', riskScore: 92, activityType: 'Concealment Patterns Detected', timestamp: '14:36:44' },
    { id: 'cam-4', name: 'Rear Loading Dock', location: 'Warehouse Central', status: 'online', riskScore: 5, activityType: 'Idling Vehicle', timestamp: '14:34:02' },
    { id: 'cam-5', name: 'South Employee Exit', location: 'Convenience Site C', status: 'offline', riskScore: 0, activityType: 'Signal Lost', timestamp: '14:30:15' },
    { id: 'cam-6', name: 'Self Checkout 02', location: 'Grocery Site B', status: 'online', riskScore: 35, activityType: 'Slight delay pattern', timestamp: '14:36:20' }
  ];

  const [feeds, setFeeds] = useState<CameraFeed[]>(initialFeeds);

  // Verified Incidents Pool with detailed records
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);

  // Pull active security threats live from Supabase or cache fallback
  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const liveThreats = await db.getIncidents();
        if (liveThreats && liveThreats.length > 0) {
          setIncidents(liveThreats);
        } else {
          // Starter fallback entries if empty
          setIncidents([
            { id: '1', location: 'Grocery Site B', camera: 'Aisle 07', time: '14:36:44', type: 'Product Concealment', status: 'pending', riskScore: 92, description: 'Skeletal track identified item passing from rack to jacket interior pocket.' },
            { id: '2', location: 'Warehouse Central', camera: 'South Fence Yard', time: '14:12:05', type: 'After-Hours Foot Intrusion', status: 'verified', riskScore: 84, description: 'Human outline identified crossing fence perimeter at 02:11am.' },
            { id: '3', location: 'Convenience Site C', camera: 'POS Counter 01', time: '13:58:33', type: 'Unattended Cash Tray', status: 'false_alarm', riskScore: 45, description: 'Drawer remained open after employee step-away, analyzed as housekeeping error.' }
          ]);
        }
      } catch (err) {
        console.error("Failed to load live monitor feeds:", err);
      }
    };
    fetchThreats();
  }, []);

  // Handle live scanning effect & simulate dynamic alert flow
  useEffect(() => {
    if (!isLiveScanning) return;

    const interval = setInterval(() => {
      setScanPulse(prev => (prev + 1) % 100);

      // Randomly change a riskScore or append an alert
      setFeeds(prevFeeds => 
        prevFeeds.map(feed => {
          if (feed.id === 'cam-3') return feed; // keep cam-3 alerting
          if (feed.id === 'cam-5') return feed; // keep cam-5 offline
          
          // randomize other scores slightly
          const variation = Math.floor(Math.random() * 9) - 4;
          const newScore = Math.max(1, Math.min(80, feed.riskScore + variation));
          
          return {
            ...feed,
            riskScore: newScore,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveScanning]);

  // filter logical sets
  const filteredFeeds = feeds.filter(feed => {
    if (selectedLocation !== 'All Locations' && feed.location !== selectedLocation) return false;
    if (filterStatus === 'alerting' && feed.status !== 'alerting') return false;
    if (filterStatus === 'offline' && feed.status !== 'offline') return false;
    return true;
  });

  const activeCameraObj = feeds.find(c => c.id === activeCameraId) || feeds[0];

  const handleUpdateStatus = (incidentId: string, nextStatus: 'verified' | 'false_alarm') => {
    setIncidents(prev =>
      prev.map(inc => inc.id === incidentId ? { ...inc, status: nextStatus } : inc)
    );
  };

  return (
    <section id="demo-section" className="py-24 bg-[#050B1A] text-white relative overflow-hidden border-t border-slate-900/60">
      
      {/* Absolute Grid Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c25411a_1px,transparent_1px),linear-gradient(to_bottom,#1c25411a_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-brand/15 border border-brand/20 px-3 py-1 rounded-full text-brand text-xs font-bold uppercase tracking-wider mb-3">
            <BellRing className="h-3 w-3 animate-bounce" /> SURVEILX VIRTUAL DEMO
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">
            A Modern Command Center <br className="hidden md:block" />
            For Every Camera
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Interact with our simulated console. See how neural detection routines trigger, filter risks, and coordinate with off-site specialists to protect store locations.
          </p>
        </div>

        {/* TOP STATS PANELS (Section 5 item) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {topStats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={i} 
                className="bg-[#0B132B]/80 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <IconComponent className="h-20 w-20 text-white" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-slate-400 font-sans tracking-tight uppercase">{stat.label}</span>
                  <div className={`p-2 rounded-lg bg-slate-950/40 ${stat.color}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-black font-sans leading-none">{stat.value}</div>
                <p className="text-[10px] text-slate-500 font-mono mt-1">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* CORE CONSOLE WORKBENCH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="workbench-container">
          
          {/* CONSOLE LEFT: Live Feed Viewer & Grid List (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between" id="workbench-left">
            <div className="bg-[#0B132B] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              
              {/* Console Feed Header controls */}
              <div className="bg-slate-950 px-5 py-4 border-b border-slate-900 flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-90"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                  </span>
                  <span className="text-white font-bold tracking-tight">ACTIVE SURVEILLANCE TERM_ID // SOL-998</span>
                </div>

                {/* Live simulation control actions */}
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setIsLiveScanning(!isLiveScanning)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
                      isLiveScanning 
                        ? 'bg-red-500/10 text-brand border border-brand/20' 
                        : 'bg-slate-900 border border-slate-800 text-slate-400'
                    }`}
                  >
                    {isLiveScanning ? (
                      <>
                        <Pause className="h-3 w-3" /> PAUSE STREAM
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3" /> ENGAGE STREAM
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setFeeds(initialFeeds);
                      setIsLiveScanning(true);
                    }}
                    className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded transition duration-200"
                  >
                    <RefreshCw className="h-3 w-3" /> REBOOT MATRIX
                  </button>
                </div>
              </div>

              {/* ACTIVE STREAM TARGET (CAM-3 Simulation Screen) */}
              <div className="relative bg-black min-h-[340px] md:min-h-[400px] flex items-center justify-center p-4">
                
                {/* Security camera raster overlay lines */}
                <div className="absolute inset-0 bg-linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)); bg-[size:100%_4px,6px_100%] pointer-events-none opacity-40" />

                {/* Custom simulated video frame loop based on state */}
                <div className="text-center space-y-4 w-full">
                  
                  {activeCameraObj.status === 'offline' ? (
                    <div className="py-12 space-y-3">
                      <XCircle className="h-14 w-14 text-red-500 mx-auto animate-pulse" />
                      <h4 className="text-lg font-bold text-red-500 font-mono tracking-wider">⚠️ TIMEOUT: SIGNAL_CARRIER_LOST</h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto font-sans">
                        Camera {activeCameraObj.name} in {activeCameraObj.location} has dropped signal connection metrics. Pinging hardware...
                      </p>
                    </div>
                  ) : (
                    <div className="relative border border-slate-800 rounded-xl overflow-hidden mx-auto max-w-2xl bg-neutral-900 h-64 md:h-80 flex items-center justify-center">
                      
                      {/* Live Camera canvas simulator with overlays */}
                      <div className="absolute inset-0 flex flex-col justify-between p-4">
                        
                        {/* Upper indicators */}
                        <div className="flex justify-between items-start">
                          <div className="bg-black/75 px-3 py-1.5 rounded text-[10px] font-mono border border-slate-800 flex items-center gap-2">
                            <span className={`h-1.5 w-1.5 rounded-full ${activeCameraObj.status === 'alerting' ? 'bg-red-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
                            REC: {activeCameraObj.name}
                          </div>

                          <div className="bg-black/75 px-3 py-1.5 rounded text-[10px] font-mono border border-slate-800">
                            COORD: 37.7749° N, 122.4194° W
                          </div>
                        </div>

                        {/* Mid bounding boxes simulation (especially for alerting) */}
                        {activeCameraObj.status === 'alerting' ? (
                          <div className="relative h-28 flex items-center justify-center">
                            
                            {/* Skeletal Bounding Box overlay */}
                            <motion.div 
                              animate={{ scale: [1, 1.02, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="absolute w-44 h-24 border-2 border-brand bg-brand/10 rounded flex flex-col justify-between p-2 text-[9px] font-mono text-white tracking-tight"
                            >
                              <div className="flex justify-between items-start font-bold">
                                <span>SUSPECT_CONCEALMENT</span>
                                <span className="bg-brand px-1 py-0.5 rounded text-[8px]">92% MATCH</span>
                              </div>
                              <div className="flex justify-between text-[8px] text-slate-300">
                                <span>T_DEV: LIQUOR_SHELF</span>
                                <span>V_VEC: DOWN_POCKET</span>
                              </div>
                            </motion.div>
                          </div>
                        ) : (
                          <div className="relative h-28 flex items-center justify-center">
                            {/* Normal box tracking simulation */}
                            <div className="border border-emerald-500 bg-emerald-500/5 h-20 w-32 rounded text-[7px] font-mono text-emerald-400 p-1">
                              TRACK: HUMAN #88
                            </div>
                          </div>
                        )}

                        {/* Lower details */}
                        <div className="flex justify-between items-end">
                          <div className="bg-black/75 px-3 py-1.5 rounded text-[10px] font-mono border border-slate-800 space-y-0.5 text-left">
                            <div>LOCATION: {activeCameraObj.location.toUpperCase()}</div>
                            <div>ACTIVITY: {activeCameraObj.activityType}</div>
                          </div>

                          {/* Risk Score Gauge */}
                          <div className="bg-black/75 px-3 py-1.5 rounded text-[10px] font-mono border border-slate-850 text-right">
                            <div className="text-slate-500">THREAT_YIELD</div>
                            <div className={`font-bold text-xs ${activeCameraObj.riskScore > 70 ? 'text-brand' : 'text-emerald-400'}`}>
                              {activeCameraObj.riskScore}% RISK
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Grid Selector TABS */}
              <div className="p-4 bg-slate-950 border-t border-slate-900 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {feeds.map((feed) => {
                  const isCur = feed.id === activeCameraId;
                  return (
                    <button
                      key={feed.id}
                      onClick={() => setActiveCameraId(feed.id)}
                      className={`text-left p-2.5 rounded-lg border transition duration-200 cursor-pointer ${
                        isCur 
                          ? 'bg-[#0B132B] border-brand shadow-sm text-white' 
                          : 'bg-slate-905 border-slate-900 hover:border-slate-800 text-slate-400 hover:text-white'
                      }`}
                      id={`grid-select-${feed.id}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-mono font-bold font-sans tracking-tight block truncate uppercase">{feed.name}</span>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          feed.status === 'offline' ? 'bg-red-500' : feed.status === 'alerting' ? 'bg-brand animate-ping' : 'bg-emerald-500'
                        }`} />
                      </div>
                      <div className="text-[9px] font-mono font-semibold flex justify-between">
                        <span>{feed.location.split(' ')[0]}</span>
                        <span className={feed.riskScore > 70 ? 'text-brand' : 'text-slate-500'}>{feed.riskScore}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          {/* CONSOLE RIGHT: AI Threat Feed & Risk verification (4 cols) */}
          <div className="lg:col-span-4 flex" id="workbench-right">
            <div className="bg-[#0B132B] border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between w-full h-full relative overflow-hidden">
              <div>
                <div className="flex justify-between items-center mb-5 border-b border-slate-800/80 pb-3">
                  <span className="text-xs font-bold font-mono text-brand flex items-center gap-1.5">
                    <Sliders className="h-4 w-4" /> AI INCIDENT TIMELINE
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">VERIFIER // LOGS</span>
                </div>

                {/* List of active log items */}
                <div className="space-y-4">
                  {incidents.map((incident) => (
                    <div 
                      key={incident.id}
                      className="bg-slate-950/75 border border-slate-900 rounded-xl p-4 space-y-2.5 relative overflow-hidden"
                      id={`incident-item-${incident.id}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-bold py-0.5 px-2 bg-red-500/10 text-brand rounded-full border border-red-500/20 uppercase tracking-widest font-mono">
                            {incident.type}
                          </span>
                          <span className="block text-[10px] text-slate-500 font-mono mt-1">
                            {incident.location} • {incident.camera}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold ${incident.riskScore > 75 ? 'text-brand' : 'text-emerald-400'}`}>
                          Risk Score: {incident.riskScore}%
                        </span>
                      </div>

                      <p className="text-slate-300 text-xs font-sans leading-relaxed">
                        {incident.description}
                      </p>

                      {/* Action verification workflow simulator */}
                      <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-xs">
                        <span className="text-[10px] font-mono text-slate-400">STATUS MAPPING</span>
                        
                        {incident.status === 'pending' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateStatus(incident.id, 'verified')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1 px-2.5 rounded text-[9px] font-mono flex items-center gap-0.5 transition"
                            >
                              <CheckCircle2 className="h-3 w-3" /> VERIFY
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(incident.id, 'false_alarm')}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-1 px-2.5 rounded text-[9px] font-mono flex items-center gap-0.5 transition"
                            >
                              DISMISS
                            </button>
                          </div>
                        ) : (
                          <span className={`text-[10px] font-mono font-bold uppercase ${
                            incident.status === 'verified' ? 'text-emerald-400' : 'text-slate-500'
                          }`}>
                            {incident.status === 'verified' ? '● VERIFIED & ESCALATED' : '○ FALSE ALARM CLOSED'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure dispatch CTA */}
              <div className="mt-8 pt-4 border-t border-slate-850 text-center">
                <p className="text-[11px] text-slate-400 leading-normal mb-3">
                  Want custom monitoring rules on your existing security channels?
                </p>
                <a
                  href="#contact-section"
                  className="inline-flex w-full items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-xl text-xs transition-all duration-200 shadow-sm"
                >
                  <Eye className="h-4 w-4" /> Schedule Custom Dashboard Review
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
