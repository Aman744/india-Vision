import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FloatingActions from '../components/common/FloatingActions';
import ScrollProgressBar from '../components/common/ScrollProgressBar';
import BackToTop from '../components/common/BackToTop';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      {/* Scroll Progress Bar at the top */}
      <ScrollProgressBar />

      {/* Sticky Header with announcements & navigation */}
      <Navbar />

      {/* Main page content area */}
      <main id="main-content" className={styles.mainContent}>
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Floating Actions (WhatsApp chat and Mobile sticky Call bar) */}
      <FloatingActions />

      {/* Scroll to Top Trigger */}
      <BackToTop />
    </div>
  );
};

export default MainLayout;
