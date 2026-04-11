import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  MotionValue,
  useMotionValueEvent,
  Variants,
} from "framer-motion";
import { projects } from "../data/portfolio";
import { PANEL_COUNT } from "../App";
import { useIsMobile } from "../hooks/useIsMobile";

import salesGif from "../assets/gif/horizon-sales.gif";
import appGif from "../assets/gif/horizon-app.gif";
import journalGif from "../assets/gif/morads-journal.gif";

const GIF_MAP: Record<string, string> = {
  "horizon-sales": salesGif,
  "horizon-app": appGif,
  "morads-journal": journalGif,
};

const PROJECT_HEADER_DESC: Record<string, string> = {
  "morads-journal":
    "A personal travel and blog companion built from the ground up — featuring an interactive 3D globe, masonry gallery, and a full admin panel for seamless content management.",
  "horizon-sales":
    "Latest projects include working with Horizon to develop their software needs — from building a website to an app and backend, incorporating their data collection, analysis and goal implementation needs.",
  "horizon-app":
    "The internal companion app to Horizon Sales, used by managers to track KPIs, set goals, and analyse performance — day, week, and month — with integrated AI for personal development.",
};

type Tab = "morads-journal" | "horizon-sales" | "horizon-app";

const LOCO_EASE = [0.25, 0.46, 0.45, 0.94] as const;

type TileCustom = { delay?: number; duration?: number; x?: number; y?: number };

// Variants for the whole bento grid cross-fade on tab switch
const bentoSwitchVariants: Variants = {
  enter:  { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0,  transition: { duration: 0.38, ease: LOCO_EASE } },
  exit:   { opacity: 0, y: -10, transition: { duration: 0.22, ease: LOCO_EASE } },
};

// Variants for the header title / desc cross-fade
const headerTextVariants: Variants = {
  enter:  { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0, transition: { duration: 0.32, ease: LOCO_EASE } },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.18, ease: LOCO_EASE } },
};

const tileVariants: Variants = {
  hidden: (c: TileCustom = {}) => ({
    opacity: 0,
    x: c.x ?? 0,
    y: c.y ?? 0,
  }),
  visible: (c: TileCustom = {}) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: c.duration ?? 0.75,
      delay: c.delay ?? 0,
      ease: LOCO_EASE,
    },
  }),
  instant: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0 },
  },
};

interface ProjectsSectionProps {
  index: number;
  globalProgress: MotionValue<number>;
  isActive: boolean;
}

