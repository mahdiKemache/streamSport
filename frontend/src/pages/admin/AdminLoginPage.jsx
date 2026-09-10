import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const LockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
const UserIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authService.loginAdmin(formData.username, formData.password);
      if (!data.token) throw new Error('Login failed.');
      authService.setToken(data.token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b14] px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,22,41,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(15,22,41,0.4)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-black tracking-tight text-[#00e676]">Razko</h1>
          <h2 className="text-xl font-bold text-gray-300">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-500">Only admin can login.</p>
        </div>

        <div className="rounded-xl border border-[#1e2a45] bg-[#0f1629] p-8 shadow-2xl">
          {error && <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Username</label>
              <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><UserIcon /></span><input id="username" name="username" value={formData.username} onChange={(event) => setFormData((current) => ({ ...current, username: event.target.value }))} required autoComplete="username" className="w-full rounded-lg border border-[#1e2a45] bg-[#111827] py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-600 focus:border-[#00e676] focus:outline-none" /></div>
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
              <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><LockIcon /></span><input id="password" name="password" type="password" value={formData.password} onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))} required autoComplete="current-password" className="w-full rounded-lg border border-[#1e2a45] bg-[#111827] py-3.5 pl-12 pr-4 text-sm text-white placeholder-gray-600 focus:border-[#00e676] focus:outline-none" /></div>
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-lg bg-[#00e676] py-3.5 text-sm font-bold uppercase tracking-wide text-[#070b14] transition-colors hover:bg-[#00ff88] disabled:cursor-not-allowed disabled:opacity-50">{loading ? 'Logging in...' : 'Login'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
