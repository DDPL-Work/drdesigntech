"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({
  to,
  from = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
}) {
  const [count, setCount] = useState(from);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let animId;
    const durationMs = duration < 100 ? duration * 1000 : duration;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();
          const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / durationMs, 1);
            // Cubic bezier ease-out curve matching design
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(ease * (to - from) + from);

            if (progress < 1) {
              animId = requestAnimationFrame(step);
            } else {
              setCount(to);
            }
          };
          animId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [to, from, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

