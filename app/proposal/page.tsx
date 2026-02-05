/* eslint-disable react-hooks/purity */
"use client";

import { useState, useRef, useEffect, CSSProperties } from "react";

// Effect types
type EffectType = "escape" | "shrink" | "spin" | "fade" | "jelly" | "dead";

interface NoButtonState {
  effect: EffectType;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  opacity: number;
  text: string;
}

// Texts for each effect - contextual!
const effectTexts: Record<EffectType, string[]> = {
  escape: [
    "Pakad ke dikha 😂",
    "Bhag bsdk 🏃",
    "Too slow! 💨",
    "Catch me if u can!",
    "Nikal lavde 🏃‍♂️",
  ],
  shrink: [
    "Chhota ho gaya 🤏",
    "Zoom lagao 🔍",
    "Ant size activated 🐜",
    "Micro mode on",
    "Dekh bhi pa rahi? 👀",
  ],
  spin: [
    "Chakkar aa gaya 🌀",
    "Wheeeee! 💫",
    "Ruk nahi paa raha",
    "Ghoom raha hun 🔄",
    "Help dizzy 😵‍💫",
  ],
  fade: [
    "Gayab 👻",
    "Dikh raha? 😏",
    "Poof! ✨",
    "Invisible mode 🫥",
    "Find me lol 🙈",
  ],
  jelly: [
    "Mat choo 😰",
    "Gudgudi 🥴",
    "Ahhhh! 😱",
    "Darr gaya 😨",
    "Please nahi 🥺",
  ],
  dead: [
    "Mar gaya ☠️",
    "RIP 💀",
    "Alvida 🪦",
    "Was nice knowing u",
    "Tell my story... 😵",
  ],
};

// Effect sequence - pehle escape, phir random
const effectSequence: EffectType[] = [
  "escape",
  "shrink",
  "spin",
  "fade",
  "jelly",
  "dead",
];

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fff1f2 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    position: "relative",
    overflow: "hidden",
  },
  videoContainer: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.15)",
    background: "#000",
    marginBottom: "2rem",
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
  question: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#1f2937",
    marginBottom: "2rem",
    textAlign: "center",
  },
  buttonsContainer: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "120px",
    position: "relative",
    width: "100%",
    maxWidth: "500px",
  },
  yesButton: {
    padding: "1rem 3rem",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "white",
    border: "none",
    borderRadius: "50px",
    fontSize: "1.2rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s",
    zIndex: 10,
  },
  noButton: {
    padding: "1rem 2.5rem",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "50px",
    fontSize: "1.1rem",
    fontWeight: 600,
    cursor: "pointer",
    position: "absolute",
    right: "50px",
    transition: "all 0.3s",
    transformOrigin: "center center",
  },
  messagePopup: {
    position: "fixed",
    top: "15%",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0, 0, 0, 0.85)",
    color: "white",
    padding: "1rem 2rem",
    borderRadius: "40px",
    fontSize: "1.2rem",
    fontWeight: 500,
    zIndex: 100,
    animation: "pop 0.3s ease-out",
    whiteSpace: "nowrap",
  },
  effectIndicator: {
    marginTop: "1.5rem",
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#e5e7eb",
    transition: "all 0.3s",
  },
  activeDot: {
    background: "#ef4444",
    transform: "scale(1.3)",
  },
  completedDot: {
    background: "#22c55e",
  },
  hintText: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#6b7280",
    textAlign: "center",
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
  },
  confetti: {
    position: "fixed",
    fontSize: "2rem",
    pointerEvents: "none",
    zIndex: 1001,
  },
};

