import React from 'react';
import { Phone } from 'lucide-react';
import { STORE } from '../../config/store';
import styles from './FloatingActions.module.css';

const FloatingActions = () => {
  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <a 
        href={STORE.whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.whatsappFloat}
        aria-label="Chat on WhatsApp"
      >
        <svg 
          viewBox="0 0 448 512" 
          width="24" 
          height="24" 
          fill="currentColor" 
          className={styles.icon}
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 508l145.1-38c32.7 17.8 69.4 27.2 107.1 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 474c-33.1 0-65.7-8.9-94.1-25.7l-6.7-4-86.1 22.6 23-84-4.4-7C38.3 342.9 29.5 306.7 29.5 269c0-107.2 87.2-194.4 194.4-194.4 51.9 0 100.8 20.2 137.5 56.9 36.7 36.7 56.9 85.5 56.9 137.5 0 107.2-87.2 194.4-194.4 194.4zm113.3-155.4c-6.2-3.1-36.7-18.1-42.4-20.1-5.7-2-9.9-3-14 3-4.2 6.1-16.2 20.1-19.8 24.1-3.6 4-7.2 4.5-13.4 1.4-6.2-3.1-26.2-9.6-50-30.8-18.5-16.5-31-36.9-34.6-43-3.6-6.2-.4-9.5 2.7-12.6 2.8-2.8 6.2-7.2 9.3-10.8 3.1-3.6 4.1-6.1 6.2-10.2 2-4.1 1-7.7-.5-10.8-1.5-3.1-14-33.7-19.2-46.3-5.1-12.2-10.3-10.6-14-10.8-3.6-.2-7.7-.2-11.8-.2-4.1 0-10.8 1.5-16.5 7.7-5.7 6.1-21.8 21.3-21.8 51.9s22.4 60.2 25.5 64.3c3.1 4.1 44.1 67.3 106.8 94.5 14.9 6.5 26.6 10.4 35.7 13.3 15 4.8 28.6 4.1 39.3 2.5 12-1.8 36.7-15 41.9-29.4 5.2-14.4 5.2-26.7 3.6-29.3-1.5-2.6-5.7-4.2-12-7.3z"/>
        </svg>
        <span className={styles.label}>Chat on WhatsApp</span>
      </a>

      {/* Sticky Bottom Call Button (Mobile Only) */}
      <div className={styles.mobileCallBar}>
        <a href={`tel:${STORE.phoneRaw}`} className={styles.mobileCallBtn}>
          <Phone size={20} />
          <span>Call India Vision Now</span>
        </a>
      </div>
    </>
  );
};

export default FloatingActions;
