/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { CSSProperties, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SmileModalProps {
  isOpen: boolean;
}

const styles: { [key: string]: CSSProperties } = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.8)',
  },
  modal: {
    background: 'white',
    borderRadius: '24px',
    maxWidth: '380px',
    width: '100%',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    animation: 'pop 0.4s ease-out',
  },
  emoji: {
    fontSize: '4rem',
    display: 'block',
    marginBottom: '1.5rem',
    animation: 'float-gentle 2s ease-in-out infinite',
  },
  title: {
    fontSize: '1.4rem',
    color: '#111827',
    fontWeight: 600,
    marginBottom: '0.5rem',
    lineHeight: 1.4,
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '2rem',
  },
  button: {
    padding: '1rem 2.5rem',
    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    animation: 'pulse-grow 2s ease-in-out infinite',
  },
  hint: {
    marginTop: '1.5rem',
    fontSize: '0.85rem',
    color: '#9ca3af',
  },
};

export default function SmileModal({ isOpen }: SmileModalProps) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  if (!visible) return null;

  const handleClick = () => {
    router.push('/proposal');
  };

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.4s',
      }}
    >
      <div style={styles.modal}>
        <span style={styles.emoji}>😊</span>
        
        <h2 style={styles.title}>
          Agar chehre pe thodi si bhi<br />hasi aayi toh...
        </h2>
        
        <p style={styles.subtitle}>
          Neeche wala button daba 👇
        </p>

        <button
          style={styles.button}
          onClick={handleClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(236, 72, 153, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ✨ Click Me ✨
        </button>

        <p style={styles.hint}>
          (Agar nahi aayi toh bhi daba de, kya pata aa jaye 😏)
        </p>
      </div>
    </div>
  );
}