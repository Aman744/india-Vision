import React from 'react';

export const BrandLogo = ({ id, className = "" }) => {
  const base = import.meta.env.BASE_URL || "/";

  switch (id) {
    case 'samsung':
      return <img src={`${base}logos/samsung.png`} alt="Samsung" className={className} style={{ objectFit: 'contain' }} />;
    case 'lg':
      return <img src={`${base}logos/lg.png`} alt="LG" className={className} style={{ objectFit: 'contain' }} />;
    case 'sony':
      return <img src={`${base}logos/Sony.jpg`} alt="Sony" className={className} style={{ objectFit: 'contain' }} />;
    case 'whirlpool':
      return <img src={`${base}logos/whirlpool.svg`} alt="Whirlpool" className={className} style={{ objectFit: 'contain' }} />;
    case 'haier':
      return <img src={`${base}logos/haier.svg`} alt="Haier" className={className} style={{ objectFit: 'contain' }} />;
    case 'panasonic':
      return <img src={`${base}logos/panasonic.png`} alt="Panasonic" className={className} style={{ objectFit: 'contain' }} />;
    case 'voltas':
      return <img src={`${base}logos/voltas.png`} alt="Voltas" className={className} style={{ objectFit: 'contain' }} />;
    case 'blue-star':
      return (
        <div style={{
          width: '100%', height: '100%',
          background: '#1A4CA1',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '14px 20px',
        }}>
          <img src={`${base}logos/blue-star.png`} alt="Blue Star"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      );
    case 'ifb':
      return <img src={`${base}logos/ifb.png`} alt="IFB" className={className} style={{ objectFit: 'contain' }} />;
    default:
      return null;
  }
};
