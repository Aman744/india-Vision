import React from 'react';
import { motion } from 'framer-motion';

import { BRANDS } from '../data/brands';
import { useSEO } from '../hooks/useSEO';
import { BrandLogo } from '../components/common/BrandLogos';
import styles from './Brands.module.css';

const Brands = () => {
  useSEO({
    title: "Official Brand Partners — India Vision Electronics",
    description: "India Vision Electronics is an authorized dealer for Samsung, LG, Sony, Whirlpool, Voltas, Panasonic, Haier, Blue Star and IFB in Rishikesh."
  });

  return (
    <div className={styles.pageWrapper}>

      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className={styles.pageSubtitle}>Authorized Dealer</span>
          <h1 className={styles.pageTitle}>Official Brand Partners</h1>
          <p className={styles.pageDesc}>
            We are certified partners for the world's most trusted consumer electronics brands.
          </p>
        </div>
      </div>

      {/* Logos Grid */}
      <section className={styles.logosSection}>
        <div className="container">
          <div className={styles.logosGrid}>
            {BRANDS.map((brand, idx) => (
              <motion.div
                key={brand.id}
                className={styles.logoTile}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                whileHover={{ y: -6, boxShadow: `0 16px 36px rgba(0,0,0,0.55), 0 0 22px ${brand.accentColor}55` }}
                style={{ '--brand-accent': brand.accentColor }}
              >
                <BrandLogo id={brand.id} className={styles.logoImg} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Brands;
