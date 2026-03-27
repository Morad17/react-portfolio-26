import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../data/portfolio';

interface NavbarProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

const Navbar = ({ activeIndex, onNavigate }: NavbarProps) => {
  const progressHeight = `${(activeIndex / (navItems.length - 1)) * 100}%`;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (index: number) => {
    onNavigate(index);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="left-nav" aria-label="Main navigation">
        <span className="left-nav__logo" aria-label="Morad Inc.">
          M.
        </span>

        {/* Desktop: vertical links */}
        <ul className="left-nav__links">
          {navItems.map(({ label, index }) => (
            <li key={label}>
              <motion.button
                className={`left-nav__link${activeIndex === index ? ' left-nav__link--active' : ''}`}
                onClick={() => handleNavigate(index)}
                animate={{
                  letterSpacing: activeIndex === index ? '0.14em' : '0.08em',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {label}
              </motion.button>
            </li>
          ))}
        </ul>

        {/* Mobile/tablet: burger button */}
        <button
          className={`left-nav__burger${menuOpen ? ' left-nav__burger--open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="left-nav__progress-track" aria-hidden="true">
          <motion.div
            className="left-nav__progress-fill"
            animate={{ height: progressHeight }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ul className="nav-overlay__links">
              {navItems.map(({ label, index }) => (
                <li key={label}>
                  <button
                    className={`nav-overlay__link${activeIndex === index ? ' nav-overlay__link--active' : ''}`}
                    onClick={() => handleNavigate(index)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
