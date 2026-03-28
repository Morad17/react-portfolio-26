import { motion, useTransform, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { PANEL_COUNT } from "../App";
import meSmart from "../assets/images/me-smart.jpeg";
import meElephants from "../assets/images/me-elephants.jpeg";

interface HomeSectionProps {
  index: number;
  globalProgress: MotionValue<number>;
  isActive: boolean;
  onNavigate: (index: number) => void;
}

type TextPart = string | { text: string; highlight: boolean };

interface TextLine {
  id: string;
  parts: TextPart[];
  delay: number;
}

const HomeSection = ({
  index,
  globalProgress,
  onNavigate,
}: HomeSectionProps) => {
  const sectionCenter = index / (PANEL_COUNT - 1);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const revealSize = isHovered ? 260 : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const contentY = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [40, 0, -30],
  );
  const contentOpacity = useTransform(
    globalProgress,
    [sectionCenter - 0.25, sectionCenter, sectionCenter + 0.25],
    [0, 1, 0.6],
  );

  const textLines: TextLine[] = [
    {
      id: "line1",
      parts: [
        "Where ",
        { text: "creativity", highlight: true },
        " meets code.",
      ],
      delay: 0.4,
    },
    {
      id: "line2",
      parts: ["Crafting thoughtful digital solutions"],
      delay: 0.55,
    },
    {
      id: "line3",
      parts: [
        "Balancing ",
        { text: "aesthetics", highlight: true },
        " with ",
        { text: "function", highlight: true },
      ],
      delay: 0.7,
    },
    {
      id: "line4",
      parts: ["Thats it."],
      delay: 0.85,
    },
  ];

  return (
    <section className="panel home-panel" aria-label="Home">
      <motion.div
        className="home-inner"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="home-content">
        {/* Title */}
        <motion.div
          className="home-title-wrap"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <motion.span
            className="home-bar"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeInOut" }}
          />
          <h1 className="home-title">Morad Elb</h1>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          className="home-eyebrow-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        >
          <motion.span
            className="home-bar"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
          />
          <p className="home-eyebrow">Frontend Development</p>
        </motion.div>

        {/* Staggered text lines */}
        <div className="home-lines">
          {textLines.map((line) => (
            <motion.div
              key={line.id}
              className="home-line-wrap"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: line.delay, ease: "easeOut" }}
            >
              <motion.span
                className="home-bar"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{
                  duration: 0.7,
                  delay: line.delay + 0.05,
                  ease: "easeInOut",
                }}
              />
              <h3 className="home-line-text">
                {line.parts.map((part, i) =>
                  typeof part === "string" ? (
                    <span key={i}>{part}</span>
                  ) : (
                    <motion.span
                      key={i}
                      className="home-line-highlight"
                      whileHover={{
                        scale: 1.1,
                        color: "#a855f7",
                        textShadow: "0 0 15px rgba(168, 85, 247, 0.8)",
                      }}
                      style={{ display: "inline-block", cursor: "pointer" }}
                    >
                      {part.text}
                    </motion.span>
                  ),
                )}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          className="home-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease: "easeOut" }}
        >
          <button className="btn btn--primary" onClick={() => onNavigate(2)}>
            View Work →
          </button>
          <button className="btn btn--ghost" onClick={() => onNavigate(4)}>
            Start a Project →
          </button>
        </motion.div>
        </div>{/* end home-content */}

        {/* Portrait with mask reveal */}
        <motion.div
          className="home-portrait"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          <div
            className="home-portrait-circle"
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
              setIsHovered(true);
              document.body.classList.add("cursor--on-portrait");
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              document.body.classList.remove("cursor--on-portrait");
            }}
          >
            {/* Base image — always visible */}
            <img src={meSmart} alt="Morad Elb" className="home-portrait-img" />
            {/* Reveal overlay — me-elephants, masked to follow cursor */}
            <motion.div
              className="home-portrait-reveal"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              animate={{
                WebkitMaskPosition: `${mousePos.x - revealSize / 2}px ${mousePos.y - revealSize / 2}px`,
                maskPosition: `${mousePos.x - revealSize / 2}px ${mousePos.y - revealSize / 2}px`,
                WebkitMaskSize: `${revealSize}px`,
                maskSize: `${revealSize}px`,
              } as any}
              transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
            >
              <img src={meElephants} alt="" className="home-portrait-img" />
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default HomeSection;
