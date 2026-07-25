import React from 'react';

export const BrandLogo = ({ id, className = "" }) => {
  switch (id) {
    case 'samsung':
      return <img src="/logos/samsung.png" alt="Samsung" className={className} style={{ objectFit: 'contain' }} />;
    case 'lg':
      return <img src="/logos/lg.png" alt="LG" className={className} style={{ objectFit: 'contain' }} />;
    case 'sony':
      return <img src="/logos/Sony.jpg" alt="Sony" className={className} style={{ objectFit: 'contain' }} />;
    case 'whirlpool':
      return <img src="/logos/whirlpool.svg" alt="Whirlpool" className={className} style={{ objectFit: 'contain' }} />;
    case 'haier':
      return <img src="/logos/haier.svg" alt="Haier" className={className} style={{ objectFit: 'contain' }} />;
    case 'panasonic':
      return <img src="/logos/panasonic.png" alt="Panasonic" className={className} style={{ objectFit: 'contain' }} />;
    case 'voltas':
      return <img src="/logos/voltas.png" alt="Voltas" className={className} style={{ objectFit: 'contain' }} />;
    case 'blue-star':
      return (
        <div style={{
          width: '100%', height: '100%',
          background: '#1A4CA1',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '14px 20px',
        }}>
          <img src="/logos/blue-star.png" alt="Blue Star"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      );
    case 'ifb':
      return <img src="/logos/ifb.png" alt="IFB" className={className} style={{ objectFit: 'contain' }} />;
    default:
      return null;
  }
};
