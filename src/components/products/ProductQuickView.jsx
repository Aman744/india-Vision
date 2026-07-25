import React from 'react';
import Modal from '../ui/Modal';
import { ShieldCheck, MessageSquare, Check } from 'lucide-react';
import styles from './ProductQuickView.module.css';

const ProductQuickView = ({ isOpen, onClose, product, onEnquiry }) => {
  if (!product) return null;

  const { 
    name, brand, model, image, features, specifications, 
    warranty, sizes, energyRating, shortDescription 
  } = product;

  const handleEnquiryClick = () => {
    onClose(); // Close the QuickView modal first
    onEnquiry(product); // Trigger the Enquiry modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Specification Details">
      <div className={styles.container}>
        
        {/* Split grid layout */}
        <div className={styles.grid}>
          
          {/* Left Column: Image, warranty, sizes */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <img src={image} alt={name} className={styles.image} />
            </div>
            
            {/* Warranty Box */}
            <div className={styles.warrantyBox}>
              <ShieldCheck size={20} className={styles.warrantyIcon} />
              <div>
                <h4 className={styles.warrantyTitle}>Authorized Warranty</h4>
                <p className={styles.warrantyText}>{warranty}</p>
              </div>
            </div>

            {/* Sizes */}
            {sizes && sizes.length > 0 && (
              <div className={styles.sizesSection}>
                <h4 className={styles.sectionTitle}>Available Sizes / Models</h4>
                <div className={styles.sizesGrid}>
                  {sizes.map((size, idx) => (
                    <span key={idx} className={styles.sizeBadge}>{size}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Descriptions, Specs, CTA */}
          <div className={styles.detailsColumn}>
            <div className={styles.brandRow}>
              <span className={styles.brandName}>{brand}</span>
              {energyRating && (
                <span className={styles.energyRating}>⚡ {energyRating}</span>
              )}
            </div>
            
            <h2 className={styles.productName}>{name}</h2>
            <p className={styles.modelNum}>Model: {model}</p>
            
            <p className={styles.desc}>{shortDescription}</p>

            {/* Features */}
            <div className={styles.featuresSection}>
              <h4 className={styles.sectionTitle}>Key Features</h4>
              <ul className={styles.featureList}>
                {features.map((feat, idx) => (
                  <li key={idx}>
                    <Check size={14} className={styles.checkIcon} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs Table */}
            {specifications && Object.keys(specifications).length > 0 && (
              <div className={styles.specsSection}>
                <h4 className={styles.sectionTitle}>Technical Specifications</h4>
                <table className={styles.specsTable}>
                  <tbody>
                    {Object.entries(specifications).map(([key, val]) => (
                      <tr key={key}>
                        <td className={styles.specKey}>{key}</td>
                        <td className={styles.specValue}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Enquiry CTA Button */}
            <button 
              className={`${styles.enquiryBtn} gradient-bg-primary`}
              onClick={handleEnquiryClick}
            >
              <MessageSquare size={18} />
              <span>Request Custom Store Quote</span>
            </button>
          </div>

        </div>

      </div>
    </Modal>
  );
};

export default ProductQuickView;
