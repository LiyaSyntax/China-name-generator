"use client";

import { text } from "../lib/i18n";

export default function Landing({ onStart, lang }: any) {
  // Kita pakai jurus yang sama seperti tadi
  const t = (text as any)[lang] || text.en;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl text-red-400">{t.title}</h1>
        <button onClick={onStart} className="btn px-6 py-2">
          {t.enter}
        </button>
      </div>
    </div>
  );
}
