import { motion, useTransform, MotionValue, useAnimate } from "framer-motion";
import { useRef } from "react";
import { PANEL_COUNT } from "../App";
import smartPhoto from "../assets/images/smartPhoto.jpeg";
import holidayPhotos from "../assets/images/holidayPhoto.jpeg";
import cvFile from "../assets/cv/CV 2026.pdf";

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
  const [revealScope, animateReveal] = useAnimate();
  const isHoveredRef = useRef(false);
  const SIZE = 260;

  const handleMouseEnter = async (e: React.MouseEvent<HTMLDivElement>) => {
    isHoveredRef.current = true;
    document.body.classList.add("cursor--on-portrait");
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Instantly place at entry point so it never slides from a previous exit position
    await animateReveal(
      revealScope.current,
      {
        WebkitMaskPosition: `${x - SIZE / 2}px ${y - SIZE / 2}px`,
        maskPosition: `${x - SIZE / 2}px ${y - SIZE / 2}px`,
      },
      { duration: 0 },
    );
    // Then expand from that spot
    animateReveal(
      revealScope.current,
      {
        WebkitMaskSize: `${SIZE}px`,
        maskSize: `${SIZE}px`,
      },
      { type: "tween", ease: "backOut", duration: 0.4 },
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHoveredRef.current) return;
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    animateReveal(
      revealScope.current,
      {
        WebkitMaskPosition: `${x - SIZE / 2}px ${y - SIZE / 2}px`,
        maskPosition: `${x - SIZE / 2}px ${y - SIZE / 2}px`,
      },
      { type: "tween", ease: "backOut", duration: 0.15 },
    );
  };

  const handleMouseLeave = async (e: React.MouseEvent<HTMLDivElement>) => {
    isHoveredRef.current = false;
    document.body.classList.remove("cursor--on-portrait");
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find which edge was crossed
    const dLeft = x;
    const dRight = rect.width - x;
    const dTop = y;
    const dBottom = rect.height - y;
    const min = Math.min(dLeft, dRight, dTop, dBottom);

    let exitX = x - SIZE / 2;
    let exitY = y - SIZE / 2;
    if (min === dLeft) exitX = -SIZE;
    else if (min === dRight) exitX = rect.width;
    else if (min === dTop) exitY = -SIZE;
    else exitY = rect.height;

    // Slide to edge, then collapse
    await animateReveal(
      revealScope.current,
      {
        WebkitMaskPosition: `${exitX}px ${exitY}px`,
        maskPosition: `${exitX}px ${exitY}px`,
      },
      { duration: 0.18, ease: "easeIn" },
    );

    if (!isHoveredRef.current) {
      animateReveal(
        revealScope.current,
        {
          WebkitMaskSize: "0px",
          maskSize: "0px",
        },
        { duration: 0.15, ease: "easeOut" },
      );
    }
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
        "From ",
        { text: "concept", highlight: true },
        " to ",
        { text: "project", highlight: true },
        ".",
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
            <p className="home-eyebrow">
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ scaleX: -1 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
              >
                Frontend
              </motion.span>{" "}
              Developer
            </p>
          </motion.div>

          {/* Staggered text lines */}
          <div className="home-lines">
            {textLines.map((line) => (
              <motion.div
                key={line.id}
                className="home-line-wrap"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: line.delay,
                  ease: "easeOut",
                }}
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
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.9,
                          delay: line.delay + 0.5,
                          ease: "easeOut",
                        }}
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
            <a
              className="btn btn--ghost"
              href="https://github.com/Morad17"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "5px" }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              className="btn btn--ghost"
              href={cvFile}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "5px 10px" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              CV
            </a>
            <button className="btn btn--primary" onClick={() => onNavigate(2)}>
              View Work →
            </button>
            <button className="btn btn--ghost" onClick={() => onNavigate(4)}>
              Start a Project →
            </button>
          </motion.div>
        </div>
        {/* end home-content */}

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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Base image — always visible */}
            <img
              src={smartPhoto}
              alt="Morad Elb"
              className="home-portrait-img"
            />
            {/* Reveal overlay — Holiday Photo, masked to follow cursor */}
            <motion.div
              ref={revealScope}
              className="home-portrait-reveal"
              style={{
                WebkitMaskPosition: "0px 0px",
                maskPosition: "0px 0px",
                WebkitMaskSize: "0px",
                maskSize: "0px",
              }}
            >
              <img src={holidayPhotos} alt="" className="home-portrait-img" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeSection;
