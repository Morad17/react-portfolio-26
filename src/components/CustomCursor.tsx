import { useEffect, useRef } from "react";

const STIFFNESS = 0.7; // spring pull strength
const DAMPING = 0.1; // lower = more bounce

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });
  const vel = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const tick = () => {
      // Spring force toward mouse
      vel.current.x += (mouse.current.x - pos.current.x) * STIFFNESS;
      vel.current.y += (mouse.current.y - pos.current.y) * STIFFNESS;
      // Dampen velocity
      vel.current.x *= DAMPING;
      vel.current.y *= DAMPING;
      // Integrate
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;
