"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function AnimatedNumber({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const target = typeof to === "number" ? to : parseFloat(to) || 0;
  const [value, setValue] = useState(0);
  const isCompletedRef = useRef(false);
  const currentValRef = useRef(0);

  useEffect(() => {
    if (!isInView || isCompletedRef.current) return;

    const dur = duration > 10 ? duration / 1000 : (duration || 1.6);
    const startVal = currentValRef.current;

    const controls = animate(startVal, target, {
      duration: dur,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        currentValRef.current = latest;
        setValue(latest);
      },
      onComplete: () => {
        currentValRef.current = target;
        setValue(target);
        isCompletedRef.current = true;
      },
    });

    return () => {
      controls.stop();
    };
  }, [isInView, target, duration]);

  // If completed, always render the exact target number
  const displayVal = isCompletedRef.current ? target : value;

  return (
    <span ref={ref} style={{ display: "inline-block" }}>
      {prefix}
      {displayVal.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
