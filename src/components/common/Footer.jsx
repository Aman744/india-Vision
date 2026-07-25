import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Send, Facebook, Instagram, Twitter, Youtube, ArrowRight 
} from 'lucide-react';
import { STORE } from '../../config/store';
import styles from './Footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  const supportLinks = [
    { name: 'Authorized Brands', path: '/brands' },
    { name: 'Location Maps', path: '/contact' },
    { name: 'Help & FAQs', path: '/faqs' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Partner Brands', path: '/brands' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact & Location', path: '/contact' },
    { name: 'Help & FAQs', path: '/faqs' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerTop}`}>
        <div className={styles.footerGrid}>
          
          {/* Brand Info Column */}
          <div className={styles.brandCol}>
            <div className={styles.logoContainer}>
              <span className={styles.brandTitle}>BATRA, INDIA VISION</span>
              <span className={styles.brandSubtitle}>ELECTRONICS</span>
            </div>
            <p className={styles.brandDesc}>
              {STORE.description}
            </p>
            <div className={styles.socialIcons}>
              <a href={STORE.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook Page"><Facebook size={18} /></a>
              <a href={STORE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Page"><Instagram size={18} /></a>
              <a href={STORE.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter Feed"><Twitter size={18} /></a>
              <a href={STORE.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={styles.footerLink}>
                    <ArrowRight size={12} className={styles.arrow} />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Support</h4>
            <ul className={styles.linksList}>
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={styles.footerLink}>
                    <ArrowRight size={12} className={styles.arrow} />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Contacts & Hours */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Store Information</h4>
            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} />
                <span>{STORE.address}</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                <a href={`tel:${STORE.phoneRaw}`}>{STORE.phone}</a>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                <a href={`mailto:${STORE.email}`}>{STORE.email}</a>
              </div>
            </div>
            
            <h5 className={styles.hoursTitle}>Business Hours</h5>
            <div className={styles.hoursItems}>
              {STORE.businessHours.map((bh, idx) => (
                <div key={idx} className={styles.hoursItem}>
                  <span className={styles.days}>{bh.days}:</span>
                  <span className={styles.time}>{bh.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterText}>
            <h4 className={styles.newsletterTitle}>Subscribe to our Newsletter</h4>
            <p className={styles.newsletterDesc}>Get early notifications of holiday discounts, sales events, and product arrivals.</p>
          </div>
          <form className={styles.newsletterForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.newsletterInput}
                aria-label="Newsletter Email Address"
              />
              <button 
                type="submit" 
                className={styles.newsletterBtn}
                aria-label="Submit Newsletter Form"
              >
                <Send size={16} />
              </button>
            </div>
            {subscribed && (
              <p className={styles.successMsg}>Thank you! You have successfully subscribed.</p>
            )}
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={`container ${styles.bottomContainer}`}>
          <p className={styles.copyText}>
            &copy; {new Date().getFullYear()} {STORE.name}. All Rights Reserved. | <span className={styles.gstinBadge}>GSTIN: {STORE.gstin}</span>
          </p>
          <ul className={styles.bottomLinks}>
            <li><Link to="/about">Authorized Dealer Status</Link></li>
            <li><Link to="/faqs">EMI & Finance Terms</Link></li>
            <li><Link to="/contact">Location Maps</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
