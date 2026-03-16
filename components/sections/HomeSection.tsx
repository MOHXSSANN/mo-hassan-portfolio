"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
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
  "Always learning, always shipping ⚡",
  "Building things that actually work 🔧",
  "Turning coffee into scalable systems ☕",
  "Backend by day, AI tinkerer by night 🤖",
  "Shipping code, breaking prod, fixing prod 🚀",
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
          <strong key={i} style={{ color: "var(--vsc-cyan)", fontWeight: 600 }}>
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
      style={{
        display: "inline-block",
        color,
        whiteSpace: "pre",
      }}
    >
      {char}
    </motion.span>
  );
}

// ── Animated name line ───────────────────────────────────────────────
function AnimatedName({
  text, color, triggerBounce,
}: {
  text: string; color: string; triggerBounce: boolean;
}) {
  return (
    <>
      {text.split("").map((char, i) => (
        <BounceLetter
          key={i}
          char={char}
          color={color}
          delay={i * 0.04}
          shouldBounce={triggerBounce}
        />
      ))}
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
  const [bounce, setBounce] = useState(false);

  const { displayed: typedTagline, done: taglineDone } = useCyclingTypewriter(36, 20, 1800, 700);

  const handleNameClick = useCallback(() => {
    setBounce(false);
    // tiny delay so useEffect fires again even if bounce was already true
    requestAnimationFrame(() => setBounce(true));
  }, []);

  const activeSocials = SOCIAL_ITEMS.filter((s) => {
    const h = s.href();
    return h && !h.includes("[") && h.length > 8;
  });

  return (
    <div className="relative min-h-full pb-10 overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 10%, rgba(157,21,21,0.10) 0%, transparent 70%)," +
            "radial-gradient(ellipse 40% 60% at 10% 80%, rgba(86,156,214,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Line 1 — comment */}
      <div className="editor-line pt-6">
        <span className="line-number">1</span>
        <span className="token-comment">// hello world !! Welcome to my portfolio</span>
      </div>
      <div className="editor-line">
        <span className="line-number">2</span>
      </div>

      {/* Main content — two-column on lg+, stacked on mobile */}
      <div className="pl-14 pr-8 mt-3 flex flex-col lg:flex-row lg:items-start lg:gap-8">

        {/* ── Left column ─── */}
        <div className="flex-1 min-w-0">

        {/* ── Clickable animated name ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5, ease: "easeOut" }}
          className="mb-5 cursor-pointer select-none"
          onClick={handleNameClick}
          title="Click me!"
        >
          <h1
            className="font-black leading-[0.9] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 10vw, 8.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ display: "block" }}>
              <AnimatedName text={firstName} color="#ffffff" triggerBounce={bounce} />
            </span>
            <span style={{ display: "block" }}>
              <AnimatedName
                text={lastName}
                color="var(--vsc-red-light)"
                triggerBounce={bounce}
              />
            </span>
          </h1>
        </motion.div>

        {/* ── Role badges ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-2 mb-4"
        >
          {roles.map((role, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: `${role.color}14`,
                border: `1px solid ${role.color}50`,
                color: role.color,
                fontFamily: "var(--font-display)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: role.color }} />
              {role.label}
            </span>
          ))}
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
            {Object.entries(stats).map(([key, value], i, arr) => (
              <div
                key={key}
                className="flex flex-col items-center justify-center py-5 px-4"
                style={{
                  borderRight: i < arr.length - 1 ? "1px solid var(--vsc-border)" : "none",
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

        {/* ── Social pills ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          {activeSocials.map(({ key, label, icon: Icon, href }) => (
            <motion.a
              key={key}
              href={href()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium focus-visible:outline-none"
              style={{
                background: "var(--vsc-sidebar-bg)",
                border: "1px solid var(--vsc-border)",
                color: "var(--vsc-fg-muted)",
                fontFamily: "var(--font-display)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-fg-muted)";
                (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--vsc-border)";
                (e.currentTarget as HTMLElement).style.color = "var(--vsc-fg-muted)";
              }}
            >
              <Icon size={12} />
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
          className="shrink-0 flex justify-center lg:justify-start lg:pt-2"
        >
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: 280,
              height: 280,
              border: "2px solid rgba(157,21,21,0.6)",
              boxShadow: "0 0 0 4px rgba(157,21,21,0.12), 0 0 40px rgba(157,21,21,0.25)",
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
