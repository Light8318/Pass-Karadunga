"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);

      router.push("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };

 const signup = async () => {

  if (!email || !password) {

    alert("Please fill your email and password fields.");

    return;
  }

  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,15}$/;

  if (!passwordRegex.test(password)) {

    alert(
      "Password must be 8-15 characters and include a number and special character."
    );

    return;
  }

  try {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    router.push("/dashboard");

  } catch (error) {

    console.log(error);

  }
};
  const login = async () => {
     if (!email || !password) {

    alert("Please fill your email and password fields.");

    return;
  }
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
  <div className="min-h-screen bg-black flex items-center justify-center px-4">

    <div className="w-full max-w-md bg-[#111111] border border-zinc-800 rounded-3xl p-10 shadow-[0_0_50px_rgba(255,255,255,0.03)]">

      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-white tracking-tight">
          Welcome Back
        </h1>

        <p className="text-zinc-500 mt-3 text-sm">
          Access your notes, PYQs and premium resources.
        </p>
      </div>

      <div className="flex flex-col gap-4">

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-white transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-white transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
        >
          Login
        </button>

        <button
          onClick={signup}
          className="w-full bg-zinc-800 text-white py-4 rounded-2xl hover:bg-zinc-700 transition"
        >
          Create Account
        </button>

        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px bg-zinc-800"></div>
          <span className="text-zinc-500 text-sm">
            OR
          </span>
          <div className="flex-1 h-px bg-zinc-800"></div>
        </div>

        <button
  onClick={googleLogin}
  className="w-full border border-zinc-700 py-4 rounded-2xl text-white hover:bg-zinc-900 transition flex items-center justify-center gap-3"
>
  <FcGoogle size={24} />

  Continue with Google
</button>

      </div>

    </div>

  </div>
);
}