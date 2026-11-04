'use client';

import { motion } from 'framer-motion';

export default function Reveal({
  as = 'div',
  delay = 0,
  className,
  style,
  children,
  ...props
}) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}

