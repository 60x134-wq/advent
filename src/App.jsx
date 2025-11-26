import React, { useState } from "react";

const startDate = new Date("2025-11-25");
const today = new Date();

// Calendar day configuration (3 demo images; expand to 24 by adding objects)
const days = Array.from({ length: 24 }).map((_, i) => ({
  day: i + 1,
  img: `/images/${i + 1}.jpg`, // 512x768 portrait images
  placeholder: `/images/0.jpg`,
  link: null, // Optional: include external links
  date: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i),
}));

function isUnlocked(dayDate) {
  return today >= dayDate;
}

function CalendarTile({ dayObj }) {
  const [revealed, setRevealed] = useState(false);
  const unlocked = isUnlocked(dayObj.date);

  return (
    <div
      className="tile"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#fff",
        borderRadius: 20,
        margin: "6px",
        padding: "14px 10px",
        boxShadow: "0 6px 28px #0002",
        transition: "box-shadow 0.2s, transform 0.2s",
        position: "relative",
        overflow: "hidden",
        cursor: unlocked ? "pointer" : "default",
        minWidth: "0", // Prevents grid overflow
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 16,
          fontWeight: 500,
          color: "#b1b1b1",
          fontSize: 14,
          textShadow: "0 2px 8px #fff7"
        }}
      >Day {dayObj.day}</div>
      {!unlocked || !revealed ? (
        <img
          src={dayObj.placeholder}
          alt={`Locked for Day ${dayObj.day}`}
          width="100%"
          height="auto"
          style={{
            aspectRatio: "2/3",
            width: "100%",
            height: "auto",
            maxWidth: "512px",
            maxHeight: "768px",
            objectFit: "cover",
            borderRadius: 14,
            boxShadow: unlocked ? "0 2px 12px #0001" : "0 0px 0px #0000",
            filter: unlocked ? "blur(0px)" : "blur(2px) grayscale(60%)",
            transition: "filter 0.2s",
            opacity: unlocked ? 0.92 : 0.65,
          }}
          onClick={() => unlocked && setRevealed(true)}
        />
      ) : (
        <a href={dayObj.link ?? "#"} target="_blank" rel="noopener noreferrer">
          <img
            src={dayObj.img}
            alt={`Secret for Day ${dayObj.day}`}
            width="100%"
            height="auto"
            style={{
              aspectRatio: "2/3",
              width: "100%",
              height: "auto",
              maxWidth: "512px",
              maxHeight: "768px",
              objectFit: "cover",
              borderRadius: 14,
              boxShadow: "0 8px 32px #0003",
              transform: "scale(1.04)",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
          />
        </a>
      )}
      <div style={{
        marginTop: 10,
        fontSize: 13,
        opacity: 0.80,
        color: unlocked ? "#9c5cdd" : "#8a8a8a",
        letterSpacing: "1px",
        fontWeight: 300,
        textAlign: "center"
      }}>
        {unlocked
          ? (revealed ? "🎉 Tap image again for surprise!" : "Click to reveal the gift!")
          : `Unlocks ${dayObj.date.toLocaleDateString()}`}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #f3e7ff 0%, #eef5ff 100%)",
      padding: "24px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h2 style={{
        marginBottom: 24,
        fontWeight: 900,
        fontSize: 32,
        letterSpacing: "0.04em",
        color: "#7c3aed",
        textShadow: "0 2px 20px #fff7"
      }}>
        🎄 Advent Calendar Shorts
      </h2>
      <div
        className="calendar-grid"
        style={{
          width: "95vw",
          maxWidth: 1160,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
        }}
      >
        {days.map(dayObj => (
          <CalendarTile key={dayObj.day} dayObj={dayObj} />
        ))}
      </div>
    </div>
  );
}