const ProjectsSection = ({ index, globalProgress, isActive }: ProjectsSectionProps) => {
  const sectionCenter = index / (PANEL_COUNT - 1);
  const isMobile = useIsMobile();
  const isMobileRef = useRef(isMobile);
  useEffect(() => { isMobileRef.current = isMobile; }, [isMobile]);

  const [activeTab, setActiveTab] = useState<Tab>("morads-journal");
  const [tileAnimate, setTileAnimate] = useState<"hidden" | "visible" | "instant">("hidden");

  useMotionValueEvent(globalProgress, "change", (latest) => {
    if (isMobileRef.current) return;
    const nowHere = Math.abs(latest - sectionCenter) < 0.2;
    setTileAnimate((prev) => {
      if (!nowHere) return "hidden";
      if (prev === "hidden") return "visible";
      return prev;
    });
  });

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (!isMobile) setTileAnimate("instant");
  };

  // Always call — rules of hooks
  const headerY = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [50, 0, -30],
  );
  const contentY = useTransform(
    globalProgress,
    [sectionCenter - 0.3, sectionCenter, sectionCenter + 0.3],
    [70, 0, -20],
  );
  const opacity = useTransform(
    globalProgress,
    [sectionCenter - 0.25, sectionCenter, sectionCenter + 0.25],
    [0, 1, 0.6],
  );

  const active = projects.find((p) => p.id === activeTab) ?? projects[0];
  const bentoLayout = active.type.toLowerCase(); // "website" or "app" — drives CSS layout

  const tabs: { id: Tab; label: string }[] = [
    { id: "morads-journal", label: "Morads Journal" },
    { id: "horizon-sales",  label: "Horizon Sales" },
    { id: "horizon-app",    label: "Horizon App" },
  ];

  if (isMobile) {
    const vis = isActive ? "mob-visible" : "";
    return (
      <section className="panel projects-panel" aria-label="Projects">
        <div className="projects-inner">
          <div className={`projects-header mob-animate ${vis}`}>
            <p className="section-eyebrow">Previous Work</p>
            <AnimatePresence mode="wait">
              <motion.h2
                key={`mob-title-${activeTab}`}
                className="projects-company"
                variants={headerTextVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {active.title}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={`mob-desc-${activeTab}`}
                className="projects-desc"
                variants={headerTextVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {PROJECT_HEADER_DESC[activeTab]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className={`project-tabs mob-animate ${vis}`} style={{ transitionDelay: "0.1s" }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`tab-btn${activeTab === t.id ? " tab-btn--active" : ""}`}
                onClick={() => handleTabChange(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={`project-bento project-bento--${bentoLayout}`}
            variants={bentoSwitchVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className={`bt bt--gif mob-animate ${vis}`} style={{ transitionDelay: "0.15s" }}>
              <img src={GIF_MAP[active.id]} alt={`${active.title} preview`} />
            </div>

            <div className={`bt bt--feat mob-animate ${vis}`} style={{ transitionDelay: "0.2s" }}>
              <ul className="project-features">
                {active.features.map((f) => (
                  <li key={f.label}>{f.label}</li>
                ))}
              </ul>
            </div>

            <div className={`bt bt--desc mob-animate ${vis}`} style={{ transitionDelay: "0.25s" }}>
              <p>{active.description}</p>
            </div>

            <div className={`bt bt--skills mob-animate ${vis}`} style={{ transitionDelay: "0.3s" }}>
              {active.skills.map((s) => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>

            {activeTab !== "horizon-app" && (
              <div className={`bt bt--live mob-animate ${vis}`} style={{ transitionDelay: "0.35s" }}>
                <a href={active.url} target="_blank" rel="noopener noreferrer">
                  Live Page ↗
                </a>
              </div>
            )}

            <div className={`bt bt--code mob-animate ${vis}`} style={{ transitionDelay: "0.35s" }}>
              <a href={active.codeUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                Code ↗
              </a>
            </div>
          </motion.div>
          </AnimatePresence>
        </div>
      </section>
    );
  }

  return (
    <section className="panel projects-panel" aria-label="Projects">
      <motion.div className="projects-inner" style={{ opacity }}>
        {/* Header */}
        <motion.div className="projects-header" style={{ y: headerY }}>
          <p className="section-eyebrow">Previous Work</p>
          <AnimatePresence mode="wait">
            <motion.h2
              key={`title-${activeTab}`}
              className="projects-company"
              variants={headerTextVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {active.title}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeTab}`}
              className="projects-desc"
              variants={headerTextVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {PROJECT_HEADER_DESC[activeTab]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Tab toggles */}
        <motion.div className="project-tabs" style={{ y: contentY }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`tab-btn${activeTab === t.id ? " tab-btn--active" : ""}`}
              onClick={() => handleTabChange(t.id)}
            >
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Bento content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={`project-bento project-bento--${bentoLayout}`}
            variants={bentoSwitchVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.div
              className="bt bt--gif"
              variants={tileVariants}
              custom={{ x: -80, delay: 0, duration: 0.85 }}
              initial={tileAnimate === "instant" ? "instant" : "hidden"}
              animate={tileAnimate}
            >
              <img src={GIF_MAP[active.id]} alt={`${active.title} preview`} />
            </motion.div>

            <motion.div
              className="bt bt--feat"
              variants={tileVariants}
              custom={{ x: 80, delay: 0.55, duration: 0.35 }}
              initial={tileAnimate === "instant" ? "instant" : "hidden"}
              animate={tileAnimate}
            >
              <ul className="project-features">
                {active.features.map((f) => (
                  <li key={f.label}>{f.label}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="bt bt--desc"
              variants={tileVariants}
              custom={{ x: 80, delay: 0.35, duration: 0.5 }}
              initial={tileAnimate === "instant" ? "instant" : "hidden"}
              animate={tileAnimate}
            >
              <p>{active.description}</p>
            </motion.div>

            <motion.div
              className="bt bt--skills"
              variants={tileVariants}
              custom={{ y: 60, delay: 1.05, duration: 0.5 }}
              initial={tileAnimate === "instant" ? "instant" : "hidden"}
              animate={tileAnimate}
            >
              {active.skills.map((s) => (
                <span key={s} className="skill-tag">
                  {s}
                </span>
              ))}
            </motion.div>

            {activeTab !== "horizon-app" && (
              <motion.div
                className="bt bt--live"
                variants={tileVariants}
                custom={{ y: 60, delay: 1.25, duration: 0.6 }}
                initial={tileAnimate === "instant" ? "instant" : "hidden"}
                animate={tileAnimate}
              >
                <a href={active.url} target="_blank" rel="noopener noreferrer">
                  Live Page ↗
                </a>
              </motion.div>
            )}

            <motion.div
              className="bt bt--code"
              variants={tileVariants}
              custom={{ y: 60, delay: 1.3, duration: 0.6 }}
              initial={tileAnimate === "instant" ? "instant" : "hidden"}
              animate={tileAnimate}
            >
              <a
                href={active.codeUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Code ↗
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
