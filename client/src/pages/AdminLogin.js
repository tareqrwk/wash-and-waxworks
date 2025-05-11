import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react' //Import icons for password visibility toggle 

function AdminLogin(){
    //State to store email input
    const [email, setEmail] = useState('');
    //State to store password input
    const [password, setPassword] = useState('');
    //State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    //State to store error messages
    const [error, setError] = useState('');
    //Access the login function from the authentication context
    const { login } = useAuth();
    //Hook to navigate to different routes
    const navigate = useNavigate();
    
    //Change tab title for page
    useEffect(() => {
        document.title = "Wash&WaxWorks | Login"
    }, []);

    //Function to handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); //Prevent default form submission behavior

        //Validate input fields
        if(!email || !password){
            setError('Please fill in all fields.');
            return;
        }

        try{
            //Send login request to the server
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({ email, password}), //Send email and password in the request body
            });
            
            //Parse the JSON response
            const data = await res.json();

            if(res.ok){
                //If login is successful, store the token in localStorage
                localStorage.setItem('adminToken', data.token);
                login(); //Update authentication state
                navigate('/admin-dashboard'); //Redirect to the admin dashboard
            }

            else{
                //Display error message from the server
                setError(data.message || 'Invalid login credentials.');
            }
        }

        catch (err){
            //Handle server errors
            setError('Server error. Please try again later.');
        }
    };

    return (
        //Main section container with background and centering styles
        <section className="min-h-screen bg-black flex items-center justify-center px-4">
            {/* Login form */}
            <form 
                onSubmit={handleLogin} //Handle form submission
                className="bg-zinc-900 p-8 rounded-lg border border-zinc-700 shadow-xl w-full max-w-md space-y-6"
            >
                {/* Form title */}
                <h2 className="text-3xl font-bold text-center text-purple-400">Admin Login</h2>

                {/* Error message display */}
                {error && (
                    <p className="text-red-500 text-center text-sm animate-pulse">{error}</p>
                )}

                {/* Email input field */}
                <input
                    type="email"
                    placeholder='Email'
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  //Update state on change
                />
                {/* Password input field with visibility toggle */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"} //Toggle between text and password types
                        placeholder='Password'
                        className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} //Update state on change
                    />
                    {/* Button to toggle password visibility */}
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)} //Toggle visibility state
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white">
                            {/* Display appropriate icon based on visibility state */}
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                
                {/* Submit button */}
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