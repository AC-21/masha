import { useMemo, useRef } from "react";

type SwipeHandlers = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // px
};

export default function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 40,
}: SwipeHandlers) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  return useMemo(() => {
    return {
      onTouchStart: (e: React.TouchEvent) => {
        const t = e.touches[0];
        startX.current = t.clientX;
        startY.current = t.clientY;
      },
      onTouchEnd: (e: React.TouchEvent) => {
        if (startX.current == null || startY.current == null) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - startX.current;
        const dy = t.clientY - startY.current;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);
        startX.current = null;
        startY.current = null;
        if (absX < threshold && absY < threshold) return;
        if (absX > absY) {
          if (dx < 0) onSwipeLeft && onSwipeLeft();
          else onSwipeRight && onSwipeRight();
        } else {
          if (dy < 0) onSwipeUp && onSwipeUp();
          else onSwipeDown && onSwipeDown();
        }
      },
    } as const;
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold]);
}


