// src/App.jsx
import React, { useState } from "react";
const config = {
  start: "2025-11-25",
  end: "2025-11-30",
  cards: [
    // Add items below for each day; images should be hosted (or use a public CDN)
    { img: "/images/1.jpg", link: "https://example.com/1" },
    { img: "/images/2.jpg", link: "https://example.com/2" },
    // ... up to 24
  ],
  placeholder: "/images/placeholder.png",
};
function isAvailable(dateString, i) {
  const today = new Date();
  const day = new Date(config.start);
  day.setDate(day.getDate() + i);
  return today >= day;
}
const Card = ({ day, img, placeholder, link, unlocked }) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <div
      className="card"
      style={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        scrollSnapAlign: "start",
      }}
    >
      <h2>Day {day}</h2>
      {!unlocked ? (
        <img src={placeholder} alt="Locked" style={{ width: "90%", borderRadius: 12, cursor: "not-allowed" }} />
      ) : (
        <>
          {!revealed ? (
            <img
              src={placeholder}
              onClick={() => setRevealed(true)}
              alt="Reveal"
              style={{ width: "90%", borderRadius: 12, cursor: "pointer", opacity: 0.7 }}
            />
          ) : (
            <a href={link ?? "#"} target="_blank" rel="noopener noreferrer">
              <img src={img} alt={`Day ${day}`} style={{ width: "90%", borderRadius: 12, cursor: link ? "pointer" : "default" }} />
            </a>
          )}
        </>
      )}
    </div>
  );
};
export default function App() {
  return (
    <div style={{ maxWidth: 400, margin: "0 auto", background: "#fafaff" }}>
      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {config.cards.map((item, i) => (
          <Card
            key={i}
            day={i + 1}
            img={item.img}
            link={item.link}
            placeholder={config.placeholder}
            unlocked={isAvailable(config.start, i)}
          />
        ))}
      </div>
    </div>
  );
}
