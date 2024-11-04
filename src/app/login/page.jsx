// pages/login.js
"use client";
import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Label } from "../aceternity/ui/label";
import { Input } from "../aceternity/ui/input";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "@/app/aceternity/ui/background-beams";
import Spinner from "../aceternity/spinner";
import { useRouter } from "next/navigation";

const Login = () => {
    const router=useRouter();
    const { login,loading } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <BackgroundBeamsWithCollision>
            <motion.div
                className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
                    Welcome Back to Clarity AI
                </h2>
                <form className="my-8 w-full" onSubmit={handleLogin}>
                    <div className="flex flex-col space-y-2 w-full">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            placeholder="projectmayhem@fc.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col space-y-2 w-full mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
                    <button
                        className="bg-gradient-to-br from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : `Login →`}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                </form>
                <div>
                    Don't have an account? <button className="text-blue-400" onClick={()=>router.push('/signup')}>Sign Up</button>
                </div>
            </motion.div>
        </BackgroundBeamsWithCollision>
    );
};

export default Login;
