import React from 'react';
import type { Source } from '../types';

interface SourceListProps {
  sources: Source[];
}

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);


export function SourceList({ sources }: SourceListProps) {
  return (
    <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
      <h4 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300">Fontes e Referências</h4>
      <ul className="space-y-4">
        {sources.map((source, index) => (
          <li key={index} className="flex items-center justify-between gap-4">
            <a
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 dark:text-sky-400 hover:underline text-sm flex-grow truncate"
              title={source.title}
            >
              {source.title}
            </a>
            <a
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center justify-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors duration-200"
              aria-label={`Abrir fonte: ${source.title}`}
            >
              <ExternalLinkIcon />
              <span>Abrir</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}