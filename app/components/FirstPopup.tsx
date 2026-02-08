/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { CSSProperties, useEffect, useState } from "react";

interface FirstPopupProps {
  isOpen: boolean;
  onClose: () => void;
  flower: "laal" | "neela" | null;
}

const FirstPopup = ({ isOpen, onClose, flower }: FirstPopupProps) => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!visible) return null;

  const isLaal = flower === "laal";

  // Responsive styles
  const styles: { [key: string]: CSSProperties } = {
    overlay: {
      position: "fixed",
      inset: 0,
      zIndex: 9998,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: isMobile ? "0.5rem" : "1rem",
      background: "rgba(0, 0, 0, 0.7)",
      backdropFilter: "blur(4px)",
    },
    popup: {
      background: "linear-gradient(145deg, #fff9f3 0%, #fff 100%)",
      borderRadius: isMobile ? "16px" : "24px",
      maxWidth: isMobile ? "95vw" : "420px",
      width: "100%",
      overflow: "hidden",
      animation: "pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      border: "2px solid rgba(255, 150, 50, 0.2)",
      boxShadow: "0 20px 60px rgba(255, 150, 50, 0.15), 0 0 0 1px rgba(255, 150, 50, 0.05)",
    },
    imageContainer: {
      width: "100%",
      height: isMobile ? "200px" : "280px",
      background: "linear-gradient(135deg, #fff8e1 0%, #fff3cd 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
      borderBottom: "2px dashed rgba(255, 150, 50, 0.3)",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      transition: "transform 0.5s ease",
    },
    imagePlaceholder: {
      fontSize: isMobile ? "3rem" : "4rem",
      color: "#ff9800",
      opacity: 0.3,
    },
    content: {
      padding: isMobile ? "1.25rem" : "1.75rem",
      textAlign: "center",
    },
    flowerBadge: {
      display: "inline-block",
      padding: isMobile ? "0.35rem 0.9rem" : "0.5rem 1.25rem",
      borderRadius: "50px",
      fontSize: isMobile ? "0.85rem" : "0.95rem",
      fontWeight: 700,
      marginBottom: isMobile ? "0.75rem" : "1rem",
      border: "2px solid",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
    },
    message: {
      fontSize: isMobile ? "0.95rem" : "1.1rem",
      color: "#444",
      lineHeight: isMobile ? 1.6 : 1.7,
      marginBottom: isMobile ? "0.75rem" : "1rem",
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
      fontStyle: "italic",
    },
    highlight: {
      display: "block",
      fontSize: isMobile ? "1rem" : "1.2rem",
      fontWeight: 700,
      color: "#ff6b00",
      marginTop: isMobile ? "0.5rem" : "0.75rem",
      marginBottom: isMobile ? "1rem" : "1.25rem",
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
      animation: "textGlow 2s infinite",
    },
    funnyNote: {
      fontSize: isMobile ? "0.85rem" : "0.95rem",
      color: "#666",
      fontStyle: "italic",
      marginTop: "0.5rem",
      opacity: 0.8,
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
    },
    button: {
      width: "100%",
      padding: isMobile ? "0.8rem" : "1rem",
      background: "linear-gradient(135deg, #ff9800 0%, #ff5722 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 6px 20px rgba(255, 152, 0, 0.3)",
      fontFamily: '"Noto Sans Bengali", "Arial", sans-serif',
      letterSpacing: "0.5px",
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 25px rgba(255, 152, 0, 0.4)",
    },
    closeButton: {
      position: "absolute",
      top: "12px",
      right: "12px",
      width: isMobile ? "28px" : "34px",
      height: isMobile ? "28px" : "34px",
      background: "rgba(255, 255, 255, 0.9)",
      border: "none",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "1.1rem",
      color: "#ff9800",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      zIndex: 10,
      transition: "all 0.3s ease",
    },
  };

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      onClick={onClose}
    >
      {/* Custom CSS animations */}
      <style>{`
        @keyframes pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes textGlow {
          0%, 100% {
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
          }
          50% {
            text-shadow: 0 0 10px rgba(255, 107, 0, 0.3), 1px 1px 2px rgba(0,0,0,0.1);
          }
        }
        
        .popup-image:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div
        style={{
          ...styles.popup,
          transform: isOpen ? "scale(1)" : "scale(0.9)",
          opacity: isOpen ? 1 : 0,
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          style={styles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ff9800";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
            e.currentTarget.style.color = "#ff9800";
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Photo - Bigger and responsive */}
        <div style={styles.imageContainer}>
          <img 
            src="/img1.jpeg" 
            alt={isLaal ? "Laal phool" : "Neela phool"} 
            style={styles.image}
            className="popup-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const placeholder = document.createElement("div");
              placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: ${isMobile ? "3rem" : "4rem"};
                color: #ff9800;
                background: linear-gradient(135deg, #fff8e1 0%, #fff3cd 100%);
              `;
              placeholder.innerHTML = "🌸";
              target.parentNode?.insertBefore(placeholder, target);
            }}
          />
        </div>

        <div style={styles.content}>
          <div
            style={{
              ...styles.flowerBadge,
              background: isLaal 
                ? "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)" 
                : "linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)",
              color: isLaal ? "#d32f2f" : "#3949ab",
              borderColor: isLaal ? "#ff5252" : "#7986cb",
            }}
          >
            {isLaal 
              ? "🌺 ওহো! লাল ফুল পছন্দ করেছিস!" 
              : "🪻 আরে! নীল ফুল পছন্দ করেছিস!"}
          </div>

          <p style={styles.message}>
            {isLaal
              ? "লাল ফুল? হুম!"
              : "নীল ফুল? হাহা, ঠিকই আছে!"}
            <br />
            তুই যে সে সময় থেকেই একদম সেরা!
          </p>

          <span style={styles.highlight}>
            {isLaal
              ? "লাল ফুলে কি আর হবে, তুই নিজেই তো Beautiful! 😏"
              : "নীল ফুলে কি হবে বল, তুই নিজেই তো Beautiful 😎"}
          </span>

          <div style={styles.funnyNote}>
            {isLaal 
              ? "(ফুলটাও লজ্জা পেয়ে যায় তোর কাছে!) 🌸"
              : "(ফুলটাও ইর্ষা করে তোকে দেখে!) 💙"}
          </div>

          <button
            style={styles.button}
            onClick={onClose}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, styles.buttonHover);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #ff9800 0%, #ff5722 100%)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 152, 0, 0.3)";
            }}
            onTouchStart={(e) => {
              Object.assign(e.currentTarget.style, styles.buttonHover);
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #ff9800 0%, #ff5722 100%)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 152, 0, 0.3)";
            }}
          >
            {isLaal ? "হা হা ঠিক আছে! 😂" : "বাহ! ঠিক বলেছিস! 😄"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstPopup;