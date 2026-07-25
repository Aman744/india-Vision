import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, X } from 'lucide-react';

import { FAQS } from '../data/faqs';
import { useSEO } from '../hooks/useSEO';
import styles from './FAQs.module.css';

const FAQs = () => {
  useSEO({
    title: "Frequently Asked Questions",
    description: "Find answers to questions about delivery, installation, warranty claims, old appliance exchanges, and No-Cost EMI plans at India Vision."
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const categories = [
    'All',
    'Delivery & Setup',
    'Payments',
    'Finance & EMI',
    'Exchange & Upgrade',
    'Warranty & Services',
    'Pricing'
  ];

  const handleToggleAccordion = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  // Filtered FAQ list based on category and search text
  const filteredFAQs = useMemo(() => {
    return FAQS.filter(faq => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className={styles.pageWrapper} style={{ position: 'relative' }}>
      
      {/* Layer 2: Volumetric Header Glow */}
      <div className="volumetric-glow glow-primary" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.12 }} />
      
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
          <p className={styles.pageDesc}>
            Got questions about warranties, deliveries, or payments? Browse our categories or search for specific answers.
          </p>
        </div>
      </div>

      <section className={styles.sectionPadding}>
        <div className="container">
          
          {/* Search bar inside FAQ page */}
          <div className={styles.searchSection}>
            <div className={`${styles.searchBox} glass-panel`}>
              <Search size={20} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search queries (e.g. delivery, warranty, exchange, EMI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Search FAQs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className={styles.clearSearchBtn}
                  aria-label="Clear search input"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className={styles.tabsWrapper}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.tabBtn} ${activeCategory === cat ? styles.tabActive : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedId(null); // Reset expansions on filter change
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className={styles.faqList}>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => {
                const isExpanded = expandedId === faq.id;
                return (
                  <div 
                    key={faq.id} 
                    className={`${styles.faqItem} glass-panel ${isExpanded ? styles.itemExpanded : ''}`}
                  >
                    <button 
                      className={styles.questionHeader}
                      onClick={() => handleToggleAccordion(faq.id)}
                      aria-expanded={isExpanded}
                    >
                      <div className={styles.questionTitleBox}>
                        <HelpCircle size={18} className={styles.helpIcon} />
                        <span className={styles.questionText}>{faq.question}</span>
                      </div>
                      <ChevronDown size={18} className={`${styles.arrow} ${isExpanded ? styles.arrowRotate : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          className={styles.answerWrapper}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className={styles.answerContent}>
                            <p className={styles.answerText}>{faq.answer}</p>
                            <span className={styles.categoryTag}>{faq.category}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className={`${styles.noResultsBox} glass-panel`}>
                <HelpCircle size={44} className={styles.noResultsIcon} />
                <h3 className={styles.noResultsTitle}>No Matching Questions</h3>
                <p className={styles.noResultsText}>
                  We couldn't find any answers matching your query: "<strong>{searchQuery}</strong>". Try searching for different terms or browse categories.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }} 
                  className={`${styles.resetBtn} gradient-bg-primary`}
                >
                  Show All Questions
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};

export default FAQs;
