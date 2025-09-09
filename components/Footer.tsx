
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-800/50 mt-12 py-6 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Espectro Acadêmico &copy; {new Date().getFullYear()}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Resumos gerados por IA. Sempre consulte as fontes originais para informações detalhadas.
        </p>
      </div>
    </footer>
  );
}
