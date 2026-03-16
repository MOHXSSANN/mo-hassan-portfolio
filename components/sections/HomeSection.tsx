"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Github, Linkedin, Twitter, Mail,
  Youtube, Instagram, BookOpen, User, MessageSquare, Layers,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { FileId } from "@/hooks/useIDEState";
import profileImg from "@/components/ui/image.png";

interface HomeSectionProps {
  onNavigate: (id: FileId) => void;
}

// ── Cycling typewriter hook ───────────────────────────────────────────
const TAGLINES = [
  "Backend by day, AI tinkerer by night 🤖",
  "Junior Dev @ CBSA — building real gov systems ⚙️",
  "Turning caffeine into secure, scalable code ☕",
  "CS student who actually builds things 🚀",
  "Always learning, always growing ⚡",
];

function useCyclingTypewriter(speed = 38, deleteSpeed = 22, pauseMs = 1800, startDelay = 800) {
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const init = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(init);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    const current = TAGLINES[index];

    if (!isDeleting && displayed === current) {
      // Finished typing — pause then start deleting
      const pause = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayed === "") {
      // Finished deleting — move to next
      setIsDeleting(false);
      setIndex((i) => (i + 1) % TAGLINES.length);
      return;
    }

    const tick = setTimeout(() => {
      setDisplayed(isDeleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1)
      );
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(tick);
  }, [displayed, isDeleting, index, speed, deleteSpeed, pauseMs, started]);

  const done = displayed === TAGLINES[index] && !isDeleting;
  return { displayed, done };
}

// ── Parse **bold** highlights ────────────────────────────────────────
function BioText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} style={{ color: "var(--vsc-red-light)", fontWeight: 600 }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ── Bouncing letter component ────────────────────────────────────────
function BounceLetter({
  char, color, delay, shouldBounce,
}: {
  char: string; color: string; delay: number; shouldBounce: boolean;
}) {
  const controls = useAnimation();

  useEffect(() => {
    if (!shouldBounce) return;
    controls.start({
      y: [0, -18, 4, -8, 2, 0],
      transition: { delay, duration: 0.55, ease: "easeOut" },
    });
  }, [shouldBounce, delay, controls]);

  return (
    <motion.span
      animate={controls}
      style={{ display: "inline-block", color, whiteSpace: "pre" }}
    >
      {char}
    </motion.span>
  );
}

// ── Breaking Bad element box ─────────────────────────────────────────
// "Mo" = Molybdenum (42), "As" inside "Hassan" = Arsenic (33)
type Seg =
  | { type: "element"; chars: string; number: number; fillColor: string }
  | { type: "plain"; chars: string };

const NAME_SEGS: Record<string, Seg[]> = {
  Mo:     [{ type: "element", chars: "Mo", number: 42, fillColor: "var(--vsc-red-light)" }],
  Hassan: [
    { type: "plain",   chars: "H" },
    { type: "element", chars: "as", number: 33, fillColor: "#ffffff" },
    { type: "plain",   chars: "san" },
  ],
};

const SPLASH_DROPS = [
  { side: "left",  x: -14, y: -22, size: 3, delay: 0.55 },
  { side: "left",  x: -8,  y: -30, size: 4, delay: 0.60 },
  { side: "right", x:  14, y: -22, size: 3, delay: 0.58 },
  { side: "right", x:  8,  y: -28, size: 4, delay: 0.63 },
  { side: "left",  x: -18, y: -16, size: 2, delay: 0.65 },
  { side: "right", x:  18, y: -16, size: 2, delay: 0.67 },
];

function ElementBox({ chars, number, color, fillColor, shouldFill, delay }: {
  chars: string; number: number; color: string; fillColor: string; shouldFill: boolean; delay: number;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        color,
        border: `0.035em solid ${color}`,
        padding: "0 12px 0 0.01em",
        lineHeight: "inherit",
        verticalAlign: "baseline",
      }}
    >
      {/* Clip wrapper — isolated from text so baseline stays correct */}
      <span style={{ position: "absolute", inset: 0, overflow: "hidden", display: "block", zIndex: 0 }}>
        {/* Water fill — rises from bottom like a glass */}
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            left: 0, right: 0, bottom: 0,
            display: "block",
            background: fillColor,
          }}
          animate={{ height: shouldFill ? "100%" : "0%" }}
          transition={{ delay, duration: 0.65, ease: [0.25, 0.8, 0.35, 1] }}
        />
      </span>

      {/* Splash droplets — outside clip wrapper so they escape the box */}
      {SPLASH_DROPS.map((drop, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            bottom: "95%",
            left: drop.side === "left" ? "20%" : "80%",
            width: drop.size,
            height: drop.size,
            borderRadius: "50%",
            background: fillColor,
            display: "block",
            zIndex: 2,
          }}
          animate={shouldFill ? {
            x: [0, drop.x],
            y: [0, drop.y, 4],
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
          } : { opacity: 0, x: 0, y: 0 }}
          transition={{
            delay: delay + drop.delay,
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Text — above fill, baseline-correct */}
      <span style={{ position: "relative", zIndex: 1 }}>{chars}</span>

      {/* Atomic number */}
      <span style={{
        position: "absolute",
        top: "8px",
        right: "4px",
        fontSize: "11px",
        fontWeight: 700,
        color,
        fontFamily: "monospace",
        lineHeight: 1,
        whiteSpace: "nowrap",
        letterSpacing: "1px",
        zIndex: 1,
      }}>
        {number}
      </span>
    </span>
  );
}

