import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { matchService } from '../../services/matchService';

const SearchIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
const ChevronDownIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;
const ArrowRightIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;

const TeamLogo = ({ name, color, textColor = '#fff' }) => (
  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/70 text-xs font-black" style={{ backgroundColor: color, color: textColor }} aria-label={`${name} logo`}>
    {name.slice(0, 3).toUpperCase()}
  </div>
);

const filters = ['All', 'Champions League', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Europa League'];
const tabs = [{ id: 'live', label: 'Live' }, { id: 'upcoming', label: 'Upcoming' }, { id: 'finished', label: 'Finished' }];

const MatchCard = ({ match }) => {
  const isLive = match.status === 'live';
  const isUpcoming = match.status === 'upcoming';
  return (
    <div className="overflow-hidden rounded-xl border border-[#1e2a45] bg-[#0f1629] transition-colors hover:border-[#2a3a5c]">
      <div className="flex items-center justify-between px-5 pb-2 pt-4">
        <span className="text-sm font-medium text-gray-400">{match.competition}</span>
        <span className={`rounded-full border px-3 py-1 text-xs font-bold tracking-wide ${isLive ? 'border-[#4a2030] bg-[#2a1520] text-red-400' : isUpcoming ? 'border-[#00e676]/30 bg-[#0a2a1a] text-[#00e676]' : 'border-[#2a3a5c] bg-[#1a2030] text-gray-400'}`}>
          {isLive ? `LIVE ${match.minute}'` : isUpcoming ? 'UPCOMING' : 'FINISHED'}
        </span>
      </div>
      <div className="flex items-center justify-between px-5 py-6">
        <div className="flex flex-1 flex-col items-center gap-3"><TeamLogo name={match.team1} color={match.color1} textColor={match.text1} /><span className="text-center text-sm font-semibold text-white">{match.team1}</span></div>
        {isUpcoming ? <div className="flex flex-col items-center px-4"><span className="text-xl font-bold text-gray-400">VS</span><span className="mt-1 text-xs text-gray-500">{match.time}</span></div> : <div className="flex items-center gap-2 px-4"><span className="text-4xl font-bold text-white">{match.score1}</span><span className="text-2xl font-light text-gray-500">-</span><span className="text-4xl font-bold text-white">{match.score2}</span></div>}
        <div className="flex flex-1 flex-col items-center gap-3"><TeamLogo name={match.team2} color={match.color2} textColor={match.text2} /><span className="text-center text-sm font-semibold text-white">{match.team2}</span></div>
      </div>
      <div className="flex items-center justify-between border-t border-[#1e2a45] bg-[#0b1020] px-5 py-3"><span className="text-sm text-gray-400">{match.date}{match.time ? ` · ${match.time}` : ''}</span><Link to={`/matches/${match.id}`} className="flex items-center gap-1 text-sm font-semibold text-[#00e676] transition-colors hover:text-[#00ff88]">{isLive ? 'Watch now' : isUpcoming ? 'View match' : 'View details'} <ArrowRightIcon /></Link></div>
    </div>
  );
};

export default function HomePage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('live');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await matchService.getMatches();
        setMatches(data || []);
      } catch (err) {
        setError(err.message || 'Unable to load matches.');
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  const normalizedMatches = matches.map((match) => ({
    ...match,
    id: match._id,
    team1: match.homeTeam,
    team2: match.awayTeam,
    time: match.time,
    score1: match.homeScore ?? 0,
    score2: match.awayScore ?? 0,
    minute: match.liveMinute,
    color1: '#1a2332',
    color2: '#1a2332',
  }));
  const visibleMatches = normalizedMatches.filter((match) => match.status === activeTab && (filter === 'All' || match.competition === filter) && [match.team1, match.team2, match.competition].some((value) => value.toLowerCase().includes(searchQuery.toLowerCase())));
  const tabCounts = tabs.reduce((counts, tab) => ({ ...counts, [tab.id]: normalizedMatches.filter((match) => match.status === tab.id).length }), {});

  return (
    <div className="min-h-screen bg-[#070b14] font-sans text-white"><Navbar />
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a3d2e] via-[#0a2a3a] to-[#0a1535]"><div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8"><div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl"><span className="block text-white">WATCH FOOTBALL</span><span className="block text-[#00e676]">LIVE &amp; FREE</span></h1><p className="mt-5 max-w-md text-base leading-relaxed text-gray-400 md:text-lg">Legal streaming links for top football competitions worldwide. No account needed.</p></div><div className="flex items-center gap-2 self-start rounded-lg border border-[#3a1830] bg-[#1a1020] px-4 py-2.5 md:self-end"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" /><span className="text-sm font-bold text-red-400">2 Live Now</span></div></div></div></section>
      <section className="relative z-10 mx-auto -mt-6 max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><SearchIcon /></div><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search teams or competitions..." className="w-full rounded-lg border border-[#1e2a45] bg-[#0f1629] py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:border-[#00e676] focus:outline-none" /></div><div className="relative"><button onClick={() => setDropdownOpen((open) => !open)} className="flex w-full items-center justify-between rounded-lg border border-[#1e2a45] bg-[#0f1629] px-4 py-3.5 text-sm text-white sm:w-[160px]"><span>{filter}</span><ChevronDownIcon /></button>{dropdownOpen && <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-[#1e2a45] bg-[#0f1629] shadow-xl">{filters.map((option) => <button key={option} onClick={() => { setFilter(option); setDropdownOpen(false); }} className="block w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#1e2a45]">{option}</button>)}</div>}</div></div></section>
      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex w-fit gap-1 rounded-lg border border-[#1e2a45] bg-[#0f1629] p-1.5">{tabs.map((tab) => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-[#00e676] text-[#070b14]' : 'text-gray-400 hover:text-white'}`}>{tab.label}<span className={`rounded-full px-2 py-0.5 text-xs font-bold ${activeTab === tab.id ? 'bg-[#070b14] text-[#00e676]' : 'bg-[#1e2a45] text-gray-400'}`}>{tabCounts[tab.id]}</span></button>)}</div></section>
      <section className="mx-auto mt-6 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">{loading ? <div className="py-12 text-center text-gray-500">Loading matches...</div> : error ? <div className="py-12 text-center text-red-300">{error}</div> : visibleMatches.length ? <div className={`grid gap-4 ${activeTab === 'live' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>{visibleMatches.map((match) => <MatchCard key={match.id} match={match} />)}</div> : <div className="py-12 text-center text-gray-500">No {activeTab} matches found for this filter.</div>}</section>
    </div>
  );
}
