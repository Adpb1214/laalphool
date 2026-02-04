'use client';

import { useState, useEffect, CSSProperties } from 'react';
import MessagePopup from './components/MessagePopup';
import RoseChoice from './components/RoseChoice';
import FinalReveal from './components/FinalReveal';

type RoseType = 'laal' | 'gulabi';
type GameState = 'choosing' | 'first-selected' | 'highlight-other' | 'both-selected';

const styles: { [key: string]: CSSProperties } = {
  main: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #fff5f5 0%, #ffe4e6 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 1rem',
    paddingBottom: '5rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#be123c',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#9f1239',
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '800px',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    padding: '1rem',
    background: 'linear-gradient(transparent, #ffe4e6)',
  },
  footerText: {
    fontSize: '0.85rem',
    color: '#881337',
    fontWeight: 500,
  },
  trademark: {
    fontSize: '0.7rem',
    verticalAlign: 'super',
  },
};

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('choosing');
  const [firstChoice, setFirstChoice] = useState<RoseType | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const handleRoseSelect = (rose: RoseType) => {
    if (gameState === 'choosing') {
      // First selection
      setFirstChoice(rose);
      setGameState('first-selected');
      setShowPopup(true);
    } else if (gameState === 'highlight-other' && rose !== firstChoice) {
      // Second selection
      setGameState('both-selected');
      setShowFinal(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    // After closing popup, highlight the other rose
    setTimeout(() => {
      setGameState('highlight-other');
    }, 300);
  };

  const handleReset = () => {
    setGameState('choosing');
    setFirstChoice(null);
    setShowPopup(false);
    setShowFinal(false);
  };

  return (
    <main style={styles.main}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>🌹 Ek Gulaab Chun Lo 🌹</h1>
        <p style={styles.subtitle}>Dekho tumhari kismat mein kya likha hai...</p>
      </header>

      {/* Main Content */}
      <div style={styles.content}>
        <RoseChoice
          onSelect={handleRoseSelect}
          gameState={gameState}
          firstChoice={firstChoice}
        />

        {/* Reset Button */}
        {(gameState === 'highlight-other' || gameState === 'both-selected') && (
          <button
            onClick={handleReset}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 1.5rem',
              background: 'white',
              border: '2px solid #fda4af',
              borderRadius: '25px',
              color: '#be123c',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff1f2';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            🔄 Phir Se Khelo
          </button>
        )}
      </div>

      {/* Message Popup */}
      <MessagePopup
        isOpen={showPopup}
        onClose={handlePopupClose}
        roseType={firstChoice}
      />

      {/* Final Reveal */}
      <FinalReveal
        isOpen={showFinal}
        onClose={() => setShowFinal(false)}
      />

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Created by <strong>the wrath of god</strong>
          <span style={styles.trademark}>™</span>
        </p>
      </footer>
    </main>
  );
}