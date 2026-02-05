/* eslint-disable prefer-const */
'use client';

import { CSSProperties } from 'react';

interface FlowerSelectProps {
  onSelect: (flower: 'laal' | 'neela') => void;
  selectedFlower: 'laal' | 'neela' | null;
  highlightOther: boolean;
  disabled: boolean;
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    color: '#374151',
    marginBottom: '0.5rem',
    fontWeight: 600,
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '2.5rem',
  },
  flowersRow: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  flowerCard: {
    width: '160px',
    padding: '1.5rem',
    background: 'white',
    borderRadius: '16px',
    border: '2px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },
  emoji: {
    fontSize: '4rem',
    display: 'block',
    marginBottom: '0.75rem',
  },
  label: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#374151',
  },
  highlightBadge: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    background: '#fef3c7',
    borderRadius: '20px',
    fontSize: '0.8rem',
    color: '#92400e',
    fontWeight: 500,
  },
  selectedBadge: {
    marginTop: '0.75rem',
    fontSize: '0.85rem',
    color: '#059669',
    fontWeight: 500,
  },
};

export default function FlowerSelect({
  onSelect,
  selectedFlower,
  highlightOther,
  disabled,
}: FlowerSelectProps) {
  const getCardStyle = (flower: 'laal' | 'neela'): CSSProperties => {
    const isSelected = selectedFlower === flower;
    const isHighlighted = highlightOther && selectedFlower !== flower;

    let borderColor = '#e5e7eb';
    let transform = 'scale(1)';
    let animation = 'none';

    if (isSelected) {
      borderColor = '#10b981';
    } else if (isHighlighted) {
      borderColor = flower === 'laal' ? '#ef4444' : '#3b82f6';
      animation = 'glow-pulse 1.5s ease-in-out infinite, wiggle 0.5s ease-in-out infinite';
    }

    return {
      ...styles.flowerCard,
      border: `3px solid ${borderColor}`,
      transform,
      animation,
      opacity: disabled && !isHighlighted && !isSelected ? 0.5 : 1,
      cursor: disabled && !isHighlighted ? 'default' : 'pointer',
    };
  };

  const handleClick = (flower: 'laal' | 'neela') => {
    if (disabled && !(highlightOther && selectedFlower !== flower)) return;
    onSelect(flower);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ek Phool Chuno 🌸</h1>
      <p style={styles.subtitle}>Bas click karo, kuch nahi hoga... 👀</p>

      <div style={styles.flowersRow}>
        {/* Laal Phool */}
        <div
          style={getCardStyle('laal')}
          onClick={() => handleClick('laal')}
          onMouseEnter={(e) => {
            if (!disabled || (highlightOther && selectedFlower !== 'laal')) {
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span style={styles.emoji}>🌺</span>
          <span style={styles.label}>Laal Phool</span>

          {selectedFlower === 'laal' && (
            <div style={styles.selectedBadge}>✓ Selected</div>
          )}

          {highlightOther && selectedFlower === 'neela' && (
            <div style={styles.highlightBadge}>
              👆 Ye chunti toh? 🤔
            </div>
          )}
        </div>

        {/* Neela Phool */}
        <div
          style={getCardStyle('neela')}
          onClick={() => handleClick('neela')}
          onMouseEnter={(e) => {
            if (!disabled || (highlightOther && selectedFlower !== 'neela')) {
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span style={styles.emoji}>🪻</span>
          <span style={styles.label}>Neela Phool</span>

          {selectedFlower === 'neela' && (
            <div style={styles.selectedBadge}>✓ Selected</div>
          )}

          {highlightOther && selectedFlower === 'laal' && (
            <div style={styles.highlightBadge}>
              👆 Ye chunti toh? 🤔
            </div>
          )}
        </div>
      </div>
    </div>
  );
}