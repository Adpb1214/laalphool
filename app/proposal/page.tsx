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

// Original texts with some additions
const effectTexts: Record<EffectType, string[]> = {
  escape: [
    "Dhur! Pakka na! 😂",
    "Uff! Esho na! 🏃",
    "Hagun! Dheere aao! 😜",
    "Areh! Rasto bhalo na! 😏",
    "Chole gelam! Bye! 💨",
  ],
  shrink: [
    "Chhoto hobo na! 🤏",
    "Bhalo moto dekh! 🔍",
    "Ki chhoto! Eto! 🐜",
    "Chokh bondho koro! 👀",
    "Bari theke dekho! 😂",
  ],
  spin: [
    "Ghum asche! 🌀",
    "Ghurte ghurte! 💫",
    "Bandho kor! Bondhu! 😵‍💫",
    "Tham! Ektu tham! 🌀",
    "Round er modhye! 🔄",
  ],
  fade: [
    "Jabo na! 👻",
    "Ami ekhane! 😏",
    "Paucho ki? 🫥",
    "Tor chokhe kajal! 👻",
    "Uff re baba! 🙈",
  ],
  jelly: [
    "Chhuish na! 😰",
    "Ke jani! 🥴",
    "Kaanpe na! 😱",
    "Darao na! 😨",
    "Hayre! Eta ki! 🥺",
  ],
  dead: ["Hoilo! 💀", "Shesh! ☠️", "Chole gelam bhai! 🪦"],
};

