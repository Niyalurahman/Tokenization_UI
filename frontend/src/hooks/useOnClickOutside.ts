import { useEffect, type RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

// THIS IS THE CORRECTED, SIMPLIFIED SIGNATURE
// We removed the generic <T> and directly typed the 'ref' parameter.
// This correctly accepts any ref pointing to an HTMLElement (like HTMLDivElement),
// and understands that its .current property can be null.
export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      // The internal logic correctly handles the 'null' case,
      // which is why this signature is safe.
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};