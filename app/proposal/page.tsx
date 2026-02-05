/* eslint-disable react-hooks/purity */
"use client";

import { useState, useRef, useEffect, CSSProperties } from "react";

type EffectType = "escape" | "shrink" | "spin" | "fade" | "jelly" | "dead";

interface NoButtonState {
  effect: EffectType;
  position: { top: string; left: string };
  scale: number;
  rotation: number;
  opacity: number;
  text: string;
}

// Bengali texts for No button
const effectTexts: Record<EffectType, string[]> = {
  escape: [
    "Dhorte parbi na 😂",
    "Palachi ami! 🏃",
    "Aaye haye! 😜",
    "Tui slow re 😏",
    "Dhoro dekhi! 💨",
  ],
  shrink: [
    "Choto hoye jachi 🤏",
    "Dekhte pachcho? 🔍",
    "Eto choto! 🐜",
    "Zoom kor 👀",
    "Microscope laga 😂",
  ],
  spin: [
    "Matha ghurche 🌀",
    "Ghurchi ghurchi! 💫",
    "Uff chakkar 😵‍💫",
    "Thamte parchi na! 🌀",
    "Round round! 🔄",
  ],
  fade: [
    "Gayab! 👻",
    "Kothay gelam? 😏",
    "Dekhte pacho? 🫥",
    "Invisible! 👻",
    "Poof! 🙈",
  ],
  jelly: [
    "Chhuna na! 😰",
    "Bhoy korche 🥴",
    "Kaanpchi! 😱",
    "Please na 😨",
    "Ahhh! 🥺",
  ],
  dead: ["Mor gelam 💀", "Geli aami ☠️", "Tata bye bye 🪦"],
};

// YES button hover texts
const yesHoverTexts = [
  "Haan! 💚",
  "Ami eto lucky? 🥺",
  "Sotti bolcho? 😍",
  "Yayyy! 🎉",
  "Best decision! 💖",
  "Tumi shera! ✨",
  "Omg omg! 🥰",
  "Khushi! 💕",
];

// Celebration emojis
const celebrationEmojis = [
  "🎉",
  "✨",
  "💖",
  "🥳",
  "💕",
  "🎊",
  "❤️",
  "💗",
  "😍",
  "🥰",
];

const effectSequence: EffectType[] = [
  "escape",
  "shrink",
  "spin",
  "fade",
  "jelly",
  "dead",
];

