import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MessageSquare, Check, Star } from 'lucide-react';
import Badge from '../ui/Badge';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onQuickView, onEnquiry }) => {
  const { name, brand, rating, badge, image, shortDescription, features, energyRating } = product;

  return (
    <motion.div 
      className={`${styles.card} glass-panel shine-hover`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
    >
      {/* Badge Overlay */}
      {badge && (
        <div className={styles.badgeOverlay}>
          <Badge variant={badge}>{badge}</Badge>
        </div>
      )}

      {/* Image Container */}
      <div className={`${styles.imageWrapper} img-zoom-container`}>
        <img 
          src={image} 
          alt={`${brand} ${name}`} 
          loading="lazy" 
          className={styles.productImage}
        />
        {/* Hover quick overlay actions */}
        <div className={styles.imageOverlay}>
          <button 
            onClick={() => onQuickView(product)} 
            className={styles.overlayBtn}
            aria-label={`Quick view ${name}`}
          >
            <Eye size={18} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className={styles.details}>
        <div className={styles.brandRow}>
          <span className={styles.brandName}>{brand}</span>
          <div className={styles.ratingBox}>
            <Star size={12} className={styles.starIcon} />
            <span>{rating}</span>
          </div>
        </div>

        <h3 className={styles.productName}>{name}</h3>
        
        {energyRating && (
          <span className={styles.energyLabel}>⚡ {energyRating}</span>
        )}

        <p className={styles.description}>{shortDescription}</p>

        {/* Small bullets of top 3 features */}
        <ul className={styles.featureList}>
          {features.slice(0, 3).map((feat, idx) => (
            <li key={idx}>
              <Check size={14} className={styles.checkIcon} />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button 
            className={`${styles.enquiryBtn} gradient-bg-primary`}
            onClick={() => onEnquiry(product)}
          >
            <MessageSquare size={16} />
            <span>Send Enquiry</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
