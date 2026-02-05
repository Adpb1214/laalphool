/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { CSSProperties, useEffect, useState } from "react";

interface FinalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles: { [key: string]: CSSProperties } = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
  },
  modal: {
    maxWidth: "450px",
    width: "100%",
    textAlign: "center",
    animation: "slide-up 0.5s ease-out",
  },
  imageWrapper: {
    width: "200px",
    height: "200px",
    margin: "0 auto 2rem",
    borderRadius: "50%",
    overflow: "hidden",
    border: "4px solid rgba(255,255,255,0.3)",
    background: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imagePlaceholder: {
    fontSize: "5rem",
  },
  title: {
    fontSize: "1.1rem",
    color: "rgba(255,255,255,0.7)",
    marginBottom: "0.5rem",
    fontWeight: 400,
  },
  mainText: {
    fontSize: "2rem",
    color: "white",
    fontWeight: 700,
    marginBottom: "0.5rem",
    lineHeight: 1.3,
  },
  subText: {
    fontSize: "1.5rem",
    color: "#fbbf24",
    fontWeight: 600,
    fontStyle: "italic",
  },
  closeButton: {
    marginTop: "2rem",
    padding: "0.75rem 2rem",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "30px",
    color: "white",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  signature: {
    marginTop: "3rem",
    fontSize: "0.85rem",
    color: "rgba(255,255,255,0.4)",
  },
};

export default function FinalModal({ isOpen, onClose }: FinalModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else {
      const t = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.5s",
      }}
    >
      <div style={styles.modal}>
        <div style={styles.imageWrapper}>
          {/* <img src="/images/photo3.jpg" alt="" style={styles.image} /> */}
          <span style={styles.imagePlaceholder}>📸</span>
        </div>

        <p style={styles.title}>Ab toh Rishi Kapoor bhi bol raha...</p>

        <h1 style={styles.mainText}>&quot;You are beautifullll...&quot;</h1>

        <p style={styles.subText}>✨ Always have been ✨</p>

        <button
          style={styles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          }}
        >
          Aage dekh →
        </button>

        <p style={styles.signature}>made with 🖤</p>
      </div>
    </div>
  );
}
