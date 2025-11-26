import React, { useState } from "react";

const startDate = new Date("2025-11-25");
const today = new Date();

const days = Array.from({ length: 24 }).map((_, i) => ({
  day: i + 1,
  img: `/images/${i + 1}.jpg`, // 512x768 images
  placeholder: `/images/0.jpg`,
  link: null,
  date: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i)
}));

function isUnlocked(dayDate) {
  return today >= dayDate;
}

function CalendarTile({ dayObj }) {
  const [revealed, setRevealed] = useState(false);
  const unlocked = isUnlocked(dayObj.date);

  return (
    <div className="tile shorts-tile">
      <div className="tile-header">
        Day {dayObj.day}
      </div>
      {!unlocked || !revealed ? (
        <img
          src={dayObj.placeholder}
          alt={`Locked for Day ${dayObj.day}`}
          width="100%"
          height="auto"
          style={{
            aspectRatio: "2/3",
            width: "100%",
            maxWidth: "512px",
            maxHeight: "768px",
            objectFit: "cover",
            borderRadius: 20,
            filter: unlocked ? "blur(0px)" : "blur(2px) grayscale(60%)",
            opacity: unlocked ? 0.94 : 0.7,
            cursor: unlocked ? "pointer" : "not-allowed",
            userSelect: "none",
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
              maxWidth: "512px",
              maxHeight: "768px",
              objectFit: "cover",
              borderRadius: 20,
              boxShadow: "0 8px 32px #0003",
              transform: "scale(1.03)",
              userSelect: "none"
            }}
          />
        </a>
      )}
      <div className="tile-footer">
        {unlocked
          ? (revealed ? "🎉 Tap again for surprise!" : "Tap to reveal!")
          : `Unlocks ${dayObj.date.toLocaleDateString()}`}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f3e7ff 0%, #eef5ff 100%)",
        padding: "20px 0",
        boxSizing: "border-box"
      }}
    >
      <h2
        style={{
          marginBottom: 18,
          fontWeight: 900,
          fontSize: 32,
          letterSpacing: "0.04em",
          color: "#7c3aed",
          textAlign: "center",
          textShadow: "0 2px 20px #fff7"
        }}
      >Advent Calendar 2025</h2>
      <div className="calendar-root">
        {days.map(dayObj => (
          <CalendarTile key={dayObj.day} dayObj={dayObj} />
        ))}
      </div>
    </div>
  );
}