// YES button hover texts
const yesHoverTexts = [
  "Haan re! 💚",
  "Ami to ready! 🥺",
  "Bolo bolo! 😍",
  "Hurry! Jao! 🎉",
  "Cholo cinema! 💖",
  "Ticket katbo! ✨",
  "Ami to khushi! 🥰",
  "Hurry up! 💕",
  "Book kori! 🎬",
  "Cholo jai! 🍿",
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
  "🎬",
  "🍿",
  "🎫",
  "🌟",
  "💫",
  "💘",
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
    position: { top: "50%", left: "60%" },
    scale: 1,
    rotation: 0,
    opacity: 1,
    text: "Na",
  });
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [confetti, setConfetti] = useState<
    Array<{ id: number; left: string; emoji: string; top: number }>
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

  // Theatre effects
  const [spotlightLeft, setSpotlightLeft] = useState(0);
  const [spotlightRight, setSpotlightRight] = useState(100);
  const [isSpotlightOn, setIsSpotlightOn] = useState(false);
  const [screenText, setScreenText] = useState("");

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

  // Start theatre sequence with spotlight animation
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setScreenText("🎬 Tonight's Special Presentation 🎭");
    }, 1000);

    const timer2 = setTimeout(() => {
      setScreenText("❤️ A Question i wanted to ask for the Ages ❤️");
    }, 2500);

    const timer3 = setTimeout(() => {
      setScreenText("");
      // Start spotlight animation
      setIsSpotlightOn(true);
      setSpotlightLeft(-20);
      setSpotlightRight(120);
      
      // Bring spotlights to center
      setTimeout(() => {
        setSpotlightLeft(30);
        setSpotlightRight(70);
      }, 500);
      
      setTimeout(() => {
        setSpotlightLeft(40);
        setSpotlightRight(60);
      }, 1000);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Yes button hover effect - FASTER
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isYesHovered) {
      interval = setInterval(() => {
        setYesTextIndex((prev) => {
          const next = (prev + 1) % yesHoverTexts.length;
          setYesText(yesHoverTexts[next]);
          return next;
        });
      }, 400); // Faster: 400ms instead of 600ms
    } else {
      setYesText("Haan! 💚");
      setYesTextIndex(0);
    }

    return () => clearInterval(interval);
  }, [isYesHovered]);

  // Celebration particles for Yes button
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

        setCelebrationParticles((prev) => [...prev.slice(-15), newParticle]);
      }, 200);
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

  // Get random position - FASTER ESCAPE
  const getRandomPosition = () => {
    const vw = screenSize.width || window.innerWidth;
    const vh = screenSize.height || window.innerHeight;

    // Wider tickets
    const ticketWidth = isMobile ? 180 : 280;
    const ticketHeight = isMobile ? 120 : 160;

    // Safe margins
    const marginX = isMobile ? 20 : 40;
    const marginBottom = isMobile ? 100 : 150;

    // More extreme positions for faster escape
    const minX = marginX;
    const maxX = vw - ticketWidth - marginX;
    const minY = vh * 0.3; // Higher up
    const maxY = vh - ticketHeight - marginBottom;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    return {
      left: `${randomX}px`,
      top: `${randomY}px`,
    };
  };

  // Apply effect - FASTER ANIMATIONS
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
          rotation: Math.random() * 20 - 10, // Slight random rotation
          opacity: 1,
          text: "Na!",
        }));
        break;

      case "shrink":
        setNoState((prev) => ({
          ...prev,
          effect: "shrink",
          position: newPos,
          scale: 0.5, // Smaller
          rotation: 0,
          opacity: 1,
          text: "Chhoto!",
        }));
        break;

      case "spin":
        setNoState((prev) => ({
          ...prev,
          effect: "spin",
          position: newPos,
          scale: 1,
          rotation: prev.rotation + 1080, // More spins
          opacity: 1,
          text: "Ghuri!",
        }));
        break;

      case "fade":
        setNoState((prev) => ({
          ...prev,
          effect: "fade",
          position: newPos,
          scale: 1,
          rotation: 0,
          opacity: 0.2, // More transparent
          text: "Gayab!",
        }));
        break;

      case "jelly":
        setNoState((prev) => ({
          ...prev,
          effect: "jelly",
          position: newPos,
          scale: 1.2, // Bigger when jelly
          rotation: 0,
          opacity: 1,
          text: "Kaap!",
        }));
        break;

      case "dead":
        setNoState((prev) => ({
          ...prev,
          effect: "dead",
          position: { top: `${window.innerHeight - 100}px`, left: prev.position.left },
          scale: 0.8,
          rotation: 90,
          opacity: 0.3,
          text: "Shesh!",
        }));
        setTimeout(() => {
          handleYes();
        }, 1000); // Faster transition to success
        break;
    }

    setTimeout(() => {
      setMessage("");
      setIsAnimating(false);
    }, 800); // Faster message display
  };

  // Handle No button hover - SHORTER DELAY (300ms instead of 500ms)
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
    }, 300); // Shorter: 300ms instead of 500ms
  };

  const handleNoMouseLeave = () => {
    setIsHoveringNo(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  // Handle touch/click on No - INSTANT
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
    
    // Create confetti from bottom
    const newConfetti = Array.from({ length: isMobile ? 80 : 120 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: 100 + Math.random() * 20,
      emoji: celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)],
    }));
    setConfetti(newConfetti);
  };

  // Cleanup
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
      "Careful... button bhage! 👀",
      "Oho! Paliye gelo! 😂",
      "Smart button re! 🏃",
      "Ebar dhor! 💫",
      "Dhoro na ke! 😭",
      "Shesh hoye gelo! 🪦",
    ];
    return hints[Math.min(attemptCount, hints.length - 1)];
  };

  // ============ STYLES ============
  const styles: { [key: string]: CSSProperties } = {
    container: {
      minHeight: "100dvh",
      background: "linear-gradient(to bottom, #000 0%, #111 30%, #222 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      position: "relative",
      overflow: "hidden",
      fontFamily: '"Segoe UI", "Arial", sans-serif',
    },
    
    // Theatre screen
    screenContainer: {
      width: "100%",
      maxWidth: "900px",
      margin: "40px auto 20px",
      position: "relative",
      zIndex: 10,
    },
    
    screen: {
      width: "100%",
      aspectRatio: "21/9", // Wider cinema screen
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
      borderRadius: "8px",
      boxShadow: `
        0 0 150px rgba(0, 150, 255, 0.4),
        inset 0 0 80px rgba(0, 0, 0, 0.9),
        0 0 0 3px rgba(255, 215, 0, 0.3)
      `,
      position: "relative",
      overflow: "hidden",
      border: "1px solid rgba(255, 215, 0, 0.2)",
    },
    
    screenContent: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFD700",
      textShadow: "0 0 20px rgba(255, 215, 0, 0.7)",
      zIndex: 2,
      padding: "2rem",
      textAlign: "center",
    },
    
    screenText: {
      fontSize: isMobile ? "1.2rem" : "1.8rem",
      fontWeight: 600,
      color: "#FFD700",
      opacity: 0.8,
      transition: "all 1s ease",
      textAlign: "center",
      maxWidth: "90%",
      lineHeight: 1.4,
    },
    
    questionText: {
      fontSize: isMobile ? "1.8rem" : "3rem",
      fontWeight: 900,
      color: "#FFD700",
      textShadow: "0 0 40px rgba(255, 215, 0, 0.9), 0 0 20px rgba(255, 215, 0, 0.6)",
      margin: "1rem 0",
      textAlign: "center",
      animation: "pulse 2s infinite, text-glow 3s ease-in-out infinite",
      lineHeight: "1.3",
    },
    
    foreverText: {
      fontSize: isMobile ? "1.2rem" : "2rem",
      fontWeight: 700,
      color: "#FF6347",
      textShadow: "0 0 20px rgba(255, 99, 71, 0.7)",
      marginTop: "0.5rem",
      animation: "fade-in-out 3s infinite",
    },
    
    // Audience area with seats
    audienceArea: {
      width: "100%",
      maxWidth: "900px",
      margin: "20px auto",
      position: "relative",
      zIndex: 5,
    },
    
    audienceRow: {
      display: "flex",
      justifyContent: "center",
      gap: isMobile ? "8px" : "12px",
      marginBottom: isMobile ? "10px" : "15px",
    },
    
    audienceMember: {
      width: isMobile ? "25px" : "35px",
      height: isMobile ? "35px" : "45px",
      background: "linear-gradient(to bottom, #333, #222)",
      borderRadius: "5px 5px 2px 2px",
      boxShadow: "inset 0 0 8px rgba(0,0,0,0.6)",
      position: "relative",
    },
    
    audienceHead: {
      position: "absolute",
      top: "5px",
      left: "50%",
      transform: "translateX(-50%)",
      width: isMobile ? "15px" : "20px",
      height: isMobile ? "15px" : "20px",
      background: "linear-gradient(to bottom, #444, #333)",
      borderRadius: "50%",
    },
    
    // Spotlights from bottom
    spotlightContainer: {
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      height: "300px",
      zIndex: 3,
      overflow: "hidden",
      pointerEvents: "none",
    },
    
    spotlightLeft: {
      position: "absolute",
      bottom: "0",
      left: `${spotlightLeft}%`,
      width: "200px",
      height: "200px",
      background: "radial-gradient(ellipse at center, rgba(255,215,0,0.4) 0%, rgba(255,215,0,0.1) 40%, transparent 70%)",
      filter: "blur(20px)",
      transform: "translateX(-50%)",
      opacity: isSpotlightOn ? 1 : 0,
      transition: "all 1.5s ease-out",
    },
    
    spotlightRight: {
      position: "absolute",
      bottom: "0",
      left: `${spotlightRight}%`,
      width: "200px",
      height: "200px",
      background: "radial-gradient(ellipse at center, rgba(255,99,71,0.4) 0%, rgba(255,99,71,0.1) 40%, transparent 70%)",
      filter: "blur(20px)",
      transform: "translateX(-50%)",
      opacity: isSpotlightOn ? 1 : 0,
      transition: "all 1.5s ease-out",
    },
    
    // Message Popup
    messagePopup: {
      position: "fixed",
      top: isMobile ? "15%" : "20%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0, 0, 0, 0.95)",
      color: "#FF6347",
      padding: isMobile ? "1rem 1.5rem" : "1.5rem 2.5rem",
      borderRadius: "50px",
      fontSize: isMobile ? "1.1rem" : "1.4rem",
      fontWeight: 700,
      zIndex: 100,
      animation: "pop 0.3s ease-out",
      border: "3px solid #FF6347",
      textAlign: "center",
      whiteSpace: "nowrap",
      maxWidth: "90vw",
      boxShadow: "0 0 30px rgba(255, 99, 71, 0.5)",
    },
    
    celebrationParticle: {
      position: "fixed",
      fontSize: isMobile ? "1.5rem" : "2rem",
      pointerEvents: "none",
      zIndex: 15,
      animation: "float-up 2s ease-out forwards",
    },
    
    // Progress indicator
    progressContainer: {
      position: "absolute",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px",
      zIndex: 10,
    },
    
    dotsContainer: {
      display: "flex",
      gap: "10px",
    },
    
    dot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: "#444",
      transition: "all 0.3s",
      boxShadow: "inset 0 0 5px rgba(0,0,0,0.5)",
    },
    
    activeDot: {
      background: "#FF6347",
      transform: "scale(1.4)",
      boxShadow: "0 0 15px #FF6347",
    },
    
    completedDot: {
      background: "#22c55e",
      boxShadow: "0 0 15px #22c55e",
    },
    
    hintText: {
      color: "#aaa",
      fontSize: isMobile ? "0.9rem" : "1rem",
      textAlign: "center",
      background: "rgba(0,0,0,0.8)",
      padding: "8px 20px",
      borderRadius: "25px",
      border: "2px solid #444",
      backdropFilter: "blur(10px)",
    },
    
    // Success screen
    successOverlay: {
      position: "fixed",
      inset: 0,
      background: "linear-gradient(135deg, #000428, #004e92, #000428)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "2rem",
      overflow: "hidden",
    },
    
    successEmoji: {
      fontSize: isMobile ? "5rem" : "7rem",
      marginBottom: "1rem",
      animation: "heart-beat 1s ease-in-out infinite, rotate-slow 10s linear infinite",
    },
    
    successTitle: {
      fontSize: isMobile ? "3rem" : "4rem",
      fontWeight: 900,
      color: "#FFD700",
      marginBottom: "0.5rem",
      textAlign: "center",
      textShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
      animation: "pulse 2s infinite",
    },
    
    successSubtitle: {
      fontSize: isMobile ? "1.5rem" : "2rem",
      color: "#fff",
      marginBottom: "1rem",
      textAlign: "center",
      textShadow: "0 0 10px rgba(255,255,255,0.5)",
    },
    
    successMessage: {
      fontSize: isMobile ? "1.1rem" : "1.3rem",
      color: "rgba(255,255,255,0.9)",
      marginTop: "2rem",
      textAlign: "center",
      maxWidth: "600px",
    },
    
    confetti: {
      position: "fixed",
      fontSize: isMobile ? "1.8rem" : "2.5rem",
      pointerEvents: "none",
      zIndex: 1001,
    },
  };

  // Generate audience rows
  const renderAudience = () => {
    const rows = isMobile ? 4 : 6;
    const peoplePerRow = isMobile ? 10 : 15;
    
    return Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} style={styles.audienceRow}>
        {Array.from({ length: peoplePerRow }).map((_, personIndex) => (
          <div
            key={personIndex}
            style={{
              ...styles.audienceMember,
              opacity: 0.2 + (Math.random() * 0.6),
            }}
          >
            <div style={styles.audienceHead} />
          </div>
        ))}
      </div>
    ));
  };

  // ============ TICKET COMPONENTS ============

  // Yes Ticket Component - WIDER AND BIGGER
  const YesTicket = () => {
    const ticketStyle: CSSProperties = {
      position: "fixed",
      bottom: isMobile ? "120px" : "150px",
      right: isMobile ? "50%" : "25%",
      // transform: "translateX(50%)",
      width: isMobile ? "200px" : "320px",
      height: isMobile ? "140px" : "180px",
      background: "linear-gradient(145deg, #22c55e, #16a34a, #22c55e)",
      border: "none",
      borderRadius: "15px",
      cursor: "pointer",
      overflow: "visible",
      zIndex: 999,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      transformOrigin: "center center",
      boxShadow: isYesHovered 
        ? "0 25px 60px rgba(34, 197, 94, 0.7), 0 0 0 4px rgba(34, 197, 94, 0.4), inset 0 0 20px rgba(255,255,255,0.3)" 
        : "0 15px 40px rgba(0,0,0,0.5), 0 0 0 3px rgba(255,255,255,0.1), inset 0 0 10px rgba(255,255,255,0.1)",
      transform: isYesHovered ? "translateX(50%) scale(1.15)" : "translateX(50%) scale(1)",
    };

    const containerStyle: CSSProperties = {
      padding: "20px",
      height: "100%",
      position: "relative",
      zIndex: 2,
      background: "white",
      margin: "3px",
      borderRadius: "12px",
      border: "3px dashed #22c55e",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    };

    const headerStyle: CSSProperties = {
      textAlign: "center" as const,
      marginBottom: "12px",
      paddingBottom: "10px",
      borderBottom: "4px double #22c55e",
      width: "100%",
    };

    const theatreNameStyle: CSSProperties = {
      fontSize: isMobile ? "18px" : "24px",
      fontWeight: "bold",
      color: "#22c55e",
      letterSpacing: "3px",
      textTransform: "uppercase",
      marginBottom: "6px",
      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
    };

    const mainContentStyle: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginBottom: "12px",
      width: "100%",
      alignItems: "center",
    };

    const movieTitleStyle: CSSProperties = {
      fontSize: isMobile ? "14px" : "18px",
      fontWeight: "bold",
      color: "#2F4F4F",
      lineHeight: "1.3",
      textAlign: "center" as const,
    };

    const detailsStyle: CSSProperties = {
      fontSize: isMobile ? "10px" : "12px",
      color: "#696969",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: "0 10px",
    };

    const ticketNumberStyle: CSSProperties = {
      textAlign: "center" as const,
      fontSize: isMobile ? "11px" : "14px",
      color: "#22c55e",
      fontWeight: "bold",
      letterSpacing: "3px",
      padding: "8px 15px",
      background: "linear-gradient(to right, #FFFACD, #FFF8DC)",
      borderRadius: "6px",
      border: "2px solid #22c55e",
      marginTop: "8px",
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
            <div style={theatreNameStyle}>YES! 🎫</div>
            <div style={{ 
              fontSize: isMobile ? "12px" : "16px", 
              color: "#696969",
              fontWeight: "600",
              animation: "text-color-change 2s infinite"
            }}>
              {yesText}
            </div>
          </div>

          <div style={mainContentStyle}>
            <div style={movieTitleStyle}>I WILL BE YOUR<br />MOVIE PARTNER! ❤️</div>
            <div style={detailsStyle}>
              <div><strong>SHOW:</strong> Forever</div>
              <div><strong>SEAT:</strong> Heart ❤️</div>
              <div><strong>TIME:</strong> Always</div>
            </div>
          </div>

          <div style={ticketNumberStyle}>
            TICKET #: LOV-{String(attemptCount + 101).padStart(3, '0')}
          </div>
        </div>
      </button>
    );
  };

  // No Ticket Component - WIDER AND ESCAPES FASTER
  const NoTicket = () => {
    const ticketWrapperStyle: CSSProperties = {
      position: "fixed",
      zIndex: 1000,
      transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)", // Faster transition
      top: noState.position.top,
      left: noState.position.left,
      transform: `translate(-50%, -50%) rotate(${noState.rotation}deg) scale(${noState.scale})`,
      opacity: noState.opacity,
    };

    const ticketStyle: CSSProperties = {
      position: "relative",
      width: isMobile ? "200px" : "320px",
      height: isMobile ? "140px" : "180px",
      background: "linear-gradient(145deg, #ef4444, #dc2626, #ef4444)",
      border: "none",
      borderRadius: "15px",
      cursor: "pointer",
      overflow: "visible",
      transition: "transform 0.2s, box-shadow 0.2s",
      boxShadow: isHoveringNo 
        ? "0 25px 60px rgba(239, 68, 68, 0.7), 0 0 0 4px rgba(239, 68, 68, 0.4), inset 0 0 20px rgba(255,255,255,0.3)" 
        : "0 15px 40px rgba(239, 68, 68, 0.4), 0 0 0 3px rgba(255,255,255,0.1), inset 0 0 10px rgba(255,255,255,0.1)",
      animation: noState.effect === "jelly" && isAnimating ? "jelly-shake 0.2s ease-in-out infinite" : "none",
    };

    const containerStyle: CSSProperties = {
      padding: "20px",
      height: "100%",
      position: "relative",
      zIndex: 2,
      background: "white",
      margin: "3px",
      borderRadius: "12px",
      border: "3px dashed #ef4444",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    };

    const headerStyle: CSSProperties = {
      textAlign: "center" as const,
      marginBottom: "12px",
      paddingBottom: "10px",
      borderBottom: "4px double #ef4444",
      width: "100%",
    };

    const theatreNameStyle: CSSProperties = {
      fontSize: isMobile ? "18px" : "24px",
      fontWeight: "bold",
      color: "#ef4444",
      letterSpacing: "3px",
      textTransform: "uppercase",
      marginBottom: "6px",
      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
    };

    const mainContentStyle: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginBottom: "12px",
      width: "100%",
      alignItems: "center",
    };

    const movieTitleStyle: CSSProperties = {
      fontSize: isMobile ? "14px" : "18px",
      fontWeight: "bold",
      color: "#2F4F4F",
      lineHeight: "1.3",
      textAlign: "center" as const,
    };

    const detailsStyle: CSSProperties = {
      fontSize: isMobile ? "10px" : "12px",
      color: "#696969",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: "0 10px",
    };

    const ticketNumberStyle: CSSProperties = {
      textAlign: "center" as const,
      fontSize: isMobile ? "11px" : "14px",
      color: "#ef4444",
      fontWeight: "bold",
      letterSpacing: "3px",
      padding: "8px 15px",
      background: "linear-gradient(to right, #FFFACD, #FFF8DC)",
      borderRadius: "6px",
      border: "2px solid #ef4444",
      marginTop: "8px",
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
              <div style={theatreNameStyle}>NO! 🏃</div>
              <div style={{ 
                fontSize: isMobile ? "12px" : "16px", 
                color: "#696969",
                fontWeight: "600",
                fontStyle: "italic"
              }}>
                {noState.text}
              </div>
            </div>

            <div style={mainContentStyle}>
              <div style={movieTitleStyle}>MOVIE PARTNER?<br />NAH! RUNNING AWAY! 💨</div>
              <div style={detailsStyle}>
                <div><strong>SHOW:</strong> Running</div>
                <div><strong>SEAT:</strong> Gone 😂</div>
                <div><strong>TIME:</strong> Never</div>
              </div>
            </div>

            <div style={ticketNumberStyle}>
              TICKET #: RUN-{String(attemptCount + 1).padStart(3, '0')}
            </div>
          </div>
        </button>
      </div>
    );
  };

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
              top: `${c.top}%`,
              animation: `confetti-rise ${1.5 + Math.random() * 1}s ease-out forwards`,
              animationDelay: `${Math.random() * 0.3}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {c.emoji}
          </span>
        ))}

        <span style={styles.successEmoji}>🎬💖</span>

        <h1 style={styles.successTitle}>CINEMA DATE CONFIRMED! 🎉</h1>

        <p style={styles.successSubtitle}>Can I be your movie partner? FOREVER ACCEPTED! ❤️</p>

        <p style={styles.successMessage}>
          &#34;Forever and ever and ever...&ldquo; starts now!<br />
          Get ready for unlimited movies together! 🍿✨
        </p>

        <p style={{ 
          ...styles.successMessage, 
          fontSize: isMobile ? "1rem" : "1.2rem",
          color: "rgba(255, 215, 0, 0.9)",
          marginTop: "3rem"
        }}>
          (Tried to run, but love for cinema caught you! 😏)
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container} ref={containerRef}>
      {/* Spotlights from bottom */}
      <div style={styles.spotlightContainer}>
        <div style={styles.spotlightLeft} />
        <div style={styles.spotlightRight} />
      </div>

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
      {message && <div style={styles.messagePopup}>🎭 {message} 🎥</div>}

      {/* Screen */}
      <div style={styles.screenContainer}>
        <div style={styles.screen}>
          <div style={styles.screenContent}>
            {screenText ? (
              <div style={styles.screenText}>{screenText}</div>
            ) : (
              <>
                <div style={styles.questionText}>
                  Can I be your Permanent movie partner?<br />
                  <span style={styles.foreverText}>
                    forever and ever and ever?(Because mujhe tujh jaisa partner milne nahi wala)
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Audience */}
      <div style={styles.audienceArea}>
        {renderAudience()}
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
          ⚡ {getHintText()} | Tries: {attemptCount}/{effectSequence.length} ⚡
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 40px rgba(255, 215, 0, 0.9), 0 0 20px rgba(255, 215, 0, 0.6); }
          50% { text-shadow: 0 0 60px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.8), 0 0 10px rgba(255, 215, 0, 0.4); }
        }
        
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes pop {
          0% { transform: translateX(-50%) scale(0.5); opacity: 0; }
          70% { transform: translateX(-50%) scale(1.1); opacity: 1; }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }
        
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes jelly-shake {
          0%, 100% { transform: scale(1.2) rotate(0deg); }
          25% { transform: scale(1.2) rotate(5deg); }
          50% { transform: scale(1.2) rotate(-5deg); }
          75% { transform: scale(1.2) rotate(3deg); }
        }
        
        @keyframes heart-beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes confetti-rise {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes text-color-change {
          0% { color: #696969; }
          25% { color: #22c55e; }
          50% { color: #16a34a; }
          75% { color: #15803d; }
          100% { color: #696969; }
        }
      `}</style>
    </div>
  );
}