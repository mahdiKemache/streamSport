import { useState } from 'react';

const CloseIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const ChevronDownIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;
const CalendarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const ClockIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
const TrashIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>;

const inputClass = 'w-full rounded-lg border border-[#1e2a45] bg-[#111827] px-4 py-3 text-sm text-white placeholder-gray-600 transition-colors focus:border-[#00e676] focus:outline-none';
const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400';

export default function NewMatchModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    homeLogoUrl: '',
    awayLogoUrl: '',
    competition: 'Champions League',
    status: 'upcoming',
    date: '2026-09-09',
    kickOffTime: '20:00',
    venue: '',
  });
  const [servers, setServers] = useState([]);

  const updateField = (field, value) => setFormData((current) => ({ ...current, [field]: value }));
  const addServer = () => setServers((current) => [...current, { id: Date.now(), name: '', url: '' }]);
  const removeServer = (id) => setServers((current) => current.filter((server) => server.id !== id));
  const updateServer = (id, field, value) => setServers((current) => current.map((server) => server.id === id ? { ...server, [field]: value } : server));

  const renderInput = (label, field, placeholder, type = 'text') => (
    <div>
      <label className={labelClass}>{label}</label>
      <input type={type} placeholder={placeholder} value={formData[field]} onChange={(event) => updateField(field, event.target.value)} className={`${inputClass} ${type !== 'text' ? '[color-scheme:dark]' : ''}`} />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="new-match-title">
      <div className="w-full max-w-3xl rounded-xl border border-[#1e2a45] bg-[#0d1321] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#1e2a45] px-6 py-4">
          <h2 id="new-match-title" className="text-xl font-black uppercase tracking-wide text-white">New Match</h2>
          <button onClick={onClose} aria-label="Close new match dialog" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1e2a45] text-gray-400 transition-colors hover:bg-[#2a3a5c] hover:text-white"><CloseIcon /></button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <section>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">Teams</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {renderInput('Home Team', 'homeTeam', 'e.g. Real Madrid')}
              {renderInput('Away Team', 'awayTeam', 'e.g. Barcelona')}
              {renderInput('Home Logo URL', 'homeLogoUrl', 'https://...')}
              {renderInput('Away Logo URL', 'awayLogoUrl', 'https://...')}
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">Match Info</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div><label className={labelClass}>Competition</label><div className="relative"><select value={formData.competition} onChange={(event) => updateField('competition', event.target.value)} className={`${inputClass} appearance-none pr-10`}><option>Champions League</option><option>Premier League</option><option>La Liga</option><option>Bundesliga</option><option>Serie A</option><option>Ligue 1</option><option>Europa League</option><option>FA Cup</option></select><span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><ChevronDownIcon /></span></div></div>
              <div><label className={labelClass}>Status</label><div className="relative"><select value={formData.status} onChange={(event) => updateField('status', event.target.value)} className={`${inputClass} appearance-none pr-10`}><option value="upcoming">upcoming</option><option value="live">live</option><option value="finished">finished</option></select><span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><ChevronDownIcon /></span></div></div>
              <div className="relative">{renderInput('Date', 'date', '', 'date')}<span className="pointer-events-none absolute right-3 top-9 text-gray-400"><CalendarIcon /></span></div>
              <div className="relative">{renderInput('Kick-Off Time', 'kickOffTime', '', 'time')}<span className="pointer-events-none absolute right-3 top-9 text-gray-400"><ClockIcon /></span></div>
              <div className="sm:col-span-2">{renderInput('Venue', 'venue', 'Stadium, City')}</div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between"><h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Streaming Servers</h3><button onClick={addServer} className="flex items-center gap-1.5 rounded-lg border border-[#00e676]/30 bg-[#0a2a1a] px-3 py-1.5 text-xs font-bold text-[#00e676] transition-colors hover:bg-[#0d3a24]"><PlusIcon />Add Server</button></div>
            {servers.length === 0 ? <div className="rounded-lg border-2 border-dashed border-[#1e2a45] px-4 py-8 text-center text-sm text-gray-500">No servers yet — click "Add Server" to add one</div> : <div className="space-y-3">{servers.map((server, index) => <div key={server.id} className="rounded-lg border border-[#1e2a45] bg-[#111827] p-4"><div className="mb-3 flex items-center justify-between"><span className="text-xs font-bold uppercase text-gray-400">Server #{index + 1}</span><button onClick={() => removeServer(server.id)} aria-label={`Remove server ${index + 1}`} className="text-red-400 transition-colors hover:text-red-300"><TrashIcon /></button></div><div className="grid grid-cols-1 gap-3 sm:grid-cols-3"><div><label className="mb-1 block text-xs text-gray-500">Name</label><input value={server.name} placeholder="e.g. Server 1" onChange={(event) => updateServer(server.id, 'name', event.target.value)} className={`${inputClass} px-3 py-2`} /></div><div className="sm:col-span-2"><label className="mb-1 block text-xs text-gray-500">Stream URL</label><input value={server.url} placeholder="https://..." onChange={(event) => updateServer(server.id, 'url', event.target.value)} className={`${inputClass} px-3 py-2`} /></div></div></div>)}</div>}
          </section>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#1e2a45] px-6 py-4 sm:flex-row"><button onClick={onClose} className="flex-1 rounded-lg border border-[#1e2a45] bg-[#111827] py-3.5 text-sm font-semibold text-gray-400 transition-colors hover:border-[#2a3a5c] hover:text-white">Cancel</button><button onClick={() => onCreate?.({ ...formData, servers })} className="flex-[2] rounded-lg bg-[#00e676] py-3.5 text-sm font-black uppercase tracking-wide text-[#070b14] transition-colors hover:bg-[#00ff88]">Create Match</button></div>
      </div>
    </div>
  );
}
