import React from 'react';
import type { Study } from '../types';

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
);

interface StudyCardProps {
  study: Study;
}

export function StudyCard({ study }: StudyCardProps) {
  if (!study.uri) {
    return null;
  }

  return (
    <a
      href={study.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
    >
      <h3 className="text-xl font-bold text-sky-700 dark:text-sky-400 mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">{study.title}</h3>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{study.summary}</p>
      <div className="mt-4 text-sm text-sky-600 dark:text-sky-400 font-semibold flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
        <span>Acessar fonte</span>
        <ArrowRightIcon />
      </div>
    </a>
  );
}
