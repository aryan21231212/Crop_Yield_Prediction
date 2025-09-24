// GlassyBadge.jsx
import React from "react";

export default function GlassyBadge() {
  return (
    <div
      className="inline-flex items-center gap-3 px-5 py-2 rounded-full
                 bg-white/6 backdrop-blur-md border border-white/10
                 shadow-lg hover:scale-[1.03] transform-gpu transition
                 duration-200 ease-out"
    >
      {/* blinking dot with ring */}
      <span className="relative flex items-center justify-center w-3 h-3">
        {/* static ring */}
        <span className="absolute inset-0 rounded-full ring-2 ring-white/30" />
        {/* blinking dot */}
        <span
          className="absolute inset-0 rounded-full animate-blink"
          style={{ backgroundColor: "#34d399" }}
        />
      </span>

      {/* label */}
      <span className="text-sm font-semibold drop-shadow-md">
        Top notch webinar platform
      </span>

      {/* blinking keyframes */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}
