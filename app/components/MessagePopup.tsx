/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState, CSSProperties } from 'react';

interface MessagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  roseType: 'laal' | 'gulabi' | null;
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
    background: 'rgba(0, 0, 0, 0.5)',
    transition: 'opacity 0.3s',
  },
  popup: {
    position: 'relative',
    background: 'white',
    borderRadius: '25px',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
    maxWidth: '400px',
    width: '100%',
    overflow: 'hidden',
    animation: 'fadeIn 0.3s ease-out',
  },
  header: {
    padding: '2rem',
    textAlign: 'center',
  },
  emoji: {
    fontSize: '4rem',
    marginBottom: '1rem',
    display: 'block',
    animation: 'float 2s ease-in-out infinite',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
  },
  message: {
    fontSize: '1.1rem',
    lineHeight: 1.6,
    color: '#4b5563',
    marginBottom: '1.5rem',
  },
  highlight: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    padding: '0.25rem 0.75rem',
    borderRadius: '10px',
    fontWeight: 600,
    color: '#92400e',
  },
  button: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #be123c, #9f1239)',
    color: 'white',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
};

export default function MessagePopup({ isOpen, onClose, roseType }: MessagePopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const messages = {
    laal: {
      emoji: '🌹',
      title: 'Waah! Laal Gulaab! ❤️',
      message: (
        <>
          Tumne laal gulaab choose kiya, matlab tumhare dil mein{' '}
          <span style={styles.highlight}>sachcha pyaar</span> hai! 
          <br /><br />
          Par ruko... doosre gulaab mein bhi kuch special hai... 😏
        </>
      ),
      gradient: 'linear-gradient(135deg, #ffe4e6, #fecdd3)',
      titleColor: '#be123c',
    },
    gulabi: {
      emoji: '🌸',
      title: 'Aww! Gulabi Gulaab! 💕',
      message: (
        <>
          Tumne gulabi gulaab choose kiya, matlab tum{' '}
          <span style={styles.highlight}>soft aur caring</span> ho!
          <br /><br />
          Lekin ek second... doosra gulaab bhi toh dekho... 🤭
        </>
      ),
      gradient: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
      titleColor: '#be185d',
    },
  };

  const content = roseType ? messages[roseType] : messages.laal;

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
        <div style={{
          ...styles.header,
          background: content.gradient,
        }}>
          <span style={styles.emoji}>{content.emoji}</span>
          <h2 style={{...styles.title, color: content.titleColor}}>
            {content.title}
          </h2>
          <p style={styles.message}>{content.message}</p>
        </div>

        <button
          style={styles.button}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #9f1239, #881337)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #be123c, #9f1239)';
          }}
        >
          Theek hai, doosra bhi dekhti hoon! 👀
        </button>
      </div>
    </div>
  );
}