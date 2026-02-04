'use client';

import { CSSProperties } from 'react';

type RoseType = 'laal' | 'gulabi';
type GameState = 'choosing' | 'first-selected' | 'highlight-other' | 'both-selected';

interface RoseChoiceProps {
  onSelect: (rose: RoseType) => void;
  gameState: GameState;
  firstChoice: RoseType | null;
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    width: '100%',
  },
  rosesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
    width: '100%',
  },
  roseCard: {
    position: 'relative',
    width: '280px',
    background: 'white',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 10px 40px rgba(190, 18, 60, 0.15)',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    border: '3px solid transparent',
  },
  roseImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '15px',
    marginBottom: '1rem',
  },
  rosePlaceholder: {
    width: '100%',
    height: '250px',
    borderRadius: '15px',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '6rem',
  },
  roseLabel: {
    textAlign: 'center',
    fontSize: '1.4rem',
    fontWeight: 600,
    color: '#881337',
    marginBottom: '0.5rem',
  },
  roseSubtext: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#9f1239',
    fontStyle: 'italic',
  },
  selectedBadge: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 600,
    boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
  },
  highlightBadge: {
    position: 'absolute',
    top: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: 'white',
    padding: '0.75rem 1.25rem',
    borderRadius: '25px',
    fontSize: '1rem',
    fontWeight: 600,
    boxShadow: '0 4px 20px rgba(245, 158, 11, 0.5)',
    whiteSpace: 'nowrap',
    animation: 'bounce 1s ease-in-out infinite',
  },
  instructionText: {
    textAlign: 'center',
    fontSize: '1.3rem',
    color: '#be123c',
    fontWeight: 500,
    padding: '1rem 2rem',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(190, 18, 60, 0.1)',
    marginBottom: '1rem',
  },
};

export default function RoseChoice({ onSelect, gameState, firstChoice }: RoseChoiceProps) {
  const isLaalSelected = firstChoice === 'laal';
  const isGulabiSelected = firstChoice === 'gulabi';
  const highlightLaal = gameState === 'highlight-other' && firstChoice === 'gulabi';
  const highlightGulabi = gameState === 'highlight-other' && firstChoice === 'laal';

  const getCardStyle = (rose: RoseType): CSSProperties => {
    const isSelected = (rose === 'laal' && isLaalSelected) || (rose === 'gulabi' && isGulabiSelected);
    const isHighlighted = (rose === 'laal' && highlightLaal) || (rose === 'gulabi' && highlightGulabi);
    const isDisabled = gameState === 'first-selected' || 
                       (gameState === 'highlight-other' && !isHighlighted && !isSelected);

    return {
      ...styles.roseCard,
      border: isSelected 
        ? '3px solid #22c55e' 
        : isHighlighted 
          ? '3px solid #f59e0b' 
          : '3px solid transparent',
      opacity: isDisabled && !isSelected ? 0.6 : 1,
      cursor: isDisabled && !isHighlighted ? 'default' : 'pointer',
      transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
      animation: isHighlighted ? 'glow 1.5s ease-in-out infinite' : 'none',
    };
  };

  return (
    <div style={styles.container}>
      {/* Instruction */}
      {gameState === 'choosing' && (
        <div style={styles.instructionText}>
          💕 Ek gulaab choose karo aur apni kismat jaano! 💕
        </div>
      )}

      {gameState === 'highlight-other' && (
        <div style={{...styles.instructionText, background: '#fef3c7', color: '#92400e'}}>
          👆 Ab ye wala bhi dekh lo... kya pata isme kya likha ho! 😏
        </div>
      )}

      {/* Rose Cards */}
      <div style={styles.rosesContainer}>
        {/* Laal Gulaab */}
        <div
          style={getCardStyle('laal')}
          onClick={() => {
            if (gameState === 'choosing' || (gameState === 'highlight-other' && highlightLaal)) {
              onSelect('laal');
            }
          }}
          onMouseEnter={(e) => {
            if (gameState === 'choosing' || highlightLaal) {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!highlightLaal) {
              e.currentTarget.style.transform = 'scale(1)';
            } else {
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
        >
          {isLaalSelected && (
            <div style={styles.selectedBadge}>✓ Tumhara Choice</div>
          )}
          
          {highlightLaal && (
            <div style={styles.highlightBadge}>
              👀 Agar ye choose kiya hota toh?
            </div>
          )}

          {/* Replace with actual image */}
          {/* <img src="/images/red-rose.jpg" alt="Laal Gulaab" style={styles.roseImage} /> */}
          <div style={{...styles.rosePlaceholder, background: 'linear-gradient(135deg, #ffe4e6, #fecdd3)'}}>
            🌹
          </div>

          <h3 style={styles.roseLabel}>Laal Gulaab</h3>
          <p style={styles.roseSubtext}>Pyaar ka rang 💗</p>
        </div>

        {/* Gulabi Gulaab */}
        <div
          style={getCardStyle('gulabi')}
          onClick={() => {
            if (gameState === 'choosing' || (gameState === 'highlight-other' && highlightGulabi)) {
              onSelect('gulabi');
            }
          }}
          onMouseEnter={(e) => {
            if (gameState === 'choosing' || highlightGulabi) {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!highlightGulabi) {
              e.currentTarget.style.transform = 'scale(1)';
            } else {
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
        >
          {isGulabiSelected && (
            <div style={styles.selectedBadge}>✓ Tumhara Choice</div>
          )}
          
          {highlightGulabi && (
            <div style={styles.highlightBadge}>
              👀 Agar ye choose kiya hota toh?
            </div>
          )}

          {/* Replace with actual image */}
          {/* <img src="/images/pink-rose.jpg" alt="Gulabi Gulaab" style={styles.roseImage} /> */}
          <div style={{...styles.rosePlaceholder, background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)'}}>
            🌸
          </div>

          <h3 style={styles.roseLabel}>Gulabi Gulaab</h3>
          <p style={styles.roseSubtext}>Dosti aur pyaar 💕</p>
        </div>
      </div>
    </div>
  );
}