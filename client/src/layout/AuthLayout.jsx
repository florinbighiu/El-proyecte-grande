/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Logo from "../assets/carton.png";

/* Friendly on-brand illustration: a smiling shopping bag + a lock badge
   (secure sign-in), in the warm cream / clay palette. */
const AuthArt = () => (
  <svg
    viewBox="0 0 420 420"
    className="w-full max-w-[21rem]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="A friendly shopping bag with a padlock"
  >
    <circle cx="210" cy="212" r="160" fill="#efe1d6" />
    <ellipse cx="304" cy="118" rx="72" ry="60" fill="#c0603a" opacity="0.16" />
    <ellipse cx="108" cy="302" rx="64" ry="54" fill="#a44f2d" opacity="0.12" />

    {/* price tag */}
    <g transform="rotate(-18 322 282)">
      <rect x="296" y="262" width="54" height="34" rx="8" fill="#26221c" />
      <circle cx="307" cy="272" r="5" fill="#f9f6f0" />
      <path d="M318 279 h22 M318 287 h14" stroke="#f9f6f0" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* bag handle */}
    <path d="M170 168 v-18 a40 40 0 0 1 80 0 v18" stroke="#26221c" strokeWidth="10" strokeLinecap="round" />
    {/* bag body */}
    <rect x="132" y="166" width="156" height="172" rx="22" fill="#c0603a" />
    <path d="M132 188 a22 22 0 0 1 22 -22 h112 a22 22 0 0 1 22 22 z" fill="#a44f2d" />

    {/* face */}
    <circle cx="210" cy="262" r="42" fill="#f9f6f0" />
    <circle cx="196" cy="255" r="4.5" fill="#26221c" />
    <circle cx="224" cy="255" r="4.5" fill="#26221c" />
    <path d="M194 266 q16 16 32 0" stroke="#26221c" strokeWidth="5" strokeLinecap="round" />
    <circle cx="185" cy="267" r="5" fill="#c0603a" opacity="0.5" />
    <circle cx="235" cy="267" r="5" fill="#c0603a" opacity="0.5" />

    {/* lock badge */}
    <circle cx="116" cy="140" r="36" fill="#f9f6f0" />
    <circle cx="116" cy="140" r="36" stroke="#c0603a" strokeOpacity="0.25" strokeWidth="2" />
    <path d="M106 137 v-7 a10 10 0 0 1 20 0 v7" stroke="#a44f2d" strokeWidth="4" strokeLinecap="round" />
    <rect x="102" y="137" width="28" height="20" rx="4" fill="#a44f2d" />
    <circle cx="116" cy="145" r="2.5" fill="#f9f6f0" />
    <rect x="114.8" y="146" width="2.4" height="5" rx="1" fill="#f9f6f0" />

    {/* sparkles */}
    <path d="M332 198 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" fill="#c0603a" />
    <path d="M94 224 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" fill="#26221c" opacity="0.55" />
    <circle cx="276" cy="92" r="4" fill="#c0603a" opacity="0.6" />
  </svg>
);

const AuthLayout = ({ subtitle, children, altText, altLinkText, altLinkTo }) => (
  <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-8 sm:py-10 bg-cream">
    {/* outer rounded frame */}
    <div className="w-full max-w-5xl rounded-[2rem] bg-clay/20 p-2.5 sm:p-3">
      <div className="grid lg:grid-cols-2 rounded-[1.5rem] overflow-hidden bg-white shadow-xl shadow-clay/10">
        {/* illustration panel */}
        <div className="relative hidden lg:flex items-center justify-center bg-cream-deep p-10 overflow-hidden">
          <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-ink">
            <img src={Logo} alt="" className="w-7 h-7" />
            <span className="font-extrabold tracking-tight">
              Ecom<span className="text-clay">X</span>
            </span>
          </Link>
          <AuthArt />
        </div>

        {/* form panel */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="lg:hidden flex justify-center mb-6">
            <img src={Logo} alt="EcomX" className="w-12 h-12" />
          </div>

          <p className="text-ink-soft text-sm font-medium">Welcome to</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-clay mb-1.5">EcomX</h1>
          <p className="text-ink-soft text-sm mb-7">{subtitle}</p>

          {children}

          <p className="text-center text-sm text-ink-soft mt-7">
            {altText}{" "}
            <Link to={altLinkTo} className="text-clay-dark hover:text-clay font-semibold">
              {altLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AuthLayout;
