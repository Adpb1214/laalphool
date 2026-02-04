'use client';

import { useEffect, useRef, CSSProperties } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  isActive: boolean;
}

const canvasStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 50,
};

export default function ConfettiEffect({ isActive }: ConfettiEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    myConfetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });

    const sideBursts = [
      { angle: 60, origin: { x: 0 } },
      { angle: 120, origin: { x: 1 } },
    ];

    sideBursts.forEach((burst, index) => {
      setTimeout(() => {
        myConfetti({
          particleCount: 100,
          angle: burst.angle,
          spread: 55,
          origin: burst.origin,
        });
      }, (index + 1) * 250);
    });

    setTimeout(() => {
      const heartPath = confetti.shapeFromPath({
        path: 'M167 72c19,38 30,64 30,64 0,0 11,-26 30,-64 21,-41 26,-57 42,-57 30,0 55,43 55,82 0,63 -44,134 -84,134 -40,0 -83,-40 -83,-40 0,0 -43,40 -83,40 -40,0 -84,-71 -84,-134 0,-39 25,-82 55,-82 16,0 21,16 42,57z',
      });

      myConfetti({
        shapes: [heartPath],
        scalar: 2,
        particleCount: 20,
        spread: 360,
        origin: { y: 0.3 },
      });
    }, 1000);

    return () => {
      myConfetti.reset();
    };
  }, [isActive]);

  if (!isActive) return null;

  return <canvas ref={canvasRef} style={canvasStyle} />;
}