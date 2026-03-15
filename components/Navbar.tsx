"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="#" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white"
            >
              {label}
            </a>
          ))}
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            Say hello
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-zinc-200 p-2 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900 lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {isOpen ? (
        <div className="lg:hidden">
          <div className="mx-auto max-w-6xl space-y-1 rounded-b-2xl border-t border-zinc-200 bg-white/80 px-4 pb-4 pt-2 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                {label}
              </a>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="block rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Say hello
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
