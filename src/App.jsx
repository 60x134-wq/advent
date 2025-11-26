import React, { useState } from "react";

// CONFIGURATION
const startDate = new Date("2025-11-25");
const today = new Date();

// Example: individual links for each day
const links = [
  "https://en.wikipedia.org/wiki/Christmas",
  "https://www.noradsanta.org/",
  "https://www.canva.com/cards/templates/christmas/",
  // fill out or leave as null for days without a link
];
const days = Array.from({ length: 24 }).map((_, i) => {
  const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
  return {
    day: i + 1,
    date, // the reveal date
    img: `/images/${i + 1}.jpg`,
    placeholder: `/images/0.jpg`,
    link: links[i] ?? null,
  };
});

function isUnlocked(dayDate) {
  // Only unlock images on or after the day's date
  return today >= dayDate;
}

function CalendarTile({ dayObj }) {
  const [revealed, setRevealed] = useState(false);
  const unlocked = isUnlocked(dayObj.date);

  // Create a string for the date, e.g., "2025-12-02"
  const dateString = dayObj.date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });

  return (
    <div className="tile shorts-tile">
      <div className="tile-header">
        {dateString}
      </div>
      {!unlocked || !revealed ? (
        <img
          src={dayObj.placeholder}
          alt={`Locked for ${dateString}`}
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
        dayObj.link ? (
          <a href={dayObj.link} target="_blank" rel="noopener noreferrer">
            <img
              src={dayObj.img}
              alt={`Secret for ${dateString}`}
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
        ) : (
          <img
            src={dayObj.img}
            alt={`Secret for ${dateString}`}
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
        )
      )}
      <div className="tile-footer">
        {unlocked
          ? (revealed ? (dayObj.link ? "🎁 Click again for more!" : "🎉 Revealed!") : "Click to reveal!")
          : `Unlocks ${dateString}`}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-christmas">
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
      >🎄 Advent Calendar 2025</h2>
      <div className="calendar-root">
        {days.map(dayObj => (
          <CalendarTile key={dayObj.day} dayObj={dayObj} />
        ))}
      </div>
    </div>
  );
}
