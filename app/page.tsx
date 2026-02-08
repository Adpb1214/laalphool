'use client';

import { useState, CSSProperties } from 'react';
import FlowerSelect from './components/FlowerSelect';
import FirstPopup from './components/FirstPopup';
import SecondPopup from './components/SecondPopup';
import FinalModal from './components/FinalModal';
import SmileModal from './components/SmileModal';
import { ClassicMovieTicket, RedTheaterTicket } from './components/ticketButton';

type FlowerType = 'laal' | 'neela';
type GameState = 'choosing' | 'first-done' | 'highlight' | 'second-done' | 'final' | 'smile';

const styles: { [key: string]: CSSProperties } = {
  main: {
    minHeight: '100vh',
    background: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('choosing');
  const [firstFlower, setFirstFlower] = useState<FlowerType | null>(null);
  const [showFirstPopup, setShowFirstPopup] = useState(false);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showSmile, setShowSmile] = useState(false);

  const handleFlowerSelect = (flower: FlowerType) => {
    if (gameState === 'choosing') {
      setFirstFlower(flower);
      setGameState('first-done');
      setShowFirstPopup(true);
    } else if (gameState === 'highlight' && flower !== firstFlower) {
      setGameState('second-done');
      setShowSecondPopup(true);
    }
  };

  const handleFirstPopupClose = () => {
    setShowFirstPopup(false);
    setTimeout(() => {
      setGameState('highlight');
    }, 400);
  };

  const handleSecondPopupClose = () => {
    setShowSecondPopup(false);
    setTimeout(() => {
      setGameState('final');
      setShowFinal(true);
    }, 2500);
  };

  const handleFinalClose = () => {
    setShowFinal(false);
    // After final modal closes, show smile modal
    setTimeout(() => {
      setGameState('smile');
      setShowSmile(true);
    }, 500);
  };

  const handleReset = () => {
    setGameState('choosing');
    setFirstFlower(null);
    setShowFirstPopup(false);
    setShowSecondPopup(false);
    setShowFinal(false);
    setShowSmile(false);
  };

  return (
    <main style={styles.main}>
      <FlowerSelect
        onSelect={handleFlowerSelect}
        selectedFlower={firstFlower}
        highlightOther={gameState === 'highlight'}
        disabled={gameState !== 'choosing' && gameState !== 'highlight'}
      />

      {gameState === 'second-done' && !showSecondPopup && !showFinal && (
        <p style={{ color: '#9ca3af', marginTop: '2rem' }}>
          Ruko... kuch aa raha hai... ⏳
        </p>
      )}

      <FirstPopup
        isOpen={showFirstPopup}
        onClose={handleFirstPopupClose}
        flower={firstFlower}
      />

      <SecondPopup
        isOpen={showSecondPopup}
        onClose={handleSecondPopupClose}
      />

      <FinalModal
        isOpen={showFinal}
        onClose={handleFinalClose}  
      />
{/* 
 <ClassicMovieTicket />
          <RedTheaterTicket /> */}
      <SmileModal isOpen={showSmile} />
    </main>
  );
}