import { useEffect, useState } from 'react';

const MANILA_CLOCK_FORMAT = new Intl.DateTimeFormat('en-PH', {
  timeZone: 'Asia/Manila',
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

export function useManilaClock(): string {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const tick = () => setTime(MANILA_CLOCK_FORMAT.format(new Date()));
    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return time;
}
