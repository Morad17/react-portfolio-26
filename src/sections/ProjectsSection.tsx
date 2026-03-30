import { useState, useRef, useEffect } from "react";
import {
  motion,
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

const GIF_MAP: Record<string, string> = {
  "horizon-sales": salesGif,
  "horizon-app": appGif,
};

type Tab = "website" | "app";

const LOCO_EASE = [0.25, 0.46, 0.45, 0.94] as const;

type TileCustom = { delay?: number; duration?: number; x?: number; y?: number };

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

  const [activeTab, setActiveTab] = useState<Tab>("website");
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

  const [sales, app] = projects;
  const active = activeTab === "website" ? sales : app;

  if (isMobile) {
    const vis = isActive ? "mob-visible" : "";
    return (
      <section className="panel projects-panel" aria-label="Projects">
        <div className="projects-inner">
          <div className={`projects-header mob-animate ${vis}`}>
            <p className="section-eyebrow">Previous Work</p>
            <h2 className="projects-company">Horizon Sales</h2>
            <p className="projects-desc">
              Latest projects include working with Horizon to develop their
              software needs — from building a website to an app and backend,
              incorporating their data collection, analysis and goal
              implementation needs.
            </p>
          </div>

          <div className={`project-tabs mob-animate ${vis}`} style={{ transitionDelay: "0.1s" }}>
            <button
              className={`tab-btn${activeTab === "website" ? " tab-btn--active" : ""}`}
              onClick={() => handleTabChange("website")}
            >
              Website
            </button>
            <button
              className={`tab-btn${activeTab === "app" ? " tab-btn--active" : ""}`}
              onClick={() => handleTabChange("app")}
            >
              App
            </button>
          </div>

          <div key={activeTab} className={`project-bento project-bento--${activeTab}`}>
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

            {activeTab === "website" && (
              <div className={`bt bt--live mob-animate ${vis}`} style={{ transitionDelay: "0.35s" }}>
                <a href={sales.url} target="_blank" rel="noopener noreferrer">
                  Live Page ↗
                </a>
              </div>
            )}

            <div className={`bt bt--code mob-animate ${vis}`} style={{ transitionDelay: "0.35s" }}>
              <a href={active.codeUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                Code ↗
              </a>
            </div>
          </div>
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
          <h2 className="projects-company">Horizon Sales</h2>
          <p className="projects-desc">
            Latest projects include working with Horizon to develop their
            software needs — from building a website to an app and backend,
            incorporating their data collection, analysis and goal
            implementation needs.
          </p>
        </motion.div>

        {/* Tab toggles */}
        <motion.div className="project-tabs" style={{ y: contentY }}>
          <button
            className={`tab-btn${activeTab === "website" ? " tab-btn--active" : ""}`}
            onClick={() => handleTabChange("website")}
          >
            Website
          </button>
          <button
            className={`tab-btn${activeTab === "app" ? " tab-btn--active" : ""}`}
            onClick={() => handleTabChange("app")}
          >
            App
          </button>
        </motion.div>

        {/* Bento content */}
        <div
          key={activeTab}
          className={`project-bento project-bento--${activeTab}`}
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

          {activeTab === "website" && (
            <motion.div
              className="bt bt--live"
              variants={tileVariants}
              custom={{ y: 60, delay: 1.25, duration: 0.6 }}
              initial="hidden"
              animate={tileAnimate}
            >
              <a href={sales.url} target="_blank" rel="noopener noreferrer">
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
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
