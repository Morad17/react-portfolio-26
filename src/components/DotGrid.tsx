import { useEffect, useRef } from 'react';

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  interactionRadius?: number;
}

interface Dot {
  x: number;
  y: number;
  baseAlpha: number;
  currentAlpha: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

const DotGrid = ({
  dotSize = 1.5,
  gap = 28,
  activeColor = '#ff7a00',
  interactionRadius = 110,
}: DotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  // Parse activeColor to rgb once
  const accentRgb = hexToRgb(activeColor);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Build the dot grid
    const buildGrid = () => {
      const dots: Dot[] = [];
      const cols = Math.ceil(canvas.width / gap) + 1;
      const rows = Math.ceil(canvas.height / gap) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * gap,
            y: r * gap,
            baseAlpha: 0.12,
            currentAlpha: 0.12,
          });
        }
      }
      dotsRef.current = dots;
    };

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildGrid();
    };

    resize();

    // Mouse move (throttled via requestAnimationFrame flag)
    let pending = false;
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!pending) {
        pending = true;
        requestAnimationFrame(() => {
          pending = false;
        });
      }
    };

    // Touch move
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) mouseRef.current = { x: t.clientX, y: t.clientY };
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.body);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Proximity: 0 at center, 1 at edge of radius
        const proximity = Math.max(0, 1 - dist / interactionRadius);

        // Target alpha based on proximity
        const targetAlpha = dot.baseAlpha + proximity * 0.88;
        dot.currentAlpha += (targetAlpha - dot.currentAlpha) * 0.12;

        if (proximity > 0) {
          // Interpolate between base white and accent orange
          const r = Math.round(255 * (1 - proximity) + accentRgb[0] * proximity);
          const g = Math.round(255 * (1 - proximity) + accentRgb[1] * proximity);
          const b = Math.round(255 * (1 - proximity) + accentRgb[2] * proximity);
          ctx.fillStyle = `rgba(${r},${g},${b},${dot.currentAlpha})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${dot.currentAlpha})`;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dotSize, gap, interactionRadius]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
};

export default DotGrid;
