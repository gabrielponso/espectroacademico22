import React from 'react';

interface WelcomeMessageProps {
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

export function WelcomeMessage({ onTopicClick }: WelcomeMessageProps) {
  return (
    <div className="text-center p-8 mt-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Bem-vindo ao Espectro Acadêmico</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
        Utilize a barra de pesquisa acima para encontrar os estudos científicos e notícias mais recentes sobre o Transtorno do Espectro Autista.
      </p>
      <div className="mt-6">
        <p className="text-slate-600 dark:text-slate-300 mb-3">Sugestões de tópicos:</p>
        <div className="flex flex-wrap justify-center gap-2">
            <ExampleTopic onClick={() => onTopicClick('Intervenção precoce')}>Intervenção precoce</ExampleTopic>
            <ExampleTopic onClick={() => onTopicClick('Genética do autismo')}>Genética do autismo</ExampleTopic>
            <ExampleTopic onClick={() => onTopicClick('Comunicação alternativa')}>Comunicação alternativa</ExampleTopic>
            <ExampleTopic onClick={() => onTopicClick('Autismo em adultos')}>Autismo em adultos</ExampleTopic>
        </div>
      </div>
    </div>
  );
}