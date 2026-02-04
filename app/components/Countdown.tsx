"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft | null {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);

    const dateStr = process.env.NEXT_PUBLIC_PUPPY_DATE;
    if (!dateStr) {
      setError("Set NEXT_PUBLIC_PUPPY_DATE to start countdown!");
      return;
    }

    const targetDate = new Date(dateStr);
    if (isNaN(targetDate.getTime())) {
      setError("Set NEXT_PUBLIC_PUPPY_DATE to start countdown!");
      return;
    }

    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft(targetDate));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return <div className="geo-box">Loading...</div>;
  }

  if (error) {
    return <div className="geo-box flashing">{error}</div>;
  }

  if (timeLeft === null) {
    return (
      <div className="geo-box flashing text-center">
        <span className="countdown-number">PUPPY TIME IS HERE!!!</span>
      </div>
    );
  }

  return (
    <div className="geo-box flex gap-8 justify-center">
      <div className="text-center">
        <div className="countdown-number">{timeLeft.days}</div>
        <div className="countdown-label">Days</div>
      </div>
      <div className="text-center">
        <div className="countdown-number">{timeLeft.hours}</div>
        <div className="countdown-label">Hours</div>
      </div>
      <div className="text-center">
        <div className="countdown-number">{timeLeft.minutes}</div>
        <div className="countdown-label">Minutes</div>
      </div>
      <div className="text-center">
        <div className="countdown-number">{timeLeft.seconds}</div>
        <div className="countdown-label">Seconds</div>
      </div>
    </div>
  );
}
