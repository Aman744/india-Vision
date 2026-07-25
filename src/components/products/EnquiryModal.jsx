import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import styles from './EnquiryModal.module.css';

const EnquiryModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    productName: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Set default product interest when product changes
  useEffect(() => {
    if (product) {
      setFormData(prev => ({
        ...prev,
        productName: `${product.brand} - ${product.name}`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        productName: ''
      }));
    }
    // Reset success/submitting states when modal reopens
    if (isOpen) {
      setIsSuccess(false);
      setIsSubmitting(false);
      setErrors({});
    }
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field errors as user types
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
    
    // 10-digit Indian phone regex
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form fields
      setFormData({
        name: '',
        phone: '',
        email: '',
        productName: '',
        message: ''
      });
    }, 1800);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isSuccess ? "Enquiry Confirmed" : "Send Product Enquiry"}
    >
      {isSuccess ? (
        <div className={styles.successContainer}>
          <div className={styles.successIconWrapper}>
            <CheckCircle size={48} className={styles.successIcon} />
          </div>
          <h3 className={styles.successHeadline}>Enquiry Received!</h3>
          <p className={styles.successText}>
            Thank you for reaching out to us. A store representative from <strong>India Vision Electronics</strong> will review your request and contact you via call or email within 2 hours.
          </p>
          <button 
            type="button" 
            className={`${styles.closeBtn} gradient-bg-primary`}
            onClick={onClose}
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <p className={styles.formInstruction}>
            Fill out the form below. We will send you our best price quote, finance EMI options, and delivery timelines.
          </p>

          {/* Name Field */}
          <div className={styles.formGroup}>
            <label htmlFor="enq-name" className={styles.label}>Full Name *</label>
            <input 
              type="text" 
              id="enq-name"
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            />
            {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
          </div>

          {/* Phone Field */}
          <div className={styles.formGroup}>
            <label htmlFor="enq-phone" className={styles.label}>Mobile Number *</label>
            <input 
              type="tel" 
              id="enq-phone"
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            />
            {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label htmlFor="enq-email" className={styles.label}>Email Address *</label>
            <input 
              type="email" 
              id="enq-email"
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. rahul@example.com"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            />
            {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
          </div>

          {/* Product Interested In */}
          <div className={styles.formGroup}>
            <label htmlFor="enq-product" className={styles.label}>Product Interested In *</label>
            <input 
              type="text" 
              id="enq-product"
              name="productName" 
              value={formData.productName}
              onChange={handleChange}
              placeholder="e.g. Samsung Neo QLED TV"
              className={`${styles.input} ${errors.productName ? styles.inputError : ''}`}
            />
            {errors.productName && <span className={styles.errorMsg}>{errors.productName}</span>}
          </div>

          {/* Message */}
          <div className={styles.formGroup}>
            <label htmlFor="enq-message" className={styles.label}>Message / Queries (Optional)</label>
            <textarea 
              id="enq-message"
              name="message" 
              value={formData.message}
              onChange={handleChange}
              placeholder="Mention details like: required sizes, exchange requests, or custom installation queries."
              rows="4"
              className={styles.textarea}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`${styles.submitBtn} gradient-bg-primary`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className={styles.spinner} />
                <span>Submitting Request...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Submit Product Enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </Modal>
  );
};

export default EnquiryModal;