function BreakingBadName({ name, color, shouldFill }: {
  name: string; color: string; shouldFill: boolean;
}) {
  const segs = NAME_SEGS[name];
  if (!segs) {
    return <span style={{ color }}>{name}</span>;
  }
  let charIdx = 0;
  return (
    <>
      {segs.map((seg, si) => {
        const startIdx = charIdx;
        charIdx += seg.chars.length;
        if (seg.type === "element") {
          return (
            <ElementBox
              key={si}
              chars={seg.chars}
              number={seg.number}
              color={color}
              fillColor={seg.fillColor}
              shouldFill={shouldFill}
              delay={startIdx * 0.02}
            />
          );
        }
        return (
          <span key={si} style={{ color }}>{seg.chars}</span>
        );
      })}
    </>
  );
}

const STAT_LABELS: Record<string, string> = {
  yearsExperience:      "YEARS",
  projectsShipped:      "PROJECTS",
  technologiesMastered: "CURIOSITY",
  alwaysLearning:       "ALWAYS LEARNING",
};

const SOCIAL_ITEMS = [
  { key: "github",    label: "GitHub",    icon: Github,    href: () => siteConfig.socials.github    },
  { key: "linkedin",  label: "LinkedIn",  icon: Linkedin,  href: () => siteConfig.socials.linkedin  },
  { key: "twitter",   label: "Twitter",   icon: Twitter,   href: () => siteConfig.socials.twitter   },
  { key: "medium",    label: "Medium",    icon: BookOpen,  href: () => siteConfig.socials.medium    },
  { key: "youtube",   label: "YouTube",   icon: Youtube,   href: () => siteConfig.socials.youtube   },
  { key: "instagram", label: "Instagram", icon: Instagram, href: () => siteConfig.socials.instagram },
  { key: "email",     label: "Email",     icon: Mail,      href: () => siteConfig.socials.email     },
];

