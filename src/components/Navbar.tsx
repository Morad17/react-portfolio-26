import { motion } from 'framer-motion';
import { navItems } from '../data/portfolio';

interface NavbarProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

const Navbar = ({ activeIndex, onNavigate }: NavbarProps) => {
  const progressHeight = `${(activeIndex / (navItems.length - 1)) * 100}%`;

  return (
    <nav className="left-nav" aria-label="Main navigation">
      <span className="left-nav__logo" aria-label="Morad Inc.">
        M.
      </span>

      <ul className="left-nav__links">
        {navItems.map(({ label, index }) => (
          <li key={label}>
            <motion.button
              className={`left-nav__link${activeIndex === index ? ' left-nav__link--active' : ''}`}
              onClick={() => onNavigate(index)}
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

      <div className="left-nav__progress-track" aria-hidden="true">
        <motion.div
          className="left-nav__progress-fill"
          animate={{ height: progressHeight }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
