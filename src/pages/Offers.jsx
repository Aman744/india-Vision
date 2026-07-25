import React, { useState, useEffect } from 'react';
import { Tag, Copy, Check, MessageCircle, AlertCircle } from 'lucide-react';

import { OFFERS } from '../data/offers';
import { STORE } from '../config/store';
import { useSEO } from '../hooks/useSEO';
import styles from './Offers.module.css';

const Offers = () => {
  useSEO({
    title: "Latest Promotional Offers & Discounts",
    description: "Get up to 40% Off on smart TVs, double door refrigerators, washers, and ACs at India Vision Electronics. Copy coupon codes for store discounts."
  });

  const [copiedId, setCopiedId] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(23, 59, 59, 999); // Midnight tonight
      
      const difference = target - now;
      let hours = Math.floor(difference / (1000 * 60 * 60));
      let minutes = Math.floor((difference / 1000 / 60) % 60);
      let seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <div className={styles.pageWrapper} style={{ position: 'relative' }}>
      
      {/* Layer 2: Volumetric Header Glow */}
      <div className="volumetric-glow glow-aurora" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.12 }} />
      
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Latest Deals & Coupon Codes</h1>
          <p className={styles.pageDesc}>
            Take advantage of our exclusive seasonal sales. Copy the coupon codes below and mention them to our sales staff at the showroom.
          </p>
        </div>
      </div>

      {/* Flash Deal of the Day */}
      <section className={styles.flashDealSection}>
        <div className="container">
          <div className={`${styles.flashDealCard} glass-panel`}>
            <div className={styles.flashBadge}>⚡ FLASH DEAL OF THE DAY</div>
            <div className={styles.flashGrid}>
              <div className={styles.flashImageWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=600&auto=format&fit=crop" 
                  alt="Featured Smart TV Deal" 
                  className={styles.flashImage} 
                />
              </div>
              <div className={styles.flashDetails}>
                <h3 className={styles.flashTitle}>Samsung 55-inch Crystal 4K Ultra HD Smart TV</h3>
                <p className={styles.flashPriceRow}>
                  <span className={styles.dealPrice}>₹43,990</span>
                  <span className={styles.originalPrice}>₹64,990</span>
                  <span className={styles.discountPercent}>32% OFF</span>
                </p>
                
                {/* Countdown clock */}
                <div className={styles.countdownWrapper}>
                  <div className={styles.countdownTitle}>Deal Ends In:</div>
                  <div className={styles.countdownClock}>
                    <div className={styles.timeBox}>
                      <span className={styles.timeNum}>{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className={styles.timeLabel}>Hours</span>
                    </div>
                    <span className={styles.divider}>:</span>
                    <div className={styles.timeBox}>
                      <span className={styles.timeNum}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className={styles.timeLabel}>Mins</span>
                    </div>
                    <span className={styles.divider}>:</span>
                    <div className={styles.timeBox}>
                      <span className={styles.timeNum}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className={styles.timeLabel}>Secs</span>
                    </div>
                  </div>
                </div>

                <a 
                  href={`${STORE.whatsappUrl}?text=Hi! I am interested in claiming the Flash Deal of the Day: Samsung 55-inch Crystal 4K TV at the special price of ₹43,990.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.claimDealBtn} gradient-bg-primary shine-hover`}
                >
                  Claim Deal on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Showcase Section */}
      <section className={styles.sectionPadding}>
        <div className="container">
          <div className={styles.offersGrid}>
            {OFFERS.map((offer) => (
              <div key={offer.id} className={`${styles.offerCard} glass-panel`}>
                
                {/* Banner Image */}
                <div className={styles.imageColumn}>
                  <img src={offer.image} alt={offer.title} className={styles.image} />
                  <div className={styles.badge}>{offer.badge}</div>
                </div>

                {/* Offer Details */}
                <div className={styles.contentColumn}>
                  <div className={styles.headerRow}>
                    <div className={styles.discountTag}>
                      <Tag size={16} />
                      <span>{offer.discount}</span>
                    </div>
                  </div>
                  
                  <h2 className={styles.offerTitle}>{offer.title}</h2>
                  <p className={styles.offerTagline}>{offer.tagline}</p>
                  <p className={styles.offerDesc}>{offer.description}</p>
                  
                  {/* Coupon Copy Block */}
                  <div className={styles.couponBlock}>
                    <div className={styles.codeContainer}>
                      <span className={styles.codeLabel}>Showroom Coupon Code</span>
                      <span className={styles.codeVal}>{offer.code}</span>
                    </div>
                    
                    <button 
                      className={`${styles.copyBtn} ${copiedId === offer.id ? styles.copySuccess : ''}`}
                      onClick={() => handleCopyCode(offer.id, offer.code)}
                      aria-label="Copy coupon code"
                    >
                      {copiedId === offer.id ? (
                        <>
                          <Check size={16} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terms and conditions */}
                  <div className={styles.termsBox}>
                    <AlertCircle size={14} className={styles.termsIcon} />
                    <span className={styles.termsText}><strong>Terms:</strong> {offer.terms}</span>
                  </div>

                  {/* Enquiry redirect */}
                  <div className={styles.actionRow}>
                    <a 
                      href={`${STORE.whatsappUrl}?text=Hi! I am interested in claiming the ${offer.title} offer using coupon code ${offer.code}.`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.claimBtn}
                    >
                      <MessageCircle size={16} />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Offers;
