import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { matchService } from '../../services/matchService';

const formatDate = (value) => {
  if (!value) return 'Date unavailable';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

const TeamBadge = ({ name, logo }) => (
  logo ? <img src={logo} alt={`${name} logo`} className="h-20 w-20 rounded-full object-contain" /> : <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#2a3a5c] bg-[#1a2332] text-xl font-black text-[#00e676]">{name.slice(0, 3).toUpperCase()}</div>
);

export default function MatchDetailsPage() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMatch = async () => {
      try {
        const data = await matchService.getMatchById(id);
        setMatch(data);
      } catch (err) {
        setError(err.message || 'Unable to load match details.');
      } finally {
        setLoading(false);
      }
    };

    loadMatch();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#070b14] font-sans text-white">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link to="/" className="mb-6 inline-flex text-sm font-semibold text-[#00e676] hover:text-[#00ff88]">Back to matches</Link>
        {loading && <div className="rounded-xl border border-[#1e2a45] bg-[#0f1629] px-6 py-10 text-center text-gray-400">Loading match details...</div>}
        {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-10 text-center text-red-300">{error}</div>}
        {!loading && !error && match && (
          <>
            <section className="rounded-xl border border-[#1e2a45] bg-[#0f1629] p-6 sm:p-8">
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-gray-400">{match.competition}</span>
                <span className="rounded-full border border-[#2a3a5c] bg-[#1a2030] px-3 py-1 text-xs font-bold uppercase text-gray-300">{match.status}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-center">
                <div className="flex flex-1 flex-col items-center gap-3"><TeamBadge name={match.homeTeam} logo={match.homeLogo} /><h1 className="text-base font-bold sm:text-xl">{match.homeTeam}</h1></div>
                <div className="text-sm text-gray-500">VS</div>
                <div className="flex flex-1 flex-col items-center gap-3"><TeamBadge name={match.awayTeam} logo={match.awayLogo} /><h2 className="text-base font-bold sm:text-xl">{match.awayTeam}</h2></div>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-3 border-t border-[#1e2a45] pt-6 text-sm text-gray-400 sm:grid-cols-3"><div><span className="block text-xs uppercase tracking-wider text-gray-500">Competition</span>{match.competition}</div><div><span className="block text-xs uppercase tracking-wider text-gray-500">Date</span>{formatDate(match.date)}</div><div><span className="block text-xs uppercase tracking-wider text-gray-500">Time</span>{match.time}</div></div>
            </section>

            <section className="mt-6 rounded-xl border border-[#1e2a45] bg-[#0f1629] p-6 sm:p-8">
              <h2 className="text-xl font-black uppercase tracking-wide text-white">Watch Match</h2>
              <p className="mt-1 text-sm text-gray-400">Available Servers</p>
              {match.servers?.length ? <div className="mt-5 space-y-3">{match.servers.map((server, index) => <div key={`${server.name}-${index}`} className="flex flex-col gap-3 rounded-lg border border-[#1e2a45] bg-[#111827] p-4 sm:flex-row sm:items-center sm:justify-between"><span className="font-semibold text-white">{server.name || `Server ${index + 1}`}</span><a href={server.url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-lg bg-[#00e676] px-4 py-2 text-sm font-bold text-[#070b14] transition-colors hover:bg-[#00ff88]">Watch Now</a></div>)}</div> : <p className="mt-5 rounded-lg border border-dashed border-[#1e2a45] px-4 py-8 text-center text-sm text-gray-500">No streaming servers are available for this match.</p>}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
