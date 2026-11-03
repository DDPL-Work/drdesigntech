'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PageHero({
  eyebrow,
  title,
  hl,
  intro,
  crumb,
  icons = ['it', 'dt', 'geo', 'shield'],
  children
}) {
  return (
    <section className="ph-hero">
      <div className="wrap max-w-[1400px] mx-auto px-4">
        <div className="ph-hero__panel">
          <div className="ph-hero__mesh" aria-hidden="true" />
          <div className="ph-hero__grid" aria-hidden="true" />

          <div className="ph-hero__copy">
            <nav className="ph-crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{crumb}</span>
            </nav>

            <motion.span
              className="ph-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {title} {hl && <span className="ph-hl">{hl}</span>}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
            >
              {intro}
            </motion.p>

            {children && (
              <motion.div
                className="row flex flex-wrap items-center"
                style={{ gap: 12 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {children}
              </motion.div>
            )}
          </div>

          <div className="ph-hero__art" aria-hidden="true">
            <div className="ph-ring ph-ring--a" />
            <div className="ph-ring ph-ring--b" />
            <div className="ph-orbit">
              {icons.map((iconName, idx) => (
                <span
                  key={iconName}
                  className="ph-node"
                  style={{
                    transform: `rotate(${(360 / icons.length) * idx}deg) translateX(var(--r)) rotate(${-(360 / icons.length) * idx}deg)`
                  }}
                >
                  <span className="ph-node__in">
                    <img
                      src={`/assets/icons/${iconName}.svg`}
                      alt=""
                      aria-hidden="true"
                      width={26}
                      height={26}
                      className="sym"
                      draggable="false"
                    />
                  </span>
                </span>
              ))}
            </div>
            <div className="ph-core float">
              <img
                src="/assets/icons/globe.svg"
                alt=""
                aria-hidden="true"
                width={120}
                height={120}
                className="sym"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

