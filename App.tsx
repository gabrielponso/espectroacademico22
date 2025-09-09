import React, { useState, useCallback } from 'react';
import type { Study, Source } from './types';
import { fetchAutismStudies } from './services/geminiService';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { StudyCard } from './components/StudyCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import { WelcomeMessage } from './components/WelcomeMessage';
import { SourceList } from './components/SourceList';

export default function App() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const performSearch = useCallback(async (topic: string) => {
    if (!topic) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setStudies([]);
    setSources([]);

    try {
      const { studies: fetchedStudies, sources: fetchedSources } = await fetchAutismStudies(topic);
      setStudies(fetchedStudies);
      setSources(fetchedSources);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  }, [performSearch, searchQuery]);

  const handleTopicClick = useCallback((topic: string) => {
    setSearchQuery(topic);
    performSearch(topic);
  }, [performSearch]);

  const handleReset = useCallback(() => {
    setStudies([]);
    setSources([]);
    setError(null);
    setHasSearched(false);
    setSearchQuery('');
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200">
      <Header onReset={handleReset} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-700 dark:text-slate-300 mb-6">
            Explore os Avanços na Pesquisa sobre Autismo
          </h2>
          <SearchBar 
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onSubmit={handleSearchSubmit}
            isLoading={isLoading} 
          />
          
          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && <p className="text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-lg">{error}</p>}
            
            {!hasSearched && !isLoading && <WelcomeMessage onTopicClick={handleTopicClick} />}

            {hasSearched && !isLoading && studies.length === 0 && !error && (
              <p className="text-center text-slate-500 dark:text-slate-400 mt-12 text-lg">
                Nenhum estudo encontrado para este tópico. Tente uma busca mais ampla.
              </p>
            )}

            {studies.length > 0 && (
              <div className="space-y-6">
                {studies.map((study, index) => (
                  <StudyCard key={index} study={study} />
                ))}
              </div>
            )}

            {sources.length > 0 && !isLoading && (
              <SourceList sources={sources} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}