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

// Original texts from the first component
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

// YES button hover texts (original)
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

// Celebration emojis (original)
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

export default function TheatreProposal() {
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

  // Yes button states (original)
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

  // Change yes text when hovered/touched (original)
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

  // Spawn celebration emojis (original)
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

  // Get random text for effect (original)
  const getRandomText = (effect: EffectType): string => {
    const texts = effectTexts[effect];
    return texts[Math.floor(Math.random() * texts.length)];
  };

  // Get random position - Responsive! (original)
  const getRandomPosition = () => {
    const vw = screenSize.width || window.innerWidth;
    const vh = screenSize.height || window.innerHeight;

    // Ticket size varies by screen
    const ticketWidth = isMobile ? 140 : 200;
    const ticketHeight = isMobile ? 100 : 140;

    // Safe margins
    const marginX = isMobile ? 10 : 20;
    const marginBottom = isMobile ? 80 : 120;

    // Safe zone
    const minX = marginX;
    const maxX = vw - ticketWidth - marginX;
    const minY = vh * (isMobile ? 0.45 : 0.4);
    const maxY = vh - ticketHeight - marginBottom;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    return {
      left: `${randomX}px`,
      top: `${randomY}px`,
    };
  };

  // Apply effect (original functionality)
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
          text: "Na",
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
          text: "Na",
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
          text: "Na",
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
          text: "Na",
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
          text: "Na",
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
          text: "Na",
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

  // Handle No button hover - with delay (desktop only) (original)
  const handleNoMouseEnter = () => {
    if (isMobile) return;
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

  // Handle touch/click on No (instant for mobile) (original)
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

  // Handle Yes (original)
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

  // Cleanup timeout on unmount (original)
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Hint text (original)
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

  // ============ STYLES ============
  const styles: { [key: string]: CSSProperties } = {
    container: {
      minHeight: "100dvh",
      background: "linear-gradient(to bottom, #111 0%, #000 50%, #111 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      position: "relative",
      overflow: "hidden",
      fontFamily: '"Arial", sans-serif',
    },
    
    // Theatre screen
    screenContainer: {
      width: "100%",
      maxWidth: "800px",
      margin: "2rem auto",
      position: "relative",
      zIndex: 10,
    },
    
    screen: {
      width: "100%",
      aspectRatio: "16/9",
      background: "linear-gradient(135deg, #000428, #004e92)",
      borderRadius: "10px",
      boxShadow: `
        0 0 100px rgba(0, 150, 255, 0.3),
        inset 0 0 50px rgba(0, 0, 0, 0.7),
        0 0 0 2px rgba(255, 255, 255, 0.1)
      `,
      position: "relative",
      overflow: "hidden",
    },
    
    screenContent: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      textShadow: "0 0 10px rgba(255,255,255,0.5)",
      zIndex: 2,
      padding: "2rem",
      textAlign: "center",
    },
    
    questionText: {
      fontSize: isMobile ? "1.5rem" : "2.5rem",
      fontWeight: 800,
      color: "#FFD700",
      textShadow: "0 0 30px rgba(255, 215, 0, 0.9)",
      margin: "1rem 0",
      textAlign: "center",
      animation: "pulse 2s infinite",
    },
    
    // Message Popup (original)
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
    
    celebrationParticle: {
      position: "fixed",
      fontSize: isMobile ? "1.2rem" : "1.8rem",
      pointerEvents: "none",
      zIndex: 15,
      animation: "float-up 2s ease-out forwards",
    },
    
    // Progress indicator (original)
    progressContainer: {
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      zIndex: 10,
    },
    
    dotsContainer: {
      display: "flex",
      gap: "8px",
    },
    
    dot: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: "#333",
      transition: "all 0.3s",
    },
    
    activeDot: {
      background: "#ef4444",
      transform: "scale(1.3)",
      boxShadow: "0 0 10px #ef4444",
    },
    
    completedDot: {
      background: "#22c55e",
      boxShadow: "0 0 10px #22c55e",
    },
    
    hintText: {
      color: "#888",
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      textAlign: "center",
      background: "rgba(0,0,0,0.7)",
      padding: "5px 15px",
      borderRadius: "20px",
      border: "1px solid #444",
    },
    
    // Success screen (original)
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
      fontSize: isMobile ? "2.5rem" : "3.5rem",
      fontWeight: 900,
      color: "white",
      marginBottom: "0.5rem",
      textAlign: "center",
      textShadow: "0 0 20px rgba(255, 255, 255, 0.7)",
    },
    
    successSubtitle: {
      fontSize: isMobile ? "1.2rem" : "1.5rem",
      color: "rgba(255,255,255,0.9)",
      marginBottom: "1rem",
      textAlign: "center",
    },
    
    successMessage: {
      fontSize: isMobile ? "1rem" : "1.2rem",
      color: "rgba(255,255,255,0.8)",
      marginTop: "2rem",
      textAlign: "center",
    },
    
    confetti: {
      position: "fixed",
      fontSize: isMobile ? "1.5rem" : "2rem",
      pointerEvents: "none",
      zIndex: 1001,
    },
  };

  // ============ TICKET COMPONENTS ============

  // Yes Ticket Component (Fixed position)
  const YesTicket = () => {
    const ticketStyle: CSSProperties = {
      position: "fixed",
      bottom: isMobile ? "100px" : "120px",
      left: isMobile ? "50%" : "30%",
      // transform: "translateX(-50%)",
      width: isMobile ? "140px" : "200px",
      height: isMobile ? "100px" : "140px",
      background: "linear-gradient(to bottom, #ef4444, #dc2626)",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      overflow: "visible",
      zIndex: 999, // HIGH Z-INDEX
      transition: "all 0.3s ease",
      transformOrigin: "center center",
      boxShadow: isYesHovered 
        ? "0 20px 50px rgba(239, 68, 68, 0.7), 0 0 0 3px rgba(239, 68, 68, 0.3)" 
        : "0 10px 30px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.1)",
      transform: isYesHovered ? "translateX(-50%) scale(1.1)" : "translateX(-50%) scale(1)",
    };

    const containerStyle: CSSProperties = {
      padding: "15px",
      height: "100%",
      position: "relative",
      zIndex: 2,
      background: "white",
      margin: "2px",
      borderRadius: "10px",
      border: "2px dashed #ef4444",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    };

    const headerStyle: CSSProperties = {
      textAlign: "center" as const,
      marginBottom: "8px",
      paddingBottom: "6px",
      borderBottom: "3px double #ef4444",
    };

    const theatreNameStyle: CSSProperties = {
      fontSize: isMobile ? "14px" : "18px",
      fontWeight: "bold",
      color: "#ef4444",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginBottom: "4px",
    };

    const mainContentStyle: CSSProperties = {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "8px",
      marginBottom: "8px",
    };

    const movieInfoStyle: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    };

    const movieTitleStyle: CSSProperties = {
      fontSize: isMobile ? "11px" : "14px",
      fontWeight: "bold",
      color: "#2F4F4F",
      lineHeight: "1.3",
    };

    const detailsStyle: CSSProperties = {
      fontSize: isMobile ? "8px" : "10px",
      color: "#696969",
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    };

    const seatInfoStyle: CSSProperties = {
      background: "#ef4444",
      color: "white",
      padding: "6px",
      borderRadius: "6px",
      textAlign: "center" as const,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    };

    const seatLabelStyle: CSSProperties = {
      fontSize: "7px",
      opacity: "0.8",
      marginBottom: "2px",
    };

    const seatValueStyle: CSSProperties = {
      fontSize: isMobile ? "16px" : "20px",
      fontWeight: "bold",
    };

    const ticketNumberStyle: CSSProperties = {
      textAlign: "center" as const,
      fontSize: isMobile ? "9px" : "11px",
      color: "#ef4444",
      fontWeight: "bold",
      letterSpacing: "2px",
      padding: "4px",
      background: "#FFFACD",
      borderRadius: "4px",
      border: "1px solid #ef4444",
    };

    return (
      <button
        style={ticketStyle}
        onClick={handleYes}
        onMouseEnter={() => !isMobile && setIsYesHovered(true)}
        onMouseLeave={() => !isMobile && setIsYesHovered(false)}
        onTouchStart={() => setIsYesHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsYesHovered(false), 100)}
      >
        <div style={containerStyle}>
          <div style={headerStyle}>
            <div style={theatreNameStyle}>YES TICKET</div>
            <div style={{ fontSize: isMobile ? "9px" : "11px", color: "#696969" }}>
              {yesText}
            </div>
          </div>

          <div style={mainContentStyle}>
            <div style={movieInfoStyle}>
              <div style={movieTitleStyle}>PERMANENT MOVIE PARTNER?</div>
              <div style={detailsStyle}>
                <div><strong>SHOW:</strong> Forever</div>
                <div><strong>RATING:</strong> 💖💖💖💖💖</div>
                <div><strong>PRICE:</strong> Your Heart ❤️</div>
              </div>
            </div>

            <div style={seatInfoStyle}>
              <div style={seatLabelStyle}>ROW</div>
              <div style={seatValueStyle}>🥰</div>
              <div style={{ ...seatLabelStyle, marginTop: "4px" }}>SEAT</div>
              <div style={seatValueStyle}>❤️</div>
            </div>
          </div>

          <div style={ticketNumberStyle}>
            TICKET: YES-{String(attemptCount + 1).padStart(3, '0')}
          </div>
        </div>
      </button>
    );
  };

  // No Ticket Component (Movable)
  const NoTicket = () => {
    const ticketWrapperStyle: CSSProperties = {
      position: "fixed",
      zIndex: 1000, // HIGHEST Z-INDEX TO GO ABOVE EVERYTHING
      transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      top: noState.position.top,
      left: noState.position.left,
      transform: `translate(-50%, -50%) rotate(${noState.rotation}deg)`,
      opacity: noState.opacity,
    };

    const ticketStyle: CSSProperties = {
      position: "relative",
      width: isMobile ? "140px" : "200px",
      height: isMobile ? "100px" : "140px",
      background: "linear-gradient(to bottom, #ef4444, #dc2626)",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      overflow: "visible",
      transform: `scale(${noState.scale})`,
      transition: "transform 0.3s, box-shadow 0.3s",
      boxShadow: isHoveringNo 
        ? "0 20px 50px rgba(239, 68, 68, 0.7), 0 0 0 3px rgba(239, 68, 68, 0.3)" 
        : "0 10px 30px rgba(239, 68, 68, 0.4), 0 0 0 2px rgba(255,255,255,0.1)",
      animation: noState.effect === "jelly" && isAnimating ? "shake 0.3s ease-in-out infinite" : "none",
    };

    const containerStyle: CSSProperties = {
      padding: "15px",
      height: "100%",
      position: "relative",
      zIndex: 2,
      background: "white",
      margin: "2px",
      borderRadius: "10px",
      border: "2px dashed #ef4444",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    };

    const headerStyle: CSSProperties = {
      textAlign: "center" as const,
      marginBottom: "8px",
      paddingBottom: "6px",
      borderBottom: "3px double #ef4444",
    };

    const theatreNameStyle: CSSProperties = {
      fontSize: isMobile ? "14px" : "18px",
      fontWeight: "bold",
      color: "#ef4444",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginBottom: "4px",
    };

    const mainContentStyle: CSSProperties = {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "8px",
      marginBottom: "8px",
    };

    const movieInfoStyle: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    };

    const movieTitleStyle: CSSProperties = {
      fontSize: isMobile ? "11px" : "14px",
      fontWeight: "bold",
      color: "#2F4F4F",
      lineHeight: "1.3",
    };

    const detailsStyle: CSSProperties = {
      fontSize: isMobile ? "8px" : "10px",
      color: "#696969",
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    };

    const seatInfoStyle: CSSProperties = {
      background: "#ef4444",
      color: "white",
      padding: "6px",
      borderRadius: "6px",
      textAlign: "center" as const,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    };

    const seatLabelStyle: CSSProperties = {
      fontSize: "7px",
      opacity: "0.8",
      marginBottom: "2px",
    };

    const seatValueStyle: CSSProperties = {
      fontSize: isMobile ? "16px" : "20px",
      fontWeight: "bold",
    };

    const ticketNumberStyle: CSSProperties = {
      textAlign: "center" as const,
      fontSize: isMobile ? "9px" : "11px",
      color: "#ef4444",
      fontWeight: "bold",
      letterSpacing: "2px",
      padding: "4px",
      background: "#FFFACD",
      borderRadius: "4px",
      border: "1px solid #ef4444",
    };

    return (
      <div style={ticketWrapperStyle}>
        <button
          style={ticketStyle}
          onMouseEnter={handleNoMouseEnter}
          onMouseLeave={handleNoMouseLeave}
          onTouchStart={(e) => {
            e.preventDefault();
            handleNoClick();
          }}
          onClick={handleNoClick}
        >
          <div style={containerStyle}>
            <div style={headerStyle}>
              <div style={theatreNameStyle}>NO TICKET</div>
              <div style={{ fontSize: isMobile ? "9px" : "11px", color: "#696969" }}>
                {noState.text}
              </div>
            </div>

            <div style={mainContentStyle}>
              <div style={movieInfoStyle}>
                <div style={movieTitleStyle}>MOVIE PARTNER?</div>
                <div style={detailsStyle}>
                  <div><strong>SHOW:</strong> Running</div>
                  <div><strong>RATING:</strong> 😂😂😂😂</div>
                  <div><strong>PRICE:</strong> Free 😜</div>
                </div>
              </div>

              <div style={seatInfoStyle}>
                <div style={seatLabelStyle}>ROW</div>
                <div style={seatValueStyle}>🏃</div>
                <div style={{ ...seatLabelStyle, marginTop: "4px" }}>SEAT</div>
                <div style={seatValueStyle}>💨</div>
              </div>
            </div>

            <div style={ticketNumberStyle}>
              TICKET: NO-{String(attemptCount + 1).padStart(3, '0')}
            </div>
          </div>
        </button>
      </div>
    );
  };

  // Success Screen (original)
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

        <p style={{ ...styles.successMessage, fontSize: isMobile ? "0.9rem" : "1.1rem" }}>
          (Dekh! Na bolte parli na 😏)
        </p>
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
            ...styles.celebrationParticle,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Message Popup */}
      {message && <div style={styles.messagePopup}>{message}</div>}

      {/* Screen */}
      <div style={styles.screenContainer}>
        <div style={styles.screen}>
          <div style={styles.screenContent}>
            <div style={styles.questionText}>
              Can I be your permanent<br />
              movie partner? 🍿🎬
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Buttons */}
      <YesTicket />
      <NoTicket />

      {/* Progress Indicator */}
      <div style={styles.progressContainer}>
        <div style={styles.dotsContainer}>
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
        <div style={styles.hintText}>
          {getHintText()} | Try: {attemptCount}/{effectSequence.length}
        </div>
      </div>
    </div>
  );
}