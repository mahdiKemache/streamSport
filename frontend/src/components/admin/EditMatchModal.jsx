import { useState } from 'react';

const CloseIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const ChevronDownIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;
const CalendarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const ClockIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;

const inputClass = 'w-full rounded-lg border border-[#1e2a45] bg-[#111827] px-4 py-3 text-sm text-white placeholder-gray-600 transition-colors focus:border-[#00e676] focus:outline-none';
const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400';
const competitions = ['Champions League', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Europa League', 'FA Cup'];
const statuses = ['upcoming', 'live', 'finished'];
const qualities = ['1080p', '720p', '480p', '360p'];

export default function EditMatchModal({ match, onClose, onSave }) {
  const [formData, setFormData] = useState({
    homeTeam: match?.homeTeam || match?.team1 || '',
    awayTeam: match?.awayTeam || match?.team2 || '',
    homeLogoUrl: match?.homeLogoUrl || '',
    awayLogoUrl: match?.awayLogoUrl || '',
    competition: match?.competition || 'Premier League',
    status: match?.status || 'upcoming',
    date: match?.date || '2026-09-12',
    kickOffTime: match?.kickOffTime || match?.time || '16:00',
    venue: match?.venue || '',
  });
  const [servers, setServers] = useState(match?.servers?.length ? match.servers : [{ id: 1, name: '', url: '', quality: '1080p', language: 'English' }]);
  const updateField = (field, value) => setFormData((current) => ({ ...current, [field]: value }));
  const addServer = () => setServers((current) => [...current, { id: current.length + 1, name: '', url: '', quality: '1080p', language: 'English' }]);
  const removeServer = (id) => setServers((current) => current.filter((server) => server.id !== id));
  const updateServer = (id, field, value) => setServers((current) => current.map((server) => server.id === id ? { ...server, [field]: value } : server));
  const input = (label, field, placeholder, type = 'text') => <div><label className={labelClass}>{label}</label><input type={type} placeholder={placeholder} value={formData[field]} onChange={(event) => updateField(field, event.target.value)} className={`${inputClass} ${type !== 'text' ? '[color-scheme:dark]' : ''}`} /></div>;
  const select = (label, field, options) => <div><label className={labelClass}>{label}</label><div className="relative"><select value={formData[field]} onChange={(event) => updateField(field, event.target.value)} className={`${inputClass} appearance-none pr-10`}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select><span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><ChevronDownIcon /></span></div></div>;

  return <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="edit-match-title">
    <div className="w-full max-w-3xl rounded-xl border border-[#1e2a45] bg-[#0d1321] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#1e2a45] px-6 py-4"><h2 id="edit-match-title" className="text-xl font-black uppercase tracking-wide text-white">Edit Match</h2><button onClick={onClose} aria-label="Close edit match dialog" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1e2a45] text-gray-400 hover:bg-[#2a3a5c] hover:text-white"><CloseIcon /></button></div>
      <div className="space-y-6 px-6 py-6">
        <section><h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">Teams</h3><div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{input('Home Team', 'homeTeam', 'e.g. Real Madrid')}{input('Away Team', 'awayTeam', 'e.g. Barcelona')}{input('Home Logo URL', 'homeLogoUrl', 'https://...')}{input('Away Logo URL', 'awayLogoUrl', 'https://...')}</div></section>
        <section><h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">Match Info</h3><div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{select('Competition', 'competition', competitions)}{select('Status', 'status', statuses)}<div className="relative">{input('Date', 'date', '', 'date')}<span className="pointer-events-none absolute right-3 top-9 text-gray-400"><CalendarIcon /></span></div><div className="relative">{input('Kick-Off Time', 'kickOffTime', '', 'time')}<span className="pointer-events-none absolute right-3 top-9 text-gray-400"><ClockIcon /></span></div><div className="sm:col-span-2">{input('Venue', 'venue', 'Stadium, City')}</div></div></section>
        <section><div className="mb-4 flex items-center justify-between"><h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Streaming Servers</h3><button onClick={addServer} className="flex items-center gap-1.5 rounded-lg border border-[#00e676]/30 bg-[#0a2a1a] px-3 py-1.5 text-xs font-bold text-[#00e676] hover:bg-[#0d3a24]"><PlusIcon />Add Server</button></div><div className="space-y-3">{servers.map((server, index) => <div key={server.id} className="rounded-lg border border-[#1e2a45] bg-[#111827] p-5"><div className="mb-4 flex items-center justify-between"><span className="text-sm font-bold uppercase tracking-wide text-gray-400">Server {index + 1}</span><button onClick={() => removeServer(server.id)} className="text-sm font-bold text-red-400 hover:text-red-300">Remove</button></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><div><label className={labelClass}>Server Name</label><input value={server.name} placeholder="e.g. HD Server 1" onChange={(event) => updateServer(server.id, 'name', event.target.value)} className={`${inputClass} bg-[#0d1321]`} /></div><div><label className={labelClass}>Stream URL</label><input value={server.url} placeholder="https://..." onChange={(event) => updateServer(server.id, 'url', event.target.value)} className={`${inputClass} bg-[#0d1321]`} /></div><div><label className={labelClass}>Quality</label><div className="relative"><select value={server.quality || '1080p'} onChange={(event) => updateServer(server.id, 'quality', event.target.value)} className={`${inputClass} appearance-none bg-[#0d1321] pr-10`}>{qualities.map((quality) => <option key={quality}>{quality}</option>)}</select><span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><ChevronDownIcon /></span></div></div><div><label className={labelClass}>Language</label><input value={server.language || 'English'} placeholder="e.g. English" onChange={(event) => updateServer(server.id, 'language', event.target.value)} className={`${inputClass} bg-[#0d1321]`} /></div></div></div>)}</div></section>
      </div>
      <div className="flex flex-col gap-3 border-t border-[#1e2a45] px-6 py-4 sm:flex-row"><button onClick={onClose} className="flex-1 rounded-lg border border-[#1e2a45] bg-[#111827] py-3.5 text-sm font-semibold text-gray-400 hover:border-[#2a3a5c] hover:text-white">Cancel</button><button onClick={() => onSave?.({ ...formData, servers })} className="flex-[2] rounded-lg bg-[#00e676] py-3.5 text-sm font-black uppercase tracking-wide text-[#070b14] hover:bg-[#00ff88]">Save Changes</button></div>
    </div>
  </div>;
}
