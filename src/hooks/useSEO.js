import { useEffect } from 'react';
import { STORE } from '../config/store';

export const useSEO = ({ title, description, ogType = "website", ogImage, canonicalUrl }) => {
  useEffect(() => {
    // 1. Set Document Title
    const fullTitle = `${title} | ${STORE.name}`;
    document.title = fullTitle;

    // 2. Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || STORE.tagline;

    // 3. Set Open Graph (OG) Tags
    const setOgTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setOgTag('og:title', fullTitle);
    setOgTag('og:description', description || STORE.tagline);
    setOgTag('og:type', ogType);
    setOgTag('og:url', canonicalUrl || window.location.href);
    setOgTag('og:image', ogImage || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop');

    // 4. Set Twitter Card Tags
    const setTwitterTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setTwitterTag('twitter:card', 'summary_large_image');
    setTwitterTag('twitter:title', fullTitle);
    setTwitterTag('twitter:description', description || STORE.tagline);
    setTwitterTag('twitter:image', ogImage || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop');

    // 5. Inject Local Business Schema Markup
    let schemaScript = document.getElementById('jsonld-localbusiness');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'jsonld-localbusiness';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "ElectronicsStore",
      "name": STORE.name,
      "image": ogImage || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
      "@id": window.location.origin,
      "url": window.location.origin,
      "telephone": STORE.phoneRaw,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Premium Tech Plaza, Mahatma Gandhi Road",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "postalCode": "560001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 12.9766,
        "longitude": 77.6074
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "21:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "11:00",
          "closes": "20:00"
        }
      ],
      "sameAs": [
        STORE.socials.facebook,
        STORE.socials.instagram,
        STORE.socials.twitter,
        STORE.socials.youtube
      ]
    };

    schemaScript.innerHTML = JSON.stringify(businessSchema);

    // Cleanup logic (optional - we keep it persistent across page navigations)
  }, [title, description, ogType, ogImage, canonicalUrl]);
};
