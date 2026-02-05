/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { CSSProperties, useEffect, useState, useRef } from 'react';

interface SecondPopupProps {
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
    background: 'rgba(0, 0, 0, 0.6)',
  },
  popup: {
    background: 'white',
    borderRadius: '20px',
    maxWidth: '400px',
    width: '100%',
    overflow: 'hidden',
    animation: 'pop 0.3s ease-out',
  },
  imageContainer: {
    width: '100%',
    height: '280px',
    background: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imagePlaceholder: {
    fontSize: '5rem',
  },
  content: {
    padding: '1.5rem',
    textAlign: 'center',
  },
  badge: {
    display: 'inline-block',
    padding: '0.4rem 1rem',
    background: '#fef3c7',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#92400e',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.05rem',
    color: '#374151',
    lineHeight: 1.7,
    marginBottom: '0.5rem',
  },
  highlight: {
    display: 'block',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#111827',
    marginTop: '0.75rem',
    marginBottom: '1.25rem',
  },
  emoji: {
    fontSize: '1.5rem',
  },
  button: {
    width: '100%',
    padding: '0.9rem',
    background: '#111827',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};

export default function SecondPopup({ isOpen, onClose }: SecondPopupProps) {
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // Play audio when popup opens
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

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s',
      }}
      onClick={onClose}
    >
      {/* Audio element */}
      <audio ref={audioRef} src="/audio/beautiful.mp3" />

      <div
        style={{
          ...styles.popup,
          transform: isOpen ? 'scale(1)' : 'scale(0.9)',
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.3s',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo */}
        <div style={styles.imageContainer}>
          {/* Replace with actual image */}
          {/* <img src="/images/photo2.jpg" alt="" style={styles.image} /> */}
          <span style={styles.imagePlaceholder}>📸</span>
        </div>

        <div style={styles.content}>
          <div style={styles.badge}>Dono chun liye? 😏</div>

          <p style={styles.message}>
            Arey madam,
            <br />
            laal phool ho ya neela phool,
            <br />
            short hair ho ya long hair...
          </p>

          <span style={styles.highlight}>
            Aap ladki beautiful kar gayi phool 🌸
          </span>

          <button
            style={styles.button}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#111827';
            }}
          >
            Haan haan pata hai 😎
          </button>
        </div>
      </div>
    </div>
  );
}