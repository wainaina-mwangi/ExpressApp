import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [state, setstate] = useState("signUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex bg-gradient-to-br from-blue-200 to-purple-400 items-center justify-center min-h-screen px-6 sm:px-0 bg-slate-950 font-sans">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 top-5 w-28 sm:left-20 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl w-full sm:w-[420px] text-slate-300">
        <h2 className="text-3xl text-center font-semibold text-white mb-2 ">
          {state === "signUp" ? "Create Account" : "Login "}
        </h2>
        <p className="text-center mb-10 text-slate-400">
          {state === "signUp"
            ? "Get started in seconds."
            : "Enter your credentials to continue."}
        </p>

        <form>
          {state === "signUp" && (
            <div className="flex gap-4 mb-5 items-center w-full px-6 py-3.5 bg-slate-800 rounded-full focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <img
                src={assets.person_icon}
                alt=""
                className="w-5 h-5 opacity-70"
              />
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="bg-transparent outline-none flex-1 text-white placeholder:text-slate-500"
              />
            </div>
          )}

          <div className="flex gap-4 mb-5 items-center w-full px-6 py-3.5 bg-slate-800 rounded-full focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <img
              src={assets.person_icon}
              alt=""
              className="w-5 h-5 opacity-70"
            />
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="bg-transparent outline-none flex-1 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="flex gap-4 mb-8 items-center w-full px-6 py-3.5 bg-slate-800 rounded-full focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <img src={assets.lock_icon} alt="" className="w-5 h-5 opacity-70" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="bg-transparent outline-none flex-1 text-white placeholder:text-slate-500"
            />
          </div>
          <p className="text-indigo-500 mb-4 cursor-pointer" onClick={()=>navigate('/resetpassword')}>
            Forgot Password?
          </p>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-full text-base hover:bg-indigo-700 transition-colors shadow-lg active:scale-[0.98]"
          >
            {state === "signUp" ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          {state === "signUp"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            onClick={() => setstate(state === "signUp" ? "login" : "signUp")}
            className="text-indigo-400 cursor-pointer font-medium hover:text-indigo-300 underline"
          >
            {state === "signUp" ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
