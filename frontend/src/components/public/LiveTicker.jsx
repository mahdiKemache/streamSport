import { useEffect, useRef, useState } from 'react';

const LiveTicker = ({ matches }) => {
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);

  useEffect(() => {
    if (paused) return undefined;

    const speed = 0.6;
    const interval = setInterval(() => {
      setOffset((prev) => {
        if (prev <= -trackWidth) return 0;
        return prev - speed;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [paused, trackWidth]);

  const tickerContent = [...matches, ...matches];

  return (
    <div
      className="relative overflow-hidden border-b border-[#2a1520] bg-[#0a0510]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center">
        <div className="relative z-10 flex shrink-0 items-center gap-2 bg-[#dc2626] px-5 py-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          <span className="text-xs font-bold tracking-wider text-white">LIVE</span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-center whitespace-nowrap"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {tickerContent.map((match, idx) => (
              <div
                key={`${match.homeTeam}-${match.awayTeam}-${idx}`}
                className="flex shrink-0 items-center gap-2.5 border-r border-[#2a1520] px-6"
              >
                <span className="text-xs font-medium text-gray-500">{match.competition}</span>
                <span className="text-xs font-semibold text-white">{match.homeTeam}</span>
                <span className="text-xs font-bold text-red-400">
                  {match.homeScore ?? 0}-{match.awayScore ?? 0}
                </span>
                <span className="text-xs font-semibold text-white">{match.awayTeam}</span>
                <span className="rounded border border-[#4a2030] bg-[#2a1520] px-2 py-0.5 text-[10px] font-bold text-red-400">
                  {match.liveMinute ?? 0}"
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTicker;
