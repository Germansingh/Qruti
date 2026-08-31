'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface JargonTooltipProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom';
}

export const JargonTooltip: React.FC<JargonTooltipProps> = ({
  term,
  definition,
  children,
  className = '',
  position = 'top',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Term with soft glow and subtle underline */}
      <span
        className={cn(
          'cursor-help underline decoration-blue-500/60 decoration-dashed underline-offset-4 transition-all duration-300 hover:text-blue-400 hover:decoration-blue-400 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] font-medium text-slate-200',
          className
        )}
      >
        {children || term}
      </span>

      {/* Floating Tooltip Panel */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: position === 'top' ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === 'top' ? 6 : -6, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'absolute z-50 w-64 p-3 rounded-xl backdrop-blur-xl bg-slate-950/90 border border-slate-800 text-slate-200 text-xs shadow-2xl pointer-events-none text-left block font-normal leading-normal',
              position === 'top'
                ? 'bottom-full mb-2 left-1/2 -translate-x-1/2'
                : 'top-full mt-2 left-1/2 -translate-x-1/2'
            )}
          >
            <span className="flex items-center gap-1.5 font-semibold text-blue-400 mb-1">
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{term}</span>
            </span>
            <span className="block text-slate-300 leading-relaxed font-normal">
              {definition}
            </span>

            {/* Tooltip Arrow */}
            <span
              className={cn(
                'absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-slate-950 border-slate-800 block',
                position === 'top'
                  ? 'bottom-[-5px] border-r border-b'
                  : 'top-[-5px] border-l border-t'
              )}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default JargonTooltip;
