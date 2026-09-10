import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditMatchModal from '../../components/admin/EditMatchModal';
import NewMatchModal from '../../components/admin/NewMatchModal';
import { authService } from '../../services/authService';
import { matchService } from '../../services/matchService';

const GlobeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const RealMadridLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <circle cx="32" cy="34" r="24" fill="#fff" stroke="#c9a84c" strokeWidth="2" />
    <circle cx="32" cy="34" r="18" fill="none" stroke="#c9a84c" strokeWidth="1" />
    <text x="32" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1a3c6e">RM</text>
    <path d="M22 18 L32 10 L42 18 L40 22 L24 22 Z" fill="#c9a84c" />
  </svg>
);

const BarcelonaLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <path d="M16 14 L48 14 L48 50 L16 50 Z" fill="#a50044" stroke="#004d98" strokeWidth="2" />
    <rect x="16" y="14" width="16" height="36" fill="#004d98" />
    <rect x="32" y="14" width="16" height="36" fill="#a50044" />
    <rect x="16" y="14" width="32" height="14" fill="#edbb00" />
    <text x="32" y="44" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">FCB</text>
  </svg>
);

const ManCityLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="#6CABDD" stroke="#fff" strokeWidth="2" />
    <circle cx="32" cy="32" r="18" fill="none" stroke="#fff" strokeWidth="1" />
    <text x="32" y="36" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">MCFC</text>
    <path d="M22 18 L32 10 L42 18 L40 22 L24 22 Z" fill="#fff" />
  </svg>
);

const LiverpoolLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="#c8102e" stroke="#fff" strokeWidth="2" />
    <path d="M32 16 C24 16 20 24 20 32 C20 40 26 46 32 48 C38 46 44 40 44 32 C44 24 40 16 32 16 Z" fill="#fff" opacity="0.9" />
    <text x="32" y="36" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#c8102e">LFC</text>
  </svg>
);

const ChelseaLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="#034694" stroke="#fff" strokeWidth="2" />
    <circle cx="32" cy="32" r="18" fill="none" stroke="#fff" strokeWidth="1" />
    <path d="M26 22 L38 22 L38 38 L32 44 L26 38 Z" fill="#fff" opacity="0.9" />
    <text x="32" y="36" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#034694">CFC</text>
  </svg>
);

const TottenhamLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="#132257" stroke="#fff" strokeWidth="2" />
    <path d="M28 20 Q32 14 36 20 Q38 26 36 32 L32 38 L28 32 Q26 26 28 20 Z" fill="#fff" opacity="0.9" />
    <circle cx="32" cy="42" r="4" fill="#fff" opacity="0.7" />
  </svg>
);

const AtleticoMadridLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="#cb3524" stroke="#fff" strokeWidth="2" />
    <rect x="20" y="14" width="24" height="36" fill="#fff" opacity="0.2" />
    <text x="32" y="36" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">ATM</text>
  </svg>
);

const SevillaLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="#f43333" stroke="#fff" strokeWidth="2" />
    <path d="M24 20 L40 20 L40 44 L24 44 Z" fill="#fff" opacity="0.3" />
    <text x="32" y="36" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">SFC</text>
  </svg>
);

const JuventusLogo = () => (
  <div className="flex h-8 w-8 items-center justify-center rounded border border-[#2a3a5c] bg-[#1a2332]">
    <span className="text-xs font-bold text-[#00e676]">JU</span>
  </div>
);

const ACMilanLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="#fb090b" stroke="#000" strokeWidth="2" />
    <rect x="20" y="14" width="24" height="36" fill="#000" />
    <text x="32" y="36" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">ACM</text>
    <text x="32" y="44" textAnchor="middle" fontSize="5" fill="#fff">1899</text>
  </svg>
);

const ManUnitedLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="#da291c" stroke="#ffe500" strokeWidth="2" />
    <path d="M22 20 L42 20 L42 36 L32 44 L22 36 Z" fill="#ffe500" opacity="0.3" />
    <text x="32" y="34" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">MUFC</text>
  </svg>
);

const BayernMunichLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="#dc052d" stroke="#fff" strokeWidth="2" />
    <circle cx="32" cy="32" r="18" fill="#0066b2" />
    <path d="M22 22 L42 22 L42 42 L22 42 Z" fill="#fff" opacity="0.2" />
    <text x="32" y="30" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#fff">FC BAYERN</text>
    <text x="32" y="40" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">MUNCHEN</text>
  </svg>
);

const PortoLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="#004a8f" stroke="#fff" strokeWidth="2" />
    <path d="M24 20 L40 20 L40 44 L24 44 Z" fill="#fff" opacity="0.2" />
    <text x="32" y="36" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">FCP</text>
  </svg>
);

const BenficaLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="26" fill="#e30613" stroke="#fff" strokeWidth="2" />
    <path d="M26 24 L32 20 L38 24 L38 38 L32 42 L26 38 Z" fill="#fff" opacity="0.9" />
    <text x="32" y="36" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#e30613">SLB</text>
  </svg>
);

const ArsenalLogo = () => (
  <svg width="32" height="32" viewBox="0 0 64 64">
    <path d="M16 16 L48 16 L48 44 L32 54 L16 44 Z" fill="#ef0107" stroke="#fff" strokeWidth="2" />
    <path d="M20 28 L44 28 L44 38 L32 44 L20 38 Z" fill="#fff" opacity="0.3" />
    <text x="32" y="38" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">Arsenal</text>
  </svg>
);

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewMatchModalOpen, setIsNewMatchModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMatches = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await matchService.getMatches();
      setMatches(data || []);
    } catch (err) {
      setError(err.message || 'Unable to load matches.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const stats = {
    total: matches.length,
    live: matches.filter((match) => match.status === 'live').length,
    upcoming: matches.filter((match) => match.status === 'upcoming').length,
    finished: matches.filter((match) => match.status === 'finished').length,
  };

  const getTeamLogo = (team) => (
    <div className="flex h-8 w-8 items-center justify-center rounded border border-[#2a3a5c] bg-[#1a2332] text-[10px] font-bold text-[#00e676]">
      {team.slice(0, 2).toUpperCase()}
    </div>
  );

  const normalizedMatches = matches.map((match) => ({
    ...match,
    id: match._id,
    team1: match.homeTeam,
    team2: match.awayTeam,
    team1Logo: getTeamLogo(match.homeTeam),
    team2Logo: getTeamLogo(match.awayTeam),
    time: match.time,
  }));

  const filteredMatches = normalizedMatches.filter(
    (match) =>
      match.team1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.competition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateMatch = async (formData) => {
    const created = await matchService.createMatch({
      homeTeam: formData.homeTeam,
      awayTeam: formData.awayTeam,
      homeLogo: formData.homeLogoUrl,
      awayLogo: formData.awayLogoUrl,
      competition: formData.competition,
      status: formData.status,
      date: formData.date,
      time: formData.kickOffTime,
      servers: formData.servers.map(({ name, url }) => ({ name, url })),
    }, authService.getToken());

    setMatches((current) => [...current, created.match]);
    setIsNewMatchModalOpen(false);
  };

  const handleSaveMatch = async (formData) => {
    const updated = await matchService.updateMatch(selectedMatch._id || selectedMatch.id, {
      homeTeam: formData.homeTeam,
      awayTeam: formData.awayTeam,
      homeLogo: formData.homeLogoUrl,
      awayLogo: formData.awayLogoUrl,
      competition: formData.competition,
      status: formData.status,
      date: formData.date,
      time: formData.kickOffTime,
      servers: formData.servers.map(({ name, url }) => ({ name, url })),
    }, authService.getToken());

    setMatches((current) => current.map((match) => match._id === updated.match._id ? updated.match : match));
    setSelectedMatch(null);
  };

  /*
  const legacyMatches = [
    {
      id: 1,
      team1: 'Real Madrid',
      team1Logo: <RealMadridLogo />,
      team2: 'Barcelona',
      team2Logo: <BarcelonaLogo />,
      competition: 'La Liga',
      venue: 'Santiago Bernabéu, Madrid',
      status: 'live',
      minute: 67,
      date: '2026-09-09',
      time: '20:45',
    },
    {
      id: 2,
      team1: 'Manchester City',
      team1Logo: <ManCityLogo />,
      team2: 'Liverpool',
      team2Logo: <LiverpoolLogo />,
      competition: 'Premier League',
      venue: 'Etihad Stadium, Manchester',
      status: 'live',
      minute: 23,
      date: '2026-09-09',
      time: '17:30',
    },
    {
      id: 3,
      team1: 'Chelsea',
      team1Logo: <ChelseaLogo />,
      team2: 'Tottenham',
      team2Logo: <TottenhamLogo />,
      competition: 'Premier League',
      venue: 'Stamford Bridge, London',
      status: 'upcoming',
      date: '2026-09-12',
      time: '16:00',
    },
    {
      id: 4,
      team1: 'Atletico Madrid',
      team1Logo: <AtleticoMadridLogo />,
      team2: 'Sevilla',
      team2Logo: <SevillaLogo />,
      competition: 'La Liga',
      venue: 'Wanda Metropolitano, Madrid',
      status: 'upcoming',
      date: '2026-09-14',
      time: '21:00',
    },
    {
      id: 5,
      team1: 'Juventus',
      team1Logo: <JuventusLogo />,
      team2: 'AC Milan',
      team2Logo: <ACMilanLogo />,
      competition: 'Serie A',
      venue: 'Allianz Stadium, Turin',
      status: 'finished',
      date: '2026-09-08',
      time: '19:45',
    },
    {
      id: 6,
      team1: 'Manchester United',
      team1Logo: <ManUnitedLogo />,
      team2: 'Bayern Munich',
      team2Logo: <BayernMunichLogo />,
      competition: 'Champions League',
      venue: 'Old Trafford, Manchester',
      status: 'finished',
      date: '2026-09-06',
      time: '20:00',
    },
    {
      id: 7,
      team1: 'Porto',
      team1Logo: <PortoLogo />,
      team2: 'Benfica',
      team2Logo: <BenficaLogo />,
      competition: 'Europa League',
      venue: 'Estádio do Dragão, Porto',
      status: 'finished',
      date: '2026-09-07',
      time: '21:00',
    },
    {
      id: 8,
      team1: 'Arsenal',
      team1Logo: <ArsenalLogo />,
      team2: 'Manchester United',
      team2Logo: <ManUnitedLogo />,
      competition: 'FA Cup',
      venue: 'Emirates Stadium, London',
      status: 'finished',
      date: '2026-09-05',
      time: '15:00',
    },
  ]; */

  const getStatusBadge = (match) => {
    if (match.status === 'live') {
      return (
        <span className="rounded-full border border-[#4a2030] bg-[#2a1520] px-3 py-1 text-xs font-bold text-red-400">
          Live {match.minute}'
        </span>
      );
    }

    if (match.status === 'upcoming') {
      return (
        <span className="rounded-full border border-[#00e676]/30 bg-[#0a2a1a] px-3 py-1 text-xs font-bold text-[#00e676]">
          Upcoming
        </span>
      );
    }

    return (
      <span className="rounded-full border border-[#2a3a5c] bg-[#1a2030] px-3 py-1 text-xs font-bold text-gray-400">
        Finished
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#070b14] font-sans text-white">
      <nav className="border-b border-[#151d30] bg-[#0a0f1e]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <GlobeIcon />
              <span className="text-lg font-extrabold tracking-tight text-[#00e676]">Razko</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="/" className="text-sm font-semibold text-gray-400 transition-colors hover:text-white">
                Matches
              </a>
              <div className="flex items-center gap-2 text-gray-500">
                <LockIcon />
                <span className="text-sm">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="border-b border-[#151d30] bg-[#0a0f1e]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-gray-400 transition-colors hover:text-white" aria-label="Go back">
                <ArrowLeftIcon />
              </button>
              <h1 className="text-lg font-bold tracking-wide">DASHBOARD</h1>
            </div>
            <button onClick={() => { authService.clearToken(); navigate('/'); }} className="flex items-center gap-2 rounded-lg border border-[#1e2a45] bg-[#0f1629] px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:border-[#2a3a5c] hover:text-white">
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#1e2a45] bg-[#0f1629] p-6">
            <div className="mb-1 text-4xl font-bold text-white">{stats.total}</div>
            <div className="text-sm font-medium text-gray-400">Total</div>
          </div>
          <div className="rounded-xl border border-[#1e2a45] bg-[#0f1629] p-6">
            <div className="mb-1 text-4xl font-bold text-red-400">{stats.live}</div>
            <div className="text-sm font-medium text-gray-400">Live</div>
          </div>
          <div className="rounded-xl border border-[#1e2a45] bg-[#0f1629] p-6">
            <div className="mb-1 text-4xl font-bold text-[#00e676]">{stats.upcoming}</div>
            <div className="text-sm font-medium text-gray-400">Upcoming</div>
          </div>
          <div className="rounded-xl border border-[#1e2a45] bg-[#0f1629] p-6">
            <div className="mb-1 text-4xl font-bold text-gray-400">{stats.finished}</div>
            <div className="text-sm font-medium text-gray-400">Finished</div>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#1e2a45] bg-[#0f1629] py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#00e676] focus:outline-none"
            />
          </div>
          <button onClick={() => setIsNewMatchModalOpen(true)} className="flex items-center justify-center gap-2 rounded-lg bg-[#00e676] px-6 py-3 text-sm font-bold text-[#070b14] transition-colors hover:bg-[#00ff88]">
            <PlusIcon />
            ADD MATCH
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#1e2a45] bg-[#0f1629]">
          <div className="grid grid-cols-12 gap-4 border-b border-[#1e2a45] bg-[#0a0f1e] px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            <div className="col-span-6">Match</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Date</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          <div className="divide-y divide-[#1e2a45]">
            {loading && <div className="px-6 py-8 text-center text-sm text-gray-400">Loading matches...</div>}
            {!loading && error && <div className="px-6 py-8 text-center text-sm text-red-300">{error}</div>}
            {!loading && !error && filteredMatches.map((match) => (
              <div key={match.id} className="grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-[#151d30]">
                <div className="col-span-6">
                  <div className="flex items-center gap-3">
                    {match.team1Logo}
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white">
                        {match.team1.toUpperCase()} <span className="font-normal text-gray-500">VS</span> {match.team2.toUpperCase()}
                      </div>
                      <div className="mt-0.5 text-xs text-gray-400">
                        {match.competition} · {match.venue}
                      </div>
                    </div>
                    {match.team2Logo}
                  </div>
                </div>

                <div className="col-span-2 flex justify-center">{getStatusBadge(match)}</div>

                <div className="col-span-2 text-center text-sm text-gray-400">
                  {match.date} · {match.time}
                </div>

                <div className="col-span-2 flex items-center justify-center gap-2">
                  <button onClick={() => setSelectedMatch(match)} className="rounded bg-[#1e2a45] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#2a3a5c]">
                    Edit
                  </button>
                  <button className="rounded bg-[#2a1520] px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-[#3a1a2a]">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isNewMatchModalOpen && (
        <NewMatchModal
          onClose={() => setIsNewMatchModalOpen(false)}
          onCreate={handleCreateMatch}
        />
      )}

      {selectedMatch && (
        <EditMatchModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onSave={handleSaveMatch}
        />
      )}
    </div>
  );
}
