"use client";

import { useEffect, useState } from "react";

import { auth } from "@/lib/firebase";

import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { useRouter } from "next/navigation";

export default function Dashboard() {

  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      if (currentUser) {

        setUser(currentUser);

      } else {

        router.push("/login");

      }

    });

    return () => unsubscribe();

  }, []);

  const logout = async () => {

    await signOut(auth);

    router.push("/login");

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-zinc-400 mt-2">
            Welcome back,
            {" "}
            {user?.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-5 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <h2 className="text-2xl font-semibold">
            Software Engineering
          </h2>

          <p className="text-zinc-400 mt-3">
            Notes, PYQs and Practicals
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <h2 className="text-2xl font-semibold">
            Computer Networks
          </h2>

          <p className="text-zinc-400 mt-3">
            Important modules and PDFs
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <h2 className="text-2xl font-semibold">
            Database Systems
          </h2>

          <p className="text-zinc-400 mt-3">
            PYQs with answers
          </p>
        </div>

      </div>

    </div>
  );
}