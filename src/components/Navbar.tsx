"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Menu, X } from "lucide-react";

// Componente para el logo de Instagram
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Kahlu
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm tracking-widest uppercase hover:text-primary transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/catalog"
            className="text-sm tracking-widest uppercase hover:text-primary transition-colors"
          >
            Catálogo
          </Link>
          <a
            href="mailto:kahluceramica@gmail.com"
            className="hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com/kahluceramica"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu (Gaveta corregida) */}
      {open && (
        <div className="md:hidden px-6 pt-12 pb-12 space-y-8 bg-background/95 backdrop-blur-md border-b border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
          <Link
            href="/"
            className="block text-sm tracking-[0.3em] uppercase text-carbon hover:opacity-50 transition-all"
            onClick={() => setOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/catalog"
            className="block text-sm tracking-[0.3em] uppercase text-carbon hover:opacity-50 transition-all"
            onClick={() => setOpen(false)}
          >
            Catálogo
          </Link>

          <div className="flex gap-8 pt-4 border-t border-carbon/5">
            <a
              href="mailto:kahluceramica@gmail.com"
              className="text-carbon/60 hover:text-carbon transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/kahluceramica"
              target="_blank"
              rel="noopener noreferrer"
              className="text-carbon/60 hover:text-carbon transition-colors"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
