import React, { useState } from 'react';
import { Scan } from 'lucide-react';
import { PromptInput } from './components/PromptInput';
import { ImageInput } from './components/ImageInput';
import { ResultDisplay } from './components/ResultDisplay';
import { recognizeFromUrl, recognizeFromFile } from './utils/api';
import { ApiResponse } from './types';

const DEFAULT_PROMPT = import.meta.env.VITE_DEFAULT_PROMPT || 'Extract two numbers: regular price and discounted price (if exists). Return in format: \'regular:X;discounted:Y\'. If no discount, return only regular price.';

function App() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecognize = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setResult(null);

      if (!url && !file) {
        throw new Error('Please provide either a URL or upload a file');
      }

      if (url) {
        const data = await recognizeFromUrl(url, prompt);
        setResult(data);
      } else if (file) {
        const data = await recognizeFromFile(file, prompt);
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <Scan className="h-12 w-12 text-blue-500" />
            <h1 className="ml-4 text-3xl font-bold text-gray-900">
              Recognition
            </h1>
          </div>

          <PromptInput prompt={prompt} setPrompt={setPrompt} />
          <ImageInput
            url={url}
            setUrl={setUrl}
            file={file}
            setFile={setFile}
          />

          <button
            onClick={handleRecognize}
            disabled={isLoading || (!url && !file)}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Recognizing...' : 'Recognize'}
          </button>

          <div className="mt-6">
            <ResultDisplay
              result={result}
              error={error}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;