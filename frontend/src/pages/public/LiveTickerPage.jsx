import { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import LoadingState from '../../components/common/LoadingState';
import LiveTicker from '../../components/public/LiveTicker';
import GridBackground from '../../components/public/GridBackground';
import { matchService } from '../../services/matchService';

const normalizeStatus = (status) => String(status || '').toLowerCase();

const LiveTickerPage = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLiveMatches = async () => {
      try {
        setLoading(true);
        setError('');
        const matches = await matchService.getMatches();
        const filtered = (matches || []).filter((match) => normalizeStatus(match.status) === 'live');
        setLiveMatches(filtered);
      } catch (err) {
        setError(err.message || 'Unable to load live matches.');
      } finally {
        setLoading(false);
      }
    };

    loadLiveMatches();
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] font-sans text-white">
      <Navbar />

      {loading ? (
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <LoadingState message="Loading live ticker..." />
        </div>
      ) : error ? (
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-[#1e2a45] bg-[#0f1629] px-6 py-8 text-center text-sm text-red-300">
            {error}
          </div>
        </div>
      ) : (
        <>
          <LiveTicker matches={liveMatches.length ? liveMatches : [{ competition: 'No live matches', homeTeam: 'Waiting', awayTeam: 'for data', homeScore: 0, awayScore: 0, liveMinute: 0 }]} />
          <GridBackground />
        </>
      )}
    </div>
  );
};

export default LiveTickerPage;
