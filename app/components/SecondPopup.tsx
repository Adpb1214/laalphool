/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { CSSProperties, useEffect, useState, useRef } from 'react';

interface SecondPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SecondPopup = ({ isOpen, onClose }: SecondPopupProps) => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Audio autoplay might be blocked
        });
      }
    } else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!visible) return null;

  // Responsive styles
  const styles: { [key: string]: CSSProperties } = {
    overlay: {
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '0.5rem' : '1rem',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(4px)',
    },
    popup: {
      background: 'linear-gradient(145deg, #fff9f3 0%, #fff 100%)',
      borderRadius: isMobile ? '16px' : '24px',
      maxWidth: isMobile ? '95vw' : '500px', // WIDER: 500px
      width: '100%',
      overflow: 'hidden',
      animation: 'pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      border: '2px solid rgba(255, 105, 180, 0.15)',
      boxShadow: '0 25px 60px rgba(255, 105, 180, 0.15), 0 0 0 1px rgba(255, 105, 180, 0.05)',
    },
    imageContainer: {
      width: '100%',
      height: isMobile ? '280px' : '380px', // MUCH TALLER: 380px (was 300px)
      background: 'linear-gradient(135deg, #ffe8f0 0%, #fff0f7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      borderBottom: '3px dashed rgba(255, 105, 180, 0.25)',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'contain', // CHANGED: 'cover' to 'contain' to show full image
      objectPosition: 'center',
      transition: 'transform 0.5s ease',
    },
    imageHover: {
      transform: 'scale(1.05)',
    },
    imagePlaceholder: {
      fontSize: isMobile ? '4rem' : '5rem',
      color: '#ff69b4',
      opacity: 0.3,
    },
    content: {
      padding: isMobile ? '1.5rem' : '2rem', // More padding
      textAlign: 'center',
    },
    badge: {
      display: 'inline-block',
      padding: isMobile ? '0.4rem 1rem' : '0.6rem 1.5rem',
      background: 'linear-gradient(135deg, #ffd6e7 0%, #ffb3d9 100%)',
      borderRadius: '50px',
      fontSize: isMobile ? '0.85rem' : '1rem',
      fontWeight: 800,
      color: '#c71585',
      marginBottom: isMobile ? '0.8rem' : '1.2rem',
      border: '2px solid rgba(255, 105, 180, 0.3)',
      boxShadow: '0 5px 15px rgba(255, 105, 180, 0.15)',
    },
    message: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      color: '#555',
      lineHeight: isMobile ? 1.6 : 1.7,
      marginBottom: isMobile ? '0.5rem' : '0.6rem',
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
    },
    bengaliText: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      color: '#333',
      lineHeight: 1.8,
      margin: isMobile ? '0.6rem 0' : '0.8rem 0',
      fontWeight: 700,
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
    },
    highlight: {
      display: 'block',
      fontSize: isMobile ? '1.2rem' : '1.5rem',
      fontWeight: 900,
      color: '#ff1493',
      marginTop: isMobile ? '0.6rem' : '0.8rem',
      marginBottom: isMobile ? '1.2rem' : '1.5rem',
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
      textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
      animation: 'textGlow 2s infinite',
      lineHeight: 1.4,
    },
    emoji: {
      fontSize: isMobile ? '1.4rem' : '1.8rem',
      display: 'inline-block',
      margin: '0 3px',
    },
    button: {
      width: '100%',
      padding: isMobile ? '0.9rem' : '1.1rem',
      background: 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '15px',
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 800,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(255, 105, 180, 0.3)',
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
      letterSpacing: '0.5px',
    },
    buttonHover: {
      background: 'linear-gradient(135deg, #ff1493 0%, #c71585 100%)',
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 30px rgba(255, 105, 180, 0.4)',
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      width: isMobile ? '32px' : '40px',
      height: isMobile ? '32px' : '40px',
      background: 'rgba(255, 255, 255, 0.95)',
      border: 'none',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '1.3rem',
      color: '#ff1493',
      boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
      zIndex: 10,
      transition: 'all 0.3s ease',
      fontWeight: 'bold',
    },
  };

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
      onClick={onClose}
    >
      {/* Audio element */}
      <audio ref={audioRef} src="/audio/beautiful.mp3" loop />

      {/* Custom CSS animations */}
      <style>{`
        @keyframes pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          70% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes textGlow {
          0%, 100% {
            text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
          }
          50% {
            text-shadow: 0 0 15px rgba(255, 20, 147, 0.4), 1px 1px 3px rgba(0,0,0,0.1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        
        .popup-image:hover {
          transform: scale(1.06);
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .heartbeat {
          animation: heartbeat 1s infinite;
          display: inline-block;
        }
      `}</style>

      <div
        style={{
          ...styles.popup,
          transform: isOpen ? 'scale(1)' : 'scale(0.9)',
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          style={styles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ff1493';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.style.color = '#ff1493';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Photo - MUCH BIGGER and shows full image */}
        <div style={styles.imageContainer}>
          <img 
            src="/img2.jpeg" 
            alt="Beautiful moment" 
            style={styles.image}
            className="popup-image"
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
                font-size: ${isMobile ? '4rem' : '5rem'};
                color: #ff69b4;
                background: linear-gradient(135deg, #ffe8f0 0%, #fff0f7 100%);
              `;
              placeholder.innerHTML = '🌸💖';
              target.parentNode?.insertBefore(placeholder, target);
            }}
          />
        </div>

        <div style={styles.content}>
          <div style={styles.badge}>
            দুটোই পছন্দ করলে? 😏
          </div>

          <p style={styles.message}>
            Arey ম্যাডাম, 
            <br />
            লাল ফুল হোক বা নীল ফুল,
            <br />
            শর্ট হেয়ার হোক বা লং হেয়ার...
          </p>

          <p style={styles.bengaliText}>
            তুমি শর্ট হেয়ারেও সবচেয়ে বিউটিফুল 
            <span style={styles.emoji} className="heartbeat">🌸</span>
            <br />
            লং হেয়ারেও সবচেয়ে বিউটিফুল
            <span style={styles.emoji} className="heartbeat">💖</span>
          </p>

          <span style={styles.highlight}>
          তোর হাসিই তো সবচেয়ে glowing আর beautiful 😍
          </span>

          <button
            style={styles.button}
            onClick={onClose}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, styles.buttonHover);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 105, 180, 0.3)';
            }}
            onTouchStart={(e) => {
              Object.assign(e.currentTarget.style, styles.buttonHover);
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 105, 180, 0.3)';
            }}
          >
            হাঁ হাঁ, জানি জানি! 😎
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondPopup;