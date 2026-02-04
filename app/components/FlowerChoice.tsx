/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { CSSProperties, useState, useEffect } from 'react';
import { Flower, Sparkles } from 'lucide-react';

interface FlowerChoiceProps {
  onSelect: (choice: 'laal' | 'neela') => void;
  selectedFlowers: ('laal' | 'neela')[];
  disabled?: boolean;
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: '56rem',
    margin: '0 auto',
    padding: '1rem',
  },
  title: {
    fontSize: 'clamp(2rem, 6vw, 3rem)',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1rem',
    fontFamily: "'Dancing Script', cursive",
    background: 'linear-gradient(to right, #db2777, #e11d48)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
  },
  flowerButton: {
    position: 'relative',
    width: '16rem',
    height: '20rem',
    borderRadius: '1rem',
    transition: 'all 0.5s',
    cursor: 'pointer',
    border: 'none',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)',
    borderRadius: '1rem',
  },
  buttonContent: {
    position: 'relative',
    zIndex: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
  },
  iconWrapper: {
    position: 'relative',
    animation: 'float 3s ease-in-out infinite',
  },
  sparkle: {
    position: 'absolute',
    top: '-0.5rem',
    right: '-0.5rem',
    width: '2rem',
    height: '2rem',
    color: '#fde047',
    animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  },
  flowerName: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: 'white',
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
  },
  flowerEmoji: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.125rem',
  },
  statusContainer: {
    marginTop: '1rem',
  },
  selectedStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#fde047',
  },
  unselectedStatus: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  petalsContainer: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    borderRadius: '1rem',
  },
  petal: {
    position: 'absolute',
    width: '2rem',
    height: '2rem',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
  },
  vsContainer: {
    position: 'relative',
  },
  vsCircle: {
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    background: 'white',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#f43f5e',
  },
  vsLine: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '8rem',
    height: '4px',
    background: 'linear-gradient(to right, transparent, #fda4af, transparent)',
    transform: 'translate(-50%, -50%)',
    zIndex: -1,
  },
  hintContainer: {
    marginTop: '3rem',
    textAlign: 'center',
    animation: 'heartbeat 1.5s ease-in-out infinite',
  },
  hintBox: {
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  hintText: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#e11d48',
  },
};

export default function FlowerChoice({ onSelect, selectedFlowers, disabled }: FlowerChoiceProps) {
  const [petals, setPetals] = useState<Array<{top: string, left: string, delay: string, duration: string}>>([]);

  useEffect(() => {
    const newPetals = [...Array(6)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${i * 0.5}s`,
      duration: `${3 + i}s`,
    }));
    setPetals(newPetals);
  }, []);

  const getButtonStyle = (flower: 'laal' | 'neela'): CSSProperties => {
    const isSelected = selectedFlowers.includes(flower);
    const isDisabled = disabled && !isSelected;
    const gradient = flower === 'laal' 
      ? 'linear-gradient(to bottom right, #fb7185, #ec4899, #e11d48)'
      : 'linear-gradient(to bottom right, #60a5fa, #6366f1, #2563eb)';

    return {
      ...styles.flowerButton,
      background: gradient,
      boxShadow: isSelected 
        ? '0 0 0 4px #facc15, 0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
        : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      opacity: isDisabled ? 0.5 : 1,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transform: 'scale(1)',
    };
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        A Special Surprise For You! 💝
      </h1>
      <p style={styles.subtitle}>
        Choose wisely... each flower holds a sweet secret!
      </p>

      <div style={{
        ...styles.buttonsContainer,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '3rem',
      }}>
        {/* Laal Phool */}
        <button
          onClick={() => onSelect('laal')}
          disabled={disabled && selectedFlowers.includes('laal')}
          style={getButtonStyle('laal')}
          onMouseEnter={(e) => {
            if (!(disabled && selectedFlowers.includes('laal'))) {
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div style={styles.overlay} />
          
          <div style={styles.buttonContent}>
            <div style={styles.iconWrapper}>
              <Flower style={{ width: '6rem', height: '6rem', color: 'white' }} />
              {selectedFlowers.includes('laal') && (
                <Sparkles style={styles.sparkle} />
              )}
            </div>
            
            <h2 style={styles.flowerName}>Laal Phool</h2>
            <p style={styles.flowerEmoji}>🌹 Red Rose</p>
            
            <div style={styles.statusContainer}>
              {selectedFlowers.includes('laal') ? (
                <div style={styles.selectedStatus}>
                  <span style={{ fontSize: '1.25rem' }}>✓</span>
                  <span>Selected!</span>
                </div>
              ) : (
                <div style={styles.unselectedStatus}>Click to choose</div>
              )}
            </div>
          </div>

          <div style={styles.petalsContainer}>
            {petals.map((petal, i) => (
              <div
                key={i}
                style={{
                  ...styles.petal,
                  top: petal.top,
                  left: petal.left,
                  animation: `fall ${petal.duration} linear infinite`,
                  animationDelay: petal.delay,
                }}
              />
            ))}
          </div>
        </button>

        {/* VS Divider */}
        <div style={styles.vsContainer}>
          <div style={styles.vsCircle}>
            <span style={styles.vsText}>VS</span>
          </div>
          <div style={styles.vsLine} />
        </div>

        {/* Neela Phool */}
        <button
          onClick={() => onSelect('neela')}
          disabled={disabled && selectedFlowers.includes('neela')}
          style={getButtonStyle('neela')}
          onMouseEnter={(e) => {
            if (!(disabled && selectedFlowers.includes('neela'))) {
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div style={styles.overlay} />
          
          <div style={styles.buttonContent}>
            <div style={styles.iconWrapper}>
              <Flower style={{ width: '6rem', height: '6rem', color: 'white' }} />
              {selectedFlowers.includes('neela') && (
                <Sparkles style={styles.sparkle} />
              )}
            </div>
            
            <h2 style={styles.flowerName}>Neela Phool</h2>
            <p style={styles.flowerEmoji}>💠 Blue Flower</p>
            
            <div style={styles.statusContainer}>
              {selectedFlowers.includes('neela') ? (
                <div style={styles.selectedStatus}>
                  <span style={{ fontSize: '1.25rem' }}>✓</span>
                  <span>Selected!</span>
                </div>
              ) : (
                <div style={styles.unselectedStatus}>Click to choose</div>
              )}
            </div>
          </div>

          <div style={styles.petalsContainer}>
            {petals.map((petal, i) => (
              <div
                key={i}
                style={{
                  ...styles.petal,
                  top: petal.top,
                  left: petal.left,
                  animation: `fall ${petal.duration} linear infinite`,
                  animationDelay: petal.delay,
                }}
              />
            ))}
          </div>
        </button>
      </div>

      {selectedFlowers.length === 1 && (
        <div style={styles.hintContainer}>
          <div style={styles.hintBox}>
            <p style={styles.hintText}>
              ✨ Now choose the other flower for the final surprise! ✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
}