import React from 'react';

interface SurvilXLogoProps {
  className?: string;
  size?: number;
  showPing?: boolean;
}

export default function SurvilXLogo({ className = '', size = 40, showPing = true }: SurvilXLogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
      >
        {/* Shield Back/Left Side (Slightly Dark Slate) */}
        <path
          d="M 100,20 C 60,20 45,35 45,110 C 45,155 80,180 100,195"
          stroke="#1E293B"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 100,20 C 60,20 45,35 45,110 C 45,155 80,180 100,195"
          stroke="#0F172A"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Shield Right Dynamic Sector (Vibrant Red) */}
        <path
          d="M 100,195 C 100,195 155,170 155,115 C 155,75 150,55 145,45"
          stroke="#EF4444"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 100,195 C 100,195 155,170 155,115 C 155,75 150,55 145,45"
          stroke="#F87171"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Disintegrating Pixel Cluster (Top Right Data Flow) */}
        {/* Red Pixels */}
        <rect x="175" y="15" width="12" height="12" rx="1.5" fill="#EF4444" />
        <rect x="160" y="30" width="16" height="16" rx="2" fill="#EF4444" />
        <rect x="190" y="32" width="8" height="8" rx="1" fill="#EF4444" />
        <rect x="145" y="15" width="10" height="10" rx="1.5" fill="#EF4444" />
        
        {/* Dark Pixels */}
        <rect x="178" y="35" width="10" height="10" rx="1.5" fill="#1E293B" />
        <rect x="162" y="10" width="8" height="8" rx="1" fill="#1E293B" />
        <rect x="148" y="28" width="12" height="12" rx="1.5" fill="#1E293B" />

        {/* Camera Mount Stand (Left attachment) */}
        <rect x="30" y="115" width="16" height="32" rx="4" fill="#2D3748" stroke="#1A202C" strokeWidth="2" transform="rotate(-15 30 115)" />
        <path d="M 40,125 L 75,135" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
        <path d="M 40,125 L 75,135" stroke="#4A5568" strokeWidth="4" strokeLinecap="round" />
        <circle cx="75" cy="135" r="8" fill="#1A202C" />

        {/* Camera Body (Sleek CCTV shape pointed to the right) */}
        {/* Main cylinder barrel */}
        <rect x="70" y="80" width="95" height="50" rx="12" fill="#2D3748" stroke="#1A202C" strokeWidth="3" transform="rotate(-15 70 80)" />
        {/* Camera top sunvisor/hood */}
        <path d="M 60,82 L 155,57 C 160,55 165,60 163,65 L 158,82 Z" fill="#4A5568" stroke="#1A202C" strokeWidth="2" />
        
        {/* Camera front bezel */}
        <ellipse cx="140" cy="100" rx="14" ry="24" fill="#1A202C" transform="rotate(-15 140 100)" />
        {/* Inner lens glass */}
        <ellipse cx="140" cy="100" rx="10" ry="18" fill="#0F172A" transform="rotate(-15 140 100)" />
        
        {/* Glowing Red Camera Lens (Target LED) */}
        <circle cx="138" cy="100" r="5" fill="#EF4444" />
        <circle cx="138" cy="100" r="2" fill="#FFFFFF" />
      </svg>
      {showPing && (
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF4444]"></span>
        </span>
      )}
    </div>
  );
}
