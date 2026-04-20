import React, { useState } from 'react';
import { Lock, Mail, User2Icon } from 'lucide-react';

const Login = () => {

  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')
  const [state, setState] = useState(urlState || "login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleState = () => setState(prev => prev === "login" ? "register" : "login");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-inter">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        input:-webkit-autofill,
        input:-webkit-autofill:focus {
          transition: background-color 600000s 0s, color 600000s 0s;
        }
      `}</style>

      <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center rounded-2xl px-8 py-8 bg-white/5 backdrop-blur-sm border border-white/20 shadow-xl">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl rotate-45" />
        </div>

        <h1 className="text-white text-3xl font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        
        <p className="text-gray-400 text-sm mt-2">Please {state} to continue</p>

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white/10 backdrop-blur-sm border border-white/20 h-12 rounded-full px-6 gap-2">
            <User2Icon size={16} className="text-gray-400" />
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              className="bg-transparent border-none outline-none text-white placeholder:text-gray-400 w-full" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-white/10 backdrop-blur-sm border border-white/20 h-12 rounded-full px-6 gap-2">
          <Mail size={13} className="text-gray-400" />
          <input 
            type="email" 
            name="email" 
            placeholder="Email id" 
            className="bg-transparent border-none outline-none text-white placeholder:text-gray-400 w-full" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white/10 backdrop-blur-sm border border-white/20 h-12 rounded-full px-6 gap-2">
          <Lock size={13} className="text-gray-400" />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            className="bg-transparent border-none outline-none text-white placeholder:text-gray-400 w-full" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mt-4 text-left">
          <button type="button" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            Forget password?
          </button>
        </div>

        <button type="submit" className="mt-4 w-full h-11 rounded-full text-white font-medium bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p className="text-gray-400 text-sm mt-4">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}
          <button 
            type="button" 
            onClick={toggleState} 
            className="text-cyan-400 hover:text-cyan-300 hover:underline ml-1 font-medium"
          >
            click here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;