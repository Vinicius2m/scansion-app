"use client";

import { useState } from "react";
import handleScansion from "./api/scansion";

export default function Home() {
  const [poem, setPoem] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = handleScansion({ poem });
    setResult(result);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Análise de Poema</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          rows={10}
          value={poem}
          onChange={(e) => setPoem(e.target.value)}
          placeholder="Digite seu poema aqui..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Analisar
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold">Resultado da Escansão:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </main>
  );
}
