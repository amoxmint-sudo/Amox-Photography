'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  RevealVariant,
  ViewportPosition,
  classifyViewportPosition,
  getVariantAnimationStates,
} from '@/lib/scroll-animation';

export type { RevealVariant };

interface EditorialRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'span';
  once?: boolean;
  parallaxOffset?: number;
}

export function EditorialReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration,
  className = '',
  as = 'div',
  once = false,
  parallaxOffset = 0,
}: EditorialRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [offscreenDir, setOffscreenDir] = useState<Exclude<ViewportPosition, 'visible'>>('below');
  const [parallaxY, setParallaxY] = useState(0);

  const isVisibleRef = useRef(false);
  const hasShownOnceRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      isVisibleRef.current = true;
      return;
    }

    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;

    const evaluatePosition = () => {
      rafId = null;
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;

      const pos = classifyViewportPosition(
        { top: rect.top, bottom: rect.bottom, height: rect.height },
        vh,
        isVisibleRef.current
      );

      if (pos === 'visible') {
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          hasShownOnceRef.current = true;
          setIsVisible(true);
        }
        if (parallaxOffset !== 0) {
          const centerOffset = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
          const clamped = Math.max(-1, Math.min(1, centerOffset));
          setParallaxY(Number((clamped * parallaxOffset).toFixed(2)));
        }
      } else {
        if (once && hasShownOnceRef.current) {
          return;
        }
        setOffscreenDir(pos);
        if (isVisibleRef.current) {
          isVisibleRef.current = false;
          setIsVisible(false);
        }
      }
    };

    const scheduleEvaluate = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(evaluatePosition);
      }
    };

    // Initial evaluation scheduled via rAF
    scheduleEvaluate();

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        () => {
          scheduleEvaluate();
        },
        {
          root: null,
          rootMargin: '8px 0px -4% 0px',
          threshold: [0, 0.05, 0.15, 0.5, 0.95],
        }
      );
      observer.observe(el);
    }

    window.addEventListener('scroll', scheduleEvaluate, { passive: true });
    window.addEventListener('resize', scheduleEvaluate, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      observer?.disconnect();
      window.removeEventListener('scroll', scheduleEvaluate);
      window.removeEventListener('resize', scheduleEvaluate);
    };
  }, [prefersReducedMotion, once, parallaxOffset]);

  if (prefersReducedMotion) {
    const Tag = as as any;
    return (
      <Tag
        data-reveal-state="visible"
        data-reveal-variant={variant}
        className={className}
      >
        {children}
      </Tag>
    );
  }

  const config = getVariantAnimationStates(variant, offscreenDir, isVisible);
  const resolvedDuration = duration ?? config.defaultDuration;

  const animateState =
    isVisible && parallaxOffset !== 0
      ? {
          ...config.animate,
          y: (config.animate.y ?? 0) + parallaxY,
        }
      : config.animate;

  const MotionComponent = (motion as any)[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      data-reveal-state={isVisible ? 'visible' : 'hidden'}
      data-reveal-direction={offscreenDir}
      data-reveal-variant={variant}
      initial={config.initial}
      animate={animateState}
      transition={
        isVisible
          ? {
              duration: resolvedDuration,
              delay,
              ease: config.ease,
            }
          : {
              // Fast, silent reset while off-screen so element is ready for next viewport entry
              duration: 0.18,
              delay: 0,
              ease: 'easeOut',
            }
      }
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
