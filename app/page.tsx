"use client";

import { useEffect, useState } from "react";
import Game from "@/components/Game";
import Landing from "@/components/Landing";
import { loadGame } from "@/lib/storage";

export default function Home() {
  const [start, setStart] = useState(false);
  const [page, setPage] = useState<"home" | "profile" | "about">("home");
  const [lang, setLang] = useState<"en" | "id">("en");
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const saved = loadGame();
    if (saved) setState(saved);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center text-white">

      {/* language switch */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative flex bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1">
          <div
            className={`absolute top-1 bottom-1 w-1/2 bg-red-600 rounded-full transition-all ${
              lang === "en" ? "left-1" : "left-1/2"
            }`}
          />
          <button onClick={() => setLang("en")} className="px-4 py-1 z-10 text-xs">EN</button>
          <button onClick={() => setLang("id")} className="px-4 py-1 z-10 text-xs">ID</button>
        </div>
      </div>

      {!start && <Landing onStart={() => setStart(true)} lang={lang} />}

      {start && (
        <>
          {page === "home" && (
            <Game lang={lang} state={state} setState={setState} />
          )}

          {page === "profile" && state && (
            <div className="p-6 max-w-xl">
              <h1 className="text-xl text-red-400 mb-3">Profile</h1>
              <p>Level: {state.level}</p>
              <p>HP: {state.hp}</p>
              <p>ATK: {state.stats.attack}</p>
            </div>
          )}

          {page === "about" && (
            <div className="p-6 max-w-xl">
              <h1 className="text-xl text-red-400 mb-3">About</h1>
              <p className="text-sm text-gray-400">
                Cultivation web game inspired by donghua world.
              </p>
            </div>
          )}

          {/* navbar */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-2">
            <button onClick={() => setPage("home")} className="nav-item">🏠</button>
            <button onClick={() => setPage("profile")} className="nav-item">👤</button>
            <button onClick={() => setPage("about")} className="nav-item">📄</button>
          </div>
        </>
      )}
    </main>
  );
    }
