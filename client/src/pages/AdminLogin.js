import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminLogin(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        if(!email || !password){
            setError('Please fill in all fields.');
            return;
        }

        try{
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({ email, password}),
            });
            
            const data = await res.json();

            if(res.ok){
                localStorage.setItem('adminToken', data.token);
                login();
                navigate('/admin-dashboard');
            }

            else{
                setError(data.message || 'Invalid login credentials.');
            }
        }

        catch (err){
            setError('Server error. Please try again later.');
        }
    };

    return (
        <section className="min-h-screen bg-black flex items-center justify-center px-4">
            <form 
                onSubmit={handleLogin}
                className="bg-zinc-900 p-8 rounded-lg border border-zinc-700 shadow-xl w-full max-w-md space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-purple-400">Admin Login</h2>
                {error && (
                    <p className="text-red-500 text-center text-sm animate-pulse">{error}</p>
                )}

                <input
                    type="email"
                    placeholder='Email'
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder='Password'
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className='w-full bg-purple-600 hover:bg-purple-800 transition rounded-md py-2 text-white font-semibold'   
                >
                    Login
                </button>
            </form>
        </section> 
    );
}

export default AdminLogin;