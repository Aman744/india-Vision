import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RefreshCw, X, AlertTriangle } from 'lucide-react';

import { PRODUCTS } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import ProductQuickView from '../components/products/ProductQuickView';
import EnquiryModal from '../components/products/EnquiryModal';
import { useSEO } from '../hooks/useSEO';
import styles from './Products.module.css';

const Products = () => {
  useSEO({
    title: "LED TVs, Refrigerators & Home Appliances",
    description: "Browse our premium electronics catalog at India Vision Electronics. Explore Sony/Samsung Smart TVs, Bosch washers, double door refrigerators, and kitchen hobs."
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Filter and Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Sync state if search parameter updates
  useEffect(() => {
    setSelectedCategory(categoryParam || 'All');
  }, [categoryParam]);

  const categories = [
    'All',
    'LED TVs',
    'Refrigerators',
    'Washing Machines',
    'Air Conditioners',
    'Microwave Ovens',
    'Water Purifiers',
    'Kitchen Appliances'
  ];

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSearchParams({});
    setSelectedCategory('All');
    setSortBy('featured');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleEnquiry = (product) => {
    setSelectedProduct(product);
    setIsEnquiryOpen(true);
  };

  // Filtered and Sorted Products list (Memoized for performance)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category Filter
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

      // Search Query Filter (Matches Name, Brand, Model, Category, or short description)
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.model.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      // Sorting Options
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'alphabetical') {
        return a.name.localeCompare(b.name);
      }
      // default: 'featured' order matches original index
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Instant Suggestions (Matches as user types)
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    
    // Return max 5 suggestions
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.brand.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchQuery]);

  return (
    <div className={styles.pageWrapper} style={{ position: 'relative' }}>
      
      {/* Layer 2: Volumetric Header Glow */}
      <div className="volumetric-glow glow-secondary" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.12 }} />
      
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Showroom Catalog</h1>
          <p className={styles.pageDesc}>
            Explore our curated range of premium smart home appliances and ultra HD cinematic displays.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.mainGrid}>
          
          {/* Filters Sidebar (Desktop) */}
          <aside className={`${styles.sidebar} ${showFiltersMobile ? styles.sidebarMobileOpen : ''}`}>
            <div className={`${styles.sidebarContainer} glass-panel`}>
              <div className={styles.sidebarHeader}>
                <h3 className={styles.sidebarTitle}>Filter & Sort</h3>
                <button 
                  className={styles.resetBtn} 
                  onClick={handleResetFilters}
                  aria-label="Reset all filters"
                >
                  <RefreshCw size={14} />
                  <span>Reset All</span>
                </button>
                <button 
                  className={styles.mobileCloseBtn}
                  onClick={() => setShowFiltersMobile(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Category selector */}
              <div className={styles.filterGroup}>
                <h4 className={styles.filterTitle}>By Category</h4>
                <ul className={styles.categoryList}>
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.categoryActive : ''}`}
                        onClick={() => handleCategorySelect(cat)}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sort selector */}
              <div className={styles.filterGroup}>
                <h4 className={styles.filterTitle}>Sort Products By</h4>
                <select 
                  className={styles.selectInput}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort products by"
                >
                  <option value="featured">Featured / Default</option>
                  <option value="rating">Customer Rating</option>
                  <option value="alphabetical">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Catalog & Search Area */}
          <div className={styles.catalogArea}>
            
            {/* Search Input bar */}
            <div className={styles.searchBarWrapper}>
              <div className={`${styles.searchBox} glass-panel`}>
                <Search size={20} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search products by brand, model, or specs (e.g. Samsung OLED TV, Bosch airfryer)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  aria-label="Search products"
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

              {/* Instant Suggestions Box */}
              {suggestions.length > 0 && (
                <div className={`${styles.suggestionsBox} glass-panel`}>
                  {suggestions.map((sug) => (
                    <button
                      key={sug.id}
                      className={styles.suggestionItem}
                      onClick={() => {
                        setSearchQuery(sug.name);
                        // Trigger quick view directly on choice
                        handleQuickView(sug);
                      }}
                    >
                      <span className={styles.sugBrand}>{sug.brand}</span>
                      <span className={styles.sugName}>{sug.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Controls Panel */}
            <div className={styles.mobileControls}>
              <button 
                className={styles.mobileFilterBtn}
                onClick={() => setShowFiltersMobile(true)}
              >
                <SlidersHorizontal size={18} />
                <span>Filters & Categories</span>
              </button>
              <div className={styles.mobileActiveSummary}>
                Showing {filteredProducts.length} items
              </div>
            </div>

            {/* Product count display */}
            <div className={styles.resultsSummary}>
              Showing <strong>{filteredProducts.length}</strong> premium products 
              {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={handleQuickView}
                    onEnquiry={handleEnquiry}
                  />
                ))}
              </div>
            ) : (
              /* No Results Box */
              <div className={`${styles.noResultsBox} glass-panel`}>
                <AlertTriangle size={48} className={styles.noResultsIcon} />
                <h3 className={styles.noResultsTitle}>No Products Found</h3>
                <p className={styles.noResultsText}>
                  We couldn't find any products matching your search criteria: "<strong>{searchQuery}</strong>". Try checking the spelling, resetting filters, or selecting a different category.
                </p>
                <button 
                  onClick={handleResetFilters} 
                  className={`${styles.resetFilterBtn} gradient-bg-primary`}
                >
                  Clear Filters & Show All
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductQuickView 
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={selectedProduct}
        onEnquiry={handleEnquiry}
      />

      {/* Enquiry Form Modal */}
      <EnquiryModal 
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        product={selectedProduct}
      />

    </div>
  );
};

export default Products;
