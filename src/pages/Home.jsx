import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tv, Snowflake, WashingMachine, Wind, Flame, Droplet, ChefHat,
  ArrowRight, Phone, MessageSquare, Star, Quote, ChevronLeft, ChevronRight, Check
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { STORE } from '../config/store';
import { PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { TESTIMONIALS } from '../data/testimonials';
import { SERVICES } from '../data/services';
import { GALLERY } from '../data/gallery';

import ProductCard from '../components/products/ProductCard';
import ProductQuickView from '../components/products/ProductQuickView';
import EnquiryModal from '../components/products/EnquiryModal';
import Badge from '../components/ui/Badge';
import { useSEO } from '../hooks/useSEO';
import { BrandLogo } from '../components/common/BrandLogos';
import styles from './Home.module.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useSEO({
    title: "Bringing Smart Technology Home",
    description: "Welcome to India Vision Electronics - premium electronics store in Bangalore. Shop LED Smart TVs, refrigerators, washers, ACs, and home appliances."
  });

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % totalSlides);

  const heroSlides = [
    {
      title: "Latest Smart TVs Showcase",
      subtitle: "Ultra HD OLED & QLED Screens",
      text: "Transform your living room with next-gen display panel technology. Explore the latest models from Samsung & Sony Bravia with certified brand support.",
      image: "/images/smart_tv_banner.jpg",
      cta: "Get Quote",
      link: "/contact?interest=LED Smart TVs"
    },
    {
      title: "Premium Smart Refrigerators",
      subtitle: "Convertible Multi-Door Cooling",
      text: "Twin cooling technology that adapts to your cooling needs. Explore premium smart inverter double-door and French door refrigerators.",
      image: "/images/refrigerator_banner.jpg",
      cta: "Get Quote",
      link: "/contact?interest=Refrigerators"
    },
    {
      title: "Energy Efficient Air Conditioners",
      subtitle: "Instant Multi-stage Cooling at 52°C",
      text: "Experience stabilizer-free cooling operation with Voltas and Blue Star 5-Star Split ACs. Authorized brand installation and support.",
      image: "/images/ac_banner.jpg",
      cta: "Get Quote",
      link: "/contact?interest=Air Conditioners"
    },
    {
      title: "Advanced Kitchen Appliances",
      subtitle: "Effortless Cooking, Healthy Living",
      text: "Check out high-performance convection microwaves and air fryers. Perfect for baking, grilling, and healthy frying in your modern kitchen.",
      image: "/images/microwave_banner.jpg",
      cta: "Get Quote",
      link: "/contact?interest=Kitchen Appliances"
    }
  ];

  // Auto transition hero slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Testimonials Carousel State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto transition testimonials every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // GSAP Counter Animations
  const statsRef = useRef(null);
  useEffect(() => {
    const counters = statsRef.current.querySelectorAll(`.${styles.statNumber}`);

    ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 80%",
      onEnter: () => {
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';

          gsap.fromTo(counter,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              onUpdate: function () {
                counter.innerHTML = Math.ceil(this.targets()[0].textContent) + suffix;
              }
            }
          );
        });
      },
      once: true
    });
  }, []);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleEnquiry = (product) => {
    setSelectedProduct(product);
    setIsEnquiryOpen(true);
  };

  // Map category names to icons
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'LED TVs': return Tv;
      case 'Refrigerators': return Snowflake;
      case 'Washing Machines': return WashingMachine;
      case 'Air Conditioners': return Wind;
      case 'Microwave Ovens': return Flame;
      case 'Water Purifiers': return Droplet;
      case 'Kitchen Appliances': return ChefHat;
      default: return Layers;
    }
  };

  const featuredCategories = [
    { name: 'LED TVs', label: 'Smart TVs', desc: '4K OLED & QLED displays' },
    { name: 'Refrigerators', label: 'Refrigerators', desc: 'Double & French door coolers' },
    { name: 'Washing Machines', label: 'Washing Machines', desc: 'Fully-automatic clean wash' },
    { name: 'Air Conditioners', label: 'Air Conditioners', desc: 'Energy saver 5-Star split ACs' },
    { name: 'Microwave Ovens', label: 'Microwaves', desc: 'Grills and convection baking' },
    { name: 'Water Purifiers', label: 'Water Purifiers', desc: 'RO + UV pure drinking water' },
    { name: 'Kitchen Appliances', label: 'Kitchen Appliances', desc: 'Air fryers and heavy mixers' }
  ];

  return (
    <div className={styles.homeContainer} style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Layer 2: Volumetric Ambient Lighting Glows */}
      <div className="volumetric-glow glow-primary" style={{ top: '2%', left: '5%', opacity: 0.15 }} />
      <div className="volumetric-glow glow-secondary" style={{ top: '25%', right: '-10%', opacity: 0.1 }} />
      <div className="volumetric-glow glow-aurora" style={{ top: '50%', left: '-15%', opacity: 0.08 }} />
      <div className="volumetric-glow glow-primary" style={{ bottom: '15%', right: '5%', opacity: 0.12 }} />

      {/* 1. HERO SLIDER */}
      <section className={styles.heroSection} aria-label="Featured Promotions">
        <div className={styles.slideContainer}>
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`${styles.heroSlide} ${idx === currentSlide ? styles.slideActive : ''}`}
            >
              {/* Volumetric backdrop glow for slide */}
              <div className="volumetric-glow glow-primary" style={{ top: '25%', right: '10%', opacity: 0.15, width: '500px', height: '500px' }} />

              <div className={`container ${styles.heroContentWrapper}`}>
                <div className={styles.heroGrid}>

                  {/* Left Column: Text content */}
                  <AnimatePresence mode="wait">
                    {idx === currentSlide && (
                      <motion.div
                        className={styles.heroInfo}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className={styles.heroTagline}>{slide.subtitle}</span>
                        <h1 className={styles.heroTitle}>{slide.title}</h1>
                        <p className={styles.heroText}>{slide.text}</p>

                        <div className={styles.heroBtns}>
                          <Link to={slide.link} className={`${styles.heroBtnMain} gradient-bg-primary shine-hover`}>
                            <span>{slide.cta}</span>
                            <ArrowRight size={16} />
                          </Link>
                          <Link to="/contact" className={styles.heroBtnSub}>
                            Contact Us
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Right Column: 3D Product Image Showcase */}
                  <AnimatePresence mode="wait">
                    {idx === currentSlide && (
                      <motion.div
                        className={styles.heroImageColumn}
                        initial={{ opacity: 0, scale: 0.88, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: -20 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className={styles.heroImageGlass}>
                          <img
                            src={(slide.image.startsWith('/') ? import.meta.env.BASE_URL + slide.image.slice(1) : import.meta.env.BASE_URL + slide.image)}
                            alt={slide.title}
                            className={styles.heroProductImg}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide navigation controls */}
        <button
          className={`${styles.sliderArrow} ${styles.sliderArrowLeft}`}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          className={`${styles.sliderArrow} ${styles.sliderArrowRight}`}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        <div className={styles.sliderDots}>
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === currentSlide ? styles.dotActive : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Show promotional slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className={styles.sectionPadding} aria-label="Product Categories">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSub}>Featured Divisions</span>
            <h2 className={styles.sectionTitle}>Shop by Category</h2>
            <div className={styles.headerLine} />
          </div>

          <div className={styles.categoryGrid}>
            {featuredCategories.map((cat, idx) => {
              const IconComp = getCategoryIcon(cat.name);
              return (
                <Link
                  key={cat.name}
                  to={`/contact?interest=${cat.name === 'LED TVs' ? 'LED Smart TVs' : cat.name}`}
                  className={`${styles.categoryCard} glass-panel shine-hover`}
                >
                  <div className={styles.catIconWrapper}>
                    <IconComp size={28} />
                  </div>
                  <h3 className={styles.catName}>{cat.label}</h3>
                  <p className={styles.catDesc}>{cat.desc}</p>
                  <span className={styles.catLink}>
                    <span>Enquire</span>
                    <ArrowRight size={14} className={styles.catArrow} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* 5. SERVICES / WHY CHOOSE US */}
      <section className={`${styles.sectionPadding} ${styles.altBg}`} aria-label="Services Guarantees">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSub}>Why Buy From Us</span>
            <h2 className={styles.sectionTitle}>India Vision Customer Services</h2>
            <div className={styles.headerLine} />
          </div>

          <div className={styles.servicesGrid}>
            {SERVICES.slice(0, 6).map((service) => {
              return (
                <div key={service.id} className={`${styles.serviceCard} glass-panel`}>
                  <div className={styles.serviceCheckWrapper}>
                    <Check size={18} />
                  </div>
                  <div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDesc}>{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TRUSTED BRANDS INFINITE MARQUEE */}
      <section className={styles.marqueeSection} aria-label="Partner Brands">
        <div className={styles.marqueeTitleWrapper}>
          <h2 className={styles.marqueeHeader}>Official Brand Partner Showroom</h2>
        </div>

        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {/* Double the list for infinite scroll gap loops */}
            {[...BRANDS, ...BRANDS].map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className={styles.brandTickerCard}
                style={{ '--brand-accent': brand.accentColor }}
              >
                <BrandLogo id={brand.id} className={styles.tickerLogoSvg} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS CAROUSEL */}
      <section className={`${styles.sectionPadding} ${styles.altBg}`} aria-label="Customer Reviews">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSub}>Feedback</span>
            <h2 className={styles.sectionTitle}>What Customers Say</h2>
            <div className={styles.headerLine} />
          </div>

          <div className={styles.testimonialsWrapper}>
            <div className={styles.sliderContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  className={`${styles.testimonialCard} glass-panel`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Quote size={40} className={styles.quoteIcon} />
                  <div className={styles.ratingStars}>
                    {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} size={16} className={styles.starFilled} />
                    ))}
                  </div>
                  <p className={styles.reviewComment}>
                    "{TESTIMONIALS[currentTestimonial].comment}"
                  </p>
                  <div className={styles.reviewerInfo}>
                    <h4 className={styles.reviewerName}>
                      — {TESTIMONIALS[currentTestimonial].name}
                    </h4>
                    <span className={styles.reviewerProduct}>
                      Verified Buyer ({TESTIMONIALS[currentTestimonial].product})
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider arrows */}
            <div className={styles.sliderArrows}>
              <button
                className={styles.arrowBtn}
                onClick={() => setCurrentTestimonial(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                aria-label="Previous Review"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className={styles.arrowBtn}
                onClick={() => setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length)}
                aria-label="Next Review"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. STATISTICS SECTION */}
      <section
        ref={statsRef}
        className={styles.statsSection}
        aria-label="Business Statistics"
      >
        <div className={`container ${styles.statsGrid}`}>
          <div className={styles.statItem}>
            <span className={styles.statNumber} data-target="30" data-suffix="+">30+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber} data-target="10000" data-suffix="+">10,000+</span>
            <span className={styles.statLabel}>Happy Customers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber} data-target="500" data-suffix="+">500+</span>
            <span className={styles.statLabel}>Authorized Products</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber} data-target="9" data-suffix="">9</span>
            <span className={styles.statLabel}>Authorized Brands</span>
          </div>
        </div>
      </section>

      {/* 9. SHOWROOM GALLERY */}
      <section className={styles.sectionPadding} aria-label="Showroom Gallery">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSub}>Inside Our Showroom</span>
            <h2 className={styles.sectionTitle}>India Vision Gallery</h2>
            <div className={styles.headerLine} />
          </div>

          <div className={styles.galleryGrid}>
            {GALLERY.map((item, index) => (
              <div key={item.id} className={`${styles.galleryCard} img-zoom-container`}>
                <img src={(item.image.startsWith('/') ? import.meta.env.BASE_URL + item.image.slice(1) : import.meta.env.BASE_URL + item.image)} alt={item.title} className={styles.galleryImg} />
                <div className={styles.galleryInfo}>
                  <span className={styles.galleryCat}>{item.category}</span>
                  <h4 className={styles.galleryTitle}>{item.title}</h4>
                  <p className={styles.galleryDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CONTACT CTA BANNER */}
      <section className={styles.ctaBanner} aria-label="Call to action">
        <div className={`container ${styles.ctaContainer}`}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>Looking for <span>Custom Solutions or Specific Models?</span></h2>
            <p className={styles.ctaDesc}>Get in touch with our tech experts now. We provide customized bulk orders, exchange quotes, and home delivery across Rishikesh & Haridwar.</p>
          </div>
          <div className={styles.ctaButtons}>
            <a href={`tel:${STORE.phoneRaw}`} className={`${styles.ctaPhoneBtn} shine-hover`}>
              <Phone size={18} />
              <span>Call {STORE.phone}</span>
            </a>
            <a href={STORE.whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaWhatsappBtn}>
              <MessageSquare size={18} />
              <span>Message WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

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

export default Home;
