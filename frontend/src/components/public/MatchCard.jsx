const formatDateLabel = (dateString) => {
  if (!dateString) return 'TBD';

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const formatMatchTime = (time) => time || 'TBD';

const MatchCard = ({ match, variant = 'live' }) => {
  const competition = match.competition || 'Competition';
  const homeTeam = match.homeTeam || 'Home Team';
  const awayTeam = match.awayTeam || 'Away Team';
  const homeLogo = match.homeLogo || '';
  const awayLogo = match.awayLogo || '';

  return (
    <div className="overflow-hidden rounded-xl border border-[#1e2a45] bg-[#0f1629] transition-colors hover:border-[#2a3a5c]">
      <div className="flex items-center justify-between px-5 pb-2 pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#1a2332] text-[9px] font-black text-[#00e676]">
            {competition.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-400">{competition}</span>
        </div>

        {variant === 'live' ? (
          <div className="flex items-center gap-2 rounded-full border border-[#4a2030] bg-[#2a1520] px-3 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="text-xs font-bold tracking-wide text-red-400">
              LIVE {match.liveMinute || 0}'
            </span>
          </div>
        ) : variant === 'upcoming' ? (
          <div className="rounded-full border border-[#00e676]/30 bg-[#0a2a1a] px-3 py-1">
            <span className="text-[10px] font-bold tracking-wide text-[#00e676] uppercase">Upcoming</span>
          </div>
        ) : (
          <div className="rounded-full border border-[#2a3a5c] bg-[#1a2030] px-3 py-1">
            <span className="text-[10px] font-bold tracking-wide text-gray-400 uppercase">Finished</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-5 py-6">
        <div className="flex flex-1 flex-col items-center gap-3">
          {homeLogo ? (
            <img src={homeLogo} alt={homeTeam} className="h-14 w-14 rounded-lg object-cover" />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-[#2a3a5c] bg-[#1a2332] text-sm font-bold text-[#00e676]">
              {homeTeam.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span className="text-center text-sm font-semibold text-white">{homeTeam}</span>
        </div>

        {variant === 'upcoming' ? (
          <div className="flex flex-col items-center px-4">
            <span className="text-xl font-bold text-gray-400">VS</span>
            <span className="mt-1 text-[11px] text-gray-500">{formatMatchTime(match.time)}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4">
            <span className="text-4xl font-bold text-white">{match.score1 ?? match.homeScore ?? 0}</span>
            <span className="text-2xl font-light text-gray-500">-</span>
            <span className="text-4xl font-bold text-white">{match.score2 ?? match.awayScore ?? 0}</span>
          </div>
        )}

        <div className="flex flex-1 flex-col items-center gap-3">
          {awayLogo ? (
            <img src={awayLogo} alt={awayTeam} className="h-14 w-14 rounded-lg object-cover" />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-[#2a3a5c] bg-[#1a2332] text-sm font-bold text-[#00e676]">
              {awayTeam.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span className="text-center text-sm font-semibold text-white">{awayTeam}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#1e2a45] bg-[#0b1020] px-5 py-3">
        <span className="text-sm text-gray-400">
          {variant === 'upcoming' ? `${formatDateLabel(match.date)} · ${formatMatchTime(match.time)}` : formatDateLabel(match.date)}
        </span>
        <button className="inline-flex items-center gap-1 text-sm font-semibold text-[#00e676] transition-colors hover:text-[#00ff88]">
          {variant === 'live' ? 'Watch now' : variant === 'upcoming' ? 'Set reminder' : 'View details'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
