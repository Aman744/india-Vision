import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Phone, ChevronDown, Tv, Snowflake, 
  WashingMachine, Wind, Flame, Droplet, ChefHat, Info, Tag, Layers, HelpCircle, Mail, MapPin
} from 'lucide-react';
import { STORE } from '../../config/store';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setShowMegaMenu(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Brands', path: '/brands' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQs', path: '/faqs' }
  ];

  const productCategories = [
    { name: 'LED Smart TVs', path: '/products?category=LED TVs', icon: Tv },
    { name: 'Refrigerators', path: '/products?category=Refrigerators', icon: Snowflake },
    { name: 'Washing Machines', path: '/products?category=Washing Machines', icon: WashingMachine },
    { name: 'Air Conditioners', path: '/products?category=Air Conditioners', icon: Wind },
    { name: 'Microwave Ovens', path: '/products?category=Microwave Ovens', icon: Flame },
    { name: 'Water Purifiers', path: '/products?category=Water Purifiers', icon: Droplet },
    { name: 'Kitchen Appliances', path: '/products?category=Kitchen Appliances', icon: ChefHat }
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.shrunk : ''}`}>
      {/* Top Announcement Bar */}
      <div className={styles.announcementBar}>
        <div className={styles.announcementText}>
          {STORE.announcement}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={styles.navbar}>
        <div className={`container ${styles.navContainer}`}>
          
          {/* Logo */}
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoContainer}>
              <span className={styles.brandTitle}>INDIA VISION</span>
              <span className={styles.brandSubtitle}>ELECTRONICS</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className={styles.navLinks}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              if (link.hasMega) {
                return (
                  <li 
                    key={link.name} 
                    className={styles.navItem}
                    onMouseEnter={() => setShowMegaMenu(true)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                  >
                    <Link 
                      to={link.path} 
                      className={`${styles.navLink} ${isActive ? styles.active : ''} ${showMegaMenu ? styles.hovered : ''}`}
                    >
                      {link.name} <ChevronDown size={14} className={styles.chevron} />
                    </Link>

                    {/* Megamenu Dropdown */}
                    <AnimatePresence>
                      {showMegaMenu && (
                        <motion.div 
                          className={`${styles.megaMenu} glass-panel`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                          <div className={styles.megaMenuGrid}>
                            <div className={styles.megaMenuPromo}>
                              <h4 className={styles.promoTitle}>Premium Showcase</h4>
                              <p className={styles.promoText}>Explore top-tier models from Samsung, LG, Sony and more with authorized brand support.</p>
                              <Link to="/contact" className={styles.promoBtn}>Book Store Visit / Enquire</Link>
                            </div>
                            <div className={styles.megaMenuLinksGrid}>
                              {productCategories.map((cat) => {
                                const IconComp = cat.icon;
                                return (
                                  <Link key={cat.name} to={cat.path} className={styles.megaMenuLinkItem}>
                                    <span className={styles.megaIconWrapper}><IconComp size={18} /></span>
                                    <span className={styles.megaLinkLabel}>{cat.name}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={link.name} className={styles.navItem}>
                  <Link 
                    to={link.path} 
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick Call Button (Desktop) */}
          <div className={styles.rightActions}>
            <a href={`tel:${STORE.phoneRaw}`} className={`${styles.callBtn} shine-hover`}>
              <Phone size={16} />
              <span>Call Now</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button 
              className={styles.mobileMenuToggle} 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileDrawerOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              className={`${styles.mobileDrawer} glass-panel`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.drawerHeader}>
                <div className={styles.logoContainer}>
                  <span className={styles.brandTitle}>INDIA VISION</span>
                  <span className={styles.brandSubtitle}>ELECTRONICS</span>
                </div>
                <button 
                  className={styles.drawerCloseBtn}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Navigation Menu"
                >
                  <X size={24} />
                </button>
              </div>

              <ul className={styles.mobileLinks}>
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  if (link.hasMega) {
                    return (
                      <li key={link.name} className={styles.mobileNavItem}>
                        <div className={styles.mobileMegaHeader}>
                          <Link 
                            to={link.path} 
                            className={`${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                          >
                            {link.name}
                          </Link>
                        </div>
                        <ul className={styles.mobileSubLinks}>
                          {productCategories.map((cat) => {
                            const IconComp = cat.icon;
                            return (
                              <li key={cat.name}>
                                <Link to={cat.path} className={styles.mobileSubLinkItem}>
                                  <IconComp size={16} />
                                  <span>{cat.name}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  }

                  return (
                    <li key={link.name} className={styles.mobileNavItem}>
                      <Link 
                        to={link.path} 
                        className={`${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className={styles.drawerFooter}>
                <a href={`tel:${STORE.phoneRaw}`} className={styles.drawerCallBtn}>
                  <Phone size={18} />
                  <span>Call {STORE.phone}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
