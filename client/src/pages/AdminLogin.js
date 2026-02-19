import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Wash&WaxWorks | Admin Portal"
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                login();
                navigate('/admin-dashboard');
            } else {
                setError(data.message || 'Invalid login credentials.');
            }
        } catch (err) {
            setError('Server connection failed. Please try again.');
        }
    };

    return (
        <section className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden selection:bg-purple-500/30">
            {/* Background Narrative Elements (Animated Blobs) */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full" />

            {/* Overlay Grid Pattern for subtle texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none brightness-50 contrast-150" />

            <div className="relative z-10 w-full max-w-[440px] animate-in fade-in zoom-in duration-700">
                {/* Brand Identity */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-block text-3xl font-black tracking-tighter mb-4 group">
                        <span className="text-white group-hover:text-purple-400 transition-colors">Wash</span>
                        <span className="text-purple-500">&</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">WaxWorks</span>
                    </Link>
                    <div className="flex items-center justify-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        <ShieldCheck className="w-3 h-3 text-purple-500" />
                        Secure Admin Portal
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl shadow-purple-500/5">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
                        <p className="text-zinc-500 text-sm mt-1">Enter your credentials to access the dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center animate-in shake duration-300">
                                {error}
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Work Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@washthenwaxworks.ca"
                                    className="w-full pl-12 pr-5 py-4 bg-black/40 border border-white/5 rounded-2xl text-white placeholder:text-zinc-700 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Secret Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-black/40 border border-white/5 rounded-2xl text-white placeholder:text-zinc-700 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="group relative w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Authorize Session
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
                        </button>
                    </form>

                    {/* Footer Hint */}
                    <div className="mt-8 text-center">
                        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-tighter">
                            Authorized Personnel Only <br />
                            <span className="text-zinc-700 font-normal normal-case">By continuing, you agree to our security protocols.</span>
                        </p>
                    </div>
                </div>

                {/* Back to Site */}
                <div className="mt-8 text-center">
                    <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-bold transition-all">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        Back to main website
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default AdminLogin;