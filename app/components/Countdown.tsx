"use client";

import { useState, useEffect, useSyncExternalStore, useMemo } from "react";

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

// Hydration-safe client detection using useSyncExternalStore
const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Client returns true
    () => false  // Server returns false
  );
}

// Parse and validate the target date once
function getTargetDate(): { date: Date | null; error: string | null } {
  const dateStr = process.env.NEXT_PUBLIC_PUPPY_DATE;
  if (!dateStr) {
    return { date: null, error: "Set NEXT_PUBLIC_PUPPY_DATE to start countdown!" };
  }
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return { date: null, error: "Set NEXT_PUBLIC_PUPPY_DATE to start countdown!" };
  }
  return { date, error: null };
}

export function Countdown() {
  const isClient = useIsClient();
  const { date: targetDate, error } = useMemo(() => getTargetDate(), []);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  // Countdown interval - subscribes to time updates
  useEffect(() => {
    if (!targetDate) return;

    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft(targetDate));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

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