export default function ProposalPage() {
  const [attemptCount, setAttemptCount] = useState(0);
  const [noState, setNoState] = useState<NoButtonState>({
    effect: "escape",
    position: { top: "55%", left: "60%" },
    scale: 1,
    rotation: 0,
    opacity: 1,
    text: "Na",
  });
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [confetti, setConfetti] = useState<
    Array<{ id: number; left: string; emoji: string }>
  >([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHoveringNo, setIsHoveringNo] = useState(false);

  // Yes button states
  const [isYesHovered, setIsYesHovered] = useState(false);
  const [yesText, setYesText] = useState("Haan! 💚");
  const [yesTextIndex, setYesTextIndex] = useState(0);
  const [celebrationParticles, setCelebrationParticles] = useState<
    Array<{ id: number; left: number; top: number; emoji: string }>
  >([]);

  // Screen size detection
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({ width, height });
      setIsMobile(width < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Change yes text when hovered/touched
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isYesHovered) {
      interval = setInterval(() => {
        setYesTextIndex((prev) => {
          const next = (prev + 1) % yesHoverTexts.length;
          setYesText(yesHoverTexts[next]);
          return next;
        });
      }, 600);
    } else {
      setYesText("Haan! 💚");
      setYesTextIndex(0);
    }

    return () => clearInterval(interval);
  }, [isYesHovered]);

  // Spawn celebration emojis
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isYesHovered) {
      interval = setInterval(() => {
        const newParticle = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          top: Math.random() * 100,
          emoji:
            celebrationEmojis[
              Math.floor(Math.random() * celebrationEmojis.length)
            ],
        };

        setCelebrationParticles((prev) => [...prev.slice(-10), newParticle]);
      }, 250);
    } else {
      setCelebrationParticles([]);
    }

    return () => clearInterval(interval);
  }, [isYesHovered]);

  // Get random text for effect
  const getRandomText = (effect: EffectType): string => {
    const texts = effectTexts[effect];
    return texts[Math.floor(Math.random() * texts.length)];
  };

  // Get random position - Responsive!
  const getRandomPosition = () => {
    const vw = screenSize.width || window.innerWidth;
    const vh = screenSize.height || window.innerHeight;

    // Button size varies by screen
    const btnWidth = isMobile ? 100 : 140;
    const btnHeight = 45;

    // Safe margins
    const marginX = isMobile ? 10 : 20;
    const marginBottom = isMobile ? 80 : 120;

    // Safe zone - start below video (responsive)
    const minX = marginX;
    const maxX = vw - btnWidth - marginX;
    const minY = vh * (isMobile ? 0.45 : 0.4);
    const maxY = vh - btnHeight - marginBottom;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    return {
      left: `${randomX}px`,
      top: `${randomY}px`,
    };
  };

  // Apply effect
  const applyEffect = (effect: EffectType) => {
    setIsAnimating(true);
    const newText = getRandomText(effect);
    setMessage(newText);

    const newPos = getRandomPosition();

    switch (effect) {
      case "escape":
        setNoState((prev) => ({
          ...prev,
          effect: "escape",
          position: newPos,
          scale: 1,
          rotation: 0,
          opacity: 1,
          text: newText,
        }));
        break;

      case "shrink":
        setNoState((prev) => ({
          ...prev,
          effect: "shrink",
          position: newPos,
          scale: 0.6,
          rotation: 0,
          opacity: 1,
          text: newText,
        }));
        break;

      case "spin":
        setNoState((prev) => ({
          ...prev,
          effect: "spin",
          position: newPos,
          scale: 1,
          rotation: prev.rotation + 720,
          opacity: 1,
          text: newText,
        }));
        break;

      case "fade":
        setNoState((prev) => ({
          ...prev,
          effect: "fade",
          position: newPos,
          scale: 1,
          rotation: 0,
          opacity: 0.25,
          text: newText,
        }));
        break;

      case "jelly":
        setNoState((prev) => ({
          ...prev,
          effect: "jelly",
          position: newPos,
          scale: 1,
          rotation: 0,
          opacity: 1,
          text: newText,
        }));
        break;

      case "dead":
        const vh = screenSize.height || window.innerHeight;
        setNoState((prev) => ({
          ...prev,
          effect: "dead",
          position: { top: `${vh - 120}px`, left: prev.position.left },
          scale: 1,
          rotation: 180,
          opacity: 0.4,
          text: newText,
        }));
        setTimeout(() => {
          handleYes();
        }, 1500);
        break;
    }

    setTimeout(() => {
      setMessage("");
      setIsAnimating(false);
    }, 1200);
  };

  // Handle No button hover - with delay (desktop only)
  const handleNoMouseEnter = () => {
    if (isMobile) return; // No hover on mobile
    if (isAnimating) return;
    if (attemptCount >= effectSequence.length) return;

    setIsHoveringNo(true);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      if (attemptCount < effectSequence.length) {
        const effect = effectSequence[attemptCount];
        setAttemptCount((prev) => prev + 1);
        applyEffect(effect);
        setIsHoveringNo(false);
      }
    }, 500);
  };

  const handleNoMouseLeave = () => {
    setIsHoveringNo(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  // Handle touch/click on No (instant for mobile)
  const handleNoClick = () => {
    if (isAnimating) return;
    if (attemptCount >= effectSequence.length) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    const effect = effectSequence[attemptCount];
    setAttemptCount((prev) => prev + 1);
    applyEffect(effect);
    setIsHoveringNo(false);
  };

  // Handle Yes
  const handleYes = () => {
    setShowSuccess(true);

    const emojis = ["🎉", "💖", "✨", "🥳", "💕", "🎊", "❤️", "💗", "😍", "🥰"];
    const newConfetti = Array.from({ length: isMobile ? 50 : 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setConfetti(newConfetti);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Hint text
  const getHintText = () => {
    const hints = [
      "Bhebe dekho... 👀",
      "Oops! Paliye gelo 😂",
      "Button ta smart 🏃",
      "Ekhon kothay? 💫",
      "Arre dhoro na! 😭",
      "Button shesh 🪦",
    ];
    return hints[Math.min(attemptCount, hints.length - 1)];
  };

  // Effect emoji
  const getCurrentEffectEmoji = () => {
    if (attemptCount >= effectSequence.length) return "💀";
    const emojis: Record<EffectType, string> = {
      escape: "🏃",
      shrink: "🤏",
      spin: "🌀",
      fade: "👻",
      jelly: "😰",
      dead: "💀",
    };
    return emojis[effectSequence[attemptCount]];
  };

  // ============ STYLES (Responsive) ============
  const styles: { [key: string]: CSSProperties } = {
    container: {
      minHeight: "100dvh", // Dynamic viewport height for mobile
      background:
        "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fff1f2 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: isMobile ? "1rem 0.75rem" : "2rem 1rem",
      paddingTop: isMobile ? "1rem" : "2rem",
      position: "relative",
      overflow: "hidden",
    },
    videoContainer: {
      width: "100%",
      maxWidth: isMobile ? "100%" : "500px",
      borderRadius: isMobile ? "12px" : "20px",
      overflow: "hidden",
      boxShadow: "0 15px 50px rgba(0, 0, 0, 0.12)",
      background: "#000",
      marginBottom: isMobile ? "1.25rem" : "2rem",
      zIndex: 10,
      position: "relative",
    },
    videoPlaceholder: {
      width: "100%",
      aspectRatio: "16/9",
      background: "linear-gradient(135deg, #1f2937, #111827)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
    },
    videoIcon: {
      fontSize: isMobile ? "2.5rem" : "4rem",
      marginBottom: isMobile ? "0.5rem" : "1rem",
    },
    videoText: {
      fontSize: isMobile ? "0.85rem" : "1rem",
    },
    question: {
      fontSize: isMobile ? "1.15rem" : "1.5rem",
      fontWeight: 600,
      color: "#1f2937",
      marginBottom: isMobile ? "1.25rem" : "2rem",
      textAlign: "center",
      zIndex: 10,
      padding: "0 1rem",
    },
    buttonsArea: {
      display: "flex",
      gap: isMobile ? "1rem" : "2rem",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: isMobile ? "1rem" : "1.5rem",
      zIndex: 10,
    },
    yesButton: {
      padding: isMobile ? "0.85rem 2rem" : "1rem 3rem",
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      color: "white",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "1rem" : "1.2rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s",
      zIndex: 20,
      position: "relative",
      minWidth: isMobile ? "150px" : "200px",
      WebkitTapHighlightColor: "transparent",
    },
    yesButtonHover: {
      transform: "scale(1.1)",
      boxShadow: "0 15px 40px rgba(34, 197, 94, 0.45)",
      background: "linear-gradient(135deg, #16a34a, #15803d)",
    },
    noButtonWrapper: {
      position: "fixed",
      zIndex: 50,
      transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
    noButton: {
      padding: isMobile ? "0.7rem 1.5rem" : "1rem 2.5rem",
      background: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "50px",
      fontSize: isMobile ? "0.95rem" : "1.1rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "transform 0.3s, box-shadow 0.3s",
      transformOrigin: "center center",
      whiteSpace: "nowrap",
      WebkitTapHighlightColor: "transparent",
      touchAction: "manipulation",
    },
    messagePopup: {
      position: "fixed",
      top: isMobile ? "8%" : "10%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0, 0, 0, 0.9)",
      color: "white",
      padding: isMobile ? "0.75rem 1.25rem" : "1rem 2rem",
      borderRadius: "40px",
      fontSize: isMobile ? "1rem" : "1.3rem",
      fontWeight: 600,
      zIndex: 100,
      animation: "pop 0.3s ease-out",
      whiteSpace: "nowrap",
      maxWidth: "90vw",
      textAlign: "center",
    },
    celebrationEmoji: {
      position: "fixed",
      fontSize: isMobile ? "1.5rem" : "2rem",
      pointerEvents: "none",
      zIndex: 15,
      animation: "float-up 2s ease-out forwards",
    },
    effectIndicator: {
      marginTop: isMobile ? "0.75rem" : "1rem",
      display: "flex",
      gap: isMobile ? "0.4rem" : "0.5rem",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
    },
    dot: {
      width: isMobile ? "8px" : "10px",
      height: isMobile ? "8px" : "10px",
      borderRadius: "50%",
      background: "#e5e7eb",
      transition: "all 0.3s",
    },
    activeDot: {
      background: "#ef4444",
      transform: "scale(1.4)",
    },
    completedDot: {
      background: "#22c55e",
    },
    effectEmoji: {
      marginTop: "0.5rem",
      fontSize: isMobile ? "1.25rem" : "1.5rem",
      zIndex: 10,
    },
    hintText: {
      marginTop: isMobile ? "0.5rem" : "1rem",
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      color: "#6b7280",
      textAlign: "center",
      zIndex: 10,
      padding: "0 1rem",
    },
    attemptCounter: {
      marginTop: "0.4rem",
      fontSize: isMobile ? "0.75rem" : "0.85rem",
      color: "#9ca3af",
      zIndex: 10,
    },
    successOverlay: {
      position: "fixed",
      inset: 0,
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "2rem",
    },
    successEmoji: {
      fontSize: isMobile ? "4rem" : "6rem",
      marginBottom: "1rem",
      animation: "heart-beat 1s ease-in-out infinite",
    },
    successTitle: {
      fontSize: isMobile ? "2rem" : "2.8rem",
      fontWeight: 700,
      color: "white",
      marginBottom: "0.5rem",
      textAlign: "center",
    },
    successSubtitle: {
      fontSize: isMobile ? "1.1rem" : "1.3rem",
      color: "rgba(255,255,255,0.9)",
      marginBottom: "1rem",
      textAlign: "center",
    },
    successMessage: {
      fontSize: isMobile ? "0.95rem" : "1.1rem",
      color: "rgba(255,255,255,0.8)",
      marginTop: "2rem",
      textAlign: "center",
    },
    successFooter: {
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      color: "rgba(255,255,255,0.6)",
      marginTop: "1rem",
      fontStyle: "italic",
      textAlign: "center",
    },
    confetti: {
      position: "fixed",
      fontSize: isMobile ? "1.5rem" : "2rem",
      pointerEvents: "none",
      zIndex: 1001,
    },
    yesGlow: {
      position: "absolute",
      inset: "-8px",
      borderRadius: "60px",
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      filter: "blur(15px)",
      opacity: 0,
      transition: "opacity 0.3s",
      zIndex: -1,
    },
  };

  // Get No button wrapper style
  const getNoWrapperStyle = (): CSSProperties => {
    return {
      ...styles.noButtonWrapper,
      top: noState.position.top,
      left: noState.position.left,
      transform: `rotate(${noState.rotation}deg)`,
      opacity: noState.opacity,
    };
  };

  // Get No button style
  const getNoButtonStyle = (): CSSProperties => {
    let animation = "";

    if (noState.effect === "jelly" && isAnimating) {
      animation = "shake 0.3s ease-in-out infinite";
    }

    const paddingScale = noState.scale;
    const basePaddingV = isMobile ? 0.7 : 1;
    const basePaddingH = isMobile ? 1.5 : 2.5;

    return {
      ...styles.noButton,
      padding: `${basePaddingV * paddingScale}rem ${basePaddingH * paddingScale}rem`,
      animation,
      transform: isHoveringNo ? "scale(1.1)" : "scale(1)",
      boxShadow: isHoveringNo ? "0 8px 25px rgba(239, 68, 68, 0.4)" : "none",
    };
  };

  // ============ RENDER ============

  // Success Screen
  if (showSuccess) {
    return (
      <div style={styles.successOverlay}>
        {confetti.map((c) => (
          <span
            key={c.id}
            style={{
              ...styles.confetti,
              left: c.left,
              top: "-50px",
              animation: `confetti-fall ${2 + Math.random() * 2}s linear forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          >
            {c.emoji}
          </span>
        ))}

        <span style={styles.successEmoji}>💖</span>

        <h1 style={styles.successTitle}>YAYYYY! 🎉</h1>

        <p style={styles.successSubtitle}>Jantam tumi haan bolbe! 🥰</p>

        <p style={styles.successMessage}>Ebar taratari reply kor ✨</p>

        <p style={styles.successFooter}>(Dekh! Na bolte parli na 😏)</p>
      </div>
    );
  }

  return (
    <div style={styles.container} ref={containerRef}>
      {/* Celebration Particles */}
      {celebrationParticles.map((p) => (
        <span
          key={p.id}
          style={{
            ...styles.celebrationEmoji,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Message Popup */}
      {message && <div style={styles.messagePopup}>{message}</div>}

      {/* Video */}
      <div style={styles.videoContainer}>
        {/*
        <video
          style={{ width: '100%', display: 'block' }}
          controls
          autoPlay
          playsInline
          webkit-playsinline="true"
          src="/videos/proposal.mp4"
        />
        */}
        <div style={styles.videoPlaceholder}>
          <span style={styles.videoIcon}>🎬</span>
          <span style={styles.videoText}>Your Video Here</span>
        </div>
      </div>

      {/* Question */}
      <h2 style={styles.question}>Toh... ki bolbe? 👉👈</h2>

      {/* Yes Button */}
      <div style={styles.buttonsArea}>
        <button
          style={{
            ...styles.yesButton,
            ...(isYesHovered ? styles.yesButtonHover : {}),
          }}
          onClick={handleYes}
          onMouseEnter={() => !isMobile && setIsYesHovered(true)}
          onMouseLeave={() => !isMobile && setIsYesHovered(false)}
          onTouchStart={() => setIsYesHovered(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsYesHovered(false), 100);
          }}
        >
          <div
            style={{
              ...styles.yesGlow,
              opacity: isYesHovered ? 0.5 : 0,
            }}
          />
          {yesText}
        </button>
      </div>

      {/* No Button - Fixed, moves around screen */}
      <div style={getNoWrapperStyle()}>
        <button
          style={getNoButtonStyle()}
          onMouseEnter={handleNoMouseEnter}
          onMouseLeave={handleNoMouseLeave}
          onTouchStart={(e) => {
            e.preventDefault();
            handleNoClick();
          }}
          onClick={handleNoClick}
        >
          {noState.text}
        </button>
      </div>

      {/* Progress Dots */}
      <div style={styles.effectIndicator}>
        {effectSequence.map((_, index) => (
          <div
            key={index}
            style={{
              ...styles.dot,
              ...(index < attemptCount ? styles.completedDot : {}),
              ...(index === attemptCount ? styles.activeDot : {}),
            }}
          />
        ))}
      </div>

      {/* Current Effect Emoji */}
      <p style={styles.effectEmoji}>{getCurrentEffectEmoji()}</p>

      {/* Hint Text */}
      <p style={styles.hintText}>{getHintText()}</p>

      {/* Attempt Counter */}
      {attemptCount > 0 && (
        <p style={styles.attemptCounter}>
          Try: {attemptCount} / {effectSequence.length} 😂
        </p>
      )}
    </div>
  );
}
