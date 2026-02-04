/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { Heart, Sparkles, Trophy } from 'lucide-react';
import { useEffect, useState, CSSProperties } from 'react';

interface FinalPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles: { [key: string]: CSSProperties } = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    transition: 'opacity 0.5s',
  },
  popup: {
    position: 'relative',
    background: 'linear-gradient(to bottom right, #ffe4e6, #fdf2f8, #fff1f2)',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    maxWidth: '42rem',
    width: '100%',
    overflow: 'hidden',
    transition: 'all 0.5s',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '16rem',
    height: '16rem',
    background: 'linear-gradient(to bottom right, rgba(249, 168, 212, 0.2), rgba(251, 113, 133, 0.2))',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '24rem',
    height: '24rem',
    background: 'linear-gradient(to bottom right, rgba(147, 197, 253, 0.2), rgba(165, 180, 252, 0.2))',
    borderRadius: '50%',
    transform: 'translate(33%, 33%)',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    padding: '2rem',
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  trophyContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '5rem',
    height: '5rem',
    background: 'linear-gradient(to bottom right, #facc15, #f97316)',
    borderRadius: '50%',
    marginBottom: '1rem',
    animation: 'pulse-glow 2s ease-in-out infinite',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #db2777, #e11d48)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem',
    fontFamily: "'Dancing Script', cursive",
  },
  subtitle: {
    color: '#4b5563',
  },
  mainMessageSection: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  messageWrapper: {
    display: 'inline-block',
    background: 'linear-gradient(to right, #f43f5e, #ec4899)',
    padding: '4px',
    borderRadius: '1rem',
    marginBottom: '1.5rem',
  },
  messageInner: {
    background: 'white',
    borderRadius: '0.75rem',
    padding: '1.5rem',
  },
  mainMessage: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  mainMessageItalic: {
    color: '#4b5563',
    fontStyle: 'italic',
  },
  iconsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  iconCircle: {
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSection: {
    marginBottom: '2rem',
  },
  imageContainer: {
    position: 'relative',
    width: '16rem',
    height: '16rem',
    margin: '0 auto',
  },
  imageWrapper: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '8px solid white',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    zIndex: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom right, #fbcfe8, #fecdd3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderInner: {
    textAlign: 'center',
  },
  imageEmoji: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  imageText: {
    color: '#6b7280',
  },
  glowEffect: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    background: 'linear-gradient(to right, #f472b6, #fb7185)',
    filter: 'blur(24px)',
    opacity: 0.5,
    animation: 'pulse 2s ease-in-out infinite',
  },
  closeSection: {
    textAlign: 'center',
  },
  closeButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    background: 'linear-gradient(to right, #f43f5e, #ec4899)',
    color: 'white',
    fontWeight: 600,
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s',
  },
};

export default function FinalPopup({ isOpen, onClose }: FinalPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hearts, setHearts] = useState<Array<{top: string, left: string, delay: string}>>([]);

  useEffect(() => {
    const newHearts = [...Array(8)].map((_, i) => ({
      top: `${Math.sin(i * 45 * Math.PI / 180) * 40 + 50}%`,
      left: `${Math.cos(i * 45 * Math.PI / 180) * 40 + 50}%`,
      delay: `${i * 0.5}s`,
    }));
    setHearts(newHearts);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div style={styles.overlay}>
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
          transform: isOpen ? 'scale(1)' : 'scale(0.95)',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div style={styles.decorativeCircle1} />
        <div style={styles.decorativeCircle2} />

        <div style={styles.content}>
          <div style={styles.headerSection}>
            <div style={styles.trophyContainer}>
              <Trophy style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} />
            </div>

            <h2 style={styles.title}>
              🎉 Ultimate Surprise Unlocked! 🎉
            </h2>

            <p style={styles.subtitle}>
              You&apos;ve discovered both beautiful flowers!
            </p>
          </div>

          <div style={styles.mainMessageSection}>
            <div style={styles.messageWrapper}>
              <div style={styles.messageInner}>
                <h3 style={styles.mainMessage}>
                  Ab toh you are beautifullll! 💖
                </h3>
                <p style={styles.mainMessageItalic}>
                  (Then and now, always beautiful!)
                </p>
              </div>
            </div>

            <div style={styles.iconsRow}>
              <div style={{ ...styles.iconCircle, background: 'linear-gradient(to right, #fb7185, #f472b6)' }}>
                <span style={{ fontSize: '1.5rem' }}>🌹</span>
              </div>
              <div style={{ ...styles.iconCircle, background: 'linear-gradient(to right, #60a5fa, #818cf8)' }}>
                <span style={{ fontSize: '1.5rem' }}>💠</span>
              </div>
              <div style={{ ...styles.iconCircle, background: 'linear-gradient(to right, #facc15, #f97316)' }}>
                <span style={{ fontSize: '1.5rem' }}>💖</span>
              </div>
            </div>
          </div>

          <div style={styles.imageSection}>
            <div style={styles.imageContainer}>
              <div style={styles.imageWrapper}>
                <div style={styles.imagePlaceholder}>
                  <div style={styles.imagePlaceholderInner}>
                    <div style={styles.imageEmoji}>📸</div>
                    <p style={styles.imageText}>Your beautiful photo</p>
                  </div>
                </div>
              </div>

              <div style={styles.glowEffect} />

              {hearts.map((heart, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: heart.top,
                    left: heart.left,
                    animation: 'float 3s ease-in-out infinite',
                    animationDelay: heart.delay,
                  }}
                >
                  <Heart style={{ width: '1.5rem', height: '1.5rem', color: '#fb7185', fill: '#fb7185' }} />
                </div>
              ))}
            </div>
          </div>

          <div style={styles.closeSection}>
            <button
              onClick={onClose}
              style={styles.closeButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <Sparkles style={{ width: '1.25rem', height: '1.25rem' }} />
              <span style={{ fontSize: '1.125rem' }}>Close & Remember This Moment ✨</span>
              <Sparkles style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}