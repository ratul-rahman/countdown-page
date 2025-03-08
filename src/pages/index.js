import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";


export default function CountdownPage() {
  const router = useRouter();
  const targetDate = new Date("2026-12-28T00:00:00Z").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = targetDate - Date.now();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        setIsExpired(true);
        setTimeout(() => {
          router.push("/next-phase");
        }, 2000);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const formatTime = (ms) => {
    if (ms <= 0) return { days: "00", hours: "00", mins: "00", secs: "00" };

    const days = String(Math.floor(ms / (1000 * 60 * 60 * 24))).padStart(2, "0");
    const hours = String(Math.floor((ms / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    const mins = String(Math.floor((ms / (1000 * 60)) % 60)).padStart(2, "0");
    const secs = String(Math.floor((ms / 1000) % 60)).padStart(2, "0");

    return { days, hours, mins, secs };
  };

  const { days, hours, mins, secs } = formatTime(timeLeft);

  return (
    <>
      <Head>
        <title>The Final Countdown</title>
        <meta name="description" content="Counting down to the big moment on December 28, 2026." />
      </Head>
      
      <div className="countdown-container">
        <h1 className="countdown-title">The Final Countdown</h1>

        {!isExpired ? (
          <div className="countdown-timer">
            <div className="countdown-box">
              <span className="countdown-value">{days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-value">{hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-value">{mins}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-value">{secs}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
        ) : (
          <div className="expired-message">
            Time's Up. Entering the Next Phase...
          </div>
        )}

        <p className="subtext">
          Something big is <span className="highlight">on the way...</span>
        </p>
      </div>
    </>
  );
}