export function HomeSection({ onNavigate }: HomeSectionProps) {
  const { firstName, lastName, roles, bio, stats, socials } = siteConfig;
  const [active, setActive] = useState(false);

  const { displayed: typedTagline, done: taglineDone } = useCyclingTypewriter(36, 20, 1800, 700);

  const activeSocials = SOCIAL_ITEMS.filter((s) => {
    const h = s.href();
    return h && !h.includes("[") && h.length > 8;
  });

  return (
    <div className="relative min-h-full pb-10 overflow-hidden">

      {/* Line 1 — comment */}
      <div className="editor-line pt-6">
        <span className="line-number">1</span>
        <span className="token-comment">// hello world !! Welcome to my portfolio</span>
      </div>
      <div className="editor-line">
        <span className="line-number">2</span>
      </div>

      {/* Main content — two-column on lg+, stacked on mobile */}
      <div className="pl-4 pr-4 sm:pl-14 sm:pr-8 mt-3 flex flex-col lg:flex-row lg:items-start lg:gap-8">

        {/* ── Left column ─── */}
        <div className="flex-1 min-w-0">

        {/* ── Clickable animated name ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5, ease: "easeOut" }}
          className="mb-5 cursor-pointer select-none"
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <h1
            className="font-black leading-[0.88] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.2rem, 13vw, 11rem)",
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ display: "block" }}>
              <BreakingBadName name={firstName} color="#ffffff" shouldFill={active} />
            </span>
            <span style={{ display: "block" }}>
              <BreakingBadName name={lastName} color="var(--vsc-red-light)" shouldFill={active} />
            </span>
          </h1>
        </motion.div>

        {/* ── Divider line ─── */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="mb-4 h-px"
          style={{ background: "linear-gradient(90deg, var(--vsc-red-light), transparent)" }}
        />

        {/* ── Role badges ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-2 mb-4"
        >
          {roles.map((role, i) => {
            const isJob = role.label.startsWith("@");
            return (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold"
                style={{
                  background: isJob ? "var(--vsc-red-glow)" : "transparent",
                  border: isJob ? "1px solid var(--vsc-red)" : "1px solid var(--vsc-border)",
                  color: isJob ? "var(--vsc-red-light)" : "var(--vsc-fg-muted)",
                  fontFamily: "var(--font-display)",
                  borderRadius: 0,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: isJob ? "var(--vsc-red-light)" : role.color }} />
                {role.label}
              </span>
            );
          })}
        </motion.div>

        {/* ── Typewriter tagline ─── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.3 }}
          className="text-sm mb-4 h-5"
          style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)", minHeight: "1.25rem" }}
        >
          {typedTagline}
          {!taglineDone && <span className="cursor-blink" />}
        </motion.p>

        {/* ── Bio paragraph ─── */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45, ease: "easeOut" }}
          className="text-sm leading-relaxed mb-7 max-w-[55ch]"
          style={{ color: "var(--vsc-fg)", fontFamily: "var(--font-display)", lineHeight: 1.75 }}
        >
          <BioText text={bio} />
        </motion.p>

        {/* ── CTA buttons ─── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {[
            { label: "Projects",  icon: Layers,         id: "projects" as FileId, primary: true  },
            { label: "About Me",  icon: User,           id: "about"    as FileId, primary: false },
            { label: "Contact",   icon: MessageSquare,  id: "contact"  as FileId, primary: false },
          ].map(({ label, icon: Icon, id, primary }) => (
            <motion.button
              key={id}
              onClick={() => onNavigate(id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold focus-visible:outline-none"
              style={{
                background: primary ? "#1e6bbf" : "transparent",
                border: primary ? "none" : "1px solid var(--vsc-border)",
                color: primary ? "#ffffff" : "var(--vsc-fg)",
                fontFamily: "var(--font-display)",
                boxShadow: primary ? "0 2px 12px rgba(30,107,191,0.35)" : "none",
              }}
            >
              <Icon size={13} />
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Stats card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45, ease: "easeOut" }}
          className="mb-7 rounded-lg overflow-hidden"
          style={{
            background: "var(--vsc-sidebar-bg)",
            border: "1px solid var(--vsc-border)",
            boxShadow: "var(--shadow-md)",
            maxWidth: "640px",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {Object.entries(stats).map(([key, value], i) => (
              <div
                key={key}
                className="flex flex-col items-center justify-center py-5 px-4"
                style={{
                  borderRight: i % 2 !== 1 ? "1px solid var(--vsc-border)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--vsc-border)" : "none",
                }}
              >
                <span
                  className="font-black leading-none mb-1.5"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    color: "#ffffff",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {value}
                </span>
                <span
                  className="text-[9px] tracking-widest uppercase"
                  style={{ color: "var(--vsc-fg-muted)", fontFamily: "var(--font-display)" }}
                >
                  {STAT_LABELS[key] ?? key}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Social links with brand logos ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          {[
            {
              key: "github",
              label: "GitHub",
              href: socials.github,
              bg: "#ffffff",
              logo: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              ),
            },
            {
              key: "linkedin",
              label: "LinkedIn",
              href: socials.linkedin,
              bg: "#0077b5",
              logo: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              ),
            },
            {
              key: "email",
              label: "Email",
              href: socials.email,
              bg: "#ea4335",
              logo: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-.454.183-.891.513-1.21L12 13.09 23.487 4.247c.33.319.513.756.513 1.21z" />
                </svg>
              ),
            },
          ].filter(s => s.href && s.href.length > 4).map(({ key, label, href, bg, logo }) => (
            <motion.a
              key={key}
              href={href}
              target={key !== "email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium focus-visible:outline-none"
              style={{
                background: "var(--vsc-sidebar-bg)",
                color: "var(--vsc-fg-muted)",
                fontFamily: "var(--font-display)",
                borderRadius: 0,
                border: "1px solid var(--vsc-border)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-fg-muted)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-border)";
              }}
            >
              {/* Brand-coloured icon */}
              <span style={{ color: bg, display: "flex" }}>{logo}</span>
              {label}
            </motion.a>
          ))}
        </motion.div>

        </div>{/* end left column */}

        {/* ── Right column — profile photo ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: "easeOut" }}
          className="shrink-0 flex justify-center lg:justify-start lg:pt-2 hidden sm:flex"
        >
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: "clamp(160px, 30vw, 280px)",
              height: "clamp(160px, 30vw, 280px)",
              flexShrink: 0,
            }}
          >
            <Image
              src={profileImg}
              alt="Mo Hassan"
              fill
              className="object-cover"
              style={{
                objectPosition: "50% 25%",
                transform: "scale(1.0)",
                transformOrigin: "center center",
              }}
              priority
            />
          </div>
        </motion.div>

      </div>
      <div className="h-16" />
    </div>
  );
}
