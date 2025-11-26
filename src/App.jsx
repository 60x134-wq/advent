import React, { useState } from "react";

// Define the calendar date range and images (24 days)
const startDate = new Date("2025-12-01");
const endDate = new Date("2025-12-24");
const today = new Date();

// Generate day configs dynamically (modify for your link requirements)
const days = Array.from({ length: 24 }).map((_, i) => ({
  day: i + 1,
  img: `/images/${i + 1}.jpg`, // hidden image
  placeholder: `/images/0.jpg`,
  link: null, // Or e.g. `https://example.com/${i+1}`
  date: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i),
}));

// Helper: whether the current day is unlocked
function isUnlocked(dayDate) {
  // Only unlock images on or after the day's date
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
        borderRadius: 14,
        margin: 8,
        padding: 12,
        boxShadow: "0 2px 12px #0002",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: 6 }}>Day {dayObj.day}</div>
      {/* Show placeholder if not unlocked or not revealed yet */}
      {!unlocked || !revealed ? (
        <img
          src={dayObj.placeholder}
          alt={`Locked for Day ${dayObj.day}`}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            cursor: unlocked ? "pointer" : "not-allowed",
            opacity: unlocked ? 0.8 : 0.5,
            borderRadius: 8,
          }}
          onClick={() => {
            if (unlocked) setRevealed(true);
          }}
        />
      ) : (
        <a href={dayObj.link ?? "#"} target="_blank" rel="noopener noreferrer">
          <img
            src={dayObj.img}
            alt={`Secret for Day ${dayObj.day}`}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: 8,
              cursor: dayObj.link ? "pointer" : "default",
              boxShadow: "0 2px 10px #0001",
            }}
          />
        </a>
      )}
      <div style={{ fontSize: 12, marginTop: 6, color: "#555" }}>
        {unlocked ? (revealed ? "🎁 Revealed!" : "Click to reveal") : `Opens ${dayObj.date.toLocaleDateString()}`}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8f8f8",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 0"
    }}>
      <h2 style={{ marginBottom: 18, fontWeight: 900 }}>Advent Calendar (2025)</h2>
      <div
        className="calendar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          width: "90vw",
          maxWidth: 900,
        }}
      >
        {days.map(dayObj => (
          <CalendarTile key={dayObj.day} dayObj={dayObj} />
        ))}
      </div>
    </div>
  );
}
