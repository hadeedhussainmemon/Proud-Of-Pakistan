"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export const useAnime = (config: any) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      const animation = animate(elementRef.current, config);

      return () => {
        animation.pause();
      };
    }
  }, [config]);

  return elementRef;
};
