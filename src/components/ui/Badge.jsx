import React from 'react';
import styles from './Badge.module.css';

const Badge = ({ children, variant = 'primary' }) => {
  const getBadgeClass = () => {
    switch (variant.toLowerCase()) {
      case 'bestseller':
      case 'best seller':
        return styles.bestSeller;
      case 'premium choice':
      case 'premium':
        return styles.premium;
      case 'toprated':
      case 'top rated':
        return styles.topRated;
      case 'limited':
      case 'limited offer':
        return styles.limited;
      case 'new':
      case 'new arrival':
        return styles.newArrival;
      default:
        return styles.defaultBadge;
    }
  };

  return (
    <span className={`${styles.badge} ${getBadgeClass()}`}>
      {children}
    </span>
  );
};

export default Badge;
