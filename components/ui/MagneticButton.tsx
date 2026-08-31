'use client';

import React, { useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, HTMLMotionProps } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children?: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children = 'Analyze Document',
  className = '',
  strength = 0.35,
  onClick,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring configuration for magnetic pull & snap-back
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-sm sm:text-base text-white transition-all duration-300 cursor-pointer overflow-hidden',
        'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] border border-blue-400/30',
        className
      )}
      {...props}
    >
      {/* Animated Glowing Background Effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform duration-300" />
        {children}
        <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform duration-300" />
      </span>
    </motion.button>
  );
};

export default MagneticButton;
