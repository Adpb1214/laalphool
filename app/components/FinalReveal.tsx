/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState, CSSProperties } from 'react';

interface FinalRevealProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles: { [key: string]: CSSProperties } = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    transition: 'opacity 0.5s',
  },
  popup: {
    position: 'relative',
    background: 'linear-gradient(135deg, #fff1f2, #fce7f3, #fff1f2)',
    borderRadius: '30px',
    boxShadow: '0 30px 80px rgba(190, 18, 60, 0.3)',
    maxWidth: '500px',
    width: '100%',
    overflow: 'hidden',
    animation: 'fadeIn 0.5s ease-out',
  },
  content: {
    padding: '2.5rem',
    textAlign: 'center',
  },
  topEmojis: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  mainTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#be123c',
    marginBottom: '1.5rem',
    lineHeight: 1.4,
  },
  imageContainer: {
    position: 'relative',
    width: '200px',
    height: '200px',
    margin: '0 auto 1.5rem',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '5px solid white',
    boxShadow: '0 15px 40px rgba(190, 18, 60, 0.25)',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #fecdd3, #fce7f3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imageEmoji: {
    fontSize: '4rem',
    marginBottom: '0.5rem',
  },
  imageText: {
    fontSize: '0.9rem',
    color: '#9f1239',
  },
  message: {
    fontSize: '1.3rem',
    color: '#881337',
    lineHeight: 1.6,
    marginBottom: '1rem',
  },
  subMessage: {
    fontSize: '1.1rem',
    color: '#9f1239',
    fontStyle: 'italic',
    marginBottom: '2rem',
  },
  heartsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '2rem',
    fontSize: '1.5rem',
  },
  closeButton: {
    padding: '1rem 2.5rem',
    background: 'linear-gradient(135deg, #be123c, #9f1239)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(190, 18, 60, 0.3)',
    transition: 'all 0.3s',
  },
  footer: {
    padding: '1rem',
    background: 'rgba(190, 18, 60, 0.05)',
    borderTop: '1px solid rgba(190, 18, 60, 0.1)',
  },
  footerText: {
    fontSize: '0.85rem',
    color: '#9f1239',
  },
};

export default function FinalReveal({ isOpen, onClose }: FinalRevealProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div style={{
      ...styles.overlay,
      pointerEvents: isOpen ? 'auto' : 'none',
    }}>
      <div
        style={{
          ...styles.backdrop,
          opacity: isOpen ? 1 : 0,
        }}
        onClick={onClose}
      />

      <div
        style={{
          ...styles.popup,
          transform: isOpen ? 'scale(1)' : 'scale(0.9)',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div style={styles.content}>
          <div style={styles.topEmojis}>🎉✨🌹✨🎉</div>
          
          <h2 style={styles.mainTitle}>
            Dekha? Dono mein same cheez likhi thi! 😂
          </h2>

          {/* Image Container - Replace with actual image */}
          <div style={styles.imageContainer}>
            {/* <img 
              src="/images/your-image.jpg" 
              alt="Special" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            /> */}
            <div style={styles.imagePlaceholder}>
              <span style={styles.imageEmoji}>💖</span>
              <span style={styles.imageText}>Tumhari Photo</span>
            </div>
          </div>

          <p style={styles.message}>
            Koi bhi gulaab choose karti...<br />
            <strong>Result ek hi tha:</strong>
          </p>

          <p style={{
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#be123c',
            marginBottom: '1rem',
          }}>
            Tum Bahut Khoobsurat Ho! 🥰
          </p>

          <p style={styles.subMessage}>
            Haan haan, dhoka hua hai tumhare saath 😜<br />
            But pyaar se! 💕
          </p>

          <div style={styles.heartsRow}>
            {'❤️🧡💛💚💙💜'.split('').filter(c => c.trim()).map((heart, i) => (
              <span 
                key={i}
                style={{
                  animation: 'float 2s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {heart}
              </span>
            ))}
          </div>

          <button
            style={styles.closeButton}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(190, 18, 60, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(190, 18, 60, 0.3)';
            }}
          >
            🌹 Shukriya! 🌹
          </button>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Created by <strong>the wrath of god</strong>™
          </p>
        </div>
      </div>
    </div>
  );
}