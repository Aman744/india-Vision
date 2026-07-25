import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Send, CheckCircle, Loader2, Clock, MessageSquare 
} from 'lucide-react';

import { STORE } from '../config/store';
import { useSEO } from '../hooks/useSEO';
import styles from './Contact.module.css';

const Contact = () => {
  useSEO({
    title: "Contact & Store Location Map",
    description: "Get in touch with India Vision Electronics Bangalore. View physical address, business hours, telephone numbers, and submit online enquiries."
  });

  const [searchParams] = useSearchParams();
  const interestParam = searchParams.get('interest');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: interestParam || 'General Enquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const interestOptions = [
    'General Enquiry',
    'LED Smart TVs',
    'Refrigerators',
    'Washing Machines',
    'Air Conditioners',
    'Microwave Ovens',
    'Water Purifiers',
    'Kitchen Appliances',
    'Bulk Corporate Order'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors as user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        interest: 'General Enquiry',
        message: ''
      });
    }, 1800);
  };

  return (
    <div className={styles.pageWrapper} style={{ position: 'relative' }}>
      
      {/* Layer 2: Volumetric Header Glow */}
      <div className="volumetric-glow glow-primary" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.12 }} />
      
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Contact Our Showroom</h1>
          <p className={styles.pageDesc}>
            Have questions about pricing, features, or exchange values? Visit our showroom or drop us a message online.
          </p>
        </div>
      </div>

      <section className={styles.sectionPadding}>
        <div className="container">
          <div className={styles.splitLayout}>
            
            {/* Left Side: Store Info & Map */}
            <div className={styles.infoColumn}>
              <div className={`${styles.infoBlock} glass-panel`}>
                <h2 className={styles.blockTitle}>Showroom Coordinates</h2>
                
                <div className={styles.contactDetails}>
                  <div className={styles.contactItem}>
                    <div className={styles.iconBox}><MapPin size={20} /></div>
                    <div>
                      <h4 className={styles.itemTitle}>Showroom Address</h4>
                      <p className={styles.itemText}>{STORE.address}</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.iconBox}><Phone size={20} /></div>
                    <div>
                      <h4 className={styles.itemTitle}>Call Support Desk</h4>
                      <p className={styles.itemText}>
                        <a href={`tel:${STORE.phoneRaw}`}>{STORE.phone}</a>
                      </p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.iconBox}><MessageSquare size={20} /></div>
                    <div>
                      <h4 className={styles.itemTitle}>WhatsApp Support</h4>
                      <p className={styles.itemText}>
                        <a href={STORE.whatsappUrl} target="_blank" rel="noopener noreferrer">Chat on {STORE.whatsapp}</a>
                      </p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.iconBox}><Mail size={20} /></div>
                    <div>
                      <h4 className={styles.itemTitle}>Email Contact</h4>
                      <p className={styles.itemText}>
                        <a href={`mailto:${STORE.email}`}>{STORE.email}</a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className={styles.hoursBlock}>
                  <div className={styles.hoursHeader}>
                    <Clock size={18} className={styles.clockIcon} />
                    <h3 className={styles.hoursTitle}>Showroom Timings</h3>
                  </div>
                  <div className={styles.hoursList}>
                    {STORE.businessHours.map((bh, idx) => (
                      <div key={idx} className={styles.hoursRow}>
                        <span className={styles.days}>{bh.days}</span>
                        <span className={styles.hours}>{bh.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Google Map Iframe */}
              <div className={`${styles.mapWrapper} glass-panel`}>
                <iframe 
                  title="India Vision Electronics Store Location Map"
                  src={STORE.googleMapsEmbedUrl} 
                  width="100%" 
                  height="320" 
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className={styles.formColumn}>
              <div className={`${styles.formBlock} glass-panel`}>
                {isSuccess ? (
                  <div className={styles.successContainer}>
                    <div className={styles.successIconWrapper}>
                      <CheckCircle size={48} className={styles.successIcon} />
                    </div>
                    <h3 className={styles.successHeadline}>Form Submitted Successfully!</h3>
                    <p className={styles.successText}>
                      We have received your enquiry. Our client service representatives will call you shortly.
                    </p>
                    <button 
                      type="button" 
                      onClick={() => setIsSuccess(false)}
                      className={`${styles.resetFormBtn} gradient-bg-primary`}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <h3 className={styles.formHeadline}>Submit Online Enquiry</h3>
                    <p className={styles.formSub}>
                      Have inquiries about stock availability, specific features, or finance eligibility? Message us below.
                    </p>

                    {/* Name */}
                    <div className={styles.formGroup}>
                      <label htmlFor="con-name" className={styles.label}>Full Name *</label>
                      <input 
                        type="text" 
                        id="con-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Priyan Nair"
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      />
                      {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                    </div>

                    {/* Phone */}
                    <div className={styles.formGroup}>
                      <label htmlFor="con-phone" className={styles.label}>Mobile Number *</label>
                      <input 
                        type="tel" 
                        id="con-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9876543210"
                        className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      />
                      {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                    </div>

                    {/* Email */}
                    <div className={styles.formGroup}>
                      <label htmlFor="con-email" className={styles.label}>Email Address *</label>
                      <input 
                        type="email" 
                        id="con-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. priya@example.com"
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      />
                      {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>

                    {/* Interest Dropdown */}
                    <div className={styles.formGroup}>
                      <label htmlFor="con-interest" className={styles.label}>Area of Interest *</label>
                      <select 
                        id="con-interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        {interestOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className={styles.formGroup}>
                      <label htmlFor="con-message" className={styles.label}>Details / Message</label>
                      <textarea 
                        id="con-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Type your detailed message here (optional)..."
                        rows="5"
                        className={styles.textarea}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`${styles.submitBtn} gradient-bg-primary`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className={styles.spinner} />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
