'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CartDrawer } from '@/components/store/CartDrawer';

const HIDE_DELAY_MS = 400;
const MOBILE_REVEAL_DURATION_MS = 1800;
const SCROLL_THRESHOLD = 50;
const MOBILE_BREAKPOINT = 768;

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [isHoveringTopZone, setIsHoveringTopZone] = useState(false);
  const [isTapRevealed, setIsTapRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tapRevealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuNudgePlayedRef = useRef(false);
  const [playMenuNudge, setPlayMenuNudge] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Scroll: when scrolled down, always show nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    setIsScrolled(typeof window !== 'undefined' ? window.scrollY > SCROLL_THRESHOLD : false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop: show on hover (top zone or nav), hide with delay when leaving both
  const scheduleHide = useCallback(() => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setIsHoveringNav(false);
      setIsHoveringTopZone(false);
      hideTimeoutRef.current = null;
    }, HIDE_DELAY_MS);
  }, []);

  const cancelHide = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const handleTopZoneEnter = useCallback(() => {
    cancelHide();
    setIsHoveringTopZone(true);
  }, [cancelHide]);

  const handleTopZoneLeave = useCallback(() => {
    setIsHoveringTopZone(false);
    if (!isHoveringNav) scheduleHide();
  }, [isHoveringNav, scheduleHide]);

  const handleNavEnter = useCallback(() => {
    cancelHide();
    setIsHoveringNav(true);
  }, [cancelHide]);

  const handleNavLeave = useCallback(() => {
    setIsHoveringNav(false);
    if (!isHoveringTopZone) scheduleHide();
  }, [isHoveringTopZone, scheduleHide]);

  // Mobile: tap anywhere to reveal for 1.5–2s
  useEffect(() => {
    if (!isMobile) return;

    const handleTap = () => {
      if (tapRevealTimeoutRef.current) clearTimeout(tapRevealTimeoutRef.current);
      setIsTapRevealed(true);
      tapRevealTimeoutRef.current = setTimeout(() => {
        setIsTapRevealed(false);
        tapRevealTimeoutRef.current = null;
      }, MOBILE_REVEAL_DURATION_MS);
    };

    document.addEventListener('touchstart', handleTap, { passive: true });
    document.addEventListener('click', handleTap);
    return () => {
      document.removeEventListener('touchstart', handleTap);
      document.removeEventListener('click', handleTap);
      if (tapRevealTimeoutRef.current) clearTimeout(tapRevealTimeoutRef.current);
    };
  }, [isMobile]);

  // Mobile: one-time subtle bounce on menu when header first locks in after scroll (draws the eye)
  useEffect(() => {
    if (!isMobile || !isScrolled || menuNudgePlayedRef.current) return;
    menuNudgePlayedRef.current = true;
    setPlayMenuNudge(true);
    const id = window.setTimeout(() => setPlayMenuNudge(false), 800);
    return () => clearTimeout(id);
  }, [isMobile, isScrolled]);

  // Visibility: show when scrolled, or menu open, or (desktop) hovering, or (mobile) tap-revealed
  const isVisible =
    isScrolled ||
    isOpen ||
    (isMobile ? isTapRevealed : isHoveringNav || isHoveringTopZone);

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Nosotros' },
    { href: '/store', label: 'Tienda' },
    { href: '/learn', label: 'Aprende' },
    { href: '/classes', label: 'Clases' },
  ];

  return (
    <>
      {/* Desktop: invisible top hover zone - only when at top and desktop */}
      {!isMobile && !isScrolled && (
        <div
          className="fixed top-0 left-0 right-0 h-20 z-40"
          onMouseEnter={handleTopZoneEnter}
          onMouseLeave={handleTopZoneLeave}
          aria-hidden
        />
      )}

      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 glass-dark',
          'shadow-premium transition-all duration-300 ease-out',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
        onMouseEnter={handleNavEnter}
        onMouseLeave={handleNavLeave}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-2xl font-bold text-white tracking-[0.2em] transition-all duration-300 hover:text-accent"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ICHIBAN
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-all duration-200',
                    pathname === item.href
                      ? 'text-white border-b-2 border-accent'
                      : 'text-gray-300 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <CartDrawer />
              <Link
                href="/login"
                className="rounded-premium bg-accent px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                Iniciar Sesión
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={cn(
                'md:hidden p-2 rounded-md text-white',
                'hover:bg-white/10 active:bg-white/20',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal',
                playMenuNudge && 'animate-menu-nudge'
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 shrink-0" aria-hidden />
              ) : (
                <Menu className="h-6 w-6 shrink-0" aria-hidden />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block px-3 py-2 rounded-premium text-base font-medium transition-colors duration-200',
                    pathname === item.href
                      ? 'bg-accent/20 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between px-3 py-2">
                <CartDrawer />
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
