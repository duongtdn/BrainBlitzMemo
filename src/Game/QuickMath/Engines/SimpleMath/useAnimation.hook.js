"use strict"

import { useRef } from "react";

export default function useAnimation() {
  const animateRef = useRef();
  return {
    setAnimateFunction: (animateFunction) => animateRef.current = animateFunction,
    animate: () => animateRef.current()
  };
}
