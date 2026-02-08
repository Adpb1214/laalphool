/* eslint-disable prefer-const */
'use client';

import { CSSProperties, useState } from 'react';

interface FlowerSelectProps {
  onSelect: (flower: 'laal' | 'neela') => void;
  selectedFlower: 'laal' | 'neela' | null;
  highlightOther: boolean;
  disabled: boolean;
}

const FlowerSelect = ({
  onSelect,
  selectedFlower,
  highlightOther,
  disabled,
}: FlowerSelectProps) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 768);
    });
  }

  // Responsive styles
  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: isMobile ? '1.5rem 1rem' : '2.5rem 2rem',
      background: 'linear-gradient(145deg, #fef3f3 0%, #fff9f9 100%)',
      borderRadius: '20px',
      border: '2px solid rgba(255, 182, 193, 0.3)',
      boxShadow: '0 10px 30px rgba(255, 182, 193, 0.1)',
      maxWidth: '700px',
      margin: '0 auto',
    },
    title: {
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      color: '#c71585',
      marginBottom: '0.5rem',
      fontWeight: 800,
      textAlign: 'center',
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    },
    subtitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      color: '#666',
      marginBottom: '2rem',
      textAlign: 'center',
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
      fontStyle: 'italic',
    },
    flowersRow: {
      display: 'flex',
      gap: isMobile ? '1.5rem' : '3rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    flowerCard: {
      width: isMobile ? '140px' : '180px',
      padding: isMobile ? '1.2rem' : '1.5rem',
      background: 'linear-gradient(145deg, #fff 0%, #fdfdfd 100%)',
      borderRadius: '16px',
      border: '3px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    },
    imageContainer: {
      width: isMobile ? '100px' : '120px',
      height: isMobile ? '100px' : '120px',
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: isMobile ? '0.8rem' : '1rem',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #f1f5f9',
    },
    flowerImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
    },
    label: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 700,
      color: '#374151',
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
      marginBottom: '0.5rem',
    },
    highlightBadge: {
      marginTop: '0.8rem',
      padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      borderRadius: '20px',
      fontSize: isMobile ? '0.75rem' : '0.85rem',
      color: '#92400e',
      fontWeight: 600,
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
      border: '1px solid #fbbf24',
      boxShadow: '0 3px 8px rgba(251, 191, 36, 0.2)',
    },
    selectedBadge: {
      marginTop: '0.6rem',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      color: '#059669',
      fontWeight: 600,
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
      background: 'rgba(16, 185, 129, 0.1)',
      padding: '0.3rem 0.8rem',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
  };

  const getCardStyle = (flower: 'laal' | 'neela'): CSSProperties => {
    const isSelected = selectedFlower === flower;
    const isHighlighted = highlightOther && selectedFlower !== flower;

    let borderColor = '#e5e7eb';
    let boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
    let transform = 'scale(1)';
    let animation = 'none';

    if (isSelected) {
      borderColor = flower === 'laal' ? '#dc2626' : '#2563eb';
      boxShadow = flower === 'laal' 
        ? '0 10px 25px rgba(220, 38, 38, 0.15), 0 0 0 2px rgba(220, 38, 38, 0.2)' 
        : '0 10px 25px rgba(37, 99, 235, 0.15), 0 0 0 2px rgba(37, 99, 235, 0.2)';
    } else if (isHighlighted) {
      borderColor = flower === 'laal' ? '#ef4444' : '#3b82f6';
      boxShadow = flower === 'laal' 
        ? '0 8px 20px rgba(239, 68, 68, 0.2), 0 0 0 2px rgba(239, 68, 68, 0.1)' 
        : '0 8px 20px rgba(59, 130, 246, 0.2), 0 0 0 2px rgba(59, 130, 246, 0.1)';
      animation = 'highlight-pulse 1.5s ease-in-out infinite';
    }

    return {
      ...styles.flowerCard,
      border: `3px solid ${borderColor}`,
      boxShadow,
      transform,
      animation,
      opacity: disabled && !isHighlighted && !isSelected ? 0.6 : 1,
      cursor: disabled && !isHighlighted ? 'default' : 'pointer',
      background: isSelected 
        ? (flower === 'laal' 
            ? 'linear-gradient(145deg, #fff5f5 0%, #ffe5e5 100%)' 
            : 'linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)')
        : styles.flowerCard.background,
    };
  };

  const handleClick = (flower: 'laal' | 'neela') => {
    if (disabled && !(highlightOther && selectedFlower !== flower)) return;
    onSelect(flower);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>একটি ফুল বেছে নাও 🌸</h1>
      <p style={styles.subtitle}>শুধু ক্লিক কর, কিছুই হবে না... 👀</p>

      {/* Custom animations */}
      <style>{`
        @keyframes highlight-pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 8px 20px rgba(239, 68, 68, 0.2), 0 0 0 2px rgba(239, 68, 68, 0.1);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 12px 30px rgba(239, 68, 68, 0.3), 0 0 0 2px rgba(239, 68, 68, 0.2);
          }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          75% { transform: rotate(-2deg); }
        }
        
        .flower-image:hover {
          transform: scale(1.1);
        }
        
        .selected-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        @keyframes glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
      `}</style>

      <div style={styles.flowersRow}>
        {/* লাল ফুল (Red Rose) */}
        <div
          style={getCardStyle('laal')}
          onClick={() => handleClick('laal')}
          onMouseEnter={(e) => {
            if (!disabled || (highlightOther && selectedFlower !== 'laal')) {
              e.currentTarget.style.transform = 'scale(1.05)';
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = selectedFlower === 'laal' ? 'scale(1.02)' : 'scale(1)';
            const img = e.currentTarget.querySelector('img');
            if (img) img.style.transform = 'scale(1)';
          }}
        >
          <div style={styles.imageContainer}>
            <img 
              src="/red-rose.jpg" 
              alt="লাল ফুল" 
              style={styles.flowerImage}
              className="flower-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: ${isMobile ? '3rem' : '4rem'};
                  color: #dc2626;
                  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
                `;
                placeholder.innerHTML = '🌺';
                target.parentNode?.insertBefore(placeholder, target);
              }}
            />
          </div>
          <span style={styles.label}>লাল ফুল</span>

          {selectedFlower === 'laal' && (
            <div style={styles.selectedBadge}>
              <span style={{ fontSize: '1.2rem' }}>✓</span> আচ্ছা লালে লালশ্বরী?
            </div>
          )}

          {highlightOther && selectedFlower === 'neela' && (
            <div style={styles.highlightBadge}>
              👆 এটাও চেষ্টা করে দেখ না যদিইইইইই আরও সুন্দরররর থাকে কিছু 🤔
            </div>
          )}
        </div>

        {/* নীল ফুল (Blue Rose) */}
        <div
          style={getCardStyle('neela')}
          onClick={() => handleClick('neela')}
          onMouseEnter={(e) => {
            if (!disabled || (highlightOther && selectedFlower !== 'neela')) {
              e.currentTarget.style.transform = 'scale(1.05)';
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = selectedFlower === 'neela' ? 'scale(1.02)' : 'scale(1)';
            const img = e.currentTarget.querySelector('img');
            if (img) img.style.transform = 'scale(1)';
          }}
        >
          <div style={styles.imageContainer}>
            <img 
              src="/blue-rose.jpg" 
              alt="নীল ফুল" 
              style={styles.flowerImage}
              className="flower-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: ${isMobile ? '3rem' : '4rem'};
                  color: #2563eb;
                  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
                `;
                placeholder.innerHTML = '🪻';
                target.parentNode?.insertBefore(placeholder, target);
              }}
            />
          </div>
          <span style={styles.label}>নীল ফুল</span>

          {selectedFlower === 'neela' && (
            <div style={styles.selectedBadge}>
              <span style={{ fontSize: '1.2rem' }}>✓</span> আচ্ছা তাহলে নীল রং ছিল ভীষণ প্রিয়?
            </div>
          )}

          {highlightOther && selectedFlower === 'laal' && (
            <div style={styles.highlightBadge}>
              👆 লালে লালশ্বরী Choose করলে কি হতো দেখবিনা? 🤔
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowerSelect;