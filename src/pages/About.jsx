import React, { useEffect, useRef } from 'react';
import { Award, Compass, Heart, Shield, Landmark, Calendar, Target, Eye } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { STORE } from '../config/store';
import { useSEO } from '../hooks/useSEO';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useSEO({
    title: "About Us & Our Story Since 1995",
    description: "India Vision Electronics — established in 1995 in Rishikesh. 30+ years of trusted consumer electronics service, authorized multi-brand showroom, and customer-first values."
  });

  const timelineEvents = [
    {
      year: "1995",
      title: "India Vision Founded",
      desc: "Established in Rishikesh, Uttarakhand with a vision to bring quality home appliances and genuine electronics to the local community. Started as an authorized dealer for 3 leading brands."
    },
    {
      year: "2000",
      title: "Multi-Brand Expansion",
      desc: "Grew our brand portfolio to 8+ authorized partnerships including Samsung, LG and Whirlpool. Moved to a larger showroom on Lajpat Rai Marg to accommodate growing customer demand."
    },
    {
      year: "2008",
      title: "LED TV & AC Experience Zone",
      desc: "Launched a dedicated display zone for smart LED televisions and split air conditioners, becoming one of the first multi-brand AC showrooms in Rishikesh."
    },
    {
      year: "2015",
      title: "Premium Showroom Upgrade",
      desc: "Fully redesigned our showroom into a modern, interactive retail experience with live product comparisons, kitchen appliance zones, and dedicated after-sales service desk."
    },
    {
      year: "2020",
      title: "25 Years of Trust",
      desc: "Celebrated 25 years of serving Rishikesh and Haridwar households. Introduced No-Cost EMI, exchange support and extended India Vision Shield warranty plans for customers."
    },
    {
      year: "2026",
      title: "Digital & 30+ Year Legacy",
      desc: "Launched our online catalog and enquiry platform, making it easier for customers across Uttarakhand to explore products, compare specs, and connect with our expert team."
    }
  ];

  // GSAP animations for timeline nodes
  const timelineRef = useRef(null);
  useEffect(() => {
    const items = timelineRef.current.querySelectorAll(`.${styles.timelineItem}`);
    
    items.forEach((item, idx) => {
      gsap.fromTo(item, 
        { opacity: 0, x: idx % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  return (
    <div className={styles.pageWrapper} style={{ position: 'relative' }}>
      
      {/* Layer 2: Volumetric Header Glow */}
      <div className="volumetric-glow glow-primary" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.12 }} />
      
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>About India Vision</h1>
          <p className={styles.pageDesc}>
            Established in 1995 — 30+ years of bringing quality electronics and smart home appliances to Rishikesh & Uttarakhand.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className={styles.sectionPadding}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introContent}>
              <span className={styles.sub}>Who We Are</span>
              <h2 className={styles.introTitle}>Your Trusted Consumer Electronics Partner</h2>
              <p className={styles.introText}>
                Established in <strong>1995</strong>, <strong>{STORE.name}</strong> has grown over 30 years from a trusted local appliance dealer into one of Uttarakhand's most respected premium electronics destinations. We believe technology should bring comfort, convenience, and joy to every household.
              </p>
              <p className={styles.introText}>
                We deal in all types of consumer electronics and home appliances: including Refrigerators, Washing Machines, LED TVs, Microwaves, Commercial Refrigerators, Air Conditioners, Air Coolers, Home Theaters, Heating Appliances, Inverters, and other home appliances.
              </p>
              <p className={styles.introText}>
                Our showroom is proud to offer products from all major global and national brands, including LG, Samsung, Haier, Panasonic, SONY, Voltas, Daikin, Mi, TCL, Videocon, Godrej, Bluestar, Celfrost, Hitachi, General, Mitsubishi, and many more.
              </p>
            </div>
            <div className={styles.introImageWrapper}>
              <img 
                src="/storefront.jpg" 
                alt="Batra, India Vision Storefront in Rishikesh" 
                className={styles.introImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`${styles.sectionPadding} ${styles.altBg}`}>
        <div className="container">
          <div className={styles.missionVisionGrid}>
            
            {/* Mission */}
            <div className={`${styles.mvCard} glass-panel`}>
              <div className={styles.mvIconWrapper}>
                <Target size={28} />
              </div>
              <h3 className={styles.mvTitle}>Our Mission</h3>
              <p className={styles.mvText}>
                To simplify and enhance the lives of our customers by providing access to genuine, high-quality household electronics at the best prices, backed by honest technical advice and authorized after-sales support.
              </p>
            </div>

            {/* Vision */}
            <div className={`${styles.mvCard} glass-panel`}>
              <div className={styles.mvIconWrapper}>
                <Eye size={28} />
              </div>
              <h3 className={styles.mvTitle}>Our Vision</h3>
              <p className={styles.mvText}>
                To be the most preferred and trusted electronics showroom in Uttarakhand, known for customer-centric policies, honest deals, innovative demo hubs, and hassle-free warranty fulfillment services.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values / Why Customers Trust Us */}
      <section className={styles.sectionPadding}>
        <div className="container">
          
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSub}>Our Principles</span>
            <h2 className={styles.sectionTitle}>Why Customers Trust Us</h2>
            <div className={styles.headerLine} />
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <Shield size={24} className={styles.valueIcon} />
              <h3 className={styles.valueTitle}>Genuine Product Guarantee</h3>
              <p className={styles.valueDesc}>
                We sell exclusively 100% genuine products sourced directly from authorized brand distributors, complete with brand warranty cards and invoices.
              </p>
            </div>
            
            <div className={styles.valueCard}>
              <Award size={24} className={styles.valueIcon} />
              <h3 className={styles.valueTitle}>Certified Floor Advisors</h3>
              <p className={styles.valueDesc}>
                Our store advisors are trained and certified by top electronics brands. They help you pick specifications and sizes suitable for your home size.
              </p>
            </div>

            <div className={styles.valueCard}>
              <Compass size={24} className={styles.valueIcon} />
              <h3 className={styles.valueTitle}>No-Cost EMI & Finance</h3>
              <p className={styles.valueDesc}>
                We partner with leading financial services (Bajaj Finserv, HDFC, IDFC First) to offer instant loan options and 0% interest EMI payment cycles.
              </p>
            </div>

            <div className={styles.valueCard}>
              <Heart size={24} className={styles.valueIcon} />
              <h3 className={styles.valueTitle}>Dedicated Customer Desk</h3>
              <p className={styles.valueDesc}>
                Our relationship doesn't end with a sale. We help schedule brand installations, handle after-sales service requests, and follow up on client claims.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className={`${styles.sectionPadding} ${styles.altBg}`}>
        <div className="container">
          
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSub}>Growth Journey</span>
            <h2 className={styles.sectionTitle}>Our History Timeline</h2>
            <div className={styles.headerLine} />
          </div>

          <div className={styles.timeline}>
            {timelineEvents.map((event, idx) => (
              <div 
                key={event.year} 
                className={`${styles.timelineItem} ${idx % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}
              >
                <div className={styles.timelineIndicator}>
                  <Calendar size={16} />
                </div>
                
                <div className={`${styles.timelineCard} glass-panel`}>
                  <span className={styles.timelineYear}>{event.year}</span>
                  <h3 className={styles.timelineTitle}>{event.title}</h3>
                  <p className={styles.timelineDesc}>{event.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
