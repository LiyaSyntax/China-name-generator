"use client";

import { useEffect } from "react";
import {
  cultivate,
  explore,
  rest,
  attackEnemy,
  resolveEvent,
} from "@/lib/gameLogic";
import { saveGame } from "@/lib/storage";
import { text } from "@/lib/i18n";

export default function Game({ state, setState, lang }: any) {
  const t = text[lang];

  useEffect(() => {
    if (state) saveGame(state);
  }, [state]);

  if (!state) return null;

  const act = (fn: any) => setState((prev: any) => fn(prev));

  return (
    <div className="relative w-full max-w-2xl p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl space-y-4">

      <h1 className="text-2xl text-center text-red-400">{t.title}</h1>

      {/* HP */}
      <div>
        <p>{t.hp}: {state.hp}</p>
        <div className="bg-zinc-800 h-2">
          <div className="bg-green-500 h-2" style={{ width: `${state.hp}%` }} />
        </div>
      </div>

      {/* EXP */}
      <div>
        <p>{t.level} {state.level}</p>
        <div className="bg-zinc-800 h-2">
          <div className="bg-red-500 h-2" style={{ width: `${(state.exp/state.maxExp)*100}%` }} />
        </div>
      </div>

      {/* actions */}
      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => act(cultivate)} className="btn">{t.cultivate}</button>
        <button onClick={() => act(explore)} className="btn">{t.explore}</button>
        <button onClick={() => act(rest)} className="btn">{t.rest}</button>
      </div>

      {/* battle */}
      {state.inBattle && (
        <div className="p-3 bg-red-900/20 rounded">
          <p>Enemy HP: {state.enemyHP}</p>
          <button onClick={() => act(attackEnemy)} className="btn mt-2">{t.attack}</button>
        </div>
      )}

      {/* event */}
      {state.event && (
        <div className="p-3 bg-yellow-900/20 rounded">
          <p>{state.event.title}</p>
          <button onClick={() => act((s:any)=>resolveEvent(s,"absorb"))} className="btn">{t.absorb}</button>
          <button onClick={() => act((s:any)=>resolveEvent(s,"leave"))} className="btn">{t.leave}</button>
        </div>
      )}

      {/* inventory */}
      <div>
        <p>{t.inventory}</p>
        {state.inventory.length === 0 ? t.empty :
          state.inventory.map((i:string,idx:number)=>(
            <span key={idx}>{i} </span>
          ))
        }
      </div>

      <div className="text-sm text-gray-400">{state.log}</div>
    </div>
  );
          }
