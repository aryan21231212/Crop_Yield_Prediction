// GlassyBadge.jsx
import React from "react";

export default function GlassyBadge() {
  return (
    <>
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full
                      bg-white/6 backdrop-blur-md border border-white/10
                      shadow-lg hover:scale-[1.03] transform-gpu transition
                      duration-200 ease-out">
        {/* blinking dot */}
        <span className="flex items-center justify-center">
          <span
            className="w-3.5 h-3.5 rounded-full ring-2 ring-white/30
                       shadow-sm"
            style={{ backgroundColor: "#34d399" /* tailwind emerald-400 */ }}
            aria-hidden="true"
          />
          {/* add an absolutely-positioned blink layer so ring stays */}
          <span className="ml-[-14px] block w-3.5 h-3.5 rounded-full animate-blink" />
        </span>

        {/* label */}
        <span className="text-sm font-semibold  drop-shadow-md">
          Top notch webinar platform
        </span>
      </div>

      {/* local styles for blinking (no Tailwind config changes needed) */}
      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-blink {
          animation: blink 1.2s steps(2, start) infinite;
          background-color: transparent; /* keeps the base dot visible from inline style */
          border-radius: 9999px;
        }

        /* Better layering so the blinking does not remove the ring */
        .animate-blink::before {
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          background-color: #34d399; /* same as the dot color */
          border-radius: 9999px;
        }
      `}</style>
    </>
  );
}