export default function ProposalPage() {
  const [attemptCount, setAttemptCount] = useState(0);
  const [currentEffect, setCurrentEffect] = useState<EffectType>("escape");
  const [noState, setNoState] = useState<NoButtonState>({
    effect: "escape",
    position: { x: 0, y: 0 },
    scale: 1,
    rotation: 0,
    opacity: 1,
    text: "No",
  });
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [confetti, setConfetti] = useState<
    Array<{ id: number; left: string; emoji: string }>
  >([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Get random text for current effect
  const getRandomText = (effect: EffectType): string => {
    const texts = effectTexts[effect];
    return texts[Math.floor(Math.random() * texts.length)];
  };

  // Get random position for escape effect
  const getRandomPosition = () => {
    const maxX = 150;
    const maxY = 80;
    return {
      x: (Math.random() - 0.5) * maxX * 2,
      y: (Math.random() - 0.5) * maxY * 2,
    };
  };

  // Apply effect based on type
  const applyEffect = (effect: EffectType) => {
    setIsAnimating(true);
    const newText = getRandomText(effect);
    setMessage(newText);

    switch (effect) {
      case "escape":
        setNoState((prev) => ({
          ...prev,
          effect: "escape",
          position: getRandomPosition(),
          text: newText,
        }));
        break;

      case "shrink":
        setNoState((prev) => ({
          ...prev,
          effect: "shrink",
          scale: Math.max(0.3, prev.scale - 0.25),
          position: getRandomPosition(),
          text: newText,
        }));
        break;

      case "spin":
        setNoState((prev) => ({
          ...prev,
          effect: "spin",
          rotation: prev.rotation + 360,
          position: getRandomPosition(),
          text: newText,
        }));
        break;

      case "fade":
        setNoState((prev) => ({
          ...prev,
          effect: "fade",
          opacity: Math.max(0.2, prev.opacity - 0.3),
          position: getRandomPosition(),
          text: newText,
        }));
        break;

      case "jelly":
        setNoState((prev) => ({
          ...prev,
          effect: "jelly",
          position: getRandomPosition(),
          text: newText,
        }));
        break;

      case "dead":
        setNoState((prev) => ({
          ...prev,
          effect: "dead",
          rotation: 180,
          position: { x: prev.position.x, y: 150 },
          opacity: 0.5,
          text: newText,
        }));
        // After dead, trigger Yes after 1.5 sec
        setTimeout(() => {
          handleYes();
        }, 1500);
        break;
    }

    // Clear message after delay
    setTimeout(() => {
      setMessage("");
      setIsAnimating(false);
    }, 1500);
  };

  // Handle No button interaction
  const handleNoInteraction = () => {
    if (isAnimating) return;

    const newAttempt = attemptCount + 1;
    setAttemptCount(newAttempt);

    // Get effect based on attempt number
    let effect: EffectType;

    if (newAttempt <= effectSequence.length) {
      // Go through sequence
      effect = effectSequence[newAttempt - 1];
    } else {
      // Random after sequence complete (shouldn't reach here due to 'dead')
      effect =
        effectSequence[Math.floor(Math.random() * (effectSequence.length - 1))];
    }

    setCurrentEffect(effect);
    applyEffect(effect);
  };

  // Handle Yes
  const handleYes = () => {
    setShowSuccess(true);

    const emojis = ["🎉", "💖", "✨", "🥳", "💕", "🎊", "❤️", "💗", "😍", "🥰"];
    const newConfetti = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setConfetti(newConfetti);
  };

  // Get No button style based on current state
  const getNoButtonStyle = (): CSSProperties => {
    const baseStyle = { ...styles.noButton };

    let animation = "";

    if (noState.effect === "jelly" && isAnimating) {
      animation = "shake 0.5s ease-in-out infinite";
    } else if (noState.effect === "spin") {
      animation = "";
    }

    return {
      ...baseStyle,
      transform: `
        translate(${noState.position.x}px, ${noState.position.y}px) 
        scale(${noState.scale}) 
        rotate(${noState.rotation}deg)
      `,
      opacity: noState.opacity,
      animation,
      transition:
        noState.effect === "dead"
          ? "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
          : "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    };
  };

  // Hint text based on attempts
  const getHintText = () => {
    if (attemptCount === 0) return "Soch samajh ke choose karna... 👀";
    if (attemptCount === 1) return "Arre? Phir try kar 😂";
    if (attemptCount === 2) return "Button tujhse tez hai 🏃";
    if (attemptCount === 3) return "Haar maan le yaar 😭";
    if (attemptCount === 4) return "Last try... shayad 😏";
    if (attemptCount >= 5) return "Button ki aatma shanti se jaane do 🪦";
    return "";
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
              top: "-50px",
              animation: `confetti-fall ${2 + Math.random() * 2}s linear forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          >
            {c.emoji}
          </span>
        ))}

        <span
          style={{
            fontSize: "6rem",
            marginBottom: "1rem",
            animation: "heart-beat 1s ease-in-out infinite",
          }}
        >
          💖
        </span>

        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 700,
            color: "white",
            marginBottom: "0.5rem",
          }}
        >
          YESSSS!
        </h1>

        <p
          style={{
            fontSize: "1.3rem",
            color: "rgba(255,255,255,0.9)",
            marginBottom: "1rem",
          }}
        >
          I knew you&apos;d say yes! 🥰
        </p>

        <p
          style={{
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.8)",
            marginTop: "2rem",
          }}
        >
          Ab jaldi reply kar ✨
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container} ref={containerRef}>
      {/* Message Popup */}
      {message && <div style={styles.messagePopup}>{message}</div>}

      {/* Video */}
      <div style={styles.videoContainer}>
        {/* Replace with actual video */}
        {/*
        <video
          style={{ width: '100%', display: 'block' }}
          controls
          autoPlay
          src="/videos/proposal.mp4"
        />
        */}
        <div style={styles.videoPlaceholder}>
          <span style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎬</span>
          <span>Your Video Here</span>
          <span
            style={{ fontSize: "0.8rem", marginTop: "0.5rem", opacity: 0.7 }}
          >
            /videos/proposal.mp4
          </span>
        </div>
      </div>

      {/* Question */}
      <h2 style={styles.question}>Toh... kya bolti ho? 👉👈</h2>

      {/* Buttons */}
      <div style={styles.buttonsContainer}>
        {/* Yes Button */}
        <button
          style={styles.yesButton}
          onClick={handleYes}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow =
              "0 15px 40px rgba(34, 197, 94, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Yes! 💚
        </button>

        {/* No Button */}
        {noState.effect !== "dead" || !isAnimating ? (
          <button
            style={getNoButtonStyle()}
            onMouseEnter={handleNoInteraction}
            onTouchStart={(e) => {
              e.preventDefault();
              handleNoInteraction();
            }}
            onClick={handleNoInteraction}
          >
            {noState.text}
          </button>
        ) : null}
      </div>

      {/* Effect Progress Dots */}
      <div style={styles.effectIndicator}>
        {effectSequence.map((effect, index) => (
          <div
            key={effect}
            style={{
              ...styles.dot,
              ...(index < attemptCount ? styles.completedDot : {}),
              ...(index === attemptCount ? styles.activeDot : {}),
            }}
            title={effect}
          />
        ))}
      </div>

      {/* Hint Text */}
      <p style={styles.hintText}>{getHintText()}</p>

      {/* Attempt Counter */}
      {attemptCount > 0 && (
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.85rem",
            color: "#9ca3af",
          }}
        >
          Attempts: {attemptCount} / 6
        </p>
      )}
    </div>
  );
}
