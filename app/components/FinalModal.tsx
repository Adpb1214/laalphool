/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { CSSProperties, useEffect, useState } from "react";

interface FinalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FinalModal = ({ isOpen, onClose }: FinalModalProps) => {
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
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const t = setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = 'unset';
      }, 500);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!visible) return null;

  // Responsive styles
  const styles: { [key: string]: CSSProperties } = {
    overlay: {
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: isMobile ? "0.5rem" : "1rem",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      overflow: "hidden",
    },
    modal: {
      maxWidth: isMobile ? "95vw" : "650px",
      width: "100%",
      textAlign: "center",
      animation: "slide-up 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      padding: isMobile ? "1.5rem" : "2.5rem",
      border: "2px solid rgba(255, 215, 0, 0.15)",
      boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(255, 215, 0, 0.1)",
    },
    // BIGGER container to fit full image properly
    imageWrapper: {
      width: "100%",
      height: isMobile ? "280px" : "400px", // BIGGER: 400px to show full image
      margin: "0 auto 2rem",
      borderRadius: "16px",
      overflow: "hidden",
      border: "4px solid rgba(255, 215, 0, 0.4)",
      background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
    },
    // CHANGED: object-fit: contain to show FULL image without cropping
    image: {
      width: "100%",
      height: "100%",
      objectFit: "contain", // CHANGED from "cover" to "contain"
      objectPosition: "center",
      transition: "transform 0.8s ease",
    },
    imagePlaceholder: {
      fontSize: isMobile ? "4rem" : "6rem",
      color: "#fbbf24",
      opacity: 0.3,
    },
    title: {
      fontSize: isMobile ? "1.1rem" : "1.4rem",
      color: "rgba(255, 255, 255, 0.9)",
      marginBottom: "0.75rem",
      fontWeight: 400,
      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
      letterSpacing: "0.5px",
    },
    mainText: {
      fontSize: isMobile ? "1.8rem" : "2.5rem",
      color: "#ffffff",
      fontWeight: 900,
      marginBottom: "0.75rem",
      lineHeight: 1.2,
      textShadow: "0 3px 10px rgba(0,0,0,0.6)",
      background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      padding: "0 1rem",
    },
    subText: {
      fontSize: isMobile ? "1.3rem" : "1.8rem",
      color: "#fcd34d",
      fontWeight: 700,
      fontStyle: "italic",
      marginBottom: "1.5rem",
      textShadow: "0 2px 6px rgba(0,0,0,0.4)",
      padding: "0 1rem",
    },
    funnyNote: {
      fontSize: isMobile ? "1rem" : "1.2rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontStyle: "italic",
      marginBottom: "1.5rem",
      padding: "0 1rem",
    },
    closeButton: {
      marginTop: "1.5rem",
      padding: isMobile ? "1rem 2rem" : "1.2rem 3rem",
      background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
      border: "none",
      borderRadius: "40px",
      color: "#1e293b",
      fontSize: isMobile ? "1.1rem" : "1.3rem",
      fontWeight: 800,
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 30px rgba(251, 191, 36, 0.4)",
      letterSpacing: "0.5px",
      position: "relative",
      overflow: "hidden",
      minWidth: "200px",
    },
    buttonHover: {
      transform: "translateY(-4px) scale(1.05)",
      boxShadow: "0 15px 40px rgba(251, 191, 36, 0.5)",
      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    },
    signature: {
      marginTop: "2.5rem",
      fontSize: isMobile ? "0.9rem" : "1rem",
      color: "rgba(255, 255, 255, 0.5)",
      letterSpacing: "1px",
    },
    stars: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
      backgroundImage: "radial-gradient(3px 3px at 20px 30px, #fbbf24, transparent), radial-gradient(3px 3px at 40px 70px, #fbbf24, transparent), radial-gradient(3px 3px at 50px 160px, #fbbf24, transparent), radial-gradient(3px 3px at 90px 40px, #fbbf24, transparent), radial-gradient(3px 3px at 130px 80px, #fbbf24, transparent), radial-gradient(3px 3px at 160px 120px, #fbbf24, transparent)",
      backgroundRepeat: "repeat",
      backgroundSize: "250px 250px",
      animation: "stars-move 100s linear infinite",
    },
    glowEffect: {
      position: "absolute",
      top: "-50%",
      left: "-50%",
      width: "200%",
      height: "200%",
      background: "radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)",
      animation: "rotate-glow 20s linear infinite",
      pointerEvents: "none",
    },
  };

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* Stars background effect */}
      <div style={styles.stars} />
      <div style={styles.glowEffect} />

      {/* Custom CSS animations */}
      <style>{`
        @keyframes slide-up {
          0% {
            transform: translateY(60px) scale(0.8);
            opacity: 0;
          }
          70% {
            transform: translateY(-10px) scale(1.02);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bounce-right {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(8px);
          }
        }
        
        @keyframes stars-move {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-250px);
          }
        }
        
        @keyframes rotate-glow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.2);
          }
        }
        
        .modal-image:hover {
          transform: scale(1.05);
        }
        
        .modal-container {
          animation: slide-up 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>

      <div style={styles.modal} className="modal-container">
        {/* WIDE Rectangle Image - BIGGER with CONTAIN */}
        <div 
          style={styles.imageWrapper}
          className="image-glow"
        >
          <img 
            src="/img5.png" 
            alt="Special moment" 
            style={styles.image}
            className="modal-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const placeholder = document.createElement("div");
              placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justifyContent: center;
                font-size: ${isMobile ? "5rem" : "7rem"};
                color: #fbbf24;
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                border-radius: 12px;
              `;
              placeholder.innerHTML = "✨🎬✨";
              target.parentNode?.insertBefore(placeholder, target);
            }}
          />
        </div>

        <p style={styles.title}>
          Ab toh ahaaana meri jaana bhi bol raha hai
        </p>

        <h1 style={styles.mainText}>
          &quot;Tanushree tum ho sabse pyareeeee&quot;
        </h1>

        <p style={styles.subText}>
          ✨ Always have been ✨
        </p>

        <p style={styles.funnyNote}>
          (Ab aur kahan bhaagega? 😂)
        </p>

        <button
          style={styles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, styles.buttonHover);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)";
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(251, 191, 36, 0.4)";
          }}
          onTouchStart={(e) => {
            Object.assign(e.currentTarget.style, styles.buttonHover);
          }}
          onTouchEnd={(e) => {
            setTimeout(() => {
              e.currentTarget.style.background = "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(251, 191, 36, 0.4)";
            }, 100);
          }}
        >
          Aage dekho! 
          <span style={{
            display: "inline-block",
            marginLeft: "12px",
            fontSize: "1.3em",
            animation: "bounce-right 1s infinite",
            transform: "translateY(1px)",
          }}>→</span>
        </button>

        <p style={styles.signature}>
          made with 🖤 by the Wrath of God
        </p>
      </div>
    </div>
  );
};

export default FinalModal;