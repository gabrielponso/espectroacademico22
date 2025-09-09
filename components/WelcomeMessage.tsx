import React from 'react';
import type { Study } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { NewsCard } from './NewsCard';

interface DashboardProps {
  studies: Study[];
  isLoading: boolean;
  error: string | null;
  onTopicClick: (topic: string) => void;
}

const ExampleTopic = ({ children, onClick }: { children: React.ReactNode; onClick: () => void; }) => (
    <button
      type="button"
      onClick={onClick}
      className="bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 text-sm font-medium mr-2 px-3 py-1 rounded-full hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors duration-200 cursor-pointer"
    >
        {children}
    </button>
);

export function Dashboard({ studies, isLoading, error, onTopicClick }: DashboardProps) {
  return (
    <div className="p-1 mt-4">
        <div className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Bem-vindo ao Espectro Acadêmico</h3>
            <p className="text-slate-500 dark:text-slate-400">
                Abaixo estão as últimas notícias. Use a busca para tópicos específicos.
            </p>
            <div className="mt-4">
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">Sugestões:</p>
                <div className="flex flex-wrap gap-2">
                    <ExampleTopic onClick={() => onTopicClick('Intervenção precoce')}>Intervenção precoce</ExampleTopic>
                    <ExampleTopic onClick={() => onTopicClick('Genética do autismo')}>Genética do autismo</ExampleTopic>
                    <ExampleTopic onClick={() => onTopicClick('Comunicação alternativa')}>Comunicação alternativa</ExampleTopic>
                    <ExampleTopic onClick={() => onTopicClick('Autismo em adultos')}>Autismo em adultos</ExampleTopic>
                </div>
            </div>
        </div>
      
      <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-4 px-2">Últimas Notícias e Estudos</h3>

      {isLoading && <LoadingSpinner />}
      {error && <p className="text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-lg">{error}</p>}
      
      {!isLoading && !error && studies.length === 0 && (
          <p className="text-center text-slate-500 dark:text-slate-400 mt-8">
              Nenhuma notícia encontrada no momento.
          </p>
      )}

      {!isLoading && studies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studies.map((study, index) => (
            <NewsCard key={index} study={study} />
          ))}
        </div>
      )}
    </div>
  );
}
