/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { clearStorage, loadFromStorage, saveToStorage } from './lib/storage';
import FlowerChoice from './components/FlowerChoice';
import ConfettiEffect from './components/confetti';
import MessagePopup from './components/MessagePopup';
import FinalPopup from './components/FinalPopup';

type FlowerChoiceType = 'laal' | 'neela';

const styles: { [key: string]: CSSProperties } = {
  main: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(to bottom right, #fff1f2, #fdf2f8, #ffe4e6)',
  },
  floatingContainer: {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
  },
  floatingItem: {
    position: 'absolute',
    fontSize: '1.5rem',
    animation: 'float 3s ease-in-out infinite',
  },
  content: {
    position: 'relative',
    zIndex: 10,
  },
  header: {
    paddingTop: '2rem',
    paddingBottom: '1rem',
    textAlign: 'center',
  },
  headerInner: {
    maxWidth: '48rem',
    margin: '0 auto',
    padding: '0 1rem',
  },
  title: {
    fontSize: 'clamp(2.5rem, 8vw, 3.75rem)',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    fontFamily: "'Dancing Script', cursive",
    background: 'linear-gradient(to right, #e11d48, #db2777, #e11d48)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'heartbeat 1.5s ease-in-out infinite',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#4b5563',
    marginBottom: '0.5rem',
  },
  divider: {
    width: '6rem',
    height: '4px',
    background: 'linear-gradient(to right, transparent, #fb7185, transparent)',
    margin: '0 auto',
    borderRadius: '2px',
  },
  section: {
    padding: '2rem 0',
  },
  instructionSection: {
    padding: '2rem 0',
    textAlign: 'center',
    animation: 'pulse 2s ease-in-out infinite',
  },
  instructionInner: {
    maxWidth: '42rem',
    margin: '0 auto',
    padding: '0 1rem',
  },
  instructionBox: {
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    borderRadius: '1rem',
    padding: '1rem 1.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  instructionText: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#e11d48',
  },
  progress: {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 20,
  },
  progressInner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    borderRadius: '9999px',
    padding: '0.5rem 1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  progressDots: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  progressDot: {
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
  },
  progressText: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#4b5563',
  },
  resetButton: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#374151',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    zIndex: 20,
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    padding: '1rem',
  },
  footerText: {
    fontSize: '0.875rem',
    color: 'rgba(107, 114, 128, 0.6)',
  },
};

export default function Home() {
  const [selectedFlowers, setSelectedFlowers] = useState<FlowerChoiceType[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState<FlowerChoiceType | null>(null);
  const [showFinal, setShowFinal] = useState(false);
  const [floatingItems, setFloatingItems] = useState<Array<{left: string, top: string, delay: string, duration: string, emoji: string}>>([]);

  useEffect(() => {
    // Generate floating items on client side only
    const items = [...Array(20)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
      emoji: i % 3 === 0 ? '💖' : i % 3 === 1 ? '🌹' : '✨',
    }));
    setFloatingItems(items);
  }, []);

  useEffect(() => {
    const saved = loadFromStorage();
    if (saved.length > 0) {
      setSelectedFlowers(saved);
      if (saved.length === 2) {
        setTimeout(() => setShowFinal(true), 1000);
      }
    }
  }, []);

  const handleFlowerSelect = (flower: FlowerChoiceType) => {
    if (selectedFlowers.includes(flower)) return;

    const newSelection = [...selectedFlowers, flower];
    setSelectedFlowers(newSelection);
    saveToStorage(newSelection);

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    setMessageType(flower);
    setShowMessage(true);

    if (newSelection.length === 2) {
      setTimeout(() => {
        setShowMessage(false);
        setTimeout(() => setShowFinal(true), 500);
      }, 2000);
    } else {
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  const handleReset = () => {
    clearStorage();
    setSelectedFlowers([]);
    setShowFinal(false);
    setShowMessage(false);
  };

  return (
    <main style={styles.main}>
      <div style={styles.background} />
      
      <div style={styles.floatingContainer}>
        {floatingItems.map((item, i) => (
          <div
            key={i}
            style={{
              ...styles.floatingItem,
              left: item.left,
              top: item.top,
              animationDelay: item.delay,
              animationDuration: item.duration,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <div style={styles.content}>
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <h1 style={styles.title}>
              For My Beautiful Crush 💝
            </h1>
            <p style={styles.subtitle}>
              A small surprise to brighten your day...
            </p>
            <div style={styles.divider} />
          </div>
        </header>

        <section style={styles.section}>
          <FlowerChoice
            onSelect={handleFlowerSelect}
            selectedFlowers={selectedFlowers}
            disabled={selectedFlowers.length === 1 && !showFinal}
          />
        </section>

        {selectedFlowers.length === 1 && !showFinal && (
          <section style={styles.instructionSection}>
            <div style={styles.instructionInner}>
              <div style={styles.instructionBox}>
                <p style={styles.instructionText}>
                  💕 One more to go! Choose the other flower for the ultimate compliment! 💕
                </p>
              </div>
            </div>
          </section>
        )}

        <div style={styles.progress}>
          <div style={styles.progressInner}>
            <div style={styles.progressDots}>
              <div style={{
                ...styles.progressDot,
                backgroundColor: selectedFlowers.includes('laal') ? '#f43f5e' : '#d1d5db',
              }} />
              <div style={{
                ...styles.progressDot,
                backgroundColor: selectedFlowers.includes('neela') ? '#3b82f6' : '#d1d5db',
              }} />
            </div>
            <span style={styles.progressText}>
              {selectedFlowers.length}/2 flowers chosen
            </span>
          </div>
        </div>

        <button
          onClick={handleReset}
          style={styles.resetButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#e11d48';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.color = '#374151';
          }}
        >
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Reset</span>
          <span style={{ fontSize: '1.125rem' }}>🔄</span>
        </button>
      </div>

      <ConfettiEffect isActive={showConfetti} />
      
      <MessagePopup
        isOpen={showMessage}
        onClose={() => setShowMessage(false)}
        type={messageType!}
      />
      
      <FinalPopup
        isOpen={showFinal}
        onClose={() => setShowFinal(false)}
      />

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Made with 💖 for someone special
        </p>
      </footer>
    </main>
  );
}