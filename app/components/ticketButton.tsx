/* eslint-disable react-hooks/purity */
import React, { useState } from "react";

export const ClassicMovieTicket = ({
  movieName = "AVATAR: THE WAY OF WATER",
  theater = "CINEPLEX 12",
  screen = "SCREEN 5",
  row = "F",
  seat = "14",
  date = "FRI, FEB 15, 2024",
  time = "8:00 PM",
  ticketNumber = "A24-1587",
  price = "$18.50",
  rating = "PG-13",
  duration = "3h 12m",
  onClick = () => {},
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Create the classic ticket shape with perforations
  const getTicketClipPath = () => {
    const perforations = [];
    const count = 24; // Number of perforations per side
    const radius = 4; // Radius of each perforation
    const spacing = 100 / count; // Spacing between perforations
    
    // Top edge perforations
    for (let i = 0; i < count; i++) {
      const x = (i * spacing) + (spacing / 2);
      perforations.push(`${x}% 0%`);
      if (i < count - 1) {
        perforations.push(`${x + radius}% 0%`);
      }
    }
    
    // Right edge (straight)
    perforations.push("100% 0%");
    perforations.push("100% 100%");
    
    // Bottom edge perforations (mirror of top)
    for (let i = count - 1; i >= 0; i--) {
      const x = (i * spacing) + (spacing / 2);
      perforations.push(`${x}% 100%`);
      if (i > 0) {
        perforations.push(`${x - radius}% 100%`);
      }
    }
    
    // Left edge (straight)
    perforations.push("0% 100%");
    perforations.push("0% 0%");
    
    return `polygon(${perforations.join(", ")})`;
  };

  const buttonStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: "300px", // Smaller width like real tickets
    margin: "20px auto",
    padding: "0",
    border: "none",
    background: "linear-gradient(135deg, #f8f4e3 0%, #fff9e6 100%)",
    cursor: "pointer",
    clipPath: getTicketClipPath(),
    boxShadow: `
      0 4px 20px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(139, 69, 19, 0.2),
      inset 0 0 20px rgba(255, 255, 255, 0.5)
    `,
    fontFamily: '"Courier New", monospace',
    overflow: "visible",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-4px) rotateY(5deg)" : "translateY(0) rotateY(0)",
    perspective: "1000px",
    transformStyle: "preserve-3d",
  };

  // Tear-off line style (dashed line across the middle)
  const tearLineStyle: React.CSSProperties = {
    position: "absolute",
    left: "15%",
    right: "15%",
    top: "50%",
    height: "1px",
    background: "repeating-linear-gradient(90deg, #8B4513, #8B4513 5px, transparent 5px, transparent 10px)",
    transform: "translateY(-50%)",
    zIndex: "2",
    pointerEvents: "none",
  };

  // Perforation holes along edges
  const perforationHolesStyle: React.CSSProperties = {
    position: "absolute",
    top: "-3px",
    left: "-3px",
    right: "-3px",
    bottom: "-3px",
    backgroundImage: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 19px,
        #8B4513 19px,
        #8B4513 20px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 19px,
        #8B4513 19px,
        #8B4513 20px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 19px,
        #8B4513 19px,
        #8B4513 20px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 19px,
        #8B4513 19px,
        #8B4513 20px
      )
    `,
    backgroundPosition: "0 0, 0 100%, 0 0, 100% 0",
    backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
    backgroundSize: "20px 3px, 20px 3px, 3px 20px, 3px 20px",
    clipPath: getTicketClipPath(),
    pointerEvents: "none",
    zIndex: "1",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    padding: "15px",
    minHeight: "120px",
    position: "relative",
    zIndex: "2",
    background: "white",
    clipPath: getTicketClipPath(),
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px",
    borderBottom: "2px solid #8B4513",
    paddingBottom: "8px",
  };

  const theaterInfoStyle: React.CSSProperties = {
    fontSize: "10px",
    color: "#8B4513",
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "uppercase",
  };

  const priceStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#8B4513",
    fontWeight: "bold",
    background: "#FFD700",
    padding: "2px 6px",
    borderRadius: "3px",
  };

  const mainContentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "10px",
  };

  const movieTitleStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#2F4F4F",
    lineHeight: "1.2",
    fontFamily: '"Arial Black", sans-serif',
    textTransform: "uppercase",
  };

  const detailsRowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "10px",
    color: "#696969",
    borderTop: "1px dotted #D3D3D3",
    paddingTop: "4px",
  };

  const detailLabelStyle: React.CSSProperties = {
    fontWeight: "bold",
    color: "#8B4513",
  };

  const barcodeContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
    padding: "8px",
    background: "#f5f5f5",
    borderRadius: "4px",
    border: "1px solid #ddd",
  };

  const barcodeStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
  };

  const barcodeLineStyle = (height: number) => ({
    width: "2px",
    height: `${height}px`,
    background: "#000",
    marginRight: "1px",
  });

  const ticketNumberStyle: React.CSSProperties = {
    fontSize: "9px",
    color: "#8B4513",
    fontWeight: "bold",
    letterSpacing: "2px",
    textAlign: "right" as const,
  };

  const footerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "8px",
    color: "#808080",
    marginTop: "8px",
    paddingTop: "8px",
    borderTop: "1px solid #D3D3D3",
  };

  // Generate random barcode lines
  const barcodeLines = Array.from({ length: 40 }, () => Math.floor(Math.random() * 20) + 5);

  return (
    <>
      <style>{`
        @keyframes ticketFloat {
          0%, 100% {
            transform: translateY(0) rotateY(0);
          }
          50% {
            transform: translateY(-5px) rotateY(2deg);
          }
        }

        .ticket-floating {
          animation: ticketFloat 3s ease-in-out infinite;
        }

        .ticket-container {
          position: relative;
        }

        .ticket-container::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: linear-gradient(45deg, #ffd70033, #ff8c0033, #ffd70033);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 8px;
          filter: blur(10px);
        }

        .ticket-container:hover::before {
          opacity: 1;
        }

        @media (max-width: 480px) {
          .ticket-button {
            max-width: 280px !important;
          }
        }
      `}</style>
      
      <div className="ticket-container">
        <button
          style={buttonStyle}
          onClick={onClick}
          className={`ticket-floating ${className}`}
          data-testid="classic-movie-ticket"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Perforation holes */}
          <div style={perforationHolesStyle} />
          
          {/* Tear-off line */}
          <div style={tearLineStyle} />
          
          {/* Main content */}
          <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
              <div style={theaterInfoStyle}>
                <div style={{ fontSize: "12px", color: "#8B0000" }}>{theater}</div>
                <div>{screen}</div>
              </div>
              <div style={priceStyle}>{price}</div>
            </div>

            {/* Main content */}
            <div style={mainContentStyle}>
              <div style={movieTitleStyle}>{movieName}</div>
              
              <div style={detailsRowStyle}>
                <div>
                  <span style={detailLabelStyle}>DATE: </span>
                  {date}
                </div>
                <div>
                  <span style={detailLabelStyle}>TIME: </span>
                  {time}
                </div>
              </div>
              
              <div style={detailsRowStyle}>
                <div>
                  <span style={detailLabelStyle}>ROW: </span>
                  {row}
                </div>
                <div>
                  <span style={detailLabelStyle}>SEAT: </span>
                  {seat}
                </div>
                <div>
                  <span style={detailLabelStyle}>RATING: </span>
                  {rating}
                </div>
                <div>
                  <span style={detailLabelStyle}>DURATION: </span>
                  {duration}
                </div>
              </div>
            </div>

            {/* Barcode section */}
            <div style={barcodeContainerStyle}>
              <div style={barcodeStyle}>
                <div style={{ display: "flex" }}>
                  {barcodeLines.map((height, index) => (
                    <div key={index} style={barcodeLineStyle(height)} />
                  ))}
                </div>
                <div style={{ fontSize: "7px", color: "#666", marginTop: "2px" }}>
                  SCAN AT ENTRY
                </div>
              </div>
              <div style={ticketNumberStyle}>
                <div style={{ fontSize: "12px", color: "#000" }}>{ticketNumber}</div>
                <div>VALID FOR ONE ADMISSION</div>
              </div>
            </div>

            {/* Footer */}
            <div style={footerStyle}>
              <div>NO REFUNDS • NO EXCHANGES</div>
              <div>KEEP THIS TICKET</div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

// Alternative style - Red Theater Ticket
export const RedTheaterTicket = ({
  movieName = "THE BATMAN",
  theater = "IMAX THEATER",
  screen = "SCREEN 1",
  row = "H",
  seat = "22",
  date = "SAT, MAR 2, 2024",
  time = "7:30 PM",
  ticketNumber = "IMAX-2287",
  price = "$22.50",
  onClick = () => {},
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Create perforated edge effect with clip-path
  const getTicketClipPath = () => {
    const points = [];
    const teeth = 20; // Number of teeth on each side
    const toothDepth = 4;
    
    // Top edge (scalloped)
    for (let i = 0; i <= teeth; i++) {
      const x = (i / teeth) * 100;
      const y = i % 2 === 0 ? 0 : toothDepth;
      points.push(`${x}% ${y}%`);
    }
    
    // Right edge (straight)
    points.push("100% 100%");
    
    // Bottom edge (scalloped)
    for (let i = teeth; i >= 0; i--) {
      const x = (i / teeth) * 100;
      const y = 100 - (i % 2 === 0 ? 0 : toothDepth);
      points.push(`${x}% ${y}%`);
    }
    
    // Left edge (straight)
    points.push("0% 0%");
    
    return `polygon(${points.join(", ")})`;
  };

  const buttonStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: "320px",
    margin: "20px auto",
    padding: "0",
    border: "none",
    background: "linear-gradient(to bottom, #8B0000 0%, #B22222 30%, #8B0000 100%)",
    cursor: "pointer",
    clipPath: getTicketClipPath(),
    boxShadow: `
      0 6px 25px rgba(139, 0, 0, 0.3),
      inset 0 0 0 1px rgba(255, 255, 255, 0.2),
      inset 0 0 30px rgba(0, 0, 0, 0.2)
    `,
    fontFamily: '"Arial", sans-serif',
    overflow: "visible",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-5px) rotate(-1deg)" : "translateY(0) rotate(0)",
  };

  const containerStyle: React.CSSProperties = {
    padding: "18px",
    minHeight: "130px",
    position: "relative",
    zIndex: "2",
    background: "white",
    margin: "2px",
    clipPath: getTicketClipPath(),
    border: "2px dashed #8B0000",
  };

  const headerStyle: React.CSSProperties = {
    textAlign: "center" as const,
    marginBottom: "12px",
    paddingBottom: "8px",
    borderBottom: "3px double #8B0000",
  };

  const theaterNameStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#8B0000",
    letterSpacing: "3px",
    textTransform: "uppercase",
    fontFamily: '"Impact", sans-serif',
    marginBottom: "4px",
  };

  const mainContentStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "12px",
    marginBottom: "12px",
  };

  const movieInfoStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const movieTitleStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#2F4F4F",
    lineHeight: "1.3",
  };

  const detailsStyle: React.CSSProperties = {
    fontSize: "10px",
    color: "#696969",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  };

  const seatInfoStyle: React.CSSProperties = {
    background: "#8B0000",
    color: "white",
    padding: "8px",
    borderRadius: "6px",
    textAlign: "center" as const,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const seatLabelStyle: React.CSSProperties = {
    fontSize: "9px",
    opacity: "0.8",
    marginBottom: "2px",
  };

  const seatValueStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: '"Courier New", monospace',
  };

  const ticketNumberStyle: React.CSSProperties = {
    textAlign: "center" as const,
    fontSize: "11px",
    color: "#8B0000",
    fontWeight: "bold",
    letterSpacing: "3px",
    padding: "6px",
    background: "#FFFACD",
    borderRadius: "4px",
    border: "1px solid #8B0000",
  };

  const footerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "8px",
    color: "#8B0000",
    marginTop: "10px",
    paddingTop: "8px",
    borderTop: "1px solid #FFD700",
  };

  return (
    <>
      <style>{`
        @keyframes redTicketGlow {
          0%, 100% {
            box-shadow: 
              0 6px 25px rgba(139, 0, 0, 0.3),
              inset 0 0 0 1px rgba(255, 255, 255, 0.2),
              inset 0 0 30px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 
              0 6px 30px rgba(139, 0, 0, 0.5),
              0 0 20px rgba(255, 215, 0, 0.3),
              inset 0 0 0 1px rgba(255, 255, 255, 0.3),
              inset 0 0 30px rgba(0, 0, 0, 0.2);
          }
        }

        .red-ticket {
          animation: redTicketGlow 2s ease-in-out infinite;
        }

        .red-ticket:hover {
          animation: none;
        }
      `}</style>
      
      <button
        style={buttonStyle}
        onClick={onClick}
        className={`red-ticket ${className}`}
        data-testid="red-theater-ticket"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={containerStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <div style={theaterNameStyle}>{theater}</div>
            <div style={{ fontSize: "10px", color: "#696969" }}>
              {date} • {time} • {price}
            </div>
          </div>

          {/* Main content */}
          <div style={mainContentStyle}>
            <div style={movieInfoStyle}>
              <div style={movieTitleStyle}>{movieName}</div>
              <div style={detailsStyle}>
                <div><strong>SCREEN:</strong> {screen}</div>
                <div><strong>RATING:</strong> PG-13</div>
                <div><strong>DURATION:</strong> 2h 56m</div>
                <div><strong>PRESENTATION:</strong> IMAX</div>
              </div>
            </div>

            <div style={seatInfoStyle}>
              <div style={seatLabelStyle}>ROW</div>
              <div style={seatValueStyle}>{row}</div>
              <div style={{ ...seatLabelStyle, marginTop: "8px" }}>SEAT</div>
              <div style={seatValueStyle}>{seat}</div>
            </div>
          </div>

          {/* Ticket number */}
          <div style={ticketNumberStyle}>
            TICKET NO: {ticketNumber}
          </div>

          {/* Footer */}
          <div style={footerStyle}>
            <div>PRESENT TICKET AT ENTRY</div>
            <div>NO RE-ENTRY</div>
          </div>
        </div>
      </button>
    </>
  );
};