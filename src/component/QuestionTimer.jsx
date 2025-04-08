import { useEffect, useState } from "react";

export default function QuestionTimer({
  timeOut,
  onTimeOut,
  state,
  isCorrect,
}) {
  const isValidation = state === "answered";
  const isResult = state === "result";
  const currentTimeout = isValidation ? 1000 : isResult ? 2000 : timeOut;
  const [remainingTime, setRemainingTime] = useState(currentTimeout);

  // Reset timer tiap state berubah
  useEffect(() => {
    setRemainingTime(currentTimeout);
    const timer = setTimeout(onTimeOut, currentTimeout);
    return () => clearTimeout(timer);
  }, [currentTimeout, onTimeOut]);

  // Update sisa waktu
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => Math.max(0, prev - 100));
    }, 100);
    return () => clearInterval(interval);
  }, [currentTimeout]);

  // Tentukan class berdasarkan state dan isCorrect
  let timerClass = "";
  if (isValidation) {
    timerClass = "answered"; // warna kuning
  } else if (isResult) {
    timerClass = isCorrect ? "correct" : "wrong"; // hijau atau merah
  }

  return (
    <progress
      id="question-time"
      className={timerClass}
      value={remainingTime}
      max={currentTimeout}
    />
  );
}
