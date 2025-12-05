import React, { useState } from "react";

// CONFIGURATION
const startDate = new Date("2025-11-25");
const today = new Date();

// Example: individual links for each day
const links = [
  "https://pl.pornhub.com/view_video.php?viewkey=ph5f7a349b1a09f&pkey=158309581", //jerk comp
  "https://pl.pornhub.com/view_video.php?viewkey=67ae7c20e2911&pkey=332619971", //car
  "https://pl.pornhub.com/view_video.php?viewkey=ph632c7f5957b29", //cuckold
  "https://www.xvideos.com/video.cbkvph805c/playboy_-_hot_foam_orgy_party", //foam party
  "https://pl.pornhub.com/view_video.php?viewkey=67e746a3653d9", //double blowjob
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
  const dateString = dayObj.date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });

  // Show placeholder if locked, or unlocked but not revealed
  if (!unlocked || !revealed) {
    return (
      <div className="tile shorts-tile">
        <div className="tile-header">{dateString}</div>
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
        <div className="tile-footer">
          {unlocked
            ? "Click to reveal!"
            : `Unlocks ${dateString}`}
        </div>
      </div>
    );
  }

  // Otherwise, revealed: show real image
  return (
    <div className="tile shorts-tile">
      <div className="tile-header">{dateString}</div>
      {dayObj.link ? (
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
      )}
      <div className="tile-footer">
        {dayObj.link ? "🎁 Click picture for more!" : "🎉 Revealed!"}
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
      >🎄 Horny Santa Calendar 2025</h2>
      <div className="calendar-root">
        {days.map(dayObj => (
          <CalendarTile key={dayObj.day} dayObj={dayObj} />
        ))}
      </div>
    </div>
  );
}
