'use client';

import { X, Heart, Sparkles } from 'lucide-react';
import { useEffect, useState, CSSProperties } from 'react';

interface MessagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'laal' | 'neela';
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
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    transition: 'opacity 0.3s',
  },
  popup: {
    position: 'relative',
    background: 'white',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    maxWidth: '28rem',
    width: '100%',
    overflow: 'hidden',
    transition: 'all 0.3s',
  },
  header: {
    position: 'relative',
    height: '10rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent)',
  },
  sparkleIcon: {
    position: 'absolute',
    top: '1rem',
    width: '1.5rem',
    height: '1.5rem',
    color: '#fde047',
    animation: 'pulse 2s ease-in-out infinite',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  heartIcon: {
    animation: 'heartbeat 1.5s ease-in-out infinite',
  },
  content: {
    padding: '1.5rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  message: {
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  imageContainer: {
    marginBottom: '1.5rem',
  },
  imageWrapper: {
    position: 'relative',
    width: '12rem',
    height: '12rem',
    margin: '0 auto',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '4px solid #fecdd3',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  imagePlaceholder: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom right, #ffe4e6, #fce7f3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderInner: {
    textAlign: 'center',
  },
  imageEmoji: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  imageText: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  heartsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  footer: {
    padding: '1rem 1.5rem',
    background: 'linear-gradient(to right, #fff1f2, #fce7f3)',
    borderTop: '1px solid #fecdd3',
  },
  continueButton: {
    width: '100%',
    padding: '0.75rem',
    background: 'linear-gradient(to right, #f43f5e, #ec4899)',
    color: 'white',
    fontWeight: 600,
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
};

export default function MessagePopup({ isOpen, onClose, type }: MessagePopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => setIsVisible(true));
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const messages = {
    laal: {
      title: 'You are beautifulll! 💖',
      message: 'Like a perfect red rose that blooms with grace and elegance.',
      bgGradient: 'linear-gradient(to right, #fb7185, #ec4899)',
      textColor: '#be123c',
    },
    neela: {
      title: 'Ladki beautiful kar gayi chul! ✨',
      message: 'Then and now, always spreading beauty and joy everywhere.',
      bgGradient: 'linear-gradient(to right, #60a5fa, #6366f1)',
      textColor: '#1d4ed8',
    },
  };

  const current = messages[type];

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
        <div style={{ ...styles.header, background: current.bgGradient }}>
          <div style={styles.headerOverlay} />

          <Sparkles style={{ ...styles.sparkleIcon, left: '1rem' }} />
          <Sparkles style={{ ...styles.sparkleIcon, right: '3rem' }} />

          <button
            onClick={onClose}
            style={styles.closeButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <X style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
          </button>

          <div style={styles.heartIcon}>
            <Heart style={{ width: '4rem', height: '4rem', color: 'white', fill: 'white' }} />
          </div>
        </div>

        <div style={styles.content}>
          <h3 style={{ ...styles.title, color: current.textColor }}>
            {current.title}
          </h3>

          <p style={styles.message}>{current.message}</p>

          <div style={styles.imageContainer}>
            <div style={styles.imageWrapper}>
              <div style={styles.imagePlaceholder}>
                <div style={styles.imagePlaceholderInner}>
                  <div style={styles.imageEmoji}>📸</div>
                  <p style={styles.imageText}>Your beautiful image</p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.heartsRow}>
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  color: '#fb7185',
                  fill: '#fb7185',
                  animation: 'pulse 2s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div style={styles.footer}>
          <button
            onClick={onClose}
            style={styles.continueButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            💖 Continue 💖
          </button>
        </div>
      </div>
    </div>
  );
}