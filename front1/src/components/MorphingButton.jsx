import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

export default function MorphingButton() {
  const [hovered, setHovered] = useState(false);

  const firstText = "Get Started ";
  // Make secondText an array: characters + icon
  const secondText = ["Let's Go", <MdArrowOutward key="icon" className="inline text-lg " />];

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative px-8 py-3 font-semibold text-white rounded-full shadow-xl
        bg-slate-900 border border-slate-700
        overflow-hidden transition-all duration-500 ease-out
        hover:scale-105 hover:shadow-2xl md:block hidden
      `}
    >
      {/* Shimmer line */}
      <div
        className={`
          absolute inset-0 transition-transform duration-1000
          bg-gradient-to-r from-transparent via-white/15 to-transparent
          transform -skew-x-12 w-full
          ${hovered ? "translate-x-full" : "-translate-x-full"}
        `}
      />

      {/* Text Container */}
      <div className="flex items-center justify-center relative h-6 z-10">
        <div className="relative">
          {/* First Text */}
          <div
            className={`
              absolute inset-0 flex space-x-[2px] transition-all duration-500 ease-out
              ${hovered ? "opacity-0 -translate-y-3 blur-sm" : "opacity-100 translate-y-0 blur-0"}
            `}
          >
            {firstText.split("").map((char, i) => (
              <span
                key={`first-${i}`}
                className={`
                  inline-block transition-all duration-300 ease-out
                  ${hovered ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}
                `}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* Second Text + Icon */}
            <Link to={"/yields"}> 
            <div
            className={`
              flex items-center space-x-1 transition-all duration-500 ease-out
              ${hovered ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-3 blur-sm"}
            `}
          >
            {/* Animate text letters */}
            {secondText[0].split("").map((char, i) => (
              <span
                key={`second-${i}`}
                className={`
                  inline-block transition-all duration-400 ease-out
                  ${hovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-90"}
                `}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            {/* Icon comes after text */}
            <span
              className={`
                inline-block transition-all duration-400 ease-out
                ${hovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-90"}
              `}
              style={{ transitionDelay: `${secondText[0].length * 40}ms` }}
            >
              {secondText[1]}
            </span>
          </div>
            </Link>
          
        </div>
      </div>

      {/* Floating particles */}
      {hovered && (
        <>
          <div
            className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0ms", animationDuration: "2000ms" }}
          />
          <div
            className="absolute top-4 right-6 w-1 h-1 bg-purple-300/80 rounded-full animate-pulse"
            style={{ animationDelay: "500ms", animationDuration: "1500ms" }}
          />
          <div
            className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-pink-300/70 rounded-full animate-pulse"
            style={{ animationDelay: "1000ms", animationDuration: "1800ms" }}
          />
          <div
            className="absolute bottom-4 right-4 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse"
            style={{ animationDelay: "1200ms", animationDuration: "2200ms" }}
          />
        </>
      )}
    </button>
  );
}