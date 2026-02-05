/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { CSSProperties, useEffect, useState } from "react";

interface FirstPopupProps {
  isOpen: boolean;
  onClose: () => void;
  flower: "laal" | "neela" | null;
}

const styles: { [key: string]: CSSProperties } = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    background: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    background: "white",
    borderRadius: "20px",
    maxWidth: "380px",
    width: "100%",
    overflow: "hidden",
    animation: "pop 0.3s ease-out",
  },
  imageContainer: {
    width: "100%",
    height: "250px",
    background: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imagePlaceholder: {
    fontSize: "4rem",
  },
  content: {
    padding: "1.5rem",
    textAlign: "center",
  },
  flowerBadge: {
    display: "inline-block",
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: 600,
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.1rem",
    color: "#374151",
    lineHeight: 1.6,
    marginBottom: "1.5rem",
  },
  highlight: {
    fontWeight: 700,
    color: "#111827",
  },
  button: {
    width: "100%",
    padding: "0.9rem",
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

export default function FirstPopup({
  isOpen,
  onClose,
  flower,
}: FirstPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!visible) return null;

  const isLaal = flower === "laal";

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.3s",
      }}
      onClick={onClose}
    >
      <div
        style={{
          ...styles.popup,
          transform: isOpen ? "scale(1)" : "scale(0.9)",
          opacity: isOpen ? 1 : 0,
          transition: "all 0.3s",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo */}
        <div style={styles.imageContainer}>
          {/* Replace with actual image */}
          {/* <img src="/images/photo1.jpg" alt="" style={styles.image} /> */}
          <span style={styles.imagePlaceholder}>📸</span>
        </div>

        <div style={styles.content}>
          <div
            style={{
              ...styles.flowerBadge,
              background: isLaal ? "#fee2e2" : "#dbeafe",
              color: isLaal ? "#dc2626" : "#2563eb",
            }}
          >
            {isLaal ? "🌺 Laal Phool Chuna" : "🪻 Neela Phool Chuna"}
          </div>

          <p style={styles.message}>
            {isLaal
              ? "Laal phool chuno ya neela,"
              : "Neela phool chuno ya laal,"}
            <br />
            <span style={styles.highlight}>
              tum tabse aaj tak sabse beautiful ✨
            </span>
          </p>

          <button
            style={styles.button}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#374151";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#111827";
            }}
          >
            Okay okay 😌
          </button>
        </div>
      </div>
    </div>
  );
}
