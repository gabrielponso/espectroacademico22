
import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-12 h-12 border-4 border-t-sky-500 border-slate-200 dark:border-slate-600 rounded-full animate-spin"></div>
    </div>
  );
}
